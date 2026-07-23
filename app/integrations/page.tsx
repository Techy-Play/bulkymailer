import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Code2 } from "lucide-react";
import { MagicCard } from "@/components/ui/magic-card";

export const metadata: Metadata = {
  title: "Integrations & Developer SDKs",
  description:
    "Connect BulkyMailer with your tech stack. Official SDKs for Next.js, Node.js, Python, Go, REST API, and SMTP Relay.",
};

const INTEGRATIONS = [
  { name: "Next.js / React", category: "Framework", desc: "Native App Router & Server Action integration." },
  { name: "Node.js SDK", category: "Backend", desc: "Type-safe npm package with automatic retries." },
  { name: "Python Package", category: "Data & Backend", desc: "Async Python library for Django, FastAPI, & Flask." },
  { name: "Go SDK", category: "High Concurrency", desc: "Goroutine-safe client for ultra-fast throughput." },
  { name: "PostgreSQL & Prisma", category: "Database", desc: "Sync contacts & event logs directly to your DB." },
  { name: "SMTP Relay", category: "Legacy & Apps", desc: "Standard TLS 1.3 SMTP credentials for any software." },
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
            Seamless Integrations & Developer SDKs
          </h1>
          <p className="mt-3 text-base sm:text-lg text-[#4B5563] max-w-2xl mx-auto">
            Plug BulkyMailer into your existing web applications, databases, and continuous delivery pipelines in minutes.
          </p>
        </div>
      </section>

      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {INTEGRATIONS.map((item) => (
            <MagicCard
              key={item.name}
              mode="orb"
              glowFrom="rgba(99, 102, 241, 0.2)"
              glowTo="rgba(168, 85, 247, 0.2)"
              className="p-6 flex flex-col justify-between"
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
                  href="/docs"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-800"
                >
                  View Setup Guide
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </MagicCard>
          ))}
        </div>
      </section>
    </div>
  );
}
