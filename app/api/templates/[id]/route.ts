import { NextRequest, NextResponse } from "next/server";
import { getSessionUserId } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const userId = await getSessionUserId();
    if (!userId) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

    const { id } = await params;

    const template = await db.template.findFirst({
      where: {
        id,
        OR: [{ userId: null }, { userId }]
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

    const { id } = await params;
    const body = await req.json();
    const { name, category, htmlContent, description, previewText, isFavorite, jsonTree } = body;

    // Check if template exists
    const existing = await db.template.findFirst({
      where: {
        id,
        OR: [{ userId: null }, { userId }]
      }
    });

    if (!existing) {
      return NextResponse.json({ error: "Template not found" }, { status: 404 });
    }

    // If template belongs to another user or is a System Template (userId === null),
    // automatically FORK it into the current user's library as a new template draft.
    if (existing.userId !== userId) {
      const forkedTemplate = await db.template.create({
        data: {
          userId,
          name: name || `${existing.name} (My Copy)`,
          category: category || existing.category || "GENERAL",
          htmlContent: htmlContent !== undefined ? htmlContent : existing.htmlContent,
          description: description !== undefined ? description : existing.description,
          previewText: previewText !== undefined ? previewText : existing.previewText,
          isFavorite: false,
          jsonTree: jsonTree !== undefined ? jsonTree : existing.jsonTree,
        }
      });
      return NextResponse.json({ template: forkedTemplate, isForked: true });
    }

    // Otherwise, update existing user-owned template
    const template = await db.template.update({
      where: { id },
      data: {
        name: name !== undefined ? name : existing.name,
        category: category !== undefined ? category : existing.category,
        htmlContent: htmlContent !== undefined ? htmlContent : existing.htmlContent,
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

    const existing = await db.template.findFirst({
      where: { id, userId }
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
