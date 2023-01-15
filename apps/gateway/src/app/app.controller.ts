import { Controller, Get, Param } from '@nestjs/common';

import { AppService } from './app.service';
import { ProductEntity, UserWithCreatedProductsDto } from '@dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get('products/:userId')
  async findProductsByUser(@Param('userId') userId: string): Promise<ProductEntity[]> {
    return this.appService.findProductsByUser(userId);
  }

  @Get('users-with-products')
  async findUsersWithProducts(): Promise<UserWithCreatedProductsDto[]> {
    return this.appService.findUsersWithProducts();
  }
}
