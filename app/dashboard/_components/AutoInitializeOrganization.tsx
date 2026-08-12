"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function AutoInitializeOrganization({ organizationId }: { organizationId: string }) {
  const router = useRouter();
  const initializing = useRef(false);

  useEffect(() => {
    if (initializing.current) return;
    initializing.current = true;

    fetch("/api/organizations/switch", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ organizationId }),
    })
      .then((res) => {
        if (res.ok) {
          router.refresh();
        } else {
          console.error("Failed to auto-initialize organization");
        }
      })
      .catch((err) => console.error(err));
  }, [organizationId, router]);

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-50 flex-col space-y-4">
      <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      <p className="text-gray-600 font-medium">Initializing your workspace...</p>
    </div>
  );
}
