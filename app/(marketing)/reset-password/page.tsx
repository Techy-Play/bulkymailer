"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Lock, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import Link from "next/link";

function ResetPasswordForm() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    
    if (!token) {
      toast.error("Invalid or missing reset token.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    
    if (password.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return;
    }

    setLoading(true);
    
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword: password }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Failed to reset password");
        setLoading(false);
        return;
      }

      toast.success(data.message || "Password successfully reset");
      setTimeout(() => {
        router.push("/login");
      }, 1500);
    } catch (err) {
      setLoading(false);
      toast.error("An unexpected error occurred");
    }
  }

  if (!token) {
    return (
      <div className="text-center">
        <h1 className="text-2xl font-extrabold text-[#111827] tracking-tight mb-2">
          Invalid Link
        </h1>
        <p className="text-[#4B5563] text-sm mb-6">
          This password reset link is invalid or has expired.
        </p>
        <Link
          href="/forgot-password"
          className="w-full flex items-center justify-center gap-2 py-3 bg-[#111827] text-white font-bold rounded-xl hover:bg-[#1f2937] transition shadow-sm"
        >
          Request New Link
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-extrabold text-[#111827] tracking-tight mb-2">
          Set New Password
        </h1>
        <p className="text-[#4B5563] text-sm">
          Please enter your new password below.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-xs font-semibold text-[#374151] uppercase tracking-wide mb-1.5">
            New Password
          </label>
          <div className="relative">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              autoFocus
              minLength={8}
              className="w-full pl-9 pr-3 py-3 bg-gray-50 border border-gray-200 rounded-xl text-[#111827] text-sm focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-400 focus:outline-none transition"
            />
            <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
          </div>
        </div>
        
        <div>
          <label className="block text-xs font-semibold text-[#374151] uppercase tracking-wide mb-1.5">
            Confirm Password
          </label>
          <div className="relative">
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              required
              minLength={8}
              className="w-full pl-9 pr-3 py-3 bg-gray-50 border border-gray-200 rounded-xl text-[#111827] text-sm focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-400 focus:outline-none transition"
            />
            <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading || !password || !confirmPassword}
          className="w-full mt-2 py-3 bg-[#111827] hover:bg-[#1f2937] text-white font-bold rounded-xl transition shadow-lg shadow-gray-900/10 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>Reset Password <ArrowRight className="w-4 h-4" /></>
          )}
        </button>
      </form>
    </>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#FDFDFD] flex items-center justify-center p-4 selection:bg-indigo-100 selection:text-indigo-900">
      <div className="w-full max-w-md">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-8 sm:p-10"
        >
          <Suspense fallback={<div className="flex justify-center p-8"><div className="w-6 h-6 border-2 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" /></div>}>
            <ResetPasswordForm />
          </Suspense>
        </motion.div>
      </div>
    </div>
  );
}
