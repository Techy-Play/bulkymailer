'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'

export default function NewAdminTemplatePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    category: 'GENERAL',
    description: '',
    previewText: ''
  })

  // Basic empty valid jsonTree for a template
  const initialJsonTree = {
    tagName: "mjml",
    attributes: {},
    children: [{
      tagName: "mj-body",
      attributes: {},
      children: [{
        tagName: "mj-section",
        attributes: {},
        children: [{
          tagName: "mj-column",
          attributes: {},
          children: [{
            tagName: "mj-text",
            attributes: {},
            content: "Hello from your new global template"
          }]
        }]
      }]
    }]
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/admin/templates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          jsonTree: initialJsonTree
        })
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Failed to create template')
      }

      const template = await res.json()
      router.push(`/admin/templates/${template.id}/edit`)
    } catch (err: any) {
      setError(err.message)
      setLoading(false)
    }
  }

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Create Global Template</h1>
        <p className="mt-2 text-sm text-gray-500">
          This template will be available to all organizations on the platform. It will not belong to any specific organization.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="p-3 rounded-lg bg-red-50 text-red-600 text-sm font-medium border border-red-100">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Template Name</label>
            <input
              type="text"
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="e.g. Black Friday Sale"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            >
              <option value="GENERAL">General</option>
              <option value="NEWSLETTER">Newsletter</option>
              <option value="PROMOTIONAL">Promotional</option>
              <option value="WELCOME">Welcome</option>
              <option value="E_COMMERCE">E-Commerce</option>
              <option value="TRANSACTIONAL">Transactional</option>
              <option value="SEASONAL">Seasonal</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Preview Text (Inbox snippet)</label>
            <input
              type="text"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="e.g. Don't miss out on these amazing deals..."
              value={formData.previewText}
              onChange={(e) => setFormData({ ...formData, previewText: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 h-24"
              placeholder="Internal description for users discovering this template"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <div className="pt-4 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-2 px-5 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              Create Template
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
