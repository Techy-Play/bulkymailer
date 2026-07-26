"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  BarChart3, Users, Mail, Calendar, FileText, CheckCircle2,
  Plus, ArrowUpRight, Send, MailCheck
} from "lucide-react";
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip
} from "recharts";

type Timeline = "24H" | "1W" | "1M" | "6M";
type MetricType = "campaigns" | "contacts" | "emailsSent" | "sentCampaigns";

interface CampaignItem {
  id: string;
  name: string;
  status: string;
  time: string;
}

interface ChartBucket {
  name: string;
  dateLabel: string;
  campaigns: number;
  contacts: number;
  emailsSent: number;
  sentCampaigns: number;
  campaignList: CampaignItem[];
}

export default function AnalyticsPage() {
  const [timeline, setTimeline] = useState<Timeline>("1M");
  const [activeMetric, setActiveMetric] = useState<MetricType>("campaigns");
  const [realStats, setRealStats] = useState<any[]>([]);
  const [chartData, setChartData] = useState<ChartBucket[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDayCampaigns, setSelectedDayCampaigns] = useState<{
    dateLabel: string;
    campaigns: CampaignItem[];
  } | null>(null);

  useEffect(() => {
    async function fetchStats() {
      setLoading(true);
      try {
        const res = await fetch(`/api/analytics?timeline=${timeline}`);
        if (res.ok) {
          const data = await res.json();
          setRealStats(data.stats || []);
          setChartData(data.chartData || []);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, [timeline]);

  const metricConfigs = {
    campaigns: {
      title: "Campaigns Created",
      color: "#6366f1", // Indigo
      gradientId: "campaignsGrad",
      label: "Total Campaigns",
      icon: FileText,
      bg: "bg-indigo-50",
      iconColor: "text-indigo-600",
    },
    contacts: {
      title: "Contacts Added",
      color: "#10b981", // Emerald
      gradientId: "contactsGrad",
      label: "Active Contacts",
      icon: Users,
      bg: "bg-emerald-50",
      iconColor: "text-emerald-600",
    },
    emailsSent: {
      title: "Emails Sent",
      color: "#3b82f6", // Blue
      gradientId: "emailsGrad",
      label: "Emails Sent (Month)",
      icon: Mail,
      bg: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    sentCampaigns: {
      title: "Completed Sends",
      color: "#8b5cf6", // Purple
      gradientId: "sentGrad",
      label: "Sent Campaigns",
      icon: CheckCircle2,
      bg: "bg-purple-50",
      iconColor: "text-purple-600",
    },
  };

  const activeConfig = metricConfigs[activeMetric];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#111827]">Analytics</h1>
          <p className="text-sm text-[#6B7280] mt-0.5">Track email dispatches, campaign activity, and contact growth</p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/campaigns/new"
            className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-xl transition shadow-sm"
          >
            <Plus className="w-4 h-4" />
            Create Campaign
          </Link>
          <div className="flex items-center gap-2 bg-white p-1.5 rounded-xl border border-gray-200 shadow-sm">
            <Calendar className="w-4 h-4 text-gray-400 ml-2" />
            <select
              value={timeline}
              onChange={(e) => setTimeline(e.target.value as Timeline)}
              className="bg-transparent text-sm text-[#111827] font-semibold focus:outline-none px-2 py-1 appearance-none cursor-pointer"
            >
              <option value="24H">Last 24 Hours</option>
              <option value="1W">Last 7 Days</option>
              <option value="1M">Last 30 Days</option>
              <option value="6M">Last 6 Months</option>
            </select>
          </div>
        </div>
      </div>

      {/* Top Interactive Metric Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {realStats.length > 0 ? (
          (
            [
              { id: "emailsSent", label: "Emails Sent (Month)", val: realStats[0]?.value ?? "0", icon: Mail, bg: "bg-blue-50", color: "text-blue-600" },
              { id: "campaigns", label: "Total Campaigns", val: realStats[1]?.value ?? "0", icon: FileText, bg: "bg-indigo-50", color: "text-indigo-600" },
              { id: "sentCampaigns", label: "Sent Campaigns", val: realStats[2]?.value ?? "0", icon: CheckCircle2, bg: "bg-purple-50", color: "text-purple-600" },
              { id: "contacts", label: "Active Contacts", val: realStats[3]?.value ?? "0", icon: Users, bg: "bg-emerald-50", color: "text-emerald-600" },
            ] as const
          ).map((m) => {
            const isSelected = activeMetric === m.id;
            return (
              <button
                key={m.id}
                onClick={() => setActiveMetric(m.id as MetricType)}
                className={`p-5 rounded-2xl border text-left transition-all shadow-sm ${
                  isSelected
                    ? "bg-white border-indigo-600 ring-2 ring-indigo-500/20"
                    : "bg-white border-gray-200 hover:border-gray-300 hover:bg-gray-50/50"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className={`w-8 h-8 rounded-lg ${m.bg} flex items-center justify-center`}>
                    <m.icon className={`w-4 h-4 ${m.color}`} />
                  </div>
                  {isSelected && (
                    <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wide bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-100">
                      Plotting Graph
                    </span>
                  )}
                </div>
                <span className="text-xs font-semibold text-[#6B7280]">{m.label}</span>
                <p className="text-2xl font-bold text-[#111827] mt-0.5">{m.val}</p>
              </button>
            );
          })
        ) : (
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-white border border-gray-200 p-5 rounded-2xl shadow-sm animate-pulse h-28"></div>
          ))
        )}
      </div>

      {/* Main Chart Card */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base font-bold text-[#111827] flex items-center gap-2">
              {activeConfig.title} Trend
              <span className="text-xs font-normal text-[#6B7280]">
                ({chartData[0]?.dateLabel || ""} - {chartData[chartData.length - 1]?.dateLabel || ""})
              </span>
            </h2>
          </div>
          <span className="text-xs text-[#6B7280] font-medium bg-gray-100 px-3 py-1 rounded-full">
            Database Feed
          </span>
        </div>

        {/* Recharts Canvas */}
        <div className="h-[320px] w-full">
          {loading ? (
            <div className="h-full flex items-center justify-center">
              <div className="w-6 h-6 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, bottom: 0, left: -20 }}>
                <defs>
                  <linearGradient id="campaignsGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="contactsGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="emailsGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="sentGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#f3f4f6" strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="name"
                  stroke="#9ca3af"
                  tick={{ fill: "#6b7280", fontSize: 11 }}
                  tickMargin={8}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  stroke="#9ca3af"
                  tick={{ fill: "#6b7280", fontSize: 11 }}
                  tickMargin={8}
                  axisLine={false}
                  tickLine={false}
                  allowDecimals={false}
                />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const dataItem: ChartBucket = payload[0].payload;
                      return (
                        <div className="bg-white border border-gray-200 rounded-xl p-3 shadow-lg text-xs space-y-1.5 min-w-[180px]">
                          <p className="font-semibold text-[#111827]">{dataItem.dateLabel}</p>
                          <div className="flex items-center justify-between text-[#6B7280]">
                            <span>{activeConfig.title}:</span>
                            <span className="font-bold text-[#111827]">
                              {dataItem[activeMetric as "campaigns" | "contacts" | "emailsSent" | "sentCampaigns"]}
                            </span>
                          </div>
                          {dataItem.campaignList.length > 0 && (
                            <div className="pt-1.5 border-t border-gray-100">
                              <p className="text-[10px] font-semibold text-indigo-600 uppercase tracking-wide mb-1">
                                ✉ Created Campaigns ({dataItem.campaignList.length})
                              </p>
                              {dataItem.campaignList.map((c) => (
                                <div key={c.id} className="text-[#111827] font-medium truncate">
                                  • {c.name}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Area
                  type="monotone"
                  dataKey={activeMetric}
                  stroke={activeConfig.color}
                  strokeWidth={3}
                  fillOpacity={1}
                  fill={`url(#${activeConfig.gradientId})`}
                  dot={{ r: 3, fill: activeConfig.color }}
                  activeDot={{ r: 6, fill: activeConfig.color }}
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Campaign Creation Activity Timeline */}
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-[#6B7280] uppercase tracking-wide flex items-center gap-1.5">
              <MailCheck className="w-3.5 h-3.5 text-indigo-600" />
              Campaign Creation Markers
            </span>
            <span className="text-xs text-[#6B7280]">Click any marker to view created campaigns</span>
          </div>

          <div className="relative overflow-x-auto py-2">
            <div className="flex items-center justify-between min-w-[600px] px-2">
              {chartData.map((bucket, idx) => {
                const hasCampaigns = bucket.campaignList.length > 0;
                return (
                  <div
                    key={idx}
                    className="flex flex-col items-center group relative cursor-pointer"
                    onClick={() => {
                      if (hasCampaigns) {
                        setSelectedDayCampaigns({
                          dateLabel: bucket.dateLabel,
                          campaigns: bucket.campaignList,
                        });
                      }
                    }}
                  >
                    {/* Campaign Marker Icon */}
                    {hasCampaigns ? (
                      <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-xs shadow-md hover:scale-110 transition group-hover:bg-indigo-700">
                        {bucket.campaignList.length > 1 ? (
                          <span>{bucket.campaignList.length}</span>
                        ) : (
                          <Mail className="w-4 h-4" />
                        )}
                      </div>
                    ) : (
                      <div className="w-2.5 h-2.5 rounded-full bg-gray-200 group-hover:bg-gray-300 transition my-2"></div>
                    )}

                    <span className="text-[10px] text-gray-400 mt-1 font-medium group-hover:text-[#111827] transition truncate max-w-[45px]">
                      {bucket.name}
                    </span>

                    {/* Tooltip on hover */}
                    {hasCampaigns && (
                      <div className="absolute bottom-full mb-2 hidden group-hover:block z-30 bg-gray-900 text-white text-xs rounded-xl p-2.5 shadow-xl w-48 pointer-events-none">
                        <p className="font-semibold text-indigo-300 text-[11px] mb-1">{bucket.dateLabel}</p>
                        {bucket.campaignList.map((c) => (
                          <div key={c.id} className="text-xs truncate">
                            • {c.name} ({c.status})
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Selected Day Campaigns Popup Modal */}
      {selectedDayCampaigns && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl border border-gray-200 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-[#111827] text-base">Campaigns Created</h3>
                <p className="text-xs text-[#6B7280]">{selectedDayCampaigns.dateLabel}</p>
              </div>
              <button
                onClick={() => setSelectedDayCampaigns(null)}
                className="p-1 rounded-lg text-gray-400 hover:text-[#111827] hover:bg-gray-100 transition"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2 max-h-60 overflow-y-auto">
              {selectedDayCampaigns.campaigns.map((c) => (
                <div key={c.id} className="p-3 bg-gray-50 border border-gray-200 rounded-xl flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-sm text-[#111827]">{c.name}</p>
                    <p className="text-xs text-[#6B7280]">Created at {c.time}</p>
                  </div>
                  <span className="px-2.5 py-1 bg-indigo-50 text-indigo-700 text-xs font-semibold rounded-full border border-indigo-100">
                    {c.status}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <Link
                href="/dashboard/campaigns"
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-xl transition flex items-center gap-1.5 shadow-sm"
              >
                View All Campaigns
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
