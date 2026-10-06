/**
 * Idempotent seed — `npx prisma db seed` (or `npm run db:seed`).
 *
 *  - Content tables are filled only when empty, so edits made in the admin
 *    panel are never overwritten.
 *  - Events are upserted by slug.
 *  - A SUPER_ADMIN is created from SEED_ADMIN_EMAIL / SEED_ADMIN_PASSWORD if
 *    no admin with that email exists yet.
 */
import 'dotenv/config';
import { PrismaNeon } from '@prisma/adapter-neon';
import * as bcrypt from 'bcryptjs';
import { PrismaClient } from '../src/generated/prisma/client';
import * as data from './seed-data';

const prisma = new PrismaClient({
  adapter: new PrismaNeon({ connectionString: process.env.DATABASE_URL! }),
});

const date = (value: string | null) =>
  value ? new Date(`${value}T00:00:00.000Z`) : null;

const withOrder = <T extends object>(rows: T[]) =>
  rows.map((row, sortOrder) => ({ ...row, sortOrder }));

async function seedIfEmpty(
  name: string,
  count: () => Promise<number>,
  create: () => Promise<{ count: number }>,
) {
  if ((await count()) > 0) {
    console.log(`• ${name}: already has data, skipped`);
    return;
  }
  const { count: created } = await create();
  console.log(`✔ ${name}: ${created} rows`);
}

async function main() {
  await prisma.siteSettings.upsert({
    where: { id: 'default' },
    update: {},
    create: { id: 'default', ...data.settings },
  });
  console.log('✔ site settings');

  await seedIfEmpty('social links', () => prisma.socialLink.count(), () =>
    prisma.socialLink.createMany({ data: withOrder(data.socialLinks) }),
  );
  await seedIfEmpty('stats', () => prisma.siteStat.count(), () =>
    prisma.siteStat.createMany({ data: withOrder(data.stats) }),
  );
  await seedIfEmpty('hero slides', () => prisma.heroSlide.count(), () =>
    prisma.heroSlide.createMany({ data: withOrder(data.heroSlides) }),
  );
  await seedIfEmpty('branches', () => prisma.branch.count(), () =>
    prisma.branch.createMany({ data: withOrder(data.branches) }),
  );
  await seedIfEmpty('leaders', () => prisma.leader.count(), () =>
    prisma.leader.createMany({ data: withOrder(data.leaders) }),
  );
  await seedIfEmpty('departments', () => prisma.department.count(), () =>
    prisma.department.createMany({ data: withOrder(data.departments) }),
  );
  await seedIfEmpty('page sections', () => prisma.pageSection.count(), () =>
    prisma.pageSection.createMany({ data: withOrder(data.pageSections) }),
  );
  await seedIfEmpty('giving methods', () => prisma.givingMethod.count(), () =>
    prisma.givingMethod.createMany({ data: withOrder(data.givingMethods) }),
  );

  const zion = await prisma.branch.findUnique({ where: { slug: 'zion' } });
  for (const event of data.events) {
    const row = {
      ...event,
      date: date(event.date)!,
      endDate: date(event.endDate),
      branchId: zion?.id ?? null,
    };
    await prisma.event.upsert({
      where: { slug: event.slug },
      update: {},
      create: row,
    });
  }
  console.log(`✔ events: ${data.events.length} KNUST semester events`);

  const email = process.env.SEED_ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.SEED_ADMIN_PASSWORD;
  if (email && password) {
    if (password.length < 10) {
      throw new Error('SEED_ADMIN_PASSWORD must be at least 10 characters');
    }
    const existing = await prisma.adminUser.findUnique({ where: { email } });
    if (!existing) {
      await prisma.adminUser.create({
        data: {
          email,
          name: process.env.SEED_ADMIN_NAME || 'Super Admin',
          role: 'SUPER_ADMIN',
          passwordHash: await bcrypt.hash(password, 12),
        },
      });
      console.log(`✔ super admin created: ${email}`);
    } else {
      console.log(`• super admin ${email} already exists`);
    }
  } else {
    console.log('! SEED_ADMIN_EMAIL / SEED_ADMIN_PASSWORD not set — no admin created');
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
