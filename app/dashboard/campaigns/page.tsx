'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, ChevronDown, Search, X } from 'lucide-react';

interface Campaign {
  id: string;
  subject: string;
  campaignName?: string | null;
  status: string;
  createdAt: string;
  totalRecipients: number;
  successfulRecipients: number;
  template: { name: string } | null;
  contactList: { name: string } | null;
}

export default function CampaignsPage() {
  const router = useRouter();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCampaigns, setSelectedCampaigns] = useState<Set<string>>(new Set());

  useEffect(() => {
    async function fetchCampaigns() {
      try {
        const res = await fetch('/api/campaigns');
        if (res.ok) {
          const data = await res.json();
          setCampaigns(data.campaigns || []);
        }
      } catch (error) {
        console.error('Failed to fetch campaigns', error);
      } finally {
        setLoading(false);
      }
    }
    fetchCampaigns();
  }, []);

  const toggleStatus = (status: string) => {
    setSelectedStatuses((prev) =>
      prev.includes(status) ? prev.filter((s) => s !== status) : [...prev, status]
    );
  };

  const clearStatuses = () => {
    setSelectedStatuses([]);
  };

  const filteredCampaigns = campaigns.filter((c) => {
    const matchesStatus = selectedStatuses.length === 0 || selectedStatuses.includes(c.status.toUpperCase());
    const query = searchQuery.toLowerCase();
    const name = c.campaignName ?? c.subject ?? '';
    const matchesSearch = query === '' || name.toLowerCase().includes(query);
    return matchesStatus && matchesSearch;
  });

  const toggleSelectAll = () => {
    if (selectedCampaigns.size === filteredCampaigns.length && filteredCampaigns.length > 0) {
      setSelectedCampaigns(new Set());
    } else {
      setSelectedCampaigns(new Set(filteredCampaigns.map((c) => c.id)));
    }
  };

  const toggleSelectCampaign = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newSet = new Set(selectedCampaigns);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    setSelectedCampaigns(newSet);
  };

  const formatDate = (dateString: string) => {
    const d = new Date(dateString);
    return d.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  return (
    <div className="flex h-full min-h-[500px] bg-[#F8FAFC]">
      {/* Left Sidebar */}
      <div className="w-56 shrink-0 bg-white border-r border-gray-200 p-4 space-y-6 overflow-y-auto">
        <div>
          <h3 className="text-xs uppercase text-[#6B7280] font-semibold mb-3 tracking-widest">Filter By</h3>
          
          {/* Sub-section 1: Campaign Owner */}
          <div className="mb-5">
            <label className="flex items-center gap-2 text-sm font-medium text-[#111827] mb-2 cursor-pointer">
              <input type="checkbox" checked readOnly className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500/30" />
              Campaign Owner
            </label>
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                Me
                <span className="text-gray-400 cursor-pointer">×</span>
              </span>
            </div>
          </div>

          {/* Sub-section 2: Campaign Status */}
          <div className="mb-5">
            <label className="flex items-center gap-2 text-sm font-medium text-[#111827] mb-2 cursor-pointer">
              <input type="checkbox" checked={selectedStatuses.length > 0} readOnly className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500/30" />
              Campaign Status
            </label>
            <div className="relative">
              <div className="flex flex-wrap gap-2 mb-2">
                <button
                  onClick={clearStatuses}
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${
                    selectedStatuses.length === 0 ? 'bg-indigo-50 text-indigo-700 border border-indigo-200' : 'bg-gray-50 text-[#6B7280] border border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  All {selectedStatuses.length === 0 && <span className="ml-1">×</span>}
                </button>
              </div>
              <div className="flex flex-col gap-1">
                {['DRAFT', 'QUEUED', 'SENDING', 'SENT', 'FAILED', 'CANCELLED'].map((status) => {
                  const isActive = selectedStatuses.includes(status);
                  return (
                    <button
                      key={status}
                      onClick={() => toggleStatus(status)}
                      className={`text-left text-sm px-2 py-1.5 rounded-lg transition-colors ${
                        isActive ? 'bg-indigo-50 text-indigo-700 font-semibold' : 'text-[#6B7280] hover:bg-gray-50'
                      }`}
                    >
                      {status}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Sub-section 3: Campaign Type */}
          <div className="mb-5 opacity-50 pointer-events-none">
            <label className="flex items-center gap-2 text-sm font-medium text-[#111827] mb-2">
              <input type="checkbox" disabled className="rounded border-gray-300" />
              Campaign Type
            </label>
            <div className="text-sm text-[#6B7280] pl-6">Coming Soon</div>
          </div>

          {/* Sub-section 4: Created Date */}
          <div className="mb-5 opacity-50 pointer-events-none">
            <label className="flex items-center gap-2 text-sm font-medium text-[#111827] mb-2">
              <input type="checkbox" disabled className="rounded border-gray-300" />
              Created Date
            </label>
            <div className="text-sm text-[#6B7280] pl-6">Coming Soon</div>
          </div>
        </div>
      </div>

      {/* Main Area */}
      <div className="flex-1 flex flex-col overflow-hidden bg-[#F8FAFC]">
        {/* Top bar */}
        <div className="px-6 py-4 flex items-center justify-between">
          <h1 className="text-[#111827] font-bold text-2xl">All Campaigns</h1>
          <Link
            href="/dashboard/campaigns/new"
            className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-xl hover:bg-indigo-700 transition-colors shadow-sm"
          >
            + Create Campaign
          </Link>
        </div>

        {/* Toolbar */}
        <div className="px-6 py-2 flex items-center gap-3">
          <div className="flex items-center gap-3 bg-white px-3 py-2 rounded-lg border border-gray-200">
            <input
              type="checkbox"
              checked={selectedCampaigns.size === filteredCampaigns.length && filteredCampaigns.length > 0}
              onChange={toggleSelectAll}
              className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500/30 cursor-pointer"
            />
            <span className="text-sm text-[#6B7280] font-medium">Select All</span>
          </div>

          <div className="flex-1" />

          {isSearchOpen ? (
            <div className="relative flex items-center">
              <Search className="w-4 h-4 text-[#6B7280] absolute left-3" />
              <input
                type="text"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search campaigns..."
                className="pl-9 pr-8 py-2 text-sm bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 w-64 outline-none text-[#111827]"
              />
              <button
                onClick={() => { setIsSearchOpen(false); setSearchQuery(''); }}
                className="absolute right-2 p-1 text-[#6B7280] hover:text-[#111827]"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-[#6B7280] hover:text-[#111827] bg-white border border-gray-200 rounded-xl transition-colors shadow-sm"
            >
              <Search className="w-4 h-4" />
            </button>
          )}

          <button className="flex items-center gap-1 text-sm font-medium text-[#6B7280] bg-white border border-gray-200 px-3 py-2 rounded-xl shadow-sm hover:text-[#111827] transition-colors ml-2">
            Sort by: Recently Created
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>

        {/* Campaigns list */}
        <div className="flex-1 overflow-y-auto px-6 pb-6 mt-4 space-y-2">
          {loading ? (
            [1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-4 bg-white p-4 rounded-xl border border-gray-200 animate-pulse">
                <div className="w-4 h-4 bg-gray-200 rounded"></div>
                <div className="w-10 h-10 bg-gray-200 rounded-xl"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                  <div className="h-3 bg-gray-100 rounded w-1/3"></div>
                </div>
              </div>
            ))
          ) : filteredCampaigns.length === 0 ? (
            <div className="h-full min-h-[300px] flex flex-col items-center justify-center text-center bg-white border border-gray-200 rounded-2xl">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4 border border-gray-100">
                <Mail className="w-8 h-8 text-[#6B7280]" />
              </div>
              <h3 className="text-lg font-bold text-[#111827] mb-1">No campaigns yet</h3>
              <p className="text-sm text-[#6B7280] mb-6 max-w-sm">
                {searchQuery || selectedStatuses.length > 0
                  ? "Try adjusting your filters or search query to find what you're looking for."
                  : "Get started by creating your first email campaign."}
              </p>
              <Link
                href="/dashboard/campaigns/new"
                className="px-5 py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-xl hover:bg-indigo-700 transition-colors shadow-sm"
              >
                + Create Campaign
              </Link>
            </div>
          ) : (
            filteredCampaigns.map((campaign) => {
              const name = campaign.campaignName ?? campaign.subject ?? 'Untitled Campaign';
              const s = campaign.status.toUpperCase();
              
              let iconClass = 'bg-gray-100 text-[#6B7280]';
              let wrapperClass = '';
              let badgeClass = 'bg-gray-100 text-[#6B7280]';

              if (s === 'DRAFT') {
                iconClass = 'bg-gray-100 text-gray-600';
                badgeClass = 'bg-gray-100 text-gray-600';
              } else if (s === 'QUEUED') {
                iconClass = 'bg-amber-50 text-amber-700';
                badgeClass = 'bg-amber-50 text-amber-700';
              } else if (s === 'SENDING') {
                iconClass = 'bg-blue-50 text-blue-700';
                wrapperClass = 'animate-pulse';
                badgeClass = 'bg-blue-50 text-blue-700';
              } else if (s === 'SENT') {
                iconClass = 'bg-emerald-50 text-emerald-700';
                badgeClass = 'bg-emerald-50 text-emerald-700';
              } else if (s === 'FAILED') {
                iconClass = 'bg-red-50 text-red-700';
                badgeClass = 'bg-red-50 text-red-700';
              } else if (s === 'CANCELLED') {
                iconClass = 'bg-gray-100 text-gray-500';
                badgeClass = 'bg-gray-100 text-gray-500';
              }

              return (
                <div
                  key={campaign.id}
                  onClick={() => router.push(`/dashboard/campaigns/${campaign.id}/edit`)}
                  className="bg-white px-4 py-3.5 flex items-center gap-4 hover:border-indigo-200 border border-gray-200 rounded-xl cursor-pointer transition-colors shadow-sm group"
                >
                  <div onClick={(e) => e.stopPropagation()}>
                    <input
                      type="checkbox"
                      checked={selectedCampaigns.has(campaign.id)}
                      onChange={(e) => toggleSelectCampaign(campaign.id, e as any)}
                      className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500/30 cursor-pointer"
                    />
                  </div>
                  
                  <div className={`${wrapperClass}`}>
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${iconClass}`}>
                      <Mail className="w-5 h-5" />
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-0.5">
                      <h4 className="text-sm font-bold text-[#111827] truncate group-hover:text-indigo-600 transition-colors">{name}</h4>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider ${badgeClass}`}>
                        {s}
                      </span>
                    </div>
                    <p className="text-xs text-[#6B7280] truncate">
                      {campaign.subject && campaign.subject !== name && (
                        <span className="mr-2">Subject: {campaign.subject} ·</span>
                      )}
                      Created on {formatDate(campaign.createdAt)}
                    </p>
                  </div>
                  
                  <div className="text-[#6B7280] font-bold tracking-widest px-2 opacity-50 group-hover:opacity-100 transition-opacity">
                    ...
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
