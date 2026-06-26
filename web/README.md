# Eddie Youman Services — Website

Next.js marketing site with online booking, contact forms, and admin dashboard for [Eddie Youman Services](https://eddie.kartersanamo.com).

## Stack

- Next.js 15, React 19, Tailwind CSS v4
- Prisma + MySQL
- Auth.js (admin login)
- Mailgun (contact + quote emails)
- Stripe (payments on completed jobs)
- Docker standalone deployment

## Local development

```bash
cd web
cp .env.example .env
# Set DATABASE_URL (MySQL), AUTH_SECRET, ADMIN_PASSWORD, and Mailgun keys

mkdir -p data
npm install
npx prisma migrate dev
npm run db:seed
npm run dev
```

Create the MySQL database first:

```sql
CREATE DATABASE eddie_youman CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

- Site: http://localhost:3000
- Admin: http://localhost:3000/admin (login with `ADMIN_EMAILS` / `ADMIN_PASSWORD`)

## Deployment (`eddie.kartersanamo.com`)

1. Create a MySQL database (see above).
2. Copy `.env.example` to `.env` and fill in production values.
   - `DATABASE_URL` should use `127.0.0.1` when MySQL runs on the same server (deploy uses host networking).
   - `CRON_SECRET` is **required** in production.
3. Run `./deploy.sh` — builds Docker image and starts on **port 8007**.
4. For a **new hostname**, create the Cloudflare DNS route (one-time):

   ```bash
   cloudflared tunnel route dns homeserver eddie.kartersanamo.com
   ```

5. Add Cloudflare tunnel ingress in `/etc/cloudflared/config.yml`:

   ```yaml
   - hostname: eddie.kartersanamo.com
     service: http://localhost:8007
   ```

6. Restart tunnel: `sudo systemctl restart cloudflared`

## Customer flow (quote-first)

1. Customer uses **Book Now** at `/book` → submits a quote request (services, preferred time, contact info).
2. Admin reviews in `/admin/quotes`, sets price, and sends the quote email.
3. Customer accepts at `/quote/[token]` → creates a **confirmed** booking.
4. Admin completes the job → customer pays at `/jobs/[token]` via Stripe.

Contact form at `/contact` is for quick messages only (email to admin, no quote record).

## Production ops

### Required environment variables

| Variable | Purpose |
|----------|---------|
| `DATABASE_URL` | MySQL connection |
| `AUTH_SECRET` | Admin session encryption |
| `MAILGUN_API_KEY`, `MAILGUN_DOMAIN`, `MAILGUN_FROM` | Email delivery |
| `CONTACT_TO_EMAIL` | Admin notification recipient |
| `CRON_SECRET` | Protects `/api/cron/*` routes |
| `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET` | Job payments |

### Stripe webhook

Register in the Stripe Dashboard:

`https://eddie.kartersanamo.com/api/stripe/webhook`

Event: `checkout.session.completed`

### Scheduled cron jobs

Add to the server crontab (daily is typical):

```bash
0 8 * * * curl -fsS -H "Authorization: Bearer $CRON_SECRET" https://eddie.kartersanamo.com/api/cron/process-emails
0 8 * * * curl -fsS -H "Authorization: Bearer $CRON_SECRET" https://eddie.kartersanamo.com/api/cron/recurring
```

### Post-deploy smoke test

1. Log in to `/admin` and change the default password.
2. Submit a quote request at `/book` — confirm admin + customer emails arrive.
3. Send a quote from `/admin/quotes` and accept it at `/quote/[token]`.
4. Complete the job and test Stripe payment at `/jobs/[token]`.

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home |
| `/services` | Service catalog |
| `/gallery` | Before/after gallery |
| `/about` | About the business |
| `/blog` | Blog posts |
| `/contact` | Quick contact form (email only) |
| `/book` | Quote request wizard |
| `/quote/[token]` | Customer quote acceptance |
| `/jobs/[token]` | Completed job summary + payment |
| `/admin` | Dashboard (protected) |
| `/admin/quotes` | Review and send quotes |
| `/admin/bookings` | Manage confirmed bookings |
