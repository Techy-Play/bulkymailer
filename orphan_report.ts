import { db as prisma } from './lib/db';

async function checkOrphans() {
  try {
    const report = {
      orphanedCampaigns: [] as any[],
      orphanedTemplates: [] as any[],
      orphanedContactLists: [] as any[],
      orphanedMediaAssets: [] as any[],
      orphanedSenderProfiles: [] as any[],
      usersWithoutOrg: [] as any[],
    };

    // 1. Users without organization
    const users = await prisma.user.findMany({
      where: { organizationId: null },
      select: { id: true, email: true },
    });
    report.usersWithoutOrg = users;

    // 2. Campaigns
    const campaigns = await prisma.campaign.findMany({
      include: { user: { select: { organizationId: true } } }
    });
    report.orphanedCampaigns = campaigns.filter(c => !c.user?.organizationId).map(c => ({
      resourceId: c.id,
      resourceType: 'Campaign',
      userId: c.userId,
      userOrganizationId: c.user?.organizationId,
      reason: c.user ? 'User has no organizationId' : 'User does not exist'
    }));

    // 3. Templates (ignore userId = null as those are public templates)
    const templates = await prisma.template.findMany({
      where: { userId: { not: null } },
      include: { user: { select: { organizationId: true } } }
    });
    report.orphanedTemplates = templates.filter(t => !t.user?.organizationId).map(t => ({
      resourceId: t.id,
      resourceType: 'Template',
      userId: t.userId,
      userOrganizationId: t.user?.organizationId,
      reason: t.user ? 'User has no organizationId' : 'User does not exist'
    }));

    // 4. Contact Lists
    const contactLists = await prisma.contactList.findMany({
      include: { user: { select: { organizationId: true } } }
    });
    report.orphanedContactLists = contactLists.filter(c => !c.user?.organizationId).map(c => ({
      resourceId: c.id,
      resourceType: 'ContactList',
      userId: c.userId,
      userOrganizationId: c.user?.organizationId,
      reason: c.user ? 'User has no organizationId' : 'User does not exist'
    }));

    // 5. Media Assets
    const mediaAssets = await prisma.mediaAsset.findMany({
      include: { user: { select: { organizationId: true } } }
    });
    report.orphanedMediaAssets = mediaAssets.filter(m => !m.user?.organizationId).map(m => ({
      resourceId: m.id,
      resourceType: 'MediaAsset',
      userId: m.userId,
      userOrganizationId: m.user?.organizationId,
      reason: m.user ? 'User has no organizationId' : 'User does not exist'
    }));

    // 6. Sender Profiles
    const senderProfiles = await prisma.senderProfile.findMany({
      include: { user: { select: { organizationId: true } } }
    });
    report.orphanedSenderProfiles = senderProfiles.filter(s => !s.user?.organizationId).map(s => ({
      resourceId: s.id,
      resourceType: 'SenderProfile',
      userId: s.userId,
      userOrganizationId: s.user?.organizationId,
      reason: s.user ? 'User has no organizationId' : 'User does not exist'
    }));

    console.log(JSON.stringify(report, null, 2));

  } catch (error) {
    console.error('Error generating report:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkOrphans();
