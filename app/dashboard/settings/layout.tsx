import { redirect } from "next/navigation";
import { requireActiveOrganization } from "@/lib/auth/organization-context";
import Link from "next/link";
import { Users, Shield, Mail, Globe } from "lucide-react";

export default async function SettingsLayout({ children }: { children: React.ReactNode }) {
  const context = await requireActiveOrganization();
  if (!context) {
    return null;
  }

  const { organization } = context;
  const isPersonal = organization.type === "PERSONAL";

  return (
    <div className="flex flex-col md:flex-row gap-8 w-full max-w-6xl mx-auto py-6">
      <aside className="w-full md:w-64 shrink-0">
        <nav className="flex flex-col gap-1">
          <Link href="/dashboard/settings/email" className="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-100 hover:text-gray-900">
            <Mail className="w-4 h-4" />
            Email Delivery
          </Link>
          <Link href="/dashboard/settings/domains" className="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-100 hover:text-gray-900">
            <Globe className="w-4 h-4" />
            Domains
          </Link>
          {!isPersonal && (
            <>
              <Link href="/dashboard/settings/members" className="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-100 hover:text-gray-900">
                <Users className="w-4 h-4" />
                Members
              </Link>
              <Link href="/dashboard/settings/roles" className="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-100 hover:text-gray-900">
                <Shield className="w-4 h-4" />
                Roles
              </Link>
            </>
          )}
        </nav>
      </aside>
      <main className="flex-1 min-w-0">
        {children}
      </main>
    </div>
  );
}
