import { ConnectUserDto, UserEntity } from '@dto';
import { Injectable } from '@nestjs/common';
import { PrismaUserService } from '@prisma-clients/user';

@Injectable()
export class AppService {
  constructor(
    private readonly prismaService: PrismaUserService,
  ) {}

  getOne(payload: ConnectUserDto): Promise<UserEntity> {
    return this.prismaService.user.findUnique({ where: payload });
  }

  getMany(): Promise<UserEntity[]> {
    return this.prismaService.user.findMany({ where: {} });
  }
}
