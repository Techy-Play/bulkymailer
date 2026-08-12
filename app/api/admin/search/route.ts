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
    const q = searchParams.get('q')

    if (!q || q.length < 2) {
      return NextResponse.json([])
    }

    // Parallel search across resources
    const [users, orgs, campaigns, templates] = await Promise.all([
      db.user.findMany({
        where: {
          OR: [
            { firstName: { contains: q, mode: 'insensitive' } },
            { lastName: { contains: q, mode: 'insensitive' } },
            { email: { contains: q, mode: 'insensitive' } },
          ]
        },
        select: { id: true, firstName: true, lastName: true, email: true },
        take: 5
      }),
      db.organization.findMany({
        where: { name: { contains: q, mode: 'insensitive' } },
        select: { id: true, name: true },
        take: 5
      }),
      db.campaign.findMany({
        where: { campaignName: { contains: q, mode: 'insensitive' } },
        select: { id: true, campaignName: true, organizationId: true, organization: { select: { name: true } } },
        take: 5
      }),
      db.template.findMany({
        where: { 
          name: { contains: q, mode: 'insensitive' },
          userId: null,
          organizationId: null
        },
        select: { id: true, name: true, category: true },
        take: 5
      })
    ])

    const results = [
      ...users.map(u => ({
        type: 'USER',
        id: u.id,
        name: `${u.firstName} ${u.lastName}`.trim(),
        subtitle: u.email
      })),
      ...orgs.map(o => ({
        type: 'ORGANIZATION',
        id: o.id,
        name: o.name
      })),
      ...campaigns.map(c => ({
        type: 'CAMPAIGN',
        id: c.id,
        name: c.campaignName,
        organizationId: c.organizationId,
        organizationName: c.organization?.name
      })),
      ...templates.map(t => ({
        type: 'TEMPLATE',
        id: t.id,
        name: t.name,
        subtitle: t.category
      }))
    ]

    return NextResponse.json(results)
  } catch (error) {
    console.error('[ADMIN_SEARCH_ERROR]', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
