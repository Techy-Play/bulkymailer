import { NextRequest, NextResponse } from "next/server";
import { getSessionUserId, checkAndIncrementEmailQuota } from "@/lib/auth";
import { db } from "@/lib/db";
import { CampaignStatus } from "@/app/generated/prisma/enums";
import { sendEmail } from "@/lib/mailer";

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const userId = await getSessionUserId();
    if (!userId) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

    const { id: campaignId } = await params;

    // 1. Fetch Campaign with Template and Contacts
    const campaign = await db.campaign.findFirst({
      where: { id: campaignId, userId },
      include: {
        template: true,
        contactList: {
          include: { contacts: true }
        }
      }
    });

    if (!campaign) return NextResponse.json({ error: "Campaign not found" }, { status: 404 });
    if (campaign.status !== CampaignStatus.DRAFT && campaign.status !== CampaignStatus.FAILED) {
      return NextResponse.json({ error: "Campaign is already processing or sent" }, { status: 400 });
    }
    
    if (!campaign.template) return NextResponse.json({ error: "Campaign template missing" }, { status: 400 });
    if (!campaign.contactList) return NextResponse.json({ error: "No contact list assigned to this campaign" }, { status: 400 });

    const contacts = campaign.contactList.contacts;
    if (contacts.length === 0) {
      return NextResponse.json({ error: "Contact list is empty" }, { status: 400 });
    }

    // 2. Mark as QUEUED and take snapshot
    await db.campaign.update({
      where: { id: campaignId },
      data: {
        status: CampaignStatus.QUEUED,
        htmlSnapshot: campaign.template.htmlContent,
        subjectSnapshot: campaign.subject,
        totalRecipients: contacts.length,
        startedAt: new Date()
      }
    });

    // 3. Start Async Sending Process (Simulated background worker)
    // We execute this without awaiting so the API responds immediately
    (async () => {
      try {
        await db.campaign.update({ where: { id: campaignId }, data: { status: CampaignStatus.SENDING } });
        
        let successful = 0;
        let failed = 0;
        
        const htmlTemplate = campaign.template!.htmlContent;
        const subject = campaign.subject;

        for (const contact of contacts) {
          try {
            // Check Quota before sending each email
            const quota = await checkAndIncrementEmailQuota(userId);
            if (!quota.allowed) {
              console.error("[campaign_send] Quota exceeded for user", userId);
              failed += (contacts.length - (successful + failed));
              break; // Stop sending
            }

            // Replace simple variables
            let personalizedHtml = htmlTemplate
              .replace(/{{firstName}}/gi, contact.firstName || "")
              .replace(/{{lastName}}/gi, contact.lastName || "")
              .replace(/{{email}}/gi, contact.email || "");

            // If customFields exist, replace them too
            if (contact.customFields && typeof contact.customFields === 'object') {
              Object.entries(contact.customFields as Record<string, string>).forEach(([k, v]) => {
                const regex = new RegExp(`{{custom.${k}}}`, 'gi');
                personalizedHtml = personalizedHtml.replace(regex, v || "");
              });
            }

            // Send Email
            await sendEmail(contact.email, subject, personalizedHtml);
            successful++;
          } catch (err) {
            console.error(`[campaign_send] Failed for ${contact.email}`, err);
            failed++;
          }
        }

        // Finalize Campaign
        await db.campaign.update({
          where: { id: campaignId },
          data: {
            status: CampaignStatus.SENT,
            successfulRecipients: successful,
            failedRecipients: failed,
            completedAt: new Date()
          }
        });

      } catch (workerErr) {
        console.error("[campaign_send] Background worker crashed", workerErr);
        await db.campaign.update({
          where: { id: campaignId },
          data: { status: CampaignStatus.FAILED }
        });
      }
    })();

    return NextResponse.json({ success: true, queued: true, message: "Campaign queued for sending" });
  } catch (err) {
    console.error("[campaign_POST_send]", err);
    return NextResponse.json({ error: "Failed to queue campaign" }, { status: 500 });
  }
}
