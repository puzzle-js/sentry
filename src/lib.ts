import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap(port = 3335) {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(port);
}

export { bootstrap };
