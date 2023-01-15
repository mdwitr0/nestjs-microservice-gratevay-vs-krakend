import { Controller, Get } from '@nestjs/common';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get('products/:userId')
  findProductsByUser(userId: string) {
    return this.appService.findProductsByUser(userId);
  }
}
