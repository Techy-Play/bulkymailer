import { requireSuperAdmin } from "@/lib/auth/organization-context";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";

export default async function AdminOrganizationMembersPage({ params }: { params: Promise<{ id: string }> }) {
  const admin = await requireSuperAdmin();
  if (!admin) return null; // Redirect handled by layout

  const { id } = await params;

  const org = await db.organization.findUnique({
    where: { id },
    include: {
      memberships: {
        include: { user: true },
        orderBy: { createdAt: 'desc' }
      }
    }
  });

  if (!org) notFound();

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">{org.name} - Members (Super Admin Override)</h1>
      <p className="mb-6 text-gray-600">As a Super Admin, you can view the active members of this organization. To perform overrides, use the API or impersonation (if implemented).</p>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {org.memberships.map((m) => (
              <tr key={m.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{m.user.firstName} {m.user.lastName}</div>
                      <div className="text-sm text-gray-500">{m.user.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-gray-900">{m.role.replace("_", " ")}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${m.status === 'ACTIVE' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {m.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
