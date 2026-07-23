"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const FAQS = [
  {
    question: "What is BulkyMailer and who developed it?",
    answer:
      "BulkyMailer is a modern email marketing SaaS platform designed for businesses, startups, developers, and growth teams. Designed and developed by Lokesh Paneru at BUIMB Research using Next.js, TypeScript, PostgreSQL, Prisma, and Tailwind CSS.",
  },
  {
    question: "How does BulkyMailer ensure high deliverability?",
    answer:
      "BulkyMailer employs automated DKIM, SPF, and DMARC authentication checks, dedicated IP rotation, real-time bounce suppression, and rate-limiting algorithms to ensure emails reach the primary inbox.",
  },
  {
    question: "Is there a free tier available?",
    answer:
      "Yes! BulkyMailer offers a Free Forever plan that includes 10,000 emails per month and up to 1,000 subscribers, full access to our template editor, and basic API access with no credit card required.",
  },
  {
    question: "What technologies power BulkyMailer?",
    answer:
      "BulkyMailer is built with Next.js 16 (App Router), TypeScript, Tailwind CSS, Prisma ORM, and PostgreSQL. It features developer-first REST APIs, SMTP relay capabilities, and SDK support.",
  },
  {
    question: "Can I send both marketing and transactional emails?",
    answer:
      "Yes, BulkyMailer supports both batch broadcast marketing campaigns and instant transactional emails (welcome emails, password resets, receipts) with sub-50ms latency.",
  },
];

export function FAQSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section id="faq" className="py-20 bg-white border-t border-gray-200">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-left mb-10">
          <div className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
            Frequently Asked Questions
          </div>
          <h2 className="mt-2 text-3xl font-extrabold text-[#111827] tracking-tight">
            Frequently asked questions.
          </h2>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={faq.question}
                className="stripe-card rounded-xl border border-gray-200 overflow-hidden"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full px-5 py-4 flex items-center justify-between text-left focus:outline-none"
                >
                  <span className="text-base font-semibold text-[#111827]">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-indigo-600" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-4 text-sm text-[#4B5563] leading-relaxed border-t border-gray-100 pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
