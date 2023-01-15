import { Body, Controller } from '@nestjs/common';

import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';
import { InventoryActions } from '@actions';
import { ConnectProductDto, FindManyProductsDto, ProductEntity } from '@dto';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @MessagePattern(InventoryActions.FIND_ONE)
  getOne(@Body() payload: ConnectProductDto): Promise<ProductEntity> {
    return this.appService.getOne(payload);
  }

  @MessagePattern(InventoryActions.FIND_MANY)
  getMany(payload: FindManyProductsDto): Promise<ProductEntity[]> {
    return this.appService.getMany(payload);
  }
}
