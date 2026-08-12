'use client'

import React, { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { ShieldAlert, Search } from 'lucide-react'

interface AuditLog {
  id: string
  action: string
  actorUserId: string
  targetUserId: string | null
  organizationId: string | null
  resourceType: string
  resourceId: string | null
  metadata: any
  createdAt: string
}

function AuditLogsView() {
  const searchParams = useSearchParams()
  const orgId = searchParams.get('organizationId')
  const [logs, setLogs] = useState<AuditLog[]>([])
  const [loading, setLoading] = useState(true)
  const [actionFilter, setActionFilter] = useState('ALL')
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    fetchLogs(page)
  }, [orgId, actionFilter, page])

  async function fetchLogs(pageIndex: number) {
    setLoading(true)
    try {
      const url = new URL('/api/admin/audit-logs', window.location.origin)
      if (orgId) url.searchParams.set('organizationId', orgId)
      if (actionFilter !== 'ALL') url.searchParams.set('action', actionFilter)
      url.searchParams.set('page', pageIndex.toString())
      url.searchParams.set('limit', '50')

      const res = await fetch(url.toString())
      if (res.ok) {
        const data = await res.json()
        setLogs(data.logs || [])
        setTotal(data.total || 0)
      }
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  const uniqueActions = [
    'ALL',
    'USER_SUSPENDED',
    'USER_UPDATED',
    'USER_DELETED',
    'ORGANIZATION_SWITCHED',
    'LOGIN_SUCCESS',
    'LOGIN_FAILED',
    'CAMPAIGN_SENT'
  ] // Placeholder for common actions, but the API handles exact string matching

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">System Audit Logs</h1>
        <p className="text-sm text-gray-500">
          {orgId ? 'Viewing security logs for a specific organization.' : 'Immutable ledger of critical actions across the platform.'}
        </p>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl p-4 flex flex-col sm:flex-row gap-4 items-center shadow-sm">
        <select
          value={actionFilter}
          onChange={(e) => { setActionFilter(e.target.value); setPage(1); }}
          className="w-full sm:w-auto px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
        >
          {uniqueActions.map(a => (
            <option key={a} value={a}>{a === 'ALL' ? 'All Actions' : a.replace(/_/g, ' ')}</option>
          ))}
        </select>
        <div className="flex-1 text-sm text-gray-500 text-right">
          Total Logs: {total}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 font-medium">Timestamp</th>
                <th className="px-6 py-4 font-medium">Action</th>
                <th className="px-6 py-4 font-medium">Actor User ID</th>
                <th className="px-6 py-4 font-medium">Resource Type</th>
                <th className="px-6 py-4 font-medium">Resource ID</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-mono text-xs">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500 font-sans">Loading audit logs...</td>
                </tr>
              ) : logs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500 font-sans">
                    <ShieldAlert className="w-8 h-8 mx-auto text-gray-300 mb-2" />
                    No audit logs found
                  </td>
                </tr>
              ) : (
                logs.map(log => (
                  <tr key={log.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      {new Date(log.createdAt).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {log.action}
                    </td>
                    <td className="px-6 py-4 text-indigo-600">
                      {log.actorUserId}
                    </td>
                    <td className="px-6 py-4">
                      {log.resourceType}
                    </td>
                    <td className="px-6 py-4">
                      {log.resourceId || '-'}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination Controls */}
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex items-center justify-between">
          <button 
            disabled={page === 1 || loading}
            onClick={() => setPage(p => p - 1)}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-sm text-gray-500">Page {page}</span>
          <button 
            disabled={logs.length < 50 || loading}
            onClick={() => setPage(p => p + 1)}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}

export default function AdminAuditLogsPage() {
  return (
    <Suspense fallback={<div className="p-8 text-gray-500">Loading...</div>}>
      <AuditLogsView />
    </Suspense>
  )
}
