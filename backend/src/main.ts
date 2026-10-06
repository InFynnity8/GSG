import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { configureApp } from './app.setup';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    rawBody: true, // needed to verify Paystack webhook signatures
  });
  const config = app.get(ConfigService);
  const logger = new Logger('Bootstrap');

  configureApp(app);
  app.enableShutdownHooks();

  if (config.get<boolean>('SWAGGER_ENABLED', true)) {
    const document = SwaggerModule.createDocument(
      app,
      new DocumentBuilder()
        .setTitle('GSG Website API')
        .setDescription(
          'Public content + forms for the GSG website, and admin endpoints for managing it.',
        )
        .setVersion('1.0')
        .addBearerAuth()
        .build(),
    );
    SwaggerModule.setup('docs', app, document);
  }

  const port = config.get<number>('PORT', 3000);
  await app.listen(port, '0.0.0.0');
  logger.log(`API listening on :${port} (docs at /docs)`);
}
void bootstrap();
