"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Users, FileText, BarChart3, Settings, User,
  LogOut, Mail, Menu, X, ChevronDown, Bell, Zap, PanelLeft, ChevronRight, Send,
} from "lucide-react";
import { TopProgressBar } from '@/components/ui/top-progress-bar';

const FREE_TIER_LIMIT = 100;

const NAV_ITEMS = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Campaigns", href: "/dashboard/campaigns", icon: Send },
  { label: "Contacts", href: "/dashboard/contacts", icon: Users },
  { label: "Templates", href: "/dashboard/templates", icon: FileText },
  { label: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
  { label: "Profile", href: "/dashboard/profile", icon: User },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

interface UserInfo {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  profileImageUrl: string | null;
  emailsSentThisMonth: number;
  subscriptionType: string;
  navLayout: "sidebar" | "topnav";
}

interface ShellProps {
  children: React.ReactNode;
  navLayout: "sidebar" | "topnav";
  user: UserInfo;
  orgName: string | null;
  orgLogoUrl: string | null;
}

function Avatar({ user, size = 32 }: { user: UserInfo; size?: number }) {
  const initials = `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();
  if (user.profileImageUrl) {
    return (
      <img
        src={user.profileImageUrl}
        alt={user.firstName}
        className="rounded-full object-cover bg-gray-100 border border-gray-200"
        style={{ width: size, height: size }}
      />
    );
  }
  return (
    <div
      className="rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white font-bold border border-indigo-300"
      style={{ width: size, height: size, fontSize: size * 0.35 }}
    >
      {initials}
    </div>
  );
}

function UsageMeter({ used, limit }: { used: number; limit: number }) {
  const pct = Math.min(100, Math.round((used / limit) * 100));
  const color =
    pct >= 90 ? "bg-red-500" : pct >= 70 ? "bg-amber-500" : "bg-indigo-600";
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs text-[#6B7280]">Emails Sent</span>
        <span className="text-xs font-semibold text-[#111827]">
          {used} / {limit}
        </span>
      </div>
      <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`h-full ${color} rounded-full transition-all`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="text-[10px] text-[#6B7280] mt-0.5">{limit - used} remaining</p>
    </div>
  );
}

function FreeBadge() {
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-600 text-white uppercase tracking-wide">
      <Zap className="w-2.5 h-2.5" /> Free
    </span>
  );
}

// ─── Sidebar layout ────────────────────────────────────────────────────────

function SidebarLayout({ children, user, orgName, orgLogoUrl }: Omit<ShellProps, "navLayout">) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const Sidebar = (
    <aside
      className={`h-full flex flex-col bg-white border-r border-gray-200 transition-all duration-300 ${
        collapsed ? "w-16" : "w-60"
      }`}
    >
      {/* Logo */}
      <div className={`flex items-center gap-3 px-4 py-5 border-b border-gray-200 ${collapsed ? "justify-center" : ""}`}>
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shrink-0">
          <Mail className="w-4 h-4 text-white" />
        </div>
        {!collapsed && (
          <div className="min-w-0">
            <p className="font-bold text-[#111827] text-sm truncate">BulkyMailer</p>
            {orgName && <p className="text-[10px] text-[#6B7280] truncate">{orgName}</p>}
          </div>
        )}
        <button
          onClick={() => setCollapsed((c) => !c)}
          className={`ml-auto text-[#6B7280] hover:text-[#111827] transition shrink-0 ${collapsed ? "hidden" : ""}`}
        >
          <PanelLeft className="w-4 h-4" />
        </button>
      </div>
      {collapsed && (
        <button
          onClick={() => setCollapsed(false)}
          className="flex justify-center py-2 text-[#6B7280] hover:text-[#111827] transition border-b border-gray-200"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      )}

      {/* Nav */}
      <nav className="flex-1 px-2 py-4 space-y-0.5 overflow-y-auto">
        {NAV_ITEMS.map(({ label, href, icon: Icon }) => {
          const active = pathname === href || (href !== "/dashboard" && pathname.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              title={collapsed ? label : undefined}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all group ${
                active
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "text-[#6B7280] hover:bg-gray-50 hover:text-[#111827]"
              } ${collapsed ? "justify-center" : ""}`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              {!collapsed && <span className="truncate">{label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-3 py-4 border-t border-gray-200 space-y-3 bg-gray-50">
        {!collapsed && <UsageMeter used={user.emailsSentThisMonth} limit={FREE_TIER_LIMIT} />}
        <div className={`flex items-center gap-2 ${collapsed ? "justify-center" : ""}`}>
          <Avatar user={user} size={32} />
          {!collapsed && (
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold text-[#111827] truncate">
                {user.firstName} {user.lastName}
              </p>
              <div className="flex items-center gap-1">
                <FreeBadge />
              </div>
            </div>
          )}
          {!collapsed && (
            <form action="/api/auth/logout" method="POST">
              <button type="submit" title="Sign out"
                className="text-[#6B7280] hover:text-red-600 transition p-1">
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </form>
          )}
        </div>
      </div>
    </aside>
  );

  return (
    <div className="flex h-screen bg-[#F8FAFC] overflow-hidden">
      <TopProgressBar />
      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setMobileOpen(false)} />
      )}

      {/* Desktop sidebar */}
      <div className="hidden lg:flex">{Sidebar}</div>

      {/* Mobile sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 lg:hidden transition-transform duration-300 ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="h-full w-60 flex flex-col bg-white border-r border-gray-200">
          <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
                <Mail className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="font-bold text-[#111827] text-sm">BulkyMailer</span>
            </div>
            <button onClick={() => setMobileOpen(false)} className="text-[#6B7280] hover:text-[#111827]">
              <X className="w-5 h-5" />
            </button>
          </div>
          <nav className="flex-1 px-2 py-4 space-y-0.5">
            {NAV_ITEMS.map(({ label, href, icon: Icon }) => {
              const active = pathname === href || (href !== "/dashboard" && pathname.startsWith(href));
              return (
                <Link key={href} href={href} onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    active ? "bg-indigo-600 text-white" : "text-[#6B7280] hover:bg-gray-50 hover:text-[#111827]"
                  }`}>
                  <Icon className="w-4 h-4 shrink-0" />
                  {label}
                </Link>
              );
            })}
          </nav>
          <div className="px-3 py-4 border-t border-gray-200 space-y-3 bg-gray-50">
            <UsageMeter used={user.emailsSentThisMonth} limit={FREE_TIER_LIMIT} />
            <div className="flex items-center gap-2">
              <Avatar user={user} size={30} />
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold text-[#111827] truncate">{user.firstName} {user.lastName}</p>
                <FreeBadge />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top strip */}
        <header className="flex items-center gap-3 px-4 py-3 bg-white border-b border-gray-200 shrink-0">
          <button className="lg:hidden text-[#6B7280] hover:text-[#111827]" onClick={() => setMobileOpen(true)}>
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex-1" />
          <button className="relative text-[#6B7280] hover:text-[#111827] transition">
            <Bell className="w-5 h-5" />
          </button>
          <Link href="/dashboard/profile">
            <Avatar user={user} size={32} />
          </Link>
        </header>
        <main className="flex-1 overflow-y-auto bg-[#F8FAFC] p-6">
          {children}
        </main>
      </div>
    </div>
  );
}

