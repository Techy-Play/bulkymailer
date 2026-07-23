"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Mail, Menu, X, ArrowRight } from "lucide-react";

const NAV_LINKS = [
  { name: "Features", href: "/features" },
  { name: "Solutions", href: "/integrations" },
  { name: "Pricing", href: "/pricing" },
  { name: "Resources", href: "/docs" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 15) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        isScrolled
          ? "light-nav py-3 shadow-xs"
          : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 group focus:outline-none"
          >
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#111827] text-white font-bold text-sm shadow-xs group-hover:bg-indigo-600 transition-colors">
              <Mail className="w-4 h-4" />
            </div>
            <span className="font-bold text-lg tracking-tight text-[#111827]">
              BulkyMailer
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-medium transition-colors ${
                    isActive
                      ? "text-[#111827] font-semibold"
                      : "text-[#4B5563] hover:text-[#111827]"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-4">
            <Link
              href="/login"
              className="text-sm font-medium text-[#4B5563] hover:text-[#111827] transition-colors"
            >
              Log in
            </Link>
            <Link
              href="/register"
              className="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-white bg-[#111827] hover:bg-black rounded-lg shadow-xs transition-all active:scale-[0.98]"
            >
              Start Free
            </Link>
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="flex md:hidden items-center gap-3">
            <Link
              href="/register"
              className="px-3 py-1.5 text-xs font-semibold text-white bg-[#111827] rounded-md"
            >
              Start Free
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#4B5563] hover:text-[#111827] rounded-md hover:bg-gray-100 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 px-4 pt-3 pb-6 shadow-lg">
          <div className="flex flex-col space-y-3">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-[#374151] hover:text-[#111827] py-1"
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4 border-t border-gray-100 flex flex-col gap-2">
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2 text-sm font-medium text-[#374151] bg-gray-50 border border-gray-200 rounded-md"
              >
                Log in
              </Link>
              <Link
                href="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2 text-sm font-semibold text-white bg-[#111827] rounded-md"
              >
                Start Free
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
