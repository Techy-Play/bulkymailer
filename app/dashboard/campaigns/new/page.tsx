"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ChevronRight, CheckCircle2, PlayCircle, Send, RefreshCw, Mail } from "lucide-react";

interface OptionItem { id: string; name: string; count?: number; category?: string; }

export default function NewCampaignWizard() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(true);
  
  const [subject, setSubject] = useState("");
  const [templates, setTemplates] = useState<OptionItem[]>([]);
  const [templateId, setTemplateId] = useState("");
  const [lists, setLists] = useState<OptionItem[]>([]);
  const [listId, setListId] = useState("");
  
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([
      fetch("/api/templates").then(r => r.json()),
      fetch("/api/contacts/lists").then(r => r.json())
    ]).then(([tData, lData]) => {
      if (tData.templates) setTemplates(tData.templates);
      if (lData.lists) setLists(lData.lists);
      setLoading(false);
    });
  }, []);

  async function createAndSend() {
    if (!subject || !templateId || !listId) {
      setError("Please fill out all required fields.");
      return;
    }
    setSending(true);
    setError("");
    
    try {
      // 1. Create Draft
      const resCreate = await fetch("/api/campaigns", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subject, templateId, contactListId: listId })
      });
      const dataCreate = await resCreate.json();
      if (!resCreate.ok) throw new Error(dataCreate.error || "Failed to create campaign");
      
      const campaignId = dataCreate.campaign.id;
      
      // 2. Trigger Send
      const resSend = await fetch(`/api/campaigns/${campaignId}/send`, { method: "POST" });
      const dataSend = await resSend.json();
      if (!resSend.ok) throw new Error(dataSend.error || "Failed to send campaign");
      
      router.push("/dashboard/campaigns");
    } catch (err: any) {
      setError(err.message);
      setSending(false);
    }
  }

  if (loading) return <div className="p-12 text-center text-slate-500">Loading Wizard...</div>;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/campaigns" className="p-2 bg-slate-900 border border-slate-800 rounded-xl text-slate-400 hover:text-white transition">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-extrabold text-white">New Campaign</h1>
          <p className="text-sm text-slate-400 mt-1">Create and send a new email broadcast</p>
        </div>
      </div>
      
      {/* Stepper Progress */}
      <div className="flex items-center justify-between mb-8 text-xs font-semibold">
        {[
          { num: 1, label: "Details" },
          { num: 2, label: "Template" },
          { num: 3, label: "Audience" },
          { num: 4, label: "Review" }
        ].map((s, i) => (
          <div key={s.num} className="flex items-center gap-2">
            <div className={`w-7 h-7 rounded-full flex items-center justify-center border-2 transition-all ${
              step >= s.num ? "border-indigo-500 bg-indigo-500 text-white" : "border-slate-800 bg-slate-900 text-slate-500"
            }`}>
              {step > s.num ? <CheckCircle2 className="w-4 h-4" /> : s.num}
            </div>
            <span className={step >= s.num ? "text-slate-200" : "text-slate-500 hidden sm:inline"}>{s.label}</span>
            {i < 3 && <div className={`w-8 sm:w-16 h-px mx-2 ${step > s.num ? "bg-indigo-500" : "bg-slate-800"}`} />}
          </div>
        ))}
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        {step === 1 && (
          <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
            <h2 className="text-lg font-bold text-white mb-4">Campaign Details</h2>
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1.5">Subject Line</label>
              <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="e.g. Huge Summer Sale is Here!"
                className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-indigo-500 transition" />
            </div>
            <div className="pt-4 flex justify-end">
              <button onClick={() => setStep(2)} disabled={!subject}
                className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-sm font-semibold rounded-xl transition">
                Next <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
            <h2 className="text-lg font-bold text-white mb-4">Select Template</h2>
            {templates.length === 0 ? (
              <p className="text-sm text-slate-400">No templates found. Please create one in the Templates tab first.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {templates.map(t => (
                  <button key={t.id} onClick={() => setTemplateId(t.id)}
                    className={`flex items-start gap-4 p-4 rounded-xl border text-left transition-all ${
                      templateId === t.id ? "border-indigo-500 bg-indigo-500/10" : "border-slate-800 bg-slate-950 hover:border-slate-700"
                    }`}>
                    <div className={`p-2 rounded-lg ${templateId === t.id ? "bg-indigo-500 text-white" : "bg-slate-900 text-slate-500"}`}>
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <p className={`text-sm font-bold ${templateId === t.id ? "text-white" : "text-slate-300"}`}>{t.name}</p>
                      <p className="text-xs text-slate-500 mt-1">{t.category}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}
            <div className="pt-4 flex justify-between">
              <button onClick={() => setStep(1)} className="text-sm text-slate-400 hover:text-white font-semibold">Back</button>
              <button onClick={() => setStep(3)} disabled={!templateId}
                className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-sm font-semibold rounded-xl transition">
                Next <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
            <h2 className="text-lg font-bold text-white mb-4">Select Audience</h2>
            {lists.length === 0 ? (
              <p className="text-sm text-slate-400">No contact lists found. Import some contacts first.</p>
            ) : (
              <div className="space-y-3">
                {lists.map(l => (
                  <button key={l.id} onClick={() => setListId(l.id)}
                    className={`w-full flex items-center justify-between p-4 rounded-xl border text-left transition-all ${
                      listId === l.id ? "border-indigo-500 bg-indigo-500/10" : "border-slate-800 bg-slate-950 hover:border-slate-700"
                    }`}>
                    <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                        listId === l.id ? "border-indigo-500 bg-indigo-500" : "border-slate-600"
                      }`}>
                        {listId === l.id && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                      </div>
                      <span className={`text-sm font-bold ${listId === l.id ? "text-white" : "text-slate-300"}`}>{l.name}</span>
                    </div>
                    <span className="text-xs font-semibold px-2 py-1 bg-slate-900 rounded text-slate-400">{l.count || 0} contacts</span>
                  </button>
                ))}
              </div>
            )}
            <div className="pt-4 flex justify-between">
              <button onClick={() => setStep(2)} className="text-sm text-slate-400 hover:text-white font-semibold">Back</button>
              <button onClick={() => setStep(4)} disabled={!listId}
                className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-sm font-semibold rounded-xl transition">
                Review <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
            <h2 className="text-lg font-bold text-white mb-4">Review & Send</h2>
            {error && <div className="p-3 bg-red-900/50 border border-red-700 text-red-200 text-sm rounded-xl">{error}</div>}
            
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4">
              <div>
                <p className="text-xs text-slate-500 uppercase font-semibold">Subject</p>
                <p className="text-white font-medium mt-1">{subject}</p>
              </div>
              <div className="h-px bg-slate-800" />
              <div>
                <p className="text-xs text-slate-500 uppercase font-semibold">Template</p>
                <p className="text-white font-medium mt-1">{templates.find(t => t.id === templateId)?.name}</p>
              </div>
              <div className="h-px bg-slate-800" />
              <div>
                <p className="text-xs text-slate-500 uppercase font-semibold">Audience</p>
                <p className="text-white font-medium mt-1">
                  {lists.find(l => l.id === listId)?.name} 
                  <span className="text-slate-500 text-sm ml-2">({lists.find(l => l.id === listId)?.count || 0} contacts)</span>
                </p>
              </div>
            </div>

            <div className="pt-4 flex justify-between">
              <button onClick={() => setStep(3)} disabled={sending} className="text-sm text-slate-400 hover:text-white font-semibold">Back</button>
              <button onClick={createAndSend} disabled={sending}
                className="flex items-center gap-2 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white text-sm font-bold rounded-xl transition shadow-lg shadow-emerald-900/20">
                {sending ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                {sending ? "Queuing..." : "Send Campaign Now"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
