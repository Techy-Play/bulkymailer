import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { requireSuperAdmin } from '@/lib/auth/organization-context'

export async function GET(req: Request) {
  try {
    const admin = await requireSuperAdmin()
    if (!admin) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

    const { searchParams } = new URL(req.url)
    const orgId = searchParams.get('organizationId')
    const action = searchParams.get('action')
    const actorUserId = searchParams.get('actorUserId')
    const resourceType = searchParams.get('resourceType')
    const page = parseInt(searchParams.get('page') || '1', 10)
    const limit = parseInt(searchParams.get('limit') || '50', 10)

    const where: any = {}
    if (orgId) where.organizationId = orgId
    if (action) where.action = action
    if (actorUserId) where.actorUserId = actorUserId
    if (resourceType) where.resourceType = resourceType

    const skip = (page - 1) * limit

    const [logs, total] = await Promise.all([
      db.auditLog.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit
      }),
      db.auditLog.count({ where })
    ])

    return NextResponse.json({ logs, total, page, limit })
  } catch (error) {
    console.error('[ADMIN_AUDIT_LOGS_GET]', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
