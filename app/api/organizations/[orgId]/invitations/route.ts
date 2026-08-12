import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requirePermission } from "@/lib/auth/organization-context";
import { generateInvitationToken, sendInvitationEmail } from "@/lib/auth/invitations";
import { canManageRole } from "@/lib/auth/rbac";
import { OrgRole } from "@/app/generated/prisma/client";
import { z } from "zod";

const InviteSchema = z.object({
  email: z.string().email(),
  role: z.nativeEnum(OrgRole),
});

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ orgId: string }> }
) {
  try {
    const { orgId } = await params;
    
    // 1. Verify authorization
    const context = await requirePermission(orgId, "member.invite");
    if (!context) {
      return NextResponse.json({ error: "Forbidden: insufficient permissions" }, { status: 403 });
    }

    const body = await req.json();
    const result = InviteSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json({ error: "Invalid data", details: result.error.issues }, { status: 400 });
    }

    const { email, role } = result.data;

    // 2. Prevent role elevation (e.g. ADMIN cannot invite an OWNER)
    if (!canManageRole(context.role, role)) {
      return NextResponse.json({ error: "Forbidden: Cannot invite a member with a higher or equivalent privileged role" }, { status: 403 });
    }

    // 3. Check if user is already a member
    const existingUser = await db.user.findUnique({ where: { email } });
    if (existingUser) {
      const existingMembership = await db.organizationMembership.findUnique({
        where: {
          organizationId_userId: {
            organizationId: orgId,
            userId: existingUser.id,
          },
        },
      });

      if (existingMembership) {
        return NextResponse.json({ error: "User is already a member of this organization" }, { status: 400 });
      }
    }

    // 4. Generate secure token
    const { rawToken, tokenHash } = generateInvitationToken();
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

    // 5. Create invitation and Audit Log transactionally
    const invitation = await db.$transaction(async (tx) => {
      // Create invitation
      const inv = await tx.organizationInvitation.create({
        data: {
          organizationId: orgId,
          email,
          role,
          invitedById: context.user.id,
          tokenHash,
          expiresAt,
          status: "PENDING",
        },
      });

      // Log it
      await tx.auditLog.create({
        data: {
          actorUserId: context.user.id,
          organizationId: orgId,
          action: "MEMBER_INVITED",
          resourceType: "INVITATION",
          resourceId: inv.id,
          metadata: { email, role }
        }
      });

      return inv;
    });

    // 6. Send the email
    const inviterName = `${context.user.firstName} ${context.user.lastName}`.trim();
    const orgName = context.organization.name;
    
    // We do not await email sending to prevent slow API response, 
    // unless we need guaranteed delivery before returning 200.
    await sendInvitationEmail(email, inviterName, orgName, role, rawToken).catch(err => {
      console.error("[sendInvitationEmail_failure]", err);
    });

    return NextResponse.json({ success: true, invitationId: invitation.id });
    
  } catch (error) {
    console.error("[invite_error]", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ orgId: string }> }
) {
  try {
    const { orgId } = await params;
    
    // Verify authorization
    const context = await requirePermission(orgId, "member.view");
    if (!context) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const invitations = await db.organizationInvitation.findMany({
      where: { organizationId: orgId },
      orderBy: { createdAt: 'desc' },
      include: {
        invitedBy: {
          select: { firstName: true, lastName: true, email: true }
        }
      }
    });

    return NextResponse.json({ invitations });
  } catch (error) {
    console.error("[get_invitations_error]", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
