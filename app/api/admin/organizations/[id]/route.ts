import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { requireSuperAdmin } from '@/lib/auth/organization-context'

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const admin = await requireSuperAdmin()
    if (!admin) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

    const { id } = await params
    const org = await db.organization.findUnique({
      where: { id },
      include: {
        memberships: {
          include: { user: { select: { id: true, firstName: true, lastName: true, email: true, status: true } } }
        },
        _count: {
          select: { campaigns: true, contactLists: true, templates: true, mediaAssets: true }
        }
      }
    })

    if (!org) return NextResponse.json({ error: 'Not found' }, { status: 404 })

    return NextResponse.json(org)
  } catch (error) {
    console.error('[ADMIN_ORG_GET]', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const admin = await requireSuperAdmin()
    if (!admin) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

    const { id } = await params
    const body = await req.json()
    const { name, website, teamSize } = body

    const existing = await db.organization.findUnique({ where: { id } })
    if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 })

    const updatedOrg = await db.organization.update({
      where: { id },
      data: {
        ...(name && { name }),
        ...(website !== undefined && { website }),
        ...(teamSize && { teamSize }),
      }
    })

    await db.auditLog.create({
      data: {
        actorUserId: admin.id,
        organizationId: id,
        action: 'ORGANIZATION_UPDATED',
        resourceType: 'ORGANIZATION',
        resourceId: id,
        metadata: { name, website, teamSize }
      }
    })

    return NextResponse.json(updatedOrg)
  } catch (error) {
    console.error('[ADMIN_ORG_PATCH]', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
