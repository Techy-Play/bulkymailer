"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Loader2, Send } from "lucide-react";

interface OptionItem { id: string; name: string; count?: number; category?: string; }

export default function EditCampaignPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [sending, setSending] = useState(false);
  
  const [subject, setSubject] = useState("");
  const [templateId, setTemplateId] = useState("");
  const [listId, setListId] = useState("");
  const [status, setStatus] = useState("DRAFT");
  
  const [templates, setTemplates] = useState<OptionItem[]>([]);
  const [lists, setLists] = useState<OptionItem[]>([]);
  
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([
      fetch(`/api/campaigns/${params.id}`).then(r => r.json()),
      fetch("/api/templates").then(r => r.json()),
      fetch("/api/contacts/lists").then(r => r.json())
    ]).then(([cData, tData, lData]) => {
      if (cData.campaign) {
        setSubject(cData.campaign.subject);
        setTemplateId(cData.campaign.templateId || "");
        setListId(cData.campaign.contactListId || "");
        setStatus(cData.campaign.status);
      }
      if (tData.templates) setTemplates(tData.templates);
      if (lData.lists) setLists(lData.lists);
      setLoading(false);
    });
  }, [params.id]);

  async function handleSave() {
    if (!subject || !templateId || !listId) {
      setError("Please fill out all required fields.");
      return;
    }
    setSaving(true);
    setError("");
    
    try {
      const res = await fetch(`/api/campaigns/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subject, templateId, contactListId: listId })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update campaign");
      
      router.push("/dashboard/campaigns");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  async function handleSend() {
    if (!subject || !templateId || !listId) {
      setError("Please fill out all required fields.");
      return;
    }
    setSending(true);
    setError("");
    
    try {
      // Save first
      await fetch(`/api/campaigns/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subject, templateId, contactListId: listId })
      });
      
      // Then send
      const resSend = await fetch(`/api/campaigns/${params.id}/send`, { method: "POST" });
      const dataSend = await resSend.json();
      if (!resSend.ok) throw new Error(dataSend.error || "Failed to send campaign");
      
      router.push("/dashboard/campaigns");
    } catch (err: any) {
      setError(err.message);
      setSending(false);
    }
  }

  if (loading) return <div className="p-12 text-center text-gray-500 text-sm flex items-center justify-center gap-2"><Loader2 className="w-4 h-4 animate-spin text-indigo-500" /> Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/campaigns" className="p-2 bg-white border border-gray-200 rounded-xl text-gray-500 hover:text-gray-900 transition shadow-sm">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">Edit Campaign</h1>
          <p className="text-sm text-gray-500 mt-1">Update details for your draft campaign</p>
        </div>
      </div>
      
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 space-y-6">
        {error && <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl">{error}</div>}
        
        {status !== "DRAFT" && (
          <div className="p-4 bg-amber-50 border border-amber-200 text-amber-800 text-sm rounded-xl mb-6">
            <strong>Note:</strong> This campaign is not in DRAFT status (Status: {status}). Editing might not affect active sending.
          </div>
        )}

        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Subject Line *</label>
          <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} 
            placeholder="e.g. Huge Summer Sale is Here!"
            className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-sm focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-400 focus:outline-none transition" />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Select Template *</label>
          <select value={templateId} onChange={(e) => setTemplateId(e.target.value)}
            className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-sm focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-400 focus:outline-none transition">
            <option value="" disabled>-- Select a Template --</option>
            {templates.map(t => (
              <option key={t.id} value={t.id}>{t.name} {t.category ? `(${t.category})` : ""}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Select Audience *</label>
          <select value={listId} onChange={(e) => setListId(e.target.value)}
            className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-sm focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-400 focus:outline-none transition">
            <option value="" disabled>-- Select a Contact List --</option>
            {lists.map(l => (
              <option key={l.id} value={l.id}>{l.name} ({l.count || 0} contacts)</option>
            ))}
          </select>
        </div>

        <div className="pt-4 flex justify-between border-t border-gray-100">
          <Link href="/dashboard/campaigns" className="text-sm text-gray-500 hover:text-gray-900 font-semibold px-4 py-2.5">Cancel</Link>
          <div className="flex items-center gap-3">
            <button onClick={handleSave} disabled={saving || sending}
              className="flex items-center gap-2 px-6 py-2.5 border border-gray-200 text-gray-700 hover:bg-gray-50 disabled:opacity-50 text-sm font-semibold rounded-xl transition shadow-sm">
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              Save Draft
            </button>
            <button onClick={handleSend} disabled={saving || sending}
              className="flex items-center gap-2 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-sm font-bold rounded-xl transition shadow-sm">
              {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              {sending ? "Queuing..." : "Send Now"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
