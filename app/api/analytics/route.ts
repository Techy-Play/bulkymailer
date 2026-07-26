import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSessionUser } from "@/lib/auth";

export async function GET(request: Request) {
  try {
    const user = await getSessionUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const timeline = searchParams.get("timeline") || "1M";

    // 1. Fetch total counts
    const totalCampaigns = await db.campaign.count({
      where: { userId: user.id },
    });

    const sentCampaigns = await db.campaign.count({
      where: { userId: user.id, status: "SENT" },
    });

    const contactLists = await db.contactList.findMany({
      where: { userId: user.id },
      select: { id: true },
    });

    const listIds = contactLists.map((l) => l.id);
    const activeSubs = await db.contact.count({
      where: { listId: { in: listIds } },
    });

    // 2. Fetch all user campaigns for timeline calculation
    const allCampaigns = await db.campaign.findMany({
      where: { userId: user.id },
      select: {
        id: true,
        campaignName: true,
        subject: true,
        status: true,
        createdAt: true,
      },
      orderBy: { createdAt: "asc" },
    });

    // 3. Fetch all user contacts for growth timeline
    const allContacts = await db.contact.findMany({
      where: { listId: { in: listIds } },
      select: { id: true, createdAt: true },
      orderBy: { createdAt: "asc" },
    });

    // 4. Construct Date Buckets depending on timeline
    const now = new Date();
    const buckets: {
      dateLabel: string;
      shortLabel: string;
      startDate: Date;
      endDate: Date;
      campaignsCount: number;
      contactsCount: number;
      emailsSentCount: number;
      campaigns: { id: string; name: string; status: string; time: string }[];
    }[] = [];

    if (timeline === "24H") {
      // 24 hourly buckets
      for (let i = 23; i >= 0; i--) {
        const start = new Date(now.getTime() - (i + 1) * 3600 * 1000);
        const end = new Date(now.getTime() - i * 3600 * 1000);
        const hourStr = `${start.getHours().toString().padStart(2, "0")}:00`;

        buckets.push({
          dateLabel: `${start.toLocaleDateString("en-US", { month: "short", day: "numeric" })} ${hourStr}`,
          shortLabel: hourStr,
          startDate: start,
          endDate: end,
          campaignsCount: 0,
          contactsCount: 0,
          emailsSentCount: 0,
          campaigns: [],
        });
      }
    } else if (timeline === "1W") {
      // 7 daily buckets
      for (let i = 6; i >= 0; i--) {
        const start = new Date(now.getFullYear(), now.getMonth(), now.getDate() - i, 0, 0, 0);
        const end = new Date(now.getFullYear(), now.getMonth(), now.getDate() - i, 23, 59, 59);

        buckets.push({
          dateLabel: start.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" }),
          shortLabel: start.toLocaleDateString("en-US", { weekday: "short" }),
          startDate: start,
          endDate: end,
          campaignsCount: 0,
          contactsCount: 0,
          emailsSentCount: 0,
          campaigns: [],
        });
      }
    } else if (timeline === "6M") {
      // 6 monthly buckets
      for (let i = 5; i >= 0; i--) {
        const start = new Date(now.getFullYear(), now.getMonth() - i, 1);
        const end = new Date(now.getFullYear(), now.getMonth() - i + 1, 0, 23, 59, 59);

        buckets.push({
          dateLabel: start.toLocaleDateString("en-US", { month: "short", year: "numeric" }),
          shortLabel: start.toLocaleDateString("en-US", { month: "short" }),
          startDate: start,
          endDate: end,
          campaignsCount: 0,
          contactsCount: 0,
          emailsSentCount: 0,
          campaigns: [],
        });
      }
    } else {
      // Default: "1M" — 30 daily buckets
      for (let i = 29; i >= 0; i--) {
        const start = new Date(now.getFullYear(), now.getMonth(), now.getDate() - i, 0, 0, 0);
        const end = new Date(now.getFullYear(), now.getMonth(), now.getDate() - i, 23, 59, 59);

        buckets.push({
          dateLabel: start.toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" }),
          shortLabel: start.toLocaleDateString("en-US", { day: "numeric", month: "short" }),
          startDate: start,
          endDate: end,
          campaignsCount: 0,
          contactsCount: 0,
          emailsSentCount: 0,
          campaigns: [],
        });
      }
    }

    // Populate buckets with real campaigns data
    allCampaigns.forEach((cmp) => {
      const cmpDate = new Date(cmp.createdAt);
      const bucket = buckets.find(
        (b) => cmpDate >= b.startDate && cmpDate <= b.endDate
      );
      if (bucket) {
        bucket.campaignsCount += 1;
        if (cmp.status === "SENT") {
          bucket.emailsSentCount += 1;
        }
        bucket.campaigns.push({
          id: cmp.id,
          name: cmp.campaignName || cmp.subject || "Untitled Campaign",
          status: cmp.status,
          time: cmpDate.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
        });
      }
    });

    // Populate buckets with real contacts data
    allContacts.forEach((ct) => {
      const ctDate = new Date(ct.createdAt);
      const bucket = buckets.find(
        (b) => ctDate >= b.startDate && ctDate <= b.endDate
      );
      if (bucket) {
        bucket.contactsCount += 1;
      }
    });

    const stats = [
      {
        id: "emails_sent",
        label: "Emails Sent (Month)",
        value: user.emailsSentThisMonth.toLocaleString(),
      },
      {
        id: "total_campaigns",
        label: "Total Campaigns",
        value: totalCampaigns.toString(),
      },
      {
        id: "sent_campaigns",
        label: "Sent Campaigns",
        value: sentCampaigns.toString(),
      },
      {
        id: "active_contacts",
        label: "Active Contacts",
        value: activeSubs.toLocaleString(),
      },
    ];

    const chartData = buckets.map((b) => ({
      name: b.shortLabel,
      dateLabel: b.dateLabel,
      campaigns: b.campaignsCount,
      contacts: b.contactsCount,
      emailsSent: b.emailsSentCount,
      campaignList: b.campaigns,
    }));

    return NextResponse.json({ stats, chartData, totalCampaigns });
  } catch (error) {
    console.error("Analytics fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch analytics" },
      { status: 500 }
    );
  }
}
