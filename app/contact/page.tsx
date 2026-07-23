"use client";

import { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAFA]">
      <section className="pt-16 pb-12 text-center bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-xs font-semibold text-indigo-700 uppercase tracking-widest">
            Contact Support & Sales
          </div>
          <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold text-[#111827] tracking-tight">
            Get in Touch with BulkyMailer
          </h1>
          <p className="mt-3 text-base sm:text-lg text-[#4B5563] max-w-2xl mx-auto">
            Have questions about custom enterprise limits, migration support, or API integration? Send us a message.
          </p>
        </div>
      </section>

      <section className="py-16 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="stripe-card p-8 bg-white border border-gray-200 rounded-2xl shadow-xs">
          {submitted ? (
            <div className="text-center py-12 space-y-4">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h3 className="text-2xl font-bold text-[#111827]">Message Sent Successfully!</h3>
              <p className="text-[#6B7280]">
                Thank you for reaching out. Our engineering support team at BUIMB Research will respond within 2 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-[#374151] uppercase mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Lokesh Paneru"
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-[#111827] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#374151] uppercase mb-2">
                    Work Email
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="lokesh@company.com"
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-[#111827] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#374151] uppercase mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enterprise Migration & Volume Pricing"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-[#111827] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#374151] uppercase mb-2">
                  Message
                </label>
                <textarea
                  rows={5}
                  required
                  placeholder="Tell us about your estimated monthly email volume and integration requirements..."
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-[#111827] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#111827] hover:bg-black text-white font-semibold rounded-xl shadow-xs flex items-center justify-center gap-2 transition-colors text-sm"
              >
                <Send className="w-4 h-4" /> Send Message
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
