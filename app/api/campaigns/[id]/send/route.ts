import { NextRequest, NextResponse } from "next/server";
import { getSessionUserId, checkAndIncrementEmailQuota } from "@/lib/auth";
import { getActiveOrganizationId, requirePermission } from "@/lib/auth/organization-context";
import { db } from "@/lib/db";
import { CampaignStatus } from "@/app/generated/prisma/enums";
import { sendEmail, renderTemplateMergeTags } from "@/lib/mailer";

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const userId = await getSessionUserId();
    if (!userId) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

    const orgId = await getActiveOrganizationId();
    if (!orgId) return NextResponse.json({ error: "No active organization" }, { status: 403 });

    const __perm = await requirePermission(orgId, "campaign.send");
    if (!__perm) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    const { id: campaignId } = await params;

    // 1. Fetch Campaign with Template, Sender Profile and Contacts
    const campaign = await db.campaign.findFirst({
      where: { id: campaignId, organizationId: orgId },
      include: {
        template: true,
        senderProfile: true,
        organization: {
          include: { emailProvider: true }
        },
        contactList: {
          include: { contacts: true }
        }
      }
    });

    if (!campaign) return NextResponse.json({ error: "Campaign not found" }, { status: 404 });
    if (campaign.status !== CampaignStatus.DRAFT && campaign.status !== CampaignStatus.FAILED) {
      return NextResponse.json({ error: "Campaign is already processing or sent" }, { status: 400 });
    }
    
    if (!campaign.contactList) return NextResponse.json({ error: "No contact list assigned to this campaign" }, { status: 400 });

    const contacts = campaign.contactList.contacts;
    if (contacts.length === 0) {
      return NextResponse.json({ error: "Contact list is empty" }, { status: 400 });
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const finalHtmlSnapshot = campaign.htmlSnapshot || campaign.template?.htmlContent || "";
    if (!finalHtmlSnapshot) {
      return NextResponse.json({ error: "Campaign email content is empty" }, { status: 400 });
    }

    // Determine custom verified sender address (send.au-acadex.com)
    let fromOverride: string | null = null;
    if (campaign.senderProfile) {
      fromOverride = `"${campaign.senderProfile.fromName}" <${campaign.senderProfile.fromEmail}>`;
    }

    // 2. Validate Custom SMTP Configuration
    let finalProviderConfig = campaign.organization?.emailProvider;
    
    if (!finalProviderConfig || finalProviderConfig.provider !== "SMTP") {
      // Fallback: Check if user has a personal workspace with Custom SMTP configured
      const personalOrg = await db.organization.findFirst({
        where: { ownerUserId: userId, type: "PERSONAL" },
        include: { emailProvider: true }
      });
      if (personalOrg?.emailProvider?.provider === "SMTP") {
        finalProviderConfig = personalOrg.emailProvider;
      } else {
        return NextResponse.json({ error: "Custom SMTP must be configured to send campaigns." }, { status: 400 });
      }
    }

    // 3. Mark as QUEUED and preserve edited htmlSnapshot
    await db.campaign.update({
      where: { id: campaignId },
      data: {
        status: CampaignStatus.QUEUED,
        htmlSnapshot: finalHtmlSnapshot,
        subjectSnapshot: campaign.subject,
        fromNameSnapshot: campaign.senderProfile?.fromName || "BulkyMailer",
        fromEmailSnapshot: campaign.senderProfile?.fromEmail || "notifications@send.au-acadex.com",
        totalRecipients: contacts.length,
        startedAt: new Date()
      }
    });

    // 4. Start Async Sending Process
    (async () => {
      try {
        await db.campaign.update({ where: { id: campaignId }, data: { status: CampaignStatus.SENDING } });
        
        let successful = 0;
        let failed = 0;
        
        const htmlTemplate = finalHtmlSnapshot;
        const subject = campaign.subject;

        for (const contact of contacts) {
          try {
            // Check Quota before sending each email
            const quota = await checkAndIncrementEmailQuota(userId);
            if (!quota.allowed) {
              console.error("[campaign_send] Quota exceeded for user", userId);
              failed += (contacts.length - (successful + failed));
              break;
            }

            // Robust Liquid & Handlebars merge tag renderer
            const personalizedHtml = renderTemplateMergeTags(htmlTemplate, {
              firstName: contact.firstName || "",
              lastName: contact.lastName || "",
              email: contact.email || "",
              company: (contact.customFields as any)?.company || "",
              unsubscribeUrl: `${appUrl}/unsubscribe?email=${encodeURIComponent(contact.email)}`,
              customFields: contact.customFields as any,
            });

            // Send Email via Resend or SMTP with custom verified domain
            await sendEmail(
              contact.email, 
              subject, 
              personalizedHtml, 
              false, 
              fromOverride, 
              campaignId, 
              undefined, 
              finalProviderConfig, 
              campaign.senderProfile
            );
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
