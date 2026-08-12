import { NextRequest, NextResponse } from "next/server";
import { getSessionUserId } from "@/lib/auth";
import { getActiveOrganizationId, requirePermission } from "@/lib/auth/organization-context";
import { db } from "@/lib/db";
import { z } from "zod";

const emailSchema = z.string().email();

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const userId = await getSessionUserId();
    if (!userId) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

    const orgId = await getActiveOrganizationId();
    if (!orgId) return NextResponse.json({ error: "No active organization" }, { status: 403 });

    const __perm = await requirePermission(orgId, "organization.settings");
    if (!__perm) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    const { id } = await params;

    const existing = await db.senderProfile.findFirst({
      where: { id, organizationId: orgId }
    });

    if (!existing) return NextResponse.json({ error: "Profile not found" }, { status: 404 });

    await db.senderProfile.delete({
      where: { id }
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[sender_profile_DELETE]", err);
    return NextResponse.json({ error: "Failed to delete sender profile" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const userId = await getSessionUserId();
    if (!userId) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

    const orgId = await getActiveOrganizationId();
    if (!orgId) return NextResponse.json({ error: "No active organization" }, { status: 403 });

    const __perm = await requirePermission(orgId, "organization.settings");
    if (!__perm) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    const { id } = await params;
    const body = await req.json();
    const { fromName, fromEmail, replyTo, isDefault } = body;

    const existing = await db.senderProfile.findFirst({
      where: { id, organizationId: orgId }
    });

    if (!existing) return NextResponse.json({ error: "Profile not found" }, { status: 404 });

    if (fromEmail) {
      const emailParse = emailSchema.safeParse(fromEmail);
      if (!emailParse.success) {
        return NextResponse.json({ error: emailParse.error.issues[0].message }, { status: 400 });
      }
    }

    if (replyTo) {
      const replyParse = emailSchema.safeParse(replyTo);
      if (!replyParse.success) {
        return NextResponse.json({ error: replyParse.error.issues[0].message }, { status: 400 });
      }
    }

    if (isDefault === true) {
      await db.senderProfile.updateMany({
        where: { organizationId: orgId, id: { not: id } },
        data: { isDefault: false }
      });
    }

    const profile = await db.senderProfile.update({
      where: { id },
      data: {
        ...(fromName !== undefined && { fromName }),
        ...(fromEmail !== undefined && { fromEmail }),
        ...(replyTo !== undefined && { replyTo }),
        ...(isDefault !== undefined && { isDefault })
      }
    });

    return NextResponse.json({ profile });
  } catch (err) {
    console.error("[sender_profile_PATCH]", err);
    return NextResponse.json({ error: "Failed to update sender profile" }, { status: 500 });
  }
}
