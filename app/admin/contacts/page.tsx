'use client'

import React, { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Contact, Search, ChevronRight } from 'lucide-react'

interface ContactList {
  id: string
  name: string
  description: string | null
  createdAt: string
  updatedAt: string
  organization: {
    id: string
    name: string
  } | null
  user: {
    id: string
    name: string
    email: string
  }
  _count: {
    contacts: number
  }
}

function ContactsView() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const orgId = searchParams.get('organizationId')
  const [lists, setLists] = useState<ContactList[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetchLists()
  }, [orgId])

  async function fetchLists() {
    setLoading(true)
    try {
      const url = new URL('/api/admin/contacts', window.location.origin)
      if (orgId) url.searchParams.set('organizationId', orgId)

      const res = await fetch(url.toString())
      if (res.ok) {
        const data = await res.json()
        setLists(data || [])
      }
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  const filteredLists = lists.filter(l => {
    const s = search.toLowerCase()
    return l.name.toLowerCase().includes(s) || 
           (l.description && l.description.toLowerCase().includes(s)) ||
           l.organization?.name?.toLowerCase().includes(s)
  })

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Global Contact Lists</h1>
        <p className="text-sm text-gray-500">
          {orgId ? 'Viewing contact lists for a specific organization.' : 'Manage all contact lists across the platform.'}
        </p>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl p-4 flex flex-col sm:flex-row gap-4 items-center shadow-sm">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input 
            type="text" 
            placeholder="Search lists by name, description, or org..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 focus:outline-none transition"
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 font-medium">List Name</th>
                <th className="px-6 py-4 font-medium">Organization</th>
                <th className="px-6 py-4 font-medium">Created By</th>
                <th className="px-6 py-4 font-medium">Total Contacts</th>
                <th className="px-6 py-4 font-medium">Last Updated</th>
                <th className="px-6 py-4 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-gray-500">Loading lists...</td>
                </tr>
              ) : filteredLists.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                    <Contact className="w-8 h-8 mx-auto text-gray-300 mb-2" />
                    No contact lists found
                  </td>
                </tr>
              ) : (
                filteredLists.map(list => (
                  <tr 
                    key={list.id} 
                    onClick={() => router.push(`/admin/contacts/${list.id}`)}
                    className="hover:bg-gray-50 transition-colors cursor-pointer group"
                  >
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{list.name}</div>
                      {list.description && <div className="text-xs mt-0.5">{list.description}</div>}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {list.organization?.name || 'Global System'}
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{list.user.name}</div>
                      <div className="text-xs text-gray-500">{list.user.email}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
                        {list._count.contacts} contacts
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {new Date(list.updatedAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                       <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-indigo-600 ml-auto transition-colors" />
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

export default function AdminContactsPage() {
  return (
    <Suspense fallback={<div className="p-8 text-gray-500">Loading...</div>}>
      <ContactsView />
    </Suspense>
  )
}
