'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import {
  ArrowLeft, Save, Loader2, Wand2, Mail
} from 'lucide-react'
import { toast } from 'sonner'
import { LoadingButton } from '@/components/ui/loading-button'

// Modals
import { AiAssistantModal } from '@/components/editor/ai-assistant-modal'
import { TestEmailModal } from '@/components/editor/test-email-modal'
import { MediaLibraryModal } from '@/components/media/media-library-modal'

// Templatical
import type { TemplaticalEditor } from '@templatical/editor'
import '@templatical/editor/style.css'

// Custom Blocks
import { advancedImageBlock } from '@/lib/blocks/advanced-image'
import { ImageCropModal } from '@/components/editor/image-crop-modal'
import { buildAdvancedImageUrl } from '@/lib/cloudinary-utils'
import { safeStringify } from '@/lib/safe-json'

export const dynamic = 'force-dynamic'

export default function TemplateEditorPage({ params }: { params: Promise<{ id: string }> }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [templateId, setTemplateId] = useState('')
  const [name, setName] = useState('Loading...')
  const [category, setCategory] = useState('GENERAL')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [lastSavedTime, setLastSavedTime] = useState<string | null>(null)
  
  const [isLegacy, setIsLegacy] = useState(false)
  const [isDirty, setIsDirty] = useState(false)
  const [showAiModal, setShowAiModal] = useState(false)
  const [showTestModal, setShowTestModal] = useState(false)
  
  const [showMediaModal, setShowMediaModal] = useState(false)
  const mediaResolveRef = useRef<((value: { url: string } | null) => void) | null>(null)

  const [showCropModal, setShowCropModal] = useState(false)
  const [cropTarget, setCropTarget] = useState<{ blockId: string, url: string } | null>(null)

  const [template, setTemplate] = useState<any>(null)
  const editorInstanceRef = useRef<TemplaticalEditor | null>(null)

  // Initial Fetch
  useEffect(() => {
    params.then(p => {
      setTemplateId(p.id)
      fetchTemplate(p.id)
    })
  }, [params])

  async function fetchTemplate(id: string) {
    try {
      const res = await fetch(`/api/admin/templates/${id}`)
      if (res.ok) {
        const data = await res.json()
        const tpl = data.template || data
        setName(tpl.name || 'Untitled Template')
        setCategory(tpl.category || 'GENERAL')
        
        setTemplate(tpl)
        if (tpl.generation === 'LEGACY' || (Array.isArray(tpl.jsonTree) && !tpl.generation)) {
          setIsLegacy(true)
        }
      }
    } catch (e) {
      console.error(e)
      toast.error('Failed to load template')
    } finally {
      setLoading(false)
    }
  }

  // Mount Templatical Editor
  useEffect(() => {
    let unmounted = false

    if (!loading && !isLegacy && template && containerRef.current && !editorInstanceRef.current) {
      import('@templatical/editor').then(({ init }) => {
        init({
          container: containerRef.current!,
          content: template.jsonTree || undefined,
          mergeTags: {
            tags: [
              { value: 'firstName', label: 'First Name', sample: 'John' },
              { value: 'lastName', label: 'Last Name', sample: 'Doe' },
              { value: 'company', label: 'Company', sample: 'Acme Corp' },
              { value: 'email', label: 'Email', sample: 'john@example.com' },
              { value: 'unsubscribeUrl', label: 'Unsubscribe URL', sample: '#' },
            ]
          },
          uiTheme: "light",
          customBlocks: [advancedImageBlock],
          paletteBlocks: ['section', 'title', 'paragraph', 'custom:advanced_image', 'button', 'divider', 'spacer', 'social', 'video', 'html', 'menu', 'table', 'countdown'],
          onChange: (content) => {
            setIsDirty(true)
            
            // Phase 6: Handle crop trigger in advanced_image blocks
            let triggerCropBlockId: string | null = null;
            let cropImageUrl = "";
            let shouldUpdateContent = false;
            
            const newContent = JSON.parse(safeStringify(content));
            
            const checkBlocks = (blocks: any[]) => {
               for (const block of blocks) {
                 if (block.type === "custom" && block.customType === "advanced_image") {
                   if (block.fieldValues?.cropTrigger) {
                      triggerCropBlockId = block.id;
                      cropImageUrl = block.fieldValues.image || "";
                      block.fieldValues.cropTrigger = false;
                      shouldUpdateContent = true;
                   }
                 }
                 if (block.children) checkBlocks(block.children);
                 if (block.props?.children) checkBlocks(block.props.children);
                 if (block.blocks) checkBlocks(block.blocks);
               }
            }
            
            if (newContent?.blocks) {
              checkBlocks(newContent.blocks);
            }
            
            if (shouldUpdateContent && editorInstanceRef.current) {
               // Update silently to reset the checkbox without triggering infinite loop
               editorInstanceRef.current.setContent(newContent);
               if (cropImageUrl && triggerCropBlockId) {
                 setCropTarget({ blockId: triggerCropBlockId, url: cropImageUrl });
                 setShowCropModal(true);
               }
            }
          },
          onRequestMedia: async () => {
            return new Promise((resolve) => {
              mediaResolveRef.current = resolve
              setShowMediaModal(true)
            })
          },
          onSave: async (content) => {
            await handleSave(content)
          }
        }).then(editor => {
          if (unmounted) {
            editor.unmount()
          } else {
            editorInstanceRef.current = editor
          }
        }).catch(err => {
          console.error("Failed to initialize Templatical:", err)
          toast.error("Failed to load editor")
        })
      })
    }

    return () => {
      unmounted = true
      if (editorInstanceRef.current) {
        editorInstanceRef.current.unmount()
        editorInstanceRef.current = null
      }
    }
  }, [loading, isLegacy, template])

  const handleMediaSelect = (url: string) => {
    if (mediaResolveRef.current) {
      mediaResolveRef.current({ url })
      mediaResolveRef.current = null
    }
    setShowMediaModal(false)
  }

  const handleMediaClose = () => {
    if (mediaResolveRef.current) {
      mediaResolveRef.current(null)
      mediaResolveRef.current = null
    }
    setShowMediaModal(false)
  }

  const handleApplyCrop = (cropParams: { width: number, height: number, x: number, y: number }) => {
    if (!cropTarget || !editorInstanceRef.current) return;
    const content = editorInstanceRef.current.getContent();
    const newContent = JSON.parse(safeStringify(content));
    
    let updated = false;
    const applyToBlock = (blocks: any[]) => {
       for (const block of blocks) {
         if (block.id === cropTarget.blockId && block.type === "custom" && block.customType === "advanced_image") {
           const newUrl = buildAdvancedImageUrl(cropTarget.url, { crop: cropParams });
           block.fieldValues.image = newUrl;
           updated = true;
         }
         if (block.children) applyToBlock(block.children);
         if (block.props?.children) applyToBlock(block.props.children);
         if (block.blocks) applyToBlock(block.blocks);
       }
    }
    
    if (newContent?.blocks) {
      applyToBlock(newContent.blocks);
    }
    
    if (updated) {
      editorInstanceRef.current.setContent(newContent);
      setIsDirty(true);
    }
  }

  // Save logic
  async function handleSave(contentToSave?: any): Promise<boolean> {
    setSaving(true)
    try {
      const content = contentToSave || editorInstanceRef.current?.getContent()
      if (!content && !isLegacy) {
         toast.error("No content to save")
         return false
      }

      const res = await fetch(`/api/admin/templates/${templateId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: safeStringify({ 
          jsonTree: isLegacy ? template.jsonTree : content, 
          // htmlContent will be generated server-side for non-legacy templates
          htmlContent: isLegacy ? template.htmlContent : undefined,
          name, 
          category 
        }),
      })

      const result = await res.json()

      if (res.ok) {
        toast.success("Draft saved successfully!")
        setLastSavedTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }))
        setIsDirty(false)
        
        if (result.isForked && result.templateId) {
          // If a system template was forked, update the URL without refreshing
          window.history.replaceState({}, '', `/admin/templates/${result.templateId}/edit`)
          setTemplateId(result.templateId)
        }
        return true
      } else {
        toast.error("Failed to save draft")
        return false
      }
    } catch (e) {
      console.error(e)
      toast.error("Network error while saving")
      return false
    } finally {
      setSaving(false)
    }
  }

  const handleTestEmailClick = async () => {
    if (isDirty) {
      toast.loading("Saving changes before sending test email...", { id: "test-save" })
      const success = await handleSave()
      toast.dismiss("test-save")
      if (!success) {
        toast.error("Test email aborted: Failed to save changes.")
        return
      }
    }
    setShowTestModal(true)
  }

  const handleAiApply = (newJsonTree: any) => {
    if (editorInstanceRef.current) {
      editorInstanceRef.current.setContent(newJsonTree)
      setIsDirty(true)
    }
  }

  // Category and Title auto-save
  async function saveMetadata(newName: string, newCategory: string) {
    if (!templateId) return
    try {
      await fetch(`/api/admin/templates/${templateId}`, {
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
      {/* TOP HEADER TOOLBAR */}
      <header className="flex-shrink-0 h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 z-40">
        <div className="flex items-center space-x-4 flex-1">
          <Link href="/admin/templates" className="p-2 text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-full transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          
          <div className="flex flex-col">
            <input 
              type="text" 
              value={name} 
              onChange={e => setName(e.target.value)}
              onBlur={() => saveMetadata(name, category)}
              className="font-bold text-gray-900 border-none outline-none focus:ring-0 p-0 text-base bg-transparent"
              placeholder="Template Name"
            />
            <div className="flex items-center text-xs text-gray-500 mt-1">
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

        {isLegacy && (
          <div className="flex items-center justify-center bg-amber-100 text-amber-800 px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm">
            Legacy Template - Read Only
          </div>
        )}

        <div className="flex items-center justify-end flex-1 space-x-3">
          {!isLegacy && (
            <button 
              onClick={() => setShowAiModal(true)}
              className="flex items-center px-3 py-2 text-sm font-medium text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-md transition-colors"
            >
              <Wand2 className="w-4 h-4 mr-2" />
              AI Assistant
            </button>
          )}

          <button 
            onClick={handleTestEmailClick}
            className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 rounded-md transition-colors"
          >
            <Mail className="w-4 h-4 mr-2" />
            Test Email
          </button>

          <span className="text-xs text-gray-400">
            {isDirty ? 'Unsaved changes' : (lastSavedTime ? `Saved at ${lastSavedTime}` : 'Not saved yet')}
          </span>
          <LoadingButton loading={saving} onClick={() => handleSave()} disabled={isLegacy || (!isDirty && !!lastSavedTime)} className="bg-gray-900 text-white hover:bg-gray-800 rounded-md border-none">
            <Save className="w-4 h-4 mr-2" />
            Save Draft
          </LoadingButton>
        </div>
      </header>

      {/* MAIN WORKSPACE */}
      <div className="flex-1 flex overflow-hidden">
        {isLegacy ? (
          <div className="flex-1 flex flex-col bg-gray-100 relative">
            <div className="flex-1 overflow-y-auto p-8 flex justify-center">
                <div className="w-full max-w-[800px] bg-white shadow-xl min-h-[800px] border border-gray-200 rounded-sm">
                  <iframe srcDoc={template?.htmlContent || 'No HTML Content available'} title="Desktop Preview" className="w-full h-full border-none rounded-sm" />
                </div>
            </div>
          </div>
        ) : (
          <div ref={containerRef} className="w-full h-full" />
        )}
      </div>

      <TestEmailModal 
        isOpen={showTestModal} 
        onClose={() => setShowTestModal(false)} 
        templateId={templateId} 
      />

      <AiAssistantModal 
        isOpen={showAiModal} 
        onClose={() => setShowAiModal(false)} 
        onApply={handleAiApply}
        currentTemplate={editorInstanceRef.current?.getContent() || null}
      />

      <MediaLibraryModal
        isOpen={showMediaModal}
        onClose={handleMediaClose}
        onSelect={handleMediaSelect}
      />

      {cropTarget && (
        <ImageCropModal
          isOpen={showCropModal}
          onClose={() => {
            setShowCropModal(false);
            setCropTarget(null);
          }}
          imageUrl={cropTarget.url}
          onApplyCrop={handleApplyCrop}
        />
      )}
    </div>
  )
}
