"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";

type State = "verifying" | "success" | "expired" | "invalid" | "error";

function VerifyEmailContent() {
  const params = useSearchParams();
  const router = useRouter();
  const token = params.get("token");
  const successParam = params.get("success");
  const errorParam = params.get("error");

  const [state, setState] = useState<State>("verifying");

  useEffect(() => {
    // The API route handles the DB lookup and redirects back here with ?success=1 or ?error=...
    if (successParam === "1") {
      setState("success");
      // Auto-redirect to login after 3 seconds
      const t = setTimeout(() => router.push("/login"), 3000);
      return () => clearTimeout(t);
    }

    if (errorParam === "expired_token") {
      setState("expired");
      return;
    }

    if (errorParam) {
      setState("invalid");
      return;
    }

    // If we have a token but no result yet — redirect to the API endpoint
    if (token) {
      window.location.href = `/api/auth/verify-email?token=${token}`;
      return;
    }

    setState("error");
  }, [token, successParam, errorParam, router]);

  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAFA] items-center justify-center py-16 px-4">
      <div className="w-full max-w-md text-center">
        {state === "verifying" && (
          <>
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-indigo-50 border border-indigo-100 mb-5">
              <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
            </div>
            <h1 className="text-2xl font-bold text-[#111827]">Verifying your email…</h1>
            <p className="mt-2 text-sm text-[#6B7280]">Just a moment while we confirm your address.</p>
          </>
        )}

        {state === "success" && (
          <>
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-100 mb-5">
              <CheckCircle2 className="w-8 h-8 text-emerald-600" />
            </div>
            <h1 className="text-2xl font-bold text-[#111827]">Email verified!</h1>
            <p className="mt-2 text-sm text-[#6B7280]">
              Your account is active. Redirecting you to login…
            </p>
            <div className="mt-5">
              <Link
                href="/login"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#111827] hover:bg-black text-white text-sm font-semibold rounded-xl transition-colors"
              >
                Sign In Now →
              </Link>
            </div>
          </>
        )}

        {state === "expired" && (
          <>
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-amber-50 border border-amber-100 mb-5">
              <XCircle className="w-8 h-8 text-amber-600" />
            </div>
            <h1 className="text-2xl font-bold text-[#111827]">Link expired</h1>
            <p className="mt-2 text-sm text-[#6B7280]">
              Your verification link has expired. Request a new one below.
            </p>
            <div className="mt-5">
              <Link
                href="/check-email"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#111827] hover:bg-black text-white text-sm font-semibold rounded-xl transition-colors"
              >
                Resend Verification Email →
              </Link>
            </div>
          </>
        )}

        {(state === "invalid" || state === "error") && (
          <>
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-red-50 border border-red-100 mb-5">
              <XCircle className="w-8 h-8 text-red-600" />
            </div>
            <h1 className="text-2xl font-bold text-[#111827]">Invalid link</h1>
            <p className="mt-2 text-sm text-[#6B7280]">
              This verification link is invalid or has already been used.
            </p>
            <div className="mt-5 flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/register"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#111827] hover:bg-black text-white text-sm font-semibold rounded-xl transition-colors"
              >
                Register Again
              </Link>
              <Link
                href="/login"
                className="inline-flex items-center gap-2 px-5 py-2.5 border border-gray-200 text-[#111827] text-sm font-semibold rounded-xl hover:bg-gray-50 transition-colors"
              >
                Sign In
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense>
      <VerifyEmailContent />
    </Suspense>
  );
}
