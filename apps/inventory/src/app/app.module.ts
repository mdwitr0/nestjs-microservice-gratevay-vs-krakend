import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaInventoryModule } from '@prisma-clients/inventory';

@Module({
  imports: [PrismaInventoryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
