import { db } from '@/lib/db'
import { requireSuperAdmin } from '@/lib/auth/organization-context'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Building2, ArrowRight } from 'lucide-react'

export default async function AdminOrganizationsPage() {
  const admin = await requireSuperAdmin()
  if (!admin) redirect('/dashboard')

  const orgs = await db.organization.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      _count: {
        select: { memberships: true, campaigns: true }
      }
    }
  })

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Organizations</h1>
        <p className="mt-2 text-sm text-gray-500">Manage all organizations on the platform.</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Organization Name</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Members</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Campaigns</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Created</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {orgs.map((org) => (
                <tr key={org.id} className="hover:bg-gray-50 transition-colors group">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center font-bold">
                        {org.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="text-sm font-medium text-gray-900">{org.name}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {org._count.memberships} users
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {org._count.campaigns} campaigns
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(org.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                    <Link 
                      href={`/admin/organizations/${org.id}`}
                      className="inline-flex items-center gap-1.5 text-indigo-600 hover:text-indigo-900 font-medium opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      Manage <ArrowRight className="w-4 h-4" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
