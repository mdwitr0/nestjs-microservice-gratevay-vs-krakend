import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Services } from '@enum';
import { RMQClientsModuleConfig } from '@configs';

@Module({
  imports: [
    RMQClientsModuleConfig(Services.USER, Services.INVENTORY),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
