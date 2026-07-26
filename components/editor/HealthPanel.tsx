'use client'

import React from 'react'
import { ShieldCheck, AlertTriangle, AlertCircle, Info, CheckCircle2 } from 'lucide-react'
import { ValidationIssue } from '@/lib/editor/types'

interface HealthPanelProps {
  issues: ValidationIssue[]
  score: number
  onSelectNode?: (nodeId: string) => void
}

export function HealthPanel({ issues, score, onSelectNode }: HealthPanelProps) {
  const errors = issues.filter(i => i.severity === 'error')
  const warnings = issues.filter(i => i.severity === 'warning')
  const info = issues.filter(i => i.severity === 'info')

  return (
    <div className="p-4 bg-white border border-gray-200 rounded-2xl space-y-4 shadow-sm">
      {/* Score Header */}
      <div className="flex items-center justify-between border-b border-gray-100 pb-3">
        <div className="flex items-center gap-2">
          <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs ${
            score >= 90 ? 'bg-emerald-100 text-emerald-700' : score >= 70 ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'
          }`}>
            {score}%
          </div>
          <div>
            <h4 className="font-bold text-xs text-[#111827]">Email Deliverability & Health</h4>
            <p className="text-[10px] text-[#6B7280]">Live accessibility & spam check</p>
          </div>
        </div>
        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
          score >= 90 ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-amber-700 border border-amber-200'
        }`}>
          {score >= 90 ? '✓ Ready to Send' : '⚠ Action Advised'}
        </span>
      </div>

      {/* Issues List */}
      {issues.length === 0 ? (
        <div className="py-4 text-center space-y-1">
          <CheckCircle2 className="w-6 h-6 text-emerald-500 mx-auto" />
          <p className="text-xs font-bold text-emerald-900">0 Health Issues Found!</p>
          <p className="text-[11px] text-emerald-700">All images have ALT text, links are valid, and merge tags are clean.</p>
        </div>
      ) : (
        <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
          {errors.map(issue => (
            <div
              key={issue.id}
              onClick={() => issue.nodeId && onSelectNode?.(issue.nodeId)}
              className="p-2.5 bg-red-50/80 hover:bg-red-100 border border-red-200 rounded-xl text-xs space-y-0.5 cursor-pointer transition"
            >
              <div className="flex items-center justify-between text-red-950 font-bold text-[11px]">
                <span className="flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 text-red-600 shrink-0" />
                  {issue.message}
                </span>
              </div>
              {issue.recommendation && (
                <p className="text-[10px] text-red-700 pl-5">{issue.recommendation}</p>
              )}
            </div>
          ))}

          {warnings.map(issue => (
            <div
              key={issue.id}
              onClick={() => issue.nodeId && onSelectNode?.(issue.nodeId)}
              className="p-2.5 bg-amber-50/80 hover:bg-amber-100 border border-amber-200 rounded-xl text-xs space-y-0.5 cursor-pointer transition"
            >
              <div className="flex items-center justify-between text-amber-950 font-bold text-[11px]">
                <span className="flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  {issue.message}
                </span>
              </div>
              {issue.recommendation && (
                <p className="text-[10px] text-amber-700 pl-5">{issue.recommendation}</p>
              )}
            </div>
          ))}

          {info.map(issue => (
            <div
              key={issue.id}
              onClick={() => issue.nodeId && onSelectNode?.(issue.nodeId)}
              className="p-2.5 bg-indigo-50/80 hover:bg-indigo-100 border border-indigo-200 rounded-xl text-xs space-y-0.5 cursor-pointer transition"
            >
              <div className="flex items-center justify-between text-indigo-950 font-bold text-[11px]">
                <span className="flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                  {issue.message}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
