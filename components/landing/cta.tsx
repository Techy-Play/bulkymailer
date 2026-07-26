"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, LayoutDashboard } from "lucide-react";

export function CTASection() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkAuth = async () => {
    try {
      const res = await fetch("/api/auth/me");
      if (res.ok) {
        const data = await res.json();
        setIsLoggedIn(data.authenticated && !!data.user);
      } else {
        setIsLoggedIn(false);
      }
    } catch {
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    checkAuth();
    window.addEventListener("auth-change", checkAuth);
    return () => window.removeEventListener("auth-change", checkAuth);
  }, []);

  return (
    <section className="py-20 bg-[#FAFAFA] border-t border-gray-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="stripe-card p-10 sm:p-14 bg-white shadow-lg border border-gray-200 rounded-3xl">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#111827] tracking-tight max-w-2xl mx-auto">
            Ready to deliver email campaigns that convert?
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#4B5563] max-w-xl mx-auto">
            Join thousands of senders using BulkyMailer for speed, reliability, and growth.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            {isLoggedIn ? (
              <Link
                href="/dashboard"
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm transition-all"
              >
                <LayoutDashboard className="w-4 h-4 mr-2" />
                Go to Dashboard
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            ) : (
              <Link
                href="/register"
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 text-sm font-semibold text-white bg-[#111827] hover:bg-black rounded-lg shadow-sm transition-all"
              >
                Start Free (100 Emails Included)
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            )}
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 text-sm font-semibold text-[#374151] bg-gray-50 border border-gray-200 hover:bg-gray-100 rounded-lg transition-all"
            >
              Contact Sales
            </Link>
          </div>

          <div className="mt-6 flex flex-wrap justify-center items-center gap-6 text-xs text-gray-500">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Free 100 monthly emails
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> No credit card required
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
