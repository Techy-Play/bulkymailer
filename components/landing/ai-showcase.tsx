"use client";

import { Sparkles, Wand2, ShieldCheck, Zap, Palette, ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";

const AI_FEATURES = [
  {
    icon: Sparkles,
    badge: "Instant Generation",
    title: "Create Templates from Plain Text",
    description:
      "Simply describe the email design you want in natural language. Our AI engine builds complete, responsive HTML templates with clean code in seconds.",
    gradient: "from-purple-500/20 to-indigo-500/20",
    border: "border-purple-500/30",
    iconColor: "text-purple-400",
  },
  {
    icon: Palette,
    badge: "1-Click Styling",
    title: "AI Dark Mode & Theme Palette",
    description:
      "Effortlessly switch between sleek dark mode, vibrant brand palettes, or minimal layout themes without writing single line of CSS.",
    gradient: "from-blue-500/20 to-cyan-500/20",
    border: "border-blue-500/30",
    iconColor: "text-blue-400",
  },
  {
    icon: ShieldCheck,
    badge: "Inbox Protection",
    title: "AI Deliverability & Spam Guard",
    description:
      "Every generated template is automatically scanned for spam trigger phrases, broken links, and HTML syntax errors to guarantee 99.9% inbox placement.",
    gradient: "from-emerald-500/20 to-teal-500/20",
    border: "border-emerald-500/30",
    iconColor: "text-emerald-400",
  },
  {
    icon: Zap,
    badge: "High Conversion",
    title: "AI Copy & CTA Optimization",
    description:
      "Get high-converting subject line suggestions, compelling preview texts, and call-to-action buttons styled for maximum click-through rates.",
    gradient: "from-amber-500/20 to-orange-500/20",
    border: "border-amber-500/30",
    iconColor: "text-amber-400",
  },
];

export function AIShowcaseSection() {
  return (
    <section className="py-24 bg-slate-950 text-white relative overflow-hidden border-t border-slate-800/80">
      {/* Background Glow Overlay */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-purple-500/10 to-indigo-500/10 border border-purple-500/30 text-purple-300 text-xs font-semibold shadow-inner">
            <Sparkles className="w-4 h-4 fill-purple-400 text-purple-400 animate-pulse" />
            <span>Built-in AI Assistant Engine</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Create Email Campaigns with <span className="bg-gradient-to-r from-purple-400 via-indigo-300 to-cyan-400 bg-clip-text text-transparent">Power of AI</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Stop struggling with manual HTML coding. Use natural language prompts to generate modern newsletters, customize theme colors, and optimize deliverability instantly.
          </p>
        </div>

        {/* AI Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-16">
          {AI_FEATURES.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className={`group relative p-8 rounded-3xl bg-slate-900/60 border ${feature.border} backdrop-blur-xl hover:bg-slate-900/90 transition-all duration-300 shadow-xl flex flex-col justify-between overflow-hidden`}
              >
                {/* Top Subtle Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`} />

                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-12 h-12 rounded-2xl bg-slate-800/80 border border-slate-700/80 flex items-center justify-center ${feature.iconColor} shadow-inner group-hover:scale-110 transition-transform`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-slate-800/90 text-slate-300 border border-slate-700/60">
                      {feature.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-200 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-6">
                    {feature.description}
                  </p>
                </div>

                <div className="flex items-center gap-2 text-xs font-semibold text-purple-400 group-hover:text-purple-300 transition-colors">
                  <span>Explore AI Feature</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Live Interactive AI Prompt Banner */}
        <div className="relative rounded-3xl bg-gradient-to-r from-purple-950/40 via-slate-900 to-indigo-950/40 border border-purple-500/30 p-8 sm:p-10 shadow-2xl backdrop-blur-xl flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-purple-400 uppercase tracking-wide">
              <Wand2 className="w-4 h-4" /> Try Building with AI
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              Turn your ideas into pixel-perfect email templates in seconds
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Experience the fastest email builder. Start with 100 free emails per month and build custom templates using natural language.
            </p>
          </div>

          <div className="w-full lg:w-auto shrink-0 flex flex-col sm:flex-row gap-3">
            <Link
              href="/register"
              className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-sm shadow-lg shadow-purple-900/30 transition-all hover:scale-105"
            >
              <Sparkles className="w-4 h-4 fill-white" />
              Build with AI for Free &rarr;
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
