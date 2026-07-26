'use client'

import React, { useState, useRef, useEffect } from 'react'
import {
  Sparkles, GripVertical, ChevronUp, ChevronDown, Lock, Trash2, Copy, Eye,
  Layout, Image as ImageIcon, MousePointer, Type, AlignLeft, Box, ShoppingBag, Share2, Minus, FileText
} from 'lucide-react'
import { TemplateJSONNode, ComponentType } from '@/lib/editor/types'
import { PLUGIN_REGISTRY } from '@/lib/editor/plugins'
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
}

const BADGE_ICONS: Record<ComponentType, any> = {
  hero: Layout,
  button: MousePointer,
  image: ImageIcon,
  heading: Type,
  text: AlignLeft,
  container: Box,
  product: ShoppingBag,
  social: Share2,
  divider: Minus,
  footer: FileText,
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
}: CanvasProps) {
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null)
  const [editingTextNodeId, setEditingTextNodeId] = useState<string | null>(null)
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number; node: TemplateJSONNode } | null>(null)

  // Image resizing drag state
  const [resizingImageId, setResizingImageId] = useState<string | null>(null)
  const [startWidth, setStartWidth] = useState(560)
  const [startX, setStartX] = useState(0)

  // Handle image handle drag
  useEffect(() => {
    function handleMouseMove(e: MouseEvent) {
      if (!resizingImageId) return
      const diff = e.clientX - startX
      const newWidth = Math.min(Math.max(startWidth + diff, 120), 580)
      onUpdateProp(resizingImageId, 'width', String(Math.round(newWidth)))
    }

    function handleMouseUp() {
      setResizingImageId(null)
    }

    if (resizingImageId) {
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('mouseup', handleMouseUp)
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [resizingImageId, startX, startWidth, onUpdateProp])

  // Recursive Renderer Component for Node Graph
  function renderNodeComponent(node: TemplateJSONNode, index: number, isTopLevel = false): React.ReactNode {
    if (!node || node.visible === false) return null

    const isSelected = selectedNodeId === node.id
    const isHovered = hoveredNodeId === node.id && !isSelected
    const isLocked = node.locked || false
    const BadgeIcon = BADGE_ICONS[node.type] || Box

    const p = node.props || {}
    const s = node.style || {}

    // Section header controls for top-level layout sections
    const renderSectionHeader = () => (
      <div className="absolute -top-7 left-0 right-0 h-7 bg-gray-900 text-white text-[10px] font-bold px-3 flex items-center justify-between z-30 rounded-t-xl opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="flex items-center gap-1.5">
          <BadgeIcon className="w-3 h-3 text-purple-400" />
          <span className="capitalize">{node.name || node.type}</span>
          {isLocked && <Lock className="w-3 h-3 text-amber-400" />}
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={(e) => { e.stopPropagation(); onMoveNode(node.id, 'up') }}
            className="p-1 hover:bg-gray-800 rounded"
            title="Move Section Up"
          >
            <ChevronUp className="w-3 h-3" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onMoveNode(node.id, 'down') }}
            className="p-1 hover:bg-gray-800 rounded"
            title="Move Section Down"
          >
            <ChevronDown className="w-3 h-3" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onDuplicateNode(node.id) }}
            className="p-1 hover:bg-gray-800 rounded"
            title="Duplicate Section"
          >
            <Copy className="w-3 h-3" />
          </button>
          {!isLocked && (
            <button
              onClick={(e) => { e.stopPropagation(); onDeleteNode(node.id) }}
              className="p-1 hover:bg-red-900 text-red-300 rounded"
              title="Delete Section"
            >
              <Trash2 className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>
    )

    // Render individual nodes
    let content: React.ReactNode = null

    if (node.type === 'hero') {
      content = (
        <div
          style={{ backgroundColor: s.backgroundColor || '#111827', color: s.textColor || '#FFFFFF', textAlign: s.align || 'center' }}
          className="p-10 space-y-4"
        >
          {editingTextNodeId === `${node.id}-title` ? (
            <input
              type="text"
              defaultValue={p.title}
              autoFocus
              onBlur={(e) => {
                onUpdateProp(node.id, 'title', e.target.value)
                setEditingTextNodeId(null)
              }}
              className="w-full text-2xl font-bold bg-white text-gray-900 px-2 py-1 rounded text-center"
            />
          ) : (
            <h1
              onDoubleClick={(e) => { e.stopPropagation(); if (!isLocked) setEditingTextNodeId(`${node.id}-title`) }}
              className="text-2xl sm:text-3xl font-extrabold tracking-tight cursor-text"
            >
              {p.title}
            </h1>
          )}

          <p className="text-sm opacity-90 max-w-md mx-auto">{p.subtitle}</p>

          <div>
            <span style={{ backgroundColor: '#4F46E5', color: '#FFFFFF' }} className="inline-block px-6 py-2.5 rounded-lg text-xs font-bold shadow-md">
              {p.buttonText}
            </span>
          </div>
        </div>
      )
    } else if (node.type === 'button') {
      content = (
        <div className="py-2 text-center">
          <span
            style={{
              backgroundColor: s.backgroundColor || '#4F46E5',
              color: s.textColor || '#FFFFFF',
              borderRadius: s.borderRadius || '8px',
              paddingTop: s.paddingTop || '10px',
              paddingBottom: s.paddingBottom || '10px',
              paddingLeft: s.paddingLeft || '24px',
              paddingRight: s.paddingRight || '24px',
            }}
            className="inline-block text-xs font-bold shadow-sm"
          >
            {p.text}
          </span>
        </div>
      )
    } else if (node.type === 'image') {
      const imgWidth = Number(p.width || 560)
      content = (
        <div className="py-2 text-center relative inline-block max-w-full">
          <img
            src={p.src}
            alt={p.alt || ''}
            style={{ width: `${imgWidth}px`, borderRadius: s.borderRadius || '12px' }}
            className="max-w-full h-auto mx-auto block"
          />

          {/* Corner Resize Handles for Image */}
          {isSelected && !isLocked && (
            <div
              onMouseDown={(e) => {
                e.stopPropagation()
                setResizingImageId(node.id)
                setStartX(e.clientX)
                setStartWidth(imgWidth)
              }}
              className="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-purple-600 border-2 border-white shadow-md cursor-col-resize z-40 hover:scale-125 transition-transform"
              title="Drag to resize image width"
            />
          )}
        </div>
      )
    } else if (node.type === 'heading') {
      content = (
        <h2 style={{ color: s.textColor || '#111827', fontSize: s.fontSize || '20px', textAlign: s.align || 'left' }} className="font-bold my-2">
          {p.content}
        </h2>
      )
    } else if (node.type === 'text') {
      content = (
        <p style={{ color: s.textColor || '#374151', fontSize: s.fontSize || '14px', textAlign: s.align || 'left' }} className="my-1.5 leading-relaxed">
          {p.content}
        </p>
      )
    } else if (node.type === 'product') {
      content = (
        <div style={{ backgroundColor: s.backgroundColor || '#F9FAFB', borderRadius: s.borderRadius || '16px' }} className="p-4 text-center my-3 border border-gray-200">
          <img src={p.image} alt={p.title} className="w-48 h-36 object-cover rounded-xl mx-auto mb-3" />
          <h3 className="font-bold text-sm text-gray-900">{p.title}</h3>
          <p className="text-xs font-bold text-indigo-600 my-1">{p.price}</p>
          <span className="inline-block px-4 py-1.5 bg-gray-900 text-white text-xs font-semibold rounded-lg">{p.buttonText}</span>
        </div>
      )
    } else if (node.type === 'footer') {
      content = (
        <div style={{ backgroundColor: s.backgroundColor || '#F9FAFB' }} className="p-6 text-center text-xs text-gray-500 space-y-1">
          <p className="font-bold text-gray-700">{p.companyName}</p>
          <p>{p.address}</p>
          <p className="text-indigo-600 underline">Unsubscribe from this mailing list</p>
        </div>
      )
    } else if (node.type === 'container') {
      content = (
        <div style={{ backgroundColor: s.backgroundColor || '#FFFFFF' }} className="p-4">
          {node.children && node.children.map((child, idx) => renderNodeComponent(child, idx, false))}
        </div>
      )
    }

    return (
      <div
        key={node.id}
        onClick={(e) => {
          e.stopPropagation()
          onSelectNode(node.id)
        }}
        onContextMenu={(e) => {
          e.preventDefault()
          e.stopPropagation()
          onSelectNode(node.id)
          setContextMenu({ x: e.clientX, y: e.clientY, node })
        }}
        onMouseEnter={(e) => {
          e.stopPropagation()
          setHoveredNodeId(node.id)
        }}
        onMouseLeave={() => setHoveredNodeId(null)}
        className={`relative group transition-all duration-150 rounded-xl ${
          isSelected
            ? 'ring-2 ring-purple-600 ring-offset-2 shadow-sm'
            : isHovered
            ? 'ring-1 ring-purple-400/80 ring-offset-1'
            : ''
        }`}
      >
        {/* Top-Level Section Header */}
        {isTopLevel && renderSectionHeader()}

        {/* Semantic Component Hover Badge */}
        {(isSelected || isHovered) && (
          <div className="absolute top-1 left-2 z-30 px-2 py-0.5 bg-purple-600 text-white text-[9px] font-bold rounded-md shadow flex items-center gap-1 pointer-events-none">
            <BadgeIcon className="w-2.5 h-2.5" />
            <span className="capitalize">{node.name || node.type}</span>
            {isLocked && <Lock className="w-2.5 h-2.5 text-amber-300" />}
          </div>
        )}

        {content}
      </div>
    )
  }

  return (
    <div className="flex-1 min-h-0 flex flex-col bg-[#F8FAFC] overflow-auto p-6 items-center justify-center relative">
      
      {/* Canvas Viewport Frame */}
      {previewTab === 'desktop' ? (
        <div className="w-full max-w-2xl bg-white rounded-2xl border border-gray-200 shadow-md p-6 min-h-[600px] my-auto space-y-2 relative">
          {root.children && root.children.map((child, idx) => renderNodeComponent(child, idx, true))}
        </div>
      ) : previewTab === 'mobile' ? (
        <div className="relative w-[375px] min-h-[680px] bg-white rounded-[2.5rem] border-[10px] border-gray-900 shadow-2xl overflow-y-auto p-4 shrink-0 my-auto">
          <div className="top-0 inset-x-0 h-5 bg-gray-900 rounded-b-2xl w-32 mx-auto mb-4"></div>
          {root.children && root.children.map((child, idx) => renderNodeComponent(child, idx, true))}
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
              <p className="text-xs font-semibold text-[#111827] truncate">Special Announcement & Exclusive Deals</p>
              <p className="text-xs text-[#6B7280] truncate">Open inside for handpicked summer offers...</p>
            </div>
          </div>
        </div>
      )}

      {/* Right-Click Context Menu Overlay */}
      {contextMenu && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          node={contextMenu.node}
          onClose={() => setContextMenu(null)}
          onDuplicate={onDuplicateNode}
          onDelete={onDeleteNode}
          onToggleLock={onToggleLock}
          onAskAI={onAskAI}
        />
      )}
    </div>
  )
}
