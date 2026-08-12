import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { requireSuperAdmin } from '@/lib/auth/organization-context'

export async function GET(req: Request) {
  try {
    const admin = await requireSuperAdmin()
    if (!admin) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

    const { searchParams } = new URL(req.url)
    const orgId = searchParams.get('organizationId')

    const where: any = {}
    if (orgId) where.organizationId = orgId

    const lists = await db.contactList.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: {
        organization: { select: { id: true, name: true } },
        _count: { select: { contacts: true } },
      },
      take: 100 // Admin safety limit
    })

    return NextResponse.json(lists)
  } catch (error) {
    console.error('[ADMIN_CONTACT_LISTS_GET]', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
