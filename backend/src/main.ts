import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as process from 'process';

const PORT = process.env['PORT'] ?? 8080;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(PORT);

  return `running on port ${PORT}`;
}
bootstrap().then((r) => {
  console.log(r);
});
