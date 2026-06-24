# Eddie Youman Services — Website

Next.js marketing site with online booking, contact forms, and admin dashboard for [Eddie Youman Services](https://eddie.kartersanamo.com) — construction clean up in Jacksonville, FL.

## Stack

- Next.js 15, React 19, Tailwind CSS v4
- Prisma + MySQL (booking scheduler)
- Auth.js (admin login)
- Mailgun (contact + booking emails)
- Docker standalone deployment

## Local development

```bash
cd web
cp .env.example .env
# Set DATABASE_URL (MySQL), AUTH_SECRET, ADMIN_PASSWORD, and optional Mailgun keys

mkdir -p data
npm install
npx prisma migrate dev
npm run db:seed
npm run dev
```

Create the MySQL database first, e.g. `CREATE DATABASE eddie_youman CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`

- Site: http://localhost:3000
- Admin: http://localhost:3000/admin (login with `ADMIN_EMAILS` / `ADMIN_PASSWORD`)

## Deployment (`eddie.kartersanamo.com`)

1. Create a MySQL database: `CREATE DATABASE eddie_youman CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`
2. Copy `.env.example` to `.env` and fill in production values.
   - `DATABASE_URL` should use `127.0.0.1` when MySQL runs on the same server (deploy uses host networking).
3. Run `./deploy.sh` — builds Docker image and starts on **port 8007**.
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
