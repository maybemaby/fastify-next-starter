/* eslint-disable vars-on-top */
import { PrismaClient } from "@prisma/client";
export * from "@prisma/client";

declare global {
  // eslint-disable-next-line no-var
  var cachedPrisma: PrismaClient;
}

let prisma: PrismaClient;
if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!global.cachedPrisma) {
    global.cachedPrisma = new PrismaClient({
      log: ["query", "info", "warn"],
    });
  }
  prisma = global.cachedPrisma;
}

export const db = prisma;
