import { InventoryActions, UserActions } from '@actions';
import {
  ConnectUserDto,
  FindManyProductsDto,
  ProductEntity,
  UserEntity,
  UserWithCreatedProductsDto,
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

  async findUsersWithProducts(): Promise<UserWithCreatedProductsDto[]> {
    const users = await lastValueFrom(
      this.userService.send<UserEntity[]>(UserActions.FIND_MANY, {})
    );
    const products = await lastValueFrom(
      this.inventoryService.send<ProductEntity[], FindManyProductsDto>(
        InventoryActions.FIND_MANY,
        { ids: users.map((user) => user.createdProducts).flat() }
      )
    );

    return users.map((user) => ({
      ...user,
      createdProducts: products.filter(
        (product) => product.creatorId === user.uuid
      ),
    }));
  }
}
