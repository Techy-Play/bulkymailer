"use client";

import { useEffect, useRef, useState } from "react";
import {
  User, Building2, Upload, Camera, CheckCircle2, AlertCircle,
  Save, PanelLeft, LayoutDashboard, RefreshCw, LogOut, ShieldCheck, Mail, Phone,
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
        ? "bg-emerald-50 border-emerald-200 text-emerald-800"
        : "bg-red-50 border-red-200 text-red-800"
    }`}>
      {type === "success" ? <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> : <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />}
      {message}
    </div>
  );
}

function ImageUploadCard({
  label, description, currentUrl,
  uploadUrl, onUploaded,
}: {
  label: string; description: string; currentUrl: string | null;
  uploadUrl: string; onUploaded: (url: string) => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(currentUrl);

  useEffect(() => {
    setPreview(currentUrl);
  }, [currentUrl]);

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
    <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="font-semibold text-[#111827] text-sm">{label}</p>
          <p className="text-xs text-[#6B7280] mt-0.5">{description}</p>
        </div>
      </div>
      
      <input ref={fileRef} type="file" accept="image/*" className="hidden"
        onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); e.target.value = ""; }} />

      <div className="flex items-center gap-4 mt-2">
        <div
          className="w-24 h-24 rounded-2xl bg-gray-50 border-2 border-dashed border-gray-200 flex items-center justify-center cursor-pointer hover:border-indigo-500 transition overflow-hidden shrink-0 group relative shadow-inner"
          onClick={() => fileRef.current?.click()}
        >
          {preview ? (
            <>
              <img src={preview} alt={label} className="w-full h-full object-cover rounded-xl" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-white">
                <Camera className="w-5 h-5" />
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center gap-1 text-gray-400 py-2">
              <Camera className="w-6 h-6" />
              <span className="text-[10px] font-medium">Upload</span>
            </div>
          )}
        </div>

        <div className="space-y-2">
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            disabled={loading}
            className="flex items-center gap-2 px-3.5 py-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-[#111827] text-xs font-semibold rounded-xl transition disabled:opacity-50 shadow-sm"
          >
            {loading ? <RefreshCw className="w-3.5 h-3.5 animate-spin text-indigo-600" /> : <Upload className="w-3.5 h-3.5 text-gray-600" />}
            {loading ? "Uploading…" : "Change Image"}
          </button>
          <p className="text-[11px] text-[#6B7280]">Square aspect ratio (1:1). JPG or PNG.</p>
        </div>
      </div>
    </div>
  );
}

function NavLayoutCard({ current, onChange }: { current: string; onChange: (v: string) => void }) {
  const OPTIONS = [
    { id: "sidebar", label: "Sidebar Navigation", desc: "Fixed left sidebar layout", icon: <PanelLeft className="w-5 h-5" /> },
    { id: "topnav", label: "Top Navigation", desc: "Horizontal top bar layout", icon: <LayoutDashboard className="w-5 h-5" /> },
  ];

  const [selected, setSelected] = useState(current);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setSelected(current);
  }, [current]);

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
      setTimeout(() => { setSaved(false); window.location.reload(); }, 1000);
    } catch { /* ignore */ }
    setSaving(false);
  }

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
      <p className="font-semibold text-[#111827] text-sm mb-1">Navigation Layout</p>
      <p className="text-xs text-[#6B7280] mb-4">Choose how the navigation is displayed. Changes apply immediately.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
        {OPTIONS.map((opt) => (
          <button key={opt.id} type="button"
            onClick={() => setSelected(opt.id)}
            className={`p-4 rounded-xl border text-left transition-all ${
              selected === opt.id
                ? "border-indigo-600 bg-indigo-50/50 ring-2 ring-indigo-500/20"
                : "border-gray-200 bg-gray-50 hover:bg-gray-100/70 hover:border-gray-300"
            }`}>
            <div className={`mb-2 ${selected === opt.id ? "text-indigo-600" : "text-gray-400"}`}>{opt.icon}</div>
            <p className={`text-sm font-semibold ${selected === opt.id ? "text-indigo-950" : "text-[#111827]"}`}>{opt.label}</p>
            <p className="text-xs text-[#6B7280] mt-0.5">{opt.desc}</p>
          </button>
        ))}
      </div>
      <button onClick={() => save(selected)} disabled={saving || selected === current}
        className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white text-sm font-semibold rounded-xl transition shadow-sm">
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
        <RefreshCw className="w-6 h-6 text-indigo-600 animate-spin" />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="text-center py-16 text-[#6B7280]">Could not load profile information.</div>
    );
  }

  const inputClass =
    "w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-[#111827] text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:bg-white focus:outline-none placeholder:text-gray-400 transition shadow-sm";
  const labelClass = "block text-xs font-semibold text-[#6B7280] uppercase tracking-wide mb-1.5";

  const initials = `${profile.firstName?.[0] || ""}${profile.lastName?.[0] || ""}`.toUpperCase() || "U";

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12">
      {toast && <Toast message={toast.message} type={toast.type} />}

      {/* Page Header Banner */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-indigo-600 text-white font-bold text-xl flex items-center justify-center overflow-hidden shrink-0 shadow-md">
            {profile.profileImageUrl ? (
              <img src={profile.profileImageUrl} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <span>{initials}</span>
            )}
          </div>
          <div>
            <h1 className="text-xl font-bold text-[#111827] flex items-center gap-2">
              {profile.firstName} {profile.lastName}
              <span className="px-2.5 py-0.5 bg-indigo-50 text-indigo-700 border border-indigo-100 text-xs font-semibold rounded-full">
                Owner
              </span>
            </h1>
            <p className="text-xs text-[#6B7280] mt-1 flex items-center gap-3">
              <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5 text-gray-400" /> {profile.email}</span>
              {profile.phoneNumber && (
                <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5 text-gray-400" /> {profile.phoneNumber}</span>
              )}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-100 text-xs font-semibold rounded-full">
            <ShieldCheck className="w-3.5 h-3.5" /> Account Verified
          </span>
        </div>
      </div>

      {/* Main 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left Column: Media & Layout Settings */}
        <div className="space-y-6">
          {/* Profile Image */}
          <ImageUploadCard
            label="Profile Photo"
            description="Your avatar displayed across the platform. Square images work best."
            currentUrl={profile.profileImageUrl}
            uploadUrl="/api/upload/profile-image"
            onUploaded={(url) => setProfile((p) => p ? { ...p, profileImageUrl: url } : p)}
          />

          {/* Org Logo */}
          <ImageUploadCard
            label="Organization Logo"
            description="Used as the default logo in your email templates (1:1 square ratio)."
            currentUrl={profile.organization?.logoUrl ?? null}
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
        </div>

        {/* Right Column: Personal & Org Details */}
        <div className="space-y-6">
          {/* Personal Info */}
          <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-8 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center">
                <User className="w-4 h-4 text-indigo-600" />
              </div>
              <p className="font-semibold text-[#111827] text-sm">Personal Information</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
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
              <div className="sm:col-span-2">
                <label className={labelClass}>Email Address</label>
                <input type="email" value={profile.email} disabled
                  className={`${inputClass} bg-gray-100/70 text-gray-500 cursor-not-allowed`} />
              </div>
              <div className="sm:col-span-2">
                <label className={labelClass}>Phone Number</label>
                <input type="tel" value={profile.phoneNumber ?? ""}
                  onChange={(e) => setProfile((p) => p ? { ...p, phoneNumber: e.target.value } : p)}
                  placeholder="+1 555 000 0000" className={inputClass} />
              </div>
            </div>

            <button onClick={savePersonal} disabled={saving}
              className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white text-sm font-semibold rounded-xl transition shadow-sm">
              {saving ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
              Save Personal Info
            </button>
          </div>

          {/* Organization Details */}
          {profile.organization && (
            <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-8 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center">
                  <Building2 className="w-4 h-4 text-emerald-600" />
                </div>
                <p className="font-semibold text-[#111827] text-sm">Organization Details</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className={labelClass}>Company Name</label>
                  <input type="text" value={profile.organization.name} disabled
                    className={`${inputClass} bg-gray-100/70 text-gray-500 cursor-not-allowed`} />
                  <p className="text-[11px] text-[#6B7280] mt-1">Contact support to change your company name.</p>
                </div>
                <div>
                  <label className={labelClass}>Website</label>
                  <input type="text" value={profile.organization.website ?? ""} disabled
                    className={`${inputClass} bg-gray-100/70 text-gray-500 cursor-not-allowed`} />
                </div>
                <div>
                  <label className={labelClass}>Location</label>
                  <input type="text" value={`${profile.organization.city}, ${profile.organization.country}`} disabled
                    className={`${inputClass} bg-gray-100/70 text-gray-500 cursor-not-allowed`} />
                </div>
              </div>
            </div>
          )}

          {/* Plan Info Card */}
          <div className="bg-gradient-to-r from-indigo-50/70 via-purple-50/40 to-white border border-indigo-100 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold text-[#111827]">Free Starter Plan</p>
                <p className="text-xs text-[#6B7280] mt-0.5">100 emails/month · Core features unlocked</p>
              </div>
              <div className="px-3 py-1 rounded-full bg-indigo-600 text-white">
                <span className="text-xs font-bold uppercase tracking-wide">Free</span>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-3 italic">Pro tier with unlimited sending coming soon.</p>
          </div>

          {/* Danger Zone — Sign Out */}
          <div className="bg-white border border-red-100 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-[#111827] text-sm">Sign Out</p>
                <p className="text-xs text-[#6B7280] mt-0.5">Sign out of your BulkyMailer account on this device.</p>
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
      </div>
    </div>
  );
}
