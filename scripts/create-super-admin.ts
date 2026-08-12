import 'dotenv/config';
import { db } from '../lib/db';
import bcrypt from 'bcryptjs';

async function main() {
  const email = 'superadmin@bulkymailer.com';
  const password = 'SuperAdmin123!';
  const hashedPassword = await bcrypt.hash(password, 10);

  console.log(`Upserting super admin: ${email}`);

  const user = await db.user.upsert({
    where: { email },
    update: {
      passwordHash: hashedPassword,
      isSuperAdmin: true,
      status: 'ACTIVE',
      emailVerified: true,
      isOnboardingCompleted: true,
    },
    create: {
      email,
      passwordHash: hashedPassword,
      firstName: 'Super',
      lastName: 'Admin',
      role: 'OWNER',
      status: 'ACTIVE',
      isSuperAdmin: true,
      emailVerified: true,
      isOnboardingCompleted: true,
    },
  });

  console.log(`Successfully bootstrapped super admin. ID: ${user.id}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
