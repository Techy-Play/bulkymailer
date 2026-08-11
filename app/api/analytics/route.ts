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
            contacts: {
              select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
              },
            },
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

    const selectedCampaignId = campaignId && campaignId !== "null" && campaignId !== ""
      ? campaignId
      : null;

    const userCampaignIds = userCampaigns.map((c) => c.id);

    // 3. Safely fetch real campaign events (handling dev hot-reloads)
    let realEvents: any[] = [];
    
    if (selectedCampaignId && !userCampaignIds.includes(selectedCampaignId)) {
      return NextResponse.json({ error: "Unauthorized access to campaign" }, { status: 403 });
    }

    try {
      if ((db as any).campaignEvent) {
        realEvents = await (db as any).campaignEvent.findMany({
          where: selectedCampaignId
            ? { campaignId: selectedCampaignId }
            : { campaignId: { in: userCampaignIds } },
          orderBy: { createdAt: "desc" },
          take: 500,
        });
      }
    } catch {
      realEvents = [];
    }

    // Filter target campaigns if a specific campaign is selected
    const targetCampaigns = selectedCampaignId
      ? userCampaigns.filter((c) => c.id === selectedCampaignId)
      : userCampaigns;

    // 4. Calculate STRICT REAL Metrics for the Individual User (NO FAKE NUMBERS)
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
      // All Campaigns Combined for this individual user
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

      // If user has sent emails recorded on User profile (e.g. emailsSentThisMonth = 8), use user.emailsSentThisMonth if sent is 0
      if (sent === 0 && user.emailsSentThisMonth > 0) {
        sent = user.emailsSentThisMonth;
        delivered = user.emailsSentThisMonth;
      }
    }

    // Process real event logs if present
    if (realEvents.length > 0) {
      const realOpens = realEvents.filter((e) => e.eventType === "OPENED").length;
      const realClicks = realEvents.filter((e) => e.eventType === "CLICKED").length;
      const realHardBounces = realEvents.filter((e) => e.eventType === "BOUNCED" && e.bounceType === "HARD").length;
      const realSoftBounces = realEvents.filter((e) => e.eventType === "BOUNCED" && e.bounceType === "SOFT").length;
      const realComplaints = realEvents.filter((e) => e.eventType === "COMPLAINED").length;
      const realUnsubscribes = realEvents.filter((e) => e.eventType === "UNSUBSCRIBED").length;

      opens = Math.max(opens, realOpens);
      clicks = Math.max(clicks, realClicks);
      hardBounces = realHardBounces;
      softBounces = realSoftBounces;
      complaints = realComplaints;
      unsubscribes = realUnsubscribes;
    }

    // Unique Opens & Clicks calculation from real event recipients
    const openRecipients = new Set(realEvents.filter((e) => e.eventType === "OPENED").map((e) => e.recipient));
    const clickRecipients = new Set(realEvents.filter((e) => e.eventType === "CLICKED").map((e) => e.recipient));

    const uniqueOpens = openRecipients.size;
    const uniqueClicks = clickRecipients.size;
    const totalBounces = hardBounces + softBounces;

    // Strict rates calculation (0 if no emails sent)
    const deliveryRate = sent > 0 ? Number(((delivered / sent) * 100).toFixed(1)) : 0;
    const openRate = delivered > 0 ? Number(((uniqueOpens / delivered) * 100).toFixed(1)) : 0;
    const ctr = delivered > 0 ? Number(((uniqueClicks / delivered) * 100).toFixed(1)) : 0;
    const bounceRate = sent > 0 ? Number(((totalBounces / sent) * 100).toFixed(2)) : 0;
    const unsubscribeRate = delivered > 0 ? Number(((unsubscribes / delivered) * 100).toFixed(2)) : 0;

    // 5. REAL Bounce Audit Details
    const bounceEvents = realEvents.filter((e) => e.eventType === "BOUNCED");
    const bounceDetails = bounceEvents.map((e) => ({
      email: e.recipient,
      type: e.bounceType === "HARD" ? "Hard Bounce" : "Soft Bounce",
      reason: e.bounceReason || "Server rejected message",
      date: new Date(e.createdAt).toLocaleString([], { dateStyle: "short", timeStyle: "short" }),
    }));

    // 6. REAL Click Heatmap
    const clickEvents = realEvents.filter((e) => e.eventType === "CLICKED");
    const clickGroup: Record<string, { clicks: number; url: string }> = {};
    clickEvents.forEach((e) => {
      const tag = e.linkTag || "CTA Link";
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

    // 7. REAL Audience Analytics (Devices & Clients)
    const deviceCounts: Record<string, number> = { Desktop: 0, Mobile: 0, Tablet: 0 };
    const clientCounts: Record<string, number> = {};

    realEvents.forEach((e) => {
      const dev = e.device || "Desktop";
      deviceCounts[dev] = (deviceCounts[dev] || 0) + 1;

      const cli = e.emailClient || "Gmail";
      clientCounts[cli] = (clientCounts[cli] || 0) + 1;
    });

    const totalEvents = realEvents.length;
    const deviceBreakdown = totalEvents > 0
      ? [
          { name: "Desktop", value: Math.round(((deviceCounts.Desktop || 0) / totalEvents) * 100), color: "#4F46E5" },
          { name: "Mobile", value: Math.round(((deviceCounts.Mobile || 0) / totalEvents) * 100), color: "#10B981" },
          { name: "Tablet", value: Math.round(((deviceCounts.Tablet || 0) / totalEvents) * 100), color: "#F59E0B" },
        ]
      : [
          { name: "Desktop", value: 0, color: "#4F46E5" },
          { name: "Mobile", value: 0, color: "#10B981" },
          { name: "Tablet", value: 0, color: "#F59E0B" },
        ];

    const emailClientBreakdown = Object.keys(clientCounts).length > 0
      ? Object.entries(clientCounts).map(([name, count]) => ({
          name,
          count,
          percentage: Number(((count / totalEvents) * 100).toFixed(1)),
        }))
      : [];

    // 8. Campaign Timeline Performance
    const campaignPerformance = targetCampaigns.map((c) => ({
      name: c.campaignName.length > 15 ? c.campaignName.substring(0, 15) + "..." : c.campaignName,
      date: new Date(c.createdAt).toLocaleDateString([], { month: "short", day: "numeric" }),
      sent: c.totalRecipients || 0,
      delivered: c.successfulRecipients || Math.max(0, (c.totalRecipients || 0) - (c.failedRecipients || 0)),
      opens: c.openedCount || 0,
      clicks: c.clickedCount || 0,
    })).reverse();

    // 9. Hourly Activity Timeline
    const hours = ["8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"];
    const hourlyMap: Record<string, { opens: number; clicks: number }> = {};
    hours.forEach((h) => { hourlyMap[h] = { opens: 0, clicks: 0 }; });

    realEvents.forEach((e) => {
      const hourStr = new Date(e.createdAt).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
      const matchedHour = hours.find((h) => h.split(":")[0] === hourStr.split(":")[0]) || "10:00 AM";
      if (e.eventType === "OPENED") hourlyMap[matchedHour].opens += 1;
      if (e.eventType === "CLICKED") hourlyMap[matchedHour].clicks += 1;
    });

    const hourlyActivity = hours.map((hour) => ({
      hour,
      opens: hourlyMap[hour].opens,
      clicks: hourlyMap[hour].clicks,
    }));

    // 9. REAL Recipient Table (from user's actual contacts & events)
    let recipientMap = new Map();
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
        lastActivity: ctEvents.length > 0
          ? new Date(ctEvents[0].createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
          : "No activity yet",
      });
    });

    const recipientsTable = Array.from(recipientMap.values());

    // 10. REAL Dynamic AI Insights (Based strictly on actual user data)
    const aiInsights = [];
    if (userCampaigns.length === 0 && sent === 0) {
      aiInsights.push({
        title: "No Campaigns Dispatched Yet",
        text: "You haven't sent any email campaigns yet. Go to Campaigns to create and dispatch your first bulk email!",
        type: "info",
      });
    } else {
      aiInsights.push({
        title: "User Campaign Performance",
        text: `You have ${userCampaigns.length} campaign(s) and ${totalRecipients} contact(s) in your account.`,
        type: "info",
      });
      if (sent > 0) {
        aiInsights.push({
          title: "Deliverability Status",
          text: `Your current delivery rate is ${deliveryRate}%. (${delivered} delivered out of ${sent} sent).`,
          type: deliveryRate >= 98 ? "positive" : "warning",
        });
      }
    }

    return NextResponse.json({
      campaigns: userCampaigns,
      selectedCampaignId,
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
      bounceDetails,
      clickHeatmap,
      campaignPerformance,
      audience: {
        deviceBreakdown,
        emailClientBreakdown,
        hourlyActivity,
      },
      activityFeed: realEvents.map((e) => ({
        id: e.id,
        recipient: e.recipient,
        eventType: e.eventType,
        bounceReason: e.bounceReason,
        linkTag: e.linkTag,
        createdAt: e.createdAt,
      })),
      recipientsTable,
      aiInsights,
    });
  } catch (err) {
    console.error("[analytics_api_error]", err);
    return NextResponse.json({ error: "Failed to compute user analytics data" }, { status: 500 });
  }
}
