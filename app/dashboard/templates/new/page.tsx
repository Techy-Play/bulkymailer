'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { TemplateBlueprint } from '@/lib/templates/blueprints'

interface BlueprintPreview extends Omit<TemplateBlueprint, 'getContent'> {
  htmlContent: string;
}

export default function NewTemplatePage() {
  const router = useRouter()
  const [creating, setCreating] = useState<string | null>(null)
  const [blueprints, setBlueprints] = useState<BlueprintPreview[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadBlueprints() {
      try {
        const res = await fetch('/api/templates/blueprints')
        if (res.ok) {
          const data = await res.json()
          setBlueprints(data.blueprints || [])
        }
      } catch (err) {
        console.error("Failed to load blueprints", err)
      } finally {
        setLoading(false)
      }
    }
    loadBlueprints()
  }, [])

  async function handleSelectBlueprint(blueprint: BlueprintPreview) {
    setCreating(blueprint.id)
    try {
      // Fetch the raw blueprint content from the static definitions, 
      // since the API only returns the preview HTML.
      const { blueprints: staticBlueprints } = await import('@/lib/templates/blueprints');
      const staticBp = staticBlueprints.find(b => b.id === blueprint.id);
      
      if (!staticBp) throw new Error("Blueprint not found");
      const content = staticBp.getContent();
      
      const res = await fetch('/api/templates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: blueprint.name === 'Start from Scratch' ? 'Untitled Template' : blueprint.name,
          category: blueprint.category,
          jsonTree: content
        })
      })
      const data = await res.json()
      if (res.ok && data.template) {
        router.push(`/dashboard/templates/${data.template.id}/edit`)
      } else {
        alert(data.error || 'Failed to create template')
        setCreating(null)
      }
    } catch (e) {
      console.error(e)
      setCreating(null)
    }
  }

  return (
    <div className="max-w-7xl mx-auto space-y-12 pb-24">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/dashboard/templates" className="p-2 bg-white border border-gray-200 rounded-xl text-[#6B7280] hover:text-[#111827] transition shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none">
          <ArrowLeft className="w-5 h-5" />
          <span className="sr-only">Go back</span>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-[#111827]">Create a Template</h1>
          <p className="text-base text-[#6B7280] mt-1">Start with a blueprint or build from scratch</p>
        </div>
      </div>

      {/* Blueprints Grid */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-[#111827]">Start with a template</h2>
        
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-2xl animate-pulse h-80"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {blueprints.map(bp => (
              <button
                key={bp.id}
                onClick={() => handleSelectBlueprint(bp)}
                disabled={creating !== null}
                className={`group relative bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md hover:border-indigo-300 transition-all text-left flex flex-col focus:ring-2 focus:ring-indigo-500 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden ${creating === bp.id ? 'ring-2 ring-indigo-500' : ''}`}
              >
                {/* Preview Container */}
                <div className="w-full h-48 bg-[#F9FAFB] border-b border-gray-100 relative overflow-hidden">
                  <div className="absolute inset-0 z-10" /> {/* Transparent overlay to block clicks inside iframe */}
                  
                  <iframe
                    srcDoc={bp.htmlContent}
                    title={bp.name}
                    scrolling="no"
                    tabIndex={-1}
                    style={{
                      width: '800px',
                      height: '640px',
                      transform: 'scale(0.35)',
                      transformOrigin: 'top left',
                      pointerEvents: 'none',
                      border: 'none',
                    }}
                  />

                  {/* Loading Spinner overlay when creating */}
                  {creating === bp.id && (
                    <div className="absolute inset-0 bg-white/70 backdrop-blur-sm z-20 flex items-center justify-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                    </div>
                  )}
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-indigo-600/0 group-hover:bg-indigo-600/5 transition-colors z-10" />
                </div>

                {/* Card Footer */}
                <div className="p-5 flex-1 flex flex-col bg-white">
                  <h3 className="text-base font-bold text-[#111827] group-hover:text-indigo-600 transition-colors">{bp.name}</h3>
                  <p className="text-sm text-[#6B7280] mt-1.5 leading-relaxed">{bp.description}</p>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
