'use client'

import React, { useState, useEffect, Suspense, use } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Download, Mail, Contact, Search, X, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'

interface ContactData {
  id: string
  email: string
  firstName: string | null
  lastName: string | null
  phone: string | null
  createdAt: string
  customFields: Record<string, any> | null
}

interface ListData {
  id: string
  name: string
  description: string | null
  createdAt: string
  updatedAt: string
  organization: { id: string; name: string } | null
  user: { id: string; name: string; email: string }
  _count: { contacts: number }
}

function ContactListDetailClient({ listId }: { listId: string }) {
  const router = useRouter()
  const [list, setList] = useState<ListData | null>(null)
  const [contacts, setContacts] = useState<ContactData[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [isExporting, setIsExporting] = useState(false)
  const [showEmailModal, setShowEmailModal] = useState(false)
  const [emailInput, setEmailInput] = useState('')
  const [emailStatus, setEmailStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  useEffect(() => {
    fetchData()
  }, [listId])

  useEffect(() => {
    const delay = setTimeout(() => {
      fetchData()
    }, 300)
    return () => clearTimeout(delay)
  }, [search])

  async function fetchData() {
    try {
      const url = new URL(`/api/admin/contacts/${listId}`, window.location.origin)
      if (search) url.searchParams.set('search', search)
      
      const res = await fetch(url.toString())
      if (res.ok) {
        const data = await res.json()
        setList(data.list)
        setContacts(data.contacts)
      } else if (res.status === 404) {
        router.push('/admin/contacts')
      }
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  async function handleDirectDownload() {
    setIsExporting(true)
    try {
      window.location.href = `/api/admin/contacts/${listId}/export`
    } finally {
      setIsExporting(false)
    }
  }

  async function handleEmailExport(e: React.FormEvent) {
    e.preventDefault()
    if (!emailInput) return
    
    setEmailStatus('sending')
    try {
      const res = await fetch(`/api/admin/contacts/${listId}/email-export`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: emailInput })
      })
      if (res.ok) {
        setEmailStatus('success')
        setTimeout(() => {
          setShowEmailModal(false)
          setEmailStatus('idle')
          setEmailInput('')
        }, 2000)
      } else {
        setEmailStatus('error')
      }
    } catch (e) {
      console.error(e)
      setEmailStatus('error')
    }
  }

  if (loading && !list) {
    return <div className="p-8 max-w-7xl mx-auto flex items-center justify-center min-h-[50vh] text-gray-500">Loading contact list details...</div>
  }

  if (!list) return null

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      <Link href="/admin/contacts" className="inline-flex items-center text-sm text-gray-500 hover:text-indigo-600 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-1" />
        Back to Global Lists
      </Link>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">{list.name}</h1>
          <p className="text-sm text-gray-500 mt-1">
            {list.description || 'No description provided.'}
          </p>
        </div>
        
        <div className="flex gap-2">
          <button 
            onClick={handleDirectDownload}
            disabled={isExporting}
            className="inline-flex items-center px-4 py-2 bg-white border border-gray-200 text-gray-700 text-sm font-semibold rounded-xl hover:bg-gray-50 transition shadow-sm disabled:opacity-50"
          >
            <Download className="w-4 h-4 mr-2 text-gray-400" />
            Download CSV
          </button>
          <button 
            onClick={() => setShowEmailModal(true)}
            className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 transition shadow-sm"
          >
            <Mail className="w-4 h-4 mr-2" />
            Email CSV
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm flex flex-col">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Total Contacts</span>
          <span className="text-2xl font-bold text-gray-900 mt-1">{list._count.contacts}</span>
        </div>
        <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm flex flex-col">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Organization</span>
          <span className="text-sm font-medium text-gray-900 mt-2 truncate">{list.organization?.name || 'Global System'}</span>
        </div>
        <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm flex flex-col">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Created By</span>
          <span className="text-sm font-medium text-gray-900 mt-2 truncate">{list.user.name}</span>
          <span className="text-xs text-gray-500 truncate">{list.user.email}</span>
        </div>
        <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm flex flex-col">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Last Updated</span>
          <span className="text-sm font-medium text-gray-900 mt-2">{new Date(list.updatedAt).toLocaleDateString()}</span>
          <span className="text-xs text-gray-500">{new Date(list.updatedAt).toLocaleTimeString()}</span>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl p-4 flex flex-col sm:flex-row gap-4 items-center shadow-sm">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input 
            type="text" 
            placeholder="Search contacts by name or email..."
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
                <th className="px-6 py-4 font-medium">Contact</th>
                <th className="px-6 py-4 font-medium">Email</th>
                <th className="px-6 py-4 font-medium">Phone</th>
                <th className="px-6 py-4 font-medium">Added</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading && contacts.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-gray-500">Searching contacts...</td>
                </tr>
              ) : contacts.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                    <Contact className="w-8 h-8 mx-auto text-gray-300 mb-2" />
                    No contacts found
                  </td>
                </tr>
              ) : (
                contacts.map(contact => (
                  <tr key={contact.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">
                        {contact.firstName || contact.lastName ? `${contact.firstName || ''} ${contact.lastName || ''}`.trim() : 'Unknown'}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-gray-900">{contact.email}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-gray-500">{contact.phone || '-'}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {new Date(contact.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showEmailModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-xl border border-gray-200 space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="text-base font-bold text-gray-900">Email Contact List</h3>
              <button
                onClick={() => { setShowEmailModal(false); setEmailStatus('idle'); setEmailInput('') }}
                className="p-1 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {emailStatus === 'success' ? (
              <div className="flex flex-col items-center justify-center py-6 text-center">
                <CheckCircle2 className="w-12 h-12 text-green-500 mb-3" />
                <h4 className="text-lg font-semibold text-gray-900">Email Sent!</h4>
                <p className="text-sm text-gray-500 mt-1">The CSV file has been dispatched.</p>
              </div>
            ) : (
              <form onSubmit={handleEmailExport} className="space-y-4">
                <p className="text-sm text-gray-500 leading-relaxed">
                  Enter the email address where you would like to receive the exported CSV data for <strong>{list.name}</strong>.
                </p>
                
                <div>
                  <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wide mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="admin@example.com"
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 focus:outline-none transition"
                    autoFocus
                  />
                  {emailStatus === 'error' && (
                    <p className="text-xs text-red-600 mt-1">Failed to send email. Please try again.</p>
                  )}
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => { setShowEmailModal(false); setEmailStatus('idle'); setEmailInput('') }}
                    className="px-4 py-2 text-xs font-semibold text-gray-900 bg-gray-50 border border-gray-200 hover:bg-gray-100 rounded-xl transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={emailStatus === 'sending' || !emailInput}
                    className="px-4 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl transition shadow-sm"
                  >
                    {emailStatus === 'sending' ? 'Sending...' : 'Send Email'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default function AdminContactListDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  
  return (
    <Suspense fallback={<div className="p-8 text-gray-500">Loading...</div>}>
      <ContactListDetailClient listId={id} />
    </Suspense>
  )
}
