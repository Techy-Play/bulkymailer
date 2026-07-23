"use client";

import { Check, ArrowRight, Lock } from "lucide-react";
import Link from "next/link";

const FREE_PLAN = {
  name: "Free",
  tagline: "Everything you need to get started with email marketing.",
  badge: "Current Plan",
  features: [
    "100 emails included / month",
    "Unlimited contact lists",
    "CSV & Excel contact import",
    "6 template categories",
    "Personalized merge tags ({{firstName}}, etc.)",
    "Cloudinary profile & logo storage",
    "OTP email verification",
    "Basic analytics dashboard",
  ],
};

const COMING_SOON_PLANS = [
  {
    name: "Pro",
    tagline: "For growing businesses and marketing teams.",
    monthlyPrice: 29,
    features: [
      "10,000 emails / month",
      "25,000 active contacts",
      "Custom DKIM/SPF domain auth",
      "Visual automation workflows",
      "Real-time webhook event streams",
      "Priority 24/7 support",
    ],
  },
  {
    name: "Enterprise",
    tagline: "For high-volume senders requiring custom SLA.",
    monthlyPrice: 199,
    features: [
      "Unlimited email volume",
      "Dedicated sending IPs",
      "SOC2 Type II compliance",
      "99.99% uptime SLA",
      "Dedicated account manager",
      "Custom contract & invoicing",
    ],
  },
];

export function PricingSection() {
  return (
    <section id="pricing" className="py-20 bg-white border-y border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="max-w-2xl text-left">
          <div className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
            Simple Pricing
          </div>
          <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-[#111827] tracking-tight">
            Start free. Grow when you're ready.
          </h2>
          <p className="mt-3 text-base text-[#4B5563]">
            Currently offering our <strong>Free Plan</strong> with 100 emails/month. Paid plans coming soon — no surprise charges, ever.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          {/* Free Plan — Active */}
          <div className="bg-white border-2 border-indigo-600 rounded-2xl p-8 flex flex-col shadow-md">
            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-[#111827]">{FREE_PLAN.name}</h3>
                <span className="px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold">
                  {FREE_PLAN.badge}
                </span>
              </div>
              <p className="mt-2 text-xs text-[#6B7280]">{FREE_PLAN.tagline}</p>

              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-[#111827]">$0</span>
                <span className="text-xs text-[#6B7280]">/month forever</span>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-100 space-y-3">
                {FREE_PLAN.features.map((f) => (
                  <div key={f} className="flex items-center gap-2 text-xs font-medium text-[#374151]">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-100">
              <Link
                href="/register"
                className="w-full inline-flex items-center justify-center px-4 py-2.5 rounded-lg text-sm font-semibold bg-[#111827] hover:bg-black text-white transition-all"
              >
                Get Started Free
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Link>
            </div>
          </div>

          {/* Coming Soon Plans */}
          {COMING_SOON_PLANS.map((plan) => (
            <div key={plan.name} className="bg-white border border-gray-200 rounded-2xl p-8 flex flex-col opacity-60 relative overflow-hidden">
              {/* Coming soon overlay */}
              <div className="absolute inset-0 bg-white/50 backdrop-blur-[1px] flex flex-col items-center justify-center z-10">
                <div className="bg-gray-100 border border-gray-200 rounded-xl px-4 py-3 text-center shadow-sm">
                  <Lock className="w-5 h-5 text-gray-400 mx-auto mb-1" />
                  <p className="text-sm font-bold text-[#374151]">Coming Soon</p>
                  <p className="text-xs text-[#6B7280] mt-0.5">Paid plans launching soon</p>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-[#111827]">{plan.name}</h3>
                </div>
                <p className="mt-2 text-xs text-[#6B7280]">{plan.tagline}</p>

                <div className="mt-6 flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-[#111827]">${plan.monthlyPrice}</span>
                  <span className="text-xs text-[#6B7280]">/month</span>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-100 space-y-3">
                  {plan.features.map((f) => (
                    <div key={f} className="flex items-center gap-2 text-xs font-medium text-[#374151]">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-100">
                <button disabled
                  className="w-full inline-flex items-center justify-center px-4 py-2.5 rounded-lg text-sm font-semibold bg-gray-100 text-gray-400 cursor-not-allowed">
                  Coming Soon
                </button>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-6 text-center text-xs text-[#9CA3AF]">
          All plans include unlimited contacts, no credit card required. Free plan is permanent.
        </p>
      </div>
    </section>
  );
}
