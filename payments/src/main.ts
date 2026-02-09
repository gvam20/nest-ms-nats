import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { envs } from './config/envs';
import { Logger } from '@nestjs/common';

async function main() {
  const logger = new Logger('Payments')
  const app = await NestFactory.create(AppModule, {
    rawBody: true
  });
  app.setGlobalPrefix('/api');
  await app.listen(envs.port);

  console.log(`server running on PORT ${envs.port}`);
}
main();
