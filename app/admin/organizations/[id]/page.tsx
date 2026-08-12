import { db } from '@/lib/db'
import { requireSuperAdmin } from '@/lib/auth/organization-context'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Users, Send, LayoutTemplate, Settings } from 'lucide-react'

export default async function AdminOrganizationWorkspacePage({ params }: { params: Promise<{ id: string }> }) {
  const admin = await requireSuperAdmin()
  if (!admin) redirect('/dashboard')

  const { id } = await params
  
  const org = await db.organization.findUnique({
    where: { id },
    include: {
      memberships: {
        include: { user: true }
      },
      campaigns: {
        orderBy: { createdAt: 'desc' },
        take: 5
      }
    }
  })

  if (!org) redirect('/admin/organizations')

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex items-center gap-4">
        <Link href="/admin/organizations" className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">{org.name} Workspace</h1>
          <p className="mt-1 text-sm text-gray-500">Super Admin access to this organization's data.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col items-center text-center group cursor-pointer hover:border-indigo-500 transition-colors">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <Users className="w-6 h-6" />
          </div>
          <h3 className="font-semibold text-gray-900">Members</h3>
          <p className="text-sm text-gray-500 mt-1">{org.memberships.length} active users</p>
        </div>
        
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col items-center text-center group cursor-pointer hover:border-indigo-500 transition-colors">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <Send className="w-6 h-6" />
          </div>
          <h3 className="font-semibold text-gray-900">Campaigns</h3>
          <p className="text-sm text-gray-500 mt-1">Manage campaigns</p>
        </div>
        
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col items-center text-center group cursor-pointer hover:border-indigo-500 transition-colors">
          <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <LayoutTemplate className="w-6 h-6" />
          </div>
          <h3 className="font-semibold text-gray-900">Templates</h3>
          <p className="text-sm text-gray-500 mt-1">Org specific templates</p>
        </div>
        
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col items-center text-center group cursor-pointer hover:border-indigo-500 transition-colors">
          <div className="w-12 h-12 rounded-xl bg-gray-50 text-gray-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <Settings className="w-6 h-6" />
          </div>
          <h3 className="font-semibold text-gray-900">Settings</h3>
          <p className="text-sm text-gray-500 mt-1">Org configuration</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-900">Recent Campaigns</h3>
          </div>
          <div className="divide-y divide-gray-100">
            {org.campaigns.map(camp => (
              <div key={camp.id} className="p-6 flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">{camp.campaignName}</h4>
                  <p className="text-sm text-gray-500 mt-0.5">{camp.subject}</p>
                </div>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  camp.status === 'SENT' ? 'bg-green-100 text-green-800' :
                  camp.status === 'DRAFT' ? 'bg-gray-100 text-gray-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {camp.status}
                </span>
              </div>
            ))}
            {org.campaigns.length === 0 && (
              <div className="p-8 text-center text-sm text-gray-500">No campaigns yet.</div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-900">Team Members</h3>
          </div>
          <div className="divide-y divide-gray-100">
            {org.memberships.map(m => (
              <div key={m.id} className="p-6 flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">{m.user.firstName} {m.user.lastName}</h4>
                  <p className="text-sm text-gray-500 mt-0.5">{m.user.email}</p>
                </div>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium ${
                  m.role === 'OWNER' ? 'bg-purple-100 text-purple-800' :
                  m.role === 'ADMIN' ? 'bg-indigo-100 text-indigo-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {m.role}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
