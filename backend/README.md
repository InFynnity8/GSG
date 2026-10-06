# GSG Website API

NestJS 11 + Prisma 7 backend for the God Seeking Generation website. It runs on:

- **Neon Postgres** for the data
- **Neon Object Storage** for files
- **Resend** for email
- **Paystack** for store payments

- Production: https://gsg-xs4r.onrender.com
- API base: `/api/v1`
- Interactive docs: `/docs`
- Health checks: `/health` and `/health/ready`

## Local development

```bash
npm install            # also runs `prisma generate`
cp .env.example .env   # then fill in the values
npm run db:deploy      # apply migrations
npm run db:seed        # website content, KNUST events, first super admin
npm run start:dev      # http://localhost:3000/docs
```

| Script | What it does |
|---|---|
| `npm run db:migrate -- --name <change>` | Create and apply a new migration after you edit `prisma/schema.prisma` |
| `npm run db:deploy` | Apply pending migrations. Safe for production |
| `npm run db:seed` | Idempotent seed. It never overwrites content edited in the admin panel |
| `npm run db:studio` | Open a database browser |
| `npm run storage:cors` | Apply the bucket CORS policy for browser uploads |
| `npm test` / `npm run test:e2e` | Unit tests / API tests against the database |

## Deploying on Render

Use these service settings:

- **Build command:** `npm ci && npm run build && npx prisma migrate deploy`
- **Start command:** `npm run start:prod`
- **Health check path:** `/health`
- **Environment:** every variable in `.env.example`, with these production values:
  - `NODE_ENV=production`
  - `APP_URL=https://gsg-xs4r.onrender.com`
  - `CORS_ORIGINS=<website URL>,<admin URL>`
  - A new, long `JWT_SECRET`
  - `SWAGGER_ENABLED=false` if you don't want the docs public

## One-time setup

### 1. Neon Object Storage

1. In the Neon Console, open the project, go to **Storage**, and create a bucket named `gsg-media` with access level **public_read**.
2. Copy the branch's S3 endpoint and credentials into these variables (or run `neon env pull`):
   - `AWS_ENDPOINT_URL_S3`
   - `AWS_ACCESS_KEY_ID`
   - `AWS_SECRET_ACCESS_KEY`
   - `AWS_REGION`
3. Run `npm run storage:cors`. Run it again whenever `CORS_ORIGINS` changes.

### 2. Resend

1. Verify your domain at resend.com/domains.
2. Create an API key and set `RESEND_API_KEY`.
3. Set `MAIL_FROM` to an address on the verified domain.
4. Set `MAIL_NOTIFY_TO` to the inbox that should receive website messages.
5. For newsletters, create a Segment in Resend and set `RESEND_NEWSLETTER_SEGMENT_ID`. Then call `POST /api/v1/admin/newsletter/sync` once to copy existing subscribers into it.

### 3. Paystack

1. Set `PAYSTACK_SECRET_KEY` and `PAYSTACK_PUBLIC_KEY`.
2. In the Paystack dashboard, set the webhook URL to `https://gsg-xs4r.onrender.com/api/v1/payments/paystack/webhook`.

## What sends email

| Trigger | Emails |
|---|---|
| Contact form (`POST /contact`) | Notification to `MAIL_NOTIFY_TO` (reply goes straight to the sender) and an auto-reply to the sender |
| Newsletter subscribe | Welcome email with an unsubscribe link, and the contact is synced to Resend |
| Newsletter unsubscribe | Contact marked unsubscribed in Resend |
| Prayer request | Notification to the church, plus an acknowledgement if the sender gave an email and isn't anonymous |
| Testimony | "Awaiting approval" notification to the church |
| Paid order | Receipt to the buyer and a notification to the church |
| `POST /admin/newsletter/broadcasts` | Newsletter to the whole Resend segment |

All emails use the website logo and colours (`src/mail/templates.ts`). If Resend is down, or no key is set, form submissions still succeed. The email is skipped and the problem is logged.

## API overview

### Public (no auth)

- Content:
  - `GET /site` returns settings, social links and stats
  - `GET /hero-slides`
  - `GET /page-sections?type=HISTORY|MISSION|CORE_VALUE`
  - `GET /branches`, `GET /branches/:slug`
  - `GET /leaders?group=LEADERSHIP|PATRON|DIRECTORY`
  - `GET /departments`
  - `GET /giving-methods`
  - `GET /service-times`
- Events:
  - `GET /events?upcoming=true&type=&search=&page=&limit=`
  - `GET /events/types`
  - `GET /events/:idOrSlug`
- Store:
  - `GET /store/books`, `GET /store/merchandise`. Both accept `?category=&search=&maxPrice=&sort=price-asc|price-desc|newest|title`
  - `GET /store/books/:idOrSlug`, `GET /store/merchandise/:idOrSlug`
- Payments:
  - `POST /orders/checkout` returns a Paystack `accessCode`
  - `GET /orders/verify/:reference`
- Forms:
  - `POST /contact`
  - `POST /newsletter/subscribe`, `POST /newsletter/unsubscribe`
  - `POST /prayer-requests`
  - `POST`/`GET /testimonies`

### Admin (Bearer token from `POST /auth/login`)

Everything under `/admin/*`. What each role can do:

- **EDITOR:** content, events, store and media
- **ADMIN:** everything an editor can do, plus orders, form submissions, settings and newsletter broadcasts
- **SUPER_ADMIN:** everything, plus managing admin users (`/admin/users`)

## Security notes

- Every route requires a token unless it is marked `@Public()`.
- Tokens are revoked when a user's password, role or active status changes.
- Request bodies are validated with a whitelist, so unknown fields are rejected. URLs must be `http(s)` or site-relative.
- Rate limits:
  - 120 requests per minute per IP overall
  - 5 per minute on login
  - 5 per 10 minutes on each public form
  - Forms also have a honeypot field (`website`)
- Helmet sets security headers, and CORS only allows origins listed in `CORS_ORIGINS`.
- Paystack payments:
  - The server sets the price, not the browser.
  - Webhook signatures are verified as HMAC-SHA512 of the raw request body.
  - The amount and currency are re-checked against Paystack before an order is marked paid.
  - Concurrent webhooks and verify calls can't double-process an order.
- Uploads:
  - Only allow-listed file types are accepted, and their actual bytes are checked against the claimed type.
  - SVG is not accepted.
  - The server generates the storage keys.
  - Size limits apply.
