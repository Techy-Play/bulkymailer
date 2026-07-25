import { NextRequest, NextResponse } from "next/server";
import { getSessionUserId } from "@/lib/auth";
import { db } from "@/lib/db";

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const userId = await getSessionUserId();
    if (!userId) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

    const { id } = await params;

    const existing = await db.template.findFirst({
      where: {
        id,
        OR: [{ userId: null }, { userId }]
      }
    });

    if (!existing) return NextResponse.json({ error: "Template not found" }, { status: 404 });

    const newTemplate = await db.template.create({
      data: {
        userId,
        name: `${existing.name} Copy`,
        category: existing.category,
        htmlContent: existing.htmlContent,
        description: existing.description,
        previewText: existing.previewText
      }
    });

    return NextResponse.json({ template: newTemplate });
  } catch (err) {
    console.error("[template_duplicate_POST]", err);
    return NextResponse.json({ error: "Failed to duplicate template" }, { status: 500 });
  }
}
