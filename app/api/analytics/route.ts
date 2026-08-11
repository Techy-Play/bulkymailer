import { NextRequest, NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const user = await getSessionUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const campaignId = searchParams.get("campaignId");
    const daysParam = parseInt(searchParams.get("days") || "15", 10);
    const days = [7, 15, 30, 90].includes(daysParam) ? daysParam : 15;

    // 1. Fetch user's actual campaigns from DB
    const userCampaigns = await db.campaign.findMany({
      where: { userId: user.id },
      select: {
        id: true,
        campaignName: true,
        subject: true,
        status: true,
        createdAt: true,
        totalRecipients: true,
        successfulRecipients: true,
        failedRecipients: true,
        openedCount: true,
        clickedCount: true,
        contactList: {
          select: {
            id: true,
            name: true,
            _count: { select: { contacts: true } },
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    // 2. Fetch user's total contacts across all lists
    const userContacts = await db.contact.findMany({
      where: {
        list: {
          userId: user.id,
        },
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        listId: true,
      },
    });

    const selectedCampaignId =
      campaignId && campaignId !== "null" && campaignId !== "" ? campaignId : null;
    const userCampaignIds = userCampaigns.map((c) => c.id);

    if (selectedCampaignId && !userCampaignIds.includes(selectedCampaignId)) {
      return NextResponse.json({ error: "Unauthorized access to campaign" }, { status: 403 });
    }

    // 3. Fetch real campaign events for this user
    let realEvents: any[] = [];
    try {
      if ((db as any).campaignEvent) {
        realEvents = await (db as any).campaignEvent.findMany({
          where: selectedCampaignId
            ? { campaignId: selectedCampaignId }
            : { campaignId: { in: userCampaignIds } },
          orderBy: { createdAt: "desc" },
          take: 1000,
        });
      }
    } catch {
      realEvents = [];
    }

    // Filter target campaigns
    const targetCampaigns = selectedCampaignId
      ? userCampaigns.filter((c) => c.id === selectedCampaignId)
      : userCampaigns;

    // 4. Compute High-Level Metrics
    let totalRecipients = 0;
    let sent = 0;
    let delivered = 0;
    let opens = 0;
    let clicks = 0;
    let hardBounces = 0;
    let softBounces = 0;
    let complaints = 0;
    let unsubscribes = 0;

    if (selectedCampaignId) {
      const c = targetCampaigns[0];
      if (c) {
        totalRecipients = c.contactList?._count?.contacts || c.totalRecipients || 0;
        if (c.status === "SENT" || c.status === "SENDING" || c.status === "QUEUED") {
          sent = c.totalRecipients || totalRecipients;
          delivered = c.successfulRecipients || Math.max(0, sent - (c.failedRecipients || 0));
        }
        opens = c.openedCount || 0;
        clicks = c.clickedCount || 0;
      }
    } else {
      totalRecipients = userContacts.length;
      targetCampaigns.forEach((c) => {
        if (c.status === "SENT" || c.status === "SENDING") {
          const count = c.totalRecipients || c.contactList?._count?.contacts || 0;
          sent += count;
          delivered += c.successfulRecipients || Math.max(0, count - (c.failedRecipients || 0));
        }
        opens += c.openedCount || 0;
        clicks += c.clickedCount || 0;
      });

      if (sent === 0 && user.emailsSentThisMonth > 0) {
        sent = user.emailsSentThisMonth;
        delivered = user.emailsSentThisMonth;
      }
    }

    // Process real event logs if present
    if (realEvents.length > 0) {
      const realOpens = realEvents.filter((e) => e.eventType === "OPENED").length;
      const realClicks = realEvents.filter((e) => e.eventType === "CLICKED").length;
      const realHardBounces = realEvents.filter(
        (e) => e.eventType === "BOUNCED" && e.bounceType === "HARD"
      ).length;
      const realSoftBounces = realEvents.filter(
        (e) => e.eventType === "BOUNCED" && e.bounceType === "SOFT"
      ).length;
      const realComplaints = realEvents.filter((e) => e.eventType === "COMPLAINED").length;
      const realUnsubscribes = realEvents.filter((e) => e.eventType === "UNSUBSCRIBED").length;

      opens = Math.max(opens, realOpens);
      clicks = Math.max(clicks, realClicks);
      hardBounces = realHardBounces;
      softBounces = realSoftBounces;
      complaints = realComplaints;
      unsubscribes = realUnsubscribes;
    }

    // Unique Opens & Clicks
    const openRecipients = new Set(
      realEvents.filter((e) => e.eventType === "OPENED").map((e) => e.recipient)
    );
    const clickRecipients = new Set(
      realEvents.filter((e) => e.eventType === "CLICKED").map((e) => e.recipient)
    );

    const uniqueOpens = openRecipients.size || (opens > 0 ? opens : 0);
    const uniqueClicks = clickRecipients.size || (clicks > 0 ? clicks : 0);
    const totalBounces = hardBounces + softBounces;

    // Rates calculation
    const deliveryRate = sent > 0 ? Number(((delivered / sent) * 100).toFixed(2)) : 0;
    const openRate = delivered > 0 ? Number(((uniqueOpens / delivered) * 100).toFixed(2)) : 0;
    const ctr = delivered > 0 ? Number(((uniqueClicks / delivered) * 100).toFixed(2)) : 0;
    const bounceRate = sent > 0 ? Number(((totalBounces / sent) * 100).toFixed(2)) : 0;
    const unsubscribeRate = delivered > 0 ? Number(((unsubscribes / delivered) * 100).toFixed(2)) : 0;

    // 5. Generate Date Bucket Time-Series (Resend Metrics Chart)
    const now = new Date();
    const timeSeriesMap: Record<
      string,
      { date: string; rawDate: string; sent: number; delivered: number; opened: number; clicked: number; bounced: number }
    > = {};

    for (let i = days - 1; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(now.getDate() - i);
      const rawDate = d.toISOString().split("T")[0];
      const dateLabel = d.toLocaleDateString("en-US", { month: "short", day: "2-digit" });
      timeSeriesMap[rawDate] = {
        date: dateLabel,
        rawDate,
        sent: 0,
        delivered: 0,
        opened: 0,
        clicked: 0,
        bounced: 0,
      };
    }

    // Populate time-series with campaigns dispatched on dates
    targetCampaigns.forEach((c) => {
      const campaignDate = new Date(c.createdAt).toISOString().split("T")[0];
      if (timeSeriesMap[campaignDate]) {
        const cSent = c.totalRecipients || 0;
        const cDelivered = c.successfulRecipients || Math.max(0, cSent - (c.failedRecipients || 0));
        timeSeriesMap[campaignDate].sent += cSent;
        timeSeriesMap[campaignDate].delivered += cDelivered;
        timeSeriesMap[campaignDate].opened += c.openedCount || 0;
        timeSeriesMap[campaignDate].clicked += c.clickedCount || 0;
      }
    });

    // Populate time-series with real event logs
    realEvents.forEach((e) => {
      const eventDate = new Date(e.createdAt).toISOString().split("T")[0];
      if (timeSeriesMap[eventDate]) {
        if (e.eventType === "SENT") timeSeriesMap[eventDate].sent += 1;
        if (e.eventType === "DELIVERED") timeSeriesMap[eventDate].delivered += 1;
        if (e.eventType === "OPENED") timeSeriesMap[eventDate].opened += 1;
        if (e.eventType === "CLICKED") timeSeriesMap[eventDate].clicked += 1;
        if (e.eventType === "BOUNCED") timeSeriesMap[eventDate].bounced += 1;
      }
    });

    const timeSeries = Object.values(timeSeriesMap);

    // 6. Bounce Audit Log
    const bounceEvents = realEvents.filter((e) => e.eventType === "BOUNCED");
    const bounceDetails = bounceEvents.map((e) => ({
      email: e.recipient,
      type: e.bounceType === "HARD" ? "Hard Bounce" : "Soft Bounce",
      reason: e.bounceReason || "Server rejected message",
      date: new Date(e.createdAt).toLocaleString([], { dateStyle: "short", timeStyle: "short" }),
    }));

    // 7. Click Heatmap
    const clickEvents = realEvents.filter((e) => e.eventType === "CLICKED");
    const clickGroup: Record<string, { clicks: number; url: string }> = {};
    clickEvents.forEach((e) => {
      const tag = e.linkTag || "CTA Button Link";
      if (!clickGroup[tag]) clickGroup[tag] = { clicks: 0, url: e.linkUrl || "#" };
      clickGroup[tag].clicks += 1;
    });

    const totalClicksCount = clickEvents.length || 1;
    const clickHeatmap = Object.entries(clickGroup).map(([element, d]) => ({
      element,
      clicks: d.clicks,
      percentage: Number(((d.clicks / totalClicksCount) * 100).toFixed(1)),
      url: d.url,
    }));

    // 8. Recipient Activity Table
    const recipientMap = new Map();
    userContacts.forEach((ct) => {
      const ctEvents = realEvents.filter((e) => e.recipient === ct.email);
      const hasClicked = ctEvents.some((e) => e.eventType === "CLICKED");
      const hasOpened = ctEvents.some((e) => e.eventType === "OPENED");
      const hasBounced = ctEvents.some((e) => e.eventType === "BOUNCED");

      let status = "Subscribed";
      if (hasBounced) status = "Bounced";
      else if (hasClicked) status = "Clicked";
      else if (hasOpened) status = "Opened";
      else if (sent > 0) status = "Delivered";

      recipientMap.set(ct.email, {
        email: ct.email,
        status,
        opens: ctEvents.filter((e) => e.eventType === "OPENED").length,
        clicks: ctEvents.filter((e) => e.eventType === "CLICKED").length,
        lastActivity:
          ctEvents.length > 0
            ? new Date(ctEvents[0].createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
            : "No activity yet",
      });
    });

    const recipientsTable = Array.from(recipientMap.values());
    const domainLabel = "send.au-acadex.com";

    return NextResponse.json({
      campaigns: userCampaigns,
      selectedCampaignId,
      days,
      domainLabel,
      overview: {
        recipients: totalRecipients,
        sent,
        delivered,
        opens,
        uniqueOpens,
        clicks,
        uniqueClicks,
        hardBounces,
        softBounces,
        totalBounces,
        complaints,
        unsubscribes,
        deliveryRate,
        openRate,
        ctr,
        bounceRate,
        unsubscribeRate,
      },
      timeSeries,
      bounceDetails,
      clickHeatmap,
      activityFeed: realEvents.map((e) => ({
        id: e.id,
        recipient: e.recipient,
        eventType: e.eventType,
        bounceReason: e.bounceReason,
        linkTag: e.linkTag,
        createdAt: e.createdAt,
      })),
      recipientsTable,
    });
  } catch (err) {
    console.error("[analytics_api_error]", err);
    return NextResponse.json({ error: "Failed to compute user analytics data" }, { status: 500 });
  }
}
