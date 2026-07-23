import type { Metadata } from "next";
import { User, Globe } from "lucide-react";
import { MagicCard } from "@/components/ui/magic-card";

export const metadata: Metadata = {
  title: "About BulkyMailer & BUIMB Research",
  description:
    "Learn about BulkyMailer, an enterprise email marketing SaaS platform designed and developed by Lokesh Paneru at BUIMB Research.",
};

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAFA]">
      <section className="pt-16 pb-12 text-center bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-xs font-semibold text-indigo-700 uppercase tracking-widest">
            Company & Mission
          </div>
          <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold text-[#111827] tracking-tight">
            About BulkyMailer
          </h1>
          <p className="mt-3 text-base sm:text-lg text-[#4B5563] max-w-2xl mx-auto">
            Reimagining email deliverability and campaign automation for modern businesses and developers.
          </p>
        </div>
      </section>

      <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-[#374151]">
        <div className="stripe-card p-8 bg-white border border-gray-200 rounded-2xl space-y-4 shadow-xs">
          <h2 className="text-2xl font-bold text-[#111827]">The BulkyMailer Vision</h2>
          <p className="leading-relaxed text-[#4B5563]">
            BulkyMailer is a modern email marketing SaaS platform designed and developed by <strong>Lokesh Paneru</strong> under current development at <strong>BUIMB Research</strong>. It solves the critical deliverability and developer interface flaws present in legacy email platforms.
          </p>
          <p className="leading-relaxed text-[#4B5563]">
            Built using a state-of-the-art stack comprising <strong>Next.js</strong>, <strong>TypeScript</strong>, <strong>PostgreSQL</strong>, <strong>Prisma</strong>, and <strong>Tailwind CSS</strong>, BulkyMailer gives companies of all sizes instant access to enterprise-grade email campaigns, sub-50ms webhooks, and automated DKIM/SPF domain verification.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <MagicCard
            mode="orb"
            glowFrom="rgba(99, 102, 241, 0.2)"
            glowTo="rgba(168, 85, 247, 0.2)"
            className="p-6"
          >
            <User className="w-8 h-8 text-indigo-600 mb-3" />
            <h3 className="text-lg font-bold text-[#111827]">Lead Developer</h3>
            <p className="mt-2 text-sm text-[#6B7280]">
              Designed & Architected by <strong>Lokesh Paneru</strong>. Focused on ultra-low latency API delivery and intuitive developer UX.
            </p>
          </MagicCard>

          <MagicCard
            mode="orb"
            glowFrom="rgba(16, 185, 129, 0.2)"
            glowTo="rgba(99, 102, 241, 0.2)"
            className="p-6"
          >
            <Globe className="w-8 h-8 text-emerald-600 mb-3" />
            <h3 className="text-lg font-bold text-[#111827]">Organization</h3>
            <p className="mt-2 text-sm text-[#6B7280]">
              Developed under <strong>BUIMB Research</strong> to empower startups, enterprises, and growth teams globally.
            </p>
          </MagicCard>
        </div>
      </section>
    </div>
  );
}
