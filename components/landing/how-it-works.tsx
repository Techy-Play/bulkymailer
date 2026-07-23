"use client";

import { Globe, Users, FileCode2, Rocket } from "lucide-react";

const STEPS = [
  {
    step: "01",
    title: "Connect Domain",
    desc: "Add sending domain and verify DNS records (DKIM, SPF) with 1-click checking.",
  },
  {
    step: "02",
    title: "Import Contacts",
    desc: "Upload CSV files or sync subscribers automatically via REST API.",
  },
  {
    step: "03",
    title: "Design Template",
    desc: "Use drag-and-drop or raw HTML mode with custom recipient variables.",
  },
  {
    step: "04",
    title: "Send & Track",
    desc: "Dispatch broadcast campaigns while tracking real-time opens and clicks.",
  },
];

export function HowItWorksSection() {
  return (
    <section className="py-20 bg-[#FAFAFA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-2xl text-left">
          <div className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
            Streamlined Setup
          </div>
          <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-[#111827] tracking-tight">
            How it works in 4 simple steps.
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS.map((s) => (
            <div key={s.step} className="stripe-card p-6 flex flex-col justify-between">
              <div>
                <div className="text-xs font-extrabold text-indigo-600 font-mono mb-3">
                  STEP {s.step}
                </div>
                <h3 className="text-lg font-bold text-[#111827]">{s.title}</h3>
                <p className="mt-2 text-xs sm:text-sm text-[#6B7280] leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
