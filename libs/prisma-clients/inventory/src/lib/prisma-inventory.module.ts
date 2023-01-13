import { Module } from '@nestjs/common';
import { PrismaInventoryService } from './prisma-inventory.service';

@Module({
  controllers: [],
  providers: [PrismaInventoryService],
  exports: [PrismaInventoryService],
})
export class PrismaInventoryModule {}
