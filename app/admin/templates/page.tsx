import { db } from '@/lib/db'
import { requireSuperAdmin } from '@/lib/auth/organization-context'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { FileImage, Plus, Edit, Trash2 } from 'lucide-react'

export default async function AdminTemplatesPage() {
  const admin = await requireSuperAdmin()
  if (!admin) redirect('/dashboard')

  const templates = await db.template.findMany({
    where: { userId: null, organizationId: null },
    orderBy: { createdAt: 'desc' }
  })

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Public Templates</h1>
          <p className="mt-2 text-sm text-gray-500">Manage global templates available to all organizations.</p>
        </div>
        <Link 
          href="/admin/templates/new"
          className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          New Global Template
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {templates.map((template) => (
          <div key={template.id} className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm flex flex-col group">
            <div className="relative overflow-hidden bg-gray-50 border-b border-gray-100 rounded-t-2xl" style={{ height: 160 }}>
              {template.generation === 'LEGACY' && (
                <div className="absolute top-2 right-2 bg-red-100 text-red-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider z-10 shadow-sm">
                  Legacy
                </div>
              )}
              <iframe
                srcDoc={template.htmlContent}
                title={template.name}
                scrolling="no"
                style={{
                  width: '600px',
                  height: '800px',
                  transform: 'scale(0.333)',
                  transformOrigin: 'top center',
                  position: 'absolute',
                  left: '50%',
                  marginLeft: '-300px',
                  pointerEvents: 'none',
                  border: 'none',
                }}
              />
            </div>
            <div className="p-4 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium text-gray-900 truncate" title={template.name}>
                  {template.name}
                </h3>
              </div>
              <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-gray-100 text-gray-600 w-fit mb-3">
                {template.category}
              </span>
              <p className="text-xs text-gray-500 line-clamp-2 mb-4 flex-1">
                {template.description || 'No description provided.'}
              </p>
              <div className="flex gap-2">
                {template.generation === 'MODERN' ? (
                  <Link 
                    href={`/admin/templates/${template.id}/edit`}
                    className="flex-1 flex justify-center items-center gap-1.5 px-3 py-1.5 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 rounded-lg text-sm font-medium transition-colors"
                  >
                    <Edit className="w-4 h-4" /> Edit
                  </Link>
                ) : (
                  <button disabled className="flex-1 px-3 py-1.5 bg-gray-100 text-gray-400 rounded-lg text-sm font-medium cursor-not-allowed">
                    Read Only
                  </button>
                )}
                {template.generation === 'MODERN' && (
                  <button className="px-3 py-1.5 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg text-sm font-medium transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}

        {templates.length === 0 && (
          <div className="col-span-full py-12 bg-white rounded-2xl border border-gray-200 border-dashed text-center">
            <FileImage className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No public templates</h3>
            <p className="mt-1 text-sm text-gray-500">Get started by creating a new global template.</p>
          </div>
        )}
      </div>
    </div>
  )
}
