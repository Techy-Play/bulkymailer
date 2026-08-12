import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requirePermission } from "@/lib/auth/organization-context";
import { canManageRole } from "@/lib/auth/rbac";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ orgId: string; id: string }> }
) {
  try {
    const { orgId, id } = await params;

    const context = await requirePermission(orgId, "member.invite");
    if (!context) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const invitation = await db.organizationInvitation.findUnique({
      where: { id, organizationId: orgId },
    });

    if (!invitation) {
      return NextResponse.json({ error: "Invitation not found" }, { status: 404 });
    }

    if (invitation.status !== "PENDING") {
      return NextResponse.json({ error: "Only pending invitations can be revoked" }, { status: 400 });
    }

    if (!canManageRole(context.role, invitation.role)) {
      return NextResponse.json({ error: "Forbidden: Cannot revoke an invitation for a higher or equivalent privileged role" }, { status: 403 });
    }

    await db.$transaction(async (tx) => {
      await tx.organizationInvitation.update({
        where: { id },
        data: { status: "REVOKED" },
      });

      await tx.auditLog.create({
        data: {
          actorUserId: context.user.id,
          organizationId: orgId,
          action: "INVITATION_REVOKED",
          resourceType: "INVITATION",
          resourceId: id,
        }
      });
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[revoke_invitation_error]", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
