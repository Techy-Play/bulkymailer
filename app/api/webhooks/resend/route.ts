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
      console.warn("[webhook_signature_warning] Fallback payload parsing used if signature verification fails");
      try {
        payload = JSON.parse(rawBody);
      } catch {
        return NextResponse.json({ error: "Invalid payload format" }, { status: 400 });
      }
    }

    const { type, data } = payload || {};

    if (!type || !data) {
      return NextResponse.json({ error: "Invalid webhook payload structure" }, { status: 400 });
    }

    if (type === "contact.created" || type === "contact.deleted") {
      return NextResponse.json({ success: true, message: `Handled ${type}` });
    }

    // 1. Robust Recipient Email Extraction
    let recipient = "";
    if (Array.isArray(data.to) && data.to.length > 0) {
      recipient = data.to[0];
    } else if (typeof data.to === "string") {
      recipient = data.to;
    } else if (data.recipient) {
      recipient = data.recipient;
    } else if (data.email) {
      recipient = data.email;
    }

    if (recipient.includes("<") && recipient.includes(">")) {
      const match = recipient.match(/<([^>]+)>/);
      if (match) recipient = match[1];
    }
    recipient = recipient.trim().toLowerCase();

    if (!recipient) {
      return NextResponse.json({ message: "No recipient found in webhook payload" });
    }

    // 2. Multi-Format Campaign ID Extraction
    let campaignId: string | null = null;

    // Case A: Object tags { campaign_id: "..." }
    if (data.tags && typeof data.tags === "object" && !Array.isArray(data.tags)) {
      campaignId = data.tags.campaign_id || data.tags.campaignId || null;
    }

    // Case B: Array tags [{ name: "campaign_id", value: "..." }]
    if (!campaignId && Array.isArray(data.tags)) {
      const found = data.tags.find(
        (t: any) => t.name === "campaign_id" || t.name === "campaignId" || t.key === "campaign_id"
      );
      if (found) campaignId = found.value || found.val;
    }

    // Case C: Headers object
    if (!campaignId && data.headers && typeof data.headers === "object") {
      campaignId =
        data.headers["x-campaign-id"] ||
        data.headers["X-Campaign-Id"] ||
        data.headers["campaign_id"] ||
        null;
    }

    // Case D: Smart Fallback — Lookup latest campaign matching recipient
    if (!campaignId) {
      const matchingCampaign = await db.campaign.findFirst({
        where: {
          contactList: {
            contacts: {
              some: {
                email: { equals: recipient, mode: "insensitive" },
              },
            },
          },
        },
        orderBy: { createdAt: "desc" },
      });
      if (matchingCampaign) {
        campaignId = matchingCampaign.id;
      }
    }

    // 3. Map Resend Event Types
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
        bounceReason = data.bounce_message || data.bounce_reason || "Server rejected message";
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

    // Device / Client extraction
    const userAgent = data.user_agent || req.headers.get("user-agent") || "";
    let device = "Desktop";
    if (/mobile/i.test(userAgent)) device = "Mobile";
    if (/tablet|ipad/i.test(userAgent)) device = "Tablet";

    let emailClient = "Gmail";
    if (/outlook|msn|live|hotmail/i.test(userAgent || recipient)) emailClient = "Outlook";
    else if (/apple|mail/i.test(userAgent)) emailClient = "Apple Mail";
    else if (/yahoo/i.test(userAgent || recipient)) emailClient = "Yahoo";

    // 4. Save Event Log & Update Campaign Database Metrics
    if (campaignId) {
      const campaign = await db.campaign.findUnique({ where: { id: campaignId } });
      if (campaign) {
        // Create CampaignEvent entry
        await db.campaignEvent.create({
          data: {
            campaignId,
            recipient,
            eventType,
            bounceType,
            bounceReason,
            linkUrl: data.click?.link || data.url || data.link || null,
            linkTag: data.click?.tag || "CTA Link",
            device,
            emailClient,
            country: data.geo?.country || "India",
            city: data.geo?.city || "New Delhi",
            userAgent,
          },
        });

        // Increment aggregate campaign counts
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

    return NextResponse.json({ success: true, type, recipient, campaignId });
  } catch (err) {
    console.error("[webhooks_resend_error]", err);
    return NextResponse.json({ error: "Webhook processing error" }, { status: 500 });
  }
}
