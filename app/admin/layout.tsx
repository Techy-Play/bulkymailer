import { redirect } from 'next/navigation'
import { requireSuperAdmin } from '@/lib/auth/organization-context'
import { AdminSidebar } from '@/components/admin/sidebar'
import { AdminHeader } from '@/components/admin/header'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await requireSuperAdmin()
  if (!user) redirect('/dashboard')
  
  return (
    <div className="flex min-h-screen bg-[#FAFAFA]">
      <AdminSidebar adminName={`${user.firstName} ${user.lastName}`} />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <AdminHeader />
        <main className="flex-1 overflow-auto relative z-0 focus:outline-none">
          {children}
        </main>
      </div>
    </div>
  )
}
