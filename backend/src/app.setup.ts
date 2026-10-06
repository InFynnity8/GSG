import { RequestMethod, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';
import helmet from 'helmet';
import { VALIDATION_OPTIONS } from './common/validation';

/** HTTP-level configuration shared by main.ts and the e2e tests. */
export function configureApp(app: NestExpressApplication) {
  const config = app.get(ConfigService);

  // Render sits behind one proxy hop; this makes req.ip the real client IP
  // (rate limiting depends on it).
  app.set('trust proxy', 1);
  app.disable('x-powered-by');

  app.use(helmet());
  app.useBodyParser('json', { limit: '1mb' });

  const origins = config
    .get<string>('CORS_ORIGINS', '')
    .split(',')
    .map((o) => o.trim())
    .filter(Boolean);
  app.enableCors({
    origin: origins,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    maxAge: 86_400,
  });

  app.setGlobalPrefix('api/v1', {
    exclude: [
      { path: 'health', method: RequestMethod.GET },
      { path: 'health/ready', method: RequestMethod.GET },
    ],
  });
  app.useGlobalPipes(new ValidationPipe(VALIDATION_OPTIONS));
  return app;
}
