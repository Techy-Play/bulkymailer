import type { Metadata } from "next";
import { FeaturesSection } from "@/components/landing/features";
import { BenefitsSection } from "@/components/landing/benefits";
import { CTASection } from "@/components/landing/cta";

export const metadata: Metadata = {
  title: "Features & Capabilities",
  description:
    "Explore BulkyMailer's powerful email marketing capabilities, drag-and-drop builders, audience segmentation, real-time webhooks, and developer APIs.",
};

export default function FeaturesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAFA]">
      <section className="pt-16 pb-12 text-center bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-xs font-semibold text-indigo-700 uppercase tracking-widest">
            Platform Capabilities
          </div>
          <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold text-[#111827] tracking-tight">
            Engineered for Modern Email Infrastructure
          </h1>
          <p className="mt-3 text-base sm:text-lg text-[#4B5563] max-w-2xl mx-auto">
            Discover the tools, APIs, and deliverability engines built into BulkyMailer by Lokesh Paneru.
          </p>
        </div>
      </section>

      <FeaturesSection />
      <BenefitsSection />
      <CTASection />
    </div>
  );
}
