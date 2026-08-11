import React from 'react'
import { X, Check } from 'lucide-react'

export interface VersionCompareModalProps {
  currentHtml: string
  currentVersion: number
  selectedHtml: string
  selectedVersion: number
  selectedName?: string
  selectedTimestamp: string
  onRestore: () => void
  onClose: () => void
}

export function VersionCompareModal({
  currentHtml,
  currentVersion,
  selectedHtml,
  selectedVersion,
  selectedName,
  selectedTimestamp,
  onRestore,
  onClose
}: VersionCompareModalProps) {
  return (
    <div className="fixed inset-0 z-[60] bg-[#111827]/50 backdrop-blur-sm flex flex-col p-4 md:p-8 animate-in fade-in duration-200">
      <div className="bg-white border border-gray-200 rounded-2xl shadow-2xl flex-1 flex flex-col overflow-hidden text-[#111827]">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50/50">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Compare Versions</h2>
            <p className="text-xs text-gray-500">
              Comparing your current work (v{currentVersion}) with version {selectedVersion} ({selectedName || 'Saved version'})
            </p>
          </div>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 rounded-xl hover:bg-gray-100 transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content - Two columns */}
        <div className="flex-1 flex flex-col md:flex-row min-h-0 divide-y md:divide-y-0 md:divide-x divide-gray-200 bg-gray-100">
          
          {/* Left: Current Version */}
          <div className="flex-1 flex flex-col min-h-0 bg-white m-4 rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-3 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
              <span className="font-bold text-sm text-gray-700">Current Version (v{currentVersion})</span>
              <span className="text-xs text-indigo-600 font-semibold bg-indigo-50 px-2 py-0.5 rounded-md">Active</span>
            </div>
            <div className="flex-1 p-2 bg-[#F0F2F5] overflow-auto flex justify-center">
              <div className="bg-white shadow-md rounded-lg overflow-hidden w-full max-w-xl">
                <iframe
                  srcDoc={currentHtml}
                  title="Current Version Preview"
                  className="w-full h-full min-h-[500px] border-0"
                />
              </div>
            </div>
          </div>

          {/* Right: Selected Version */}
          <div className="flex-1 flex flex-col min-h-0 bg-white m-4 rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-3 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
              <span className="font-bold text-sm text-gray-700">
                Version {selectedVersion}: {selectedName || 'Selected'}
              </span>
              <span className="text-xs text-gray-500">{selectedTimestamp}</span>
            </div>
            <div className="flex-1 p-2 bg-[#F0F2F5] overflow-auto flex justify-center">
              <div className="bg-white shadow-md rounded-lg overflow-hidden w-full max-w-xl">
                <iframe
                  srcDoc={selectedHtml}
                  title="Selected Version Preview"
                  className="w-full h-full min-h-[500px] border-0"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 bg-white flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-semibold text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 rounded-xl transition"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onRestore()
              onClose()
            }}
            className="px-4 py-2 flex items-center gap-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition shadow-sm"
          >
            <Check className="w-4 h-4" />
            Restore This Version
          </button>
        </div>
      </div>
    </div>
  )
}
