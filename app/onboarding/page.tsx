"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Building2,
  Globe,
  MapPin,
  Users,
  Mail,
  Phone,
  ChevronRight,
  CheckCircle2,
  ArrowLeft,
} from "lucide-react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type TeamSize =
  | "SOLO"
  | "TWO_TO_FIVE"
  | "SIX_TO_TEN"
  | "ELEVEN_TO_FIFTY"
  | "FIFTY_PLUS";

type ContactRange =
  | "LESS_THAN_1000"
  | "FROM_1K_TO_5K"
  | "FROM_5K_TO_20K"
  | "FROM_20K_TO_50K"
  | "ABOVE_50K";

interface FormData {
  companyName: string;
  website: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  teamSize: TeamSize | "";
  contactRange: ContactRange | "";
  sellsOnline: boolean | null;
  phoneNumber: string;
  marketingOptIn: boolean;
}

// ---------------------------------------------------------------------------
// Option sets
// ---------------------------------------------------------------------------

const TEAM_SIZES: { value: TeamSize; label: string }[] = [
  { value: "SOLO", label: "Just me" },
  { value: "TWO_TO_FIVE", label: "2–5" },
  { value: "SIX_TO_TEN", label: "6–10" },
  { value: "ELEVEN_TO_FIFTY", label: "11–50" },
  { value: "FIFTY_PLUS", label: "50+" },
];

const CONTACT_RANGES: { value: ContactRange; label: string }[] = [
  { value: "LESS_THAN_1000", label: "< 1,000" },
  { value: "FROM_1K_TO_5K", label: "1K – 5K" },
  { value: "FROM_5K_TO_20K", label: "5K – 20K" },
  { value: "FROM_20K_TO_50K", label: "20K – 50K" },
  { value: "ABOVE_50K", label: "50K+" },
];

const STEPS = ["Company", "Address", "Audience", "Finish"];

// ---------------------------------------------------------------------------
// Input component
// ---------------------------------------------------------------------------

function Field({
  label,
  required = false,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-xs font-semibold text-[#374151] uppercase tracking-wide mb-1.5">
        {label} {required && <span className="text-red-400 normal-case font-normal">*</span>}
      </label>
      {children}
    </div>
  );
}

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-[#111827] text-sm focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-400 focus:outline-none transition placeholder:text-gray-400"
    />
  );
}

