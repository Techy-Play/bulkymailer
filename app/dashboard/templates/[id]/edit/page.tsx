'use client'

import React, { useState, useEffect, useCallback, useMemo } from 'react'
import Link from 'next/link'
import {
  ArrowLeft, Monitor, Smartphone, Inbox, Save, Wand2, History, Send, X, Check,
  Loader2, Sparkles, Building, Mail
} from 'lucide-react'
import { toast } from 'sonner'

import { EditorBlock, compileWaypointToHTML } from '@/lib/editor/waypoint-schema'
import { saveTemplateJSONToDatabase } from '@/lib/editor/db-sync'
import { LoadingButton } from '@/components/ui/loading-button'

import { DndBlockSidebar } from '@/components/editor/DndBlockSidebar'
import { DndCanvas } from '@/components/editor/DndCanvas'
import { WaypointInspector } from '@/components/editor/WaypointInspector'

export const dynamic = 'force-dynamic'

export default function TemplateEditorPage({ params }: { params: Promise<{ id: string }> }) {
  const [templateId, setTemplateId] = useState('')
  const [name, setName] = useState('Loading...')
  const [category, setCategory] = useState('GENERAL')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [lastSavedTime, setLastSavedTime] = useState<string | null>(null)

  // Editor State
  const [blocks, setBlocks] = useState<EditorBlock[]>([])
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null)
  
  // Undo/Redo History Stack
  const [history, setHistory] = useState<EditorBlock[][]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  
  // View Modes
  const [previewTab, setPreviewTab] = useState<'desktop' | 'mobile' | 'inbox'>('desktop')
  const [viewMode, setViewMode] = useState<'edit' | 'preview'>('edit')

  // HTML Output (compiled on the fly)
  const htmlContent = useMemo(() => compileWaypointToHTML(blocks), [blocks])

  // Initial Fetch
  useEffect(() => {
    params.then(p => {
      setTemplateId(p.id)
      fetchTemplate(p.id)
    })
  }, [params])

  async function fetchTemplate(id: string) {
    try {
      const res = await fetch(`/api/templates/${id}`)
      if (res.ok) {
        const data = await res.json()
        const tpl = data.template || data
        setName(tpl.name || 'Untitled Template')
        setCategory(tpl.category || 'GENERAL')

        let initialBlocks: EditorBlock[] = []
        if (tpl.jsonTree && Array.isArray(tpl.jsonTree)) {
          initialBlocks = tpl.jsonTree as EditorBlock[]
        }
        
        setBlocks(initialBlocks)
        setHistory([initialBlocks])
        setHistoryIndex(0)
      }
    } catch (e) {
      console.error(e)
      toast.error('Failed to load template')
    } finally {
      setLoading(false)
    }
  }

  // Handle Block Changes with Undo/Redo logic
  const handleBlocksChange = useCallback((newBlocks: EditorBlock[]) => {
    setBlocks(newBlocks)
    
    // Push to history
    setHistory(prev => {
      const newHistory = prev.slice(0, historyIndex + 1)
      newHistory.push(newBlocks)
      if (newHistory.length > 50) newHistory.shift() // keep last 50
      setHistoryIndex(newHistory.length - 1)
      return newHistory
    })
  }, [historyIndex])

  const handleUndo = useCallback(() => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1
      setHistoryIndex(newIndex)
      setBlocks(history[newIndex])
      setSelectedBlockId(null)
    }
  }, [history, historyIndex])

  const handleRedo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1
      setHistoryIndex(newIndex)
      setBlocks(history[newIndex])
      setSelectedBlockId(null)
    }
  }, [history, historyIndex])

  // Keyboard Shortcuts
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'z') {
        if (e.shiftKey) {
          e.preventDefault()
          handleRedo()
        } else {
          e.preventDefault()
          handleUndo()
        }
      } else if ((e.key === 'Delete' || e.key === 'Backspace') && selectedBlockId && document.activeElement?.tagName === 'BODY') {
        e.preventDefault()
        handleBlocksChange(blocks.filter(b => b.id !== selectedBlockId))
        setSelectedBlockId(null)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedBlockId, blocks, handleUndo, handleRedo, handleBlocksChange])

  // Specific Actions
  const handleAddBlock = (type: any) => {
    const newBlock: EditorBlock = {
      id: `block_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      type,
      props: {} // Will be populated with defaults by DndCanvas or Inspector, wait we need some defaults
    }
    const newBlocks = [...blocks, newBlock]
    handleBlocksChange(newBlocks)
    setSelectedBlockId(newBlock.id)
  }

  const handleDeleteBlock = (id: string) => {
    handleBlocksChange(blocks.filter(b => b.id !== id))
    if (selectedBlockId === id) setSelectedBlockId(null)
  }

  const handleDuplicateBlock = (id: string) => {
    const blockIndex = blocks.findIndex(b => b.id === id)
    if (blockIndex > -1) {
      const block = blocks[blockIndex]
      const newBlock = {
        ...block,
        id: `block_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      }
      const newBlocks = [...blocks]
      newBlocks.splice(blockIndex + 1, 0, newBlock)
      handleBlocksChange(newBlocks)
      setSelectedBlockId(newBlock.id)
    }
  }

  const handleMoveBlock = (id: string, direction: 'up' | 'down') => {
    const index = blocks.findIndex(b => b.id === id)
    if (index < 0) return
    if (direction === 'up' && index > 0) {
      const newBlocks = [...blocks]
      ;[newBlocks[index - 1], newBlocks[index]] = [newBlocks[index], newBlocks[index - 1]]
      handleBlocksChange(newBlocks)
    } else if (direction === 'down' && index < blocks.length - 1) {
      const newBlocks = [...blocks]
      ;[newBlocks[index + 1], newBlocks[index]] = [newBlocks[index], newBlocks[index + 1]]
      handleBlocksChange(newBlocks)
    }
  }

  const handleUpdateBlock = (updatedBlock: EditorBlock) => {
    handleBlocksChange(blocks.map(b => b.id === updatedBlock.id ? updatedBlock : b))
  }

  // Save logic
  async function handleSave() {
    setSaving(true)
    try {
      const result = await saveTemplateJSONToDatabase(templateId, blocks as any, htmlContent, name, category)
      if (result.ok) {
        toast.success("Draft saved successfully!")
        setLastSavedTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }))
        
        if (result.isForked && result.templateId) {
          // If a system template was forked, update the URL without refreshing
          window.history.replaceState({}, '', `/dashboard/templates/${result.templateId}/edit`)
          setTemplateId(result.templateId)
        }
      } else {
        toast.error("Failed to save draft")
      }
    } catch (e) {
      console.error(e)
      toast.error("Network error while saving")
    } finally {
      setSaving(false)
    }
  }

  // Category and Title auto-save
  async function saveMetadata(newName: string, newCategory: string) {
    if (!templateId) return
    try {
      await fetch(`/api/templates/${templateId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newName, category: newCategory }),
      })
    } catch (e) {
      console.error("Failed to auto-save metadata", e)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
        <span className="ml-3 text-gray-600 font-medium">Loading builder...</span>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-[#FAFAFA] font-sans">
      {/* 1. TOP HEADER TOOLBAR */}
      <header className="flex-shrink-0 h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 z-40">
        <div className="flex items-center space-x-4 flex-1">
          <Link href="/dashboard/templates" className="p-2 text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-full transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          
          <div className="flex flex-col">
            <input 
              type="text" 
              value={name} 
              onChange={e => setName(e.target.value)}
              onBlur={() => saveMetadata(name, category)}
              className="font-bold text-gray-900 border-none outline-none focus:ring-0 p-0 text-base"
              placeholder="Template Name"
            />
            <div className="flex items-center text-xs text-gray-500">
              <span className="mr-2">Category:</span>
              <select 
                value={category} 
                onChange={e => {
                  setCategory(e.target.value)
                  saveMetadata(name, e.target.value)
                }}
                className="border-none bg-transparent outline-none p-0 text-xs text-gray-600 cursor-pointer font-medium hover:text-gray-900"
              >
                <option value="GENERAL">General</option>
                <option value="NEWSLETTER">Newsletter</option>
                <option value="PROMOTIONAL">Promotional</option>
                <option value="TRANSACTIONAL">Transactional</option>
                <option value="ANNOUNCEMENT">Announcement</option>
              </select>
            </div>
          </div>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center bg-gray-100 p-1 rounded-lg">
          <button 
            onClick={() => setViewMode('edit')}
            className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${viewMode === 'edit' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
          >
            Edit
          </button>
          <button 
            onClick={() => { setViewMode('preview'); setSelectedBlockId(null); }}
            className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${viewMode === 'preview' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
          >
            Preview
          </button>
        </div>

        <div className="flex items-center justify-end flex-1 space-x-3">
          <span className="text-xs text-gray-400">
            {lastSavedTime ? `Saved at ${lastSavedTime}` : 'Not saved yet'}
          </span>
          <LoadingButton loading={saving} onClick={handleSave} className="bg-white text-gray-700 border border-gray-300 hover:bg-gray-50">
            <Save className="w-4 h-4 mr-2" />
            Save Draft
          </LoadingButton>
          <button 
            onClick={() => toast.success("Feature coming soon!")}
            className="flex items-center justify-center px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700 transition-colors shadow-sm"
          >
            <Send className="w-4 h-4 mr-2" />
            Send Test
          </button>
        </div>
      </header>

      {/* 2. MAIN WORKSPACE */}
      <div className="flex-1 flex overflow-hidden">
        
        {viewMode === 'edit' ? (
          <>
            {/* LEFT: Blocks Sidebar */}
            <DndBlockSidebar onAddBlock={handleAddBlock} />

            {/* MIDDLE: Drag and Drop Canvas */}
            <DndCanvas 
              blocks={blocks}
              selectedBlockId={selectedBlockId}
              onBlocksChange={handleBlocksChange}
              onSelectBlock={setSelectedBlockId}
              onDeleteBlock={handleDeleteBlock}
              onDuplicateBlock={handleDuplicateBlock}
              onMoveBlock={handleMoveBlock}
            />

            {/* RIGHT: Inspector */}
            <WaypointInspector 
              block={blocks.find(b => b.id === selectedBlockId) || null}
              onChange={handleUpdateBlock}
            />
          </>
        ) : (
          /* PREVIEW MODE */
          <div className="flex-1 flex flex-col bg-gray-100 relative">
            <div className="flex justify-center p-4 border-b border-gray-200 bg-white">
              <div className="flex bg-gray-100 p-1 rounded-lg">
                <button onClick={() => setPreviewTab('desktop')} className={`flex items-center px-4 py-1.5 text-sm font-medium rounded-md ${previewTab === 'desktop' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500'}`}><Monitor className="w-4 h-4 mr-2"/> Desktop</button>
                <button onClick={() => setPreviewTab('mobile')} className={`flex items-center px-4 py-1.5 text-sm font-medium rounded-md ${previewTab === 'mobile' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500'}`}><Smartphone className="w-4 h-4 mr-2"/> Mobile</button>
                <button onClick={() => setPreviewTab('inbox')} className={`flex items-center px-4 py-1.5 text-sm font-medium rounded-md ${previewTab === 'inbox' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500'}`}><Inbox className="w-4 h-4 mr-2"/> Inbox Simulation</button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-8 flex justify-center">
              {previewTab === 'mobile' ? (
                <div className="w-[375px] h-[812px] bg-white rounded-[40px] shadow-2xl border-[8px] border-gray-900 overflow-hidden relative">
                  <div className="w-full h-7 bg-gray-900 absolute top-0 flex justify-center"><div className="w-32 h-6 bg-black rounded-b-3xl"></div></div>
                  <iframe srcDoc={htmlContent} title="Mobile Preview" className="w-full h-full pt-7 border-none bg-[#F4F4F5]" />
                </div>
              ) : previewTab === 'inbox' ? (
                <div className="w-full max-w-5xl bg-white rounded-lg shadow-xl overflow-hidden flex flex-col border border-gray-200">
                  <div className="h-16 border-b border-gray-200 flex items-center px-6 bg-gray-50">
                    <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold mr-4">S</div>
                    <div>
                      <div className="font-semibold text-gray-900">Sender Name <span className="text-gray-500 text-sm font-normal">&lt;sender@example.com&gt;</span></div>
                      <div className="text-xs text-gray-500">To: you@example.com</div>
                    </div>
                  </div>
                  <div className="h-14 border-b border-gray-100 flex items-center px-6 font-medium text-gray-800 text-lg">
                    {name}
                  </div>
                  <div className="flex-1 bg-gray-100 p-8 flex justify-center overflow-y-auto">
                    <div className="w-full max-w-[600px] bg-white shadow-sm border border-gray-200">
                      <iframe srcDoc={htmlContent} title="Inbox Preview" className="w-full min-h-[600px] border-none" />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="w-full max-w-[800px] bg-white shadow-xl min-h-[800px] border border-gray-200">
                  <iframe srcDoc={htmlContent} title="Desktop Preview" className="w-full h-full border-none" />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
