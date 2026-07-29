import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Code2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Integrations & API",
  description:
    "Connect BulkyMailer with your existing tech stack using pre-built webhooks and REST APIs.",
};

const INTEGRATIONS = [
  { name: "Resend", desc: "High-deliverability email sending engine with verified custom domain support.", category: "Email Engine" },
  { name: "Neon PostgreSQL", desc: "Serverless database storing contacts, lists, and event metrics.", category: "Database" },
  { name: "Next.js App Router", desc: "Fast SSR landing pages and App Router API endpoints.", category: "Framework" },
  { name: "Cloudinary", desc: "CDN image storage for email logos and banner media.", category: "Media CDN" },
  { name: "Google Gemini 2.5", desc: "AI assistant for email template design and copywriting.", category: "AI Engine" },
];

export default function IntegrationsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAFA]">
      <section className="pt-16 pb-12 text-center bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-xs font-semibold text-indigo-700 uppercase tracking-widest">
            Ecosystem & APIs
          </div>
          <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold text-[#111827] tracking-tight">
            Integrate BulkyMailer with Your Stack
          </h1>
          <p className="mt-3 text-base sm:text-lg text-[#4B5563] max-w-2xl mx-auto">
            Connect your website, database, and marketing automation tools seamlessly.
          </p>
        </div>
      </section>

      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {INTEGRATIONS.map((item, i) => (
            <div
              key={i}
              className="p-6 bg-white border border-gray-200 rounded-2xl shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
                    <Code2 className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-semibold text-[#4B5563] bg-gray-100 px-2.5 py-1 rounded-md">
                    {item.category}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-[#111827]">{item.name}</h3>
                <p className="mt-2 text-sm text-[#6B7280]">{item.desc}</p>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100">
                <Link
                  href="/features"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-800"
                >
                  Explore Integration Features
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
