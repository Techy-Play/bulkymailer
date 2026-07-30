"use client";

import React, { useState, useRef, useEffect } from "react";
import { Search, ChevronDown, Check, X } from "lucide-react";
import { Country, COUNTRIES } from "./country-data";

interface SearchableSelectProps {
  label?: string;
  placeholder?: string;
  searchPlaceholder?: string;
  options: Array<{ value: string; label: string; icon?: string; sublabel?: string }>;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  required?: boolean;
  className?: string;
}

export function SearchableSelect({
  label,
  placeholder = "Select an option",
  searchPlaceholder = "Search...",
  options,
  value,
  onChange,
  disabled = false,
  required = false,
  className = "",
}: SearchableSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const selectedOption = options.find((o) => o.value === value);

  const filteredOptions = options.filter(
    (o) =>
      o.label.toLowerCase().includes(query.toLowerCase()) ||
      (o.sublabel && o.sublabel.toLowerCase().includes(query.toLowerCase())) ||
      o.value.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 50);
    } else {
      setQuery("");
    }
  }, [isOpen]);

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {label && (
        <label className="block text-xs font-semibold text-[#374151] uppercase tracking-wide mb-1.5">
          {label} {required && "*"}
        </label>
      )}

      {/* Trigger Button */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-left flex items-center justify-between transition focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-400 ${
          disabled ? "opacity-50 cursor-not-allowed bg-gray-100" : "hover:border-gray-300"
        } ${isOpen ? "ring-2 ring-indigo-500/40 border-indigo-400 bg-white" : ""}`}
      >
        <span className="truncate flex items-center gap-2">
          {selectedOption ? (
            <>
              {selectedOption.icon && <span className="text-base">{selectedOption.icon}</span>}
              <span className="text-[#111827] font-semibold">{selectedOption.label}</span>
              {selectedOption.sublabel && (
                <span className="text-xs text-gray-400">({selectedOption.sublabel})</span>
              )}
            </>
          ) : (
            <span className="text-gray-400 font-normal">{placeholder}</span>
          )}
        </span>
        <ChevronDown className={`w-4 h-4 text-gray-400 shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {/* Popover Menu */}
      {isOpen && (
        <div className="absolute z-50 left-0 right-0 mt-1.5 bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden flex flex-col max-h-64 animate-in fade-in-50 zoom-in-95">
          {/* Top Search Input */}
          <div className="p-2 border-b border-gray-100 bg-gray-50/80 sticky top-0 z-10">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-2.5" />
              <input
                ref={searchInputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={searchPlaceholder}
                className="w-full pl-8 pr-7 py-1.5 bg-white border border-gray-200 rounded-lg text-xs text-[#111827] focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="absolute right-2 top-2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Options Scroll List */}
          <div className="overflow-y-auto p-1 divide-y divide-gray-50 max-h-48">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((o) => {
                const isSelected = o.value === value;
                return (
                  <button
                    key={o.value}
                    type="button"
                    onClick={() => {
                      onChange(o.value);
                      setIsOpen(false);
                    }}
                    className={`w-full px-3 py-2 text-xs font-medium text-left rounded-lg flex items-center justify-between transition-colors ${
                      isSelected
                        ? "bg-indigo-50 text-indigo-700 font-semibold"
                        : "text-[#374151] hover:bg-gray-50"
                    }`}
                  >
                    <span className="flex items-center gap-2 truncate">
                      {o.icon && <span className="text-sm">{o.icon}</span>}
                      <span>{o.label}</span>
                      {o.sublabel && <span className="text-gray-400 font-normal">({o.sublabel})</span>}
                    </span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-indigo-600 shrink-0" />}
                  </button>
                );
              })
            ) : (
              <div className="px-3 py-4 text-center text-xs text-gray-400">
                No matching results found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
 * Phone Country Select Component
 * ───────────────────────────────────────────────────────────── */

interface PhoneCountrySelectProps {
  label?: string;
  phoneNumber: string;
  placeholder?: string;
  selectedCountry: Country;
  onCountryChange: (country: Country) => void;
  onPhoneNumberChange: (phone: string) => void;
  required?: boolean;
}

export function PhoneCountrySelect({
  label = "Phone Number",
  phoneNumber,
  placeholder = "98765 43210",
  selectedCountry,
  onCountryChange,
  onPhoneNumberChange,
  required = false,
}: PhoneCountrySelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const filteredCountries = COUNTRIES.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.dialCode.includes(search) ||
      c.code.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 50);
    } else {
      setSearch("");
    }
  }, [isOpen]);

  // Strip dialcode if user typed it into input directly
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    // Allow digits, spaces, hyphens
    val = val.replace(/[^\d\s-]/g, "");
    onPhoneNumberChange(val);
  };

  return (
    <div className="space-y-1.5" ref={dropdownRef}>
      {label && (
        <label className="block text-xs font-semibold text-[#374151] uppercase tracking-wide">
          {label} {required && "*"}
        </label>
      )}

      <div className="relative flex items-center">
        {/* Country Code Trigger Button */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`h-[42px] px-3 bg-gray-50 border border-gray-200 rounded-l-xl border-r-0 text-sm font-semibold text-[#111827] flex items-center gap-1.5 shrink-0 hover:bg-gray-100 transition focus:outline-none focus:ring-2 focus:ring-indigo-500/40 ${
            isOpen ? "ring-2 ring-indigo-500/40 border-indigo-400 bg-white" : ""
          }`}
        >
          <span className="text-base leading-none">{selectedCountry.flag}</span>
          <span>{selectedCountry.dialCode}</span>
          <ChevronDown className={`w-3.5 h-3.5 text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`} />
        </button>

        {/* Phone Input Field */}
        <input
          type="tel"
          value={phoneNumber}
          onChange={handleInputChange}
          placeholder={placeholder}
          className="w-full h-[42px] px-3 bg-gray-50 border border-gray-200 rounded-r-xl text-[#111827] text-sm font-medium focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-400 focus:outline-none transition placeholder:text-gray-400"
        />

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute z-50 top-full left-0 mt-1.5 w-72 bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden flex flex-col max-h-64 animate-in fade-in-50 zoom-in-95">
            {/* Top Search Input */}
            <div className="p-2 border-b border-gray-100 bg-gray-50/80 sticky top-0 z-10">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-2.5" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search country or dial code (e.g. India or +91)..."
                  className="w-full pl-8 pr-7 py-1.5 bg-white border border-gray-200 rounded-lg text-xs text-[#111827] focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                />
                {search && (
                  <button
                    type="button"
                    onClick={() => setSearch("")}
                    className="absolute right-2 top-2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Country Options List */}
            <div className="overflow-y-auto p-1 divide-y divide-gray-50 max-h-48">
              {filteredCountries.length > 0 ? (
                filteredCountries.map((c) => {
                  const isSelected = c.code === selectedCountry.code;
                  return (
                    <button
                      key={c.code}
                      type="button"
                      onClick={() => {
                        onCountryChange(c);
                        setIsOpen(false);
                      }}
                      className={`w-full px-3 py-2 text-xs font-medium text-left rounded-lg flex items-center justify-between transition-colors ${
                        isSelected
                          ? "bg-indigo-50 text-indigo-700 font-semibold"
                          : "text-[#374151] hover:bg-gray-50"
                      }`}
                    >
                      <span className="flex items-center gap-2 truncate">
                        <span className="text-base">{c.flag}</span>
                        <span className="font-medium">{c.name}</span>
                      </span>
                      <span className="text-xs font-semibold text-indigo-600 ml-2 shrink-0">
                        {c.dialCode}
                      </span>
                    </button>
                  );
                })
              ) : (
                <div className="px-3 py-4 text-center text-xs text-gray-400">
                  No matching country found
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
