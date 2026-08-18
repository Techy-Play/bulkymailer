import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requirePermission } from "@/lib/auth/organization-context";
import { OrgRole } from "@/app/generated/prisma/client";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ orgId: string; userId: string }> }
) {
  try {
    const { orgId, userId } = await params;

    // Only someone with transfer_ownership permission (i.e. existing OWNER) can do this
    const context = await requirePermission(orgId, "member.transfer_ownership");
    if (!context) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    if (context.organization.type === "PERSONAL") {
      return NextResponse.json({ error: "Cannot transfer ownership of a personal workspace" }, { status: 403 });
    }

    const targetMembership = await db.organizationMembership.findUnique({
      where: { organizationId_userId: { organizationId: orgId, userId } },
    });

    if (!targetMembership || targetMembership.status !== "ACTIVE") {
      return NextResponse.json({ error: "Target member not found or not active" }, { status: 404 });
    }

    if (targetMembership.userId === context.user.id) {
      return NextResponse.json({ error: "Cannot transfer ownership to yourself" }, { status: 400 });
    }

    await db.$transaction(async (tx) => {
      // 1. Assign new OWNER
      await tx.organizationMembership.update({
        where: { id: targetMembership.id },
        data: { role: "OWNER" }
      });

      // 2. Downgrade previous OWNER (the actor) to ADMIN
      await tx.organizationMembership.update({
        where: { id: context.membership.id },
        data: { role: "ADMIN" }
      });

      // 3. Log it
      await tx.auditLog.create({
        data: {
          actorUserId: context.user.id,
          organizationId: orgId,
          targetUserId: userId,
          action: "OWNERSHIP_TRANSFERRED",
          resourceType: "MEMBERSHIP",
          resourceId: targetMembership.id,
          metadata: {
            oldOwnerId: context.user.id,
            newOwnerId: userId,
          }
        }
      });
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[transfer_ownership_error]", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
