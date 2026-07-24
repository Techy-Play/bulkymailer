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

    // Only allow updating user's own templates (not system templates)
    const existing = await db.template.findFirst({
      where: { id, userId }
    });

    if (!existing) return NextResponse.json({ error: "Template not found or cannot be edited" }, { status: 404 });

    const { name, category, htmlContent } = await req.json();

    const template = await db.template.update({
      where: { id },
      data: {
        name: name !== undefined ? name : existing.name,
        category: category !== undefined ? category : existing.category,
        htmlContent: htmlContent !== undefined ? htmlContent : existing.htmlContent
      }
    });

    return NextResponse.json({ template });
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
