'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Editor from '@monaco-editor/react'
import {
  ArrowLeft, Monitor, Smartphone, Tag, ChevronDown, ChevronRight, ChevronUp,
  Mail, Send, X, Check, Loader2, Sparkles, Wand2, RefreshCw, AlertCircle,
  Undo2, Redo2, ShieldCheck, CheckCircle2, FileCheck, Layers, Layout, Palette, Wrench,
  Code2, Copy, Eye, FileText, Info, History, Sparkle, Inbox, Trash2, ArrowRight,
  GripVertical, User, Building, Image as ImageIcon
} from 'lucide-react'
import { LoadingButton } from '@/components/ui/loading-button'

export const dynamic = 'force-dynamic'

interface AiVersion {
  id: number
  prompt: string
  html: string
  changes: string[]
  spamRisk: string
  brandScore: number
  timestamp: string
}

interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  text?: string
  changes?: string[]
  spamRisk?: string
  brandScore?: number
  suggestions?: string[]
  timestamp: string
}

export default function TemplateEditorPage({ params }: { params: Promise<{ id: string }> }) {
  const [templateId, setTemplateId] = useState('')
  const [name, setName] = useState('Loading...')
  const [category, setCategory] = useState('GENERAL')
  const [htmlContent, setHtmlContent] = useState('')
  const [previewHtml, setPreviewHtml] = useState('')
  const [previewTab, setPreviewTab] = useState<'desktop' | 'mobile' | 'inbox'>('desktop')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [lastSavedTime, setLastSavedTime] = useState<string | null>(null)
  
  // Resizable Panel Width State (Mouse drag handle)
  const [leftPanelWidth, setLeftPanelWidth] = useState(340)
  const [isResizing, setIsResizing] = useState(false)

  // Collapsible Monaco Drawer state
  const [showCodeEditor, setShowCodeEditor] = useState(false)

  // FULL-SCREEN AI WORKSPACE MODAL STATE
  const [showAiWorkspace, setShowAiWorkspace] = useState(false)
  const [aiPrompt, setAiPrompt] = useState('')
  const [aiGenerating, setAiGenerating] = useState(false)
  const [aiStep, setAiStep] = useState(0) // 0: progress, 1: variants, 2: conversation
  
  // AI Version History & History Pointer
  const [versionHistory, setVersionHistory] = useState<AiVersion[]>([])
  const [currentVersionIndex, setCurrentVersionIndex] = useState<number>(-1)
  
  // Active AI HTML in workspace (unsaved until user clicks Accept)
  const [workspaceHtml, setWorkspaceHtml] = useState('')
  const [workspacePreviewHtml, setWorkspacePreviewHtml] = useState('')
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([])

  // Missing fields for Ask Before Assuming form
  const [missingFields, setMissingFields] = useState<string[]>([])
  const [fieldAnswers, setFieldAnswers] = useState<Record<string, string>>({})
  const [aiError, setAiError] = useState('')

  // Advanced Test Template Email Modal State
  const [showTestEmailModal, setShowTestEmailModal] = useState(false)
  const [testEmail, setTestEmail] = useState('')
  const [testFirstName, setTestFirstName] = useState('Rahul')
  const [testLastName, setTestLastName] = useState('Sharma')
  const [testCompany, setTestCompany] = useState('Tech Corp')
  const [testEmailSending, setTestEmailSending] = useState(false)
  const [testEmailResult, setTestEmailResult] = useState('')
  
  // Merge tags toast copy feedback
  const [copiedTag, setCopiedTag] = useState<string | null>(null)

  const editorRef = useRef<any>(null)
  const workspaceEditorRef = useRef<any>(null)
  const previewTimerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    params.then(p => {
      setTemplateId(p.id)
      fetchTemplate(p.id)
    })
  }, [params])

  // Mouse Drag Resizing for Workspace Panels
  const startResizing = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsResizing(true)
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing) return
      // Clamp panel width between 260px and 520px
      const newWidth = Math.min(Math.max(e.clientX, 260), 520)
      setLeftPanelWidth(newWidth)
    }

    const handleMouseUp = () => {
      setIsResizing(false)
    }

    if (isResizing) {
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('mouseup', handleMouseUp)
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isResizing])

  async function fetchTemplate(id: string) {
    try {
      const res = await fetch(`/api/templates/${id}`)
      if (res.ok) {
        const data = await res.json()
        const tpl = data.template || data
        setName(tpl.name || 'Untitled Template')
        setCategory(tpl.category || 'GENERAL')
        setHtmlContent(tpl.htmlContent || '')
        setPreviewHtml(tpl.htmlContent || '')
      }
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  // Save to DB Draft
  async function handleSave(updatedHtml?: string) {
    if (!templateId) return
    setSaving(true)
    const contentToSave = updatedHtml !== undefined ? updatedHtml : htmlContent
    try {
      const res = await fetch(`/api/templates/${templateId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, category, htmlContent: contentToSave }),
      })
      if (!res.ok) throw new Error('Failed to save')
      setSaved(true)
      setLastSavedTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }))
      setTimeout(() => setSaved(false), 2500)
    } catch (e) {
      console.error(e)
    } finally {
      setSaving(false)
    }
  }

  // Open Full Screen AI Workspace Modal
  function openAiWorkspace(initialPrompt?: string) {
    setWorkspaceHtml(htmlContent)
    setWorkspacePreviewHtml(htmlContent)
    setShowAiWorkspace(true)
    setAiError('')

    if (initialPrompt) {
      setAiPrompt('')
      triggerAiWorkspaceGeneration(initialPrompt)
    }
  }

  // Trigger AI Generation inside Full-Screen Workspace
  async function triggerAiWorkspaceGeneration(promptToRun?: string, answers?: Record<string, string>) {
    const promptText = promptToRun || aiPrompt
    if (!promptText.trim() && !answers) return

    setAiPrompt('')
    setAiGenerating(true)
    setAiStep(0)
    setAiError('')

    const answersToUse = answers || fieldAnswers
    if (answers || (fieldAnswers && Object.keys(fieldAnswers).length > 0)) {
      setMissingFields([])
    }

    // Append user message to chat
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: promptText || 'Complete design with provided campaign details',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }
    setChatMessages(prev => [...prev, userMsg])

    try {
      const res = await fetch('/api/ai/template-generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: promptText,
          currentHtml: workspaceHtml || htmlContent,
          fieldAnswers: answersToUse,
        }),
      })

      const data = await res.json()
      if (!res.ok) {
        setAiError(data.error || 'Failed to generate template')
        setAiGenerating(false)
        return
      }

      if (data.missingFields && data.missingFields.length > 0 && !answers && (!answersToUse || Object.keys(answersToUse).length === 0)) {
        setMissingFields(data.missingFields)
        setAiGenerating(false)
        return
      }

      if (data.html) {
        const newHtml = data.html
        setWorkspaceHtml(newHtml)
        setWorkspacePreviewHtml(newHtml)

        setMissingFields([])
        setFieldAnswers({})

        const newVersion: AiVersion = {
          id: versionHistory.length + 1,
          prompt: promptText || 'Custom design update',
          html: newHtml,
          changes: data.changes || ['✓ Generated responsive email template'],
          spamRisk: data.spamRisk || 'Low',
          brandScore: data.brandScore || 95,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        }

        const updatedHistory = [...versionHistory, newVersion]
        setVersionHistory(updatedHistory)
        setCurrentVersionIndex(updatedHistory.length - 1)

        const assistantMsg: ChatMessage = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          changes: data.changes || ['✓ Generated layout', '✓ Mobile optimized'],
          spamRisk: data.spamRisk || 'Low',
          brandScore: data.brandScore || 95,
          suggestions: data.suggestions || ['Add countdown timer', 'Add product grid', 'Add testimonials'],
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        }
        setChatMessages(prev => [...prev, assistantMsg])
        setAiStep(2)
      }
    } catch (err: any) {
      setAiError(err.message || 'Network error while contacting AI')
    } finally {
      setAiGenerating(false)
    }
  }

  function restoreVersion(idx: number) {
    if (idx >= 0 && idx < versionHistory.length) {
      const v = versionHistory[idx]
      setWorkspaceHtml(v.html)
      setWorkspacePreviewHtml(v.html)
      setCurrentVersionIndex(idx)
      if (workspaceEditorRef.current) {
        workspaceEditorRef.current.setValue(v.html)
      }
    }
  }

  async function handleAcceptWorkspaceChanges() {
    if (editorRef.current) {
      editorRef.current.setValue(workspaceHtml)
    }
    setHtmlContent(workspaceHtml)
    setPreviewHtml(workspaceHtml)
    setShowAiWorkspace(false)
    await handleSave(workspaceHtml)
  }

  function copyOrInsertTag(tag: string) {
    if (editorRef.current) {
      const selection = editorRef.current.getSelection()
      if (selection) {
        editorRef.current.executeEdits('merge-tag', [{ range: selection, text: tag, forceMoveMarkers: true }])
      }
    }
    navigator.clipboard.writeText(tag)
    setCopiedTag(tag)
    setTimeout(() => setCopiedTag(null), 2000)
  }

  // ADVANCED TEST EMAIL MAILER WITH PERSONALIZATION
  async function sendPersonalizedTestEmail() {
    if (!testEmail || !templateId) return
    setTestEmailSending(true)
    setTestEmailResult('')
    try {
      const res = await fetch(`/api/templates/${templateId}/test-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          testEmail,
          firstName: testFirstName,
          lastName: testLastName,
          company: testCompany,
        }),
      })
      if (res.ok) {
        setTestEmailResult('✓ Personalized test email sent!')
      } else {
        const data = await res.json().catch(() => ({}))
        setTestEmailResult(`✗ ${data.error || 'Failed to send'}`)
      }
    } catch {
      setTestEmailResult('✗ Network error')
    } finally {
      setTestEmailSending(false)
    }
  }

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#F8FAFC]">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
      </div>
    )
  }

  const quickPrompts = [
    "Add a bold hero section with a claim discount button",
    "Add a 2-column feature list section with icons",
    "Add a product showcase grid with prices",
    "Apply elegant dark theme with soft purple accents",
  ]

  // Image URL validation helper
  const isImageField = (fieldName: string) => {
    const fn = fieldName.toLowerCase()
    return fn.includes('image') || fn.includes('logo') || fn.includes('photo') || fn.includes('picture') || fn.includes('url')
  }

  const isValidUrl = (urlStr: string) => {
    return urlStr.startsWith('http://') || urlStr.startsWith('https://')
  }

  return (
    <div className={`h-screen overflow-hidden flex flex-col bg-[#F8FAFC] ${isResizing ? 'select-none' : ''}`}>
      
      {/* Top Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-2.5 flex items-center gap-4 shrink-0 shadow-sm z-10">
        <Link 
          href="/dashboard/templates" 
          className="p-2 text-[#6B7280] hover:text-[#111827] hover:bg-gray-100 rounded-xl transition"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div className="flex-1 flex items-center gap-3">
          <input 
            type="text" 
            value={name} 
            onChange={e => setName(e.target.value)} 
            className="text-base font-bold text-[#111827] bg-transparent border-none outline-none focus:ring-2 focus:ring-indigo-400/30 rounded-lg px-2" 
          />
          <select 
            value={category} 
            onChange={e => setCategory(e.target.value)} 
            className="px-2.5 py-1 border border-gray-200 bg-gray-50 rounded-lg text-xs text-[#111827] focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
          >
            <option value="GENERAL">General</option>
            <option value="NEWSLETTER">Newsletter</option>
            <option value="PROMOTIONAL">Promotional</option>
            <option value="TRANSACTIONAL">Transactional</option>
            <option value="PERSONALIZED">Personalized</option>
          </select>
          
          {lastSavedTime && (
            <span className="text-xs text-[#6B7280] bg-gray-100 px-2 py-0.5 rounded-md font-medium">
              Draft saved at {lastSavedTime}
            </span>
          )}
          {saved && (
            <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1 bg-emerald-50 px-2 py-0.5 rounded-md">
              <Check className="w-3.5 h-3.5" /> Saved
            </span>
          )}
        </div>
        
        <div className="flex items-center gap-3">
          {/* AI Design Studio Launch Button */}
          <button
            onClick={() => openAiWorkspace()}
            className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 hover:from-purple-700 hover:to-indigo-800 rounded-xl transition shadow-md hover:shadow-lg"
          >
            <Sparkles className="w-4 h-4 fill-white" />
            ✨ AI Design Studio
          </button>

          {/* Advanced Test Email Button */}
          <button
            onClick={() => setShowTestEmailModal(true)}
            className="flex items-center gap-1.5 px-3 py-2 text-xs text-gray-700 hover:bg-gray-100 rounded-xl transition font-medium border border-gray-200 bg-white"
          >
            <Mail className="w-3.5 h-3.5 text-indigo-600" /> Test Email
          </button>

          {/* Code Editor Toggle */}
          <button
            onClick={() => setShowCodeEditor(!showCodeEditor)}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl transition border ${
              showCodeEditor
                ? "bg-gray-900 text-white border-gray-900"
                : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            {showCodeEditor ? "Hide Code" : "HTML Code"}
          </button>

          {/* Save as Draft Button */}
          <button
            onClick={() => handleSave()}
            disabled={saving}
            className="px-3.5 py-1.5 bg-white border border-gray-200 hover:bg-gray-50 text-[#111827] text-xs font-semibold rounded-xl transition shadow-sm"
          >
            Save Draft
          </button>

          {/* Main Save Template Button */}
          <LoadingButton 
            onClick={() => handleSave()} 
            loading={saving}
            className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl transition shadow-sm"
          >
            Save Template
          </LoadingButton>
        </div>
      </div>

      {/* Main Visual Editor Body with Mouse Draggable Resizer */}
      <div className="flex-1 min-h-0 flex relative overflow-hidden">

        {/* LEFT PANEL: Quick Actions & Merge Tags (Resizable Width) */}
        <div 
          style={{ width: `${leftPanelWidth}px` }} 
          className="bg-white border-r border-gray-200 flex flex-col min-h-0 z-10 shrink-0"
        >
          <div className="p-3.5 border-b border-gray-200 flex items-center justify-between bg-gradient-to-r from-purple-50/60 to-indigo-50/60">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-600 fill-purple-600" />
              <h3 className="font-bold text-xs text-[#111827]">AI Quick Studio</h3>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-3.5 space-y-4">
            <div className="p-3.5 bg-purple-50/80 border border-purple-200/80 rounded-2xl space-y-2">
              <p className="text-xs font-bold text-purple-950">✨ Launch AI Design Studio</p>
              <p className="text-[11px] text-purple-800">
                Open full-screen AI workspace to generate templates, try multi-variant designs, and iterate with natural language!
              </p>
              <button
                onClick={() => openAiWorkspace()}
                className="w-full py-2 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded-xl transition shadow-sm flex items-center justify-center gap-1.5 mt-1"
              >
                <Sparkles className="w-3.5 h-3.5" /> Launch Workspace →
              </button>
            </div>

            {/* Quick Actions List */}
            <div className="space-y-2">
              <label className="block text-[11px] font-bold text-[#6B7280] uppercase tracking-wide">
                Quick Prompts
              </label>
              <div className="space-y-1.5">
                {quickPrompts.map((qp, idx) => (
                  <button
                    key={idx}
                    onClick={() => openAiWorkspace(qp)}
                    className="w-full text-left p-2.5 bg-gray-50 hover:bg-purple-50 hover:border-purple-200 border border-gray-200 rounded-xl text-xs text-[#111827] transition font-medium flex items-center justify-between group"
                  >
                    <span className="truncate pr-2">{qp}</span>
                    <Wand2 className="w-3.5 h-3.5 text-gray-400 group-hover:text-purple-600 shrink-0" />
                  </button>
                ))}
              </div>
            </div>

            {/* Personalization Merge Tags */}
            <div className="space-y-2 pt-3 border-t border-gray-100">
              <label className="block text-[11px] font-bold text-[#6B7280] uppercase tracking-wide">
                Personalization Tags
              </label>
              <div className="flex flex-wrap gap-1.5">
                {['{{firstName}}', '{{lastName}}', '{{email}}', '{{company}}', '{{unsubscribeUrl}}'].map(tag => (
                  <button
                    key={tag}
                    onClick={() => copyOrInsertTag(tag)}
                    className="px-2.5 py-1 bg-gray-50 hover:bg-indigo-50 border border-gray-200 text-[#111827] text-xs font-mono rounded-lg transition"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* MOUSE DRAGGABLE PANEL RESIZER HANDLE */}
        <div
          onMouseDown={startResizing}
          className="w-1.5 hover:w-2 bg-gray-200 hover:bg-purple-500 cursor-col-resize transition-all shrink-0 z-20 flex items-center justify-center group"
          title="Drag to resize panel width"
        >
          <GripVertical className="w-3 h-3 text-gray-400 group-hover:text-white" />
        </div>

        {/* CENTER HERO PANEL: LARGE LIVE PREVIEW */}
        <div className="flex-1 min-h-0 flex flex-col bg-[#F8FAFC]">
          
          {/* Live Preview Controls Header */}
          <div className="flex items-center justify-between px-6 py-2.5 border-b border-gray-200 bg-white shrink-0 shadow-sm">
            <div className="flex items-center gap-2 text-xs font-bold text-[#111827]">
              <Eye className="w-4 h-4 text-indigo-600" />
              <span>Live Email Preview</span>
            </div>

            {/* Desktop / Mobile Frame Toggle */}
            <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-xl border border-gray-200 text-xs">
              <button 
                onClick={() => setPreviewTab('desktop')}
                className={`px-3 py-1 flex items-center gap-1.5 font-semibold rounded-lg transition ${
                  previewTab === 'desktop' ? 'bg-white text-[#111827] shadow-sm' : 'text-[#6B7280] hover:text-[#111827]'
                }`}
              >
                <Monitor className="w-3.5 h-3.5" /> Desktop
              </button>
              <button 
                onClick={() => setPreviewTab('mobile')}
                className={`px-3 py-1 flex items-center gap-1.5 font-semibold rounded-lg transition ${
                  previewTab === 'mobile' ? 'bg-white text-[#111827] shadow-sm' : 'text-[#6B7280] hover:text-[#111827]'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" /> Mobile Frame
              </button>
            </div>
          </div>

          {/* Main Full-Height Email Preview Viewport */}
          <div className="flex-1 min-h-0 p-6 overflow-auto flex items-start justify-center">
            {previewTab === 'desktop' ? (
              <div className="w-full max-w-4xl h-full min-h-[600px] bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
                <iframe
                  srcDoc={previewHtml}
                  title="Desktop email preview"
                  className="w-full h-full border-0 flex-1"
                />
              </div>
            ) : (
              <div className="relative w-[375px] h-[720px] bg-white rounded-[2.5rem] border-[10px] border-gray-900 shadow-2xl overflow-hidden shrink-0 my-auto">
                <div className="absolute top-0 inset-x-0 h-5 bg-gray-900 rounded-b-2xl w-32 mx-auto z-10"></div>
                <iframe
                  srcDoc={previewHtml}
                  title="Mobile email preview"
                  className="w-full h-full border-0"
                />
              </div>
            )}
          </div>
        </div>

      </div>

      {/* BOTTOM COLLAPSIBLE DRAWER: HTML Monaco Code Editor */}
      <div className={`bg-white border-t border-gray-200 transition-all duration-300 flex flex-col shrink-0 shadow-[0_-4px_12px_rgba(0,0,0,0.05)] z-30 ${
        showCodeEditor ? 'h-[360px]' : 'h-10'
      }`}>
        <button 
          onClick={() => setShowCodeEditor(!showCodeEditor)}
          className="w-full h-10 px-4 flex items-center justify-between bg-gray-900 text-white text-xs font-semibold hover:bg-black transition shrink-0"
        >
          <div className="flex items-center gap-2">
            <Code2 className="w-4 h-4 text-purple-400" />
            <span>HTML Code Editor (Monaco)</span>
            <span className="text-[10px] text-gray-400 font-normal">
              {showCodeEditor ? "— Click to collapse" : "— Click to expand and edit raw HTML"}
            </span>
          </div>
          <div className="flex items-center gap-2">
            {showCodeEditor ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
          </div>
        </button>

        {showCodeEditor && (
          <div className="flex-1 min-h-0 bg-white">
            <Editor
              height="320px"
              defaultLanguage="html"
              theme="vs"
              value={htmlContent}
              onMount={(editor) => { editorRef.current = editor }}
              onChange={(v) => {
                setHtmlContent(v || '')
                if (previewTimerRef.current) clearTimeout(previewTimerRef.current)
                previewTimerRef.current = setTimeout(() => setPreviewHtml(v || ''), 300)
              }}
              options={{
                minimap: { enabled: false },
                fontSize: 13,
                wordWrap: 'on',
                scrollBeyondLastLine: false,
                formatOnPaste: true,
                padding: { top: 12 },
              }}
            />
          </div>
        )}
      </div>

      {/* =================================================================== */}
      {/* ✉️ ADVANCED TEST TEMPLATE MAILING MODAL (Personalization Input) */}
      {/* =================================================================== */}
      {showTestEmailModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white border border-gray-200 rounded-3xl shadow-2xl max-w-md w-full p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-[#111827]">Send Personalized Test Email</h3>
                  <p className="text-[11px] text-[#6B7280]">Test template rendering & merge tags</p>
                </div>
              </div>
              <button 
                onClick={() => setShowTestEmailModal(false)}
                className="p-1 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-[11px] font-bold text-[#6B7280] uppercase tracking-wide mb-1">
                  Recipient Email Address *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                  <input
                    type="email"
                    value={testEmail}
                    onChange={(e) => setTestEmail(e.target.value)}
                    placeholder="e.g. rahul@gmail.com"
                    className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs text-[#111827] focus:ring-2 focus:ring-indigo-500/30 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-bold text-[#6B7280] uppercase tracking-wide mb-1">
                    First Name ({"{{firstName}}"})
                  </label>
                  <input
                    type="text"
                    value={testFirstName}
                    onChange={(e) => setTestFirstName(e.target.value)}
                    placeholder="Rahul"
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs text-[#111827] focus:ring-2 focus:ring-indigo-500/30 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-[#6B7280] uppercase tracking-wide mb-1">
                    Last Name ({"{{lastName}}"})
                  </label>
                  <input
                    type="text"
                    value={testLastName}
                    onChange={(e) => setTestLastName(e.target.value)}
                    placeholder="Sharma"
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs text-[#111827] focus:ring-2 focus:ring-indigo-500/30 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#6B7280] uppercase tracking-wide mb-1">
                  Company Name ({"{{company}}"})
                </label>
                <div className="relative">
                  <Building className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={testCompany}
                    onChange={(e) => setTestCompany(e.target.value)}
                    placeholder="Tech Corp"
                    className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs text-[#111827] focus:ring-2 focus:ring-indigo-500/30 focus:outline-none"
                  />
                </div>
              </div>

              {testEmailResult && (
                <div className={`p-3 rounded-xl text-xs font-medium text-center ${
                  testEmailResult.includes('✓') ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-red-50 text-red-700 border border-red-200'
                }`}>
                  {testEmailResult}
                </div>
              )}

              <LoadingButton
                onClick={sendPersonalizedTestEmail}
                loading={testEmailSending}
                disabled={!testEmail}
                className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition shadow-md flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                {testEmailSending ? "Sending Test Email..." : "Send Personalized Test Email →"}
              </LoadingButton>
            </div>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* ✨ FULL-SCREEN AI DESIGN STUDIO WORKSPACE MODAL (v0 / Cursor Style) */}
      {/* =================================================================== */}
      {showAiWorkspace && (
        <div className="fixed inset-0 z-50 bg-[#F8FAFC] flex flex-col overflow-hidden animate-in fade-in duration-200">
          
          {/* Workspace Top Header Bar */}
          <div className="bg-[#111827] text-white px-6 py-3 flex items-center justify-between shrink-0 shadow-lg border-b border-gray-800">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowAiWorkspace(false)}
                className="p-1.5 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white transition"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-purple-600 text-white flex items-center justify-center">
                  <Sparkles className="w-4 h-4 fill-white" />
                </div>
                <div>
                  <h2 className="font-bold text-sm text-white flex items-center gap-2">
                    ✨ AI Design Studio Workspace
                    <span className="px-2 py-0.5 bg-purple-500/20 border border-purple-400/30 text-purple-300 text-[10px] font-bold rounded-full">
                      Draft (Unsaved)
                    </span>
                  </h2>
                </div>
              </div>
            </div>

            {/* Version History Selector & Action Bar */}
            <div className="flex items-center gap-3">
              {versionHistory.length > 0 && (
                <div className="flex items-center gap-2 bg-gray-800 px-3 py-1.5 rounded-xl border border-gray-700 text-xs">
                  <History className="w-3.5 h-3.5 text-purple-400" />
                  <span className="text-gray-400 font-medium">Version:</span>
                  <select
                    value={currentVersionIndex}
                    onChange={(e) => restoreVersion(Number(e.target.value))}
                    className="bg-transparent text-white font-bold focus:outline-none cursor-pointer"
                  >
                    {versionHistory.map((v, idx) => (
                      <option key={idx} value={idx} className="bg-gray-900 text-white">
                        v{v.id} ({v.timestamp}) — {v.prompt.substring(0, 20)}...
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Undo / Redo */}
              <button
                onClick={() => {
                  if (currentVersionIndex > 0) restoreVersion(currentVersionIndex - 1)
                }}
                disabled={currentVersionIndex <= 0}
                className="p-2 bg-gray-800 hover:bg-gray-700 text-gray-300 disabled:opacity-40 rounded-xl transition"
                title="Undo to previous version"
              >
                <Undo2 className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  if (currentVersionIndex < versionHistory.length - 1) restoreVersion(currentVersionIndex + 1)
                }}
                disabled={currentVersionIndex >= versionHistory.length - 1}
                className="p-2 bg-gray-800 hover:bg-gray-700 text-gray-300 disabled:opacity-40 rounded-xl transition"
                title="Redo version"
              >
                <Redo2 className="w-4 h-4" />
              </button>

              <button
                onClick={() => setShowAiWorkspace(false)}
                className="px-4 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-300 border border-red-500/30 text-xs font-semibold rounded-xl transition"
              >
                Discard
              </button>

              <button
                onClick={handleAcceptWorkspaceChanges}
                className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold rounded-xl transition shadow-md"
              >
                <Check className="w-4 h-4" />
                Accept & Save Draft
              </button>
            </div>
          </div>

          {/* Main AI Workspace Content */}
          <div className="flex-1 min-h-0 flex relative overflow-hidden">

            {/* LEFT SIDEBAR: Conversational Chat & Follow-up Prompting (32% Width) */}
            <div className="w-[32%] min-w-[340px] max-w-[420px] bg-white border-r border-gray-200 flex flex-col min-h-0 shrink-0">
              
              {/* Chat Conversation Stream */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                
                {chatMessages.length === 0 ? (
                  <div className="py-8 text-center space-y-3">
                    <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center mx-auto">
                      <Sparkles className="w-6 h-6 fill-purple-600" />
                    </div>
                    <h3 className="font-bold text-sm text-[#111827]">Welcome to AI Design Studio</h3>
                    <p className="text-xs text-[#6B7280] max-w-xs mx-auto">
                      Type your design prompt below or pick a quick prompt to generate an email template.
                    </p>
                  </div>
                ) : (
                  chatMessages.map((msg) => (
                    <div key={msg.id} className="space-y-2">
                      {msg.role === 'user' ? (
                        <div className="bg-purple-50 border border-purple-100 rounded-2xl p-3.5 text-xs text-purple-950 font-medium ml-4">
                          <p className="font-bold text-[10px] text-purple-600 uppercase tracking-wide mb-1">You</p>
                          {msg.text}
                        </div>
                      ) : (
                        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-3.5 text-xs text-[#111827] space-y-3 mr-4 shadow-sm">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-indigo-600 flex items-center gap-1">
                              <Sparkles className="w-3.5 h-3.5 fill-indigo-600" /> Gemini Assistant
                            </span>
                            <span className="text-[10px] text-gray-400">{msg.timestamp}</span>
                          </div>

                          {/* Scores */}
                          <div className="grid grid-cols-2 gap-2">
                            <div className="p-2 bg-emerald-50 border border-emerald-200 rounded-xl text-center">
                              <span className="block text-[9px] font-bold text-emerald-800 uppercase">Brand Match</span>
                              <span className="text-base font-bold text-emerald-700">{msg.brandScore}%</span>
                            </div>
                            <div className="p-2 bg-indigo-50 border border-indigo-200 rounded-xl text-center">
                              <span className="block text-[9px] font-bold text-indigo-800 uppercase">Spam Risk</span>
                              <span className="text-base font-bold text-indigo-700">{msg.spamRisk}</span>
                            </div>
                          </div>

                          {/* Changes List */}
                          {msg.changes && msg.changes.length > 0 && (
                            <div className="space-y-1 pt-1">
                              <p className="font-bold text-[10px] text-[#6B7280] uppercase tracking-wide">Summary of Changes:</p>
                              {msg.changes.map((c, i) => (
                                <p key={i} className="text-[11px] text-[#111827] font-medium">• {c}</p>
                              ))}
                            </div>
                          )}

                          {/* Recommended Next Steps */}
                          {msg.suggestions && msg.suggestions.length > 0 && (
                            <div className="pt-2 border-t border-gray-200 space-y-1.5">
                              <p className="font-bold text-[10px] text-purple-600 uppercase tracking-wide">Recommended Next Steps:</p>
                              <div className="flex flex-wrap gap-1.5">
                                {msg.suggestions.map((sug, i) => (
                                  <button
                                    key={i}
                                    onClick={() => triggerAiWorkspaceGeneration(sug)}
                                    className="px-2.5 py-1 bg-purple-50 hover:bg-purple-100 border border-purple-200 text-purple-800 text-[11px] font-semibold rounded-lg transition text-left"
                                  >
                                    + {sug}
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))
                )}

                {/* Missing Fields Form Panel with Image URL Validation */}
                {missingFields.length > 0 && (
                  <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl space-y-3">
                    <div className="flex items-center gap-1.5 text-amber-900 font-bold text-xs">
                      <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                      <span>Campaign Details & Image URLs Required</span>
                    </div>
                    <div className="space-y-2">
                      {missingFields.map((field) => {
                        const isImg = isImageField(field)
                        const val = fieldAnswers[field] || ''
                        const invalidImg = isImg && val.length > 0 && !isValidUrl(val)

                        return (
                          <div key={field}>
                            <label className="block text-[10px] font-semibold text-amber-900 mb-0.5 flex items-center justify-between">
                              <span>{field}</span>
                              {isImg && <span className="text-[9px] text-amber-700 font-normal">HTTP/HTTPS URL required</span>}
                            </label>
                            <div className="relative">
                              {isImg && <ImageIcon className="w-3.5 h-3.5 text-amber-600 absolute left-2.5 top-2" />}
                              <input
                                type="text"
                                value={val}
                                onChange={(e) => setFieldAnswers({ ...fieldAnswers, [field]: e.target.value })}
                                placeholder={isImg ? "https://example.com/image.jpg" : `Enter ${field}...`}
                                className={`w-full ${isImg ? 'pl-8' : 'px-3'} py-1.5 bg-white border ${
                                  invalidImg ? 'border-red-400 focus:ring-red-500/20' : 'border-amber-300 focus:ring-amber-500/20'
                                } rounded-xl text-xs text-[#111827] focus:outline-none`}
                              />
                            </div>
                            {invalidImg && (
                              <p className="text-[10px] text-red-600 font-medium mt-0.5">
                                Must be a valid HTTP or HTTPS URL (e.g. https://domain.com/pic.png)
                              </p>
                            )}
                          </div>
                        )
                      })}
                    </div>
                    <button
                      onClick={() => triggerAiWorkspaceGeneration(aiPrompt, fieldAnswers)}
                      disabled={aiGenerating || missingFields.some(f => isImageField(f) && fieldAnswers[f] && !isValidUrl(fieldAnswers[f]))}
                      className="w-full py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl transition shadow-sm disabled:opacity-50"
                    >
                      Complete & Generate Design →
                    </button>
                  </div>
                )}
              </div>

              {/* Follow-up Prompt Input Box */}
              <div className="p-4 border-t border-gray-200 bg-white space-y-3 shrink-0 shadow-[0_-4px_12px_rgba(0,0,0,0.03)]">
                <div className="flex items-center justify-between text-[11px] font-bold text-[#6B7280] uppercase tracking-wide">
                  <span>Follow-up Prompting</span>
                  <span>AI Preserves Context</span>
                </div>
                <div className="relative">
                  <textarea
                    value={aiPrompt}
                    onChange={(e) => setAiPrompt(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault()
                        triggerAiWorkspaceGeneration()
                      }
                    }}
                    placeholder="e.g. 'Make the buttons rounded with purple background', 'Add a 3-column product list'..."
                    className="w-full h-20 p-3 bg-gray-50 border border-gray-200 rounded-xl text-xs text-[#111827] focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 focus:bg-white focus:outline-none placeholder:text-gray-400 resize-none transition"
                  />
                </div>
                <LoadingButton
                  onClick={() => triggerAiWorkspaceGeneration()}
                  loading={aiGenerating}
                  disabled={!aiPrompt.trim() && Object.keys(fieldAnswers).length === 0}
                  className="w-full py-2.5 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded-xl transition shadow-md flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  {aiGenerating ? "Generating Iteration..." : "Send Prompt Iteration"}
                </LoadingButton>
              </div>
            </div>

            {/* RIGHT SIDEBAR: Large Live Preview (68% Width) */}
            <div className="flex-1 min-h-0 flex flex-col bg-[#F8FAFC]">
              
              {/* Preview Header Bar */}
              <div className="px-6 py-3 border-b border-gray-200 bg-white flex items-center justify-between shrink-0 shadow-sm">
                <div className="flex items-center gap-2 text-xs font-bold text-[#111827]">
                  <Eye className="w-4 h-4 text-purple-600" />
                  <span>Real-Time Email Render Viewport</span>
                </div>

                {/* Viewport Toggles: Desktop / Mobile / Inbox */}
                <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-xl border border-gray-200 text-xs">
                  <button
                    onClick={() => setPreviewTab('desktop')}
                    className={`px-3 py-1 flex items-center gap-1.5 font-semibold rounded-lg transition ${previewTab === 'desktop' ? 'bg-white text-[#111827] shadow-sm' : 'text-[#6B7280] hover:text-[#111827]'}`}
                  >
                    <Monitor className="w-3.5 h-3.5" /> Desktop
                  </button>
                  <button
                    onClick={() => setPreviewTab('mobile')}
                    className={`px-3 py-1 flex items-center gap-1.5 font-semibold rounded-lg transition ${previewTab === 'mobile' ? 'bg-white text-[#111827] shadow-sm' : 'text-[#6B7280] hover:text-[#111827]'}`}
                  >
                    <Smartphone className="w-3.5 h-3.5" /> Mobile
                  </button>
                  <button
                    onClick={() => setPreviewTab('inbox')}
                    className={`px-3 py-1 flex items-center gap-1.5 font-semibold rounded-lg transition ${previewTab === 'inbox' ? 'bg-white text-[#111827] shadow-sm' : 'text-[#6B7280] hover:text-[#111827]'}`}
                  >
                    <Inbox className="w-3.5 h-3.5" /> Gmail Inbox
                  </button>
                </div>
              </div>

              {/* Live Preview Screen */}
              <div className="flex-1 min-h-0 p-6 overflow-auto flex items-start justify-center">
                {previewTab === 'desktop' ? (
                  <div className="w-full max-w-4xl h-full min-h-[620px] bg-white rounded-2xl border border-gray-200 shadow-md overflow-hidden flex flex-col">
                    <iframe
                      srcDoc={workspacePreviewHtml}
                      title="Workspace desktop preview"
                      className="w-full h-full border-0 flex-1"
                    />
                  </div>
                ) : previewTab === 'mobile' ? (
                  <div className="relative w-[375px] h-[720px] bg-white rounded-[2.5rem] border-[10px] border-gray-900 shadow-2xl overflow-hidden shrink-0 my-auto">
                    <div className="absolute top-0 inset-x-0 h-5 bg-gray-900 rounded-b-2xl w-32 mx-auto z-10"></div>
                    <iframe
                      srcDoc={workspacePreviewHtml}
                      title="Workspace mobile preview"
                      className="w-full h-full border-0"
                    />
                  </div>
                ) : (
                  // Gmail Inbox Row Preview
                  <div className="w-full max-w-2xl bg-white border border-gray-200 rounded-2xl shadow-md p-6 space-y-4">
                    <h4 className="text-xs font-bold text-[#6B7280] uppercase tracking-wide">Gmail Inbox Row Preview</h4>
                    <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-purple-600 text-white font-bold flex items-center justify-center shrink-0">
                        B
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-sm text-[#111827]">BulkyMailer Team</span>
                          <span className="text-xs text-[#6B7280]">10:45 AM</span>
                        </div>
                        <p className="text-xs font-semibold text-[#111827] truncate">{name || 'Your Campaign Email'}</p>
                        <p className="text-xs text-[#6B7280] truncate">Exclusive updates inside for your BulkyMailer campaign...</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
