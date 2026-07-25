"use client";

import { useEffect, useRef, useState } from "react";
import {
  User, Building2, Upload, Camera, CheckCircle2, AlertCircle,
  Save, PanelLeft, LayoutDashboard, Eye, EyeOff, Lock, RefreshCw, LogOut,
} from "lucide-react";

interface ProfileData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  profileImageUrl: string | null;
  navLayout: string;
  organization: {
    name: string;
    website: string;
    logoUrl: string | null;
    addressLine1: string;
    city: string;
    country: string;
  } | null;
}

function Toast({ message, type }: { message: string; type: "success" | "error" }) {
  return (
    <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-xl shadow-xl border text-sm font-medium transition-all ${
      type === "success"
        ? "bg-emerald-900/90 border-emerald-700 text-emerald-300"
        : "bg-red-900/90 border-red-700 text-red-300"
    }`}>
      {type === "success" ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
      {message}
    </div>
  );
}

function ImageUploadCard({
  label, description, currentUrl, aspectRatio = "1/1",
  uploadUrl, onUploaded,
}: {
  label: string; description: string; currentUrl: string | null;
  aspectRatio?: string; uploadUrl: string; onUploaded: (url: string) => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(currentUrl);

  async function handleFile(file: File) {
    setLoading(true);
    const localPreview = URL.createObjectURL(file);
    setPreview(localPreview);
    const fd = new FormData();
    fd.append("file", file);
    try {
      const res = await fetch(uploadUrl, { method: "POST", body: fd });
      const data = await res.json();
      if (res.ok) {
        onUploaded(data.url);
        setPreview(data.url);
      } else {
        setPreview(currentUrl);
      }
    } catch { setPreview(currentUrl); }
    setLoading(false);
  }

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="font-semibold text-white text-sm">{label}</p>
          <p className="text-xs text-slate-500 mt-0.5">{description}</p>
        </div>
        <button onClick={() => fileRef.current?.click()} disabled={loading}
          className="flex items-center gap-2 px-3 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 text-xs font-semibold rounded-xl transition disabled:opacity-50">
          {loading ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Upload className="w-3.5 h-3.5" />}
          {loading ? "Uploading…" : "Upload"}
        </button>
      </div>
      <input ref={fileRef} type="file" accept="image/*" className="hidden"
        onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); e.target.value = ""; }} />

      <div
        className={`bg-slate-800 border-2 border-dashed border-slate-700 rounded-xl flex items-center justify-center cursor-pointer hover:border-indigo-500 transition overflow-hidden`}
        style={{ aspectRatio, maxHeight: "180px" }}
        onClick={() => fileRef.current?.click()}
      >
        {preview ? (
          <img src={preview} alt={label} className="w-full h-full object-cover" />
        ) : (
          <div className="flex flex-col items-center gap-2 text-slate-600 py-8">
            <Camera className="w-8 h-8" />
            <p className="text-xs">Click to upload</p>
          </div>
        )}
      </div>
    </div>
  );
}

function NavLayoutCard({ current, onChange }: { current: string; onChange: (v: string) => void }) {
  const OPTIONS = [
    { id: "sidebar", label: "Sidebar Navigation", desc: "Fixed left sidebar with collapsible support", icon: <PanelLeft className="w-5 h-5" /> },
    { id: "topnav", label: "Top Navigation", desc: "Horizontal navigation bar at the top", icon: <LayoutDashboard className="w-5 h-5" /> },
  ];

  const [selected, setSelected] = useState(current);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  async function save(val: string) {
    setSaving(true);
    try {
      await fetch("/api/user/nav-layout", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ navLayout: val }),
      });
      onChange(val);
      setSaved(true);
      setTimeout(() => { setSaved(false); window.location.reload(); }, 1200);
    } catch { /* ignore */ }
    setSaving(false);
  }

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
      <p className="font-semibold text-white text-sm mb-1">Navigation Layout</p>
      <p className="text-xs text-slate-500 mb-4">Choose how the navigation is displayed. Changes apply immediately.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
        {OPTIONS.map((opt) => (
          <button key={opt.id} type="button"
            onClick={() => setSelected(opt.id)}
            className={`p-4 rounded-xl border text-left transition-all ${
              selected === opt.id
                ? "border-indigo-500 bg-indigo-500/10"
                : "border-slate-700 bg-slate-800 hover:border-slate-600"
            }`}>
            <div className={`mb-2 ${selected === opt.id ? "text-indigo-400" : "text-slate-500"}`}>{opt.icon}</div>
            <p className={`text-sm font-semibold ${selected === opt.id ? "text-white" : "text-slate-400"}`}>{opt.label}</p>
            <p className="text-xs text-slate-600 mt-0.5">{opt.desc}</p>
          </button>
        ))}
      </div>
      <button onClick={() => save(selected)} disabled={saving || selected === current}
        className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white text-sm font-semibold rounded-xl transition">
        {saving ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : saved ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Save className="w-3.5 h-3.5" />}
        {saved ? "Saved! Reloading…" : "Apply Layout"}
      </button>
    </div>
  );
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const [showPwChange, setShowPwChange] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const [pw, setPw] = useState({ current: "", new: "", confirm: "" });

  function showToast(message: string, type: "success" | "error") {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  }

  // Load profile from API
  useEffect(() => {
    fetch("/api/user/profile")
      .then((r) => r.json())
      .then((d) => { setProfile(d.profile); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  async function savePersonal() {
    if (!profile) return;
    setSaving(true);
    try {
      const res = await fetch("/api/user/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: profile.firstName,
          lastName: profile.lastName,
          phoneNumber: profile.phoneNumber,
        }),
      });
      if (res.ok) showToast("Profile updated successfully!", "success");
      else showToast("Failed to save. Try again.", "error");
    } catch {
      showToast("Network error.", "error");
    }
    setSaving(false);
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <RefreshCw className="w-6 h-6 text-indigo-500 animate-spin" />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="text-center py-16 text-slate-500">Could not load profile.</div>
    );
  }

  const inputClass =
    "w-full px-3 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none placeholder:text-slate-500";
  const labelClass = "block text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1.5";

  return (
    <div className="space-y-6 max-w-2xl">
      {toast && <Toast message={toast.message} type={toast.type} />}

      {/* Page header */}
      <div>
        <h1 className="text-2xl font-extrabold text-white">Profile & Settings</h1>
        <p className="text-sm text-slate-400 mt-1">Manage your account, organization, and display preferences</p>
      </div>

      {/* Profile Image */}
      <ImageUploadCard
        label="Profile Photo"
        description="Your avatar displayed across the platform. Square images work best."
        currentUrl={profile.profileImageUrl}
        aspectRatio="1/1"
        uploadUrl="/api/upload/profile-image"
        onUploaded={(url) => setProfile((p) => p ? { ...p, profileImageUrl: url } : p)}
      />

      {/* Org Logo */}
      <ImageUploadCard
        label="Organization Logo"
        description="Used as the default logo in your email templates."
        currentUrl={profile.organization?.logoUrl ?? null}
        aspectRatio="4/1"
        uploadUrl="/api/upload/org-logo"
        onUploaded={(url) =>
          setProfile((p) =>
            p ? { ...p, organization: p.organization ? { ...p.organization, logoUrl: url } : null } : p
          )
        }
      />

      {/* Nav Layout */}
      <NavLayoutCard
        current={profile.navLayout}
        onChange={(v) => setProfile((p) => p ? { ...p, navLayout: v } : p)}
      />

      {/* Personal Info */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
            <User className="w-4 h-4 text-indigo-400" />
          </div>
          <p className="font-semibold text-white text-sm">Personal Information</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label className={labelClass}>First Name</label>
            <input type="text" value={profile.firstName}
              onChange={(e) => setProfile((p) => p ? { ...p, firstName: e.target.value } : p)}
              className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Last Name</label>
            <input type="text" value={profile.lastName}
              onChange={(e) => setProfile((p) => p ? { ...p, lastName: e.target.value } : p)}
              className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Email</label>
            <input type="email" value={profile.email} disabled
              className={`${inputClass} opacity-50 cursor-not-allowed`} />
          </div>
          <div>
            <label className={labelClass}>Phone Number</label>
            <input type="tel" value={profile.phoneNumber ?? ""}
              onChange={(e) => setProfile((p) => p ? { ...p, phoneNumber: e.target.value } : p)}
              placeholder="+1 555 000 0000" className={inputClass} />
          </div>
        </div>
        <button onClick={savePersonal} disabled={saving}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white text-sm font-semibold rounded-xl transition">
          {saving ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
          Save Changes
        </button>
      </div>

      {/* Organization */}
      {profile.organization && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
              <Building2 className="w-4 h-4 text-emerald-400" />
            </div>
            <p className="font-semibold text-white text-sm">Organization Details</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className={labelClass}>Company Name</label>
              <input type="text" value={profile.organization.name} disabled
                className={`${inputClass} opacity-50 cursor-not-allowed`} />
              <p className="text-xs text-slate-600 mt-1">Contact support to change your company name.</p>
            </div>
            <div>
              <label className={labelClass}>Website</label>
              <input type="text" value={profile.organization.website ?? ""} disabled
                className={`${inputClass} opacity-50 cursor-not-allowed`} />
            </div>
            <div>
              <label className={labelClass}>Address</label>
              <input type="text" value={`${profile.organization.city}, ${profile.organization.country}`} disabled
                className={`${inputClass} opacity-50 cursor-not-allowed`} />
            </div>
          </div>
        </div>
      )}

      {/* Plan Info */}
      <div className="bg-gradient-to-r from-slate-900 to-indigo-950 border border-indigo-900/50 rounded-2xl p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-bold text-white">Free Plan</p>
            <p className="text-xs text-indigo-300 mt-0.5">100 emails/month · All core features</p>
          </div>
          <div className="px-3 py-1.5 rounded-full bg-indigo-600/20 border border-indigo-500/30">
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-wide">Free</span>
          </div>
        </div>
        <p className="text-xs text-slate-500 mt-3 italic">Paid plans coming soon.</p>
      </div>
      {/* Danger Zone — Sign Out */}
      <div className="bg-white border border-red-100 rounded-2xl p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold text-[#111827] text-sm">Sign Out</p>
            <p className="text-xs text-[#6B7280] mt-0.5">You will be signed out of your account on this device.</p>
          </div>
          <form action="/api/auth/logout" method="POST">
            <button
              type="submit"
              className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-xl transition shadow-sm"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
