import { BarChart3, TrendingUp, Mail, Users, MousePointer, Eye } from "lucide-react";

export default function AnalyticsPage() {
  const PLACEHOLDER_STATS = [
    { label: "Total Sent", value: "0", icon: Mail, color: "text-indigo-400", bg: "bg-indigo-500/10 border-indigo-500/20" },
    { label: "Open Rate", value: "—", icon: Eye, color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20" },
    { label: "Click Rate", value: "—", icon: MousePointer, color: "text-violet-400", bg: "bg-violet-500/10 border-violet-500/20" },
    { label: "Unsubscribes", value: "0", icon: Users, color: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/20" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-white">Analytics</h1>
        <p className="text-sm text-slate-400 mt-1">Track your email campaign performance</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {PLACEHOLDER_STATS.map(({ label, value, icon: Icon, color, bg }) => (
          <div key={label} className={`rounded-2xl p-5 border ${bg}`}>
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">{label}</p>
              <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center">
                <Icon className={`w-4 h-4 ${color}`} />
              </div>
            </div>
            <p className="text-2xl font-extrabold text-white">{value}</p>
          </div>
        ))}
      </div>

      {/* Empty state */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl flex flex-col items-center justify-center py-20 text-center">
        <div className="w-16 h-16 rounded-2xl bg-slate-800 flex items-center justify-center mb-4">
          <BarChart3 className="w-8 h-8 text-slate-600" />
        </div>
        <p className="text-slate-400 font-medium text-lg">No data yet</p>
        <p className="text-sm text-slate-600 mt-2 max-w-xs">
          Send your first campaign to start seeing analytics here.
        </p>
        <div className="mt-6 flex items-center gap-2 text-xs text-indigo-400">
          <TrendingUp className="w-4 h-4" />
          <span>Analytics will appear after your first campaign send</span>
        </div>
      </div>
    </div>
  );
}
