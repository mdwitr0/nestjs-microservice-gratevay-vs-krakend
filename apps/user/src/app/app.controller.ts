import { Body, Controller, Get } from '@nestjs/common';

import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';
import { UserActions } from '@actions';
import { ConnectUserDto, UserEntity } from '@dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern(UserActions.FIND_ONE)
  getOne(@Body() payload: ConnectUserDto): Promise<UserEntity> {
    return this.appService.getOne(payload);
  }

  @MessagePattern(UserActions.FIND_MANY)
  getMany(): Promise<UserEntity[]> {
    return this.appService.getMany();
  }
}
