import React, { useState, useEffect, useRef } from 'react'
import { X, Sparkles, Wand2, Send, RotateCcw, AlertTriangle, Layout } from 'lucide-react'
import { toast } from 'sonner'
import { LoadingButton } from '@/components/ui/loading-button'
import { safeStringify } from '@/lib/safe-json'

interface AiAssistantModalProps {
  isOpen: boolean
  onClose: () => void
  onApply: (jsonTree: any) => void
  currentTemplate: any
}

type Message = {
  role: 'user' | 'assistant'
  content: string
}

export function AiAssistantModal({ isOpen, onClose, onApply, currentTemplate }: AiAssistantModalProps) {
  const [prompt, setPrompt] = useState('')
  const [loading, setLoading] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  
  const [proposedTemplate, setProposedTemplate] = useState<any>(null)
  const [previewHtml, setPreviewHtml] = useState<string>('')
  const [previewLoading, setPreviewLoading] = useState(false)
  
  const [currentPreviewHtml, setCurrentPreviewHtml] = useState<string>('')
  const [currentPreviewLoading, setCurrentPreviewLoading] = useState(false)
  
  const [suggestions, setSuggestions] = useState<{label: string, prompt: string}[]>([])
  const [intent, setIntent] = useState<'modify' | 'create_new'>('modify')

  const chatContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [messages])

  // Fetch MJML Preview for current template when modal opens
  useEffect(() => {
    if (!isOpen || !currentTemplate) return
    let isMounted = true
    const fetchCurrentPreview = async () => {
      setCurrentPreviewLoading(true)
      try {
        const res = await fetch('/api/ai/preview-mjml', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: safeStringify({ templateContent: currentTemplate })
        })
        const data = await res.json()
        if (isMounted && res.ok && data.html) {
          setCurrentPreviewHtml(data.html)
        }
      } catch (err) {
        console.error(err)
      } finally {
        if (isMounted) setCurrentPreviewLoading(false)
      }
    }
    fetchCurrentPreview()
    return () => { isMounted = false }
  }, [isOpen, currentTemplate])

  // Fetch MJML Preview whenever proposedTemplate changes
  useEffect(() => {
    if (!proposedTemplate) {
      setPreviewHtml('')
      return
    }
    
    let isMounted = true
    const fetchPreview = async () => {
      setPreviewLoading(true)
      try {
        const res = await fetch('/api/ai/preview-mjml', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ templateContent: proposedTemplate })
        })
        const data = await res.json()
        if (isMounted) {
          if (res.ok && data.html) {
            setPreviewHtml(data.html)
          } else {
            toast.error("Failed to render preview")
            setPreviewHtml('<div style="padding: 20px; color: red;">Failed to render preview.</div>')
          }
        }
      } catch (err) {
        console.error(err)
        if (isMounted) setPreviewHtml('<div style="padding: 20px; color: red;">Network error.</div>')
      } finally {
        if (isMounted) setPreviewLoading(false)
      }
    }
    fetchPreview()
    return () => { isMounted = false }
  }, [proposedTemplate])

  if (!isOpen) return null

  const handleApplySuggestion = (suggPrompt: string) => {
    setPrompt(suggPrompt)
  }

  const handleGenerate = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    if (!prompt.trim()) {
      toast.error('Please enter a prompt')
      return
    }

    const userMessage = prompt
    setPrompt('')
    const newMessages: Message[] = [...messages, { role: 'user', content: userMessage }]
    setMessages(newMessages)
    setLoading(true)
    
    try {
      // Bounded history (last 8 messages)
      const conversationHistory = newMessages.slice(-8)

      const res = await fetch(`/api/ai/template-generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: safeStringify({ 
          prompt: userMessage,
          currentTemplate,
          conversationHistory
        })
      })

      const data = await res.json()
      
      if (res.ok && data.proposedTemplate) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.summary || "I updated the design." }])
        setProposedTemplate(data.proposedTemplate)
        setIntent(data.intent || 'modify')
        if (data.suggestions && Array.isArray(data.suggestions)) {
          setSuggestions(data.suggestions)
        }
      } else {
        setMessages(prev => [...prev, { role: 'assistant', content: data.error || "Sorry, I couldn't process that request." }])
        toast.error(data.error || 'Failed to generate template')
      }
    } catch (err) {
      console.error(err)
      toast.error('Network error while communicating with AI')
      setMessages(prev => [...prev, { role: 'assistant', content: "Network error occurred." }])
    } finally {
      setLoading(false)
    }
  }

  const handleApplyChanges = () => {
    if (proposedTemplate) {
      onApply(proposedTemplate)
      toast.success(intent === 'create_new' ? 'Replaced template' : 'Applied changes')
      setProposedTemplate(null)
      onClose()
    }
  }

  const handleCancel = () => {
    setProposedTemplate(null)
    onClose()
  }

  const handleResetConversation = () => {
    setMessages([])
    setProposedTemplate(null)
    setSuggestions([])
    toast.info("Conversation reset")
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-6xl h-[85vh] overflow-hidden flex flex-col">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-indigo-50 to-purple-50">
          <div className="flex items-center space-x-2 text-indigo-900">
            <Wand2 className="w-5 h-5 text-indigo-600" />
            <h2 className="text-lg font-semibold">AI Co-Editor</h2>
          </div>
          <div className="flex items-center space-x-2">
            <button 
              onClick={handleResetConversation}
              className="flex items-center px-3 py-1.5 text-xs font-medium text-gray-600 bg-white border border-gray-200 rounded-md hover:bg-gray-50 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5 mr-1.5" />
              Reset Chat
            </button>
            <button onClick={handleCancel} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded-full transition-colors bg-white/50">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex overflow-hidden flex-1">
          {/* Chat Sidebar */}
          <div className="w-1/3 bg-gray-50 border-r border-gray-200 flex flex-col">
            <div 
              ref={chatContainerRef}
              className="flex-1 p-4 overflow-y-auto space-y-4"
            >
              {messages.length === 0 ? (
                <div className="text-center text-gray-500 mt-10 text-sm">
                  <Sparkles className="w-8 h-8 mx-auto text-indigo-300 mb-2" />
                  <p>I'm your AI co-editor.</p>
                  <p className="mt-1 text-xs">Ask me to modify the template or suggest improvements.</p>
                </div>
              ) : (
                messages.map((msg, i) => (
                  <div key={i} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                    <div className={`px-4 py-2 rounded-2xl max-w-[85%] text-sm ${msg.role === 'user' ? 'bg-indigo-600 text-white rounded-br-none' : 'bg-white border border-gray-200 text-gray-800 rounded-bl-none shadow-sm'}`}>
                      {msg.content}
                    </div>
                  </div>
                ))
              )}
              {loading && (
                <div className="flex items-start">
                  <div className="px-4 py-2 rounded-2xl bg-white border border-gray-200 text-gray-800 rounded-bl-none shadow-sm flex space-x-1 items-center">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                  </div>
                </div>
              )}
            </div>

            {suggestions.length > 0 && (
              <div className="p-3 border-t border-gray-200 bg-gray-100 flex flex-wrap gap-2">
                {suggestions.map((sugg, i) => (
                  <button
                    key={i}
                    onClick={() => handleApplySuggestion(sugg.prompt)}
                    className="px-3 py-1.5 text-xs font-medium bg-white border border-gray-300 text-gray-700 rounded-full hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-300 transition-colors"
                  >
                    {sugg.label}
                  </button>
                ))}
              </div>
            )}

            <form onSubmit={handleGenerate} className="p-4 bg-white border-t border-gray-200 flex items-center space-x-2">
              <input
                type="text"
                value={prompt}
                onChange={e => setPrompt(e.target.value)}
                placeholder="Make the CTA blue..."
                className="flex-1 bg-gray-100 border-none focus:ring-2 focus:ring-indigo-500 rounded-full px-4 py-2 text-sm outline-none"
                disabled={loading}
              />
              <button
                type="submit"
                disabled={loading || !prompt.trim()}
                className="p-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 disabled:opacity-50 transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

          {/* Right Preview Panel */}
          <div className="w-2/3 bg-gray-200 relative flex flex-col">
            <div className="absolute inset-0 overflow-hidden flex justify-center pt-8 bg-gray-800">
              <div className={`w-full max-w-[600px] h-full bg-white shadow-2xl transition-all relative ${!proposedTemplate ? 'opacity-80 scale-[0.98]' : ''}`}>
                {(previewLoading || (currentPreviewLoading && !proposedTemplate)) && (
                  <div className="absolute inset-0 bg-white/80 z-10 flex items-center justify-center">
                    <div className="animate-spin w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full"></div>
                  </div>
                )}
                <iframe 
                  srcDoc={proposedTemplate ? previewHtml : currentPreviewHtml} 
                  className="w-full h-full border-none" 
                  title="AI Preview"
                />
                {!proposedTemplate && (
                  <div className="absolute inset-0 bg-gray-900/10 pointer-events-none flex items-center justify-center">
                    <div className="bg-black/60 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg flex items-center">
                      <Layout className="w-4 h-4 mr-2" />
                      Current Template
                    </div>
                  </div>
                )}
              </div>
            </div>

            {proposedTemplate && (
              <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-gray-900 to-transparent flex justify-center pointer-events-none">
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 pointer-events-auto flex items-center space-x-6 shadow-2xl">
                  {intent === 'create_new' && (
                    <div className="flex items-center text-amber-400 font-medium text-sm">
                      <AlertTriangle className="w-4 h-4 mr-2" />
                      Replaces entire canvas
                    </div>
                  )}
                  <div className="flex space-x-3">
                    <button 
                      onClick={() => setProposedTemplate(null)}
                      className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-sm font-medium transition-colors"
                    >
                      Discard
                    </button>
                    <button 
                      onClick={handleApplyChanges}
                      className="px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-medium shadow-[0_0_15px_rgba(79,70,229,0.5)] transition-colors"
                    >
                      {intent === 'create_new' ? 'Replace Current Template' : 'Apply Changes'}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
