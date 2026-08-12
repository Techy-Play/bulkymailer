'use client'

import React, { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Send, Search } from 'lucide-react'

interface Campaign {
  id: string
  campaignName: string
  subject: string
  status: string
  createdAt: string
  organization: {
    id: string
    name: string
  }
  contactList: {
    name: string
    _count: { contacts: number }
  }
}

function CampaignsView() {
  const searchParams = useSearchParams()
  const orgId = searchParams.get('organizationId')
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('ALL')

  useEffect(() => {
    fetchCampaigns()
  }, [orgId, statusFilter])

  async function fetchCampaigns() {
    setLoading(true)
    try {
      const url = new URL('/api/admin/campaigns', window.location.origin)
      if (orgId) url.searchParams.set('organizationId', orgId)
      if (statusFilter !== 'ALL') url.searchParams.set('status', statusFilter)

      const res = await fetch(url.toString())
      if (res.ok) {
        const data = await res.json()
        setCampaigns(data || [])
      }
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  const filteredCampaigns = campaigns.filter(c => {
    const s = search.toLowerCase()
    return c.campaignName.toLowerCase().includes(s) || 
           c.subject.toLowerCase().includes(s) || 
           c.organization?.name?.toLowerCase().includes(s)
  })

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Global Campaigns</h1>
        <p className="text-sm text-gray-500">
          {orgId ? 'Viewing campaigns for a specific organization.' : 'Manage all campaigns across the platform.'}
        </p>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl p-4 flex flex-col sm:flex-row gap-4 items-center shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input 
            type="text" 
            placeholder="Search campaigns by name, subject, or org..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 focus:outline-none transition"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
        >
          <option value="ALL">All Statuses</option>
          <option value="DRAFT">Draft</option>
          <option value="SCHEDULED">Scheduled</option>
          <option value="SENT">Sent</option>
        </select>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 font-medium">Campaign</th>
                <th className="px-6 py-4 font-medium">Organization</th>
                <th className="px-6 py-4 font-medium">List Size</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Created</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">Loading campaigns...</td>
                </tr>
              ) : filteredCampaigns.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                    <Send className="w-8 h-8 mx-auto text-gray-300 mb-2" />
                    No campaigns found
                  </td>
                </tr>
              ) : (
                filteredCampaigns.map(camp => (
                  <tr key={camp.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{camp.campaignName}</div>
                      <div className="text-xs mt-0.5">{camp.subject}</div>
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {camp.organization?.name || 'Unknown Org'}
                    </td>
                    <td className="px-6 py-4">
                      {camp.contactList?._count?.contacts || 0} contacts
                      <div className="text-xs text-gray-400">{camp.contactList?.name || 'No list'}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        camp.status === 'SENT' ? 'bg-green-100 text-green-800' :
                        camp.status === 'DRAFT' ? 'bg-gray-100 text-gray-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {camp.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {new Date(camp.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default function AdminCampaignsPage() {
  return (
    <Suspense fallback={<div className="p-8 text-gray-500">Loading...</div>}>
      <CampaignsView />
    </Suspense>
  )
}
