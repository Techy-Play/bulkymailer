import { NextRequest, NextResponse } from "next/server";
import { getSessionUserId } from "@/lib/auth";
import { db } from "@/lib/db";
import { CampaignStatus } from "@/app/generated/prisma/enums";

export async function GET(req: NextRequest) {
  try {
    const userId = await getSessionUserId();
    if (!userId) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

    const campaigns = await db.campaign.findMany({
      where: { userId },
      include: {
        template: { select: { name: true } },
        contactList: { select: { name: true } }
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

    const { subject, templateId, contactListId, senderProfileId } = await req.json();

    if (!subject || !templateId || !contactListId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const campaign = await db.campaign.create({
      data: {
        userId,
        subject,
        templateId,
        contactListId,
        senderProfileId: senderProfileId || null,
        status: CampaignStatus.DRAFT
      }
    });

    return NextResponse.json({ campaign });
  } catch (err) {
    console.error("[campaigns_POST]", err);
    return NextResponse.json({ error: "Failed to create campaign" }, { status: 500 });
  }
}
