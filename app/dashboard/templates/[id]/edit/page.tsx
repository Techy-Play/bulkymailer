'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import Editor from '@monaco-editor/react'
import {
  ArrowLeft, Monitor, Smartphone, Inbox, Code2, Sparkles, Mail, Send, X, Check,
  Loader2, Wand2, History, Undo2, Redo2, ShieldCheck, AlertCircle, Eye, ChevronDown, ChevronUp,
  Layers, GripVertical, Building, CheckCircle2, Zap, MessageSquare, RefreshCw
} from 'lucide-react'

import { TemplateJSONNode, ValidationIssue, DesignTokens } from '@/lib/editor/types'
import { CommandManager, createUpdatePropCommand, createUpdateStyleCommand } from '@/lib/editor/commands'
import { EditorEventBus } from '@/lib/editor/events'
import { tokenEngine } from '@/lib/editor/tokens'
import { createDefaultTemplateJSON, validateAndParseMonacoHTML, compileHTMLToNodeTree } from '@/lib/editor/compiler'
import { serializeJSONToEmailHTML } from '@/lib/editor/serializer'
import { runFullValidationCheck } from '@/lib/editor/validation'
import { saveTemplateJSONToDatabase } from '@/lib/editor/db-sync'

import { Canvas } from '@/components/editor/Canvas'
import { Inspector } from '@/components/editor/Inspector'
import { Breadcrumb } from '@/components/editor/Breadcrumb'
import { TimelineModal, TimelineSnapshot } from '@/components/editor/TimelineModal'
import { LoadingButton } from '@/components/ui/loading-button'

export const dynamic = 'force-dynamic'

const AI_PRESETS = [
  { label: "🎨 Change to Dark Mode", prompt: "Convert this email template background and text to a sleek dark mode theme with vibrant indigo CTA buttons." },
  { label: "🔥 High-Converting CTA", prompt: "Make the main call-to-action button prominent, full-width, rounded with a subtle drop shadow and urgent text." },
  { label: "✨ Modern Newsletter Layout", prompt: "Restructure this email into a clean modern newsletter with hero image, header logo, and 2-column feature blocks." },
  { label: "🎁 Add Promo Coupon Banner", prompt: "Add a high-converting promotional banner section with discount code 'SAVE20' and a countdown tag." },
  { label: "📱 Mobile Optimization", prompt: "Ensure all padding, font sizes, and buttons are perfectly optimized for mobile screen readability." },
]

