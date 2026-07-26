'use client'

import React from 'react'
import { Copy, Trash2, Lock, Sparkles, Link, ExternalLink, ShieldCheck } from 'lucide-react'
import { TemplateJSONNode } from '@/lib/editor/types'

interface ContextMenuProps {
  x: number
  y: number
  node: TemplateJSONNode
  onClose: () => void
  onDuplicate: (nodeId: string) => void
  onDelete: (nodeId: string) => void
  onToggleLock: (nodeId: string) => void
  onAskAI: (node: TemplateJSONNode, prompt: string) => void
}

export function ContextMenu({
  x,
  y,
  node,
  onClose,
  onDuplicate,
  onDelete,
  onToggleLock,
  onAskAI,
}: ContextMenuProps) {
  return (
    <>
      <div className="fixed inset-0 z-50" onClick={onClose} />
      <div
        style={{ top: y, left: x }}
        className="fixed z-50 w-56 bg-gray-900 border border-gray-800 text-white rounded-2xl shadow-2xl p-1.5 space-y-1 text-xs animate-in fade-in zoom-in-95 duration-100"
      >
        <div className="px-3 py-1.5 border-b border-gray-800 flex items-center justify-between text-gray-400 font-bold text-[10px] uppercase">
          <span>{node.name || node.type}</span>
          <span>{node.id}</span>
        </div>

        {/* AI Actions */}
        <div className="p-1 space-y-1 bg-purple-950/40 rounded-xl border border-purple-800/40">
          <button
            onClick={() => {
              onAskAI(node, `Improve copy, contrast, and conversions for ${node.name || node.type}`)
              onClose()
            }}
            className="w-full px-2.5 py-1.5 text-left text-purple-300 hover:bg-purple-600 hover:text-white rounded-lg transition font-bold flex items-center gap-2"
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-400 fill-purple-400" />
            ✨ Ask AI About Component
          </button>
        </div>

        {/* Node Actions */}
        <button
          onClick={() => {
            onDuplicate(node.id)
            onClose()
          }}
          className="w-full px-3 py-1.5 text-left text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition flex items-center gap-2 font-medium"
        >
          <Copy className="w-3.5 h-3.5" /> Duplicate Node
        </button>

        <button
          onClick={() => {
            onToggleLock(node.id)
            onClose()
          }}
          className="w-full px-3 py-1.5 text-left text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition flex items-center gap-2 font-medium"
        >
          <Lock className="w-3.5 h-3.5 text-amber-400" />
          {node.locked ? 'Unlock Component' : 'Lock Component'}
        </button>

        {!node.locked && (
          <button
            onClick={() => {
              onDelete(node.id)
              onClose()
            }}
            className="w-full px-3 py-1.5 text-left text-red-400 hover:bg-red-950/60 hover:text-red-200 rounded-lg transition flex items-center gap-2 font-medium"
          >
            <Trash2 className="w-3.5 h-3.5" /> Delete Component
          </button>
        )}
      </div>
    </>
  )
}
