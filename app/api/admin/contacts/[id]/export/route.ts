import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { requireSuperAdmin } from '@/lib/auth/organization-context'

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const admin = await requireSuperAdmin()
    if (!admin) return new NextResponse('Forbidden', { status: 403 })

    const { id } = await params

    const list = await db.contactList.findUnique({
      where: { id },
      select: { name: true }
    })

    if (!list) {
      return new NextResponse('Contact list not found', { status: 404 })
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
      return new NextResponse('No contacts found in this list', { status: 404 })
    }

    // Flatten customFields and prepare data for CSV
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
      
    // Collect all dynamic keys from custom fields across all contacts
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
    // Add header row
    csvLines.push(headersList.map(escapeCsv).join(','))
    
    // Add data rows
    csvData.forEach(row => {
      const line = headersList.map(h => escapeCsv(row[h] || '')).join(',')
      csvLines.push(line)
    })

    const csv = csvLines.join('\n')

    const headers = new Headers()
    headers.set('Content-Type', 'text/csv')
    headers.set('Content-Disposition', `attachment; filename="${list.name.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_contacts.csv"`)

    return new NextResponse(csv, { headers })
  } catch (error) {
    console.error('[ADMIN_CONTACT_EXPORT_GET]', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
