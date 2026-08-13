import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { requireSuperAdmin } from '@/lib/auth/organization-context'
import { sendEmail } from '@/lib/mailer'

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const admin = await requireSuperAdmin()
    if (!admin) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

    const { id } = await params
    const { email: targetEmail } = await req.json()

    if (!targetEmail) {
      return NextResponse.json({ error: 'Target email is required' }, { status: 400 })
    }

    const list = await db.contactList.findUnique({
      where: { id },
      select: { name: true }
    })

    if (!list) {
      return NextResponse.json({ error: 'Contact list not found' }, { status: 404 })
    }

    const contacts = await db.contact.findMany({
      where: { listId: id },
      orderBy: { createdAt: 'desc' },
      select: {
        email: true,
        firstName: true,
        lastName: true,
        phone: true,
        customFields: true,
        createdAt: true
      }
    })

    if (contacts.length === 0) {
      return NextResponse.json({ error: 'No contacts found in this list' }, { status: 404 })
    }

    const csvData = contacts.map(c => {
      const flattened: any = {
        email: c.email,
        firstName: c.firstName || '',
        lastName: c.lastName || '',
        phone: c.phone || '',
        createdAt: c.createdAt.toISOString()
      }
      
      if (c.customFields && typeof c.customFields === 'object') {
        const fields = c.customFields as Record<string, string>;
        Object.keys(fields).forEach(key => {
          flattened[key] = fields[key];
        });
      }
      
      return flattened
    })
    
    const customKeys = new Set<string>()
    csvData.forEach(row => {
      Object.keys(row).forEach(k => {
        if (!['email', 'firstName', 'lastName', 'phone', 'createdAt'].includes(k)) {
          customKeys.add(k)
        }
      })
    })
    
    const headersList = ['email', 'firstName', 'lastName', 'phone', 'createdAt', ...Array.from(customKeys)]
    
    const escapeCsv = (val: any) => {
      if (val === null || val === undefined) return '""'
      const str = String(val).replace(/"/g, '""')
      return `"${str}"`
    }

    const csvLines = []
    csvLines.push(headersList.map(escapeCsv).join(','))
    
    csvData.forEach(row => {
      const line = headersList.map(h => escapeCsv(row[h] || '')).join(',')
      csvLines.push(line)
    })

    const csv = csvLines.join('\n')
    const filename = `${list.name.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_contacts.csv`

    const csvBuffer = Buffer.from(csv, 'utf-8')

    const subject = `Exported Contact List: ${list.name}`
    const html = `
        <p>Hello,</p>
        <p>Here is the exported contact list <strong>${list.name}</strong> containing ${contacts.length} contacts.</p>
        <p>You can find the data in the attached CSV file.</p>
        <br/>
        <p>Thanks,<br/>BulkyMailer Admin System</p>
      `
      
    // Send the email with the attachment
    await sendEmail(
      targetEmail,
      subject,
      html,
      false, // isTestMail
      null, // fromOverride
      undefined, // campaignId
      [
        {
          filename: filename,
          content: csvBuffer,
          contentType: 'text/csv'
        }
      ]
    )

    return NextResponse.json({ success: true, message: 'Email sent successfully' })
  } catch (error) {
    console.error('[ADMIN_CONTACT_EMAIL_EXPORT_POST]', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
