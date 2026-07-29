"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, ArrowRight, CheckCircle2, Shield, Globe } from "lucide-react";
import { GithubIcon, TwitterIcon, LinkedinIcon } from "@/components/ui/icons";

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="bg-white border-t border-gray-200 text-[#4B5563] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 pb-12 border-b border-gray-100">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <img
                src="/icon.png"
                alt="BulkyMailer"
                width={32}
                height={32}
                className="h-8 w-8 object-contain shrink-0"
              />
              <span className="font-extrabold text-lg tracking-tight text-[#111827]">
                Bulky<span className="text-indigo-600">Mailer</span>
              </span>
            </Link>
            <p className="text-sm text-gray-500 leading-relaxed max-w-sm">
              The email marketing platform built for high-volume delivery, real-time analytics, and automated audience segmentation.
            </p>
            
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-md bg-gray-50 border border-gray-200 text-gray-600 hover:text-[#111827] hover:bg-gray-100 transition-all"
                aria-label="GitHub"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-md bg-gray-50 border border-gray-200 text-gray-600 hover:text-[#111827] hover:bg-gray-100 transition-all"
                aria-label="Twitter/X"
              >
                <TwitterIcon className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-md bg-gray-50 border border-gray-200 text-gray-600 hover:text-[#111827] hover:bg-gray-100 transition-all"
                aria-label="LinkedIn"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Links Column 1 */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-[#111827] uppercase tracking-wider">
              Product
            </h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/features" className="hover:text-[#111827] transition-colors">Features</Link></li>
              <li><Link href="/pricing" className="hover:text-[#111827] transition-colors">Pricing</Link></li>
              <li><Link href="/integrations" className="hover:text-[#111827] transition-colors">Integrations</Link></li>
            </ul>
          </div>

          {/* Links Column 2 */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-[#111827] uppercase tracking-wider">
              Company & Resources
            </h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/blog" className="hover:text-[#111827] transition-colors">Engineering Blog</Link></li>
              <li><Link href="/about" className="hover:text-[#111827] transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-[#111827] transition-colors">Contact Support</Link></li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="text-xs font-bold text-[#111827] uppercase tracking-wider">
              Subscribe to Updates
            </h3>
            <p className="text-xs text-gray-500">
              Get deliverability guides and platform announcements delivered to your inbox.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  required
                  className="w-full px-3.5 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg text-[#111827] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#111827] hover:bg-black text-white rounded-lg text-xs font-semibold shrink-0 transition-colors"
                >
                  Subscribe
                </button>
              </div>
              {subscribed && (
                <div className="text-xs text-emerald-600 font-medium flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Subscribed successfully!
                </div>
              )}
            </form>
          </div>

        </div>

        {/* Footer Bottom */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <div>
            © 2026 BulkyMailer. Developed by <span className="font-semibold text-[#111827]">Lokesh Paneru</span> at BUIMB Research.
          </div>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-[#111827] transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-[#111827] transition-colors">Terms of Service</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
