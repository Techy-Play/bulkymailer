// Load environment variables before anything else
import "dotenv/config";

import { PrismaClient } from "../app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcrypt";

// Standalone client for seed — avoids the global singleton issue with tsx
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
  const hashedPassword = await bcrypt.hash("Admin@1234", 12);

  const admin = await prisma.user.upsert({
    where: { email: "admin@bulkymailer.com" },
    update: {
      passwordHash: hashedPassword,
      firstName: "Admin",
      lastName: "BulkyMailer",
      role: "ADMIN",
      status: "ACTIVE",
      emailVerified: true,
      isOnboardingCompleted: true,
    },
    create: {
      email: "admin@bulkymailer.com",
      passwordHash: hashedPassword,
      firstName: "Admin",
      lastName: "BulkyMailer",
      role: "ADMIN",
      status: "ACTIVE",
      emailVerified: true,
      isOnboardingCompleted: true,
    },
  });

  console.log("✅ Admin user seeded successfully:");
  console.log(`   Email    : ${admin.email}`);
  console.log(`   Password : Admin@1234`);
  console.log(`   Role     : ${admin.role}`);
  console.log(`   Status   : ${admin.status}`);
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error("❌ Seed failed:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
