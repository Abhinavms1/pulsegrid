import { PrismaClient } from '@prisma/client';
import path from 'path';

const globalForPrisma = globalThis;

function getPrismaInstance() {
  const dbPath = path.resolve(process.cwd(), 'prisma/dev.db');
  return new PrismaClient({
    datasources: {
      db: {
        url: `file:${dbPath}`
      }
    },
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error']
  });
}

export const prisma = globalForPrisma.prisma || getPrismaInstance();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}
