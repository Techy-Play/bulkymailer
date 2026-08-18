import { requireActiveOrganization } from "@/lib/auth/organization-context";
import { redirect } from "next/navigation";

export default async function RolesSettingsPage() {
  const context = await requireActiveOrganization();
  if (!context || context.organization.type === "PERSONAL") {
    redirect("/dashboard/settings");
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      <div>
        <h1 className="text-2xl font-bold text-[#111827]">Organization Roles</h1>
        <p className="text-sm text-[#6B7280]">Manage roles and permissions for your team members.</p>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-8 text-center shadow-sm">
        <div className="mx-auto w-16 h-16 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mb-4">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
        <h2 className="text-lg font-semibold text-gray-900 mb-2">Roles are managed internally</h2>
        <p className="text-sm text-gray-500 max-w-md mx-auto">
          Currently, roles (OWNER, ADMIN, MEMBER) have predefined permissions. Custom role creation will be available in a future update.
        </p>
      </div>
    </div>
  );
}
