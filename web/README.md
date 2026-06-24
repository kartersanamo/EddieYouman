# Eddie Youman Services — Website

Next.js marketing site with online booking, contact forms, and admin dashboard for [Eddie Youman Services](https://eddie.kartersanamo.com).

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
   - `DATABASE_URL` for Docker must reach MySQL from inside the container (e.g. `host.docker.internal` on the same host).
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
| `/admin/bookings` | Manage bookings |

## Booking flow

1. Client selects services, date, and time slot
2. Booking created as `PENDING` (slot held)
3. Eddie receives email notification
4. Admin confirms → customer gets confirmation email
5. Admin can cancel or mark complete
