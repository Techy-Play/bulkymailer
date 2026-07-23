import { HeroSection } from "@/components/landing/hero";
import { TrustedBySection } from "@/components/landing/trusted-by";
import { FeaturesSection } from "@/components/landing/features";
import { BenefitsSection } from "@/components/landing/benefits";
import { HowItWorksSection } from "@/components/landing/how-it-works";
import { PricingSection } from "@/components/landing/pricing";
import { TestimonialsSection } from "@/components/landing/testimonials";
import { FAQSection } from "@/components/landing/faq";
import { CTASection } from "@/components/landing/cta";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#030712]">
      <HeroSection />
      <TrustedBySection />
      <FeaturesSection />
      <BenefitsSection />
      <HowItWorksSection />
      <PricingSection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
    </div>
  );
}
