import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { requireSuperAdmin } from '@/lib/auth/organization-context'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request, { params }: { params: Promise<{ orgId: string, campaignId: string }> }) {
  try {
    const admin = await requireSuperAdmin()
    if (!admin) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

    const { orgId, campaignId } = await params

    const organization = await db.organization.findUnique({ where: { id: orgId } })
    if (!organization) return NextResponse.json({ error: 'Target organization not found' }, { status: 404 })

    const campaign = await db.campaign.findUnique({
      where: { id: campaignId },
      include: {
        template: true,
        contactList: { include: { contacts: true } },
        senderProfile: true,
      }
    })

    if (!campaign) return NextResponse.json({ error: 'Campaign not found' }, { status: 404 })
    
    // Core Safety Validation
    if (campaign.organizationId !== orgId) {
      return NextResponse.json({ error: 'Campaign does not belong to the target organization' }, { status: 403 })
    }

    if (campaign.status !== 'DRAFT') {
      return NextResponse.json({ error: 'Only DRAFT campaigns can be sent' }, { status: 400 })
    }

    if (!campaign.contactList || campaign.contactList.organizationId !== orgId) {
      return NextResponse.json({ error: 'Invalid or missing contact list for this organization' }, { status: 400 })
    }

    if (!campaign.senderProfile || campaign.senderProfile.organizationId !== orgId) {
      return NextResponse.json({ error: 'Invalid or missing sender profile for this organization' }, { status: 400 })
    }

    const htmlContent = campaign.template?.htmlContent
    if (!htmlContent) {
      return NextResponse.json({ error: 'Campaign template is missing HTML content' }, { status: 400 })
    }

    const contacts = campaign.contactList.contacts
    if (!contacts.length) {
      return NextResponse.json({ error: 'Contact list is empty' }, { status: 400 })
    }

    // AUDIT: Pre-send
    await db.auditLog.create({
      data: {
        actorUserId: admin.id,
        organizationId: orgId,
        action: 'ADMIN_CAMPAIGN_SEND_INITIATED',
        resourceType: 'CAMPAIGN',
        resourceId: campaignId,
        metadata: { recipientsCount: contacts.length }
      }
    })

    await db.campaign.update({
      where: { id: campaignId },
      data: {
        status: 'SENDING',
        htmlSnapshot: htmlContent,
        startedAt: new Date()
      }
    })

    // Existing sending logic: chunk to Resend API
    let sentCount = 0
    let failedCount = 0
    const chunkSize = 100
    
    for (let i = 0; i < contacts.length; i += chunkSize) {
      const chunk = contacts.slice(i, i + chunkSize)
      
      const emailPayloads = chunk.map(c => {
        let personalizedHtml = htmlContent
        personalizedHtml = personalizedHtml.replace(/\{\{first_name\}\}/gi, c.firstName || '')
        personalizedHtml = personalizedHtml.replace(/\{\{last_name\}\}/gi, c.lastName || '')
        personalizedHtml = personalizedHtml.replace(/\{\{email\}\}/gi, c.email || '')
        
        return {
          from: `${campaign.senderProfile!.fromName} <${campaign.senderProfile!.fromEmail}>`,
          to: [c.email],
          subject: campaign.subject,
          html: personalizedHtml,
          reply_to: campaign.senderProfile!.replyTo || undefined,
        }
      })
      
      try {
        const { data, error } = await resend.batch.send(emailPayloads)
        if (error) {
          console.error('[ADMIN_RESEND_BATCH_ERROR]', error)
          failedCount += chunk.length
        } else {
          sentCount += chunk.length
        }
      } catch (err) {
        console.error('[ADMIN_RESEND_TRY_CATCH]', err)
        failedCount += chunk.length
      }
    }

    const finalStatus = failedCount === contacts.length ? 'FAILED' : 'SENT'

    await db.campaign.update({
      where: { id: campaignId },
      data: { 
        status: finalStatus,
        completedAt: new Date()
      }
    })

    // AUDIT: Post-send
    await db.auditLog.create({
      data: {
        actorUserId: admin.id,
        organizationId: orgId,
        action: 'CAMPAIGN_SENT', // Highlighting this as asked in requirement E
        resourceType: 'CAMPAIGN',
        resourceId: campaignId,
        metadata: { sentCount, failedCount, finalStatus }
      }
    })

    return NextResponse.json({ success: true, sent: sentCount, failed: failedCount })
  } catch (error) {
    console.error('[ADMIN_CAMPAIGN_SEND_ERROR]', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
