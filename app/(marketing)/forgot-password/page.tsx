"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, ArrowLeft, Send } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setLoading(false);
        const errorMsg = data.error || "No account exists with this email address.";
        toast.error(errorMsg);
        router.push("/login");
        return;
      }

      setLoading(false);
      setSubmitted(true);
      toast.success(data.message || "Reset link sent!");
    } catch (err) {
      setLoading(false);
      setError("An unexpected error occurred");
      toast.error("An unexpected error occurred");
    }
  }

  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#FDFDFD] flex items-center justify-center p-4 selection:bg-indigo-100 selection:text-indigo-900">
      <div className="w-full max-w-md">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-8 sm:p-10"
        >
          {submitted ? (
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Send className="w-8 h-8 text-emerald-500" />
              </div>
              <h1 className="text-2xl font-extrabold text-[#111827] tracking-tight mb-3">
                Check your email
              </h1>
              <p className="text-[#4B5563] text-sm leading-relaxed mb-8">
                We've sent a password reset link to <span className="font-semibold text-[#111827]">{email}</span>. Please check your inbox and spam folder.
              </p>
              <Link
                href="/login"
                className="w-full flex items-center justify-center gap-2 py-3 bg-white border border-gray-200 text-[#374151] font-bold rounded-xl hover:bg-gray-50 transition shadow-sm"
              >
                <ArrowLeft className="w-4 h-4" /> Back to Login
              </Link>
            </div>
          ) : (
            <>
              <div className="mb-8 text-center">
                <h1 className="text-2xl font-extrabold text-[#111827] tracking-tight mb-2">
                  Forgot Password?
                </h1>
                <p className="text-[#4B5563] text-sm">
                  Enter your email address and we'll send you a link to reset your password.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-xs font-semibold text-[#374151] uppercase tracking-wide mb-1.5">
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@company.com"
                      required
                      autoFocus
                      className={`w-full pl-9 pr-3 py-3 bg-gray-50 border ${error ? 'border-red-300 focus:border-red-400 focus:ring-red-500/40' : 'border-gray-200 focus:border-indigo-400 focus:ring-indigo-500/40'} rounded-xl text-[#111827] text-sm focus:ring-2 focus:outline-none transition`}
                    />
                    <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
                  </div>
                  {error && (
                    <p className="mt-2 text-xs text-red-500 font-medium">{error}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loading || !email}
                  className="w-full py-3 bg-[#111827] hover:bg-[#1f2937] text-white font-bold rounded-xl transition shadow-lg shadow-gray-900/10 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    "Send Reset Link"
                  )}
                </button>
              </form>

              <div className="mt-8 pt-6 border-t border-gray-100 text-center">
                <Link
                  href="/login"
                  className="inline-flex items-center gap-1 text-sm font-semibold text-gray-500 hover:text-indigo-600 transition"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Back to Login
                </Link>
              </div>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
}
