"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock, ArrowRight, Eye, EyeOff, AlertCircle } from "lucide-react";
import { LoadingButton } from "@/components/ui/loading-button";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [unverified, setUnverified] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [resendMsg, setResendMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setUnverified(false);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.code === "EMAIL_NOT_VERIFIED") {
          // Redirect to OTP verification page
          router.push(`/verify-otp?email=${encodeURIComponent(form.email)}`);
        } else {
          setError(data.error ?? "Invalid credentials.");
        }
        return;
      }

      router.push(data.redirect ?? "/dashboard");
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleResend() {
    setResendLoading(true);
    setResendMsg("");
    try {
      const res = await fetch("/api/auth/resend-verification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email }),
      });
      const data = await res.json();
      if (res.status === 429) {
        setResendMsg(data.error);
      } else {
        setResendMsg("Verification email sent! Check your inbox.");
      }
    } catch {
      setResendMsg("Failed to send. Try again later.");
    } finally {
      setResendLoading(false);
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAFA] items-center justify-center py-16 px-4 sm:px-6">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-[#111827] flex items-center justify-center">
              <Mail className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-[#111827] text-lg">BulkyMailer</span>
          </div>
          <h1 className="text-2xl font-bold text-[#111827]">Welcome back</h1>
          <p className="text-sm text-[#6B7280] mt-1">Sign in to manage your campaigns</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8">
          {/* Unverified banner */}
          {unverified && (
            <div className="mb-4 p-4 rounded-xl bg-amber-50 border border-amber-200">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
                <div className="text-sm">
                  <p className="font-semibold text-amber-800">Email not verified</p>
                  <p className="text-amber-700 mt-0.5">
                    Please check your inbox and click the verification link.
                  </p>
                  <button
                    onClick={handleResend}
                    disabled={resendLoading}
                    className="mt-2 text-xs font-semibold text-indigo-700 hover:underline disabled:opacity-50"
                  >
                    {resendLoading ? "Sending…" : "Resend verification email →"}
                  </button>
                  {resendMsg && (
                    <p className="mt-1 text-xs text-amber-700">{resendMsg}</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-100 text-sm text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#374151] uppercase tracking-wide mb-1.5">
                Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  placeholder="you@company.com"
                  required
                  className="w-full pl-9 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-[#111827] text-sm focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-400 focus:outline-none transition"
                />
                <Mail className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-3" />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-[#374151] uppercase tracking-wide">
                  Password
                </label>
                <Link href="/forgot-password" className="text-xs text-indigo-600 hover:underline">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                  placeholder="••••••••"
                  required
                  className="w-full pl-9 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-[#111827] text-sm focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-400 focus:outline-none transition"
                />
                <Lock className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-3" />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <LoadingButton
              type="submit"
              loading={loading}
              className="w-full py-3 bg-[#111827] hover:bg-black disabled:opacity-60 text-white font-semibold text-sm rounded-xl shadow-sm flex items-center justify-center gap-2 transition-colors mt-2"
            >
              Sign In <ArrowRight className="w-4 h-4" />
            </LoadingButton>
          </form>
        </div>

        <p className="text-center text-xs text-[#6B7280] mt-4">
          Don't have an account?{" "}
          <Link href="/register" className="text-indigo-600 font-semibold hover:underline">
            Start for free
          </Link>
        </p>
      </div>
    </div>
  );
}
