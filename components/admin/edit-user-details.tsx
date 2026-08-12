'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Edit2, Check, X } from 'lucide-react'

export function EditUserDetails({ user }: { user: any }) {
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)
  const [form, setForm] = useState({
    firstName: user.firstName || '',
    lastName: user.lastName || '',
    email: user.email || '',
  })
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async () => {
    setIsSaving(true)
    try {
      const res = await fetch(`/api/admin/users/${user.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('Failed to update details')
      toast.success('User details updated successfully')
      setIsEditing(false)
      router.refresh()
    } catch (e: any) {
      toast.error(e.message)
    } finally {
      setIsSaving(false)
    }
  }

  if (!isEditing) {
    return (
      <div className="relative group">
        <h4 className="text-2xl font-bold text-gray-900 pr-8">{user.firstName} {user.lastName}</h4>
        <p className="text-gray-500">{user.email}</p>
        <button
          onClick={() => setIsEditing(true)}
          className="absolute top-0 right-0 p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg opacity-0 group-hover:opacity-100 transition-all"
          title="Edit Details"
        >
          <Edit2 className="w-4 h-4" />
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-3 bg-gray-50 p-4 rounded-xl border border-gray-200">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">First Name</label>
          <input
            type="text"
            value={form.firstName}
            onChange={e => setForm({ ...form, firstName: e.target.value })}
            className="w-full px-3 py-1.5 text-sm border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Last Name</label>
          <input
            type="text"
            value={form.lastName}
            onChange={e => setForm({ ...form, lastName: e.target.value })}
            className="w-full px-3 py-1.5 text-sm border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
      </div>
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">Email</label>
        <input
          type="email"
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
          className="w-full px-3 py-1.5 text-sm border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div className="flex gap-2 pt-2">
        <button
          disabled={isSaving}
          onClick={handleSave}
          className="flex-1 inline-flex justify-center items-center gap-1.5 px-3 py-1.5 bg-indigo-600 text-white text-xs font-medium rounded-lg hover:bg-indigo-700 disabled:opacity-50"
        >
          <Check className="w-3.5 h-3.5" /> Save
        </button>
        <button
          disabled={isSaving}
          onClick={() => {
            setIsEditing(false)
            setForm({ firstName: user.firstName || '', lastName: user.lastName || '', email: user.email || '' })
          }}
          className="flex-1 inline-flex justify-center items-center gap-1.5 px-3 py-1.5 bg-white text-gray-700 border border-gray-300 text-xs font-medium rounded-lg hover:bg-gray-50 disabled:opacity-50"
        >
          <X className="w-3.5 h-3.5" /> Cancel
        </button>
      </div>
    </div>
  )
}