// ─── Top Nav layout ─────────────────────────────────────────────────────────

function TopNavLayout({ children, user, orgName }: Omit<ShellProps, "navLayout">) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col">
      <TopProgressBar />
      {/* Top nav */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="flex items-center gap-4 h-14">
            {/* Logo */}
            <div className="flex items-center gap-2 shrink-0">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
                <Mail className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="font-bold text-[#111827] text-sm hidden sm:block">BulkyMailer</span>
            </div>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-1 flex-1 overflow-x-auto">
              {NAV_ITEMS.map(({ label, href, icon: Icon }) => {
                const active = pathname === href || (href !== "/dashboard" && pathname.startsWith(href));
                return (
                  <Link key={href} href={href}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                      active ? "bg-indigo-600 text-white" : "text-[#6B7280] hover:bg-gray-50 hover:text-[#111827]"
                    }`}>
                    <Icon className="w-3.5 h-3.5" />
                    {label}
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center gap-2 ml-auto">
              {/* Usage pill */}
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-50 border border-gray-200">
                <Zap className="w-3 h-3 text-indigo-600" />
                <span className="text-xs font-semibold text-[#111827]">
                  {user.emailsSentThisMonth}/{FREE_TIER_LIMIT}
                </span>
                <span className="text-xs text-[#6B7280]">emails</span>
              </div>
              <FreeBadge />
              {/* Profile dropdown */}
              <div className="relative">
                <button onClick={() => setProfileOpen((o) => !o)}
                  className="flex items-center gap-2">
                  <Avatar user={user} size={30} />
                  <ChevronDown className="w-3.5 h-3.5 text-[#6B7280]" />
                </button>
                {profileOpen && (
                  <div className="absolute right-0 top-full mt-2 w-52 bg-white border border-gray-200 rounded-xl shadow-xl z-50 overflow-hidden">
                    <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
                      <p className="text-sm font-semibold text-[#111827]">{user.firstName} {user.lastName}</p>
                      <p className="text-xs text-[#6B7280] truncate">{user.email}</p>
                    </div>
                    <Link href="/dashboard/profile" onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-2 px-4 py-2.5 text-sm text-[#111827] hover:bg-gray-50 transition">
                      <User className="w-4 h-4" /> Profile & Settings
                    </Link>
                    <form action="/api/auth/logout" method="POST">
                      <button type="submit"
                        className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition">
                        <LogOut className="w-4 h-4" /> Sign Out
                      </button>
                    </form>
                  </div>
                )}
              </div>
              <button className="md:hidden text-[#6B7280] hover:text-[#111827]" onClick={() => setMobileOpen((o) => !o)}>
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile nav */}
          {mobileOpen && (
            <nav className="md:hidden py-3 border-t border-gray-200 flex flex-col gap-1">
              {NAV_ITEMS.map(({ label, href, icon: Icon }) => {
                const active = pathname === href || (href !== "/dashboard" && pathname.startsWith(href));
                return (
                  <Link key={href} href={href} onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                      active ? "bg-indigo-600 text-white" : "text-[#6B7280] hover:bg-gray-50 hover:text-[#111827]"
                    }`}>
                    <Icon className="w-4 h-4" />
                    {label}
                  </Link>
                );
              })}
            </nav>
          )}
        </div>
      </header>

      <main className="flex-1 max-w-screen-xl mx-auto w-full px-4 py-6">
        {children}
      </main>
    </div>
  );
}

// ─── Shell (picks layout) ────────────────────────────────────────────────────

export default function DashboardShell(props: ShellProps) {
  return props.navLayout === "topnav" ? (
    <TopNavLayout {...props} />
  ) : (
    <SidebarLayout {...props} />
  );
}
