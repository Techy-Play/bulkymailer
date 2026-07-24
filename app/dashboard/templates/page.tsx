"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FileText, Plus, Search, MoreVertical, Edit, Trash, Eye } from "lucide-react";
import { useRouter } from "next/navigation";

interface Template {
  id: string;
  name: string;
  category: string;
  userId: string | null;
  createdAt: string;
}

export default function TemplatesPage() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"ALL" | "SYSTEM" | "CUSTOM">("ALL");
  const [search, setSearch] = useState("");
  const router = useRouter();

  useEffect(() => {
    fetch("/api/templates")
      .then((res) => res.json())
      .then((data) => {
        if (data.templates) setTemplates(data.templates);
        setLoading(false);
      });
  }, []);

  async function createCustom() {
    const res = await fetch("/api/templates", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "New Custom Template",
        category: "GENERAL",
        htmlContent: "<html>\n  <body>\n    <h1>Hello {{firstName}}!</h1>\n  </body>\n</html>"
      })
    });
    const data = await res.json();
    if (data.template) {
      router.push(`/dashboard/templates/edit/${data.template.id}`);
    }
  }

  async function deleteTemplate(id: string) {
    if (!confirm("Are you sure you want to delete this template?")) return;
    await fetch(`/api/templates/${id}`, { method: "DELETE" });
    setTemplates(templates.filter(t => t.id !== id));
  }

  const filtered = templates.filter(t => {
    if (activeTab === "SYSTEM" && t.userId !== null) return false;
    if (activeTab === "CUSTOM" && t.userId === null) return false;
    if (search && !t.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white">Templates</h1>
          <p className="text-sm text-slate-400 mt-1">Manage email designs for your campaigns</p>
        </div>
        <button onClick={createCustom}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-xl transition">
          <Plus className="w-4 h-4" /> Create Custom
        </button>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex bg-slate-800 p-1 rounded-lg">
            {(["ALL", "SYSTEM", "CUSTOM"] as const).map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className={`px-4 py-1.5 rounded-md text-xs font-semibold transition ${
                  activeTab === tab ? "bg-slate-700 text-white shadow" : "text-slate-400 hover:text-slate-200"
                }`}>
                {tab === "ALL" ? "All" : tab === "SYSTEM" ? "System" : "My Templates"}
              </button>
            ))}
          </div>
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input type="text" placeholder="Search templates..." value={search} onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white focus:outline-none focus:border-indigo-500 transition" />
          </div>
        </div>

        {loading ? (
          <div className="py-12 text-center text-slate-500 text-sm">Loading templates...</div>
        ) : filtered.length === 0 ? (
          <div className="py-12 flex flex-col items-center justify-center text-slate-500 bg-slate-950/50 rounded-xl border border-dashed border-slate-800">
            <FileText className="w-8 h-8 mb-3 opacity-50" />
            <p className="text-sm font-medium text-slate-400">No templates found</p>
            <p className="text-xs mt-1">Try adjusting your filters or create a new one.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map(t => (
              <div key={t.id} className="bg-slate-950 border border-slate-800 rounded-xl p-4 group hover:border-slate-700 transition">
                <div className="aspect-video bg-slate-900 rounded-lg border border-slate-800 mb-4 flex items-center justify-center relative overflow-hidden">
                  <FileText className="w-8 h-8 text-slate-700" />
                  <div className="absolute inset-0 bg-slate-900/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity gap-2">
                    <Link href={`/dashboard/templates/edit/${t.id}`}
                      className="p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition">
                      <Edit className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-white truncate">{t.name}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{t.category} • {t.userId ? "Custom" : "System"}</p>
                  </div>
                  {t.userId !== null && (
                    <button onClick={() => deleteTemplate(t.id)} className="text-slate-500 hover:text-red-400 p-1">
                      <Trash className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
