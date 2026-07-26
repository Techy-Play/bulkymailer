'use client'

import React from 'react'
import { ChevronRight, Layers } from 'lucide-react'
import { TemplateJSONNode } from '@/lib/editor/types'

interface BreadcrumbProps {
  root: TemplateJSONNode
  selectedNodeId: string | null
  onSelectNode: (nodeId: string) => void
}

export function Breadcrumb({ root, selectedNodeId, onSelectNode }: BreadcrumbProps) {
  if (!selectedNodeId) {
    return (
      <div className="h-8 px-4 bg-[#111827] border-b border-gray-800 text-gray-400 text-xs flex items-center gap-1.5 shrink-0">
        <Layers className="w-3.5 h-3.5 text-purple-400" />
        <span>Canvas Hierarchy: Select an element on the canvas to inspect parents</span>
      </div>
    )
  }

  // Build path to selected node
  const path: TemplateJSONNode[] = []

  function findPath(curr: TemplateJSONNode, targetId: string, currentPath: TemplateJSONNode[]): boolean {
    const nextPath = [...currentPath, curr]
    if (curr.id === targetId) {
      path.push(...nextPath)
      return true
    }
    if (curr.children) {
      for (const child of curr.children) {
        if (findPath(child, targetId, nextPath)) return true
      }
    }
    return false
  }

  findPath(root, selectedNodeId, [])

  return (
    <div className="h-8 px-4 bg-[#111827] border-b border-gray-800 text-xs flex items-center gap-1 shrink-0 overflow-x-auto">
      <Layers className="w-3.5 h-3.5 text-purple-400 shrink-0" />
      <div className="flex items-center gap-1 font-mono text-[11px]">
        {path.map((node, index) => {
          const isLast = index === path.length - 1
          return (
            <React.Fragment key={node.id}>
              {index > 0 && <ChevronRight className="w-3 h-3 text-gray-600 shrink-0" />}
              <button
                onClick={() => onSelectNode(node.id)}
                className={`px-1.5 py-0.5 rounded transition ${
                  isLast
                    ? 'bg-purple-600 text-white font-bold'
                    : 'text-gray-300 hover:text-white hover:bg-gray-800'
                }`}
              >
                {node.name || node.type}
              </button>
            </React.Fragment>
          )
        })}
      </div>
    </div>
  )
}