export default function TemplateEditorPage({ params }: { params: Promise<{ id: string }> }) {
  const [templateId, setTemplateId] = useState('')
  const [name, setName] = useState('Loading...')
  const [category, setCategory] = useState('GENERAL')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [lastSavedTime, setLastSavedTime] = useState<string | null>(null)

  // Editor State
  const [rootNode, setRootNode] = useState<TemplateJSONNode>(createDefaultTemplateJSON())
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null)
  const [htmlContent, setHtmlContent] = useState('')
  const [previewTab, setPreviewTab] = useState<'desktop' | 'mobile' | 'inbox'>('desktop')

  // History & Command Engine Ref
  const commandManagerRef = useRef<CommandManager>(new CommandManager(createDefaultTemplateJSON()))
  const [canUndo, setCanUndo] = useState(false)
  const [canRedo, setCanRedo] = useState(false)

  // Health Panel Issues & Score
  const [healthIssues, setHealthIssues] = useState<ValidationIssue[]>([])
  const [healthScore, setHealthScore] = useState(100)

  // Design Tokens
  const [tokens, setTokens] = useState<DesignTokens>(tokenEngine.getTokens())

  // Code Editor Drawer Toggle
  const [showCodeEditor, setShowCodeEditor] = useState(false)

  // Version Timeline Snapshots
  const [snapshots, setSnapshots] = useState<TimelineSnapshot[]>([])
  const [currentSnapshotId, setCurrentSnapshotId] = useState('')
  const [showTimelineModal, setShowTimelineModal] = useState(false)

  // AI Design Studio Modal State
  const [showAiWorkspace, setShowAiWorkspace] = useState(false)
  const [aiPrompt, setAiPrompt] = useState('')
  const [aiGenerating, setAiGenerating] = useState(false)
  const [aiError, setAiError] = useState('')
  const [aiResponseData, setAiResponseData] = useState<any>(null)
  const [aiPreviewHtml, setAiPreviewHtml] = useState<string>('')
  const [aiPreviewTab, setAiPreviewTab] = useState<'desktop' | 'mobile'>('desktop')

  // Test Email Modal State
  const [showTestEmailModal, setShowTestEmailModal] = useState(false)
  const [testEmail, setTestEmail] = useState('')
  const [testFirstName, setTestFirstName] = useState('Rahul')
  const [testLastName, setTestLastName] = useState('Sharma')
  const [testCompany, setTestCompany] = useState('Tech Corp')
  const [testEmailSending, setTestEmailSending] = useState(false)
  const [testEmailResult, setTestEmailResult] = useState('')

  const editorRef = useRef<any>(null)
  const syncTimerRef = useRef<NodeJS.Timeout | null>(null)

  // 1. Initial Data Fetch
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

        let initialRoot = createDefaultTemplateJSON()
        if (tpl.jsonTree && typeof tpl.jsonTree === 'object') {
          initialRoot = tpl.jsonTree
        } else if (tpl.htmlContent && tpl.htmlContent.trim()) {
          initialRoot = compileHTMLToNodeTree(tpl.htmlContent)
        }

        setRootNode(initialRoot)
        commandManagerRef.current = new CommandManager(initialRoot)

        if (initialRoot.children && initialRoot.children.length > 0) {
          setSelectedNodeId(initialRoot.children[0].id)
        } else {
          setSelectedNodeId(null)
        }

        const initialHtml = tpl.htmlContent || serializeJSONToEmailHTML(initialRoot)
        setHtmlContent(initialHtml)
        setAiPreviewHtml(initialHtml)

        const issues = runFullValidationCheck(initialRoot)
        setHealthIssues(issues)

        const initSnap: TimelineSnapshot = {
          id: `snap-init`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          name: 'Initial State',
          root: initialRoot,
        }
        setSnapshots([initSnap])
        setCurrentSnapshotId(initSnap.id)
      }
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  // 2. Editor Event Bus Subscriptions
  useEffect(() => {
    const unsubCmd = EditorEventBus.on('CommandExecuted', (payload) => {
      setRootNode(payload.root)
      setCanUndo(payload.canUndo)
      setCanRedo(payload.canRedo)

      if (syncTimerRef.current) clearTimeout(syncTimerRef.current)
      syncTimerRef.current = setTimeout(() => {
        const compiledHtml = serializeJSONToEmailHTML(payload.root)
        setHtmlContent(compiledHtml)
        if (editorRef.current) {
          editorRef.current.setValue(compiledHtml)
        }
        const issues = runFullValidationCheck(payload.root)
        setHealthIssues(issues)
      }, 200)
    })

    const unsubHealth = EditorEventBus.on('HealthCheckCompleted', (payload) => {
      setHealthIssues(payload.issues)
      setHealthScore(payload.score)
    })

    const unsubTheme = EditorEventBus.on('ThemeChanged', (payload) => {
      setTokens(payload.tokens)
    })

    return () => {
      unsubCmd()
      unsubHealth()
      unsubTheme()
    }
  }, [])

  // 3. Keyboard Shortcuts Listener
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
      } else if ((e.key === 'Delete' || e.key === 'Backspace') && selectedNodeId && document.activeElement?.tagName === 'BODY') {
        e.preventDefault()
        handleDeleteNode(selectedNodeId)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedNodeId])

  // Command Action Handlers
  const handleUndo = () => {
    const newRoot = commandManagerRef.current.undo()
    if (newRoot) setRootNode(newRoot)
  }

  const handleRedo = () => {
    const newRoot = commandManagerRef.current.redo()
    if (newRoot) setRootNode(newRoot)
  }

  const handleUpdateProp = useCallback((nodeId: string, propKey: string, value: any) => {
    const cmd = createUpdatePropCommand(nodeId, propKey, value)
    commandManagerRef.current.execute(cmd)
  }, [])

  const handleUpdateStyle = useCallback((nodeId: string, styleKey: string, value: any) => {
    const cmd = createUpdateStyleCommand(nodeId, styleKey, value)
    commandManagerRef.current.execute(cmd)
  }, [])

  const handleMoveNode = useCallback((nodeId: string, direction: 'up' | 'down') => {
    const root = commandManagerRef.current.getRoot()
    if (!root.children) return
    const idx = root.children.findIndex(c => c.id === nodeId)
    if (idx === -1) return
    const targetIdx = direction === 'up' ? idx - 1 : idx + 1
    if (targetIdx < 0 || targetIdx >= root.children.length) return

    const newChildren = [...root.children]
    const [moved] = newChildren.splice(idx, 1)
    newChildren.splice(targetIdx, 0, moved)

    const updatedRoot = { ...root, children: newChildren }
    commandManagerRef.current.setRoot(updatedRoot)
    setRootNode(updatedRoot)

    const compiledHtml = serializeJSONToEmailHTML(updatedRoot)
    setHtmlContent(compiledHtml)
  }, [])

  const handleAddComponent = useCallback((type: 'hero' | 'heading' | 'text' | 'button' | 'image' | 'product' | 'footer') => {
    const root = commandManagerRef.current.getRoot()
    const timestamp = Date.now()

    let newNode: TemplateJSONNode
    if (type === 'hero') {
      newNode = {
        id: `hero-${timestamp}`,
        type: 'hero',
        name: 'Hero Section',
        version: 1,
        capabilities: { resize: true, duplicate: true, delete: true, move: true, inlineEdit: true, ai: true },
        props: { title: 'New Hero Title', subtitle: 'Describe your offer or feature here', buttonText: 'Explore Now →', buttonHref: 'https://example.com' },
        style: { backgroundColor: '#4F46E5', textColor: '#FFFFFF', paddingTop: '40px', paddingBottom: '40px', align: 'center' }
      }
    } else if (type === 'heading') {
      newNode = {
        id: `heading-${timestamp}`,
        type: 'heading',
        name: 'Section Heading',
        version: 1,
        capabilities: { resize: false, duplicate: true, delete: true, move: true, inlineEdit: true, ai: true },
        props: { content: 'New Section Heading' },
        style: { textColor: '#111827', fontSize: '22px', fontWeight: '700', align: 'left' }
      }
    } else if (type === 'button') {
      newNode = {
        id: `button-${timestamp}`,
        type: 'button',
        name: 'Call to Action Button',
        version: 1,
        capabilities: { resize: false, duplicate: true, delete: true, move: true, inlineEdit: true, ai: true },
        props: { text: 'Click Here →', href: 'https://example.com' },
        style: { backgroundColor: '#4F46E5', textColor: '#FFFFFF', borderRadius: '8px', paddingTop: '10px', paddingBottom: '10px', paddingLeft: '24px', paddingRight: '24px' }
      }
    } else if (type === 'image') {
      newNode = {
        id: `image-${timestamp}`,
        type: 'image',
        name: 'Image Banner',
        version: 1,
        capabilities: { resize: true, duplicate: true, delete: true, move: true, inlineEdit: true, ai: true },
        props: { src: 'https://placehold.co/600x300/4f46e5/ffffff?text=Image+Banner', alt: 'Sample image', width: '560' },
        style: { borderRadius: '12px' }
      }
    } else if (type === 'product') {
      newNode = {
        id: `product-${timestamp}`,
        type: 'product',
        name: 'Product Card',
        version: 1,
        capabilities: { resize: false, duplicate: true, delete: true, move: true, inlineEdit: true, ai: true },
        props: { title: 'Featured Product Name', price: '$49.00', image: 'https://placehold.co/400x300/111827/ffffff?text=Product', buttonText: 'Buy Now' },
        style: { backgroundColor: '#F9FAFB', borderRadius: '16px' }
      }
    } else if (type === 'footer') {
      newNode = {
        id: `footer-${timestamp}`,
        type: 'footer',
        name: 'Footer',
        locked: true,
        version: 1,
        capabilities: { resize: false, duplicate: false, delete: false, move: false, inlineEdit: false, ai: false },
        props: { companyName: 'Your Company Name', address: '123 Main Street, Suite 400', unsubscribeUrl: '{{unsubscribeUrl}}' },
        style: { backgroundColor: '#F9FAFB', textColor: '#9CA3AF' }
      }
    } else {
      newNode = {
        id: `text-${timestamp}`,
        type: 'text',
        name: 'Paragraph Text',
        version: 1,
        capabilities: { resize: false, duplicate: true, delete: true, move: true, inlineEdit: true, ai: true },
        props: { content: 'Enter paragraph text content here...' },
        style: { textColor: '#374151', fontSize: '15px' }
      }
    }

    const existingChildren = root.children || []
    const updatedRoot = { ...root, children: [...existingChildren, newNode] }
    commandManagerRef.current.setRoot(updatedRoot)
    setRootNode(updatedRoot)
    setSelectedNodeId(newNode.id)

    const compiledHtml = serializeJSONToEmailHTML(updatedRoot)
    setHtmlContent(compiledHtml)
    if (editorRef.current) {
      editorRef.current.setValue(compiledHtml)
    }
  }, [])

  const handleDuplicateNode = useCallback((nodeId: string) => {
    const root = commandManagerRef.current.getRoot()
    if (!root.children) return
    const target = root.children.find(c => c.id === nodeId)
    if (!target) return

    const clonedNode: TemplateJSONNode = {
      ...JSON.parse(JSON.stringify(target)),
      id: `${target.type}-${Date.now()}`,
      name: `${target.name || target.type} (Copy)`,
    }

    const updatedRoot = { ...root, children: [...root.children, clonedNode] }
    commandManagerRef.current.setRoot(updatedRoot)
    setRootNode(updatedRoot)

    const compiledHtml = serializeJSONToEmailHTML(updatedRoot)
    setHtmlContent(compiledHtml)
  }, [])

  const handleDeleteNode = useCallback((nodeId: string) => {
    const root = commandManagerRef.current.getRoot()
    if (!root.children) return
    const target = root.children.find(c => c.id === nodeId)
    if (!target || target.locked) return

    const updatedRoot = { ...root, children: root.children.filter(c => c.id !== nodeId) }
    commandManagerRef.current.setRoot(updatedRoot)
    setRootNode(updatedRoot)
    setSelectedNodeId(null)

    const compiledHtml = serializeJSONToEmailHTML(updatedRoot)
    setHtmlContent(compiledHtml)
  }, [])

  const handleToggleLock = useCallback((nodeId: string) => {
    const root = commandManagerRef.current.getRoot()
    function toggle(node: TemplateJSONNode) {
      if (node.id === nodeId) {
        node.locked = !node.locked
      }
      if (node.children) node.children.forEach(toggle)
    }
    const cloned = JSON.parse(JSON.stringify(root))
    toggle(cloned)
    commandManagerRef.current.setRoot(cloned)
    setRootNode(cloned)
  }, [])

  // Save to DB
  async function handleSave() {
    if (!templateId) return
    setSaving(true)
    try {
      const currentHtml = serializeJSONToEmailHTML(rootNode)
      const success = await saveTemplateJSONToDatabase(templateId, rootNode, currentHtml)
      if (success) {
        setSaved(true)
        setLastSavedTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }))
        setTimeout(() => setSaved(false), 2500)

        const newSnap: TimelineSnapshot = {
          id: `snap-${Date.now()}`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          name: `Manual Draft Save`,
          root: rootNode,
        }
        setSnapshots(prev => [newSnap, ...prev])
        setCurrentSnapshotId(newSnap.id)
      }
    } catch (e) {
      console.error(e)
    } finally {
      setSaving(false)
    }
  }

  // Trigger AI Generation with Real-Time Preview & Visual Node Updating
  async function triggerAiGeneration(promptToRun?: string) {
    const promptText = promptToRun || aiPrompt
    if (!promptText.trim()) return

    setAiPrompt('')
    setAiGenerating(true)
    setAiError('')
    setAiResponseData(null)

    try {
      const selectedNode = selectedNodeId ? rootNode.children?.find(c => c.id === selectedNodeId) : null

      const res = await fetch('/api/ai/template-generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: promptText,
          selectedNode: selectedNode ? { id: selectedNode.id, type: selectedNode.type, props: selectedNode.props } : null,
          currentHtml: htmlContent || serializeJSONToEmailHTML(rootNode),
        }),
      })

      const data = await res.json()
      if (!res.ok) {
        setAiError(data.error || 'Failed to generate template')
        setAiGenerating(false)
        return
      }

      setAiResponseData(data)

      if (data.html) {
        const generatedHtml = data.html
        setAiPreviewHtml(generatedHtml)

        // Compile HTML to structured Node Tree for visual canvas
        const compiledRoot = compileHTMLToNodeTree(generatedHtml)
        commandManagerRef.current.setRoot(compiledRoot)
        setRootNode(compiledRoot)
        setHtmlContent(generatedHtml)

        if (editorRef.current) {
          editorRef.current.setValue(generatedHtml)
        }

        if (compiledRoot.children && compiledRoot.children.length > 0) {
          setSelectedNodeId(compiledRoot.children[0].id)
        }

        const aiSnap: TimelineSnapshot = {
          id: `snap-ai-${Date.now()}`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          name: `AI: ${promptText.substring(0, 24)}...`,
          root: compiledRoot,
        }
        setSnapshots(prev => [aiSnap, ...prev])
        setCurrentSnapshotId(aiSnap.id)
      }
    } catch (err: any) {
      setAiError(err.message || 'Error executing AI generation')
    } finally {
      setAiGenerating(false)
    }
  }

  // Send Test Email
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

  const selectedNode = selectedNodeId ? rootNode.children?.find(c => c.id === selectedNodeId) || (rootNode.id === selectedNodeId ? rootNode : null) : null

  return (
    <div className="h-screen -m-6 flex flex-col bg-[#F8FAFC] overflow-hidden">
      
      {/* Top Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-2.5 flex items-center gap-4 shrink-0 shadow-2xs z-20">
        <Link href="/dashboard/templates" className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition">
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
            className="px-2.5 py-1 border border-gray-200 bg-gray-50 rounded-lg text-xs text-[#111827] focus:outline-none"
          >
            <option value="GENERAL">General</option>
            <option value="NEWSLETTER">Newsletter</option>
            <option value="PROMOTIONAL">Promotional</option>
            <option value="TRANSACTIONAL">Transactional</option>
            <option value="PERSONALIZED">Personalized</option>
          </select>

          {lastSavedTime && (
            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-md font-medium">
              Saved at {lastSavedTime}
            </span>
          )}
          {saved && (
            <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1 bg-emerald-50 px-2 py-0.5 rounded-md">
              <Check className="w-3.5 h-3.5" /> Saved
            </span>
          )}
        </div>

        {/* Action Controls Header */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleUndo}
            disabled={!canUndo}
            className="p-2 bg-gray-100 hover:bg-gray-200 text-gray-700 disabled:opacity-30 rounded-xl transition"
            title="Undo (Ctrl+Z)"
          >
            <Undo2 className="w-4 h-4" />
          </button>
          <button
            onClick={handleRedo}
            disabled={!canRedo}
            className="p-2 bg-gray-100 hover:bg-gray-200 text-gray-700 disabled:opacity-30 rounded-xl transition"
            title="Redo (Ctrl+Shift+Z)"
          >
            <Redo2 className="w-4 h-4" />
          </button>

          <button
            onClick={() => setShowTimelineModal(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 rounded-xl font-medium transition"
          >
            <History className="w-3.5 h-3.5 text-purple-600" />
            Timeline ({snapshots.length})
          </button>

          {/* AI Assistant Button */}
          <button
            onClick={() => setShowAiWorkspace(true)}
            className="flex items-center gap-2 px-3.5 py-1.5 text-xs font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 rounded-xl transition shadow-xs"
          >
            <Sparkles className="w-4 h-4 fill-white" />
            ✨ AI Assistant
          </button>

          <button
            onClick={() => setShowTestEmailModal(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 rounded-xl transition"
          >
            <Mail className="w-3.5 h-3.5 text-indigo-600" /> Test Email
          </button>

          <button
            onClick={() => setShowCodeEditor(!showCodeEditor)}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl transition border ${
              showCodeEditor ? "bg-gray-900 text-white border-gray-900" : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            {showCodeEditor ? "Hide Code" : "Monaco Code"}
          </button>

          <LoadingButton
            onClick={handleSave}
            loading={saving}
            className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl transition shadow-xs"
          >
            Save Draft
          </LoadingButton>
        </div>
      </div>

      {/* Main Workspace: Visual Canvas (Left) & Inspector (Right) */}
      <div className="flex-1 min-h-0 flex relative overflow-hidden">
        
        {/* CENTER VIEWPORT: Interactive Direct Viewport */}
        <div className="flex-1 min-h-0 flex flex-col bg-[#F8FAFC]">
          
          <Breadcrumb
            root={rootNode}
            selectedNodeId={selectedNodeId}
            onSelectNode={(nodeId) => setSelectedNodeId(nodeId)}
          />

          <div className="flex items-center justify-between px-6 py-2 border-b border-gray-200 bg-white shrink-0 shadow-2xs">
            <div className="flex items-center gap-2 text-xs font-bold text-[#111827]">
              <Eye className="w-4 h-4 text-indigo-600" />
              <span>Interactive Direct Manipulation Viewport</span>
            </div>

            <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-xl border border-gray-200 text-xs">
              <button
                onClick={() => setPreviewTab('desktop')}
                className={`px-3 py-1 flex items-center gap-1.5 font-semibold rounded-lg transition ${previewTab === 'desktop' ? 'bg-white text-[#111827] shadow-2xs' : 'text-gray-500'}`}
              >
                <Monitor className="w-3.5 h-3.5" /> Desktop
              </button>
              <button
                onClick={() => setPreviewTab('mobile')}
                className={`px-3 py-1 flex items-center gap-1.5 font-semibold rounded-lg transition ${previewTab === 'mobile' ? 'bg-white text-[#111827] shadow-2xs' : 'text-gray-500'}`}
              >
                <Smartphone className="w-3.5 h-3.5" /> Mobile
              </button>
              <button
                onClick={() => setPreviewTab('inbox')}
                className={`px-3 py-1 flex items-center gap-1.5 font-semibold rounded-lg transition ${previewTab === 'inbox' ? 'bg-white text-[#111827] shadow-2xs' : 'text-gray-500'}`}
              >
                <Inbox className="w-3.5 h-3.5" /> Inbox
              </button>
            </div>
          </div>

          <Canvas
            root={rootNode}
            selectedNodeId={selectedNodeId}
            previewTab={previewTab}
            onSelectNode={(nodeId) => setSelectedNodeId(nodeId)}
            onUpdateProp={handleUpdateProp}
            onUpdateStyle={handleUpdateStyle}
            onMoveNode={handleMoveNode}
            onDuplicateNode={handleDuplicateNode}
            onDeleteNode={handleDeleteNode}
            onToggleLock={handleToggleLock}
            onAskAI={(node, prompt) => {
              setSelectedNodeId(node.id)
              setAiPrompt(prompt)
              setShowAiWorkspace(true)
            }}
          />
        </div>

        {/* RIGHT PANEL: Figma Inspector */}
        <Inspector
          selectedNode={selectedNode}
          tokens={tokens}
          issues={healthIssues}
          healthScore={healthScore}
          onUpdateProp={handleUpdateProp}
          onUpdateStyle={handleUpdateStyle}
          onUpdateTokens={(newTokens) => tokenEngine.updateTokens(newTokens)}
          onToggleLock={handleToggleLock}
          onDeleteNode={handleDeleteNode}
          onDuplicateNode={handleDuplicateNode}
          onSelectNode={(nodeId) => setSelectedNodeId(nodeId)}
          onAddComponent={handleAddComponent}
        />
      </div>

      {/* Monaco Code Drawer */}
      <div className={`bg-white border-t border-gray-200 transition-all duration-300 flex flex-col shrink-0 z-30 ${
        showCodeEditor ? 'h-[360px]' : 'h-10'
      }`}>
        <button
          onClick={() => setShowCodeEditor(!showCodeEditor)}
          className="w-full h-10 px-4 flex items-center justify-between bg-gray-900 text-white text-xs font-semibold hover:bg-black transition shrink-0"
        >
          <div className="flex items-center gap-2">
            <Code2 className="w-4 h-4 text-purple-400" />
            <span>Monaco HTML Code Editor (Transaction Buffer Compiled)</span>
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
                const newHtml = v || ''
                setHtmlContent(newHtml)
                const compilerResult = validateAndParseMonacoHTML(newHtml, rootNode)
                if (compilerResult.valid && compilerResult.nodeTree) {
                  commandManagerRef.current.setRoot(compilerResult.nodeTree)
                  setRootNode(compilerResult.nodeTree)
                }
              }}
              options={{
                minimap: { enabled: false },
                fontSize: 13,
                wordWrap: 'on',
                scrollBeyondLastLine: false,
                formatOnPaste: true,
              }}
            />
          </div>
        )}
      </div>

      {/* Timeline Snapshot History Drawer */}
      <TimelineModal
        isOpen={showTimelineModal}
        snapshots={snapshots}
        currentSnapshotId={currentSnapshotId}
        onClose={() => setShowTimelineModal(false)}
        onRestoreSnapshot={(snap) => {
          commandManagerRef.current.setRoot(snap.root)
          setRootNode(snap.root)
          setCurrentSnapshotId(snap.id)
          const compiledHtml = serializeJSONToEmailHTML(snap.root)
          setHtmlContent(compiledHtml)
        }}
      />

      {/* Advanced Test Email Modal */}
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
              <button onClick={() => setShowTestEmailModal(false)} className="p-1 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-[11px] font-bold text-[#6B7280] uppercase tracking-wide mb-1">Recipient Email *</label>
                <input
                  type="email"
                  value={testEmail}
                  onChange={(e) => setTestEmail(e.target.value)}
                  placeholder="e.g. rahul@gmail.com"
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs text-[#111827]"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-bold text-[#6B7280] uppercase tracking-wide mb-1">First Name</label>
                  <input
                    type="text"
                    value={testFirstName}
                    onChange={(e) => setTestFirstName(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs text-[#111827]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-[#6B7280] uppercase tracking-wide mb-1">Last Name</label>
                  <input
                    type="text"
                    value={testLastName}
                    onChange={(e) => setTestLastName(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs text-[#111827]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#6B7280] uppercase tracking-wide mb-1">Company</label>
                <input
                  type="text"
                  value={testCompany}
                  onChange={(e) => setTestCompany(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs text-[#111827]"
                />
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
                {testEmailSending ? "Sending..." : "Send Personalized Test Email →"}
              </LoadingButton>
            </div>
          </div>
        </div>
      )}

      {/* TWO-COLUMN AI STUDIO WORKSPACE MODAL WITH LIVE PREVIEW */}
      {showAiWorkspace && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
          <div className="bg-white border border-gray-200 rounded-3xl shadow-2xl max-w-6xl w-full h-[90vh] flex flex-col overflow-hidden relative">
            
            {/* Modal Top Header Bar */}
            <div className="px-6 py-3.5 bg-white border-b border-gray-200 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white flex items-center justify-center shadow-sm">
                  <Sparkles className="w-5 h-5 fill-white" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-[#111827]">AI Assistant Studio</h3>
                  <p className="text-xs text-[#6B7280]">AI Design Engine & Real-Time Live Preview</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowAiWorkspace(false)}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition shadow-sm flex items-center gap-2"
                >
                  <Check className="w-4 h-4" /> Apply Design & Close
                </button>
                <button onClick={() => setShowAiWorkspace(false)} className="p-2 text-gray-400 hover:text-gray-600 rounded-xl hover:bg-gray-100 transition">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Studio Body: Two Column Layout */}
            <div className="flex-1 min-h-0 grid grid-cols-12 overflow-hidden">
              
              {/* Left Column: AI Prompt Controls & Execution Logs (45%) */}
              <div className="col-span-12 lg:col-span-5 p-6 overflow-y-auto border-r border-gray-200 space-y-5 bg-white flex flex-col justify-between">
                <div className="space-y-5">
                  {/* Quick Design Presets */}
                  <div className="space-y-2">
                    <label className="block text-[11px] font-bold text-[#6B7280] uppercase tracking-wide">⚡ Quick Design Presets</label>
                    <div className="flex flex-wrap gap-2">
                      {AI_PRESETS.map((preset, idx) => (
                        <button
                          key={idx}
                          onClick={() => triggerAiGeneration(preset.prompt)}
                          disabled={aiGenerating}
                          className="px-3 py-1.5 bg-purple-50 hover:bg-purple-100 border border-purple-200 text-purple-950 text-xs font-semibold rounded-xl transition flex items-center gap-1.5 disabled:opacity-50"
                        >
                          {preset.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Prompt Textarea */}
                  <div className="space-y-2">
                    <label className="block text-[11px] font-bold text-[#6B7280] uppercase tracking-wide">Custom AI Prompt Instruction</label>
                    <textarea
                      value={aiPrompt}
                      onChange={(e) => setAiPrompt(e.target.value)}
                      placeholder="e.g. 'Build a modern summer sale newsletter with hero banner, 2 product cards, and dark footer'..."
                      rows={4}
                      className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-xs text-[#111827] focus:ring-2 focus:ring-purple-500/30 focus:border-purple-400 focus:outline-none resize-none font-medium"
                    />
                  </div>

                  {aiError && (
                    <div className="p-3.5 bg-red-50 border border-red-200 rounded-2xl text-xs font-medium text-red-700 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                      {aiError}
                    </div>
                  )}

                  {/* Execute Button */}
                  <LoadingButton
                    onClick={() => triggerAiGeneration()}
                    loading={aiGenerating}
                    disabled={!aiPrompt.trim() && aiGenerating}
                    className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white text-xs font-bold rounded-2xl transition shadow-md flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-4 h-4 fill-white" />
                    {aiGenerating ? "AI is Designing..." : "Execute AI Prompt →"}
                  </LoadingButton>

                  {/* AI Output Feedback Details */}
                  {aiResponseData && (
                    <div className="p-4 bg-purple-50/60 border border-purple-200 rounded-2xl space-y-3 animate-in fade-in">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-purple-950 flex items-center gap-1">
                          <CheckCircle2 className="w-4 h-4 text-purple-600" /> AI Execution Complete
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded-md">
                            {aiResponseData.spamRisk || "Low"} Spam Risk
                          </span>
                          <span className="px-2 py-0.5 bg-purple-100 text-purple-800 text-[10px] font-bold rounded-md">
                            {aiResponseData.brandScore || 98}% Brand Score
                          </span>
                        </div>
                      </div>

                      {aiResponseData.changes && aiResponseData.changes.length > 0 && (
                        <div className="space-y-1">
                          <p className="text-[11px] font-bold text-purple-900 uppercase">Changes Applied:</p>
                          <ul className="text-xs text-purple-950 space-y-1 list-disc pl-4 font-medium">
                            {aiResponseData.changes.map((c: string, idx: number) => (
                              <li key={idx}>{c}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <button
                    onClick={() => setShowAiWorkspace(false)}
                    className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-sm transition flex items-center justify-center gap-2"
                  >
                    <Check className="w-4 h-4" /> Apply Design to Canvas
                  </button>
                </div>
              </div>

              {/* Right Column: Live Interactive Template Preview (55%) */}
              <div className="col-span-12 lg:col-span-7 bg-[#F8FAFC] p-6 flex flex-col overflow-hidden relative">
                
                {/* Viewport Header */}
                <div className="flex items-center justify-between mb-3 shrink-0">
                  <span className="text-xs font-bold text-[#111827] flex items-center gap-2">
                    <Eye className="w-4 h-4 text-indigo-600" /> AI Design Live Preview
                  </span>

                  <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-gray-200 text-xs shadow-2xs">
                    <button
                      onClick={() => setAiPreviewTab('desktop')}
                      className={`px-3 py-1 flex items-center gap-1.5 font-semibold rounded-lg transition ${aiPreviewTab === 'desktop' ? 'bg-indigo-600 text-white shadow-2xs' : 'text-gray-600 hover:text-gray-900'}`}
                    >
                      <Monitor className="w-3.5 h-3.5" /> Desktop
                    </button>
                    <button
                      onClick={() => setAiPreviewTab('mobile')}
                      className={`px-3 py-1 flex items-center gap-1.5 font-semibold rounded-lg transition ${aiPreviewTab === 'mobile' ? 'bg-indigo-600 text-white shadow-2xs' : 'text-gray-600 hover:text-gray-900'}`}
                    >
                      <Smartphone className="w-3.5 h-3.5" /> Mobile
                    </button>
                  </div>
                </div>

                {/* Preview Frame */}
                <div className="flex-1 min-h-0 flex items-center justify-center relative overflow-hidden">
                  {aiGenerating && (
                    <div className="absolute inset-0 z-30 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center space-y-3 animate-in fade-in">
                      <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shadow-lg">
                        <Loader2 className="w-6 h-6 animate-spin text-indigo-600" />
                      </div>
                      <h4 className="font-bold text-sm text-[#111827]">AI Assistant is designing your template...</h4>
                      <p className="text-xs text-[#6B7280] max-w-xs">Generating responsive layout, typography, and theme styling.</p>
                    </div>
                  )}

                  {aiPreviewTab === 'desktop' ? (
                    <div className="w-full h-full bg-white rounded-2xl border border-gray-200 shadow-md overflow-hidden relative">
                      <iframe
                        srcDoc={aiPreviewHtml || htmlContent || '<div style="padding:40px;text-align:center;color:#6b7280;">Generating template preview...</div>'}
                        title="AI Template Live Preview"
                        className="w-full h-full border-0 bg-white"
                      />
                    </div>
                  ) : (
                    <div className="relative w-[340px] h-full max-h-[580px] bg-white rounded-[2.5rem] border-[8px] border-gray-900 shadow-2xl overflow-hidden shrink-0 my-auto">
                      <div className="top-0 inset-x-0 h-4 bg-gray-900 rounded-b-xl w-28 mx-auto mb-2"></div>
                      <iframe
                        srcDoc={aiPreviewHtml || htmlContent || '<div style="padding:40px;text-align:center;color:#6b7280;">Generating template preview...</div>'}
                        title="AI Template Mobile Preview"
                        className="w-full h-full border-0 bg-white"
                      />
                    </div>
                  )}
                </div>

              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  )
}
