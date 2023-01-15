import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaUserModule } from '@prisma-clients/user';

@Module({
  imports: [PrismaUserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
