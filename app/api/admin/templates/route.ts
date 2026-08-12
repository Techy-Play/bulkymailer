import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { requireSuperAdmin } from '@/lib/auth/organization-context'
import { compileTemplateToHtml } from '@/lib/templates/compile'

export async function POST(req: Request) {
  try {
    const admin = await requireSuperAdmin()
    if (!admin) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

    const body = await req.json()
    const { name, category, description, previewText, jsonTree } = body

    if (!name || !jsonTree) {
      return NextResponse.json({ error: 'Name and template content are required' }, { status: 422 })
    }

    let finalHtml = ""
    try {
      const compiled = await compileTemplateToHtml(jsonTree)
      if (compiled) finalHtml = compiled
    } catch (e) {
      console.error("Failed to compile MJML to HTML", e)
      return NextResponse.json({ error: 'Failed to compile template HTML' }, { status: 422 })
    }

    const template = await db.template.create({
      data: {
        name,
        category: category || 'GENERAL',
        description,
        previewText,
        jsonTree,
        htmlContent: finalHtml,
        generation: 'MODERN',
        userId: null,
        organizationId: null,
        isFavorite: false
      }
    })

    await db.auditLog.create({
      data: {
        actorUserId: admin.id,
        action: 'PUBLIC_TEMPLATE_CREATED',
        resourceType: 'TEMPLATE',
        resourceId: template.id,
        metadata: { name, category }
      }
    })

    return NextResponse.json(template)
  } catch (error) {
    console.error('[ADMIN_TEMPLATE_POST]', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function GET(req: Request) {
  try {
    const admin = await requireSuperAdmin()
    if (!admin) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

    const templates = await db.template.findMany({
      where: {
        userId: null,
        organizationId: null
      },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(templates)
  } catch (error) {
    console.error('[ADMIN_TEMPLATES_GET]', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
