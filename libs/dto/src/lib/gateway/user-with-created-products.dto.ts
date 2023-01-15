import { OmitType } from '@nestjs/swagger';
import { ProductEntity } from '../generated/inventory/product.entity';
import { UserEntity } from '../generated/user';

export class UserWithCreatedProductsDto extends OmitType(UserEntity, [
  'createdProducts',
]) {
  createdProducts: ProductEntity[];
}
