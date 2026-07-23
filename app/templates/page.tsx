"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Slideshow } from "@/components/ui/slideshow";

const FEATURED_SLIDES = [
  (
    <div key="s1" className="stripe-card p-8 bg-white border border-gray-200 rounded-2xl max-w-2xl text-left w-full">
      <span className="text-xs font-bold text-indigo-600 bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full">
        Featured Template #1
      </span>
      <h3 className="text-2xl font-bold text-[#111827] mt-3">SaaS User Onboarding Flow</h3>
      <p className="text-sm text-[#4B5563] mt-2">
        A 5-part responsive onboarding email sequence designed to turn trial signups into active paying customers.
      </p>
      <div className="mt-6 flex items-center justify-between">
        <span className="text-xs text-gray-500">Includes Dark Mode & Mobile preview</span>
        <Link href="/register" className="px-4 py-2 bg-[#111827] text-white text-xs font-semibold rounded-lg">
          Use Template
        </Link>
      </div>
    </div>
  ),
  (
    <div key="s2" className="stripe-card p-8 bg-white border border-gray-200 rounded-2xl max-w-2xl text-left w-full">
      <span className="text-xs font-bold text-indigo-600 bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full">
        Featured Template #2
      </span>
      <h3 className="text-2xl font-bold text-[#111827] mt-3">Weekly Developer Digest</h3>
      <p className="text-sm text-[#4B5563] mt-2">
        Clean multi-column layout for technical changelogs, open-source highlights, and engineering updates.
      </p>
      <div className="mt-6 flex items-center justify-between">
        <span className="text-xs text-gray-500">Tested across Apple Mail & Outlook</span>
        <Link href="/register" className="px-4 py-2 bg-[#111827] text-white text-xs font-semibold rounded-lg">
          Use Template
        </Link>
      </div>
    </div>
  ),
];

const TEMPLATES = [
  {
    title: "SaaS User Onboarding Flow",
    category: "Transactional",
    description: "Welcome series with step-by-step checklist to drive initial user activation.",
  },
  {
    title: "Modern Tech Newsletter",
    category: "Newsletter",
    description: "Clean multi-column layout for weekly developer digests and tech updates.",
  },
  {
    title: "Product Release & Changelog",
    category: "Product Update",
    description: "Feature highlight card with video embed placeholders and CTA buttons.",
  },
  {
    title: "Black Friday & Promo Blast",
    category: "E-Commerce",
    description: "High-contrast promotional announcement with countdown timer styling.",
  },
  {
    title: "Security & Login Alert",
    category: "Transactional",
    description: "Minimalist high-priority notice with IP address and device details.",
  },
  {
    title: "Re-engagement Survey",
    category: "Lifecycle",
    description: "Interactive rating scale layout designed to reactivate dormant users.",
  },
];

export default function TemplatesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAFA]">
      <section className="pt-16 pb-12 text-center border-b border-gray-200 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-xs font-semibold text-indigo-700 uppercase tracking-widest">
            Template Gallery
          </div>
          <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold text-[#111827] tracking-tight">
            50+ Responsive Email Templates
          </h1>
          <p className="mt-4 text-lg text-[#4B5563] max-w-2xl mx-auto">
            Render perfectly across Apple Mail, Gmail, Outlook, and mobile clients with built-in dark mode support.
          </p>

          {/* Featured Slideshow Header */}
          <div className="mt-10">
            <Slideshow items={FEATURED_SLIDES} autoPlay={true} interval={4000} />
          </div>
        </div>
      </section>

      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TEMPLATES.map((tpl) => (
            <div
              key={tpl.title}
              className="stripe-card p-6 flex flex-col justify-between"
            >
              <div>
                <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 border border-indigo-100 px-2.5 py-0.5 rounded-full">
                  {tpl.category}
                </span>
                <h3 className="mt-3 text-lg font-bold text-[#111827]">
                  {tpl.title}
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-[#6B7280] leading-relaxed">
                  {tpl.description}
                </p>
              </div>

              <div className="pt-4 border-t border-gray-100 mt-6">
                <Link
                  href="/register"
                  className="w-full inline-flex items-center justify-center gap-2 py-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-[#111827] rounded-lg text-xs font-semibold transition-colors"
                >
                  Use Template
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
