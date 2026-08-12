'use client'

import { useState } from 'react'
import { Search, Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

export function AdminHeader() {
  const [query, setQuery] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [results, setResults] = useState<any[]>([])
  const [showDropdown, setShowDropdown] = useState(false)
  const router = useRouter()

  const handleSearch = async (value: string) => {
    setQuery(value)
    if (value.length < 3) {
      setResults([])
      setShowDropdown(false)
      return
    }

    setIsSearching(true)
    setShowDropdown(true)

    try {
      const res = await fetch(`/api/admin/search?q=${encodeURIComponent(value)}`)
      if (res.ok) {
        const data = await res.json()
        setResults(data)
      }
    } catch (e) {
      console.error(e)
    } finally {
      setIsSearching(false)
    }
  }

  const navigateToResource = (item: any) => {
    setShowDropdown(false)
    setQuery('')
    if (item.type === 'USER') {
      router.push(`/admin/users/${item.id}`)
    } else if (item.type === 'ORGANIZATION') {
      router.push(`/admin/organizations/${item.id}`)
    } else if (item.type === 'CAMPAIGN') {
      router.push(`/admin/organizations/${item.organizationId}/campaigns/${item.id}`)
    } else if (item.type === 'TEMPLATE') {
      if (item.organizationId) {
        router.push(`/admin/organizations/${item.organizationId}/workspace`)
      } else {
        router.push(`/admin/templates/${item.id}`)
      }
    }
  }

  return (
    <header className="bg-white border-b border-gray-200 h-16 flex items-center px-6 shrink-0 relative z-50">
      <div className="flex-1 max-w-2xl relative">
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-xl leading-5 bg-gray-50 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all"
            placeholder="Global Search (Users, Organizations, Campaigns, Public Templates)..."
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
            onFocus={() => { if (results.length > 0) setShowDropdown(true) }}
          />
          {isSearching && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
            </div>
          )}
        </div>

        {showDropdown && (
          <div className="absolute mt-2 w-full bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-50">
            {results.length > 0 ? (
              <ul className="max-h-96 overflow-y-auto py-2">
                {results.map((item, index) => (
                  <li 
                    key={`${item.type}-${item.id}-${index}`}
                    className="px-4 py-3 hover:bg-gray-50 cursor-pointer flex flex-col gap-1 border-b border-gray-50 last:border-0"
                    onClick={() => navigateToResource(item)}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-900">{item.name || item.title || item.email}</span>
                      <span className="text-[10px] font-semibold tracking-wider uppercase text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                        {item.type}
                      </span>
                    </div>
                    {item.organizationName && (
                      <span className="text-xs text-indigo-600 font-medium">Org: {item.organizationName}</span>
                    )}
                    {item.subtitle && (
                      <span className="text-xs text-gray-500">{item.subtitle}</span>
                    )}
                  </li>
                ))}
              </ul>
            ) : query.length >= 3 && !isSearching ? (
              <div className="p-4 text-sm text-gray-500 text-center">No results found for "{query}"</div>
            ) : null}
          </div>
        )}
      </div>
      
      <div className="ml-auto flex items-center space-x-4">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 border border-red-200">
          Super Admin Privileges Active
        </span>
      </div>
    </header>
  )
}
