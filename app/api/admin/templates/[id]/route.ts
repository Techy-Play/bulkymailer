import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { requireSuperAdmin } from '@/lib/auth/organization-context'
import { compileTemplateToHtml } from '@/lib/templates/compile'

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const admin = await requireSuperAdmin()
    if (!admin) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

    const { id } = await params
    const template = await db.template.findUnique({ where: { id } })
    if (!template) return NextResponse.json({ error: 'Not found' }, { status: 404 })

    // Safety check - admin area only manages global public templates
    if (template.userId !== null || template.organizationId !== null) {
      return NextResponse.json({ error: 'This is not a public global template' }, { status: 400 })
    }

    return NextResponse.json(template)
  } catch (error) {
    console.error('[ADMIN_TEMPLATE_GET]', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const admin = await requireSuperAdmin()
    if (!admin) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

    const { id } = await params
    const body = await req.json()
    const { name, category, description, previewText, jsonTree } = body

    const existing = await db.template.findUnique({ where: { id } })
    if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 })

    if (existing.userId !== null || existing.organizationId !== null) {
      return NextResponse.json({ error: 'Cannot edit an organization-owned template via this global API' }, { status: 400 })
    }

    if (existing.generation !== 'MODERN') {
      return NextResponse.json({ error: 'Cannot modify LEGACY templates' }, { status: 400 })
    }

    let finalHtml = existing.htmlContent
    
    // Admin editing public template directly updates the JSON tree and compiles it
    if (jsonTree) {
      try {
        const compiled = await compileTemplateToHtml(jsonTree)
        if (compiled) finalHtml = compiled
      } catch (e) {
        console.error("Failed to compile MJML to HTML", e)
        return NextResponse.json({ error: 'Failed to compile template HTML' }, { status: 422 })
      }
    }

    const updatedTemplate = await db.template.update({
      where: { id },
      data: {
        ...(name && { name }),
        ...(category && { category }),
        ...(description !== undefined && { description }),
        ...(previewText !== undefined && { previewText }),
        ...(jsonTree && { jsonTree, htmlContent: finalHtml })
      }
    })

    await db.auditLog.create({
      data: {
        actorUserId: admin.id,
        action: 'PUBLIC_TEMPLATE_UPDATED',
        resourceType: 'TEMPLATE',
        resourceId: id,
        metadata: { name, category }
      }
    })

    return NextResponse.json(updatedTemplate)
  } catch (error) {
    console.error('[ADMIN_TEMPLATE_PUT]', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const admin = await requireSuperAdmin()
    if (!admin) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

    const { id } = await params

    const existing = await db.template.findUnique({ where: { id } })
    if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 })

    if (existing.userId !== null || existing.organizationId !== null) {
      return NextResponse.json({ error: 'Cannot delete an organization-owned template via this global API' }, { status: 400 })
    }
    
    if (existing.generation !== 'MODERN') {
      return NextResponse.json({ error: 'Cannot delete LEGACY templates' }, { status: 400 })
    }

    await db.template.delete({ where: { id } })

    await db.auditLog.create({
      data: {
        actorUserId: admin.id,
        action: 'PUBLIC_TEMPLATE_DELETED',
        resourceType: 'TEMPLATE',
        resourceId: id,
      }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[ADMIN_TEMPLATE_DELETE]', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
