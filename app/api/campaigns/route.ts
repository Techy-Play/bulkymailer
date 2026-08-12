import { NextRequest, NextResponse } from "next/server";
import { getSessionUserId } from "@/lib/auth";
import { getActiveOrganizationId, requirePermission } from "@/lib/auth/organization-context";
import { db } from "@/lib/db";
import { CampaignStatus } from "@/app/generated/prisma/enums";

export async function GET(req: NextRequest) {
  try {
    const userId = await getSessionUserId();
    if (!userId) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

    const orgId = await getActiveOrganizationId();
    if (!orgId) return NextResponse.json({ error: "No active organization" }, { status: 403 });

    const __perm = await requirePermission(orgId, "campaign.view");
    if (!__perm) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    const campaigns = await db.campaign.findMany({
      where: { organizationId: orgId },
      include: {
        template: { select: { name: true } },
        contactList: { select: { name: true } },
        senderProfile: { select: { fromName: true, fromEmail: true } }
      },
      orderBy: { createdAt: "desc" }
    });

    return NextResponse.json({ campaigns });
  } catch (err) {
    console.error("[campaigns_GET]", err);
    return NextResponse.json({ error: "Failed to fetch campaigns" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const userId = await getSessionUserId();
    if (!userId) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

    const orgId = await getActiveOrganizationId();
    if (!orgId) return NextResponse.json({ error: "No active organization" }, { status: 403 });

    const __perm = await requirePermission(orgId, "campaign.create");
    if (!__perm) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    const { subject, campaignName, templateId, contactListId, senderProfileId, htmlSnapshot } = await req.json();

    const campaign = await db.campaign.create({
      data: {
        userId, // retain attribution to creator
        organizationId: orgId, // multi-tenant boundary
        subject: subject || campaignName || "Untitled Campaign",
        campaignName: campaignName || subject || "Untitled Campaign",
        templateId: templateId || null,
        contactListId: contactListId || null,
        senderProfileId: senderProfileId || null,
        htmlSnapshot: htmlSnapshot || null,
        status: CampaignStatus.DRAFT
      }
    });

    return NextResponse.json({ campaign });
  } catch (err) {
    console.error("[campaigns_POST]", err);
    return NextResponse.json({ error: "Failed to create campaign" }, { status: 500 });
  }
}
