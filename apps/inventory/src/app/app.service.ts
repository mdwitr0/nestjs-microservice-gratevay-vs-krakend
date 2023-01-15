import { ConnectProductDto, ProductEntity } from '@dto';
import { Injectable } from '@nestjs/common';
import {PrismaInventoryService } from '@prisma-clients/inventory';

@Injectable()
export class AppService {
  constructor(private readonly prismaService: PrismaInventoryService) {}

  getOne(payload: ConnectProductDto): Promise<ProductEntity> {
    return this.prismaService.product.findUnique({ where: payload });
  }
}
