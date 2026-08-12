import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requirePermission } from "@/lib/auth/organization-context";
import { canManageRole } from "@/lib/auth/rbac";
import { OrgRole, MemberStatus } from "@/app/generated/prisma/client";
import { z } from "zod";

const UpdateMemberSchema = z.object({
  action: z.enum(["CHANGE_ROLE", "SUSPEND", "REACTIVATE", "REMOVE"]),
  role: z.nativeEnum(OrgRole).optional(),
});

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ orgId: string; userId: string }> }
) {
  try {
    const { orgId, userId } = await params;

    const body = await req.json();
    const result = UpdateMemberSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json({ error: "Invalid data", details: result.error.issues }, { status: 400 });
    }

    const { action, role } = result.data;

    // 1. Determine permission needed
    let requiredPermission: import("@/lib/auth/rbac").Permission;
    if (action === "CHANGE_ROLE") requiredPermission = "member.change_role";
    else if (action === "SUSPEND") requiredPermission = "member.suspend";
    else if (action === "REACTIVATE") requiredPermission = "member.suspend"; // using same permission
    else if (action === "REMOVE") requiredPermission = "member.remove";
    else return NextResponse.json({ error: "Invalid action" }, { status: 400 });

    const context = await requirePermission(orgId, requiredPermission);
    if (!context) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // 2. Fetch target membership
    const targetMembership = await db.organizationMembership.findUnique({
      where: { organizationId_userId: { organizationId: orgId, userId } },
    });

    if (!targetMembership) {
      return NextResponse.json({ error: "Member not found" }, { status: 404 });
    }

    // 3. Hierarchical RBAC checks
    // The actor must have authority over the target's CURRENT role
    if (!canManageRole(context.role, targetMembership.role)) {
      return NextResponse.json({ error: "Forbidden: Cannot modify a member with a higher or equivalent privileged role" }, { status: 403 });
    }

    // 4. Cannot remove/suspend the final OWNER
    if (targetMembership.role === "OWNER" && (action === "REMOVE" || action === "SUSPEND" || action === "CHANGE_ROLE")) {
      const ownerCount = await db.organizationMembership.count({
        where: { organizationId: orgId, role: "OWNER", status: "ACTIVE" }
      });
      if (ownerCount <= 1) {
        return NextResponse.json({ error: "Cannot modify or remove the final active owner of the organization." }, { status: 400 });
      }
    }

    await db.$transaction(async (tx) => {
      let metadata: any = {};

      if (action === "CHANGE_ROLE" && role) {
        // Also check if actor can assign the NEW role
        if (!canManageRole(context.role, role)) {
          throw new Error("Forbidden: Cannot assign this role");
        }
        await tx.organizationMembership.update({
          where: { organizationId_userId: { organizationId: orgId, userId } },
          data: { role }
        });
        metadata = { oldRole: targetMembership.role, newRole: role };
      } else if (action === "SUSPEND") {
        await tx.organizationMembership.update({
          where: { organizationId_userId: { organizationId: orgId, userId } },
          data: { status: "SUSPENDED" }
        });
      } else if (action === "REACTIVATE") {
        await tx.organizationMembership.update({
          where: { organizationId_userId: { organizationId: orgId, userId } },
          data: { status: "ACTIVE" }
        });
      } else if (action === "REMOVE") {
        await tx.organizationMembership.delete({
          where: { organizationId_userId: { organizationId: orgId, userId } },
        });
      }

      await tx.auditLog.create({
        data: {
          actorUserId: context.user.id,
          organizationId: orgId,
          targetUserId: userId,
          action: `MEMBER_${action}`,
          resourceType: "MEMBERSHIP",
          resourceId: targetMembership.id,
          metadata
        }
      });
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("[update_member_error]", error);
    if (error.message.startsWith("Forbidden")) {
      return NextResponse.json({ error: error.message }, { status: 403 });
    }
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
