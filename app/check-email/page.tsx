"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Mail, RefreshCw, CheckCircle2, AlertTriangle, Inbox } from "lucide-react";

function CheckEmailContent() {
  const params = useSearchParams();
  const email = params.get("email") ?? "your inbox";
  const [resendLoading, setResendLoading] = useState(false);
  const [resendMsg, setResendMsg] = useState("");

  async function handleResend() {
    setResendLoading(true);
    setResendMsg("");
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
        setResendMsg("Sent! Check your inbox again.");
      }
    } catch {
      setResendMsg("Failed to send. Try again later.");
    } finally {
      setResendLoading(false);
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAFA] items-center justify-center py-16 px-4">
      <div className="w-full max-w-md text-center">
        {/* Icon */}
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-indigo-50 border border-indigo-100 mb-5">
          <Inbox className="w-8 h-8 text-indigo-600" />
        </div>

        <h1 className="text-2xl font-bold text-[#111827]">Check your inbox</h1>
        <p className="mt-2 text-sm text-[#6B7280] max-w-xs mx-auto">
          We sent a verification link to{" "}
          <span className="font-semibold text-[#111827]">{email}</span>.
          Click the link to activate your account.
        </p>

        {/* Card */}
        <div className="mt-6 bg-white border border-gray-200 rounded-2xl p-6 shadow-sm text-left space-y-4">
          <h2 className="text-sm font-semibold text-[#111827]">Didn't receive it?</h2>
          <ul className="space-y-2 text-sm text-[#6B7280]">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
              Check your <strong>spam</strong> or <strong>promotions</strong> folder
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
              Make sure you entered the right email address
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
              Links expire after <strong>24 hours</strong>
            </li>
          </ul>

          <button
            onClick={handleResend}
            disabled={resendLoading}
            className="mt-2 w-full flex items-center justify-center gap-2 py-2.5 border border-gray-200 rounded-xl text-sm font-semibold text-[#111827] hover:bg-gray-50 disabled:opacity-50 transition"
          >
            <RefreshCw className={`w-4 h-4 ${resendLoading ? "animate-spin" : ""}`} />
            {resendLoading ? "Sending…" : "Resend verification email"}
          </button>

          {resendMsg && (
            <p className="text-xs text-center text-[#6B7280]">{resendMsg}</p>
          )}
        </div>

        <p className="text-xs text-[#9CA3AF] mt-5">
          Wrong email?{" "}
          <Link href="/register" className="text-indigo-600 font-semibold hover:underline">
            Register again
          </Link>{" "}
          ·{" "}
          <Link href="/login" className="text-indigo-600 font-semibold hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function CheckEmailPage() {
  return (
    <Suspense>
      <CheckEmailContent />
    </Suspense>
  );
}
