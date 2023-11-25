import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as process from 'process';
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

const PORT = process.env['PORT'] ?? 8080;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
      .setTitle('InterBook API')
      .setDescription('The InterBook API description')
      .setVersion('1.0')
      .addBearerAuth(
          {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
            name: 'JWT',
            description: 'Enter access_token',
            in: 'header',
          },
          "JWT-Auth")
      .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      defaultModelsExpandDepth: -1
    }
  });

  await app.listen(PORT);

  return `running on port ${PORT}`;
}
bootstrap().then((r) => {
  console.log(r);
});
