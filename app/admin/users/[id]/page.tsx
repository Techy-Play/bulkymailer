import { db } from '@/lib/db'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { UserActions } from '@/components/admin/user-actions'
import { EditUserDetails } from '@/components/admin/edit-user-details'

export default async function AdminUserDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  
  const user = await db.user.findUnique({
    where: { id },
    include: { organization: true },
  })

  if (!user) notFound()

  const initials = `${user.firstName?.[0] || ''}${user.lastName?.[0] || ''}`.toUpperCase()

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div>
        <Link href="/admin/users" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 mb-4 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Users
        </Link>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">User Details</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* User Profile Card */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">Profile Information</h3>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                user.status === 'ACTIVE' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' :
                user.status === 'PENDING' ? 'bg-amber-50 text-amber-700 border border-amber-100' :
                'bg-red-50 text-red-700 border border-red-100'
              }`}>
                {user.status}
              </span>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-6 mb-8">
                <div className="w-20 h-20 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 text-2xl font-bold shrink-0 border border-indigo-100">
                  {initials}
                </div>
                <div>
                  <EditUserDetails user={user} />
                  <div className="mt-2 flex gap-2">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium ${
                      user.role === 'ADMIN' ? 'bg-indigo-50 text-indigo-700' :
                      user.role === 'OWNER' ? 'bg-purple-50 text-purple-700' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                      {user.role}
                    </span>
                    {user.emailVerified && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-emerald-50 text-emerald-700">
                        Email Verified
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Joined</dt>
                  <dd className="mt-1 text-sm text-gray-900">{new Date(user.createdAt).toLocaleString()}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Last Login</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {user.lastLoginAt ? new Date(user.lastLoginAt).toLocaleString() : 'Never'}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Onboarding Status</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {user.isOnboardingCompleted ? 'Completed' : 'Incomplete'}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Subscription Plan</dt>
                  <dd className="mt-1 text-sm text-gray-900 capitalize">{user.subscriptionType}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Monthly Email Limit</dt>
                  <dd className="mt-1 flex items-center gap-2">
                    <span className="text-sm text-gray-900">
                      {user.emailsSentThisMonth} / {user.subscriptionType === 'free' ? 100 : 'Unlimited'} used
                    </span>
                    <div className="flex-1 max-w-[100px] h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${user.emailsSentThisMonth >= 100 ? 'bg-red-500' : 'bg-indigo-500'}`} 
                        style={{ width: `${Math.min((user.emailsSentThisMonth / 100) * 100, 100)}%` }}
                      />
                    </div>
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          {/* Organization Card */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-200 bg-gray-50">
              <h3 className="text-lg font-semibold text-gray-900">Organization Details</h3>
            </div>
            <div className="p-6">
              {user.organization ? (
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Company Name</dt>
                    <dd className="mt-1 text-sm text-gray-900">{user.organization.name || 'Not provided'}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Website</dt>
                    <dd className="mt-1 text-sm text-gray-900">{user.organization.website || 'Not provided'}</dd>
                  </div>
                  <div className="sm:col-span-2">
                    <dt className="text-sm font-medium text-gray-500">Address</dt>
                    <dd className="mt-1 text-sm text-gray-900">{user.organization.addressLine1 || 'Not provided'}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Team Size</dt>
                    <dd className="mt-1 text-sm text-gray-900">{user.organization.teamSize || 'Not specified'}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Contact List Range</dt>
                    <dd className="mt-1 text-sm text-gray-900">{user.organization.contactRange || 'Not specified'}</dd>
                  </div>
                </dl>
              ) : (
                <p className="text-gray-500 italic text-sm">This user is not associated with an organization.</p>
              )}
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <UserActions userId={user.id} currentRole={user.role as any} currentStatus={user.status as any} />
        </div>
      </div>
    </div>
  )
}
