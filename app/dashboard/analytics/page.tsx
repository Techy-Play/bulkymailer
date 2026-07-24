"use client";

import { BarChart3, TrendingUp, Users, Mail, MousePointerClick, Eye } from "lucide-react";

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-white">Analytics</h1>
        <p className="text-sm text-slate-400 mt-1">Track your campaign performance</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Sent", value: "0", icon: Mail, color: "text-blue-400" },
          { label: "Open Rate", value: "0%", icon: Eye, color: "text-emerald-400" },
          { label: "Click Rate", value: "0%", icon: MousePointerClick, color: "text-indigo-400" },
          { label: "Active Subs", value: "0", icon: Users, color: "text-violet-400" },
        ].map((stat, i) => (
          <div key={i} className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
            <div className="flex items-center gap-3 mb-2">
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
              <span className="text-sm font-semibold text-slate-400">{stat.label}</span>
            </div>
            <p className="text-2xl font-bold text-white">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mb-4">
          <TrendingUp className="w-8 h-8 text-slate-500" />
        </div>
        <h2 className="text-lg font-bold text-white mb-2">Detailed tracking coming soon</h2>
        <p className="text-sm text-slate-400 max-w-md">
          We are currently building advanced analytics including open tracking pixels, click-through heatmaps, and bounce rate analysis.
        </p>
      </div>
    </div>
  );
}
