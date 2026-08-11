import { PrismaClient } from "../app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function getConnectionString(): string {
  let url = process.env.DATABASE_URL || "";
  if (
    url.includes("sslmode=require") ||
    url.includes("sslmode=prefer") ||
    url.includes("sslmode=verify-ca")
  ) {
    url = url.replace(/sslmode=(require|prefer|verify-ca)/g, "sslmode=verify-full");
  } else if (url && !url.includes("sslmode=")) {
    url += (url.includes("?") ? "&" : "?") + "sslmode=verify-full";
  }
  return url;
}

function createPrismaClient() {
  const adapter = new PrismaPg({
    connectionString: getConnectionString(),
  });

  return new PrismaClient({
    adapter,
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });
}

export const db = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;
