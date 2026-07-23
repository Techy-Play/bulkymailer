"use client";

import { useState } from "react";
import {
  Star, Megaphone, Globe, Mail, Zap, ArrowRight, Search, X,
  CheckCircle2, User,
} from "lucide-react";

interface Template {
  id: string;
  title: string;
  category: "personalized" | "newsletter" | "promotional" | "general" | "transactional" | "ecommerce";
  description: string;
  tags: string[];
  isPersonalized: boolean;
  previewGradient: string;
  icon: React.ReactNode;
}

const TEMPLATES: Template[] = [
  {
    id: "t1", title: "Personal Outreach", category: "personalized",
    description: "One-on-one personalized email with {{firstName}}, {{companyName}} merge tags. Perfect for cold outreach.",
    tags: ["{{firstName}}", "{{companyName}}", "{{role}}"], isPersonalized: true,
    previewGradient: "from-violet-600 to-purple-700", icon: <User className="w-6 h-6" />,
  },
  {
    id: "t2", title: "Monthly Newsletter", category: "newsletter",
    description: "Multi-section newsletter with header, featured story, quick reads, and footer CTA.",
    tags: ["Newsletter", "Monthly", "Digest"], isPersonalized: false,
    previewGradient: "from-indigo-600 to-blue-700", icon: <Mail className="w-6 h-6" />,
  },
  {
    id: "t3", title: "Flash Sale Announcement", category: "promotional",
    description: "High-contrast promo email with countdown timer section, discount badge, and product spotlight.",
    tags: ["Sale", "Promotion", "Discount"], isPersonalized: false,
    previewGradient: "from-amber-500 to-orange-600", icon: <Zap className="w-6 h-6" />,
  },
  {
    id: "t4", title: "Product Launch", category: "general",
    description: "Clean announcement layout for new product or feature releases with hero image placeholder.",
    tags: ["Launch", "Announcement", "Product"], isPersonalized: false,
    previewGradient: "from-emerald-500 to-teal-600", icon: <Globe className="w-6 h-6" />,
  },
  {
    id: "t5", title: "VIP Customer — Personalized Offer", category: "personalized",
    description: "Exclusive offer email using {{firstName}} and {{totalPurchases}} merge tags for high-value customer segments.",
    tags: ["{{firstName}}", "{{totalPurchases}}", "VIP"], isPersonalized: true,
    previewGradient: "from-rose-500 to-pink-600", icon: <Star className="w-6 h-6" />,
  },
  {
    id: "t6", title: "Welcome Series — Part 1", category: "transactional",
    description: "Onboarding welcome email with account activation CTA, feature highlights, and support info.",
    tags: ["Welcome", "Onboarding", "Transactional"], isPersonalized: false,
    previewGradient: "from-cyan-500 to-sky-600", icon: <CheckCircle2 className="w-6 h-6" />,
  },
  {
    id: "t7", title: "Weekly Digest Newsletter", category: "newsletter",
    description: "Curated content digest with article cards, author callout, and social sharing section.",
    tags: ["Weekly", "Digest", "Content"], isPersonalized: false,
    previewGradient: "from-blue-600 to-indigo-700", icon: <Mail className="w-6 h-6" />,
  },
  {
    id: "t8", title: "Black Friday Mega Sale", category: "ecommerce",
    description: "Dark-themed high-impact promo email with multiple product cards and urgency countdown.",
    tags: ["Black Friday", "Sale", "E-Commerce"], isPersonalized: false,
    previewGradient: "from-gray-800 to-slate-900 border border-amber-500/30", icon: <Megaphone className="w-6 h-6" />,
  },
  {
    id: "t9", title: "Re-engagement Campaign", category: "personalized",
    description: "Win-back email using {{firstName}} and {{lastPurchaseDate}} to personalize the message.",
    tags: ["{{firstName}}", "{{lastPurchaseDate}}", "Re-engage"], isPersonalized: true,
    previewGradient: "from-purple-600 to-fuchsia-700", icon: <User className="w-6 h-6" />,
  },
  {
    id: "t10", title: "Event Invitation", category: "general",
    description: "Elegant event invite with date/time block, RSVP button, and location details.",
    tags: ["Event", "Invite", "RSVP"], isPersonalized: false,
    previewGradient: "from-lime-500 to-green-600", icon: <Globe className="w-6 h-6" />,
  },
  {
    id: "t11", title: "Abandoned Cart Recovery", category: "ecommerce",
    description: "Cart recovery email with {{firstName}}, product image placeholders, and urgency nudge.",
    tags: ["{{firstName}}", "E-Commerce", "Cart"], isPersonalized: true,
    previewGradient: "from-orange-500 to-red-600", icon: <Zap className="w-6 h-6" />,
  },
  {
    id: "t12", title: "Security / Login Alert", category: "transactional",
    description: "High-priority minimalist alert with IP address, device info, and action confirmation.",
    tags: ["Security", "Alert", "Transactional"], isPersonalized: false,
    previewGradient: "from-red-700 to-rose-800", icon: <CheckCircle2 className="w-6 h-6" />,
  },
];

