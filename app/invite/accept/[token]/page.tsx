import { notFound, redirect } from "next/navigation";
import { db } from "@/lib/db";
import { createHash } from "crypto";
import { getSessionUser } from "@/lib/auth";
import AcceptInvitationClient from "./AcceptInvitationClient";

export default async function AcceptInvitationPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;

  // 1. Hash token to look it up
  const tokenHash = createHash("sha256").update(token).digest("hex");

  const invitation = await db.organizationInvitation.findUnique({
    where: { tokenHash },
    include: {
      organization: true,
      invitedBy: { select: { firstName: true, lastName: true, email: true } },
    },
  });

  if (!invitation) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="bg-white p-8 rounded-xl shadow max-w-md w-full text-center">
          <h1 className="text-xl font-bold text-gray-900 mb-2">Invalid Invitation</h1>
          <p className="text-gray-600">This invitation link is invalid or does not exist.</p>
        </div>
      </div>
    );
  }

  if (invitation.status !== "PENDING" || invitation.expiresAt < new Date()) {
    // If it's expired but still marked pending, we could mark it EXPIRED here
    if (invitation.status === "PENDING" && invitation.expiresAt < new Date()) {
      await db.organizationInvitation.update({
        where: { id: invitation.id },
        data: { status: "EXPIRED" }
      });
    }

    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="bg-white p-8 rounded-xl shadow max-w-md w-full text-center">
          <h1 className="text-xl font-bold text-gray-900 mb-2">Invitation Expired</h1>
          <p className="text-gray-600">This invitation has already been accepted, revoked, or expired.</p>
        </div>
      </div>
    );
  }

  const user = await getSessionUser();

  // If a user is logged in but it's the WRONG user for this invite
  if (user && user.email !== invitation.email) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="bg-white p-8 rounded-xl shadow max-w-md w-full text-center">
          <h1 className="text-xl font-bold text-gray-900 mb-2">Wrong Account</h1>
          <p className="text-gray-600">
            This invitation was sent to <strong>{invitation.email}</strong>, but you are logged in as <strong>{user.email}</strong>.
          </p>
          <a href="/api/auth/logout" className="mt-6 inline-block bg-indigo-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-indigo-700">
            Sign out
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] p-4">
      <AcceptInvitationClient
        invitation={{
          id: invitation.id,
          email: invitation.email,
          role: invitation.role,
          organizationName: invitation.organization.name,
          inviterName: `${invitation.invitedBy.firstName} ${invitation.invitedBy.lastName}`.trim()
        }}
        isLoggedIn={!!user}
        token={token}
        currentOrganizationName={user?.organization?.name}
      />
    </div>
  );
}
