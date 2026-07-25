"use client";

import { useState } from "react";
import { BarChart3, TrendingUp, Users, Mail, MousePointerClick, Eye, Calendar } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

type Timeline = "24H" | "1W" | "1M" | "6M";

export default function AnalyticsPage() {
  const [timeline, setTimeline] = useState<Timeline>("1M");

  // Mock data generator for different timelines
  const getMockData = (tl: Timeline) => {
    switch (tl) {
      case "24H":
        return Array.from({ length: 24 }).map((_, i) => ({
          name: `${i}:00`,
          opens: Math.floor(Math.random() * 50) + 10,
          clicks: Math.floor(Math.random() * 20),
        }));
      case "1W":
        return ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(day => ({
          name: day,
          opens: Math.floor(Math.random() * 500) + 100,
          clicks: Math.floor(Math.random() * 150) + 20,
        }));
      case "1M":
        return Array.from({ length: 30 }).map((_, i) => ({
          name: `Day ${i + 1}`,
          opens: Math.floor(Math.random() * 800) + 200,
          clicks: Math.floor(Math.random() * 250) + 50,
        }));
      case "6M":
        return ["Jan", "Feb", "Mar", "Apr", "May", "Jun"].map(month => ({
          name: month,
          opens: Math.floor(Math.random() * 5000) + 1000,
          clicks: Math.floor(Math.random() * 1200) + 300,
        }));
    }
  };

  const data = getMockData(timeline);

  const getStats = () => {
    // Generate some fake aggregated stats based on the timeline
    const multiplier = timeline === "24H" ? 1 : timeline === "1W" ? 7 : timeline === "1M" ? 30 : 180;
    return [
      { label: "Total Sent", value: (450 * multiplier).toLocaleString(), icon: Mail, color: "text-blue-600", bg: "bg-blue-100" },
      { label: "Avg Open Rate", value: "48.2%", icon: Eye, color: "text-emerald-600", bg: "bg-emerald-100" },
      { label: "Avg Click Rate", value: "12.4%", icon: MousePointerClick, color: "text-indigo-600", bg: "bg-indigo-100" },
      { label: "Active Subs", value: "3,240", icon: Users, color: "text-violet-600", bg: "bg-violet-100" },
    ];
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#111827]">Analytics</h1>
          <p className="text-sm text-[#6B7280] mt-1">Track your campaign performance</p>
        </div>
        <div className="flex items-center gap-2 bg-white p-1.5 rounded-lg border border-gray-200 shadow-sm">
          <Calendar className="w-4 h-4 text-gray-500 ml-2" />
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {getStats().map((stat, i) => (
          <div key={i} className="bg-white border border-gray-200 p-5 rounded-2xl shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className={`w-8 h-8 rounded-lg ${stat.bg} flex items-center justify-center`}>
                <stat.icon className={`w-4 h-4 ${stat.color}`} />
              </div>
              <span className="text-sm font-semibold text-[#6B7280]">{stat.label}</span>
            </div>
            <p className="text-2xl font-bold text-[#111827]">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <BarChart3 className="w-5 h-5 text-indigo-600" />
          <h2 className="text-lg font-bold text-[#111827]">Engagement Overview</h2>
        </div>
        
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
              <Line type="monotone" dataKey="opens" stroke="#10b981" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} name="Opens" />
              <Line type="monotone" dataKey="clicks" stroke="#6366f1" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} name="Clicks" />
              <CartesianGrid stroke="#f3f4f6" strokeDasharray="5 5" vertical={false} />
              <XAxis dataKey="name" stroke="#9ca3af" tick={{ fill: '#6b7280', fontSize: 12 }} tickMargin={10} axisLine={false} tickLine={false} />
              <YAxis stroke="#9ca3af" tick={{ fill: '#6b7280', fontSize: 12 }} tickMargin={10} axisLine={false} tickLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e5e7eb', borderRadius: '12px', color: '#111827', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' }}
                itemStyle={{ fontWeight: 'bold' }}
              />
              <Legend wrapperStyle={{ paddingTop: '20px' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
