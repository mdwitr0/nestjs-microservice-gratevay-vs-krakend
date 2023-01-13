export * from './lib/prisma-user.module';
export * from './lib/prisma-user.service';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
export { PrismaClient as InventoryClient } from '.prisma/user-client';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
export * from '.prisma/user-client';
