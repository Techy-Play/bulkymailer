import type { Metadata } from "next";
import { Key, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "Documentation & API Reference",
  description:
    "Complete developer documentation for BulkyMailer REST API, TypeScript SDK, domain authentication, and webhook events.",
};

export default function DocsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAFA]">
      <section className="pt-16 pb-12 text-center bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-xs font-semibold text-indigo-700 uppercase tracking-widest">
            Developer Documentation
          </div>
          <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold text-[#111827] tracking-tight">
            BulkyMailer Documentation & API Reference
          </h1>
          <p className="mt-3 text-base sm:text-lg text-[#4B5563] max-w-2xl mx-auto">
            Everything you need to send emails programmatically, authenticate domains, and consume webhooks.
          </p>
        </div>
      </section>

      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Nav */}
        <aside className="lg:col-span-1 space-y-6">
          <div className="p-4 rounded-xl bg-white border border-gray-200 space-y-3 shadow-xs">
            <h3 className="text-xs font-bold text-[#111827] uppercase tracking-wider">Getting Started</h3>
            <ul className="space-y-1 text-sm">
              <li><a href="#quickstart" className="block px-3 py-1.5 rounded-md bg-indigo-50 text-indigo-700 font-medium">Quickstart Guide</a></li>
              <li><a href="#authentication" className="block px-3 py-1.5 rounded-md text-[#4B5563] hover:text-[#111827]">API Authentication</a></li>
              <li><a href="#sdks" className="block px-3 py-1.5 rounded-md text-[#4B5563] hover:text-[#111827]">Official SDKs</a></li>
            </ul>

            <h3 className="text-xs font-bold text-[#111827] uppercase tracking-wider pt-4">API Endpoints</h3>
            <ul className="space-y-1 text-sm">
              <li><a href="#send-email" className="block px-3 py-1.5 rounded-md text-[#4B5563] hover:text-[#111827]">POST /v1/emails/send</a></li>
              <li><a href="#subscribers" className="block px-3 py-1.5 rounded-md text-[#4B5563] hover:text-[#111827]">POST /v1/subscribers</a></li>
              <li><a href="#webhooks" className="block px-3 py-1.5 rounded-md text-[#4B5563] hover:text-[#111827]">Webhooks Reference</a></li>
            </ul>
          </div>
        </aside>

        {/* Content Body */}
        <div className="lg:col-span-3 space-y-10 text-[#374151]">
          <div id="quickstart" className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#111827] flex items-center gap-3">
              <Zap className="w-6 h-6 text-indigo-600" /> Quickstart Guide
            </h2>
            <p className="text-[#4B5563] leading-relaxed">
              Install the official BulkyMailer TypeScript client to begin sending email campaigns or transactional emails in under two minutes.
            </p>
            <div className="p-4 rounded-xl bg-gray-900 font-mono text-sm text-indigo-300">
              npm install @bulkymailer/sdk
            </div>
          </div>

          <div id="code-example" className="space-y-4">
            <h3 className="text-xl font-bold text-[#111827]">Sending Your First Email</h3>
            <div className="p-5 rounded-xl bg-gray-900 font-mono text-xs sm:text-sm text-gray-200 overflow-x-auto">
              <pre className="text-indigo-300">
{`import { BulkyMailer } from "@bulkymailer/sdk";

const bulky = new BulkyMailer({
  apiKey: process.env.BULKYMAILER_API_KEY,
});

const response = await bulky.emails.send({
  from: "Lokesh Paneru <lokesh@bulkymailer.com>",
  to: ["customer@company.com"],
  subject: "Welcome aboard!",
  html: "<p>Thank you for signing up for BulkyMailer!</p>",
});

console.log("Email ID:", response.id);`}
              </pre>
            </div>
          </div>

          <div id="authentication" className="space-y-4 pt-6 border-t border-gray-200">
            <h2 className="text-2xl font-bold text-[#111827] flex items-center gap-3">
              <Key className="w-5 h-5 text-indigo-600" /> API Authentication
            </h2>
            <p className="text-[#4B5563] leading-relaxed">
              Authenticate API requests by supplying your account API key in the request header:
            </p>
            <div className="p-4 rounded-xl bg-gray-900 font-mono text-xs text-indigo-300">
              Authorization: Bearer bm_live_998877665544332211
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
