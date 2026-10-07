# God Seeking Generation — Website

The public website of **God Seeking Generation** (GSG), a non-denominational Christian ministry headquartered at Obomeng-Kwahu, Ghana. It covers the church's history, leadership, branches, departments, events, giving, and a small store for books and merchandise.

| Part | Folder | Stack | Hosted on |
|---|---|---|---|
| Website | [`web/`](web) | Next.js 16, React 19, Tailwind CSS 4 | Vercel — https://gsg-alpha.vercel.app |
| API | [`backend/`](backend) | NestJS 11, Prisma 7, PostgreSQL | Render — https://gsg-xs4r.onrender.com |

**Services:**

| Service | Used for |
|---|---|
| [Neon](https://neon.tech) Postgres | The database |
| Neon Object Storage | Images and files |
| [Resend](https://resend.com) | Email |
| [Paystack](https://paystack.com) | Store payments in GH₵ (Mobile Money and cards) |

## What the API provides

**For the public website (no login):**
- Site settings, hero slides, history, mission, values, branches, leaders, departments and giving methods
- Events, with upcoming filters and search
- Books and merchandise, with server-priced Paystack checkout, a signed webhook and verification
- Forms: contact ("Write to us"), newsletter, prayer requests and testimonies. These forms have spam protection and send email notifications.

**For admins (`/api/v1/admin/*`, sign-in required):**
- Manage all content, events and the store
- Manage form submissions and orders
- Manage the media library, admin users and newsletter broadcasts

Full interactive docs are at **`/docs`** on the API. Health checks are at `/health` and `/health/ready`.

## Getting started

Requirements: Node.js 22+, npm, and a Neon (or any PostgreSQL) database.

### API

```bash
cd backend
cp .env.example .env     # database URLs, JWT secret, storage, Resend, Paystack
npm install
npm run db:deploy        # apply migrations
npm run db:seed          # website content, events and the first super admin
npm run start:dev        # http://localhost:4000 — docs at /docs
```

### Website

```bash
cd web
cp .env.example .env     # NEXT_PUBLIC_API_URL=http://localhost:4000/api/v1
npm install
npm run dev              # http://localhost:3000
```

## Useful commands (in `backend/`)

| Command | What it does |
|---|---|
| `npm run db:migrate -- --name <change>` | Create a migration after editing `prisma/schema.prisma` |
| `npm run db:deploy` | Apply pending migrations (production-safe) |
| `npm run db:seed` | Idempotent seed; never overwrites content edited by admins |
| `npm run storage:cors` | Apply CORS to the storage bucket (re-run when domains change) |
| `npm test` / `npm run test:e2e` | Unit tests / API tests |

## Deployment

**API (Render):**
- **Root directory:** `backend`
- **Build command:** `npm ci --include=dev && npm run build && npx prisma migrate deploy`
- **Start command:** `npm run start:prod`
- **Health check path:** `/health`
- **Environment:** every key from `backend/.env.example`. Set `NODE_ENV=production`, use a strong `JWT_SECRET`, and don't set `PORT`.

**Website (Vercel):**
- **Root directory:** `web`
- **Environment variable:** `NEXT_PUBLIC_API_URL=https://gsg-xs4r.onrender.com/api/v1`

**Paystack webhook:** `https://gsg-xs4r.onrender.com/api/v1/payments/paystack/webhook`

See [`backend/README.md`](backend/README.md) for the full API reference, email triggers and security notes.
