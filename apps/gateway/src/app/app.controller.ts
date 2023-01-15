import { Controller, Get } from '@nestjs/common';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  findProductsByUser(userId: string) {
    return this.appService.findProductsByUser(userId);
  }
}
