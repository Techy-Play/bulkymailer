"use client";

import Link from "next/link";
import { CheckCircle2, MailX } from "lucide-react";

export default function UnsubscribePage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center p-4">
      <div className="bg-white border border-gray-200 rounded-2xl p-8 max-w-md w-full shadow-sm text-center space-y-4">
        <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-2">
          <MailX className="w-7 h-7" />
        </div>
        <h1 className="text-xl font-bold text-[#111827]">Unsubscribed Successfully</h1>
        <p className="text-sm text-[#6B7280]">
          You have been removed from this mailing list and will no longer receive marketing emails from this sender.
        </p>
        <div className="pt-4 border-t border-gray-100">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-[#111827] text-xs font-semibold rounded-xl transition"
          >
            Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
