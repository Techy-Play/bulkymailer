"use client";

import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, RefreshCw, CheckCircle2, ArrowLeft, AlertCircle } from "lucide-react";

function OtpContent() {
  const params = useSearchParams();
  const router = useRouter();
  const email = params.get("email") ?? "";

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [resendMsg, setResendMsg] = useState("");
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Countdown timer
  useEffect(() => {
    if (countdown <= 0) { setCanResend(true); return; }
    const t = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [countdown]);

  const handleChange = (idx: number, val: string) => {
    const digit = val.replace(/\D/g, "").slice(-1);
    const newOtp = [...otp];
    newOtp[idx] = digit;
    setOtp(newOtp);
    if (digit && idx < 5) {
      inputRefs.current[idx + 1]?.focus();
    }
    // Auto-submit when all 6 digits filled
    if (digit && newOtp.every((d) => d.length === 1)) {
      handleVerify(newOtp.join(""));
    }
  };

  const handleKeyDown = (idx: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[idx] && idx > 0) {
      inputRefs.current[idx - 1]?.focus();
    }
    if (e.key === "ArrowLeft" && idx > 0) inputRefs.current[idx - 1]?.focus();
    if (e.key === "ArrowRight" && idx < 5) inputRefs.current[idx + 1]?.focus();
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (!pasted) return;
    const newOtp = [...otp];
    for (let i = 0; i < 6; i++) newOtp[i] = pasted[i] ?? "";
    setOtp(newOtp);
    if (pasted.length === 6) handleVerify(pasted);
    else inputRefs.current[Math.min(pasted.length, 5)]?.focus();
  };

  const handleVerify = useCallback(
    async (code: string) => {
      if (code.length !== 6) return;
      setLoading(true);
      setError("");
      try {
        const res = await fetch("/api/auth/verify-otp", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, otp: code }),
        });
        const data = await res.json();
        if (!res.ok) {
          setError(data.error ?? "Verification failed.");
          if (data.code === "TOO_MANY_ATTEMPTS" || data.code === "OTP_EXPIRED") {
            setOtp(["", "", "", "", "", ""]);
          }
        } else {
          setSuccess(true);
          setTimeout(() => router.push(data.redirect ?? "/dashboard"), 1500);
        }
      } catch {
        setError("Network error. Please try again.");
      } finally {
        setLoading(false);
      }
    },
    [email, router]
  );

  async function handleResend() {
    setResendLoading(true);
    setResendMsg("");
    setError("");
    try {
      const res = await fetch("/api/auth/resend-verification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.status === 429) {
        setResendMsg(data.error);
      } else {
        setResendMsg("New code sent! Check your inbox.");
        setOtp(["", "", "", "", "", ""]);
        setCountdown(60);
        setCanResend(false);
        inputRefs.current[0]?.focus();
      }
    } catch {
      setResendMsg("Failed to send. Try again later.");
    } finally {
      setResendLoading(false);
    }
  }

  const maskedEmail = email
    ? email.replace(/^(.{2}).*(@.*)$/, "$1***$2")
    : "your email";

  if (success) {
    return (
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-100 mb-5">
          <CheckCircle2 className="w-8 h-8 text-emerald-600" />
        </div>
        <h1 className="text-2xl font-bold text-[#111827]">Email Verified!</h1>
        <p className="mt-2 text-sm text-[#6B7280]">Redirecting you to your dashboard…</p>
        <div className="mt-4 flex justify-center">
          <div className="w-5 h-5 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="text-center">
      {/* Icon */}
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 shadow-lg shadow-indigo-200 mb-5">
        <Mail className="w-8 h-8 text-white" />
      </div>

      <h1 className="text-2xl font-bold text-[#111827]">Check your inbox</h1>
      <p className="mt-2 text-sm text-[#6B7280] max-w-sm mx-auto">
        We sent a <span className="font-semibold text-[#111827]">6-digit verification code</span> to{" "}
        <span className="font-semibold text-indigo-600">{maskedEmail}</span>
      </p>

      <div className="mt-8 bg-white border border-gray-200 rounded-2xl shadow-sm p-8 text-left">
        {error && (
          <div className="mb-5 p-3 rounded-xl bg-red-50 border border-red-100 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        <label className="block text-xs font-bold text-[#374151] uppercase tracking-widest mb-3 text-center">
          Enter verification code
        </label>

        {/* OTP Inputs */}
        <div className="flex gap-2 justify-center" onPaste={handlePaste}>
          {otp.map((digit, idx) => (
            <input
              key={idx}
              ref={(el) => { inputRefs.current[idx] = el; }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(idx, e.target.value)}
              onKeyDown={(e) => handleKeyDown(idx, e)}
              disabled={loading}
              className={`w-12 h-14 text-center text-xl font-bold border-2 rounded-xl bg-gray-50 outline-none transition-all
                ${digit ? "border-indigo-500 bg-indigo-50 text-indigo-700" : "border-gray-200 text-[#111827]"}
                ${loading ? "opacity-50 cursor-not-allowed" : "focus:border-indigo-500 focus:bg-white"}
              `}
            />
          ))}
        </div>

        {/* Verify button */}
        <button
          onClick={() => handleVerify(otp.join(""))}
          disabled={loading || otp.join("").length < 6}
          className="mt-6 w-full py-3 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white font-semibold text-sm rounded-xl flex items-center justify-center gap-2 transition-colors"
        >
          {loading ? (
            <>
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
              Verifying…
            </>
          ) : (
            "Verify Email →"
          )}
        </button>

        {/* Resend */}
        <div className="mt-5 pt-4 border-t border-gray-100 text-center">
          {!canResend ? (
            <p className="text-sm text-[#6B7280]">
              Resend code in{" "}
              <span className="font-semibold text-[#111827] tabular-nums">{countdown}s</span>
            </p>
          ) : (
            <button
              onClick={handleResend}
              disabled={resendLoading}
              className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-800 disabled:opacity-50 transition"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${resendLoading ? "animate-spin" : ""}`} />
              {resendLoading ? "Sending…" : "Resend verification code"}
            </button>
          )}
          {resendMsg && (
            <p className="mt-2 text-xs text-emerald-600 font-medium">{resendMsg}</p>
          )}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-center gap-4 text-xs text-[#9CA3AF]">
        <Link href="/register" className="flex items-center gap-1 hover:text-indigo-600 transition">
          <ArrowLeft className="w-3 h-3" /> Back to Register
        </Link>
        <span>·</span>
        <Link href="/login" className="hover:text-indigo-600 transition">Sign In</Link>
      </div>
    </div>
  );
}

export default function VerifyOtpPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-slate-50 items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center">
              <Mail className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-[#111827] text-xl">BulkyMailer</span>
          </div>
        </div>
        <Suspense fallback={<div className="text-center text-gray-400 text-sm">Loading…</div>}>
          <OtpContent />
        </Suspense>
      </div>
    </div>
  );
}
