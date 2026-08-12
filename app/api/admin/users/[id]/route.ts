import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { requireSuperAdmin } from '@/lib/auth/organization-context'

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const admin = await requireSuperAdmin()
    if (!admin) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

    const { id } = await params
    const targetUser = await db.user.findUnique({
      where: { id },
      include: {
        memberships: {
          include: { organization: true }
        }
      },
    })

    if (!targetUser) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json(targetUser)
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const admin = await requireSuperAdmin()
    if (!admin) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

    const { id } = await params
    const body = await req.json()
    const { role, status, isSuperAdmin } = body

    if (admin.id === id && status === 'SUSPENDED') {
      return NextResponse.json({ error: 'Cannot suspend yourself' }, { status: 400 })
    }

    const targetUser = await db.user.findUnique({
      where: { id },
      include: { memberships: true }
    })
    
    if (!targetUser) return NextResponse.json({ error: 'Not found' }, { status: 404 })

    // Safety: If suspending, check if user is the sole OWNER of any org
    if (status === 'SUSPENDED') {
      const ownerMemberships = targetUser.memberships.filter(m => m.role === 'OWNER')
      for (const m of ownerMemberships) {
        const orgOwners = await db.organizationMembership.count({
          where: { organizationId: m.organizationId, role: 'OWNER', status: 'ACTIVE' }
        })
        if (orgOwners <= 1) {
          return NextResponse.json({ 
            error: `Cannot suspend user. They are the sole OWNER of organization ID: ${m.organizationId}. Transfer ownership first.` 
          }, { status: 400 })
        }
      }
    }

    const updatedUser = await db.user.update({
      where: { id },
      data: {
        ...(role !== undefined && { role }),
        ...(status !== undefined && { status }),
        ...(isSuperAdmin !== undefined && { isSuperAdmin }),
      },
    })

    await db.auditLog.create({
      data: {
        actorUserId: admin.id,
        targetUserId: id,
        action: status === 'SUSPENDED' ? 'USER_SUSPENDED' : 'USER_UPDATED',
        resourceType: 'USER',
        resourceId: id,
        metadata: { role, status, isSuperAdmin }
      }
    })

    return NextResponse.json(updatedUser)
  } catch (error) {
    console.error('[ADMIN_USER_PATCH]', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const admin = await requireSuperAdmin()
    if (!admin) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

    const { id } = await params
    if (admin.id === id) {
      return NextResponse.json({ error: 'Cannot delete yourself' }, { status: 400 })
    }

    const targetUser = await db.user.findUnique({ 
      where: { id },
      include: { memberships: true }
    })
    
    if (!targetUser) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    if (targetUser.isSuperAdmin) {
      return NextResponse.json({ error: 'Cannot delete another Super Admin' }, { status: 403 })
    }

    const ownerMemberships = targetUser.memberships.filter(m => m.role === 'OWNER')
    for (const m of ownerMemberships) {
      const orgOwners = await db.organizationMembership.count({
        where: { organizationId: m.organizationId, role: 'OWNER', status: 'ACTIVE' }
      })
      if (orgOwners <= 1) {
        return NextResponse.json({ 
          error: `Cannot delete user. They are the sole OWNER of organization ID: ${m.organizationId}. Transfer ownership first.` 
        }, { status: 400 })
      }
    }

    await db.user.delete({ where: { id } })

    await db.auditLog.create({
      data: {
        actorUserId: admin.id,
        targetUserId: id,
        action: 'USER_DELETED',
        resourceType: 'USER',
        resourceId: id,
      }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[ADMIN_USER_DELETE]', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
