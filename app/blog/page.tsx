import type { Metadata } from "next";
import { Calendar, User } from "lucide-react";
import { MagicCard } from "@/components/ui/magic-card";

export const metadata: Metadata = {
  title: "Engineering & Deliverability Blog",
  description:
    "Insights on email deliverability, Next.js architecture, DKIM authentication, and scaling SaaS email infrastructure by Lokesh Paneru.",
};

const POSTS = [
  {
    slug: "achieving-99-percent-inbox-deliverability",
    title: "How We Engineered 99.99% Inbox Deliverability at BulkyMailer",
    excerpt:
      "A deep dive into DKIM/SPF rotation, IP warming schedules, and ISP feedback loops designed at BUIMB Research.",
    date: "July 20, 2026",
    author: "Lokesh Paneru",
    readTime: "6 min read",
    tag: "Deliverability",
  },
  {
    slug: "building-high-throughput-email-apis-nextjs",
    title: "Building High-Throughput Email APIs with Next.js & Prisma",
    excerpt:
      "How we leverage Next.js App Router, Prisma ORM, and PostgreSQL to dispatch over 100,000 emails per minute.",
    date: "July 12, 2026",
    author: "Lokesh Paneru",
    readTime: "8 min read",
    tag: "Engineering",
  },
  {
    slug: "why-legacy-email-marketing-platforms-fail",
    title: "Why Legacy Email Marketing Platforms Fail Modern Engineering Teams",
    excerpt:
      "Comparing traditional seat-based pricing models with developer-first, pay-as-you-grow email APIs.",
    date: "July 02, 2026",
    author: "BUIMB Research",
    readTime: "5 min read",
    tag: "SaaS Strategy",
  },
];

export default function BlogPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAFA]">
      <section className="pt-16 pb-12 text-center bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-xs font-semibold text-indigo-700 uppercase tracking-widest">
            Engineering Journal
          </div>
          <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold text-[#111827] tracking-tight">
            BulkyMailer Engineering & Insights
          </h1>
          <p className="mt-3 text-base sm:text-lg text-[#4B5563] max-w-2xl mx-auto">
            Articles, tutorials, and benchmarks on email deliverability, platform architecture, and growth strategies.
          </p>
        </div>
      </section>

      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {POSTS.map((post) => (
            <MagicCard
              key={post.slug}
              mode="orb"
              glowFrom="rgba(99, 102, 241, 0.25)"
              glowTo="rgba(168, 85, 247, 0.2)"
              className="p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-[#6B7280] mb-4">
                  <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 border border-indigo-100 font-semibold text-indigo-700">
                    {post.tag}
                  </span>
                  <span>{post.readTime}</span>
                </div>
                <h2 className="text-xl font-bold text-[#111827]">
                  {post.title}
                </h2>
                <p className="mt-2.5 text-sm text-[#4B5563] leading-relaxed">
                  {post.excerpt}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                <span className="flex items-center gap-1.5 text-[#111827] font-medium">
                  <User className="w-3.5 h-3.5" /> {post.author}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" /> {post.date}
                </span>
              </div>
            </MagicCard>
          ))}
        </div>
      </section>
    </div>
  );
}
