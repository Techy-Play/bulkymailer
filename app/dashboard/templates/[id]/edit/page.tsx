'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Editor from '@monaco-editor/react'
import { ArrowLeft, Monitor, Smartphone, Tag, ChevronDown, ChevronRight, Mail, Send, X, Check, Loader2 } from 'lucide-react'
import { LoadingButton } from '@/components/ui/loading-button'

export const dynamic = 'force-dynamic'

export default function TemplateEditorPage({ params }: { params: Promise<{ id: string }> }) {
  const [templateId, setTemplateId] = useState('')
  const [name, setName] = useState('Loading...')
  const [category, setCategory] = useState('GENERAL')
  const [htmlContent, setHtmlContent] = useState('')
  const [previewHtml, setPreviewHtml] = useState('')
  const [previewTab, setPreviewTab] = useState<'desktop' | 'mobile'>('desktop')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  
  const [showTestEmail, setShowTestEmail] = useState(false)
  const [testEmail, setTestEmail] = useState('')
  const [testEmailSending, setTestEmailSending] = useState(false)
  const [testEmailResult, setTestEmailResult] = useState('')
  
  const [showMergeTags, setShowMergeTags] = useState(false)
  const editorRef = useRef<any>(null)
  const previewTimerRef = useRef<NodeJS.Timeout | null>(null)

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
        setName(data.name)
        setCategory(data.category)
        setHtmlContent(data.htmlContent)
        setPreviewHtml(data.htmlContent)
      }
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  async function handleSave() {
    if (!templateId) return
    setSaving(true)
    try {
      const res = await fetch(`/api/templates/${templateId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, category, htmlContent }),
      })
      if (!res.ok) throw new Error('Failed to save')
      setSaved(true)
      setTimeout(() => setSaved(false), 2500)
    } catch (e) {
      console.error(e)
    } finally {
      setSaving(false)
    }
  }

  function insertTag(tag: string) {
    const editor = editorRef.current
    if (!editor) return
    const selection = editor.getSelection()
    if (selection) {
      editor.executeEdits('merge-tag', [{ range: selection, text: tag, forceMoveMarkers: true }])
    }
    editor.focus()
  }

  async function sendTestEmail() {
    if (!testEmail || !templateId) return
    setTestEmailSending(true)
    setTestEmailResult('')
    try {
      const res = await fetch(`/api/templates/${templateId}/test-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ testEmail }),
      })
      if (res.ok) {
        setTestEmailResult('✓ Test email sent!')
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

  return (
    <div className="h-screen overflow-hidden flex flex-col bg-[#F8FAFC]">
      {/* Top Bar */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-4 shrink-0 shadow-sm z-10">
        <Link 
          href="/dashboard/templates" 
          className="p-2 text-[#6B7280] hover:text-[#111827] hover:bg-gray-100 rounded-xl transition"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div className="flex-1 flex items-center gap-4">
          <input 
            type="text" 
            value={name} 
            onChange={e => setName(e.target.value)} 
            className="text-lg font-bold text-[#111827] bg-transparent border-none outline-none focus:ring-2 focus:ring-indigo-400/30 rounded-lg px-2" 
          />
          <select 
            value={category} 
            onChange={e => setCategory(e.target.value)} 
            className="px-3 py-1.5 border border-gray-200 bg-gray-50 rounded-lg text-sm text-[#111827] focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400"
          >
            <option value="GENERAL">General</option>
            <option value="NEWSLETTER">Newsletter</option>
            <option value="PROMOTIONAL">Promotional</option>
            <option value="TRANSACTIONAL">Transactional</option>
            <option value="PERSONALIZED">Personalized</option>
          </select>
          {saved && (
            <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1 bg-emerald-50 px-2 py-1 rounded-md">
              <Check className="w-3.5 h-3.5" /> Saved
            </span>
          )}
        </div>
        
        <div className="flex items-center gap-3">
          {/* Test Email Popover */}
          <div className="relative">
            <button 
              onClick={() => setShowTestEmail(!showTestEmail)}
              className="flex items-center gap-2 px-3 py-2 text-sm text-[#6B7280] hover:text-[#111827] hover:bg-gray-100 rounded-xl transition font-medium"
            >
              <Mail className="w-4 h-4" /> Send Test Email
            </button>
            {showTestEmail && (
              <div className="absolute top-full right-0 mt-2 w-72 bg-white border border-gray-200 rounded-2xl shadow-xl p-4 z-50">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-bold text-[#111827]">Send Test Email</h4>
                  <button onClick={() => setShowTestEmail(false)} className="text-[#6B7280] hover:text-[#111827]">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="space-y-3">
                  <input 
                    type="email" 
                    value={testEmail}
                    onChange={e => setTestEmail(e.target.value)}
                    placeholder="Enter email address"
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm text-[#111827] focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 focus:outline-none"
                  />
                  <LoadingButton 
                    onClick={sendTestEmail}
                    loading={testEmailSending}
                    disabled={!testEmail}
                    className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-xl transition shadow-sm"
                  >
                    Send Test
                  </LoadingButton>
                  {testEmailResult && (
                    <p className={`text-xs font-medium text-center ${testEmailResult.includes('✓') ? 'text-emerald-600' : 'text-red-600'}`}>
                      {testEmailResult}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>

          <LoadingButton 
            onClick={handleSave} 
            loading={saving}
            className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-xl transition shadow-sm"
          >
            Save Template
          </LoadingButton>
        </div>
      </div>

      {/* Main Area */}
      <div className="flex-1 min-h-0 flex">
        {/* LEFT: Editor */}
        <div className="w-[55%] flex flex-col min-h-0 border-r border-gray-200 bg-white">
          <div className="flex-1 min-h-0">
            <Editor
              height="calc(100vh - 120px)"
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
                padding: { top: 16 },
              }}
            />
          </div>

          <div className="border-t border-gray-200 bg-white shrink-0 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] relative z-20">
            <button 
              onClick={() => setShowMergeTags(v => !v)}
              className="w-full flex items-center gap-2 px-4 py-3 text-sm font-semibold text-[#6B7280] hover:bg-gray-50 transition"
            >
              {showMergeTags ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              <span className="flex items-center gap-1.5"><Tag className="w-4 h-4" /> Merge Tags</span>
            </button>
            {showMergeTags && (
              <div className="px-4 pb-4 pt-1 flex flex-wrap gap-2">
                {['{{firstName}}', '{{lastName}}', '{{email}}', '{{company}}', '{{unsubscribeUrl}}'].map(tag => (
                  <button key={tag} onClick={() => insertTag(tag)}
                    className="px-3 py-1.5 bg-gray-50 border border-gray-200 text-[#111827] text-xs font-mono rounded-lg hover:border-indigo-300 hover:bg-indigo-50 transition shadow-sm">
                    {tag}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* RIGHT: Live Preview */}
        <div className="w-[45%] flex flex-col min-h-0 bg-[#F8FAFC]">
          <div className="flex justify-center p-3 border-b border-gray-200 bg-white shrink-0">
            <div className="flex items-center gap-1 bg-gray-50 p-1 rounded-xl border border-gray-200">
              <button 
                onClick={() => setPreviewTab('desktop')}
                className={`px-4 py-1.5 flex items-center gap-1.5 text-sm font-medium rounded-lg transition ${
                  previewTab === 'desktop' ? 'bg-white text-[#111827] shadow-sm' : 'text-[#6B7280] hover:text-[#111827]'
                }`}
              >
                <Monitor className="w-4 h-4" /> Desktop
              </button>
              <button 
                onClick={() => setPreviewTab('mobile')}
                className={`px-4 py-1.5 flex items-center gap-1.5 text-sm font-medium rounded-lg transition ${
                  previewTab === 'mobile' ? 'bg-white text-[#111827] shadow-sm' : 'text-[#6B7280] hover:text-[#111827]'
                }`}
              >
                <Smartphone className="w-4 h-4" /> Mobile
              </button>
            </div>
          </div>

          <div className="flex-1 min-h-0 overflow-auto flex items-start justify-center p-6">
            {previewTab === 'desktop' ? (
              <div className="w-full max-w-3xl bg-white shadow-md border border-gray-200" style={{ height: '500px' }}>
                <iframe srcDoc={previewHtml} title="Desktop preview" className="w-full h-full border-0" />
              </div>
            ) : (
              <div className="relative w-[375px] h-[812px] bg-white rounded-[3rem] border-[12px] border-gray-900 shadow-xl overflow-hidden shrink-0">
                <div className="absolute top-0 inset-x-0 h-6 bg-gray-900 rounded-b-3xl w-40 mx-auto z-10"></div>
                <iframe srcDoc={previewHtml} title="Mobile preview" className="w-full h-full border-0" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
