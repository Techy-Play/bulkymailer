import { NextRequest, NextResponse } from "next/server";
import { getSessionUserId } from "@/lib/auth";
import { db } from "@/lib/db";
import { CampaignStatus } from "@/app/generated/prisma/enums";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const userId = await getSessionUserId();
    if (!userId) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

    const { id } = await params;

    const campaign = await db.campaign.findFirst({
      where: { id, userId },
      include: {
        template: true,
        contactList: true,
        senderProfile: true
      }
    });

    if (!campaign) return NextResponse.json({ error: "Campaign not found" }, { status: 404 });

    return NextResponse.json({ campaign });
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
    
    const existing = await db.campaign.findFirst({
      where: { id, userId }
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
