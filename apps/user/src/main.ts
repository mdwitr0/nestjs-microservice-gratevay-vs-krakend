/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import {MicroserviceOptions, Transport} from "@nestjs/microservices";
import * as process from "process";
import {ServiceQueues, Services} from "@enum";

async function bootstrap() {
  const logger = new Logger(Services.USER)
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBITMQ_URI],
      queue: ServiceQueues.USER,
      queueOptions: {
        durable: false
      },
    },
  });

  await app.listen()

  logger.log('Init service')
}


bootstrap();
