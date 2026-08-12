import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { requireSuperAdmin } from '@/lib/auth/organization-context'

export async function GET(req: Request) {
  try {
    const admin = await requireSuperAdmin()
    if (!admin) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const { searchParams } = new URL(req.url)
    const search = searchParams.get('search')
    
    const where: any = {}
    
    if (search) {
      where.name = { contains: search, mode: 'insensitive' }
    }

    const orgs = await db.organization.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: {
        _count: {
          select: { memberships: true, campaigns: true, contactLists: true, templates: true }
        }
      }
    })

    return NextResponse.json(orgs)
  } catch (error) {
    console.error('[ADMIN_ORGS_GET]', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