const CATEGORIES = [
  { id: "all", label: "All Templates", icon: <Globe className="w-3.5 h-3.5" /> },
  { id: "personalized", label: "Personalized", icon: <Star className="w-3.5 h-3.5" /> },
  { id: "newsletter", label: "Newsletter", icon: <Mail className="w-3.5 h-3.5" /> },
  { id: "promotional", label: "Promotional", icon: <Megaphone className="w-3.5 h-3.5" /> },
  { id: "general", label: "General", icon: <Globe className="w-3.5 h-3.5" /> },
  { id: "ecommerce", label: "E-Commerce", icon: <Zap className="w-3.5 h-3.5" /> },
  { id: "transactional", label: "Transactional", icon: <CheckCircle2 className="w-3.5 h-3.5" /> },
];

const CATEGORY_COLORS: Record<string, string> = {
  personalized: "bg-violet-500/10 text-violet-400 border-violet-500/20",
  newsletter: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
  promotional: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  general: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  transactional: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
  ecommerce: "bg-orange-500/10 text-orange-400 border-orange-500/20",
};

function TemplatePreview({ template }: { template: Template }) {
  // Mini HTML preview card
  return (
    <div className={`h-36 rounded-xl bg-gradient-to-br ${template.previewGradient} flex flex-col items-center justify-center gap-2 relative overflow-hidden`}>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.08),transparent)]" />
      <div className="text-white/60 relative z-10">{template.icon}</div>
      <div className="space-y-1 relative z-10 px-3 w-full">
        <div className="h-1.5 bg-white/20 rounded-full w-3/4 mx-auto" />
        <div className="h-1 bg-white/15 rounded-full w-1/2 mx-auto" />
        <div className="h-1 bg-white/10 rounded-full w-2/3 mx-auto" />
      </div>
      <div className="h-5 w-16 bg-white/20 rounded-full relative z-10" />
    </div>
  );
}

