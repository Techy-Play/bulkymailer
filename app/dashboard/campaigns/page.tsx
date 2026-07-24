"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Send, Plus, Search, CheckCircle2, Clock, XCircle, PlayCircle, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface Campaign {
  id: string;
  subject: string;
  status: string;
  totalRecipients: number;
  successfulRecipients: number;
  createdAt: string;
  template: { name: string } | null;
  contactList: { name: string } | null;
}

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const router = useRouter();

  useEffect(() => {
    fetch("/api/campaigns")
      .then((res) => res.json())
      .then((data) => {
        if (data.campaigns) setCampaigns(data.campaigns);
        setLoading(false);
      });
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "SENT": return <CheckCircle2 className="w-4 h-4 text-emerald-500" />;
      case "SENDING": return <Loader2 className="w-4 h-4 text-indigo-500 animate-spin" />;
      case "QUEUED": return <Clock className="w-4 h-4 text-amber-500" />;
      case "FAILED": return <XCircle className="w-4 h-4 text-red-500" />;
      default: return <PlayCircle className="w-4 h-4 text-slate-500" />;
    }
  };

  const filtered = campaigns.filter(c => 
    c.subject.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white">Campaigns</h1>
          <p className="text-sm text-slate-400 mt-1">Create, manage, and track your email broadcasts</p>
        </div>
        <Link href="/dashboard/campaigns/new"
          className="flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-xl transition">
          <Plus className="w-4 h-4" /> New Campaign
        </Link>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5">
        <div className="mb-6 relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input type="text" placeholder="Search campaigns..." value={search} onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white focus:outline-none focus:border-indigo-500 transition" />
        </div>

        {loading ? (
          <div className="py-12 text-center text-slate-500 text-sm">Loading campaigns...</div>
        ) : filtered.length === 0 ? (
          <div className="py-12 flex flex-col items-center justify-center text-slate-500 bg-slate-950/50 rounded-xl border border-dashed border-slate-800">
            <Send className="w-8 h-8 mb-3 opacity-50" />
            <p className="text-sm font-medium text-slate-400">No campaigns yet</p>
            <p className="text-xs mt-1">Start by creating a new email campaign.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="text-xs text-slate-500 uppercase font-semibold border-b border-slate-800">
                <tr>
                  <th className="px-4 py-3 font-medium">Campaign</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">List</th>
                  <th className="px-4 py-3 font-medium">Template</th>
                  <th className="px-4 py-3 font-medium">Sent</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                {filtered.map(c => (
                  <tr key={c.id} className="hover:bg-slate-800/30 transition group">
                    <td className="px-4 py-4">
                      <p className="font-bold text-white">{c.subject}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{new Date(c.createdAt).toLocaleDateString()}</p>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-1.5">
                        {getStatusIcon(c.status)}
                        <span className="text-slate-300 capitalize font-medium">{c.status.toLowerCase()}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-slate-400">{c.contactList?.name || "Deleted List"}</td>
                    <td className="px-4 py-4 text-slate-400">{c.template?.name || "Custom/Deleted"}</td>
                    <td className="px-4 py-4 text-slate-400">
                      {c.status === "SENT" ? `${c.successfulRecipients} / ${c.totalRecipients}` : "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
