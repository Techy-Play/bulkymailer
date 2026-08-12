"use server";

import { db } from "@/lib/db";
import { createHash } from "crypto";
import { getSessionUser, hashPassword, setSession } from "@/lib/auth";
import { setActiveOrganizationId } from "@/lib/auth/organization-context";

export async function acceptInvitationAction(token: string, formData?: FormData) {
  try {
    const tokenHash = createHash("sha256").update(token).digest("hex");
    const user = await getSessionUser();

    // Re-verify the invitation
    const invitation = await db.organizationInvitation.findUnique({
      where: { tokenHash }
    });

    if (!invitation || invitation.status !== "PENDING" || invitation.expiresAt < new Date()) {
      return { error: "This invitation is invalid or has expired." };
    }

    if (user && user.email !== invitation.email) {
      return { error: "You are logged in with a different email address than the invitation was sent to." };
    }

    let userIdToJoin = user?.id;

    await db.$transaction(async (tx) => {
      // 1. If no user, create one from formData
      if (!userIdToJoin) {
        if (!formData) throw new Error("Missing registration data");
        const firstName = formData.get("firstName") as string;
        const lastName = formData.get("lastName") as string;
        const password = formData.get("password") as string;

        if (!firstName || !password || password.length < 8) {
          throw new Error("Invalid registration data");
        }

        const passwordHash = await hashPassword(password);
        
        // Ensure no conflicting user
        const existing = await tx.user.findUnique({ where: { email: invitation.email } });
        if (existing) {
          throw new Error("An account with this email already exists. Please log in first.");
        }

        const newUser = await tx.user.create({
          data: {
            email: invitation.email,
            firstName,
            lastName,
            passwordHash,
            emailVerified: true, // Auto-verified because they received the email invite
            isOnboardingCompleted: true, // Skipping onboarding for invited users
            otpCode: "000000",
            otpExpiresAt: new Date(), // Already used essentially
            otpAttempts: 0,
          }
        });
        
        userIdToJoin = newUser.id;
      }

      // 2. Create the Membership
      await tx.organizationMembership.create({
        data: {
          organizationId: invitation.organizationId,
          userId: userIdToJoin!,
          role: invitation.role,
          status: "ACTIVE"
        }
      });

      // 3. Update the Invitation status
      await tx.organizationInvitation.update({
        where: { id: invitation.id },
        data: {
          status: "ACCEPTED",
          acceptedAt: new Date()
        }
      });

      // 4. Create Audit Log
      await tx.auditLog.create({
        data: {
          actorUserId: userIdToJoin!,
          organizationId: invitation.organizationId,
          action: "INVITATION_ACCEPTED",
          resourceType: "INVITATION",
          resourceId: invitation.id,
        }
      });
    });

    // Successfully committed!
    
    // Auto-login if we just created the account
    if (!user && userIdToJoin) {
      await setSession(userIdToJoin);
    }
    
    // Auto-switch context to this new organization
    await setActiveOrganizationId(invitation.organizationId);

    return { success: true };

  } catch (err: any) {
    console.error("[acceptInvitation_error]", err);
    return { error: err.message || "An unexpected error occurred" };
  }
}
