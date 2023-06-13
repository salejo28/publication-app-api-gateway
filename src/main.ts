import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { json } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.enableCors({
    origin: '*',
  });
  app.use(json({ limit: '10mb' }));
  await app.listen(4000);
}
bootstrap();
