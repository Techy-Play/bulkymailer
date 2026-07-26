'use client'

import React from 'react'
import { History, X, Check, RotateCcw, Clock, Sparkles } from 'lucide-react'
import { TemplateJSONNode } from '@/lib/editor/types'

export interface TimelineSnapshot {
  id: string
  timestamp: string
  name: string
  root: TemplateJSONNode
}

interface TimelineModalProps {
  isOpen: boolean
  snapshots: TimelineSnapshot[]
  currentSnapshotId: string
  onClose: () => void
  onRestoreSnapshot: (snapshot: TimelineSnapshot) => void
}

export function TimelineModal({
  isOpen,
  snapshots,
  currentSnapshotId,
  onClose,
  onRestoreSnapshot,
}: TimelineModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white border border-gray-200 rounded-3xl shadow-2xl max-w-lg w-full p-6 space-y-4">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <History className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-[#111827]">Version Snapshot Timeline</h3>
              <p className="text-[11px] text-[#6B7280]">Restore previous editor & AI iteration states</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Snapshots List */}
        <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
          {snapshots.length === 0 ? (
            <p className="text-xs text-gray-400 text-center py-6">No snapshots saved in this session yet.</p>
          ) : (
            snapshots.map((snap) => {
              const isCurrent = snap.id === currentSnapshotId
              return (
                <div
                  key={snap.id}
                  className={`p-3.5 rounded-2xl border transition flex items-center justify-between ${
                    isCurrent
                      ? 'bg-purple-50 border-purple-200 text-purple-950'
                      : 'bg-gray-50 hover:bg-gray-100 border-gray-200 text-[#111827]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs ${
                      isCurrent ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-700'
                    }`}>
                      {snap.name.startsWith('AI') ? <Sparkles className="w-4 h-4 fill-current" /> : <Clock className="w-4 h-4" />}
                    </div>
                    <div>
                      <p className="font-bold text-xs">{snap.name}</p>
                      <p className="text-[10px] text-gray-500">{snap.timestamp}</p>
                    </div>
                  </div>

                  {isCurrent ? (
                    <span className="px-2.5 py-1 bg-purple-600 text-white text-[10px] font-bold rounded-lg flex items-center gap-1">
                      <Check className="w-3 h-3" /> Active
                    </span>
                  ) : (
                    <button
                      onClick={() => {
                        onRestoreSnapshot(snap)
                        onClose()
                      }}
                      className="px-3 py-1.5 bg-white hover:bg-purple-600 hover:text-white text-gray-700 border border-gray-200 text-xs font-semibold rounded-xl transition shadow-2xs flex items-center gap-1"
                    >
                      <RotateCcw className="w-3.5 h-3.5" /> Restore
                    </button>
                  )}
                </div>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}
