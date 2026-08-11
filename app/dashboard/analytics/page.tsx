'use client';

import { useEffect, useState } from "react";
import {
  BarChart3, Mail, Send, CheckCircle2, Eye, MousePointer, AlertTriangle,
  UserX, AlertOctagon, TrendingUp, Sparkles, RefreshCw, Smartphone,
  Clock, Search, ArrowUpRight, ShieldCheck
} from "lucide-react";
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid
} from "recharts";

interface OverviewData {
  recipients: number;
  sent: number;
  delivered: number;
  opens: number;
  uniqueOpens: number;
  clicks: number;
  uniqueClicks: number;
  hardBounces: number;
  softBounces: number;
  totalBounces: number;
  complaints: number;
  unsubscribes: number;
  deliveryRate: number;
  openRate: number;
  ctr: number;
  bounceRate: number;
  unsubscribeRate: number;
}

export default function AnalyticsPage() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);
  const [selectedCampaignId, setSelectedCampaignId] = useState<string>("");
  const [activeTab, setActiveTab] = useState<
    "overview" | "deliverability" | "engagement" | "performance" | "activity"
  >("overview");

  const [recipientSearch, setRecipientSearch] = useState("");
  const [recipientFilter, setRecipientFilter] = useState("ALL");

  const fetchAnalytics = (cId?: string) => {
    setLoading(true);
    const url = cId ? `/api/analytics?campaignId=${cId}` : "/api/analytics";
    fetch(url)
      .then((res) => res.json())
      .then((resData) => {
        setData(resData);
        if (resData.selectedCampaignId && !cId) {
          setSelectedCampaignId(resData.selectedCampaignId);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const handleCampaignChange = (cId: string) => {
    setSelectedCampaignId(cId);
    fetchAnalytics(cId);
  };

  if (loading && !data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
        <div className="flex flex-col items-center gap-3">
          <RefreshCw className="w-8 h-8 text-indigo-600 animate-spin" />
          <p className="text-xs font-semibold text-[#6B7280]">Computing Live Analytics...</p>
        </div>
      </div>
    );
  }

  const overview: OverviewData = data?.overview || {
    recipients: 0,
    sent: 0,
    delivered: 0,
    opens: 0,
    uniqueOpens: 0,
    clicks: 0,
    uniqueClicks: 0,
    hardBounces: 0,
    softBounces: 0,
    totalBounces: 0,
    complaints: 0,
    unsubscribes: 0,
    deliveryRate: 0,
    openRate: 0,
    ctr: 0,
    bounceRate: 0,
    unsubscribeRate: 0,
  };

  // Delivery rate color
  let deliveryRateColor = "bg-[#F3F4F6] text-[#6B7280] border-gray-200";
  let deliveryRateBadge = "No Data";
  if (overview.sent > 0) {
    if (overview.deliveryRate >= 98) {
      deliveryRateColor = "bg-emerald-50 text-emerald-700 border-emerald-200";
      deliveryRateBadge = "🟢 Excellent (98%+)";
    } else if (overview.deliveryRate >= 95) {
      deliveryRateColor = "bg-amber-50 text-amber-700 border-amber-200";
      deliveryRateBadge = "🟡 Good (95–98%)";
    } else {
      deliveryRateColor = "bg-red-50 text-red-700 border-red-200";
      deliveryRateBadge = "🔴 Needs Attention (<95%)";
    }
  }

  const filteredRecipients = (data?.recipientsTable || []).filter((r: any) => {
    const matchesSearch = r.email.toLowerCase().includes(recipientSearch.toLowerCase());
    const matchesFilter = recipientFilter === "ALL" || r.status.toUpperCase() === recipientFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-12">
      <div className="max-w-[1400px] mx-auto p-6 space-y-6">
        
        {/* TOP HEADER & CAMPAIGN SELECTOR */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-gray-200 shadow-2xs">
          <div>
            <h1 className="text-2xl font-bold text-[#111827] flex items-center gap-2">
              <BarChart3 className="w-6 h-6 text-indigo-600" /> Campaign Analytics
            </h1>
            <p className="text-xs text-[#6B7280] mt-1">
              Real-time deliverability metrics computed from your database campaigns and contacts.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Campaign Select */}
            <select
              value={selectedCampaignId}
              onChange={(e) => handleCampaignChange(e.target.value)}
              className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-xs font-semibold text-[#111827] focus:ring-2 focus:ring-indigo-500/30 outline-none"
            >
              <option value="">All Campaigns Combined</option>
              {data?.campaigns?.map((c: any) => (
                <option key={c.id} value={c.id}>
                  {c.campaignName} ({new Date(c.createdAt).toLocaleDateString()})
                </option>
              ))}
            </select>

            <button
              onClick={() => fetchAnalytics(selectedCampaignId)}
              className="p-2.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl text-gray-600 transition"
              title="Refresh Analytics"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ANALYTICS SECTIONS TABS */}
        <div className="flex items-center gap-2 overflow-x-auto bg-white p-2 rounded-2xl border border-gray-200 shadow-2xs">
          {[
            { id: "overview", label: "📊 Overview", icon: BarChart3 },
            { id: "deliverability", label: "📬 Deliverability", icon: ShieldCheck },
            { id: "engagement", label: "🖱️ Engagement & Heatmap", icon: MousePointer },
            { id: "performance", label: "📈 Performance Graphs", icon: TrendingUp },
            { id: "activity", label: "📝 Real-time Feed & Recipient Log", icon: Clock },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? "bg-[#111827] text-white shadow-sm"
                  : "text-[#6B7280] hover:bg-gray-100 hover:text-[#111827]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* TAB 1: 📊 CAMPAIGN OVERVIEW */}
        {activeTab === "overview" && (
          <div className="space-y-6 animate-in fade-in">
            {/* 10 Metric Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {[
                { label: "Recipients", value: overview.recipients.toLocaleString(), icon: Mail, color: "text-indigo-600", bg: "bg-indigo-50" },
                { label: "Sent", value: overview.sent.toLocaleString(), icon: Send, color: "text-blue-600", bg: "bg-blue-50" },
                { label: "Delivered", value: overview.delivered.toLocaleString(), icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50" },
                { label: "Opens", value: overview.opens.toLocaleString(), icon: Eye, color: "text-purple-600", bg: "bg-purple-50" },
                { label: "Unique Opens", value: overview.uniqueOpens.toLocaleString(), icon: Eye, color: "text-purple-700", bg: "bg-purple-100" },
                { label: "Clicks", value: overview.clicks.toLocaleString(), icon: MousePointer, color: "text-amber-600", bg: "bg-amber-50" },
                { label: "Unique Clicks", value: overview.uniqueClicks.toLocaleString(), icon: MousePointer, color: "text-amber-700", bg: "bg-amber-100" },
                { label: "Bounces", value: overview.totalBounces.toLocaleString(), icon: AlertTriangle, color: "text-red-600", bg: "bg-red-50" },
                { label: "Complaints", value: overview.complaints.toLocaleString(), icon: AlertOctagon, color: "text-rose-600", bg: "bg-rose-50" },
                { label: "Unsubscribes", value: overview.unsubscribes.toLocaleString(), icon: UserX, color: "text-gray-600", bg: "bg-gray-100" },
              ].map((card, idx) => (
                <div key={idx} className="bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase text-[#6B7280]">{card.label}</span>
                    <div className={`p-2 rounded-xl ${card.bg}`}>
                      <card.icon className={`w-4 h-4 ${card.color}`} />
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-[#111827]">{card.value}</p>
                </div>
              ))}
            </div>

            {/* Quick Gauges Banner */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-2xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-500 uppercase">Delivery Rate</span>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${deliveryRateColor}`}>
                    {overview.deliveryRate}%
                  </span>
                </div>
                <div className="h-3 bg-gray-100 rounded-full overflow-hidden mt-3">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${overview.deliveryRate}%` }} />
                </div>
                <p className="text-[11px] text-gray-500 mt-2">{deliveryRateBadge}</p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-2xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-500 uppercase">Open Rate</span>
                  <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-purple-50 text-purple-700 border border-purple-200">
                    {overview.openRate}%
                  </span>
                </div>
                <div className="h-3 bg-gray-100 rounded-full overflow-hidden mt-3">
                  <div className="h-full bg-purple-600 rounded-full" style={{ width: `${overview.openRate}%` }} />
                </div>
                <p className="text-[11px] text-gray-500 mt-2">Unique opens / Delivered emails</p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-2xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-500 uppercase">Click-Through Rate (CTR)</span>
                  <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
                    {overview.ctr}%
                  </span>
                </div>
                <div className="h-3 bg-gray-100 rounded-full overflow-hidden mt-3">
                  <div className="h-full bg-amber-500 rounded-full" style={{ width: `${overview.ctr}%` }} />
                </div>
                <p className="text-[11px] text-gray-500 mt-2">Unique clicks / Delivered emails</p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: 📬 DELIVERY ANALYTICS */}
        {activeTab === "deliverability" && (
          <div className="space-y-6 animate-in fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Delivery Conversion Flow */}
              <div className="lg:col-span-1 bg-white p-6 rounded-2xl border border-gray-200 shadow-2xs space-y-6">
                <h3 className="text-sm font-bold text-[#111827] uppercase tracking-wider">Delivery Pipeline</h3>

                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-blue-900">{overview.sent.toLocaleString()} Sent</span>
                      <span className="text-xs text-blue-700">Dispatched emails</span>
                    </div>
                    <div className="h-2 bg-blue-200 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-600 rounded-full" style={{ width: overview.sent > 0 ? "100%" : "0%" }} />
                    </div>
                  </div>

                  <div className="text-center text-gray-400">↓</div>

                  <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-emerald-900">{overview.delivered.toLocaleString()} Delivered</span>
                      <span className="text-xs text-emerald-700">{overview.deliveryRate}% Rate</span>
                    </div>
                    <div className="h-2 bg-emerald-200 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-600 rounded-full" style={{ width: `${overview.deliveryRate}%` }} />
                    </div>
                  </div>
                </div>

                <div className={`p-4 rounded-xl border text-xs space-y-1 ${deliveryRateColor}`}>
                  <p className="font-bold">{deliveryRateBadge}</p>
                  <p>Inboxes accepted {overview.deliveryRate}% of your dispatched messages.</p>
                </div>
              </div>

              {/* Hard & Soft Bounce Breakdown Table */}
              <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-200 shadow-2xs space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-[#111827]">Hard & Soft Bounce Audit Log</h3>
                  <span className="text-xs font-semibold text-red-600 bg-red-50 px-3 py-1 rounded-xl border border-red-100">
                    Total Bounces: {overview.totalBounces}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-red-50 border border-red-100 rounded-xl">
                    <p className="text-xs font-bold text-red-900 uppercase">Hard Bounces ({overview.hardBounces})</p>
                    <p className="text-[11px] text-red-700 mt-1">Recipient mailbox does not exist or domain is invalid.</p>
                  </div>
                  <div className="p-4 bg-amber-50 border border-amber-100 rounded-xl">
                    <p className="text-xs font-bold text-amber-900 uppercase">Soft Bounces ({overview.softBounces})</p>
                    <p className="text-[11px] text-amber-700 mt-1">Mailbox full or temporary server connection timeout.</p>
                  </div>
                </div>

                <div className="overflow-x-auto border border-gray-200 rounded-xl">
                  {data?.bounceDetails?.length > 0 ? (
                    <table className="w-full text-left text-xs text-[#111827]">
                      <thead className="bg-gray-50 border-b border-gray-200 text-[#6B7280] font-semibold uppercase">
                        <tr>
                          <th className="p-3">Recipient Email</th>
                          <th className="p-3">Type</th>
                          <th className="p-3">Reason</th>
                          <th className="p-3">Timestamp</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {data.bounceDetails.map((b: any, i: number) => (
                          <tr key={i} className="hover:bg-gray-50">
                            <td className="p-3 font-semibold">{b.email}</td>
                            <td className="p-3">
                              <span className={`px-2 py-0.5 text-[10px] font-bold rounded ${
                                b.type === "Hard Bounce" ? "bg-red-100 text-red-800" : "bg-amber-100 text-amber-800"
                              }`}>
                                {b.type}
                              </span>
                            </td>
                            <td className="p-3 text-gray-600">{b.reason}</td>
                            <td className="p-3 text-gray-400">{b.date}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <div className="p-8 text-center text-xs text-gray-400">No bounce events recorded for this account.</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: 🖱️ ENGAGEMENT & CLICK HEATMAP */}
        {activeTab === "engagement" && (
          <div className="space-y-6 animate-in fade-in">
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-2xs space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-[#111827] flex items-center gap-2">
                    <MousePointer className="w-5 h-5 text-amber-600" /> Click Heatmap & Engagement Breakdown
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    Visual click tracking across CTA buttons, product image links, and template links.
                  </p>
                </div>
                <div className="px-4 py-2 bg-amber-50 border border-amber-200 rounded-xl text-xs font-bold text-amber-800">
                  CTR: {overview.ctr}%
                </div>
              </div>

              {/* Click Heatmap List */}
              {data?.clickHeatmap?.length > 0 ? (
                <div className="space-y-4">
                  {data.clickHeatmap.map((item: any, idx: number) => (
                    <div key={idx} className="p-4 bg-gray-50 border border-gray-200 rounded-xl space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-[#111827]">{item.element}</span>
                        <span className="font-bold text-amber-700">{item.clicks} clicks ({item.percentage}%)</span>
                      </div>
                      <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-amber-500 to-amber-600 rounded-full" style={{ width: `${item.percentage}%` }} />
                      </div>
                      <div className="flex items-center justify-between text-[11px] text-gray-400">
                        <span className="truncate">{item.url}</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-gray-400" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-12 text-center text-xs text-gray-400 border-2 border-dashed border-gray-200 rounded-2xl bg-gray-50">
                  No email click events recorded yet. Click tracking events will populate here in real time.
                </div>
              )}
            </div>
          </div>
        )}



        {/* TAB 5: 📈 PERFORMANCE GRAPHS */}
        {activeTab === "performance" && (
          <div className="space-y-6 animate-in fade-in">
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-2xs space-y-6">
              <h3 className="text-base font-bold text-[#111827]">Opens & Clicks Over Time</h3>
              <div className="h-[380px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data?.audience?.hourlyActivity || []}>
                    <defs>
                      <linearGradient id="colorOpens" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorClicks" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="#F59E0B" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                    <XAxis dataKey="hour" tick={{ fontSize: 11, fill: '#64748B' }} />
                    <YAxis tick={{ fontSize: 11, fill: '#64748B' }} />
                    <Tooltip />
                    <Area type="monotone" dataKey="opens" stroke="#8B5CF6" fillOpacity={1} fill="url(#colorOpens)" name="Opens" />
                    <Area type="monotone" dataKey="clicks" stroke="#F59E0B" fillOpacity={1} fill="url(#colorClicks)" name="Clicks" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: 📝 REAL-TIME FEED & RECIPIENT LOG */}
        {activeTab === "activity" && (
          <div className="space-y-6 animate-in fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Real-time Event Feed */}
              <div className="lg:col-span-1 bg-white p-6 rounded-2xl border border-gray-200 shadow-2xs space-y-4">
                <h3 className="text-sm font-bold text-[#111827] flex items-center gap-2">
                  <Clock className="w-4 h-4 text-indigo-600" /> Real-time Activity Feed
                </h3>
                {data?.activityFeed?.length > 0 ? (
                  <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
                    {data.activityFeed.map((item: any, i: number) => (
                      <div key={i} className="p-3 bg-gray-50 border border-gray-200 rounded-xl text-xs space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-[#111827] truncate">{item.recipient}</span>
                          <span className="px-2 py-0.5 bg-indigo-100 text-indigo-800 text-[10px] font-bold rounded">
                            {item.eventType}
                          </span>
                        </div>
                        {item.linkTag && <p className="text-[11px] text-amber-700 font-semibold">Clicked: {item.linkTag}</p>}
                        {item.bounceReason && <p className="text-[11px] text-red-600">Reason: {item.bounceReason}</p>}
                        <p className="text-[10px] text-gray-400">{new Date(item.createdAt).toLocaleTimeString()}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center text-xs text-gray-400 border border-gray-200 rounded-xl">
                    No live events logged yet. Dispatched campaign webhooks will stream here live.
                  </div>
                )}
              </div>

              {/* Searchable Recipient Table */}
              <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-200 shadow-2xs space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-[#111827]">Account Contact Log</h3>
                  <div className="relative max-w-xs">
                    <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search email..."
                      value={recipientSearch}
                      onChange={(e) => setRecipientSearch(e.target.value)}
                      className="pl-9 pr-4 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-xl outline-none"
                    />
                  </div>
                </div>

                <div className="overflow-x-auto border border-gray-200 rounded-xl">
                  {filteredRecipients.length > 0 ? (
                    <table className="w-full text-left text-xs text-[#111827]">
                      <thead className="bg-gray-50 border-b border-gray-200 text-[#6B7280] font-semibold uppercase">
                        <tr>
                          <th className="p-3">Email Address</th>
                          <th className="p-3">Status</th>
                          <th className="p-3">Opens</th>
                          <th className="p-3">Clicks</th>
                          <th className="p-3">Last Activity</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {filteredRecipients.map((r: any, idx: number) => (
                          <tr key={idx} className="hover:bg-gray-50">
                            <td className="p-3 font-semibold">{r.email}</td>
                            <td className="p-3">
                              <span className="px-2.5 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full font-bold text-[10px]">
                                {r.status}
                              </span>
                            </td>
                            <td className="p-3 font-bold text-purple-700">{r.opens}</td>
                            <td className="p-3 font-bold text-amber-700">{r.clicks}</td>
                            <td className="p-3 text-gray-400">{r.lastActivity}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <div className="p-12 text-center text-xs text-gray-400">
                      No contacts found in your account lists matching search query.
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>
        )}



      </div>
    </div>
  );
}
