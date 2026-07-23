import { redirect } from "next/navigation";
import Link from "next/link";
import { getSessionUser, FREE_TIER_MONTHLY_LIMIT } from "@/lib/auth";
import { db } from "@/lib/db";
import {
  Mail, Users, BarChart3, Zap, PlusCircle, ArrowRight,
  FileText, Globe, CheckCircle2, AlertTriangle, Inbox,
  TrendingUp, Clock, Star,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const user = await getSessionUser();
  if (!user) redirect("/login");
  if (!user.emailVerified) redirect("/verify-otp");

  // Fetch stats
  const [contactListCount, totalContacts] = await Promise.all([
    db.contactList.count({ where: { userId: user.id } }),
    db.contact.count({ where: { list: { userId: user.id } } }),
  ]);

  const used = user.emailsSentThisMonth;
  const limit = FREE_TIER_MONTHLY_LIMIT;
  const usagePct = Math.min(100, Math.round((used / limit) * 100));
  const usageColor =
    usagePct >= 90 ? "bg-red-500" : usagePct >= 70 ? "bg-amber-500" : "bg-indigo-500";

  const STATS = [
    {
      label: "Emails This Month",
      value: `${used}/${limit}`,
      sub: `${limit - used} remaining`,
      icon: Zap,
      color: "text-indigo-400",
      bg: "bg-indigo-500/10 border-indigo-500/20",
    },
    {
      label: "Contact Lists",
      value: String(contactListCount),
      sub: "Active lists",
      icon: Inbox,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10 border-emerald-500/20",
    },
    {
      label: "Total Contacts",
      value: totalContacts.toLocaleString(),
      sub: "Across all lists",
      icon: Users,
      color: "text-violet-400",
      bg: "bg-violet-500/10 border-violet-500/20",
    },
    {
      label: "Avg Open Rate",
      value: "—",
      sub: "No campaigns yet",
      icon: BarChart3,
      color: "text-amber-400",
      bg: "bg-amber-500/10 border-amber-500/20",
    },
  ];

  const QUICK_ACTIONS = [
    {
      icon: PlusCircle,
      label: "New Campaign",
      desc: "Create and send an email campaign",
      href: "/dashboard/campaigns/new",
      color: "from-indigo-500 to-violet-600",
    },
    {
      icon: Users,
      label: "Import Contacts",
      desc: "Upload a CSV or Excel file",
      href: "/dashboard/contacts",
      color: "from-emerald-500 to-teal-600",
    },
    {
      icon: FileText,
      label: "Browse Templates",
      desc: "Personalized, newsletter, promo & more",
      href: "/dashboard/templates",
      color: "from-amber-500 to-orange-600",
    },
    {
      icon: Globe,
      label: "Verify Domain",
      desc: "Set up SPF, DKIM, and DMARC",
      href: "/dashboard/settings/domains",
      color: "from-rose-500 to-pink-600",
    },
  ];

  const CHECKLIST = [
    { label: "Create your account", done: true },
    { label: "Verify your email", done: user.emailVerified },
    { label: "Upload your logo", done: !!user.organization?.logoUrl },
    { label: "Import your first contact list", done: contactListCount > 0 },
    { label: "Send your first campaign", done: used > 0 },
  ];

  const checklistDone = CHECKLIST.filter((c) => c.done).length;

  return (
    <div className="space-y-6">
      {/* ── Welcome Banner ── */}
      <div className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-700 rounded-2xl p-6 text-white shadow-xl shadow-indigo-900/30">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.3),transparent)]" />
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/20 text-xs font-bold uppercase tracking-wide">
                <Zap className="w-3 h-3" /> Free Plan
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Welcome back, {user.firstName}! 👋
            </h1>
            <p className="mt-1 text-indigo-200 text-sm">
              {user.organization?.name && (
                <span className="font-medium text-white">{user.organization.name} · </span>
              )}
              {limit - used} of {limit} emails remaining this month
            </p>
          </div>
          <Link
            href="/dashboard/templates"
            className="shrink-0 inline-flex items-center gap-2 px-5 py-3 bg-white text-indigo-700 font-bold text-sm rounded-xl hover:bg-indigo-50 transition shadow-sm"
          >
            <Star className="w-4 h-4" /> Pick a Template
          </Link>
        </div>
        {/* Usage bar */}
        <div className="mt-5 relative z-10">
          <div className="flex items-center justify-between text-xs text-indigo-200 mb-1.5">
            <span>Monthly email usage</span>
            <span className="font-bold text-white">{usagePct}%</span>
          </div>
          <div className="h-2 bg-white/20 rounded-full overflow-hidden">
            <div
              className={`h-full ${usageColor} rounded-full transition-all`}
              style={{ width: `${usagePct}%` }}
            />
          </div>
          {usagePct >= 90 && (
            <div className="flex items-center gap-1.5 mt-2 text-xs text-amber-300">
              <AlertTriangle className="w-3.5 h-3.5" />
              You&apos;re near your monthly limit ({limit - used} left)
            </div>
          )}
        </div>
      </div>

      {/* ── Stats Grid ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map(({ label, value, sub, icon: Icon, color, bg }) => (
          <div key={label} className={`rounded-2xl p-5 border ${bg} backdrop-blur-sm`}>
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">{label}</p>
              <div className={`w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center`}>
                <Icon className={`w-4 h-4 ${color}`} />
              </div>
            </div>
            <p className="text-2xl font-extrabold text-white">{value}</p>
            <p className="text-xs text-slate-500 mt-0.5">{sub}</p>
          </div>
        ))}
      </div>

      {/* ── Quick Actions + Checklist row ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="lg:col-span-2">
          <h2 className="text-sm font-bold text-slate-300 uppercase tracking-widest mb-3">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {QUICK_ACTIONS.map(({ icon: Icon, label, desc, href, color }) => (
              <Link
                key={label}
                href={href}
                className="group bg-slate-900 border border-slate-800 rounded-2xl p-5 hover:border-indigo-500/50 hover:bg-slate-800 transition-all"
              >
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-3 shadow-lg`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <p className="font-semibold text-slate-200 text-sm group-hover:text-white transition">{label}</p>
                <p className="text-xs text-slate-500 mt-0.5">{desc}</p>
                <div className="flex items-center gap-1 mt-3 text-xs font-semibold text-indigo-400 opacity-0 group-hover:opacity-100 transition">
                  Go <ArrowRight className="w-3 h-3" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Getting Started */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-slate-300 uppercase tracking-widest">Getting Started</h2>
            <span className="text-xs font-bold text-indigo-400">{checklistDone}/{CHECKLIST.length}</span>
          </div>
          <div className="h-1.5 bg-slate-800 rounded-full mb-4">
            <div
              className="h-full bg-indigo-500 rounded-full transition-all"
              style={{ width: `${(checklistDone / CHECKLIST.length) * 100}%` }}
            />
          </div>
          <div className="space-y-2.5">
            {CHECKLIST.map((item) => (
              <div key={item.label} className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                  item.done ? "bg-emerald-500" : "border-2 border-slate-600"
                }`}>
                  {item.done && <CheckCircle2 className="w-3 h-3 text-white" />}
                </div>
                <span className={`text-sm ${item.done ? "text-slate-500 line-through" : "text-slate-300"}`}>
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Recent Activity ── */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-sm font-bold text-slate-300 uppercase tracking-widest">Recent Campaigns</h2>
          <Link href="/dashboard/campaigns" className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold transition">
            View all →
          </Link>
        </div>
        {/* Empty state */}
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="w-14 h-14 rounded-2xl bg-slate-800 flex items-center justify-center mb-4">
            <Mail className="w-7 h-7 text-slate-600" />
          </div>
          <p className="text-slate-400 font-medium">No campaigns yet</p>
          <p className="text-sm text-slate-600 mt-1 max-w-xs">
            Import your contacts and pick a template to send your first campaign.
          </p>
          <Link
            href="/dashboard/templates"
            className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-xl transition"
          >
            <PlusCircle className="w-4 h-4" /> Start a Campaign
          </Link>
        </div>
      </div>

      {/* ── Plan Info Bar ── */}
      <div className="bg-gradient-to-r from-slate-900 to-indigo-950 border border-indigo-900/50 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center">
            <Zap className="w-5 h-5 text-indigo-400" />
          </div>
          <div>
            <p className="text-sm font-bold text-white">Free Plan Active</p>
            <p className="text-xs text-indigo-300">100 emails/month · All core features included</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 italic">More plans coming soon</span>
          <TrendingUp className="w-4 h-4 text-slate-600" />
        </div>
      </div>
    </div>
  );
}
