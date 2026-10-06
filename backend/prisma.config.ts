import 'dotenv/config';
import { defineConfig } from 'prisma/config';

// The Prisma CLI (migrate, studio, db seed) talks to Neon over the DIRECT
// (non-pooled) connection. The running app uses the pooled DATABASE_URL via
// the Neon driver adapter (see src/prisma/prisma.service.ts).
export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
    seed: 'tsx prisma/seed.ts',
  },
  datasource: {
    url: process.env.DIRECT_URL ?? process.env.DATABASE_URL,
  },
});
