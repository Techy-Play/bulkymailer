"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FileText, Plus, Search, Edit, Trash, Eye, X } from "lucide-react";
import { useRouter } from "next/navigation";

interface Template {
  id: string;
  name: string;
  category: string;
  userId: string | null;
  createdAt: string;
  htmlContent: string;
}

function PreviewModal({ template, onClose }: { template: Template; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#1a1a2e] border border-slate-700 rounded-2xl w-full max-w-4xl shadow-2xl flex flex-col h-[85vh]">
        <div className="flex items-center justify-between p-5 border-b border-slate-700">
          <div>
            <h2 className="font-bold text-white">{template.name}</h2>
            <p className="text-xs text-slate-400">{template.category} Template</p>
          </div>
          <div className="flex items-center gap-3">
            {template.userId !== null && (
              <Link href={`/dashboard/templates/edit/${template.id}`}
                className="flex items-center gap-2 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg transition">
                <Edit className="w-3.5 h-3.5" /> Edit
              </Link>
            )}
            <button onClick={onClose} className="text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
          </div>
        </div>
        <div className="flex-1 bg-white rounded-b-2xl overflow-hidden p-0 m-4 shadow-inner">
          <iframe 
            srcDoc={template.htmlContent} 
            className="w-full h-full border-0" 
            title="Template Preview"
          />
        </div>
      </div>
    </div>
  );
}

function CreateModal({ onClose, onSuccess }: { onClose: () => void, onSuccess: (t: Template) => void }) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("GENERAL");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("/api/templates", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        category,
        htmlContent: "<html>\n  <head>\n    <style>body { font-family: sans-serif; padding: 20px; }</style>\n  </head>\n  <body>\n    <h1>Hello {{firstName}}!</h1>\n    <p>Start editing your beautiful template here.</p>\n  </body>\n</html>"
      })
    });
    const data = await res.json();
    setLoading(false);
    if (data.template) {
      onSuccess(data.template);
      router.push(`/dashboard/templates/edit/${data.template.id}`);
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#1a1a2e] border border-slate-700 rounded-2xl w-full max-w-md shadow-2xl">
        <div className="flex items-center justify-between p-5 border-b border-slate-700">
          <h2 className="font-bold text-white">Create New Template</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
        </div>
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1.5">Template Name *</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required autoFocus
              placeholder="e.g. Summer Promo"
              className="w-full px-3 py-2.5 bg-slate-800 border border-slate-600 rounded-xl text-white text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none placeholder:text-slate-500" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1.5">Category</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2.5 bg-slate-800 border border-slate-600 rounded-xl text-white text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none">
              <option value="GENERAL">General</option>
              <option value="NEWSLETTER">Newsletter</option>
              <option value="PROMOTIONAL">Promotional</option>
              <option value="TRANSACTIONAL">Transactional</option>
              <option value="PERSONALIZED">Personalized</option>
            </select>
          </div>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose}
              className="flex-1 py-2.5 border border-slate-600 text-slate-300 text-sm font-semibold rounded-xl hover:bg-slate-800 transition">
              Cancel
            </button>
            <button type="submit" disabled={loading || !name.trim()}
              className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white text-sm font-semibold rounded-xl transition">
              {loading ? "Creating..." : "Create & Edit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function TemplatesPage() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"ALL" | "SYSTEM" | "CUSTOM">("ALL");
  const [search, setSearch] = useState("");
  
  const [previewTemplate, setPreviewTemplate] = useState<Template | null>(null);
  const [showCreate, setShowCreate] = useState(false);

  useEffect(() => {
    fetch("/api/templates")
      .then((res) => res.json())
      .then((data) => {
        if (data.templates) setTemplates(data.templates);
        setLoading(false);
      });
  }, []);

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
        <button onClick={() => setShowCreate(true)}
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
              <div key={t.id} className="bg-slate-950 border border-slate-800 rounded-xl p-4 group hover:border-slate-700 transition flex flex-col">
                <div className="aspect-video bg-slate-900 rounded-lg border border-slate-800 mb-4 flex items-center justify-center relative overflow-hidden group-hover:border-indigo-500/50 transition-colors">
                  <FileText className="w-8 h-8 text-slate-700 group-hover:scale-110 transition-transform" />
                  <div className="absolute inset-0 bg-slate-900/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity gap-2 backdrop-blur-sm">
                    <button onClick={() => setPreviewTemplate(t)}
                      className="p-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition tooltip" title="Preview">
                      <Eye className="w-4 h-4" />
                    </button>
                    {t.userId !== null && (
                      <Link href={`/dashboard/templates/edit/${t.id}`}
                        className="p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition tooltip" title="Edit">
                        <Edit className="w-4 h-4" />
                      </Link>
                    )}
                  </div>
                </div>
                <div className="flex items-start justify-between gap-2 mt-auto">
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

      {showCreate && (
        <CreateModal 
          onClose={() => setShowCreate(false)} 
          onSuccess={(t) => setTemplates([t, ...templates])} 
        />
      )}

      {previewTemplate && (
        <PreviewModal 
          template={previewTemplate} 
          onClose={() => setPreviewTemplate(null)} 
        />
      )}
    </div>
  );
}
