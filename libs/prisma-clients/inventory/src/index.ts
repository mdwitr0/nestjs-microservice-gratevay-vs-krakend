/* eslint-disable @nrwl/nx/enforce-module-boundaries */

export * from './lib/prisma-inventory.module';
export * from './lib/prisma-inventory.service';
export { PrismaClient as InventoryClient } from '.prisma/inventory-client';
export * from '.prisma/inventory-client';