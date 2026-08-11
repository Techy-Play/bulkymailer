import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { EventType, BounceType } from "@/app/generated/prisma/enums";

import { Webhook } from "svix";

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const svix_id = req.headers.get("svix-id");
    const svix_timestamp = req.headers.get("svix-timestamp");
    const svix_signature = req.headers.get("svix-signature");

    if (!svix_id || !svix_timestamp || !svix_signature) {
      return NextResponse.json({ error: "Missing svix headers" }, { status: 400 });
    }

    const secret = process.env.RESEND_WEBHOOK_SECRET || "whsec_HdYwxS5lpzUv5dg7jKjDtxbe9kWuDbNF";
    const wh = new Webhook(secret);

    let payload: any;
    try {
      payload = wh.verify(rawBody, {
        "svix-id": svix_id,
        "svix-timestamp": svix_timestamp,
        "svix-signature": svix_signature,
      });
    } catch (err) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    const { type, data } = payload || {};

    if (!type || !data) {
      return NextResponse.json({ error: "Invalid webhook payload" }, { status: 400 });
    }

    if (type === "contact.created") {
      console.log("[webhook] contact.created", data);
      return NextResponse.json({ success: true, message: "Contact created logged" });
    }

    if (type === "contact.deleted") {
      console.log("[webhook] contact.deleted", data);
      return NextResponse.json({ success: true, message: "Contact deleted logged" });
    }

    const recipient = data.to?.[0] || data.email || data.recipient;
    const campaignId = data.tags?.campaign_id || data.headers?.["x-campaign-id"];

    if (!recipient) {
      return NextResponse.json({ message: "No recipient specified, event logged" });
    }

    // Determine event type
    let eventType: EventType | null = null;
    let bounceType: BounceType | null = null;
    let bounceReason: string | null = null;

    switch (type) {
      case "email.sent":
        eventType = EventType.SENT;
        break;
      case "email.delivered":
        eventType = EventType.DELIVERED;
        break;
      case "email.opened":
        eventType = EventType.OPENED;
        break;
      case "email.clicked":
        eventType = EventType.CLICKED;
        break;
      case "email.bounced":
        eventType = EventType.BOUNCED;
        bounceType = data.bounce_type === "hard" ? BounceType.HARD : BounceType.SOFT;
        bounceReason = data.bounce_message || "Server rejected message";
        break;
      case "email.complained":
        eventType = EventType.COMPLAINED;
        break;
      default:
        break;
    }

    if (!eventType) {
      return NextResponse.json({ message: `Ignored event type ${type}` });
    }

    // Extract device/client info
    const userAgent = data.user_agent || req.headers.get("user-agent") || "";
    let device = "Desktop";
    if (/mobile/i.test(userAgent)) device = "Mobile";
    if (/tablet|ipad/i.test(userAgent)) device = "Tablet";

    let emailClient = "Gmail";
    if (/outlook|msn|live|hotmail/i.test(userAgent || recipient)) emailClient = "Outlook";
    else if (/apple|mail/i.test(userAgent)) emailClient = "Apple Mail";
    else if (/yahoo/i.test(userAgent || recipient)) emailClient = "Yahoo";

    // If matching campaignId found, log event & update metrics
    if (campaignId) {
      const campaign = await db.campaign.findUnique({ where: { id: campaignId } });
      if (campaign) {
        // Create event log
        await db.campaignEvent.create({
          data: {
            campaignId,
            recipient,
            eventType,
            bounceType,
            bounceReason,
            linkUrl: data.click?.link || data.url || null,
            linkTag: data.click?.tag || "CTA Button",
            device,
            emailClient,
            country: data.geo?.country || "India",
            city: data.geo?.city || "New Delhi",
            userAgent,
          },
        });

        // Update aggregate campaign metrics
        const updateData: any = {};
        if (eventType === EventType.DELIVERED) {
          updateData.successfulRecipients = { increment: 1 };
        } else if (eventType === EventType.OPENED) {
          updateData.openedCount = { increment: 1 };
          updateData.uniqueOpens = { increment: 1 };
        } else if (eventType === EventType.CLICKED) {
          updateData.clickedCount = { increment: 1 };
          updateData.uniqueClicks = { increment: 1 };
        } else if (eventType === EventType.BOUNCED) {
          updateData.failedRecipients = { increment: 1 };
          if (bounceType === BounceType.HARD) updateData.hardBounces = { increment: 1 };
          else updateData.softBounces = { increment: 1 };
        } else if (eventType === EventType.COMPLAINED) {
          updateData.complaints = { increment: 1 };
        }

        await db.campaign.update({
          where: { id: campaignId },
          data: updateData,
        });
      }
    }

    return NextResponse.json({ success: true, type, recipient });
  } catch (err) {
    console.error("[webhooks_resend_error]", err);
    return NextResponse.json({ error: "Webhook processing error" }, { status: 500 });
  }
}
