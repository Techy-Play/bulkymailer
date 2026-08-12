"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Send,
  Users,
  FileText,
  BarChart3,
  User,
  Settings,
  LogOut,
  ChevronRight,
  PanelLeft,
  Zap,
  Menu,
  X,
  Bell,
  ChevronDown,
} from "lucide-react";
import { TopProgressBar } from "@/components/ui/top-progress-bar";

interface ShellProps {
  children: React.ReactNode;
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
    emailsSentThisMonth: number;
    profileImageUrl?: string | null;
  };
  orgName?: string;
  activeOrganizationId?: string;
  availableOrganizations?: { id: string; name: string }[];
  navLayout?: "sidebar" | "topnav";
}

const NAV_ITEMS = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Campaigns", href: "/dashboard/campaigns", icon: Send },
  { label: "Contacts", href: "/dashboard/contacts", icon: Users },
  { label: "Templates", href: "/dashboard/templates", icon: FileText },
  { label: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
  { label: "Settings", href: "/dashboard/settings/members", icon: Settings },
  { label: "Profile", href: "/dashboard/profile", icon: User },
];

const FREE_TIER_LIMIT = 100;

function Avatar({ user, size = 36 }: { user: ShellProps["user"]; size?: number }) {
  if (user.profileImageUrl) {
    return (
      <img
        src={user.profileImageUrl}
        alt={`${user.firstName} ${user.lastName}`}
        style={{ width: size, height: size }}
        className="rounded-full object-cover shrink-0 shadow-2xs border border-gray-200"
      />
    );
  }

  const initials = `${user.firstName?.[0] ?? ""}${user.lastName?.[0] ?? ""}`.toUpperCase() || "U";
  return (
    <div
      style={{ width: size, height: size }}
      className="rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center text-xs shrink-0 shadow-2xs"
    >
      {initials}
    </div>
  );
}

function UsageMeter({ used, limit }: { used: number; limit: number }) {
  const pct = Math.min(100, Math.round((used / limit) * 100));
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between items-center text-xs">
        <span className="text-[#6B7280] font-medium flex items-center gap-1">
          <Zap className="w-3 h-3 text-indigo-600" />
          Monthly Limit
        </span>
        <span className="font-semibold text-[#111827]">
          {used} / {limit}
        </span>
      </div>
      <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-indigo-600 rounded-full transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="text-[10px] text-[#6B7280]">{limit - used} emails remaining this month</p>
    </div>
  );
}

function FreeBadge() {
  return (
    <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-indigo-50 text-indigo-700 border border-indigo-100 rounded-full">
      Free Plan
    </span>
  );
}

// ─── Sidebar layout ─────────────────────────────────────────────────────────

function SidebarLayout(props: Omit<ShellProps, "navLayout">) {
  const { children, user, orgName } = props;
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const Sidebar = (
    <aside
      className={`h-full flex flex-col bg-white border-r border-gray-200 transition-all duration-300 ${
        collapsed ? "w-16" : "w-60"
      }`}
    >
      {/* Brand Icon.png & Title */}
      <div className={`flex items-center gap-2.5 px-4 py-5 border-b border-gray-200 ${collapsed ? "justify-center" : ""}`}>
        <Link href="/dashboard" className="flex items-center gap-2.5 min-w-0">
          <img
            src="/icon.png"
            alt="BulkyMailer"
            width={32}
            height={32}
            className="h-8 w-8 object-contain shrink-0"
          />
          {!collapsed && (
            <span className="font-extrabold text-lg tracking-tight text-[#111827] truncate">
              Bulky<span className="text-indigo-600">Mailer</span>
            </span>
          )}
        </Link>
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

      {/* Organization Switcher */}
      {!collapsed && props.availableOrganizations && props.activeOrganizationId && (
        <div className="px-4 py-3 border-b border-gray-200">
          <form action="/api/organizations/switch" method="POST" className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Organization</label>
            <select
              name="organizationId"
              defaultValue={props.activeOrganizationId}
              onChange={(e) => {
                fetch("/api/organizations/switch", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ organizationId: e.target.value })
                }).then(() => window.location.reload());
              }}
              className="w-full text-sm py-1.5 px-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-800 font-medium cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              {props.availableOrganizations.map(org => (
                <option key={org.id} value={org.id}>
                  {org.name}
                </option>
              ))}
            </select>
          </form>
        </div>
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
            <Link href="/dashboard" className="flex items-center gap-2">
              <img src="/icon.png" alt="BulkyMailer" width={28} height={28} className="h-7 w-7 object-contain" />
              <span className="font-extrabold text-base tracking-tight text-[#111827]">
                Bulky<span className="text-indigo-600">Mailer</span>
              </span>
            </Link>
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

function TopNavLayout(props: Omit<ShellProps, "navLayout">) {
  const { children, user, orgName, activeOrganizationId, availableOrganizations } = props;
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
            {/* Logo Image Only */}
            <div className="flex items-center shrink-0">
              <Link href="/dashboard" className="flex items-center gap-2">
                <img src="/icon.png" alt="BulkyMailer" width={28} height={28} className="h-7 w-7 object-contain" />
                <span className="font-extrabold text-base tracking-tight text-[#111827] hidden sm:block">
                  Bulky<span className="text-indigo-600">Mailer</span>
                </span>
              </Link>
            </div>

            {/* Org Switcher for TopNav */}
            {availableOrganizations && activeOrganizationId && (
              <div className="hidden sm:flex items-center pl-4 border-l border-gray-200 ml-2">
                <select
                  name="organizationId"
                  defaultValue={activeOrganizationId}
                  onChange={(e) => {
                    fetch("/api/organizations/switch", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ organizationId: e.target.value })
                    }).then(() => window.location.reload());
                  }}
                  className="text-sm py-1 pl-2 pr-6 bg-transparent border-none text-gray-700 font-medium cursor-pointer focus:ring-0"
                >
                  {availableOrganizations.map(org => (
                    <option key={org.id} value={org.id}>{org.name}</option>
                  ))}
                </select>
              </div>
            )}

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
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-50 border border-gray-200">
                <Zap className="w-3 h-3 text-indigo-600" />
                <span className="text-xs font-semibold text-[#111827]">
                  {user.emailsSentThisMonth}/{FREE_TIER_LIMIT}
                </span>
                <span className="text-xs text-[#6B7280]">emails</span>
              </div>
              <FreeBadge />
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
              <button className="md:hidden text-[#6B7280]" onClick={() => setMobileOpen((o) => !o)}>
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

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

export default function DashboardShell(props: ShellProps) {
  return props.navLayout === "topnav" ? (
    <TopNavLayout {...props} />
  ) : (
    <SidebarLayout {...props} />
  );
}
