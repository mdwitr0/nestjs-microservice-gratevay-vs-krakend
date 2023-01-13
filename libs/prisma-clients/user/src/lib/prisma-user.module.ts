import { Module } from '@nestjs/common';
import { PrismaUserService } from './prisma-user.service';

@Module({
  controllers: [],
  providers: [PrismaUserService],
  exports: [PrismaUserService],
})
export class PrismaUserModule {}
