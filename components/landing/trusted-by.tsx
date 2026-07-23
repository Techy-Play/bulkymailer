"use client";

import { MarqueeSlideshow } from "@/components/ui/slideshow";

const TEAMS = [
  "Vanguard AI",
  "DevFlow",
  "CloudPulse",
  "HyperScale",
  "Nexus SaaS",
  "Acme Global",
  "Linear Tech",
  "Stripe Ecosystem",
  "Notion Labs",
];

export function TrustedBySection() {
  return (
    <section className="py-8 border-y border-gray-200 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider text-center sm:text-left">
          Powering email delivery for fast-growing companies worldwide:
        </p>
      </div>

      <MarqueeSlideshow speed={20} className="py-2">
        {TEAMS.map((team, idx) => (
          <div
            key={`${team}-${idx}`}
            className="flex items-center gap-2 px-6 py-2 rounded-xl bg-gray-50 border border-gray-100 font-bold text-gray-600 hover:text-gray-900 transition-colors whitespace-nowrap cursor-pointer text-sm sm:text-base shrink-0"
          >
            <span className="w-2 h-2 rounded-full bg-indigo-600/70" />
            <span>{team}</span>
          </div>
        ))}
      </MarqueeSlideshow>
    </section>
  );
}
