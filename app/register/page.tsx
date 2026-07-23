"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Mail, Lock, User, ArrowRight, Eye, EyeOff, CheckCircle2,
  Building2, Globe, MapPin, Users, Phone, ChevronRight, ArrowLeft,
} from "lucide-react";

type Step = 0 | 1 | 2;

const STEPS = ["Personal Info", "Organization", "Business Profile"];

const TEAM_SIZES = [
  { value: "SOLO", label: "Just me" },
  { value: "TWO_TO_FIVE", label: "2–5" },
  { value: "SIX_TO_TEN", label: "6–10" },
  { value: "ELEVEN_TO_FIFTY", label: "11–50" },
  { value: "FIFTY_PLUS", label: "50+" },
];

const CONTACT_RANGES = [
  { value: "LESS_THAN_1000", label: "< 1,000" },
  { value: "FROM_1K_TO_5K", label: "1K – 5K" },
  { value: "FROM_5K_TO_20K", label: "5K – 20K" },
  { value: "FROM_20K_TO_50K", label: "20K – 50K" },
  { value: "ABOVE_50K", label: "50K+" },
];

function StepIndicator({ step }: { step: Step }) {
  return (
    <div className="flex items-center justify-between mb-8 px-1">
      {STEPS.map((label, i) => (
        <div key={label} className="flex items-center gap-2 flex-1">
          <div className="flex flex-col items-center gap-1 flex-1">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all ${
                i < step
                  ? "bg-indigo-600 border-indigo-600 text-white"
                  : i === step
                  ? "bg-white border-indigo-600 text-indigo-600"
                  : "bg-white border-gray-200 text-gray-400"
              }`}
            >
              {i < step ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
            </div>
            <span
              className={`text-[10px] font-semibold hidden sm:block text-center ${
                i === step ? "text-indigo-600" : i < step ? "text-indigo-400" : "text-gray-400"
              }`}
            >
              {label}
            </span>
          </div>
          {i < STEPS.length - 1 && (
            <div
              className={`flex-1 h-0.5 mx-2 rounded mb-4 ${
                i < step ? "bg-indigo-600" : "bg-gray-200"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}

function OptionGrid({ options, value, onChange }: {
  options: { value: string; label: string }[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          onClick={() => onChange(o.value)}
          className={`py-2.5 px-3 rounded-xl text-sm font-medium border transition-all ${
            value === o.value
              ? "bg-indigo-600 text-white border-indigo-600 shadow-sm"
              : "bg-gray-50 text-[#374151] border-gray-200 hover:border-indigo-300"
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

export default function RegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    // Step 0 — Personal
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
    // Step 1 — Organization
    companyName: "",
    website: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    // Step 2 — Business Profile
    teamSize: "",
    contactRange: "",
    sellsOnline: null as boolean | null,
    marketingOptIn: true,
  });

  const set = (field: keyof typeof form, value: unknown) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  // Password strength
  const ps = (() => {
    const p = form.password;
    if (!p.length) return 0;
    let s = 0;
    if (p.length >= 8) s++;
    if (p.length >= 12) s++;
    if (/[A-Z]/.test(p)) s++;
    if (/[0-9]/.test(p)) s++;
    if (/[^A-Za-z0-9]/.test(p)) s++;
    return s;
  })();
  const psLabel = ["", "Weak", "Fair", "Good", "Strong", "Very strong"][ps];
  const psColor = ["", "bg-red-400", "bg-orange-400", "bg-yellow-400", "bg-emerald-400", "bg-emerald-500"][ps];

  function canAdvance(): boolean {
    if (step === 0) {
      return (
        form.firstName.trim().length > 0 &&
        form.lastName.trim().length > 0 &&
        form.email.includes("@") &&
        form.password.length >= 8
      );
    }
    if (step === 1) {
      return (
        form.companyName.trim().length > 0 &&
        form.addressLine1.trim().length > 0 &&
        form.city.trim().length > 0 &&
        form.postalCode.trim().length > 0 &&
        form.country.trim().length > 0
      );
    }
    if (step === 2) {
      return !!form.teamSize && !!form.contactRange && form.sellsOnline !== null;
    }
    return true;
  }

  async function handleSubmit() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          sellsOnline: form.sellsOnline === true,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Something went wrong.");
        return;
      }
      router.push(`/verify-otp?email=${encodeURIComponent(form.email)}`);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const inputClass =
    "w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-[#111827] text-sm focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-400 focus:outline-none transition placeholder:text-gray-400";

  const labelClass =
    "block text-xs font-semibold text-[#374151] uppercase tracking-wide mb-1.5";

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-slate-50 items-center justify-center py-12 px-4 sm:px-6">
      <div className="w-full max-w-lg">
        {/* Logo */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 mb-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-200">
              <Mail className="w-4.5 h-4.5 text-white" />
            </div>
            <span className="font-bold text-[#111827] text-xl tracking-tight">BulkyMailer</span>
          </div>
          <h1 className="text-2xl font-bold text-[#111827]">Create your account</h1>
          <p className="text-sm text-[#6B7280] mt-1">
            Free plan · <span className="font-semibold text-indigo-600">100 emails/month</span> · No credit card required
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8">
          <StepIndicator step={step} />

          {error && (
            <div className="mb-5 p-3 rounded-xl bg-red-50 border border-red-100 text-sm text-red-700">
              {error}
            </div>
          )}

          {/* ── Step 0: Personal Info ── */}
          {step === 0 && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center">
                  <User className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                  <p className="font-bold text-[#111827]">Personal Information</p>
                  <p className="text-xs text-[#6B7280]">Your name and login credentials</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelClass}>First Name *</label>
                  <div className="relative">
                    <input type="text" value={form.firstName} onChange={(e) => set("firstName", e.target.value)}
                      placeholder="Alex" required className={`${inputClass} pl-9`} />
                    <User className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-3" />
                  </div>
                </div>
                <div>
                  <label className={labelClass}>Last Name *</label>
                  <input type="text" value={form.lastName} onChange={(e) => set("lastName", e.target.value)}
                    placeholder="Mercer" required className={inputClass} />
                </div>
              </div>

              <div>
                <label className={labelClass}>Work Email *</label>
                <div className="relative">
                  <input type="email" value={form.email} onChange={(e) => set("email", e.target.value)}
                    placeholder="alex@company.com" required className={`${inputClass} pl-9`} />
                  <Mail className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-3" />
                </div>
              </div>

              <div>
                <label className={labelClass}>Phone Number</label>
                <div className="relative">
                  <input type="tel" value={form.phoneNumber} onChange={(e) => set("phoneNumber", e.target.value)}
                    placeholder="+1 555 000 0000" className={`${inputClass} pl-9`} />
                  <Phone className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-3" />
                </div>
              </div>

              <div>
                <label className={labelClass}>Password *</label>
                <div className="relative">
                  <input type={showPassword ? "text" : "password"} value={form.password}
                    onChange={(e) => set("password", e.target.value)}
                    placeholder="Min. 8 characters" required className={`${inputClass} pl-9 pr-10`} />
                  <Lock className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-3" />
                  <button type="button" onClick={() => setShowPassword((s) => !s)}
                    className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600" tabIndex={-1}>
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {form.password.length > 0 && (
                  <div className="mt-2 flex items-center gap-2">
                    <div className="flex gap-1 flex-1">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className={`h-1.5 flex-1 rounded-full transition-all ${i <= ps ? psColor : "bg-gray-200"}`} />
                      ))}
                    </div>
                    <span className="text-xs text-[#6B7280]">{psLabel}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ── Step 1: Organization ── */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                  <p className="font-bold text-[#111827]">Organization Details</p>
                  <p className="text-xs text-[#6B7280]">Required for CAN-SPAM compliance</p>
                </div>
              </div>

              <div>
                <label className={labelClass}>Company Name *</label>
                <input type="text" value={form.companyName} onChange={(e) => set("companyName", e.target.value)}
                  placeholder="Acme Inc." required className={inputClass} />
              </div>

              <div>
                <label className={labelClass}>Website</label>
                <div className="relative">
                  <input type="text" value={form.website} onChange={(e) => set("website", e.target.value)}
                    placeholder="mycompany.com" className={`${inputClass} pl-9`} />
                  <Globe className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-3" />
                </div>
              </div>

              <div className="flex items-center gap-2 mt-1">
                <MapPin className="w-4 h-4 text-indigo-500 shrink-0" />
                <p className="text-xs font-semibold text-[#374151] uppercase tracking-wide">Physical Address</p>
              </div>

              <div>
                <label className={labelClass}>Address Line 1 *</label>
                <input type="text" value={form.addressLine1} onChange={(e) => set("addressLine1", e.target.value)}
                  placeholder="123 Main Street" required className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Address Line 2</label>
                <input type="text" value={form.addressLine2} onChange={(e) => set("addressLine2", e.target.value)}
                  placeholder="Suite 400 (optional)" className={inputClass} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelClass}>City *</label>
                  <input type="text" value={form.city} onChange={(e) => set("city", e.target.value)}
                    placeholder="New York" required className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>State / Region</label>
                  <input type="text" value={form.state} onChange={(e) => set("state", e.target.value)}
                    placeholder="NY" className={inputClass} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelClass}>Postal Code *</label>
                  <input type="text" value={form.postalCode} onChange={(e) => set("postalCode", e.target.value)}
                    placeholder="10001" required className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Country *</label>
                  <input type="text" value={form.country} onChange={(e) => set("country", e.target.value)}
                    placeholder="United States" required className={inputClass} />
                </div>
              </div>
            </div>
          )}

          {/* ── Step 2: Business Profile ── */}
          {step === 2 && (
            <div className="space-y-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center">
                  <Users className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                  <p className="font-bold text-[#111827]">Business Profile</p>
                  <p className="text-xs text-[#6B7280]">Helps us configure the right sending limits</p>
                </div>
              </div>

              <div>
                <label className={labelClass}>Team Size *</label>
                <OptionGrid options={TEAM_SIZES} value={form.teamSize} onChange={(v) => set("teamSize", v)} />
              </div>
              <div>
                <label className={labelClass}>Contact List Size *</label>
                <OptionGrid options={CONTACT_RANGES} value={form.contactRange} onChange={(v) => set("contactRange", v)} />
              </div>
              <div>
                <label className={labelClass}>Do you sell online? *</label>
                <div className="grid grid-cols-2 gap-3">
                  {[{ label: "Yes, I sell online", value: true }, { label: "No, I don't", value: false }].map((o) => (
                    <button key={String(o.value)} type="button" onClick={() => set("sellsOnline", o.value)}
                      className={`py-2.5 px-3 rounded-xl text-sm font-medium border transition-all ${
                        form.sellsOnline === o.value
                          ? "bg-indigo-600 text-white border-indigo-600"
                          : "bg-gray-50 text-[#374151] border-gray-200 hover:border-indigo-300"
                      }`}>
                      {o.label}
                    </button>
                  ))}
                </div>
              </div>

              <label className="flex items-start gap-3 cursor-pointer mt-2">
                <input type="checkbox" checked={form.marketingOptIn}
                  onChange={(e) => set("marketingOptIn", e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                <div>
                  <p className="text-sm font-medium text-[#111827]">Marketing updates</p>
                  <p className="text-xs text-[#6B7280]">Tips on email deliverability, new features, and product updates.</p>
                </div>
              </label>

              {/* Plan summary */}
              <div className="rounded-xl bg-gradient-to-br from-indigo-50 to-violet-50 border border-indigo-100 p-4">
                <p className="text-xs font-bold text-indigo-700 uppercase tracking-wide mb-2">Your Plan</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-[#111827]">Free Plan</span>
                  <span className="text-xs bg-indigo-600 text-white px-2.5 py-0.5 rounded-full font-semibold">
                    100 emails/month
                  </span>
                </div>
                <p className="text-xs text-indigo-600 mt-1">No credit card required · Start immediately</p>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8 pt-5 border-t border-gray-100">
            {step > 0 ? (
              <button type="button" onClick={() => setStep((s) => (s - 1) as Step)}
                className="flex items-center gap-2 text-sm text-[#6B7280] hover:text-[#111827] transition">
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
            ) : (
              <div />
            )}

            {step < 2 ? (
              <button type="button" onClick={() => setStep((s) => (s + 1) as Step)}
                disabled={!canAdvance()}
                className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white text-sm font-semibold rounded-xl transition-colors">
                Continue <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button type="button" onClick={handleSubmit} disabled={loading || !canAdvance()}
                className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white text-sm font-semibold rounded-xl transition-colors">
                {loading ? (
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                ) : (
                  <><ArrowRight className="w-4 h-4" /> Create Account</>
                )}
              </button>
            )}
          </div>
        </div>

        <p className="text-center text-xs text-[#6B7280] mt-4">
          Already have an account?{" "}
          <Link href="/login" className="text-indigo-600 font-semibold hover:underline">Sign In</Link>
        </p>
        <p className="text-center text-xs text-gray-400 mt-1">
          By registering you agree to our{" "}
          <Link href="/terms" className="underline">Terms</Link> &{" "}
          <Link href="/privacy" className="underline">Privacy Policy</Link>
        </p>
      </div>
    </div>
  );
}
