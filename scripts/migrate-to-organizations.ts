import 'dotenv/config';
import { db as prisma } from '../lib/db';

async function main() {
  console.log('Starting migration to multi-tenant organization structure...');

  const users = await prisma.user.findMany({
    include: {
      memberships: true,
      organization: true // Legacy organization relation if any
    }
  });

  console.log(`Found ${users.length} users.`);

  let migratedCount = 0;

  for (const user of users) {
    // Determine the role. If they had 'ADMIN' in the old schema, maybe they become 'OWNER' of their own org, or we just default everyone to OWNER of their respective org.
    // The prompt says "with role = OWNER".
    
    // Check if they already have an active membership
    if (user.memberships.length > 0) {
      console.log(`User ${user.email} already has memberships. Skipping...`);
      continue;
    }

    let targetOrgId = user.organizationId;

    if (!targetOrgId) {
      // If the user somehow has no legacy organizationId, create a default organization for them.
      console.log(`User ${user.email} has no legacy organization. Creating one...`);
      const newOrg = await prisma.organization.create({
        data: {
          name: `${user.firstName}'s Organization`,
          addressLine1: "N/A",
          city: "N/A",
          postalCode: "N/A",
          country: "N/A",
          teamSize: "SOLO",
          contactRange: "LESS_THAN_1000",
          sellsOnline: false,
        }
      });
      targetOrgId = newOrg.id;
      
      // Update their legacy organizationId just in case
      await prisma.user.update({
        where: { id: user.id },
        data: { organizationId: targetOrgId }
      });
    }

    // Create the membership
    await prisma.organizationMembership.create({
      data: {
        userId: user.id,
        organizationId: targetOrgId!,
        role: 'OWNER',
        status: 'ACTIVE'
      }
    });

    console.log(`Created OWNER membership for ${user.email} in org ${targetOrgId}`);
    migratedCount++;
  }

  // Find the first user ever created and make them Super Admin if none exists
  const superAdmins = await prisma.user.count({ where: { isSuperAdmin: true } });
  if (superAdmins === 0) {
    const firstUser = await prisma.user.findFirst({
      orderBy: { createdAt: 'asc' }
    });
    if (firstUser) {
      await prisma.user.update({
        where: { id: firstUser.id },
        data: { isSuperAdmin: true }
      });
      console.log(`Granted Super Admin privileges to the initial system creator: ${firstUser.email}`);
    }
  }

  console.log(`Migration complete. Migrated ${migratedCount} users.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
