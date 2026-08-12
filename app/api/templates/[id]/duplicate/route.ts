import { NextRequest, NextResponse } from "next/server";
import { getSessionUserId } from "@/lib/auth";
import { getActiveOrganizationId, requirePermission } from "@/lib/auth/organization-context";
import { db } from "@/lib/db";

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const userId = await getSessionUserId();
    if (!userId) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

    const { id } = await params;

    const orgId = await getActiveOrganizationId();
    if (!orgId) return NextResponse.json({ error: "No active organization" }, { status: 403 });

    const __perm = await requirePermission(orgId, "template.create");
    if (!__perm) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    const existing = await db.template.findFirst({
      where: {
        id,
        OR: [{ userId: null }, { organizationId: orgId }]
      }
    });

    if (!existing) return NextResponse.json({ error: "Template not found" }, { status: 404 });
    if (existing.generation === 'LEGACY') return NextResponse.json({ error: "Legacy templates cannot be duplicated." }, { status: 400 });

    // Handle name collision
    let baseName = existing.name;
    // If it's a public template, we might want to keep the name exactly as it is for the copy if the user doesn't own one yet
    let newName = existing.userId === null ? baseName : `${baseName} (Copy)`;
    
    let isUnique = false;
    let suffixCounter = 2;
    while (!isUnique) {
      const collision = await db.template.findFirst({
        where: { organizationId: orgId, name: newName }
      });
      if (!collision) {
        isUnique = true;
      } else {
        newName = `${baseName} (Copy ${suffixCounter})`;
        suffixCounter++;
      }
    }

    // Deep copy JSON tree
    const newJsonTree = existing.jsonTree ? JSON.parse(JSON.stringify(existing.jsonTree)) : null;

    const newTemplate = await db.template.create({
      data: {
        userId, // track creator
        organizationId: orgId,
        name: newName,
        category: existing.category,
        generation: 'MODERN',
        htmlContent: existing.htmlContent,
        jsonTree: newJsonTree as any,
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
