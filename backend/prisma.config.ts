import 'dotenv/config';
import { defineConfig } from 'prisma/config';

/**
 * The Prisma CLI (migrate, studio, db seed) must use Neon's DIRECT connection.
 * Migrations take a session-level advisory lock; through the pooler
 * (PgBouncer, "-pooler" host) that lock can outlive the CLI process and block
 * every later deploy. If only DATABASE_URL is set, derive the direct host.
 * The running app uses the pooled DATABASE_URL (src/prisma/prisma.service.ts).
 */
function directUrl(): string | undefined {
  const url = process.env.DIRECT_URL || process.env.DATABASE_URL;
  return url?.replace('-pooler.', '.');
}

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
    seed: 'tsx prisma/seed.ts',
  },
  datasource: {
    url: directUrl(),
  },
});
