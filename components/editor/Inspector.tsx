'use client'

import React, { useState } from 'react'
import {
  Settings, Link as LinkIcon, Palette, ShieldCheck, Lock, Unlock,
  Sliders, Eye, Copy, Trash2, ArrowUp, ArrowDown, Sparkles, ExternalLink, RefreshCw, Plus, Type, Heading, Image, MousePointer, ShoppingBag, Layout
} from 'lucide-react'
import { TemplateJSONNode, DesignTokens, ValidationIssue } from '@/lib/editor/types'
import { HealthPanel } from './HealthPanel'

interface InspectorProps {
  selectedNode: TemplateJSONNode | null
  tokens: DesignTokens
  issues: ValidationIssue[]
  healthScore: number
  onUpdateProp: (nodeId: string, propKey: string, value: any) => void
  onUpdateStyle: (nodeId: string, styleKey: string, value: any) => void
  onUpdateTokens: (newTokens: Partial<DesignTokens>) => void
  onToggleLock: (nodeId: string) => void
  onDeleteNode: (nodeId: string) => void
  onDuplicateNode: (nodeId: string) => void
  onSelectNode: (nodeId: string) => void
  onAddComponent?: (type: 'hero' | 'heading' | 'text' | 'button' | 'image' | 'product' | 'footer') => void
}

