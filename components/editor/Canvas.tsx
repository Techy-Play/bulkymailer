'use client'

import React, { useState, useRef, useEffect } from 'react'
import {
  Sparkles, GripVertical, Trash2, Copy,
  AlignLeft, AlignCenter, AlignRight, Circle, Square, Minus, Edit3, Eye
} from 'lucide-react'
import { TemplateJSONNode } from '@/lib/editor/types'
import { serializeJSONToEmailHTML } from '@/lib/editor/serializer'

interface CanvasProps {
  root: TemplateJSONNode
  selectedNodeId: string | null
  previewTab: 'desktop' | 'mobile' | 'inbox'
  viewMode?: 'edit' | 'preview'
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
  viewMode = 'edit',
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
  const [toolbarRect, setToolbarRect] = useState<DOMRect | null>(null)

  const selectedNode = selectedNodeId ? findNode(root, selectedNodeId) : null
  const htmlContent = serializeJSONToEmailHTML(root)

  const isEditMode = viewMode === 'edit'

  useEffect(() => {
    const iframe = iframeRef.current
    if (!iframe) return

    const handleLoad = () => {
      const doc = iframe.contentDocument
      if (!doc) return

      // Configure edit mode behavior
      doc.body.contentEditable = isEditMode ? "true" : "false"

      doc.addEventListener('click', (e) => {
        if (!isEditMode) return;
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
      doc.body.oninput = (e: Event) => {
        if (!isEditMode) return;
        clearTimeout(debounceTimer)
        const target = e.target as HTMLElement
        const nodeEl = target?.closest('[data-node-id]') as HTMLElement
        if (nodeEl) {
          const id = nodeEl.getAttribute('data-node-id')
          if (id) {
            const node = findNode(root, id)
            if (node) {
              const newText = nodeEl.innerText || nodeEl.textContent || ''
              debounceTimer = setTimeout(() => {
                if (node.type === 'hero') {
                  onUpdateProp(id, 'title', newText)
                } else if (node.type === 'heading' || node.type === 'text') {
                  onUpdateProp(id, 'content', newText)
                } else if (node.type === 'button') {
                  onUpdateProp(id, 'text', newText)
                }
              }, 400)
            }
          }
        }
      }
    }

    iframe.addEventListener('load', handleLoad)
    return () => iframe.removeEventListener('load', handleLoad)
  }, [root, isEditMode, onSelectNode, onUpdateProp])

  useEffect(() => {
    if (!selectedNodeId || !isEditMode) {
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
  }, [selectedNodeId, htmlContent, isEditMode])

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
    if (!selectedNode || !toolbarRect || !isEditMode) return null

    return (
      <div
        className="fixed z-50 bg-white border border-gray-200 rounded-xl shadow-xl flex items-center p-1.5 gap-1.5 animate-in fade-in duration-150"
        style={{
          top: Math.max(16, toolbarRect.top - 52),
          left: Math.max(16, toolbarRect.left),
        }}
      >
        <div className="flex items-center gap-1 border-r border-gray-200 pr-1.5">
          <GripVertical className="w-4 h-4 text-gray-400 cursor-move" />
          <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider">{selectedNode.type}</span>
        </div>

        {(selectedNode.type === 'heading' || selectedNode.type === 'text' || selectedNode.type === 'hero') && (
          <>
            <input
              type="color"
              value={selectedNode.style?.textColor || '#000000'}
              onChange={(e) => onUpdateStyle(selectedNode.id, 'textColor', e.target.value)}
              className="w-6 h-6 rounded cursor-pointer border border-gray-200"
              title="Text Color"
            />
            <button
              onClick={() => {
                const isBold = selectedNode.style?.fontWeight === '700' || selectedNode.style?.fontWeight === 'bold'
                onUpdateStyle(selectedNode.id, 'fontWeight', isBold ? '400' : '700')
              }}
              className={`p-1.5 rounded font-bold text-xs transition ${
                selectedNode.style?.fontWeight === '700' || selectedNode.style?.fontWeight === 'bold'
                  ? 'bg-indigo-100 text-indigo-700 font-extrabold'
                  : 'hover:bg-gray-100 text-[#111827]'
              }`}
              title="Bold (B)"
            >
              B
            </button>
            <button
              onClick={() => {
                const isItalic = selectedNode.style?.fontStyle === 'italic'
                onUpdateStyle(selectedNode.id, 'fontStyle', isItalic ? 'normal' : 'italic')
              }}
              className={`p-1.5 rounded italic text-xs transition ${
                selectedNode.style?.fontStyle === 'italic'
                  ? 'bg-indigo-100 text-indigo-700 font-bold'
                  : 'hover:bg-gray-100 text-[#111827]'
              }`}
              title="Italic (I)"
            >
              I
            </button>
            <button
              onClick={() => {
                const isUnderline = selectedNode.style?.textDecoration === 'underline'
                onUpdateStyle(selectedNode.id, 'textDecoration', isUnderline ? 'none' : 'underline')
              }}
              className={`p-1.5 rounded underline text-xs transition ${
                selectedNode.style?.textDecoration === 'underline'
                  ? 'bg-indigo-100 text-indigo-700 font-bold'
                  : 'hover:bg-gray-100 text-[#111827]'
              }`}
              title="Underline (U)"
            >
              U
            </button>

            {/* Font Size Selector */}
            <select
              value={selectedNode.style?.fontSize || '15px'}
              onChange={(e) => onUpdateStyle(selectedNode.id, 'fontSize', e.target.value)}
              className="text-[11px] px-1.5 py-1 bg-gray-50 border border-gray-200 rounded font-semibold text-[#111827]"
              title="Font Size"
            >
              {['12px', '14px', '15px', '16px', '18px', '20px', '24px', '28px', '32px'].map((sz) => (
                <option key={sz} value={sz}>{sz}</option>
              ))}
            </select>

            {/* Line Spacing Selector */}
            <select
              value={selectedNode.style?.lineHeight || '1.6'}
              onChange={(e) => onUpdateStyle(selectedNode.id, 'lineHeight', e.target.value)}
              className="text-[11px] px-1.5 py-1 bg-gray-50 border border-gray-200 rounded font-semibold text-[#111827]"
              title="Line Spacing (Line Height)"
            >
              <option value="1.2">1.2 (Tight)</option>
              <option value="1.4">1.4 (Normal)</option>
              <option value="1.6">1.6 (Relaxed)</option>
              <option value="1.8">1.8 (Loose)</option>
              <option value="2.0">2.0 (Double)</option>
            </select>

            <button className="p-1.5 hover:bg-gray-100 rounded text-[#111827]" onClick={() => onUpdateStyle(selectedNode.id, 'align', 'left')} title="Align Left"><AlignLeft className="w-3.5 h-3.5" /></button>
            <button className="p-1.5 hover:bg-gray-100 rounded text-[#111827]" onClick={() => onUpdateStyle(selectedNode.id, 'align', 'center')} title="Align Center"><AlignCenter className="w-3.5 h-3.5" /></button>
            <button className="p-1.5 hover:bg-gray-100 rounded text-[#111827]" onClick={() => onUpdateStyle(selectedNode.id, 'align', 'right')} title="Align Right"><AlignRight className="w-3.5 h-3.5" /></button>
          </>
        )}

        {selectedNode.type === 'image' && (
          <>
            <button className="p-1.5 hover:bg-gray-100 rounded text-[#111827]" onClick={() => onUpdateStyle(selectedNode.id, 'borderRadius', '50%')} title="Circle ⭕"><Circle className="w-3.5 h-3.5" /></button>
            <button className="p-1.5 hover:bg-gray-100 rounded text-[#111827]" onClick={() => onUpdateStyle(selectedNode.id, 'borderRadius', '16px')} title="Rounded ▢"><Square className="w-3.5 h-3.5" /></button>
            <button className="p-1.5 hover:bg-gray-100 rounded text-[#111827]" onClick={() => onUpdateStyle(selectedNode.id, 'borderRadius', '0px')} title="Rectangle ▭"><Minus className="w-3.5 h-3.5" /></button>
          </>
        )}

        {selectedNode.type === 'button' && (
          <>
            <input
              type="color"
              value={selectedNode.style?.backgroundColor || '#4F46E5'}
              onChange={(e) => onUpdateStyle(selectedNode.id, 'backgroundColor', e.target.value)}
              className="w-6 h-6 rounded cursor-pointer border border-gray-200"
              title="Button Color"
            />
            <input
              type="text"
              placeholder="Link URL"
              value={selectedNode.props?.href || ''}
              onChange={(e) => onUpdateProp(selectedNode.id, 'href', e.target.value)}
              className="text-[11px] p-1 border rounded w-28 text-[#111827]"
            />
          </>
        )}

        <div className="flex items-center gap-1 border-l border-gray-200 pl-1.5">
          <button className="p-1.5 hover:bg-gray-100 rounded text-[#111827]" onClick={() => onDuplicateNode(selectedNode.id)} title="Duplicate">
            <Copy className="w-3.5 h-3.5" />
          </button>
          <button className="p-1.5 hover:bg-red-50 text-red-600 rounded" onClick={() => onDeleteNode(selectedNode.id)} title="Delete">
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    )
  }

  const isCanvasEmpty = !root.children || root.children.length === 0

  return (
    <div className="flex-1 min-h-0 flex flex-col bg-[#F8FAFC] overflow-auto p-6 sm:p-8 items-center justify-center relative">
      {renderToolbar()}
      
      {previewTab === 'desktop' ? (
        <div className="w-full max-w-2xl h-full bg-white rounded-2xl border border-gray-200 shadow-md min-h-[600px] overflow-hidden relative flex flex-col my-auto">
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
              title="Editor Canvas Desktop"
            />
          )}
        </div>
      ) : previewTab === 'mobile' ? (
        <div className="relative w-[375px] min-h-[680px] bg-white rounded-[2.5rem] border-[10px] border-gray-900 shadow-2xl overflow-hidden shrink-0 my-auto flex flex-col">
          <div className="absolute top-0 inset-x-0 h-5 bg-gray-900 rounded-b-2xl w-32 mx-auto z-20 pointer-events-none"></div>
          {isCanvasEmpty ? (
            <div className="flex flex-col items-center justify-center py-16 text-center border-2 border-dashed border-gray-200 rounded-xl bg-gray-50 p-6 my-auto m-4">
              <p className="text-xs font-bold text-[#111827]">Blank Page</p>
              <p className="text-[11px] text-[#6B7280] mt-1">Empty mobile view canvas</p>
            </div>
          ) : (
            <iframe
              ref={iframeRef}
              srcDoc={htmlContent}
              className="w-full h-full border-0 outline-none pt-4"
              title="Editor Canvas Mobile"
            />
          )}
        </div>
      ) : (
        <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl p-4 shadow-sm space-y-3">
          <p className="text-xs font-bold text-[#6B7280] uppercase tracking-wider">Inbox Preview</p>
          <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 flex items-start gap-3">
            <div className="w-9 h-9 rounded-full bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center text-sm shrink-0">
              BM
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-xs text-[#111827]">BulkyMailer Support</span>
                <span className="text-[10px] text-gray-400">Just now</span>
              </div>
              <p className="text-xs font-bold text-[#111827] truncate">Welcome to BulkyMailer</p>
              <p className="text-xs text-gray-500 truncate">Explore your template and start dispatching campaigns.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
