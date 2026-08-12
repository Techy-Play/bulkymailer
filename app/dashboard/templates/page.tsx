'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { MoreHorizontal, Search, FileText, X, Check, SearchX } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface Template {
  id: string
  name: string
  category: string
  htmlContent: string
  userId: string | null
  createdAt: string
  updatedAt?: string
  description?: string
}

function relativeTime(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime()
  const days = Math.floor(diff / 86400000)
  if (days === 0) return 'Today'
  if (days === 1) return 'Yesterday'
  if (days < 7) return `${days}d ago`
  if (days < 30) return `${Math.floor(days / 7)}w ago`
  return `${Math.floor(days / 30)}mo ago`
}

export default function TemplatesPage() {
  const router = useRouter()
  const [templates, setTemplates] = useState<Template[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [activeTab, setActiveTab] = useState<'MY_TEMPLATES' | 'PUBLIC'>('MY_TEMPLATES')
  const [activeCategory, setActiveCategory] = useState<string>('ALL')
  
  const [previewTemplate, setPreviewTemplate] = useState<Template | null>(null)
  const [duplicating, setDuplicating] = useState<string | null>(null)
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null)
  const [confirmInput, setConfirmInput] = useState('')
  const [openMenuId, setOpenMenuId] = useState<string | null>(null)
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'mobile'>('desktop')

  useEffect(() => {
    fetchTemplates()
  }, [])

  useEffect(() => {
    if (!openMenuId) return

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.closest('[data-template-menu]')) return
      setOpenMenuId(null)
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [openMenuId])

  async function fetchTemplates() {
    setLoading(true)
    try {
      const res = await fetch('/api/templates')
      if (res.ok) {
        const data = await res.json()
        setTemplates(data.templates || [])
      }
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  async function handleDuplicate(id: string) {
    setDuplicating(id)
    try {
      const res = await fetch(`/api/templates/${id}/duplicate`, { method: 'POST' })
      if (res.ok) {
        const data = await res.json()
        // Add the duplicate to templates
        setTemplates(prev => [data.template, ...prev])
        // If it was a public template, redirect to editor
        const sourceTemplate = templates.find(t => t.id === id)
        if (sourceTemplate?.userId === null) {
          router.push(`/dashboard/templates/${data.template.id}/edit`)
        }
      }
    } catch (e) {
      console.error(e)
    } finally {
      setDuplicating(null)
      setOpenMenuId(null)
    }
  }

  async function handleDelete(id: string) {
    try {
      const res = await fetch(`/api/templates/${id}`, { method: 'DELETE' })
      if (res.ok) {
        setTemplates(prev => prev.filter(t => t.id !== id))
      }
    } catch (e) {
      console.error(e)
    } finally {
      setConfirmDeleteId(null)
    }
  }

  const categories = ['ALL', 'NEWSLETTER', 'PROMOTIONAL', 'PERSONALIZED', 'GENERAL', 'TRANSACTIONAL', 'WELCOME', 'PRODUCT', 'EVENT', 'E_COMMERCE', 'SECURITY', 'ENGAGEMENT', 'SEASONAL']

  // Split into personal and public
  const currentViewTemplates = activeTab === 'MY_TEMPLATES' 
    ? templates.filter(t => t.userId !== null) 
    : templates.filter(t => t.userId === null)

  const filteredTemplates = currentViewTemplates.filter(t => {
    const s = search.toLowerCase()
    const matchesSearch = t.name.toLowerCase().includes(s) || (t.description?.toLowerCase().includes(s)) || (t.category.toLowerCase().includes(s))
    const matchesCategory = activeCategory === 'ALL' || t.category === activeCategory
    return matchesSearch && matchesCategory
  })

  // Feature templates: push featured ones to top in Public Templates tab
  const featuredNames = ['Product Launch', 'Weekly Newsletter', 'Welcome Email', 'Black Friday Sale', 'Order Confirmation']
  const sortedTemplates = activeTab === 'PUBLIC' 
    ? [...filteredTemplates].sort((a, b) => {
        const aFeatured = featuredNames.includes(a.name)
        const bFeatured = featuredNames.includes(b.name)
        if (aFeatured && !bFeatured) return -1
        if (!aFeatured && bFeatured) return 1
        return 0
      })
    : filteredTemplates

  const renderCard = (template: Template) => {
    const isMenuOpen = openMenuId === template.id
    const isPublic = template.userId === null
    const isFeatured = isPublic && featuredNames.includes(template.name)

    return (
      <div 
        key={template.id} 
        className={`group bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md hover:border-indigo-200 transition-all flex flex-col relative ${isMenuOpen ? 'z-30 ring-2 ring-indigo-500/20' : 'z-0'}`}
      >
        <div className="relative overflow-hidden bg-gray-50 border-b border-gray-100 rounded-t-2xl" style={{ height: 160 }}>
          <iframe
            srcDoc={template.htmlContent}
            title={template.name}
            scrolling="no"
            style={{
              width: '600px',
              height: '800px',
              transform: 'scale(0.333)',
              transformOrigin: 'top left',
              pointerEvents: 'none',
              border: 'none',
            }}
          />
          
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
            <button onClick={() => setPreviewTemplate(template)} className="px-3 py-1.5 bg-white text-[#111827] text-xs font-semibold rounded-lg shadow hover:bg-gray-50 transition">Preview</button>
            {!isPublic ? (
              <Link href={`/dashboard/templates/${template.id}/edit`} className="px-3 py-1.5 bg-indigo-600 text-white text-xs font-semibold rounded-lg shadow hover:bg-indigo-700 transition">Edit</Link>
            ) : (
              <button onClick={() => handleDuplicate(template.id)} disabled={duplicating === template.id} className="px-3 py-1.5 bg-indigo-600 text-white text-xs font-semibold rounded-lg shadow hover:bg-indigo-700 transition disabled:opacity-50">
                {duplicating === template.id ? 'Copying...' : 'Use Template'}
              </button>
            )}
          </div>

          {isFeatured && (
            <span className="absolute top-2 right-2 px-2 py-0.5 bg-yellow-400 text-yellow-900 text-[10px] font-bold rounded-full shadow-sm">Featured</span>
          )}
        </div>

        <div className="p-3 flex-1 flex flex-col justify-center relative">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <p className="text-sm font-semibold text-[#111827] truncate">{template.name}</p>
              <p className="text-xs text-[#6B7280] mt-0.5">{template.category.replace('_', ' ')} · {isPublic ? 'System' : relativeTime(template.createdAt)}</p>
              {template.description && (
                <p className="text-xs text-[#6B7280] mt-1 truncate">{template.description}</p>
              )}
            </div>
            
            <div className="relative flex-shrink-0" data-template-menu>
              <button 
                onClick={(e) => { 
                  e.stopPropagation(); 
                  e.preventDefault();
                  setOpenMenuId(isMenuOpen ? null : template.id); 
                }}
                className={`p-1.5 rounded-lg text-gray-400 hover:text-[#111827] hover:bg-gray-100 transition ${isMenuOpen ? 'bg-gray-100 text-[#111827]' : ''}`}
                title="More actions"
              >
                <MoreHorizontal className="w-5 h-5" />
              </button>
              {isMenuOpen && (
                <div 
                  className="absolute right-0 top-full mt-1.5 w-48 bg-white border border-gray-200 rounded-xl shadow-xl py-1 z-50 animate-in fade-in zoom-in-95 duration-100" 
                  onClick={e => e.stopPropagation()}
                >
                  <button onClick={() => { setPreviewTemplate(template); setOpenMenuId(null); }} className="w-full text-left px-4 py-2 text-xs font-medium text-[#111827] hover:bg-gray-50 transition">
                    Preview
                  </button>
                  {!isPublic && (
                    <Link href={`/dashboard/templates/${template.id}/edit`} className="block w-full text-left px-4 py-2 text-xs font-medium text-[#111827] hover:bg-gray-50 transition">
                      Edit Template
                    </Link>
                  )}
                  <button onClick={() => handleDuplicate(template.id)} disabled={duplicating === template.id} className="w-full text-left px-4 py-2 text-xs font-medium text-[#111827] hover:bg-gray-50 disabled:opacity-50 transition">
                    {duplicating === template.id ? 'Processing...' : isPublic ? 'Use Template' : 'Duplicate'}
                  </button>
                  {!isPublic && (
                    <>
                      <div className="border-t border-gray-100 my-1"></div>
                      <button onClick={() => { setConfirmDeleteId(template.id); setConfirmInput(''); setOpenMenuId(null); }} className="w-full text-left px-4 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 transition">
                        Delete Template
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#111827]">Templates</h1>
        <Link href="/dashboard/templates/new" className="px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 transition shadow-sm">
          + New Template
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-xl w-fit">
        <button
          onClick={() => { setActiveTab('MY_TEMPLATES'); setActiveCategory('ALL'); }}
          className={`px-6 py-2 text-sm font-semibold rounded-lg transition-colors ${activeTab === 'MY_TEMPLATES' ? 'bg-white text-[#111827] shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
        >
          My Templates
        </button>
        <button
          onClick={() => { setActiveTab('PUBLIC'); setActiveCategory('ALL'); }}
          className={`px-6 py-2 text-sm font-semibold rounded-lg transition-colors ${activeTab === 'PUBLIC' ? 'bg-white text-[#111827] shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
        >
          Public Templates
        </button>
      </div>

      {/* Toolbar */}
      <div className="bg-white border border-gray-200 rounded-2xl p-4 flex flex-col sm:flex-row gap-4 items-center shadow-sm">
        {/* Search */}
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7280]" />
          <input 
            type="text" 
            placeholder="Search templates..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-[#111827] focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 focus:outline-none transition"
          />
        </div>
        
        {/* Category Tabs */}
        <div className="flex gap-2 overflow-x-auto w-full [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`whitespace-nowrap px-4 py-2 text-sm font-medium rounded-xl transition ${
                activeCategory === cat
                  ? 'bg-indigo-50 text-indigo-700'
                  : 'text-[#6B7280] hover:bg-gray-50 hover:text-[#111827]'
              }`}
            >
              {cat === 'ALL' ? 'All' : cat.replace('_', ' ').charAt(0) + cat.replace('_', ' ').slice(1).toLowerCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-2xl animate-pulse h-56"></div>
          ))}
        </div>
      ) : sortedTemplates.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {sortedTemplates.map(renderCard)}
        </div>
      ) : (
        <div className="py-24 flex flex-col items-center justify-center bg-white border border-gray-200 rounded-2xl shadow-sm">
          <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mb-4 border border-gray-100">
            {search || activeCategory !== 'ALL' ? <SearchX className="w-8 h-8 text-[#6B7280]" /> : <FileText className="w-8 h-8 text-[#6B7280]" />}
          </div>
          <h3 className="text-lg font-bold text-[#111827] mb-2">No templates found</h3>
          <p className="text-sm text-[#6B7280] mb-6">
            {search || activeCategory !== 'ALL' 
              ? 'Try adjusting your filters or search term' 
              : activeTab === 'MY_TEMPLATES' 
                ? 'Create your first email template to get started' 
                : 'No public templates available'}
          </p>
          {activeTab === 'MY_TEMPLATES' && !(search || activeCategory !== 'ALL') && (
            <Link href="/dashboard/templates/new" className="px-5 py-2.5 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 transition shadow-sm">
              Create your first template
            </Link>
          )}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {confirmDeleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#111827]/40 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-xl border border-gray-200 space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="text-base font-bold text-[#111827]">Delete Template</h3>
              <button
                onClick={() => { setConfirmDeleteId(null); setConfirmInput(''); }}
                className="p-1 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <p className="text-xs text-[#6B7280] leading-relaxed">
              This action cannot be undone. To permanently delete this template, please type <span className="font-bold text-red-600 font-mono bg-red-50 px-1.5 py-0.5 rounded border border-red-100">confirm</span> in the box below.
            </p>

            <div>
              <label className="block text-[11px] font-bold text-[#6B7280] uppercase tracking-wide mb-1">
                Confirmation *
              </label>
              <input
                type="text"
                value={confirmInput}
                onChange={(e) => setConfirmInput(e.target.value)}
                placeholder="Type 'confirm' to enable delete"
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-[#111827] focus:ring-2 focus:ring-red-500/30 focus:border-red-400 focus:outline-none transition font-mono"
                autoFocus
              />
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => { setConfirmDeleteId(null); setConfirmInput(''); }}
                className="px-4 py-2 text-xs font-semibold text-[#111827] bg-gray-50 border border-gray-200 hover:bg-gray-100 rounded-xl transition"
              >
                Cancel
              </button>
              <button
                disabled={confirmInput.trim().toLowerCase() !== 'confirm'}
                onClick={() => {
                  handleDelete(confirmDeleteId);
                  setConfirmInput('');
                }}
                className="px-4 py-2 text-xs font-bold text-white bg-red-600 hover:bg-red-700 disabled:opacity-40 disabled:cursor-not-allowed rounded-xl transition shadow-sm"
              >
                Delete Template
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {previewTemplate && (
        <div className="fixed inset-0 z-50 bg-[#F8FAFC] flex flex-col">
          <div className="flex items-center justify-between p-4 bg-white border-b border-gray-200">
            <div>
              <h3 className="font-bold text-[#111827]">{previewTemplate.name}</h3>
              <p className="text-sm text-[#6B7280]">{previewTemplate.category}</p>
            </div>
            
            <div className="flex items-center gap-1 bg-gray-50 p-1 rounded-xl border border-gray-200">
              <button 
                onClick={() => setPreviewDevice('desktop')}
                className={`px-3 py-1.5 text-sm font-medium rounded-lg transition ${previewDevice === 'desktop' ? 'bg-white text-[#111827] shadow-sm' : 'text-[#6B7280] hover:text-[#111827]'}`}
              >
                Desktop
              </button>
              <button 
                onClick={() => setPreviewDevice('mobile')}
                className={`px-3 py-1.5 text-sm font-medium rounded-lg transition ${previewDevice === 'mobile' ? 'bg-white text-[#111827] shadow-sm' : 'text-[#6B7280] hover:text-[#111827]'}`}
              >
                Mobile
              </button>
            </div>

              <div className="flex items-center gap-3">
                {previewTemplate.userId !== null ? (
                  <>
                    <Link href={`/dashboard/campaigns/new?templateId=${previewTemplate.id}`} className="px-4 py-2 bg-white border border-indigo-200 text-indigo-700 text-sm font-semibold rounded-xl transition shadow-sm hover:bg-indigo-50">
                      Create Campaign
                    </Link>
                    <Link href={`/dashboard/templates/${previewTemplate.id}/edit`} className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-xl transition shadow-sm">
                      Edit Template
                    </Link>
                  </>
                ) : (
                  <button onClick={() => handleDuplicate(previewTemplate.id)} disabled={duplicating === previewTemplate.id} className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-sm font-semibold rounded-xl transition shadow-sm">
                    {duplicating === previewTemplate.id ? 'Processing...' : 'Use Template'}
                  </button>
                )}
                <button onClick={() => setPreviewTemplate(null)} className="p-2 ml-2 text-[#6B7280] hover:text-[#111827] hover:bg-gray-100 rounded-lg transition">
                  <X className="w-5 h-5" />
                </button>
              </div>
          </div>
          <div className="flex-1 bg-gray-100 overflow-auto flex justify-center p-8">
            <div 
              className={`bg-white shadow-lg transition-all duration-300 ${previewDevice === 'mobile' ? 'w-[375px] h-[812px] rounded-[2rem] border-8 border-gray-900 overflow-hidden' : 'w-[800px] min-h-full rounded-none'}`}
            >
              <iframe
                srcDoc={previewTemplate.htmlContent}
                title={previewTemplate.name}
                className="w-full h-full border-0"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
