import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of service and acceptable email sending policies for BulkyMailer.",
};

export default function TermsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAFA] py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-[#374151] space-y-8">
      <div className="border-b border-gray-200 pb-6">
        <h1 className="text-3xl font-extrabold text-[#111827]">Terms of Service</h1>
        <p className="text-xs text-gray-500 mt-2">Last updated: July 2026 • Developed by Lokesh Paneru</p>
      </div>

      <div className="space-y-6 text-sm sm:text-base leading-relaxed stripe-card p-8 bg-white border border-gray-200 rounded-2xl">
        <h2 className="text-xl font-bold text-[#111827]">1. Acceptance of Terms</h2>
        <p className="text-[#4B5563]">
          By creating an account or sending emails via BulkyMailer, you agree to comply with all acceptable use policies and CAN-SPAM / GDPR anti-spam regulations.
        </p>

        <h2 className="text-xl font-bold text-[#111827]">2. Anti-Spam Policy & Domain Reputation</h2>
        <p className="text-[#4B5563]">
          Sending unsolicited email (SPAM), purchased contact lists, or malicious email content is strictly prohibited. Accounts engaging in spam delivery will be suspended immediately.
        </p>

        <h2 className="text-xl font-bold text-[#111827]">3. SLA & Service Guarantees</h2>
        <p className="text-[#4B5563]">
          Paid Pro and Enterprise plans include a 99.99% uptime SLA backed by BUIMB Research infrastructure.
        </p>
      </div>
    </div>
  );
}
