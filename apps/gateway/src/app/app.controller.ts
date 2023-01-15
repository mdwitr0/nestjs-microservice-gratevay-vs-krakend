import { Controller, Get, Param } from '@nestjs/common';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get('products/:userId')
  findProductsByUser(@Param('userId') userId: string) {
    return this.appService.findProductsByUser(userId);
  }
}
