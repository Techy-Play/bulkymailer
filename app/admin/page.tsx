import { db } from '@/lib/db'
import { requireSuperAdmin } from '@/lib/auth/organization-context'
import { redirect } from 'next/navigation'

export default async function AdminDashboard() {
  const user = await requireSuperAdmin()
  if (!user) redirect('/dashboard')

  const [
    totalUsers,
    activeUsers,
    suspendedUsers,
    totalOrganizations,
    totalCampaigns,
    draftCampaigns,
    sentCampaigns,
    totalContacts,
    totalLists,
    publicTemplates,
    recentUsers,
    recentOrgs,
  ] = await Promise.all([
    db.user.count(),
    db.user.count({ where: { status: 'ACTIVE' } }),
    db.user.count({ where: { status: 'SUSPENDED' } }),
    db.organization.count(),
    db.campaign.count(),
    db.campaign.count({ where: { status: 'DRAFT' } }),
    db.campaign.count({ where: { status: 'SENT' } }),
    db.contact.count(),
    db.contactList.count(),
    db.template.count({ where: { userId: null, organizationId: null } }),
    db.user.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      select: { id: true, firstName: true, lastName: true, email: true, status: true, role: true, createdAt: true },
    }),
    db.organization.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      select: { id: true, name: true, createdAt: true },
    }),
  ])

  const statCards = [
    { name: 'Total Users', value: totalUsers, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { name: 'Active Users', value: activeUsers, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { name: 'Total Organizations', value: totalOrganizations, color: 'text-purple-600', bg: 'bg-purple-50' },
    { name: 'Total Campaigns', value: totalCampaigns, color: 'text-blue-600', bg: 'bg-blue-50' },
    { name: 'Sent Campaigns', value: sentCampaigns, color: 'text-green-600', bg: 'bg-green-50' },
    { name: 'Total Contacts', value: totalContacts, color: 'text-orange-600', bg: 'bg-orange-50' },
    { name: 'Public Templates', value: publicTemplates, color: 'text-pink-600', bg: 'bg-pink-50' },
  ]

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Admin Dashboard</h1>
        <p className="mt-2 text-sm text-gray-500">Overview of your BulkyMailer platform.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        {statCards.map((stat) => (
          <div key={stat.name} className="bg-white rounded-2xl p-4 border border-gray-200 shadow-sm flex flex-col justify-center items-center text-center">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">{stat.name}</p>
            <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-900">Recently Joined Users</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">User</th>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Joined</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {recentUsers.map((u) => (
                  <tr key={u.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="font-medium text-gray-900">{u.firstName} {u.lastName}</div>
                      <div className="text-gray-500">{u.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                        u.status === 'ACTIVE' ? 'bg-emerald-50 text-emerald-700' :
                        u.status === 'PENDING' ? 'bg-amber-50 text-amber-700' :
                        'bg-red-50 text-red-700'
                      }`}>
                        {u.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(u.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-900">Recent Organizations</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Created</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {recentOrgs.map((org) => (
                  <tr key={org.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {org.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(org.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

    </div>
  )
}
