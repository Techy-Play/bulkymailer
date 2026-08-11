'use client';

import { useEffect, useState } from "react";
import {
  BarChart3, RefreshCw, Search, ChevronDown, Info, MousePointer, AlertCircle, CheckCircle2, Eye, ExternalLink, ArrowUpRight
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

interface TimeSeriesPoint {
  date: string;
  rawDate: string;
  sent: number;
  delivered: number;
  opened: number;
  clicked: number;
  bounced: number;
}

export default function AnalyticsMetricsPage() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);
  const [selectedCampaignId, setSelectedCampaignId] = useState<string>("");
  const [days, setDays] = useState<number>(15);
  const [eventFilter, setEventFilter] = useState<"ALL" | "SENT" | "DELIVERED" | "OPENED" | "CLICKED" | "BOUNCED">("ALL");

  const [recipientSearch, setRecipientSearch] = useState("");
  const [recipientFilter, setRecipientFilter] = useState("ALL");

  const fetchAnalytics = (cId?: string, dCount?: number) => {
    setLoading(true);
    const targetCId = cId !== undefined ? cId : selectedCampaignId;
    const targetDays = dCount !== undefined ? dCount : days;

    const query = new URLSearchParams();
    if (targetCId) query.set("campaignId", targetCId);
    if (targetDays) query.set("days", targetDays.toString());

    fetch(`/api/analytics?${query.toString()}`)
      .then((res) => res.json())
      .then((resData) => {
        setData(resData);
        if (resData.selectedCampaignId && !targetCId) {
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
    fetchAnalytics(cId, days);
  };

  const handleDaysChange = (dCount: number) => {
    setDays(dCount);
    fetchAnalytics(selectedCampaignId, dCount);
  };

  if (loading && !data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
        <div className="flex flex-col items-center gap-3">
          <RefreshCw className="w-7 h-7 text-indigo-600 animate-spin" />
          <p className="text-xs font-semibold text-[#6B7280]">Loading Metrics Dashboard...</p>
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

  const timeSeries: TimeSeriesPoint[] = data?.timeSeries || [];

  // Filtered recipients
  const filteredRecipients = (data?.recipientsTable || []).filter((r: any) => {
    const matchesSearch = r.email.toLowerCase().includes(recipientSearch.toLowerCase());
    const matchesFilter = recipientFilter === "ALL" || r.status.toUpperCase() === recipientFilter;
    return matchesSearch && matchesFilter;
  });

  // Delivery badge styling
  let deliveryRateBadge = "No Data";
  let deliveryBadgeColor = "bg-gray-100 text-gray-600 border-gray-200";
  if (overview.sent > 0) {
    if (overview.deliveryRate >= 98) {
      deliveryRateBadge = "● 98%+ Excellent";
      deliveryBadgeColor = "bg-emerald-50 text-emerald-700 border-emerald-200";
    } else if (overview.deliveryRate >= 95) {
      deliveryRateBadge = "● 95-98% Good";
      deliveryBadgeColor = "bg-amber-50 text-amber-700 border-amber-200";
    } else {
      deliveryRateBadge = "● <95% Low";
      deliveryBadgeColor = "bg-red-50 text-red-700 border-red-200";
    }
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-16">
      <div className="max-w-[1340px] mx-auto p-6 space-y-8">
        
        {/* HEADER TOOLBAR */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-[#111827] tracking-tight">Metrics</h1>
            <p className="text-xs text-[#6B7280] mt-1">
              Real-time campaign deliverability, opens, clicks, and event telemetry.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Campaign Select Dropdown */}
            <select
              value={selectedCampaignId}
              onChange={(e) => handleCampaignChange(e.target.value)}
              className="bg-white border border-gray-200 rounded-xl px-4 py-2 text-xs font-semibold text-[#111827] focus:ring-2 focus:ring-indigo-500/30 outline-none shadow-2xs cursor-pointer hover:border-gray-300 transition"
            >
              <option value="">All Campaigns Combined</option>
              {data?.campaigns?.map((c: any) => (
                <option key={c.id} value={c.id}>
                  {c.campaignName} ({new Date(c.createdAt).toLocaleDateString()})
                </option>
              ))}
            </select>

            {/* Date Range Selector */}
            <div className="flex items-center bg-white border border-gray-200 rounded-xl p-1 shadow-2xs">
              {[7, 15, 30, 90].map((d) => (
                <button
                  key={d}
                  onClick={() => handleDaysChange(d)}
                  className={`px-3 py-1 text-xs font-semibold rounded-lg transition ${
                    days === d
                      ? "bg-indigo-600 text-white shadow-2xs"
                      : "text-[#6B7280] hover:text-[#111827] hover:bg-gray-50"
                  }`}
                >
                  Last {d} days
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* PRIMARY METRICS CHART CARD (RESEND DESIGN) */}
        <div className="bg-white border border-gray-200 rounded-3xl p-6 md:p-8 shadow-2xs space-y-6 relative">
          
          {/* Card Header & Filter */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 border-b border-gray-100 pb-6">
            <div className="flex flex-wrap items-center gap-10 sm:gap-16">
              <div className="space-y-1">
                <p className="text-xs font-bold text-[#6B7280] uppercase tracking-wider">Emails</p>
                <p className="text-4xl font-extrabold text-[#111827] tracking-tight">{overview.sent.toLocaleString()}</p>
              </div>

              <div className="space-y-1">
                <p className="text-xs font-bold text-[#6B7280] uppercase tracking-wider">Deliverability Rate</p>
                <div className="flex items-center gap-3">
                  <p className="text-4xl font-extrabold text-[#111827] tracking-tight">{overview.deliveryRate}%</p>
                  <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold border ${deliveryBadgeColor}`}>
                    {deliveryRateBadge}
                  </span>
                </div>
              </div>
            </div>

            {/* Event Series Filter */}
            <select
              value={eventFilter}
              onChange={(e) => setEventFilter(e.target.value as any)}
              className="bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2 text-xs font-semibold text-[#111827] focus:ring-2 focus:ring-indigo-500/30 outline-none cursor-pointer"
            >
              <option value="ALL">All Events</option>
              <option value="SENT">Sent</option>
              <option value="DELIVERED">Delivered</option>
              <option value="OPENED">Opened</option>
              <option value="CLICKED">Clicked</option>
              <option value="BOUNCED">Bounced</option>
            </select>
          </div>

          {/* Chart Container */}
          <div className="h-[320px] w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={timeSeries} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="gradientSent" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0284C7" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#0284C7" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="gradientDelivered" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="gradientOpened" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366F1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6366F1" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="gradientClicked" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#F59E0B" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="gradientBounced" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#EF4444" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#EF4444" stopOpacity={0}/>
                  </linearGradient>
                </defs>

                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#64748B' }} stroke="#E2E8F0" />
                <YAxis tick={{ fontSize: 11, fill: '#64748B' }} stroke="#E2E8F0" allowDecimals={false} />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (!active || !payload || !payload.length) return null;
                    return (
                      <div className="bg-white border border-gray-200 rounded-xl p-3 shadow-lg text-xs space-y-1.5 min-w-[140px]">
                        <p className="font-bold text-[#111827] border-b border-gray-100 pb-1">{label}</p>
                        {payload.map((entry: any, i: number) => (
                          <div key={i} className="flex items-center justify-between gap-4 text-xs font-semibold">
                            <span style={{ color: entry.color }}>● {entry.name}:</span>
                            <span className="text-[#111827] font-bold">{entry.value}</span>
                          </div>
                        ))}
                      </div>
                    );
                  }}
                />

                {(eventFilter === "ALL" || eventFilter === "SENT") && (
                  <Area type="monotone" dataKey="sent" stroke="#0284C7" strokeWidth={2} fillOpacity={1} fill="url(#gradientSent)" name="Sent" />
                )}
                {(eventFilter === "ALL" || eventFilter === "DELIVERED") && (
                  <Area type="monotone" dataKey="delivered" stroke="#10B981" strokeWidth={2} fillOpacity={1} fill="url(#gradientDelivered)" name="Delivered" />
                )}
                {(eventFilter === "ALL" || eventFilter === "OPENED") && (
                  <Area type="monotone" dataKey="opened" stroke="#6366F1" strokeWidth={2} fillOpacity={1} fill="url(#gradientOpened)" name="Opened" />
                )}
                {(eventFilter === "ALL" || eventFilter === "CLICKED") && (
                  <Area type="monotone" dataKey="clicked" stroke="#F59E0B" strokeWidth={2} fillOpacity={1} fill="url(#gradientClicked)" name="Clicked" />
                )}
                {(eventFilter === "ALL" || eventFilter === "BOUNCED") && (
                  <Area type="monotone" dataKey="bounced" stroke="#EF4444" strokeWidth={2} fillOpacity={1} fill="url(#gradientBounced)" name="Bounced" />
                )}
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Footer Legend Bar */}
          <div className="border-t border-gray-100 pt-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold">
            <div className="flex items-center gap-2 text-[#111827]">
              <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse"></span>
              <span className="font-bold">{data?.domainLabel || "send.au-acadex.com"}</span>
              <span className="text-[#6B7280]">({overview.sent.toLocaleString()})</span>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-[#6B7280]">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#0284C7]"></span>
                <span className="text-[#111827] font-bold">100%</span> Sent
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]"></span>
                <span className="text-[#111827] font-bold">{overview.deliveryRate}%</span> Delivered
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#6366F1]"></span>
                <span className="text-[#111827] font-bold">{overview.openRate}%</span> Opened
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]"></span>
                <span className="text-[#111827] font-bold">{overview.ctr}%</span> Clicked
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444]"></span>
                <span className="text-[#111827] font-bold">{overview.bounceRate}%</span> Bounced
              </span>
            </div>
          </div>
        </div>

        {/* SECONDARY 2-COLUMN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* CARD 1: BOUNCE RATE & HEALTH */}
          <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-2xs space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-xs font-bold text-[#6B7280] uppercase tracking-wider">Bounce Rate</p>
                  <p className="text-3xl font-extrabold text-[#111827]">{overview.bounceRate}%</p>
                </div>
                <div className="p-2 bg-gray-50 border border-gray-200 rounded-xl text-gray-400" title="Percentage of sent emails that bounced">
                  <Info className="w-4 h-4" />
                </div>
              </div>

              {/* Bounce Breakdown Pills */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3 bg-red-50 border border-red-100 rounded-xl space-y-1">
                  <p className="text-[11px] font-bold text-red-900 uppercase">Hard Bounces</p>
                  <p className="text-lg font-extrabold text-red-700">{overview.hardBounces}</p>
                </div>
                <div className="p-3 bg-amber-50 border border-amber-100 rounded-xl space-y-1">
                  <p className="text-[11px] font-bold text-amber-900 uppercase">Soft Bounces</p>
                  <p className="text-lg font-extrabold text-amber-700">{overview.softBounces}</p>
                </div>
              </div>
            </div>

            {/* Mini Bounce Trend Chart */}
            <div className="h-[120px] w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={timeSeries}>
                  <Area type="monotone" dataKey="bounced" stroke="#EF4444" strokeWidth={2} fill="#FEE2E2" fillOpacity={0.4} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* CARD 2: ENGAGEMENT & CLICK HEATMAP */}
          <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-2xs space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                <div className="space-y-1">
                  <p className="text-xs font-bold text-[#6B7280] uppercase tracking-wider">Open Rate</p>
                  <p className="text-2xl font-extrabold text-[#111827]">{overview.openRate}%</p>
                </div>
                <div className="space-y-1 text-right">
                  <p className="text-xs font-bold text-[#6B7280] uppercase tracking-wider">Click-Through Rate</p>
                  <p className="text-2xl font-extrabold text-indigo-600">{overview.ctr}%</p>
                </div>
              </div>

              {/* Click Heatmap */}
              <div className="space-y-3 pt-1">
                <p className="text-xs font-bold text-[#111827] uppercase tracking-wider flex items-center gap-2">
                  <MousePointer className="w-3.5 h-3.5 text-amber-500" /> Link Click Heatmap
                </p>

                {data?.clickHeatmap?.length > 0 ? (
                  <div className="space-y-3 max-h-[160px] overflow-y-auto pr-1">
                    {data.clickHeatmap.map((item: any, idx: number) => (
                      <div key={idx} className="p-3 bg-gray-50 border border-gray-200 rounded-xl space-y-1.5 text-xs">
                        <div className="flex items-center justify-between font-semibold">
                          <span className="text-[#111827]">{item.element}</span>
                          <span className="text-amber-700 font-bold">{item.clicks} clicks ({item.percentage}%)</span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full bg-amber-500 rounded-full" style={{ width: `${item.percentage}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-6 text-center text-xs text-gray-400 border border-dashed border-gray-200 rounded-xl bg-gray-50">
                    No click telemetry recorded for this timeframe yet.
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>

        {/* RECIPIENT ACTIVITY STREAM & TABLE */}
        <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-2xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-[#111827]">Recipient Activity Audit</h3>
              <p className="text-xs text-[#6B7280] mt-0.5">Live event status for individual email recipients.</p>
            </div>

            {/* Filter Pills & Search */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search recipient..."
                  value={recipientSearch}
                  onChange={(e) => setRecipientSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs text-[#111827] focus:ring-2 focus:ring-indigo-500/30 outline-none"
                />
              </div>

              <select
                value={recipientFilter}
                onChange={(e) => setRecipientFilter(e.target.value)}
                className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs font-semibold text-[#111827] focus:ring-2 focus:ring-indigo-500/30 outline-none cursor-pointer"
              >
                <option value="ALL">All Statuses</option>
                <option value="DELIVERED">Delivered</option>
                <option value="OPENED">Opened</option>
                <option value="CLICKED">Clicked</option>
                <option value="BOUNCED">Bounced</option>
              </select>
            </div>
          </div>

          {/* Data Table (Exact Resend Format: To, Status, Subject, Sent) */}
          <div className="overflow-x-auto border border-gray-200 rounded-2xl">
            {filteredRecipients.length > 0 ? (
              <table className="w-full text-left text-xs text-[#111827]">
                <thead className="bg-gray-50 border-b border-gray-200 text-[#6B7280] font-semibold uppercase tracking-wider">
                  <tr>
                    <th className="p-3.5">To</th>
                    <th className="p-3.5">Status</th>
                    <th className="p-3.5">Subject</th>
                    <th className="p-3.5">Sent</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 font-medium">
                  {filteredRecipients.map((r: any, idx: number) => (
                    <tr key={idx} className="hover:bg-gray-50/80 transition">
                      <td className="p-3.5 font-bold text-[#111827]">{r.to || r.email}</td>
                      <td className="p-3.5">
                        <span className={`px-2.5 py-1 text-[10px] font-bold rounded-full border ${
                          r.status === "Opened" ? "bg-indigo-50 text-indigo-700 border-indigo-200" :
                          r.status === "Clicked" ? "bg-amber-50 text-amber-700 border-amber-200" :
                          r.status === "Bounced" ? "bg-red-50 text-red-700 border-red-200" :
                          "bg-emerald-50 text-emerald-700 border-emerald-200"
                        }`}>
                          ● {r.status}
                        </span>
                      </td>
                      <td className="p-3.5 font-semibold text-gray-700 truncate max-w-xs">{r.subject || "testing feature"}</td>
                      <td className="p-3.5 text-gray-500 font-semibold">{r.sent || "2h ago"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="p-10 text-center text-xs text-gray-400">
                No recipient activity matches your search filter.
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
