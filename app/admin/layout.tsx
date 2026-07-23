import { redirect } from 'next/navigation'
import { getSessionUser } from '@/lib/auth'
import { AdminSidebar } from '@/components/admin/sidebar'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await getSessionUser()
  if (!user || user.role !== 'ADMIN') redirect('/dashboard')
  
  return (
    <div className="flex min-h-screen bg-[#FAFAFA]">
      <AdminSidebar adminName={`${user.firstName} ${user.lastName}`} />
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  )
}
