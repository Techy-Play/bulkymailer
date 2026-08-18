import { NextRequest, NextResponse } from "next/server";
import { getSessionUserId } from "@/lib/auth";
import { getActiveOrganizationId, requirePermission } from "@/lib/auth/organization-context";
import { db } from "@/lib/db";
import { CampaignStatus } from "@/app/generated/prisma/enums";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const userId = await getSessionUserId();
    if (!userId) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

    const { id } = await params;

    const orgId = await getActiveOrganizationId();
    if (!orgId) return NextResponse.json({ error: "No active organization" }, { status: 403 });

    const __perm = await requirePermission(orgId, "campaign.view");
    if (!__perm) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    const campaign = await db.campaign.findFirst({
      where: { id, organizationId: orgId },
      include: {
        template: true,
        contactList: true,
        senderProfile: true
      }
    });

    if (!campaign) return NextResponse.json({ error: "Campaign not found" }, { status: 404 });

    const org = await db.organization.findUnique({
      where: { id: orgId },
      include: { emailProvider: true }
    });
    
    let hasSmtp = false;
    let smtpSource = "NONE";
    let orgRole = await db.organizationMembership.findFirst({ where: { organizationId: orgId, userId } }).then(m => m?.role || "OWNER");
    if (org?.ownerUserId === userId) orgRole = "OWNER";

    if (org?.emailProvider?.provider === "SMTP") {
      hasSmtp = true;
      smtpSource = "ORG";
    } else {
      const personalOrg = await db.organization.findFirst({
        where: { ownerUserId: userId, type: "PERSONAL" },
        include: { emailProvider: true }
      });
      if (personalOrg?.emailProvider?.provider === "SMTP") {
        hasSmtp = true;
        smtpSource = "PERSONAL";
      }
    }

    return NextResponse.json({ campaign, hasSmtp, smtpSource, orgRole });
  } catch (err) {
    console.error("[campaign_GET]", err);
    return NextResponse.json({ error: "Failed to fetch campaign" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const userId = await getSessionUserId();
    if (!userId) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

    const { id } = await params;
    
    const orgId = await getActiveOrganizationId();
    if (!orgId) return NextResponse.json({ error: "No active organization" }, { status: 403 });

    const __perm = await requirePermission(orgId, "campaign.edit");
    if (!__perm) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    
    const existing = await db.campaign.findFirst({
      where: { id, organizationId: orgId }
    });

    if (!existing) return NextResponse.json({ error: "Campaign not found" }, { status: 404 });
    if (existing.status !== CampaignStatus.DRAFT) {
      return NextResponse.json({ error: "Only draft campaigns can be updated" }, { status: 400 });
    }

    const body = await req.json();
    const {
      subject,
      campaignName,
      templateId,
      contactListId,
      senderProfileId,
      htmlSnapshot,
      previewTextSnapshot,
      subjectSnapshot
    } = body;

    const campaign = await db.campaign.update({
      where: { id },
      data: {
        ...(subject !== undefined && { subject }),
        ...(campaignName !== undefined && { campaignName }),
        ...(templateId !== undefined && { templateId }),
        ...(contactListId !== undefined && { contactListId }),
        ...(senderProfileId !== undefined && { senderProfileId }),
        ...(htmlSnapshot !== undefined && { htmlSnapshot: htmlSnapshot }),
        ...(previewTextSnapshot !== undefined && { previewTextSnapshot }),
        ...(subjectSnapshot !== undefined && { subjectSnapshot })
      }
    });

    return NextResponse.json({ campaign });
  } catch (err) {
    console.error("[campaign_PATCH]", err);
    return NextResponse.json({ error: "Failed to update campaign" }, { status: 500 });
  }
}
