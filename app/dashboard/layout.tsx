import { redirect } from "next/navigation";
import { getSessionUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { requireActiveOrganization } from "@/lib/auth/organization-context";
import DashboardShell from "./_components/DashboardShell";
import OrganizationSelector from "./_components/OrganizationSelector";
import AutoInitializeOrganization from "./_components/AutoInitializeOrganization";

export const dynamic = "force-dynamic";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getSessionUser();

  if (!user) redirect("/login");
  if (!user.emailVerified) redirect("/verify-otp?email=" + encodeURIComponent(user.email));

  // 1. Try to get active organization from cookie
  let orgContext = await requireActiveOrganization();

  // 2. If no valid org context, handle auto-initialization or selection
  if (!orgContext) {
    const memberships = await db.organizationMembership.findMany({
      where: { userId: user.id, status: "ACTIVE" },
      include: { organization: true },
    });
    
    const personalOrgs = await db.organization.findMany({
      where: { ownerUserId: user.id, type: "PERSONAL" }
    });
    
    const allAvailableOrgs = [
      ...personalOrgs.map(org => ({ organization: org, role: "OWNER" as const })),
      ...memberships.map(m => ({ organization: m.organization, role: m.role }))
    ];

    if (allAvailableOrgs.length === 0) {
      return (
        <div className="flex h-screen w-full items-center justify-center bg-gray-50">
          <div className="max-w-md p-8 bg-white rounded-lg shadow text-center">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">No Organization Access</h2>
            <p className="text-gray-600">You are not an active member of any organization. Please contact your administrator or check your email for an invitation.</p>
          </div>
        </div>
      );
    }

    if (allAvailableOrgs.length === 1) {
      // Auto-initialize if exactly one
      return <AutoInitializeOrganization organizationId={allAvailableOrgs[0].organization.id} />;
    }

    // If multiple memberships and none active, show selector
    // Note: The OrganizationSelector takes standard memberships, so we map our combined list to match the expected shape
    const combinedMemberships = allAvailableOrgs.map(item => ({
      id: item.organization.id, // Using org id as proxy id for the selector
      organizationId: item.organization.id,
      userId: user.id,
      role: item.role,
      status: "ACTIVE" as const,
      createdAt: new Date(),
      updatedAt: new Date(),
      organization: item.organization
    }));

    return (
      <div className="flex h-screen w-full flex-col items-center justify-center bg-gray-50 p-4">
        <OrganizationSelector memberships={combinedMemberships} />
      </div>
    );
  }

  // Gather all memberships for the organization switcher dropdown in the shell
  const memberships = await db.organizationMembership.findMany({
    where: { userId: user.id, status: "ACTIVE" },
    include: { organization: true },
  });
  
  const personalOrgs = await db.organization.findMany({
    where: { ownerUserId: user.id, type: "PERSONAL" }
  });
  
  const allAvailableOrgs = [
    ...personalOrgs.map(org => ({ organization: org, role: "OWNER" as const })),
    ...memberships.map(m => ({ organization: m.organization, role: m.role }))
  ];

  return (
    <DashboardShell
      navLayout={(user.navLayout as "sidebar" | "topnav") ?? "sidebar"}
      user={{
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        profileImageUrl: user.profileImageUrl,
        // The old user.role is obsolete. Pass the active org role context.
        role: orgContext.role,
        emailsSentThisMonth: user.emailsSentThisMonth,
      }}
      orgName={orgContext.organization.name}
      activeOrganizationId={orgContext.organization.id}
      availableOrganizations={allAvailableOrgs.map(m => ({
        id: m.organization.id,
        name: m.organization.name,
      }))}
    >
      {children}
    </DashboardShell>
  );
}
