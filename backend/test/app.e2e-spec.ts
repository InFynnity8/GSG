import { NestExpressApplication } from '@nestjs/platform-express';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from './../src/app.module';
import { configureApp } from './../src/app.setup';

// Boots the real app against DATABASE_URL from .env (read-only requests).
describe('GSG API (e2e)', () => {
  let app: NestExpressApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = configureApp(
      moduleFixture.createNestApplication<NestExpressApplication>({
        rawBody: true,
      }),
    );
    await app.init();
  });

  afterAll(() => app.close());

  it('GET /health', () =>
    request(app.getHttpServer()).get('/health').expect(200));

  it('GET /api/v1/events returns a paginated list', async () => {
    const res = await request(app.getHttpServer())
      .get('/api/v1/events?limit=2')
      .expect(200);
    const body = res.body as { data: unknown[]; meta: { limit: number } };
    expect(body.meta.limit).toBe(2);
    expect(Array.isArray(body.data)).toBe(true);
  });

  it('admin routes require a token', () =>
    request(app.getHttpServer()).get('/api/v1/admin/events').expect(401));
});
