/* eslint-disable @nrwl/nx/enforce-module-boundaries */

export * from './lib/prisma-user.module';
export * from './lib/prisma-user.service';
export { PrismaClient as InventoryClient } from '.prisma/user-client';
export * from '.prisma/user-client';