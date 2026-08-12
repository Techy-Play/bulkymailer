import { NextRequest, NextResponse } from "next/server";
import { getSessionUserId } from "@/lib/auth";
import { getActiveOrganizationId, requirePermission } from "@/lib/auth/organization-context";
import { db } from "@/lib/db";

async function verifyListOwnership(listId: string, orgId: string) {
  return db.contactList.findFirst({ where: { id: listId, organizationId: orgId } });
}

type Params = Promise<{ id: string; contactId: string }>;

// PATCH /api/contacts/lists/[id]/contacts/[contactId] — inline edit contact
export async function PATCH(req: NextRequest, { params }: { params: Params }) {
  try {
    const userId = await getSessionUserId();
    if (!userId) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

    const orgId = await getActiveOrganizationId();
    if (!orgId) return NextResponse.json({ error: "No active organization" }, { status: 403 });

    const __perm = await requirePermission(orgId, "contact.edit");
    if (!__perm) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    const { id: listId, contactId } = await params;
    const list = await verifyListOwnership(listId, orgId);
    if (!list) return NextResponse.json({ error: "List not found" }, { status: 404 });

    const body = await req.json();
    const updated = await db.contact.update({
      where: { id: contactId, listId },
      data: body,
    });

    return NextResponse.json({ contact: updated });
  } catch (err) {
    console.error("[contacts_PATCH]", err);
    return NextResponse.json({ error: "Failed to update contact" }, { status: 500 });
  }
}

// DELETE /api/contacts/lists/[id]/contacts/[contactId] — delete single contact
export async function DELETE(req: NextRequest, { params }: { params: Params }) {
  try {
    const userId = await getSessionUserId();
    if (!userId) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

    const orgId = await getActiveOrganizationId();
    if (!orgId) return NextResponse.json({ error: "No active organization" }, { status: 403 });

    const __perm = await requirePermission(orgId, "contact.delete");
    if (!__perm) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    const { id: listId, contactId } = await params;
    const list = await verifyListOwnership(listId, orgId);
    if (!list) return NextResponse.json({ error: "List not found" }, { status: 404 });

    await db.contact.delete({
      where: { id: contactId, listId },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[contacts_DELETE]", err);
    return NextResponse.json({ error: "Failed to delete contact" }, { status: 500 });
  }
}
