import Link from "next/link";
import { ArrowLeft, Mail } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAFA] items-center justify-center text-center px-4">
      <div className="w-14 h-14 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 mb-4">
        <Mail className="w-7 h-7" />
      </div>
      <h1 className="text-6xl sm:text-7xl font-extrabold text-[#111827] tracking-tighter">404</h1>
      <h2 className="mt-3 text-2xl font-bold text-[#111827]">Page Not Found</h2>
      <p className="mt-2 text-sm text-[#6B7280] max-w-md">
        The email campaign or page you are looking for has been moved, deleted, or does not exist.
      </p>

      <div className="mt-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#111827] hover:bg-black text-white font-semibold rounded-xl text-xs transition-colors shadow-xs"
        >
          <ArrowLeft className="w-4 h-4" /> Return to Homepage
        </Link>
      </div>
    </div>
  );
}
