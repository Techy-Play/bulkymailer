import { redirect } from "next/navigation";
import { getSessionUser } from "@/lib/auth";
import DashboardShell from "./_components/DashboardShell";

export const dynamic = "force-dynamic";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getSessionUser();

  if (!user) redirect("/login");
  if (!user.emailVerified) redirect("/verify-otp?email=" + encodeURIComponent(user.email));

  return (
    <DashboardShell
      navLayout={(user.navLayout as "sidebar" | "topnav") ?? "sidebar"}
      user={{
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        profileImageUrl: user.profileImageUrl ?? null,
        emailsSentThisMonth: user.emailsSentThisMonth,
        subscriptionType: user.subscriptionType,
        navLayout: (user.navLayout as "sidebar" | "topnav") ?? "sidebar",
      }}
      orgName={user.organization?.name ?? null}
      orgLogoUrl={user.organization?.logoUrl ?? null}
    >
      {children}
    </DashboardShell>
  );
}
