#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")"

export DOCKER_BUILDKIT=1

read_env_var() {
  local key="$1"
  local file
  for file in .env .env.local; do
    [[ -f "$file" ]] || continue
    local line
    line="$(grep -E "^${key}=" "$file" 2>/dev/null | head -1)" || continue
    printf '%s' "${line#*=}"
    return 0
  done
  return 1
}

FOLLOW_LOGS=false
for arg in "$@"; do
  case "$arg" in
    --logs|-l) FOLLOW_LOGS=true ;;
    --help|-h)
      echo "Usage: ./deploy.sh [--logs]"
      exit 0
      ;;
  esac
done

NEXT_PUBLIC_SITE_URL="$(read_env_var NEXT_PUBLIC_SITE_URL || true)"
SITE_URL="${NEXT_PUBLIC_SITE_URL:-https://eddie.kartersanamo.com}"
CONTAINER_NAME="eddie-youman"
IMAGE_TAG="eddie-youman:latest"
HOST_PORT=8007
DATA_DIR_HOST="$(read_env_var DATA_DIR_HOST || true)"
DEPLOY_ROOT="$(cd "$(dirname "$0")" && pwd)"

if [[ -z "${DATA_DIR_HOST}" ]]; then
  DATA_DIR_HOST="${DEPLOY_ROOT}/data"
elif [[ "${DATA_DIR_HOST}" != /* ]]; then
  DATA_DIR_HOST="${DEPLOY_ROOT}/${DATA_DIR_HOST#./}"
fi

ENV_FILE_ARGS=()
if [[ -f .env ]]; then
  ENV_FILE_ARGS=(--env-file .env)
elif [[ -f .env.local ]]; then
  ENV_FILE_ARGS=(--env-file .env.local)
fi

CACHE_FROM_ARGS=()
if docker image inspect "${IMAGE_TAG}" >/dev/null 2>&1; then
  CACHE_FROM_ARGS=(--cache-from "${IMAGE_TAG}")
fi

echo "Building ${IMAGE_TAG}..."
docker build -t "${IMAGE_TAG}" \
  --build-arg "NEXT_PUBLIC_SITE_URL=${SITE_URL}" \
  "${CACHE_FROM_ARGS[@]}" \
  .

mkdir -p "${DATA_DIR_HOST}"

if [[ -z "$(read_env_var DATABASE_URL || true)" ]]; then
  echo "ERROR: DATABASE_URL must be set in .env (MySQL connection string)."
  exit 1
fi

echo "Replacing container..."
docker rm -f "${CONTAINER_NAME}" 2>/dev/null || true

echo "Starting container on port ${HOST_PORT}..."
docker run -d \
  --name "${CONTAINER_NAME}" \
  --restart unless-stopped \
  --add-host=host.docker.internal:host-gateway \
  -p "${HOST_PORT}:3000" \
  -v "${DATA_DIR_HOST}:/app/data" \
  "${ENV_FILE_ARGS[@]}" \
  -e HOSTNAME=0.0.0.0 \
  -e PORT=3000 \
  -e "NEXT_PUBLIC_SITE_URL=${SITE_URL}" \
  -e "AUTH_URL=${SITE_URL}" \
  -e "DATA_DIR=/app/data" \
  "${IMAGE_TAG}"

echo "Done. Container listening on http://localhost:${HOST_PORT}"
echo ""
echo "If this is a new hostname, add to /etc/cloudflared/config.yml:"
echo "  - hostname: eddie.kartersanamo.com"
echo "    service: http://localhost:${HOST_PORT}"
echo ""
echo "Then: sudo systemctl restart cloudflared"
echo ""
echo "Public URL: ${SITE_URL}"
echo ""

docker logs --tail 30 "${CONTAINER_NAME}"

if [[ "${FOLLOW_LOGS}" == true ]]; then
  docker logs -f "${CONTAINER_NAME}"
fi
