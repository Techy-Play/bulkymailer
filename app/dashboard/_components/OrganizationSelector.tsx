"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Building, ArrowRight, Loader2 } from "lucide-react";

type Membership = {
  organizationId: string;
  organization: {
    name: string;
  };
  role: string;
};

export default function OrganizationSelector({ memberships }: { memberships: Membership[] }) {
  const router = useRouter();
  const [loadingId, setLoadingId] = useState<string | null>(null);

  async function handleSelect(orgId: string) {
    setLoadingId(orgId);
    try {
      const res = await fetch("/api/organizations/switch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ organizationId: orgId }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to switch organization");
      }

      router.refresh();
    } catch (err: any) {
      toast.error(err.message);
      setLoadingId(null);
    }
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600 mb-4">
          <Building className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Select Organization</h1>
        <p className="text-gray-500 mt-2">Choose an organization to continue</p>
      </div>

      <div className="space-y-3">
        {memberships.map((m) => (
          <button
            key={m.organizationId}
            onClick={() => handleSelect(m.organizationId)}
            disabled={loadingId !== null}
            className="w-full flex items-center justify-between p-4 bg-white border border-gray-200 rounded-xl hover:border-blue-500 hover:shadow-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
          >
            <div className="flex flex-col items-start">
              <span className="font-semibold text-gray-900">{m.organization.name}</span>
              <span className="text-sm text-gray-500">{m.role.replace("_", " ")}</span>
            </div>
            
            {loadingId === m.organizationId ? (
              <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />
            ) : (
              <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
