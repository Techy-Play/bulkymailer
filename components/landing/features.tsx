"use client";

import {
  Mail,
  Users,
  BarChart3,
  Filter,
  LayoutTemplate,
  Workflow,
  Activity,
  Code2,
  ShieldCheck,
} from "lucide-react";
import { MagicCard } from "@/components/ui/magic-card";

const FEATURES = [
  {
    icon: Mail,
    title: "Campaign Builder",
    description:
      "Design responsive marketing newsletters and broadcast announcements using our visual editor or HTML code mode.",
  },
  {
    icon: Users,
    title: "Subscriber Management",
    description:
      "Maintain clean contact lists with automated bounce detection, custom contact metadata attributes, and bulk imports.",
  },
  {
    icon: BarChart3,
    title: "Real-time Analytics",
    description:
      "Track opens, clicks, unsubscribes, and spam complaints in real time with interactive geo-location insights.",
  },
  {
    icon: Filter,
    title: "Audience Segmentation",
    description:
      "Build dynamic customer segments based on user behavioral triggers, purchase history, domain type, or engagement scores.",
  },
  {
    icon: LayoutTemplate,
    title: "Email Templates",
    description:
      "50+ battle-tested responsive templates optimized for high conversion, mobile viewing, and dark mode rendering.",
  },
  {
    icon: Workflow,
    title: "Automation Drips",
    description:
      "Automate onboarding sequences, re-engagement campaigns, and transactional receipts with visual workflows.",
  },
  {
    icon: Activity,
    title: "Instant Webhooks",
    description:
      "Stream delivery events directly into your backend webhooks with sub-second latency and automatic retries.",
  },
  {
    icon: Code2,
    title: "Developer APIs & SDKs",
    description:
      "Integrate email delivery seamlessly with official Node.js, Python, Go, and React Email SDKs or SMTP relay.",
  },
  {
    icon: ShieldCheck,
    title: "Enterprise Security",
    description:
      "Automated DKIM, SPF, DMARC validation, SOC2 compliance, TLS 1.3 encryption, and multi-factor authentication.",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 bg-[#FAFAFA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl text-left">
          <div className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
            Platform Capabilities
          </div>
          <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-[#111827] tracking-tight">
            Everything you need to send at scale.
          </h2>
          <p className="mt-3 text-base text-[#4B5563]">
            Powerful features engineered for speed, deliverability, and developer simplicity.
          </p>
        </div>

        {/* Feature Cards Grid with MagicCard */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {FEATURES.map((feature) => {
            const Icon = feature.icon;
            return (
              <MagicCard
                key={feature.title}
                mode="orb"
                glowFrom="rgba(99, 102, 241, 0.25)"
                glowTo="rgba(168, 85, 247, 0.2)"
                className="p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-[#111827]">{feature.title}</h3>
                  <p className="mt-2 text-sm text-[#6B7280] leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </MagicCard>
            );
          })}
        </div>

      </div>
    </section>
  );
}
