export * from './lib/prisma-inventory.module';
export * from './lib/prisma-inventory.service';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
export { PrismaClient as InventoryClient } from '.prisma/inventory-client';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
export * from '.prisma/inventory-client';
