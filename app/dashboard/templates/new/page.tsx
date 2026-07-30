'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, FilePlus, Copy, Search, X } from 'lucide-react'
import { LoadingButton } from '@/components/ui/loading-button'

interface Template {
  id: string
  name: string
  category: string
  htmlContent: string
  userId: string | null
}

export default function NewTemplatePage() {
  const router = useRouter()
  const [creatingBlank, setCreatingBlank] = useState(false)
  const [showPicker, setShowPicker] = useState(false)
  
  // Picker state
  const [templates, setTemplates] = useState<Template[]>([])
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('ALL')
  const [duplicatingId, setDuplicatingId] = useState<string | null>(null)

  useEffect(() => {
    if (showPicker && templates.length === 0) {
      fetchTemplates()
    }
  }, [showPicker])

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

  async function handleStartBlank() {
    setCreatingBlank(true)
    try {
      const res = await fetch('/api/templates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Untitled Template',
          category: 'GENERAL',
          htmlContent: "<!DOCTYPE html><html><head></head><body style='font-family:sans-serif;padding:32px;background-color:#ffffff;'><div style='max-w:600px;margin:0 auto;'><h1 style='color:#111827;'>Welcome to Your Campaign</h1><p style='color:#374151;'>Start writing your email content...</p></div></body></html>"
        })
      })
      const data = await res.json()
      if (res.ok && data.template) {
        router.push(`/dashboard/templates/${data.template.id}/edit`)
      } else {
        alert(data.error || 'Failed to create template')
        setCreatingBlank(false)
      }
    } catch (e) {
      console.error(e)
      setCreatingBlank(false)
    }
  }

  async function handleSelectTemplate(id: string) {
    setDuplicatingId(id)
    try {
      const res = await fetch(`/api/templates/${id}/duplicate`, { method: 'POST' })
      if (res.ok) {
        const data = await res.json()
        if (data.template) {
          router.push(`/dashboard/templates/${data.template.id}/edit`)
        }
      }
    } catch (e) {
      console.error(e)
      setDuplicatingId(null)
    }
  }

  const categories = ['ALL', 'NEWSLETTER', 'PROMOTIONAL', 'PERSONALIZED', 'GENERAL', 'TRANSACTIONAL']
  const filteredTemplates = templates.filter(t => {
    const matchSearch = t.name.toLowerCase().includes(search.toLowerCase())
    const matchCat = activeCategory === 'ALL' || t.category === activeCategory
    return matchSearch && matchCat
  })

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/templates" className="p-2 bg-white border border-gray-200 rounded-xl text-[#6B7280] hover:text-[#111827] transition shadow-sm">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-[#111827]">Create New Template</h1>
          <p className="text-sm text-[#6B7280] mt-1">Choose how you want to start designing your email</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Start Blank Option */}
        <div className="bg-white border border-gray-200 rounded-2xl p-8 flex flex-col items-center text-center shadow-sm hover:border-indigo-300 hover:shadow-md transition-all group">
          <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <FilePlus className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-[#111827] mb-2">Blank Template</h3>
          <p className="text-sm text-[#6B7280] mb-8 flex-1">
            Start with an empty canvas and build your email design from scratch using our editor.
          </p>
          <LoadingButton 
            onClick={handleStartBlank} 
            loading={creatingBlank} 
            className="w-full justify-center bg-indigo-600 text-white font-semibold hover:bg-indigo-700 py-3 rounded-xl shadow-sm"
          >
            Start Blank &rarr;
          </LoadingButton>
        </div>

        {/* Start from Existing Option */}
        <div className="bg-white border border-gray-200 rounded-2xl p-8 flex flex-col items-center text-center shadow-sm hover:border-indigo-300 hover:shadow-md transition-all group">
          <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <Copy className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-[#111827] mb-2">Start from existing</h3>
          <p className="text-sm text-[#6B7280] mb-8 flex-1">
            Pick one of your saved templates or system templates to use as a starting point.
          </p>
          <button 
            onClick={() => setShowPicker(true)}
            className="w-full flex justify-center items-center gap-2 bg-white border border-gray-200 text-[#111827] font-semibold hover:bg-gray-50 py-3 rounded-xl shadow-sm transition"
          >
            Browse Templates &rarr;
          </button>
        </div>
      </div>

      {/* Template Picker Modal */}
      {showPicker && (
        <div className="fixed inset-0 z-50 bg-[#F8FAFC] flex flex-col">
          <div className="flex items-center justify-between p-4 bg-white border-b border-gray-200">
            <div>
              <h2 className="text-xl font-bold text-[#111827]">Choose a Template</h2>
              <p className="text-sm text-[#6B7280]">Select a template to duplicate and edit</p>
            </div>
            <button onClick={() => setShowPicker(false)} className="p-2 text-[#6B7280] hover:text-[#111827] hover:bg-gray-100 rounded-lg transition">
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex-1 overflow-auto p-6 space-y-6">
            <div className="max-w-6xl mx-auto space-y-6">
              {/* Toolbar */}
              <div className="bg-white border border-gray-200 rounded-2xl p-4 flex flex-col sm:flex-row gap-4 shadow-sm">
                <div className="relative flex-1 sm:max-w-xs">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7280]" />
                  <input 
                    type="text" 
                    placeholder="Search templates..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-[#111827] focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 focus:outline-none transition"
                  />
                </div>
                <div className="flex gap-2 overflow-x-auto hide-scrollbar w-full">
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
                      {cat === 'ALL' ? 'All' : cat.charAt(0) + cat.slice(1).toLowerCase()}
                    </button>
                  ))}
                </div>
              </div>

              {/* Grid */}
              {loading ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="bg-white border border-gray-200 rounded-2xl animate-pulse h-48"></div>
                  ))}
                </div>
              ) : filteredTemplates.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {filteredTemplates.map(template => (
                    <div key={template.id} 
                      onClick={() => { if (duplicatingId !== template.id) handleSelectTemplate(template.id) }}
                      className="group cursor-pointer bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md hover:border-indigo-300 transition-all overflow-hidden relative">
                      
                      <div className="relative overflow-hidden bg-gray-50 border-b border-gray-100" style={{ height: 140 }}>
                        <iframe
                          srcDoc={template.htmlContent}
                          title={template.name}
                          scrolling="no"
                          style={{
                            width: '800px', height: '640px',
                            transform: 'scale(0.225)', transformOrigin: 'top left',
                            pointerEvents: 'none', border: 'none',
                          }}
                        />
                        <div className="absolute inset-0 bg-indigo-600/0 group-hover:bg-indigo-600/10 transition-colors" />
                        {template.userId === null && (
                          <span className="absolute top-2 left-2 px-2 py-0.5 bg-gray-900/70 backdrop-blur-sm text-white text-[10px] font-bold rounded-full">System</span>
                        )}
                      </div>

                      <div className="p-3">
                        <p className="text-sm font-semibold text-[#111827] truncate">{template.name}</p>
                        <p className="text-xs text-[#6B7280] mt-0.5">{template.category}</p>
                      </div>

                      {duplicatingId === template.id && (
                        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-20 text-center">
                  <p className="text-[#6B7280]">No templates found matching your criteria.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
