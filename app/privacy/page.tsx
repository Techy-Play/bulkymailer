import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy and data governance terms for BulkyMailer SaaS platform by BUIMB Research.",
};

export default function PrivacyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAFA] py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-[#374151] space-y-8">
      <div className="border-b border-gray-200 pb-6">
        <h1 className="text-3xl font-extrabold text-[#111827]">Privacy Policy</h1>
        <p className="text-xs text-gray-500 mt-2">Last updated: July 2026 • BUIMB Research</p>
      </div>

      <div className="space-y-6 text-sm sm:text-base leading-relaxed stripe-card p-8 bg-white border border-gray-200 rounded-2xl">
        <h2 className="text-xl font-bold text-[#111827]">1. Data Collection & Usage</h2>
        <p className="text-[#4B5563]">
          BulkyMailer ("we", "our", or "us"), developed by Lokesh Paneru at BUIMB Research, collects account details (name, work email, billing address) and email campaign metrics necessary to deliver scalable email marketing services.
        </p>

        <h2 className="text-xl font-bold text-[#111827]">2. Subscriber Information Safeguards</h2>
        <p className="text-[#4B5563]">
          Subscriber lists uploaded to BulkyMailer are strictly confidential. We never sell, rent, or commercialize your customer contact details or campaign assets.
        </p>

        <h2 className="text-xl font-bold text-[#111827]">3. Security & SOC2 Compliance</h2>
        <p className="text-[#4B5563]">
          All API transmissions are encrypted using TLS 1.3. Stored database credentials and recipient contacts are secured with AES-256 encryption at rest within PostgreSQL databases managed via Prisma ORM.
        </p>
      </div>
    </div>
  );
}
