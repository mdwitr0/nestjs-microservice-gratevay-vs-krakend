import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { MicroserviceOptions } from '@nestjs/microservices';
import { Services } from '@enum';
import { getRMQConnectOption } from '@configs';
async function bootstrap() {
  const logger = new Logger(Services.USER);
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    getRMQConnectOption(Services.USER)
  );

  await app.listen();

  logger.log('Init service');
}

bootstrap();
