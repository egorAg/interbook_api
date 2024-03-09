import { Logger, VersioningType } from '@nestjs/common';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

const logger: Logger = new Logger('BootStrap');

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  try {
    const configService = app.get<ConfigService>(ConfigService);

    const APP_ROUT_PREFIX = configService.getOrThrow<string>('APP_PREFIX');
    const corsPolicy: CorsOptions = {
      methods: ['GET', 'POST', 'DELETE', 'PATCH'],
      origin: configService.get<string>('CORS_ORIGIN') ?? '*',
    };

    app
      .enableVersioning({
        type: VersioningType.URI,
        defaultVersion: '1',
      })
      .enableCors(corsPolicy);

    const openApiDocs = new DocumentBuilder()
      .setTitle(configService.get<string>('OPEN_API_TITLE') ?? 'InterBook Api')
      .setDescription(
        'API documentation base on OpenApi spec. Use it to integrate API to your project',
      )
      .setVersion(configService.get<string>('OPEN_API_VERSION') ?? '0.1')
      .addBearerAuth(
        {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          name: 'JWT',
          description: 'Enter JWT token',
          in: 'header',
        },
        'JWT-auth',
      )
      .build();

    const swaggerDocument = SwaggerModule.createDocument(app, openApiDocs);

    SwaggerModule.setup(`${APP_ROUT_PREFIX}/explorer`, app, swaggerDocument, {
      swaggerOptions: { defaultModelsExpandDepth: -1 },
    });

    const PORT = configService.getOrThrow('PORT');

    await app.listen(PORT);

    logger.log(
      `Application started at ${PORT}, swagger initialized at http://${configService.get<string>('HOST') ?? 'localhost'}:${PORT}/api/explorer`,
      {
        corsPolicy,
      },
    );
  } catch (e) {
    logger.fatal(e.message || 'Unexpected error on service bootstrap');
    process.exit(0);
  }
}
bootstrap();
