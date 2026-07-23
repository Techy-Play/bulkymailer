"use client";

import { ShieldCheck, Cpu, DollarSign, Zap, CheckCircle2 } from "lucide-react";
import { MagicCard } from "@/components/ui/magic-card";

const BENEFITS = [
  {
    icon: ShieldCheck,
    title: "Unmatched Inbox Placement",
    description:
      "Avoid spam folders with automated DKIM/SPF domain verification, intelligent rate-limiting, and dedicated IP warm-up protocols.",
    points: ["Automated DNS record validation", "Dedicated IP rotation", "Real-time reputation alerts"],
  },
  {
    icon: Cpu,
    title: "Developer-First Infrastructure",
    description:
      "Engineered by Lokesh Paneru with type-safe TypeScript SDKs, instant webhooks, and REST endpoints. Built on Next.js, PostgreSQL, and Prisma.",
    points: ["Full TypeScript support", "Sub-50ms API latency", "Standard SMTP relay"],
  },
  {
    icon: DollarSign,
    title: "Predictable Pricing",
    description:
      "Say goodbye to aggressive per-contact price hikes. Pay only for the emails you actually send with 10,000 free monthly emails included.",
    points: ["10,000 free emails monthly", "No hidden seat fees", "Volume discount pricing"],
  },
  {
    icon: Zap,
    title: "Real-Time Event Webhooks",
    description:
      "Trigger automated emails immediately when users sign up or upgrade plans. Connect webhooks to your stack in under 5 minutes.",
    points: ["Instant webhook delivery", "Visual drip campaign workflow", "Behavioral event triggers"],
  },
];

export function BenefitsSection() {
  return (
    <section className="py-20 bg-white border-y border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-2xl text-left">
          <div className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
            Why BulkyMailer
          </div>
          <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-[#111827] tracking-tight">
            Built for modern growth teams.
          </h2>
          <p className="mt-3 text-base text-[#4B5563]">
            Simple deliverability tools that replace complex legacy infrastructure.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          {BENEFITS.map((item) => {
            const Icon = item.icon;
            return (
              <MagicCard
                key={item.title}
                mode="orb"
                glowFrom="rgba(99, 102, 241, 0.25)"
                glowTo="rgba(16, 185, 129, 0.2)"
                className="p-8 flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-bold text-[#111827]">{item.title}</h3>
                  <p className="mt-2 text-sm text-[#6B7280] leading-relaxed">{item.description}</p>
                  
                  <ul className="mt-6 space-y-2">
                    {item.points.map((pt) => (
                      <li key={pt} className="flex items-center gap-2 text-xs font-medium text-[#374151]">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </MagicCard>
            );
          })}
        </div>

      </div>
    </section>
  );
}