export function Inspector({
  selectedNode,
  tokens,
  issues,
  healthScore,
  onUpdateProp,
  onUpdateStyle,
  onUpdateTokens,
  onToggleLock,
  onDeleteNode,
  onDuplicateNode,
  onSelectNode,
  onAddComponent,
}: InspectorProps) {
  const [activeTab, setActiveTab] = useState<'props' | 'link' | 'tokens' | 'health'>('props')

  if (!selectedNode) {
    return (
      <div className="w-80 bg-white border-l border-gray-200 flex flex-col h-full shrink-0 shadow-sm">
        <div className="p-4 border-b border-gray-200 bg-gray-50 flex items-center justify-between">
          <h3 className="font-bold text-xs text-[#111827] flex items-center gap-1.5">
            <Sliders className="w-4 h-4 text-purple-600" />
            Figma Inspector Panel
          </h3>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-5">
          <div className="p-3.5 bg-purple-50/60 border border-purple-200 rounded-2xl text-center space-y-1">
            <p className="text-xs font-bold text-[#111827]">No Component Selected</p>
            <p className="text-[11px] text-[#6B7280]">Click any element on the canvas to edit, or add a new component below.</p>
          </div>

          {/* 1-Click Component Add Palette */}
          {onAddComponent && (
            <div className="space-y-2">
              <label className="block text-[11px] font-bold text-[#6B7280] uppercase tracking-wide flex items-center gap-1">
                <Plus className="w-3.5 h-3.5 text-purple-600" /> Add Component to Canvas
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => onAddComponent('hero')}
                  className="p-2.5 bg-gray-50 hover:bg-purple-50 border border-gray-200 hover:border-purple-300 rounded-xl text-xs font-bold text-[#111827] flex items-center gap-2 transition text-left"
                >
                  <Layout className="w-4 h-4 text-purple-600 shrink-0" /> Hero Banner
                </button>
                <button
                  onClick={() => onAddComponent('heading')}
                  className="p-2.5 bg-gray-50 hover:bg-purple-50 border border-gray-200 hover:border-purple-300 rounded-xl text-xs font-bold text-[#111827] flex items-center gap-2 transition text-left"
                >
                  <Heading className="w-4 h-4 text-indigo-600 shrink-0" /> Heading
                </button>
                <button
                  onClick={() => onAddComponent('text')}
                  className="p-2.5 bg-gray-50 hover:bg-purple-50 border border-gray-200 hover:border-purple-300 rounded-xl text-xs font-bold text-[#111827] flex items-center gap-2 transition text-left"
                >
                  <Type className="w-4 h-4 text-blue-600 shrink-0" /> Paragraph
                </button>
                <button
                  onClick={() => onAddComponent('button')}
                  className="p-2.5 bg-gray-50 hover:bg-purple-50 border border-gray-200 hover:border-purple-300 rounded-xl text-xs font-bold text-[#111827] flex items-center gap-2 transition text-left"
                >
                  <MousePointer className="w-4 h-4 text-emerald-600 shrink-0" /> CTA Button
                </button>
                <button
                  onClick={() => onAddComponent('image')}
                  className="p-2.5 bg-gray-50 hover:bg-purple-50 border border-gray-200 hover:border-purple-300 rounded-xl text-xs font-bold text-[#111827] flex items-center gap-2 transition text-left"
                >
                  <Image className="w-4 h-4 text-amber-600 shrink-0" /> Image
                </button>
                <button
                  onClick={() => onAddComponent('product')}
                  className="p-2.5 bg-gray-50 hover:bg-purple-50 border border-gray-200 hover:border-purple-300 rounded-xl text-xs font-bold text-[#111827] flex items-center gap-2 transition text-left"
                >
                  <ShoppingBag className="w-4 h-4 text-pink-600 shrink-0" /> Product Card
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="p-4 border-t border-gray-200">
          <HealthPanel issues={issues} score={healthScore} onSelectNode={onSelectNode} />
        </div>
      </div>
    )
  }

  const props = selectedNode.props || {}
  const style = selectedNode.style || {}
  const isLocked = selectedNode.locked || false

  return (
    <div className="w-80 bg-white border-l border-gray-200 flex flex-col h-full shrink-0 shadow-sm">
      
      {/* Node Header & Actions */}
      <div className="p-3.5 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-purple-50/40 flex items-center justify-between">
        <div>
          <h3 className="font-bold text-xs text-[#111827] flex items-center gap-1.5">
            <span className="capitalize">{selectedNode.name || selectedNode.type}</span>
            {isLocked && <Lock className="w-3 h-3 text-amber-600" />}
          </h3>
          <p className="text-[10px] text-gray-500 font-mono">ID: {selectedNode.id}</p>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => onToggleLock(selectedNode.id)}
            className={`p-1.5 rounded-lg border transition ${
              isLocked ? 'bg-amber-100 border-amber-300 text-amber-800' : 'bg-white border-gray-200 text-gray-500 hover:text-gray-900'
            }`}
            title={isLocked ? 'Unlock component' : 'Lock component'}
          >
            {isLocked ? <Lock className="w-3.5 h-3.5" /> : <Unlock className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={() => onDuplicateNode(selectedNode.id)}
            className="p-1.5 rounded-lg bg-white border border-gray-200 text-gray-500 hover:text-gray-900 transition"
            title="Duplicate node"
          >
            <Copy className="w-3.5 h-3.5" />
          </button>
          {!isLocked && (
            <button
              onClick={() => onDeleteNode(selectedNode.id)}
              className="p-1.5 rounded-lg bg-white border border-red-200 text-red-600 hover:bg-red-50 transition"
              title="Delete node"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Categorized Inspector Tabs */}
      <div className="flex border-b border-gray-200 bg-gray-50 p-1 text-xs">
        <button
          onClick={() => setActiveTab('props')}
          className={`flex-1 py-1.5 text-center font-semibold rounded-lg transition ${
            activeTab === 'props' ? 'bg-white text-[#111827] shadow-2xs' : 'text-gray-500 hover:text-gray-900'
          }`}
        >
          Style & Props
        </button>
        {(selectedNode.type === 'button' || selectedNode.type === 'image' || selectedNode.type === 'hero') && (
          <button
            onClick={() => setActiveTab('link')}
            className={`flex-1 py-1.5 text-center font-semibold rounded-lg transition ${
              activeTab === 'link' ? 'bg-white text-[#111827] shadow-2xs' : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            Link & UTM
          </button>
        )}
        <button
          onClick={() => setActiveTab('tokens')}
          className={`flex-1 py-1.5 text-center font-semibold rounded-lg transition ${
            activeTab === 'tokens' ? 'bg-white text-[#111827] shadow-2xs' : 'text-gray-500 hover:text-gray-900'
          }`}
        >
          Tokens
        </button>
        <button
          onClick={() => setActiveTab('health')}
          className={`flex-1 py-1.5 text-center font-semibold rounded-lg transition ${
            activeTab === 'health' ? 'bg-white text-[#111827] shadow-2xs' : 'text-gray-500 hover:text-gray-900'
          }`}
        >
          Health ({healthScore}%)
        </button>
      </div>

      {/* Tab Body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
        
        {/* TAB 1: PROPS & STYLES */}
        {activeTab === 'props' && (
          <div className="space-y-4">
            
            {/* Image Properties */}
            {selectedNode.type === 'image' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1">Image URL</label>
                  <input
                    type="text"
                    value={props.src || ''}
                    disabled={isLocked}
                    onChange={(e) => onUpdateProp(selectedNode.id, 'src', e.target.value)}
                    className="w-full px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-[#111827] focus:ring-2 focus:ring-purple-500/20 focus:outline-none"
                  />
                </div>

                {/* Shape Preset Selector */}
                <div>
                  <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1.5">Image Shape Preset</label>
                  <div className="grid grid-cols-3 gap-1.5">
                    <button
                      type="button"
                      disabled={isLocked}
                      onClick={() => {
                        onUpdateProp(selectedNode.id, 'shape', 'circle')
                        onUpdateProp(selectedNode.id, 'width', '140')
                        onUpdateProp(selectedNode.id, 'height', '140')
                        onUpdateStyle(selectedNode.id, 'borderRadius', '50%')
                        onUpdateStyle(selectedNode.id, 'align', 'center')
                      }}
                      className={`py-2 px-2 rounded-xl text-xs font-bold border transition flex items-center justify-center gap-1 ${
                        props.shape === 'circle' || style.borderRadius === '50%'
                          ? 'bg-purple-600 text-white border-purple-600 shadow-xs'
                          : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                      }`}
                    >
                      ⭕ Circle
                    </button>

                    <button
                      type="button"
                      disabled={isLocked}
                      onClick={() => {
                        onUpdateProp(selectedNode.id, 'shape', 'rounded')
                        onUpdateProp(selectedNode.id, 'width', '540')
                        onUpdateStyle(selectedNode.id, 'borderRadius', '16px')
                      }}
                      className={`py-2 px-2 rounded-xl text-xs font-bold border transition flex items-center justify-center gap-1 ${
                        props.shape === 'rounded' || (style.borderRadius !== '50%' && style.borderRadius !== '0px')
                          ? 'bg-purple-600 text-white border-purple-600 shadow-xs'
                          : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                      }`}
                    >
                      ▢ Rounded
                    </button>

                    <button
                      type="button"
                      disabled={isLocked}
                      onClick={() => {
                        onUpdateProp(selectedNode.id, 'shape', 'square')
                        onUpdateProp(selectedNode.id, 'width', '560')
                        onUpdateStyle(selectedNode.id, 'borderRadius', '0px')
                      }}
                      className={`py-2 px-2 rounded-xl text-xs font-bold border transition flex items-center justify-center gap-1 ${
                        props.shape === 'square' || style.borderRadius === '0px'
                          ? 'bg-purple-600 text-white border-purple-600 shadow-xs'
                          : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                      }`}
                    >
                      ▭ Rectangle
                    </button>
                  </div>
                </div>

                {/* Alignment */}
                <div>
                  <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1">Alignment</label>
                  <div className="grid grid-cols-3 gap-1">
                    {['left', 'center', 'right'].map((alignOpt) => (
                      <button
                        key={alignOpt}
                        type="button"
                        disabled={isLocked}
                        onClick={() => {
                          onUpdateStyle(selectedNode.id, 'align', alignOpt)
                          onUpdateProp(selectedNode.id, 'align', alignOpt)
                        }}
                        className={`py-1.5 text-xs font-semibold rounded-lg border capitalize transition ${
                          (style.align || props.align || 'center') === alignOpt
                            ? 'bg-purple-50 text-purple-700 border-purple-300 font-bold'
                            : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
                        }`}
                      >
                        {alignOpt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Size Controls */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="block text-[11px] font-bold text-gray-500 uppercase">Width / Diameter (px)</label>
                    <span className="font-mono text-xs text-purple-700 font-bold">{props.width || '140'}px</span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="600"
                    step="10"
                    value={props.width || '140'}
                    disabled={isLocked}
                    onChange={(e) => {
                      const val = e.target.value
                      onUpdateProp(selectedNode.id, 'width', val)
                      if (props.shape === 'circle' || style.borderRadius === '50%') {
                        onUpdateProp(selectedNode.id, 'height', val)
                      }
                    }}
                    className="w-full accent-purple-600 cursor-pointer"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1">Alt Text (Screen Readers)</label>
                  <input
                    type="text"
                    value={props.alt || ''}
                    disabled={isLocked}
                    onChange={(e) => onUpdateProp(selectedNode.id, 'alt', e.target.value)}
                    placeholder="e.g. Profile photo or hero banner"
                    className="w-full px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-[#111827] focus:ring-2 focus:ring-purple-500/20 focus:outline-none"
                  />
                </div>
              </div>
            )}

            {/* Button Properties */}
            {selectedNode.type === 'button' && (
              <div className="space-y-3">
                <div>
                  <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1">Button Label Text</label>
                  <input
                    type="text"
                    value={props.text || ''}
                    disabled={isLocked}
                    onChange={(e) => onUpdateProp(selectedNode.id, 'text', e.target.value)}
                    className="w-full px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-[#111827] focus:ring-2 focus:ring-purple-500/20 focus:outline-none font-bold"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1">Button Color</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={style.backgroundColor || '#4F46E5'}
                        disabled={isLocked}
                        onChange={(e) => onUpdateStyle(selectedNode.id, 'backgroundColor', e.target.value)}
                        className="w-8 h-8 rounded-lg cursor-pointer border border-gray-200"
                      />
                      <input
                        type="text"
                        value={style.backgroundColor || '#4F46E5'}
                        disabled={isLocked}
                        onChange={(e) => onUpdateStyle(selectedNode.id, 'backgroundColor', e.target.value)}
                        className="w-full px-2 py-1 bg-gray-50 border border-gray-200 rounded-lg font-mono text-[11px]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1">Text Color</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={style.textColor || '#FFFFFF'}
                        disabled={isLocked}
                        onChange={(e) => onUpdateStyle(selectedNode.id, 'textColor', e.target.value)}
                        className="w-8 h-8 rounded-lg cursor-pointer border border-gray-200"
                      />
                      <input
                        type="text"
                        value={style.textColor || '#FFFFFF'}
                        disabled={isLocked}
                        onChange={(e) => onUpdateStyle(selectedNode.id, 'textColor', e.target.value)}
                        className="w-full px-2 py-1 bg-gray-50 border border-gray-200 rounded-lg font-mono text-[11px]"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1">Corner Radius</label>
                  <input
                    type="text"
                    value={style.borderRadius || '8px'}
                    disabled={isLocked}
                    onChange={(e) => onUpdateStyle(selectedNode.id, 'borderRadius', e.target.value)}
                    className="w-full px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-[#111827] focus:ring-2 focus:ring-purple-500/20 focus:outline-none"
                  />
                </div>
              </div>
            )}

            {/* Text & Heading Properties */}
            {(selectedNode.type === 'text' || selectedNode.type === 'heading') && (
              <div className="space-y-3">
                <div>
                  <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1">Text Content</label>
                  <textarea
                    value={props.content || ''}
                    disabled={isLocked}
                    onChange={(e) => onUpdateProp(selectedNode.id, 'content', e.target.value)}
                    rows={3}
                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-[#111827] focus:ring-2 focus:ring-purple-500/20 focus:outline-none resize-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1">Font Size</label>
                    <input
                      type="text"
                      value={style.fontSize || '16px'}
                      disabled={isLocked}
                      onChange={(e) => onUpdateStyle(selectedNode.id, 'fontSize', e.target.value)}
                      className="w-full px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-[#111827]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1">Alignment</label>
                    <select
                      value={style.align || 'left'}
                      disabled={isLocked}
                      onChange={(e) => onUpdateStyle(selectedNode.id, 'align', e.target.value)}
                      className="w-full px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-[#111827]"
                    >
                      <option value="left">Left</option>
                      <option value="center">Center</option>
                      <option value="right">Right</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Hero Properties */}
            {selectedNode.type === 'hero' && (
              <div className="space-y-3">
                <div>
                  <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1">Hero Title</label>
                  <input
                    type="text"
                    value={props.title || ''}
                    disabled={isLocked}
                    onChange={(e) => onUpdateProp(selectedNode.id, 'title', e.target.value)}
                    className="w-full px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-[#111827]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1">Subtitle Description</label>
                  <textarea
                    value={props.subtitle || ''}
                    disabled={isLocked}
                    onChange={(e) => onUpdateProp(selectedNode.id, 'subtitle', e.target.value)}
                    rows={2}
                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-[#111827] resize-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1">CTA Button Text</label>
                  <input
                    type="text"
                    value={props.buttonText || ''}
                    disabled={isLocked}
                    onChange={(e) => onUpdateProp(selectedNode.id, 'buttonText', e.target.value)}
                    className="w-full px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-[#111827]"
                  />
                </div>
              </div>
            )}

            {/* General Background & Alignment */}
            <div className="pt-3 border-t border-gray-100 space-y-3">
              <div>
                <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1">Background Color</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={style.backgroundColor || '#FFFFFF'}
                    disabled={isLocked}
                    onChange={(e) => onUpdateStyle(selectedNode.id, 'backgroundColor', e.target.value)}
                    className="w-8 h-8 rounded-lg cursor-pointer border border-gray-200"
                  />
                  <input
                    type="text"
                    value={style.backgroundColor || '#FFFFFF'}
                    disabled={isLocked}
                    onChange={(e) => onUpdateStyle(selectedNode.id, 'backgroundColor', e.target.value)}
                    className="w-full px-2 py-1 bg-gray-50 border border-gray-200 rounded-lg font-mono text-[11px]"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: LINKS & UTM BUILDER */}
        {activeTab === 'link' && (
          <div className="space-y-4">
            <div className="p-3 bg-purple-50 border border-purple-200 rounded-xl space-y-1">
              <p className="font-bold text-xs text-purple-950 flex items-center gap-1.5">
                <LinkIcon className="w-3.5 h-3.5 text-purple-600" /> Destination Href & UTM Builder
              </p>
              <p className="text-[10px] text-purple-800">
                Track email campaign clicks cleanly with automatically attached UTM parameters.
              </p>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1">Target Href URL *</label>
              <div className="relative">
                <input
                  type="text"
                  value={props.buttonHref || props.href || ''}
                  disabled={isLocked}
                  onChange={(e) => {
                    const key = selectedNode.type === 'hero' ? 'buttonHref' : 'href'
                    onUpdateProp(selectedNode.id, key, e.target.value)
                  }}
                  placeholder="https://example.com/landing"
                  className="w-full px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-[#111827] focus:ring-2 focus:ring-purple-500/20 focus:outline-none"
                />
                {(props.buttonHref || props.href) && (
                  <a
                    href={props.buttonHref || props.href}
                    target="_blank"
                    rel="noreferrer"
                    className="absolute right-2 top-2 text-purple-600 hover:text-purple-800"
                    title="Test open link"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-gray-100">
              <label className="block text-[11px] font-bold text-gray-500 uppercase">UTM Analytics Parameters</label>
              <div>
                <label className="block text-[10px] font-medium text-gray-400">utm_source</label>
                <input
                  type="text"
                  value={props.utmSource || 'bulkymailer'}
                  disabled={isLocked}
                  onChange={(e) => onUpdateProp(selectedNode.id, 'utmSource', e.target.value)}
                  className="w-full px-2.5 py-1 bg-gray-50 border border-gray-200 rounded-lg text-xs"
                />
              </div>
              <div>
                <label className="block text-[10px] font-medium text-gray-400">utm_medium</label>
                <input
                  type="text"
                  value={props.utmMedium || 'email'}
                  disabled={isLocked}
                  onChange={(e) => onUpdateProp(selectedNode.id, 'utmMedium', e.target.value)}
                  className="w-full px-2.5 py-1 bg-gray-50 border border-gray-200 rounded-lg text-xs"
                />
              </div>
              <div>
                <label className="block text-[10px] font-medium text-gray-400">utm_campaign</label>
                <input
                  type="text"
                  value={props.utmCampaign || 'newsletter'}
                  disabled={isLocked}
                  onChange={(e) => onUpdateProp(selectedNode.id, 'utmCampaign', e.target.value)}
                  className="w-full px-2.5 py-1 bg-gray-50 border border-gray-200 rounded-lg text-xs"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: DESIGN TOKENS */}
        {activeTab === 'tokens' && (
          <div className="space-y-4">
            <div className="p-3 bg-indigo-50 border border-indigo-200 rounded-xl space-y-1">
              <p className="font-bold text-xs text-indigo-950 flex items-center gap-1.5">
                <Palette className="w-3.5 h-3.5 text-indigo-600" /> Global Brand Design Tokens
              </p>
              <p className="text-[10px] text-indigo-800">
                Updating primary brand tokens updates all buttons & accents across your email design instantly.
              </p>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1">Primary Brand Accent</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={tokens.colors.primary}
                  onChange={(e) => onUpdateTokens({ colors: { ...tokens.colors, primary: e.target.value } })}
                  className="w-8 h-8 rounded-lg cursor-pointer border border-gray-200"
                />
                <input
                  type="text"
                  value={tokens.colors.primary}
                  onChange={(e) => onUpdateTokens({ colors: { ...tokens.colors, primary: e.target.value } })}
                  className="w-full px-2 py-1 bg-gray-50 border border-gray-200 rounded-lg font-mono text-[11px]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1">Secondary Color</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={tokens.colors.secondary}
                  onChange={(e) => onUpdateTokens({ colors: { ...tokens.colors, secondary: e.target.value } })}
                  className="w-8 h-8 rounded-lg cursor-pointer border border-gray-200"
                />
                <input
                  type="text"
                  value={tokens.colors.secondary}
                  onChange={(e) => onUpdateTokens({ colors: { ...tokens.colors, secondary: e.target.value } })}
                  className="w-full px-2 py-1 bg-gray-50 border border-gray-200 rounded-lg font-mono text-[11px]"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: HEALTH PANEL */}
        {activeTab === 'health' && (
          <div>
            <HealthPanel issues={issues} score={healthScore} onSelectNode={onSelectNode} />
          </div>
        )}

      </div>
    </div>
  )
}
