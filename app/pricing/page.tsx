import type { Metadata } from "next";
import { PricingSection } from "@/components/landing/pricing";
import { FAQSection } from "@/components/landing/faq";
import { CTASection } from "@/components/landing/cta";

export const metadata: Metadata = {
  title: "Pricing Plans — Free Email Marketing",
  description:
    "Start free with 100 emails/month. Paid plans coming soon. No credit card required.",
};


export default function PricingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAFA]">
      <section className="pt-16 pb-12 text-center bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-xs font-semibold text-indigo-700 uppercase tracking-widest">
            Simple & Transparent
          </div>
          <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold text-[#111827] tracking-tight">
            Plans Built for Senders of All Sizes
          </h1>
          <p className="mt-3 text-base sm:text-lg text-[#4B5563] max-w-2xl mx-auto">
            Choose the plan that fits your current volume. Scale seamlessly with zero downtime.
          </p>
        </div>
      </section>

      <PricingSection />
      <FAQSection />
      <CTASection />
    </div>
  );
}
