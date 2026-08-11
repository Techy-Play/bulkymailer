import React, { useState } from 'react'
import { X, Send, Mail } from 'lucide-react'
import { toast } from 'sonner'
import { LoadingButton } from '@/components/ui/loading-button'

interface TestEmailModalProps {
  isOpen: boolean
  onClose: () => void
  templateId: string
}

export function TestEmailModal({ isOpen, onClose, templateId }: TestEmailModalProps) {
  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('John')
  const [lastName, setLastName] = useState('Doe')
  const [company, setCompany] = useState('Acme Corp')
  const [loading, setLoading] = useState(false)

  if (!isOpen) return null

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) {
      toast.error('Email address is required')
      return
    }

    setLoading(true)
    try {
      const res = await fetch(`/api/templates/${templateId}/test-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ testEmail: email, firstName, lastName, company })
      })

      const data = await res.json()
      if (res.ok && data.success) {
        toast.success(`Email sent to ${email} successfully`)
        onClose()
      } else {
        toast.error(data.error || 'Failed to send test email')
      }
    } catch (err) {
      console.error(err)
      toast.error('Network error while sending test email')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden flex flex-col max-h-[90vh]">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
          <div className="flex items-center space-x-2 text-gray-900">
            <Mail className="w-5 h-5 text-indigo-600" />
            <h2 className="text-lg font-semibold">Send Test Email</h2>
          </div>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSend} className="p-6 overflow-y-auto space-y-4">
          <p className="text-sm text-gray-500 mb-4">
            Send a preview of this template to your inbox. Merge tags will be replaced with the dummy data below.
          </p>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700">Recipient Email</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm outline-none"
              placeholder="you@example.com"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">First Name <span className="text-gray-400 text-xs font-normal">{'{{firstName}}'}</span></label>
              <input 
                type="text" 
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm outline-none"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">Last Name <span className="text-gray-400 text-xs font-normal">{'{{lastName}}'}</span></label>
              <input 
                type="text" 
                value={lastName}
                onChange={e => setLastName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm outline-none"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700">Company <span className="text-gray-400 text-xs font-normal">{'{{company}}'}</span></label>
            <input 
              type="text" 
              value={company}
              onChange={e => setCompany(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm outline-none"
            />
          </div>

          <div className="pt-4 mt-2 border-t border-gray-100 flex justify-end space-x-3">
            <button 
              type="button" 
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <LoadingButton 
              type="submit" 
              loading={loading}
              className="px-4 py-2 bg-indigo-600 text-white hover:bg-indigo-700 rounded-lg text-sm font-medium shadow-sm transition-colors border-none"
            >
              <Send className="w-4 h-4 mr-2" />
              Send Preview
            </LoadingButton>
          </div>
        </form>
      </div>
    </div>
  )
}
