'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { KeyRound, Shield, Ban, CheckCircle2, Trash2, RefreshCw } from 'lucide-react'
import { Role, UserStatus } from '@/app/generated/prisma/enums'

type UserActionsProps = {
  userId: string
  currentRole: Role
  currentStatus: UserStatus
}

export function UserActions({ userId, currentRole, currentStatus }: UserActionsProps) {
  const router = useRouter()
  const [isUpdating, setIsUpdating] = useState(false)

  const updateRole = async (role: string) => {
    setIsUpdating(true)
    try {
      const res = await fetch(`/api/admin/users/${userId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role }),
      })
      if (!res.ok) throw new Error('Failed to update role')
      toast.success('Role updated successfully')
      router.refresh()
    } catch (e: any) {
      toast.error(e.message)
    } finally {
      setIsUpdating(false)
    }
  }

  const updateStatus = async (status: string) => {
    setIsUpdating(true)
    try {
      const res = await fetch(`/api/admin/users/${userId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })
      if (!res.ok) throw new Error('Failed to update status')
      toast.success('Status updated successfully')
      router.refresh()
    } catch (e: any) {
      toast.error(e.message)
    } finally {
      setIsUpdating(false)
    }
  }

  const resetPassword = async () => {
    if (!confirm('Are you sure you want to reset this user\'s password?')) return
    setIsUpdating(true)
    try {
      const res = await fetch(`/api/admin/users/${userId}/reset-password`, { method: 'POST' })
      if (!res.ok) throw new Error('Failed to reset password')
      const data = await res.json()
      toast.success(`Password reset. New password: ${data.password}`, { duration: 10000 })
    } catch (e: any) {
      toast.error(e.message)
    } finally {
      setIsUpdating(false)
    }
  }

  const resetMonthlyLimit = async () => {
    if (!confirm('Are you sure you want to reset this user\'s monthly email limits?')) return
    setIsUpdating(true)
    try {
      const res = await fetch(`/api/admin/users/${userId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resetMonthlyLimit: true }),
      })
      if (!res.ok) throw new Error('Failed to reset monthly limits')
      toast.success('Monthly limits reset successfully')
      router.refresh()
    } catch (e: any) {
      toast.error(e.message)
    } finally {
      setIsUpdating(false)
    }
  }

  const deleteUser = async () => {
    if (!confirm('Are you sure you want to permanently delete this user? This cannot be undone.')) return
    setIsUpdating(true)
    try {
      const res = await fetch(`/api/admin/users/${userId}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Failed to delete user')
      toast.success('User deleted')
      router.push('/admin/users')
    } catch (e: any) {
      toast.error(e.message)
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-6">
      <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-100 pb-4">Actions</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Change Role</label>
          <select
            disabled={isUpdating}
            value={currentRole}
            onChange={(e) => updateRole(e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-200 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-xl border"
          >
            <option value="MEMBER">Member</option>
            <option value="EDITOR">Editor</option>
            <option value="ADMIN">Admin</option>
            <option value="OWNER">Owner</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Change Status</label>
          <div className="flex gap-2">
            <button
              disabled={isUpdating || currentStatus === 'ACTIVE'}
              onClick={() => updateStatus('ACTIVE')}
              className="flex-1 inline-flex justify-center items-center gap-2 px-3 py-2 border border-emerald-200 shadow-sm text-sm leading-4 font-medium rounded-lg text-emerald-700 bg-emerald-50 hover:bg-emerald-100 disabled:opacity-50 transition-colors"
            >
              <CheckCircle2 className="w-4 h-4" />
              Active
            </button>
            <button
              disabled={isUpdating || currentStatus === 'SUSPENDED'}
              onClick={() => updateStatus('SUSPENDED')}
              className="flex-1 inline-flex justify-center items-center gap-2 px-3 py-2 border border-red-200 shadow-sm text-sm leading-4 font-medium rounded-lg text-red-700 bg-red-50 hover:bg-red-100 disabled:opacity-50 transition-colors"
            >
              <Ban className="w-4 h-4" />
              Suspend
            </button>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-100 space-y-3">
          <button
            disabled={isUpdating}
            onClick={resetMonthlyLimit}
            className="w-full inline-flex justify-center items-center gap-2 px-4 py-2 border border-gray-200 shadow-sm text-sm font-medium rounded-xl text-gray-700 bg-white hover:bg-gray-50 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Reset Monthly Limits
          </button>
          <button
            disabled={isUpdating}
            onClick={resetPassword}
            className="w-full inline-flex justify-center items-center gap-2 px-4 py-2 border border-gray-200 shadow-sm text-sm font-medium rounded-xl text-gray-700 bg-white hover:bg-gray-50 transition-colors"
          >
            <KeyRound className="w-4 h-4" />
            Reset Password
          </button>
          <button
            disabled={isUpdating}
            onClick={deleteUser}
            className="w-full inline-flex justify-center items-center gap-2 px-4 py-2 border border-red-200 shadow-sm text-sm font-medium rounded-xl text-red-700 bg-white hover:bg-red-50 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            Delete User
          </button>
        </div>
      </div>
    </div>
  )
}
