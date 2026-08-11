import Link from "next/link";
import { ArrowLeft, CheckCircle2, ShieldCheck, Globe, Server, Copy } from "lucide-react";
import { getSessionUser } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function VerifiedDomainsPage() {
  const user = await getSessionUser();
  if (!user) redirect("/login");

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      {/* Top Header */}
      <div className="flex items-center gap-4">
        <Link href="/dashboard" className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-[#111827]">Verified Sending Domains</h1>
          <p className="text-xs text-[#6B7280]">DNS authentication records, SPF, DKIM, and deliverability status.</p>
        </div>
      </div>

      {/* Main Verified Domain Card */}
      <div className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 shadow-2xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
              <Globe className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-[#111827]">send.au-acadex.com</h3>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Verified
                </span>
              </div>
              <p className="text-xs text-[#6B7280]">Primary production sending domain for BulkyMailer</p>
            </div>
          </div>

          <div className="text-xs text-[#6B7280] font-semibold bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-xl">
            Region: ap-southeast-1 (AWS SES)
          </div>
        </div>

        {/* DNS Telemetry Grid */}
        <div className="space-y-4">
          <h4 className="text-xs font-bold text-[#6B7280] uppercase tracking-wider">DNS Telemetry & Authentication Records</h4>
          
          <div className="space-y-3">
            {/* SPF RECORD */}
            <div className="p-4 bg-gray-50 border border-gray-200 rounded-2xl space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#111827] flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" /> SPF Record (TXT)
                </span>
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  Pass ✓
                </span>
              </div>
              <p className="text-[#6B7280] font-mono bg-white p-2.5 rounded-xl border border-gray-200 overflow-x-auto text-[11px]">
                v=spf1 include:amazonses.com include:resend.com ~all
              </p>
            </div>

            {/* DKIM RECORD */}
            <div className="p-4 bg-gray-50 border border-gray-200 rounded-2xl space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#111827] flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" /> DKIM Signature (CNAME)
                </span>
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  Pass ✓
                </span>
              </div>
              <p className="text-[#6B7280] font-mono bg-white p-2.5 rounded-xl border border-gray-200 overflow-x-auto text-[11px]">
                resend._domainkey.send.au-acadex.com
              </p>
            </div>

            {/* DMARC RECORD */}
            <div className="p-4 bg-gray-50 border border-gray-200 rounded-2xl space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#111827] flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" /> DMARC Policy (TXT)
                </span>
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  Pass ✓
                </span>
              </div>
              <p className="text-[#6B7280] font-mono bg-white p-2.5 rounded-xl border border-gray-200 overflow-x-auto text-[11px]">
                v=DMARC1; p=none; rua=mailto:dmarc@au-acadex.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