function OptionGrid<T extends string>({
  options,
  value,
  onChange,
}: {
  options: { value: T; label: string }[];
  value: T | "";
  onChange: (v: T) => void;
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
              ? "bg-[#111827] text-white border-[#111827] shadow-sm"
              : "bg-gray-50 text-[#374151] border-gray-200 hover:border-gray-400"
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState<FormData>({
    companyName: "",
    website: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    teamSize: "",
    contactRange: "",
    sellsOnline: null,
    phoneNumber: "",
    marketingOptIn: true,
  });

  const set = (field: keyof FormData, value: unknown) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  // ─────────────────────────────────────────────────────────
  // Step validation
  // ─────────────────────────────────────────────────────────
  function canAdvance(): boolean {
    if (step === 0) return !!form.companyName.trim();
    if (step === 1)
      return (
        !!form.addressLine1.trim() &&
        !!form.city.trim() &&
        !!form.postalCode.trim() &&
        !!form.country.trim()
      );
    if (step === 2)
      return !!form.teamSize && !!form.contactRange && form.sellsOnline !== null;
    return true;
  }

  // ─────────────────────────────────────────────────────────
  // Submit
  // ─────────────────────────────────────────────────────────
  async function handleSubmit() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/auth/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Something went wrong.");
        return;
      }

      router.push("/dashboard");
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  // ─────────────────────────────────────────────────────────
  // Render
  // ─────────────────────────────────────────────────────────
  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAFA] items-center justify-center py-16 px-4">
      <div className="w-full max-w-lg">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-[#111827] flex items-center justify-center">
              <Mail className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-[#111827] text-lg">BulkyMailer</span>
          </div>
          <h1 className="text-2xl font-bold text-[#111827]">Set up your organization</h1>
          <p className="text-sm text-[#6B7280] mt-1">
            Required for email compliance · Takes about 2 minutes
          </p>
        </div>

        {/* Step indicator */}
        <div className="flex items-center justify-between mb-6 px-2">
          {STEPS.map((label, i) => (
            <div key={label} className="flex items-center gap-2">
              <div className="flex flex-col items-center gap-1">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all ${
                    i < step
                      ? "bg-emerald-500 border-emerald-500 text-white"
                      : i === step
                      ? "bg-[#111827] border-[#111827] text-white"
                      : "bg-white border-gray-200 text-gray-400"
                  }`}
                >
                  {i < step ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
                </div>
                <span
                  className={`text-xs font-medium hidden sm:block ${
                    i === step ? "text-[#111827]" : "text-gray-400"
                  }`}
                >
                  {label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div
                  className={`flex-1 h-0.5 w-8 sm:w-16 mx-1 rounded ${
                    i < step ? "bg-emerald-500" : "bg-gray-200"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Card */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8">
          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-100 text-sm text-red-700">
              {error}
            </div>
          )}

          {/* ── Step 0: Company ── */}
          {step === 0 && (
            <div className="space-y-5">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                  <h2 className="font-bold text-[#111827]">Company details</h2>
                  <p className="text-xs text-[#6B7280]">Required for CAN-SPAM sender identification</p>
                </div>
              </div>

              <Field label="Company Name" required>
                <Input
                  value={form.companyName}
                  onChange={(e) => set("companyName", e.target.value)}
                  placeholder="Acme Inc."
                />
              </Field>

              <Field label="Website (optional)">
                <div className="relative">
                  <Input
                    value={form.website}
                    onChange={(e) => set("website", e.target.value)}
                    placeholder="mycompany.com"
                  />
                  <Globe className="w-3.5 h-3.5 text-gray-400 absolute right-3 top-3" />
                </div>
                <p className="mt-1 text-xs text-gray-400">
                  We'll normalize the URL — just enter the domain.
                </p>
              </Field>
            </div>
          )}

          {/* ── Step 1: Address ── */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                  <h2 className="font-bold text-[#111827]">Physical address</h2>
                  <p className="text-xs text-[#6B7280]">Required by CAN-SPAM — shown in email footers</p>
                </div>
              </div>

              <Field label="Address Line 1" required>
                <Input
                  value={form.addressLine1}
                  onChange={(e) => set("addressLine1", e.target.value)}
                  placeholder="123 Main Street"
                />
              </Field>

              <Field label="Address Line 2">
                <Input
                  value={form.addressLine2}
                  onChange={(e) => set("addressLine2", e.target.value)}
                  placeholder="Suite 400 (optional)"
                />
              </Field>

              <div className="grid grid-cols-2 gap-3">
                <Field label="City" required>
                  <Input
                    value={form.city}
                    onChange={(e) => set("city", e.target.value)}
                    placeholder="New York"
                  />
                </Field>
                <Field label="State / Region">
                  <Input
                    value={form.state}
                    onChange={(e) => set("state", e.target.value)}
                    placeholder="NY"
                  />
                </Field>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Field label="Postal Code" required>
                  <Input
                    value={form.postalCode}
                    onChange={(e) => set("postalCode", e.target.value)}
                    placeholder="10001"
                  />
                </Field>
                <Field label="Country" required>
                  <Input
                    value={form.country}
                    onChange={(e) => set("country", e.target.value)}
                    placeholder="United States"
                  />
                </Field>
              </div>
            </div>
          )}

          {/* ── Step 2: Audience ── */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center">
                  <Users className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                  <h2 className="font-bold text-[#111827]">Tell us about your audience</h2>
                  <p className="text-xs text-[#6B7280]">Helps us configure the right sending limits</p>
                </div>
              </div>

              <Field label="Team Size" required>
                <OptionGrid<TeamSize>
                  options={TEAM_SIZES}
                  value={form.teamSize}
                  onChange={(v) => set("teamSize", v)}
                />
              </Field>

              <Field label="Contact List Size" required>
                <OptionGrid<ContactRange>
                  options={CONTACT_RANGES}
                  value={form.contactRange}
                  onChange={(v) => set("contactRange", v)}
                />
              </Field>

              <Field label="Do you sell products or services online?" required>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: "Yes, I sell online", value: true },
                    { label: "No, I don't", value: false },
                  ].map((o) => (
                    <button
                      key={String(o.value)}
                      type="button"
                      onClick={() => set("sellsOnline", o.value)}
                      className={`py-2.5 px-3 rounded-xl text-sm font-medium border transition-all ${
                        form.sellsOnline === o.value
                          ? "bg-[#111827] text-white border-[#111827]"
                          : "bg-gray-50 text-[#374151] border-gray-200 hover:border-gray-400"
                      }`}
                    >
                      {o.label}
                    </button>
                  ))}
                </div>
              </Field>
            </div>
          )}

          {/* ── Step 3: Finish ── */}
          {step === 3 && (
            <div className="space-y-5">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <h2 className="font-bold text-[#111827]">Almost done!</h2>
                  <p className="text-xs text-[#6B7280]">A couple of final optional settings</p>
                </div>
              </div>

              <Field label="Phone Number (optional)">
                <div className="relative">
                  <Input
                    type="tel"
                    value={form.phoneNumber}
                    onChange={(e) => set("phoneNumber", e.target.value)}
                    placeholder="+1 555 000 0000"
                  />
                  <Phone className="w-3.5 h-3.5 text-gray-400 absolute right-3 top-3" />
                </div>
                <p className="mt-1 text-xs text-gray-400">Used for 2FA in a future update.</p>
              </Field>

              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.marketingOptIn}
                  onChange={(e) => set("marketingOptIn", e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <div>
                  <p className="text-sm font-medium text-[#111827]">
                    Marketing emails opt-in
                  </p>
                  <p className="text-xs text-[#6B7280]">
                    Receive tips on email deliverability, new features, and product updates.
                  </p>
                </div>
              </label>

              {/* Summary card */}
              <div className="rounded-xl bg-gray-50 border border-gray-200 p-4 text-xs space-y-1.5">
                <p className="font-semibold text-[#111827] mb-2">Your setup summary</p>
                <p className="text-[#6B7280]">
                  <span className="font-medium text-[#374151]">Company:</span>{" "}
                  {form.companyName}
                </p>
                <p className="text-[#6B7280]">
                  <span className="font-medium text-[#374151]">Address:</span>{" "}
                  {form.addressLine1}, {form.city}, {form.country}
                </p>
                <p className="text-[#6B7280]">
                  <span className="font-medium text-[#374151]">Team:</span>{" "}
                  {TEAM_SIZES.find((t) => t.value === form.teamSize)?.label}
                </p>
                <p className="text-[#6B7280]">
                  <span className="font-medium text-[#374151]">Contacts:</span>{" "}
                  {CONTACT_RANGES.find((t) => t.value === form.contactRange)?.label}
                </p>
              </div>
            </div>
          )}

          {/* Navigation buttons */}
          <div className="flex items-center justify-between mt-8 pt-5 border-t border-gray-100">
            {step > 0 ? (
              <button
                type="button"
                onClick={() => setStep((s) => s - 1)}
                className="flex items-center gap-2 text-sm text-[#6B7280] hover:text-[#111827] transition"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
            ) : (
              <div />
            )}

            {step < STEPS.length - 1 ? (
              <button
                type="button"
                onClick={() => setStep((s) => s + 1)}
                disabled={!canAdvance()}
                className="flex items-center gap-2 px-5 py-2.5 bg-[#111827] hover:bg-black disabled:opacity-40 text-white text-sm font-semibold rounded-xl transition-colors"
              >
                Continue <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading}
                className="flex items-center gap-2 px-5 py-2.5 bg-[#111827] hover:bg-black disabled:opacity-60 text-white text-sm font-semibold rounded-xl transition-colors"
              >
                {loading ? (
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                ) : (
                  <>
                    Complete Setup <CheckCircle2 className="w-4 h-4" />
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        <p className="text-center text-xs text-gray-400 mt-4">
          Your physical address is required by{" "}
          <a
            href="https://www.ftc.gov/tips-advice/business-center/guidance/can-spam-act-compliance-guide-business"
            target="_blank"
            rel="noreferrer"
            className="underline"
          >
            CAN-SPAM Act
          </a>{" "}
          and{" "}
          <a
            href="https://gdpr-info.eu/"
            target="_blank"
            rel="noreferrer"
            className="underline"
          >
            GDPR
          </a>
          .
        </p>
      </div>
    </div>
  );
}
