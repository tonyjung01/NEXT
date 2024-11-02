import { NestFactory } from '@nestjs/core';
import { BookModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(BookModule);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();