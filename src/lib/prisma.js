import { PrismaClient } from '@prisma/client';
import path from 'path';
import fs from 'fs';

const globalForPrisma = globalThis;

function getPrismaInstance() {
  let dbPath = path.resolve(process.cwd(), 'prisma/dev.db');

  // On Vercel / AWS Lambda environments, the root directory is read-only.
  // We copy dev.db to /tmp/dev.db if available to enable read/write access.
  if (process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME) {
    try {
      const tmpPath = path.join('/tmp', 'dev.db');
      if (!fs.existsSync(tmpPath) && fs.existsSync(dbPath)) {
        fs.copyFileSync(dbPath, tmpPath);
      }
      if (fs.existsSync(tmpPath)) {
        dbPath = tmpPath;
      }
    } catch (e) {
      console.warn("Could not copy sqlite to /tmp:", e.message);
    }
  }

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
