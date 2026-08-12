import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requirePermission } from "@/lib/auth/organization-context";
import { canManageRole } from "@/lib/auth/rbac";
import { generateInvitationToken, sendInvitationEmail } from "@/lib/auth/invitations";

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
      return NextResponse.json({ error: "Only pending invitations can be resent" }, { status: 400 });
    }

    if (!canManageRole(context.role, invitation.role)) {
      return NextResponse.json({ error: "Forbidden: Cannot resend an invitation for a higher or equivalent privileged role" }, { status: 403 });
    }

    // Refresh the token to invalidate any old emails sent out (security best practice)
    const { rawToken, tokenHash } = generateInvitationToken();
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    await db.organizationInvitation.update({
      where: { id },
      data: { tokenHash, expiresAt },
    });

    const inviterName = `${context.user.firstName} ${context.user.lastName}`.trim();
    const orgName = context.organization.name;
    
    await sendInvitationEmail(
      invitation.email, 
      inviterName, 
      orgName, 
      invitation.role, 
      rawToken
    ).catch(err => console.error("[resendInvitationEmail_failure]", err));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[resend_invitation_error]", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
