import { InventoryActions, UserActions } from '@actions';
import {
  ConnectUserDto,
  FindManyProductsDto,
  ProductEntity,
  UserEntity,
} from '@dto';
import { Services } from '@enum';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AppService {
  constructor(
    @Inject(Services.USER)
    private readonly userService: ClientProxy,
    @Inject(Services.INVENTORY)
    private readonly inventoryService: ClientProxy
  ) { }

  async findProductsByUser(userId: string): Promise<ProductEntity[]> {
    const user = await lastValueFrom(
      this.userService.send<UserEntity, ConnectUserDto>(UserActions.FIND_ONE, {
        uuid: userId,
      })
    );
    const products = await lastValueFrom(
      this.inventoryService.send<ProductEntity[], FindManyProductsDto>(
        InventoryActions.FIND_MANY,
        { ids: user.createdProducts }
      )
    );

    return products;
  }
}
