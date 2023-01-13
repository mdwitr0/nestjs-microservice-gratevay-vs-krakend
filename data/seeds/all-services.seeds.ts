// Seed from the inventory service

import {
  PrismaClient as InventoryPrismaClient,
  Prisma as InventoryPrisma,
} from '.prisma/inventory-client';
import {
  PrismaClient as UserPrismaClient,
  Prisma as UserPrisma,
} from '.prisma/user-client';
import { faker } from '@faker-js/faker';

const clean = async () => {
  const prisma = new InventoryPrismaClient();
  const userPrisma = new UserPrismaClient();
  await prisma.product.deleteMany({});
  await userPrisma.user.deleteMany({});
}

const createUsers = async (length: number) => {
  const prisma = new UserPrismaClient();
  const fakeUser = (): UserPrisma.UserCreateInput => ({
    email: faker.internet.email(),
    name: faker.name.fullName(),
    uuid: faker.datatype.uuid(),
  });

  const users = Array.from({ length }, fakeUser);
  return prisma.user.createMany({
    data: users,
  });
};

const createProducts = async (length: number) => {
  const userPrisma = new UserPrismaClient();
  const prisma = new InventoryPrismaClient();

  const users = await userPrisma.user.findMany();

  const fakeProduct = (
    creatorId: string
  ): InventoryPrisma.ProductCreateInput => ({
    name: faker.commerce.productName(),
    price: Number(faker.commerce.price(100, 200, 0)),
    uuid: faker.datatype.uuid(),
    creatorId,
  });

  const userProducts = users.map((user) =>
    Array.from({ length }, () => fakeProduct(user.uuid))
  );

  await prisma.product.createMany({
    data: userProducts.flat(),
  });

  for (const products of userProducts) {
    const userUuid = products[0].creatorId;
    const ids = products.map((p) => p.uuid).filter(p => p) as string[]
    
    await userPrisma.user.update({
      where: { uuid: userUuid },
      data: {
        createdProducts: {
          push: ids,
        }
      }
    });
  }
};

const createAll = async () => {
  await createUsers(10);
  await createProducts(10);
};

createAll().then(() => {});
