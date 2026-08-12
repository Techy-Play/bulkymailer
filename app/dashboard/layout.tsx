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

    if (memberships.length === 0) {
      return (
        <div className="flex h-screen w-full items-center justify-center bg-gray-50">
          <div className="max-w-md p-8 bg-white rounded-lg shadow text-center">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">No Organization Access</h2>
            <p className="text-gray-600">You are not an active member of any organization. Please contact your administrator or check your email for an invitation.</p>
          </div>
        </div>
      );
    }

    if (memberships.length === 1) {
      // Auto-initialize if exactly one
      return <AutoInitializeOrganization organizationId={memberships[0].organizationId} />;
    }

    // If multiple memberships and none active, show selector
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center bg-gray-50 p-4">
        <OrganizationSelector memberships={memberships} />
      </div>
    );
  }

  // Gather all memberships for the organization switcher dropdown in the shell
  const allMemberships = await db.organizationMembership.findMany({
    where: { userId: user.id, status: "ACTIVE" },
    include: { organization: true },
  });

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
      availableOrganizations={allMemberships.map(m => ({
        id: m.organization.id,
        name: m.organization.name,
      }))}
    >
      {children}
    </DashboardShell>
  );
}