export default function TemplatesPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);

  const filtered = TEMPLATES.filter((t) => {
    const matchCat = activeCategory === "all" || t.category === activeCategory;
    const matchSearch =
      !search ||
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.description.toLowerCase().includes(search.toLowerCase()) ||
      t.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase()));
    return matchCat && matchSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-white">Email Templates</h1>
        <p className="text-sm text-slate-400 mt-1">
          Choose from {TEMPLATES.length} templates · <span className="text-violet-400 font-semibold">Personalized</span> templates support merge tags like {"{{firstName}}"}
        </p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
        <input
          type="text"
          placeholder="Search templates…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-10 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-sm text-white placeholder:text-slate-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
        />
        {search && (
          <button onClick={() => setSearch("")} className="absolute right-3 top-3 text-slate-500 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Category tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap border transition-all ${
              activeCategory === cat.id
                ? "bg-indigo-600 border-indigo-600 text-white"
                : "bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-600 hover:text-slate-300"
            }`}
          >
            {cat.icon}
            {cat.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((tpl) => (
          <div
            key={tpl.id}
            className="group bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-indigo-500/50 transition-all hover:shadow-xl hover:shadow-indigo-900/20"
          >
            {/* Preview */}
            <div className="relative">
              <TemplatePreview template={tpl} />
              {/* Badges */}
              <div className="absolute top-2 left-2 flex gap-1.5">
                {tpl.isPersonalized && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-violet-600 text-white text-[10px] font-bold uppercase tracking-wide shadow">
                    <Star className="w-2.5 h-2.5" /> Personalized
                  </span>
                )}
                <span className={`inline-flex items-center px-2 py-0.5 rounded-full border text-[10px] font-semibold capitalize ${CATEGORY_COLORS[tpl.category]}`}>
                  {tpl.category}
                </span>
              </div>
            </div>

            {/* Info */}
            <div className="p-4">
              <h3 className="font-bold text-white text-sm">{tpl.title}</h3>
              <p className="text-xs text-slate-500 mt-1 line-clamp-2">{tpl.description}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mt-3">
                {tpl.tags.slice(0, 3).map((tag) => (
                  <span key={tag}
                    className={`text-[10px] px-1.5 py-0.5 rounded-md font-medium ${
                      tag.startsWith("{{") ? "bg-violet-500/10 text-violet-400 border border-violet-500/20" : "bg-slate-800 text-slate-400"
                    }`}>
                    {tag}
                  </span>
                ))}
              </div>

              <button
                onClick={() => setSelectedTemplate(tpl)}
                className="mt-4 w-full flex items-center justify-center gap-2 py-2.5 bg-slate-800 hover:bg-indigo-600 text-slate-300 hover:text-white border border-slate-700 hover:border-indigo-600 rounded-xl text-xs font-semibold transition-all group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-600"
              >
                Use Template <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <p className="text-slate-500 font-medium">No templates found</p>
          <button onClick={() => { setSearch(""); setActiveCategory("all"); }} className="mt-2 text-sm text-indigo-400 hover:underline">
            Clear filters
          </button>
        </div>
      )}

      {/* Preview Modal */}
      {selectedTemplate && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#1a1a2e] border border-slate-700 rounded-2xl w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between p-5 border-b border-slate-700">
              <div>
                <h2 className="font-bold text-white">{selectedTemplate.title}</h2>
                <div className="flex items-center gap-2 mt-1">
                  {selectedTemplate.isPersonalized && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-violet-600 text-white text-[10px] font-bold">
                      <Star className="w-2.5 h-2.5" /> Personalized
                    </span>
                  )}
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full border text-[10px] font-semibold capitalize ${CATEGORY_COLORS[selectedTemplate.category]}`}>
                    {selectedTemplate.category}
                  </span>
                </div>
              </div>
              <button onClick={() => setSelectedTemplate(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-5">
              <TemplatePreview template={selectedTemplate} />
              <p className="text-sm text-slate-400 mt-4">{selectedTemplate.description}</p>
              {selectedTemplate.isPersonalized && (
                <div className="mt-3 p-3 rounded-xl bg-violet-500/10 border border-violet-500/20">
                  <p className="text-xs font-semibold text-violet-400 mb-1">Supported merge tags:</p>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedTemplate.tags.filter(t => t.startsWith("{{")).map(tag => (
                      <code key={tag} className="text-xs bg-violet-900/50 text-violet-300 px-1.5 py-0.5 rounded">{tag}</code>
                    ))}
                  </div>
                </div>
              )}
              <div className="flex gap-3 mt-5">
                <button onClick={() => setSelectedTemplate(null)}
                  className="flex-1 py-2.5 border border-slate-600 text-slate-300 text-sm font-semibold rounded-xl hover:bg-slate-800 transition">
                  Cancel
                </button>
                <button
                  className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-xl transition flex items-center justify-center gap-2">
                  Use This Template <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
