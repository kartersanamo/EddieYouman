# Eddie Youman Services — Website

Next.js marketing site with online booking, contact forms, and admin dashboard for [Eddie Youman Services](https://eddie.kartersanamo.com) — construction clean up in Jacksonville, FL.

## Stack

- Next.js 15, React 19, Tailwind CSS v4
- Prisma + SQLite (booking scheduler)
- Auth.js (admin login)
- Mailgun (contact + booking emails)
- Docker standalone deployment

## Local development

```bash
cd web
cp .env.example .env
# Set AUTH_SECRET, ADMIN_PASSWORD, and optional Mailgun keys

mkdir -p data
npm install
npx prisma migrate dev
npm run db:seed
npm run dev
```

- Site: http://localhost:3000
- Admin: http://localhost:3000/admin (login with `ADMIN_EMAILS` / `ADMIN_PASSWORD`)

## Deployment (`eddie.kartersanamo.com`)

1. Copy `.env.example` to `.env` and fill in production values.
2. Run `./deploy.sh` — builds Docker image and starts on **port 8007**.
3. Add Cloudflare tunnel ingress rule in `/etc/cloudflared/config.yml`:

```yaml
  - hostname: eddie.kartersanamo.com
    service: http://localhost:8007
```

4. Restart tunnel: `sudo systemctl restart cloudflared`

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home |
| `/services` | Service catalog (no pricing) |
| `/gallery` | Before/after gallery |
| `/about` | About the business |
| `/blog` | Blog posts |
| `/contact` | Contact form + quick actions |
| `/book` | Multi-step booking wizard |
| `/admin` | Dashboard (protected) |
