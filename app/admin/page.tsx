import { db } from '@/lib/db'

export default async function AdminDashboard() {
  const [
    totalUsers,
    activeUsers,
    pendingUsers,
    suspendedUsers,
    totalOrganizations,
    recentUsers,
  ] = await Promise.all([
    db.user.count(),
    db.user.count({ where: { status: 'ACTIVE' } }),
    db.user.count({ where: { status: 'PENDING' } }),
    db.user.count({ where: { status: 'SUSPENDED' } }),
    db.organization.count(),
    db.user.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        status: true,
        role: true,
        createdAt: true,
      },
    }),
  ])

  const statCards = [
    { name: 'Total Users', value: totalUsers, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { name: 'Active Users', value: activeUsers, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { name: 'Pending Users', value: pendingUsers, color: 'text-amber-600', bg: 'bg-amber-50' },
    { name: 'Suspended Users', value: suspendedUsers, color: 'text-red-600', bg: 'bg-red-50' },
    { name: 'Total Organizations', value: totalOrganizations, color: 'text-purple-600', bg: 'bg-purple-50' },
  ]

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Admin Dashboard</h1>
        <p className="mt-2 text-sm text-gray-500">Overview of your BulkyMailer platform.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {statCards.map((stat) => (
          <div key={stat.name} className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
            <p className="text-sm font-medium text-gray-500">{stat.name}</p>
            <p className={`mt-2 text-3xl font-bold ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Recently Joined Users</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Joined Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {recentUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {user.firstName} {user.lastName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      user.status === 'ACTIVE' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' :
                      user.status === 'PENDING' ? 'bg-amber-50 text-amber-700 border border-amber-100' :
                      'bg-red-50 text-red-700 border border-red-100'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium ${
                      user.role === 'ADMIN' ? 'bg-indigo-50 text-indigo-700' :
                      user.role === 'OWNER' ? 'bg-purple-50 text-purple-700' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
              {recentUsers.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-sm text-gray-500">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
