import { NextRequest, NextResponse } from "next/server";
import { getSessionUserId } from "@/lib/auth";
import { getActiveOrganizationId, requirePermission } from "@/lib/auth/organization-context";
import { db } from "@/lib/db";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const userId = await getSessionUserId();
    if (!userId) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

    const { id } = await params;
    const orgId = await getActiveOrganizationId();
    if (!orgId) return NextResponse.json({ error: "No active organization" }, { status: 403 });

    const __perm = await requirePermission(orgId, "template.view");
    if (!__perm) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    const template = await db.template.findFirst({
      where: {
        id,
        OR: [{ userId: null }, { organizationId: orgId }]
      }
    });

    if (!template) return NextResponse.json({ error: "Not found" }, { status: 404 });

    return NextResponse.json({ template });
  } catch (err) {
    console.error("[template_GET]", err);
    return NextResponse.json({ error: "Failed to fetch template" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const userId = await getSessionUserId();
    if (!userId) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

    const orgId = await getActiveOrganizationId();
    if (!orgId) return NextResponse.json({ error: "No active organization" }, { status: 403 });

    const __perm = await requirePermission(orgId, "template.edit");
    if (!__perm) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    const { id } = await params;
    const body = await req.json();
    const { name, category, htmlContent, description, previewText, isFavorite, jsonTree } = body;

    // Check if template exists (either public or within the organization)
    const existing = await db.template.findFirst({
      where: {
        id,
        OR: [{ userId: null }, { organizationId: orgId }]
      }
    });

    if (!existing) {
      return NextResponse.json({ error: "Template not found" }, { status: 404 });
    }

    // Auto-forking handles system templates safely (creates a copy).
    
    let finalHtml = htmlContent;
    if (jsonTree && !Array.isArray(jsonTree)) {
      try {
        const { compileTemplateToHtml } = await import('@/lib/templates/compile');
        const compiled = await compileTemplateToHtml(jsonTree);
        if (compiled) finalHtml = compiled;
      } catch (e) {
        console.error("Failed to compile MJML to HTML", e);
      }
    }

    // If template belongs to another organization or is a System Template (userId === null),
    // automatically FORK it into the current organization's library as a new template draft.
    if (existing.organizationId !== orgId) {
      const forkedTemplate = await db.template.create({
        data: {
          userId,
          organizationId: orgId,
          name: name || `${existing.name} (My Copy)`,
          category: category || existing.category || "GENERAL",
          htmlContent: finalHtml !== undefined ? finalHtml : existing.htmlContent,
          description: description !== undefined ? description : existing.description,
          previewText: previewText !== undefined ? previewText : existing.previewText,
          isFavorite: false,
          jsonTree: jsonTree !== undefined ? jsonTree : existing.jsonTree,
        }
      });
      return NextResponse.json({ template: forkedTemplate, isForked: true });
    }

    // Otherwise, update existing organization-owned template
    const template = await db.template.update({
      where: { id },
      data: {
        name: name !== undefined ? name : existing.name,
        category: category !== undefined ? category : existing.category,
        htmlContent: finalHtml !== undefined ? finalHtml : existing.htmlContent,
        description: description !== undefined ? description : existing.description,
        previewText: previewText !== undefined ? previewText : existing.previewText,
        isFavorite: isFavorite !== undefined ? isFavorite : existing.isFavorite,
        jsonTree: jsonTree !== undefined ? jsonTree : existing.jsonTree
      }
    });

    return NextResponse.json({ template, isForked: false });
  } catch (err) {
    console.error("[template_PUT]", err);
    return NextResponse.json({ error: "Failed to update template" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const userId = await getSessionUserId();
    if (!userId) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

    const { id } = await params;
    const orgId = await getActiveOrganizationId();
    if (!orgId) return NextResponse.json({ error: "No active organization" }, { status: 403 });

    const __perm = await requirePermission(orgId, "template.delete");
    if (!__perm) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    const existing = await db.template.findFirst({
      where: { id, organizationId: orgId }
    });

    if (!existing) return NextResponse.json({ error: "Template not found or cannot be deleted" }, { status: 404 });

    await db.template.delete({
      where: { id }
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[template_DELETE]", err);
    return NextResponse.json({ error: "Failed to delete template" }, { status: 500 });
  }
}
