"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Send, Play, LayoutDashboard } from "lucide-react";
import KineticGrid from "@/components/ui/kinetic-grid";

export function HeroSection() {
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
    <KineticGrid globalColor="light" className="min-h-0 py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Clear Typography & CTAs */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-xs font-semibold text-indigo-700">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
              BulkyMailer 2.0 Engine
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-6xl font-extrabold tracking-tight text-[#111827] leading-[1.1]">
              Email Marketing <br className="hidden sm:inline" />
              that actually gets <br className="hidden sm:inline" />
              <span className="text-indigo-600">delivered.</span>
            </h1>

            <p className="text-lg sm:text-xl text-[#4B5563] max-w-xl leading-relaxed font-normal">
              Create campaigns. Manage subscribers. Track analytics—all in one fast, developer-friendly platform.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              {isLoggedIn ? (
                <Link
                  href="/dashboard"
                  className="inline-flex items-center justify-center px-6 py-3.5 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm transition-all group"
                >
                  <LayoutDashboard className="w-4 h-4 mr-2" />
                  Go to Dashboard
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              ) : (
                <Link
                  href="/register"
                  className="inline-flex items-center justify-center px-6 py-3.5 text-sm font-semibold text-white bg-[#111827] hover:bg-black rounded-lg shadow-sm transition-all group"
                >
                  Start Free — 100 emails/month
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              )}
              <Link
                href="/docs"
                className="inline-flex items-center justify-center px-6 py-3.5 text-sm font-semibold text-[#374151] bg-white hover:bg-gray-50 border border-gray-200 rounded-lg shadow-2xs transition-all"
              >
                <Play className="w-3.5 h-3.5 mr-2 text-gray-500 fill-current" />
                Live Demo & API
              </Link>
            </div>

            {/* Micro Trust Indicators */}
            <div className="pt-4 flex items-center gap-6 text-xs text-[#6B7280]">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> No credit card required
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> 1-click DNS verification
              </span>
            </div>
          </div>

          {/* Right Column: Tangible Campaign Dashboard Mockup */}
          <div className="lg:col-span-6 relative">
            <div className="stripe-card p-4 sm:p-5 bg-white shadow-xl rounded-2xl border border-gray-200">
              
              {/* Card Header Bar */}
              <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-gray-300" />
                  <div className="w-2.5 h-2.5 rounded-full bg-gray-300" />
                  <div className="w-2.5 h-2.5 rounded-full bg-gray-300" />
                  <span className="text-xs font-semibold text-[#111827] ml-2">Active Email Campaigns</span>
                </div>
                <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  ● Live Delivery
                </span>
              </div>

              {/* Campaign Table Preview */}
              <div className="mt-4 space-y-3">
                {/* Row 1: Sent Campaign */}
                <div className="p-3.5 rounded-xl bg-gray-50/80 border border-gray-100 flex items-center justify-between hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs">
                      ✓
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-[#111827]">July Product Newsletter</div>
                      <div className="text-xs text-gray-500">42,138 recipients • Sent today</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-right">
                    <div>
                      <div className="text-xs font-bold text-[#111827]">48%</div>
                      <div className="text-[10px] text-gray-500">Open Rate</div>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-indigo-600">12%</div>
                      <div className="text-[10px] text-gray-500">CTR</div>
                    </div>
                  </div>
                </div>

                {/* Row 2: Sending Campaign */}
                <div className="p-3.5 rounded-xl bg-gray-50/80 border border-gray-100 flex items-center justify-between hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs">
                      <Send className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-[#111827]">Q3 Feature Announcement</div>
                      <div className="text-xs text-gray-500">128,500 recipients • Dispatching...</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-amber-50 text-amber-700 border border-amber-200">
                      78% Dispatched
                    </span>
                  </div>
                </div>

                {/* Row 3: Automated Drip */}
                <div className="p-3.5 rounded-xl bg-gray-50/80 border border-gray-100 flex items-center justify-between hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-xs">
                      ⚡
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-[#111827]">User Onboarding Sequence</div>
                      <div className="text-xs text-gray-500">Automated Drip • 1,420 / day</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-bold text-emerald-600">99.8%</div>
                    <div className="text-[10px] text-gray-500">Inbox Rate</div>
                  </div>
                </div>
              </div>

              {/* Bottom Quick Analytics Footnote */}
              <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                <span>Sub-50ms API delivery latency</span>
                <span className="font-semibold text-gray-700">Zero spam filter flags</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </KineticGrid>
  );
}
