'use client'

import React, { useState, useRef, useEffect } from 'react'
import {
  Sparkles, GripVertical, Lock, Trash2, Copy,
  AlignLeft, AlignCenter, AlignRight, Circle, Square, Minus
} from 'lucide-react'
import { TemplateJSONNode } from '@/lib/editor/types'
import { serializeJSONToEmailHTML } from '@/lib/editor/serializer'
import { ContextMenu } from './ContextMenu'

interface CanvasProps {
  root: TemplateJSONNode
  selectedNodeId: string | null
  previewTab: 'desktop' | 'mobile' | 'inbox'
  onSelectNode: (nodeId: string) => void
  onUpdateProp: (nodeId: string, propKey: string, value: any) => void
  onUpdateStyle: (nodeId: string, styleKey: string, value: any) => void
  onMoveNode: (nodeId: string, direction: 'up' | 'down') => void
  onDuplicateNode: (nodeId: string) => void
  onDeleteNode: (nodeId: string) => void
  onToggleLock: (nodeId: string) => void
  onAskAI: (node: TemplateJSONNode, prompt: string) => void
  onHtmlChange?: (html: string) => void
}

export function Canvas({
  root,
  selectedNodeId,
  previewTab,
  onSelectNode,
  onUpdateProp,
  onUpdateStyle,
  onMoveNode,
  onDuplicateNode,
  onDeleteNode,
  onToggleLock,
  onAskAI,
  onHtmlChange,
}: CanvasProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const editedHtmlRef = useRef<string>('')
  
  const [toolbarRect, setToolbarRect] = useState<DOMRect | null>(null)
  
  const selectedNode = selectedNodeId ? findNode(root, selectedNodeId) : null
  const htmlContent = serializeJSONToEmailHTML(root)

  useEffect(() => {
    const iframe = iframeRef.current
    if (!iframe) return

    const handleLoad = () => {
      const doc = iframe.contentDocument
      if (!doc) return

      doc.body.contentEditable = "true"
      doc.designMode = "on"

      doc.addEventListener('click', (e) => {
        e.preventDefault()
        const target = e.target as HTMLElement
        const nodeEl = target.closest('[data-node-id]') as HTMLElement
        if (nodeEl) {
          const id = nodeEl.getAttribute('data-node-id')
          if (id) {
            onSelectNode(id)
            const rect = nodeEl.getBoundingClientRect()
            const iframeRect = iframe.getBoundingClientRect()
            setToolbarRect(new DOMRect(
              rect.left + iframeRect.left,
              rect.top + iframeRect.top,
              rect.width,
              rect.height
            ))
          }
        }
      })

      let debounceTimer: NodeJS.Timeout
      doc.body.oninput = () => {
        clearTimeout(debounceTimer)
        const currentContent = doc.documentElement.outerHTML
        editedHtmlRef.current = currentContent
        debounceTimer = setTimeout(() => {
          if (onHtmlChange) {
            onHtmlChange(currentContent)
          }
        }, 1500)
      }
    }

    iframe.addEventListener('load', handleLoad)
    return () => iframe.removeEventListener('load', handleLoad)
  }, [onSelectNode, onHtmlChange])

  useEffect(() => {
    if (!selectedNodeId) {
      setToolbarRect(null)
      return
    }
    const iframe = iframeRef.current
    if (!iframe || !iframe.contentDocument) return
    const el = iframe.contentDocument.querySelector(`[data-node-id="${selectedNodeId}"]`)
    if (el) {
      const rect = el.getBoundingClientRect()
      const iframeRect = iframe.getBoundingClientRect()
      setToolbarRect(new DOMRect(
        rect.left + iframeRect.left,
        rect.top + iframeRect.top,
        rect.width,
        rect.height
      ))
    }
  }, [selectedNodeId, htmlContent])

  function findNode(n: TemplateJSONNode, id: string): TemplateJSONNode | null {
    if (n.id === id) return n
    if (n.children) {
      for (const c of n.children) {
        const found = findNode(c, id)
        if (found) return found
      }
    }
    return null
  }

  const renderToolbar = () => {
    if (!selectedNode || !toolbarRect) return null
    
    return (
      <div 
        className="fixed z-50 bg-white border border-gray-200 rounded-xl shadow-lg flex items-center p-1 gap-1"
        style={{
          top: toolbarRect.top - 48,
          left: toolbarRect.left,
        }}
      >
        <div className="flex items-center gap-1 border-r border-gray-200 pr-1">
          <GripVertical className="w-4 h-4 text-gray-400 cursor-move" />
        </div>
        
        {(selectedNode.type === 'heading' || selectedNode.type === 'text') && (
          <>
            <input 
              type="color" 
              value={selectedNode.style?.textColor || '#000000'}
              onChange={(e) => onUpdateStyle(selectedNode.id, 'textColor', e.target.value)}
              className="w-6 h-6 rounded cursor-pointer"
            />
            <button className="p-1.5 hover:bg-gray-100 rounded text-[#111827] font-bold">B</button>
            <button className="p-1.5 hover:bg-gray-100 rounded text-[#111827] italic">I</button>
            <button className="p-1.5 hover:bg-gray-100 rounded text-[#111827]" onClick={() => onUpdateStyle(selectedNode.id, 'align', 'left')}><AlignLeft className="w-4 h-4" /></button>
            <button className="p-1.5 hover:bg-gray-100 rounded text-[#111827]" onClick={() => onUpdateStyle(selectedNode.id, 'align', 'center')}><AlignCenter className="w-4 h-4" /></button>
            <button className="p-1.5 hover:bg-gray-100 rounded text-[#111827]" onClick={() => onUpdateStyle(selectedNode.id, 'align', 'right')}><AlignRight className="w-4 h-4" /></button>
          </>
        )}
        
        {selectedNode.type === 'image' && (
          <>
            <button className="p-1.5 hover:bg-gray-100 rounded text-[#111827]" onClick={() => onUpdateStyle(selectedNode.id, 'borderRadius', '9999px')}><Circle className="w-4 h-4" /></button>
            <button className="p-1.5 hover:bg-gray-100 rounded text-[#111827]" onClick={() => onUpdateStyle(selectedNode.id, 'borderRadius', '16px')}><Square className="w-4 h-4" /></button>
            <button className="p-1.5 hover:bg-gray-100 rounded text-[#111827]" onClick={() => onUpdateStyle(selectedNode.id, 'borderRadius', '0px')}><Minus className="w-4 h-4" /></button>
          </>
        )}

        {selectedNode.type === 'button' && (
          <>
            <input 
              type="color" 
              value={selectedNode.style?.backgroundColor || '#4F46E5'}
              onChange={(e) => onUpdateStyle(selectedNode.id, 'backgroundColor', e.target.value)}
              className="w-6 h-6 rounded cursor-pointer"
            />
            <input 
              type="text" 
              placeholder="URL"
              value={selectedNode.props?.href || ''}
              onChange={(e) => onUpdateProp(selectedNode.id, 'href', e.target.value)}
              className="text-xs p-1 border rounded w-24"
            />
          </>
        )}

        {selectedNode.type === 'container' && (
          <>
            <input 
              type="color" 
              value={selectedNode.style?.backgroundColor || '#ffffff'}
              onChange={(e) => onUpdateStyle(selectedNode.id, 'backgroundColor', e.target.value)}
              className="w-6 h-6 rounded cursor-pointer"
            />
          </>
        )}

        <div className="flex items-center gap-1 border-l border-gray-200 pl-1">
          <button className="p-1.5 hover:bg-gray-100 rounded text-[#111827]" onClick={() => onDuplicateNode(selectedNode.id)}>
            <Copy className="w-4 h-4" />
          </button>
          <button className="p-1.5 hover:bg-red-50 text-red-600 rounded" onClick={() => onDeleteNode(selectedNode.id)}>
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    )
  }

  const isCanvasEmpty = !root.children || root.children.length === 0

  return (
    <div className="flex-1 min-h-0 flex flex-col bg-[#F8FAFC] overflow-auto p-6 items-center justify-center relative">
      {previewTab === 'desktop' ? (
        <div className="w-full max-w-2xl h-full bg-white rounded-2xl border border-gray-200 shadow-md min-h-[600px] overflow-hidden relative flex flex-col">
          {isCanvasEmpty ? (
            <div className="flex flex-col items-center justify-center py-24 text-center border-2 border-dashed border-gray-200 rounded-xl bg-gray-50/50 p-8 m-4 my-auto">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-3">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-[#111827]">Blank Canvas Page</h3>
              <p className="text-xs text-[#6B7280] max-w-sm mt-1 mb-4">
                Your template is blank. Use the AI Assistant, select components from the inspector, or type code in Monaco editor to start building.
              </p>
            </div>
          ) : (
            <iframe
              ref={iframeRef}
              srcDoc={htmlContent}
              className="w-full h-full border-0 outline-none"
              title="Editor Canvas"
            />
          )}
        </div>
      ) : previewTab === 'mobile' ? (
        <div className="relative w-[375px] min-h-[680px] bg-white rounded-[2.5rem] border-[10px] border-gray-900 shadow-2xl overflow-y-auto p-0 shrink-0 my-auto flex flex-col">
          <div className="absolute top-0 inset-x-0 h-5 bg-gray-900 rounded-b-2xl w-32 mx-auto z-10"></div>
          {isCanvasEmpty ? (
            <div className="flex flex-col items-center justify-center py-16 text-center border-2 border-dashed border-gray-200 rounded-xl bg-gray-50 p-6 my-auto m-4">
              <p className="text-xs font-bold text-[#111827]">Blank Page</p>
              <p className="text-[11px] text-[#6B7280] mt-1">Empty mobile view canvas</p>
            </div>
          ) : (
            <iframe
              ref={iframeRef}
              srcDoc={htmlContent}
              className="w-full h-full border-0 outline-none pt-6"
              title="Editor Canvas Mobile"
            />
          )}
        </div>
      ) : (
        <div className="w-full max-w-xl bg-white border border-gray-200 rounded-2xl shadow-md p-6 space-y-4">
          <h4 className="text-xs font-bold text-[#6B7280] uppercase tracking-wide">Gmail Inbox Preview</h4>
          <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-purple-600 text-white font-bold flex items-center justify-center shrink-0">B</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-[#111827]">BulkyMailer Campaign</span>
                <span className="text-xs text-[#6B7280]">Just now</span>
              </div>
              <p className="text-xs font-semibold text-[#111827] truncate">Custom Email Subject</p>
              <p className="text-xs text-[#6B7280] truncate">Blank template preview...</p>
            </div>
          </div>
        </div>
      )}

      {renderToolbar()}
    </div>
  )
}
