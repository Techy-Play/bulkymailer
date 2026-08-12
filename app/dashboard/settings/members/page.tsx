import { requireActiveOrganization } from "@/lib/auth/organization-context";
import { db } from "@/lib/db";
import MembersClient from "./MembersClient";

export default async function MembersPage() {
  const context = await requireActiveOrganization();
  
  if (!context) {
    return null; // Will redirect in layout
  }

  const { organization, user, role } = context;

  const [memberships, invitations] = await Promise.all([
    db.organizationMembership.findMany({
      where: { organizationId: organization.id },
      include: {
        user: { select: { id: true, firstName: true, lastName: true, email: true } }
      },
      orderBy: { createdAt: 'desc' }
    }),
    db.organizationInvitation.findMany({
      where: { organizationId: organization.id },
      include: {
        invitedBy: { select: { firstName: true, lastName: true } }
      },
      orderBy: { createdAt: 'desc' }
    })
  ]);

  return (
    <div className="max-w-screen-xl mx-auto space-y-8">
      <div className="border-b border-gray-200 pb-5 sm:flex sm:items-center sm:justify-between">
        <div>
          <h3 className="text-2xl font-bold leading-6 text-gray-900">Members & Roles</h3>
          <p className="mt-2 max-w-4xl text-sm text-gray-500">
            Manage who has access to {organization.name}. 
          </p>
        </div>
      </div>

      <MembersClient 
        orgId={organization.id} 
        currentUserId={user.id}
        currentUserRole={role}
        initialMemberships={memberships} 
        initialInvitations={invitations} 
      />
    </div>
  );
}
