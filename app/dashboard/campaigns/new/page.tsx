'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Check, X, Search, FileText } from "lucide-react";
import { LoadingButton } from "@/components/ui/loading-button";

interface OptionItem { id: string; name: string; count?: number; category?: string; htmlContent?: string; }

const CATEGORY_ORDER = ["NEWSLETTER", "PROMOTIONAL", "PERSONALIZED", "GENERAL", "TRANSACTIONAL"];

export default function NewCampaignPage() {
  const router = useRouter();
  
  // State
  const [subject, setSubject] = useState("");
  const [campaignName, setCampaignName] = useState("Untitled Campaign");
  const [isEditingName, setIsEditingName] = useState(false);
  
  const [senderName, setSenderName] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  
  const [templates, setTemplates] = useState<OptionItem[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<OptionItem | null>(null);
  
  const [lists, setLists] = useState<OptionItem[]>([]);
  const [selectedListId, setSelectedListId] = useState("");
  
  const [senders, setSenders] = useState<any[]>([]);
  const [selectedSenderId, setSelectedSenderId] = useState("");
  
  // Modals
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
  const [previewTemplate, setPreviewTemplate] = useState<OptionItem | null>(null);
  const [templateSearch, setTemplateSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [previewTab, setPreviewTab] = useState<"desktop"|"mobile">("desktop");

  const [savingDraft, setSavingDraft] = useState(false);
  const [sending, setSending] = useState(false);
  
  useEffect(() => {
    Promise.all([
      fetch("/api/templates").then(r => r.json()),
      fetch("/api/contacts/lists").then(r => r.json()),
      fetch("/api/sender-profiles").then(r => r.json())
    ]).then(([tData, lData, sData]) => {
      if (tData.templates) setTemplates(tData.templates);
      if (lData.lists) setLists(lData.lists);
      if (sData.senderProfiles) {
        setSenders(sData.senderProfiles);
        if (sData.senderProfiles.length > 0) {
          setSelectedSenderId(sData.senderProfiles[0].id);
          setSenderName(sData.senderProfiles[0].fromName);
          setSenderEmail(sData.senderProfiles[0].fromEmail);
        }
      }
    });
  }, []);

  const selectTemplate = (t: OptionItem) => {
    setSelectedTemplate(t);
    setIsTemplateModalOpen(false);
    setPreviewTemplate(null);
  };

  const handleSaveDraft = async () => {
    setSavingDraft(true);
    try {
      const res = await fetch("/api/campaigns", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          subject, 
          campaignName,
          templateId: selectedTemplate?.id, 
          contactListId: selectedListId || undefined 
        })
      });
      if (res.ok) {
        // Optional: show a success toast here
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSavingDraft(false);
    }
  };

  const handleSend = async () => {
    if (!subject || !selectedTemplate || !selectedListId) {
      alert("Please fill in subject, template, and audience.");
      return;
    }
    setSending(true);
    try {
      const resCreate = await fetch("/api/campaigns", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          subject, 
          campaignName,
          templateId: selectedTemplate.id, 
          contactListId: selectedListId 
        })
      });
      const dataCreate = await resCreate.json();
      if (!resCreate.ok) throw new Error(dataCreate.error || "Failed to create campaign");
      
      const resSend = await fetch(`/api/campaigns/${dataCreate.campaign.id}/send`, { method: "POST" });
      if (!resSend.ok) throw new Error("Failed to send campaign");
      
      router.push("/dashboard/campaigns");
    } catch (err) {
      console.error(err);
    } finally {
      setSending(false);
    }
  };

  const filteredTemplates = templates.filter(t => 
    t.name.toLowerCase().includes(templateSearch.toLowerCase())
  );
  
  const groupedTemplates = CATEGORY_ORDER.reduce((acc, cat) => {
    const items = filteredTemplates.filter(t => activeCategory === 'ALL' ? (t.category || 'GENERAL').toUpperCase() === cat : activeCategory === cat && (t.category || 'GENERAL').toUpperCase() === cat);
    if (items.length > 0) acc[cat] = items;
    return acc;
  }, {} as Record<string, OptionItem[]>);

  const activeMainTab = "desktop"; // Right panel tabs

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="max-w-[1400px] mx-auto p-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Form */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center gap-3">
            <Link href="/dashboard/campaigns" className="text-[#6B7280] hover:text-[#111827] text-sm font-medium">
              ← Campaigns
            </Link>
          </div>
          
          <div className="flex items-center gap-3">
            {isEditingName ? (
              <input 
                type="text" 
                value={campaignName} 
                onChange={e => setCampaignName(e.target.value)} 
                onBlur={() => setIsEditingName(false)}
                autoFocus
                className="text-2xl font-bold text-[#111827] bg-transparent border-b border-gray-300 focus:border-indigo-500 focus:outline-none px-1"
              />
            ) : (
              <h1 
                className="text-2xl font-bold text-[#111827] cursor-pointer hover:bg-gray-100 px-2 py-1 rounded-lg -ml-2 transition-colors"
                onClick={() => setIsEditingName(true)}
              >
                {campaignName} ✎
              </h1>
            )}
            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-bold rounded-lg uppercase">Draft</span>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            
            {/* SUBJECT */}
            <div className="p-6">
              <label className="block text-xs uppercase text-[#6B7280] font-semibold tracking-wider mb-2">SUBJECT</label>
              <input 
                type="text" 
                value={subject} 
                onChange={e => setSubject(e.target.value)}
                placeholder="Give a suitable subject line to your campaign."
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-[#111827] text-sm focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 focus:outline-none transition-all"
              />
            </div>
            
            <hr className="border-gray-100" />
            
            {/* SENDER */}
            <div className="p-6">
              <label className="block text-xs uppercase text-[#6B7280] font-semibold tracking-wider mb-1">SENDER</label>
              <p className="text-sm text-[#6B7280] mb-4">Who is sending this email campaign?</p>
              
              {senders.length > 0 ? (
                <select 
                  value={selectedSenderId} 
                  onChange={e => {
                    setSelectedSenderId(e.target.value);
                    const s = senders.find(x => x.id === e.target.value);
                    if (s) { setSenderName(s.fromName); setSenderEmail(s.fromEmail); }
                  }}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-[#111827] text-sm focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 focus:outline-none"
                >
                  {senders.map(s => <option key={s.id} value={s.id}>{s.fromName} ({s.fromEmail})</option>)}
                </select>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" placeholder="From Name" value={senderName} onChange={e => setSenderName(e.target.value)} className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-[#111827] text-sm focus:ring-2 focus:ring-indigo-500/30 focus:outline-none" />
                  <input type="email" placeholder="From Email" value={senderEmail} onChange={e => setSenderEmail(e.target.value)} className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-[#111827] text-sm focus:ring-2 focus:ring-indigo-500/30 focus:outline-none" />
                </div>
              )}
            </div>

            <hr className="border-gray-100" />

            {/* RECIPIENT */}
            <div className="p-6">
              <label className="block text-xs uppercase text-[#6B7280] font-semibold tracking-wider mb-1">RECIPIENT</label>
              <p className="text-sm text-[#6B7280] mb-4">Choose the contact lists you wish to send to.</p>
              
              <select 
                value={selectedListId} 
                onChange={e => setSelectedListId(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-[#111827] text-sm focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 focus:outline-none"
              >
                <option value="">Select a list...</option>
                {lists.map(l => <option key={l.id} value={l.id}>{l.name}</option>)}
              </select>
              {selectedListId && (
                <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-50 text-green-700 rounded-lg text-sm font-medium border border-green-200">
                  <Check className="w-4 h-4" /> 
                  {lists.find(l => l.id === selectedListId)?.name} — {lists.find(l => l.id === selectedListId)?.count || 0} contacts
                </div>
              )}
            </div>

            <hr className="border-gray-100" />

            {/* CONTENT */}
            <div className="p-6">
              <label className="block text-xs uppercase text-[#6B7280] font-semibold tracking-wider mb-1">CONTENT</label>
              
              {!selectedTemplate ? (
                <div className="mt-4 border-2 border-dashed border-gray-200 rounded-2xl p-8 flex flex-col items-center justify-center text-center bg-gray-50">
                  <div className="w-16 h-16 bg-white rounded-2xl shadow-sm border border-gray-200 flex items-center justify-center mb-4">
                    <FileText className="w-8 h-8 text-indigo-300" />
                  </div>
                  <p className="text-sm text-[#111827] font-medium mb-1">Create the content of your campaign.</p>
                  <p className="text-xs text-[#6B7280] mb-6">Choose from our pre-designed templates or build your own.</p>
                  <button 
                    onClick={() => setIsTemplateModalOpen(true)}
                    className="px-5 py-2.5 bg-white border border-gray-300 text-[#111827] text-sm font-semibold rounded-xl hover:bg-gray-50 shadow-sm transition-colors"
                  >
                    Browse Templates →
                  </button>
                </div>
              ) : (
                <div className="mt-4 border border-gray-200 rounded-2xl p-4 flex items-center gap-4 bg-gray-50">
                  <div className="w-20 h-16 bg-white border border-gray-200 rounded-lg overflow-hidden relative">
                    <iframe srcDoc={selectedTemplate.htmlContent} className="w-[800px] h-[800px] border-0" style={{ transform: 'scale(0.1)', transformOrigin: 'top left' }} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-[#111827]">{selectedTemplate.name}</p>
                    <p className="text-xs text-[#6B7280] mt-0.5">Template Selected</p>
                  </div>
                  <button 
                    onClick={() => setIsTemplateModalOpen(true)}
                    className="px-4 py-2 text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg text-sm font-medium transition-colors"
                  >
                    Change Template
                  </button>
                </div>
              )}
            </div>
            
          </div>
        </div>

        {/* Right Preview */}
        <div className="lg:col-span-5">
          <div className="sticky top-20 bg-white border border-gray-200 rounded-2xl shadow-sm flex flex-col">
            {/* Live Preview Panel */}
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-[#111827] font-bold">Live Preview</h2>
            </div>

            <div className="flex-1 p-4 bg-gray-50 overflow-hidden flex flex-col">
              <p className="text-xs text-[#6B7280] uppercase font-semibold mb-3">Inbox Preview</p>
              <div className="flex items-start gap-3 p-3 bg-white border border-gray-200 rounded-lg shadow-sm mb-4">
                <div className="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-sm shrink-0">
                  {senderName?.[0]?.toUpperCase() || '?'}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm text-[#111827]">{senderName || 'Your Name'}</span>
                    <span className="text-xs text-[#9CA3AF]">just now</span>
                  </div>
                  <p className="text-sm text-[#111827] font-medium truncate">{subject || 'Your subject line'}</p>
                  <p className="text-xs text-[#9CA3AF] truncate">Email preview text will appear here...</p>
                </div>
              </div>

              <div className="flex-1 bg-white border border-gray-200 rounded-xl overflow-hidden relative min-h-[400px]">
                {selectedTemplate ? (
                  <iframe srcDoc={selectedTemplate.htmlContent} className="absolute inset-0 w-full h-full border-0" />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-[#6B7280] text-sm">Select a template to preview</div>
                )}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="p-4 border-t border-gray-100 bg-white rounded-b-2xl flex items-center justify-between">
              <LoadingButton variant="secondary" onClick={handleSaveDraft} loading={savingDraft}>
                Save Draft
              </LoadingButton>
              <LoadingButton variant="primary" onClick={handleSend} loading={sending}>
                Send Campaign →
              </LoadingButton>
            </div>
          </div>
        </div>

      </div>

      {/* Template Picker Modal */}
      {isTemplateModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] flex flex-col overflow-hidden relative">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-white z-10">
              <h2 className="text-xl font-bold text-[#111827]">Choose a Template</h2>
              <button onClick={() => setIsTemplateModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full text-[#6B7280]">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50 flex items-center gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-[#6B7280] absolute left-3 top-1/2 -translate-y-1/2" />
                <input 
                  type="text"
                  placeholder="Search by name..."
                  value={templateSearch}
                  onChange={e => setTemplateSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500/30 outline-none"
                />
              </div>
              <div className="flex items-center gap-2 overflow-x-auto">
                {["ALL", ...CATEGORY_ORDER].map(cat => (
                  <button 
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors ${
                      activeCategory === cat ? "bg-[#111827] text-white" : "bg-white border border-gray-200 text-[#6B7280] hover:bg-gray-50"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 bg-white space-y-8">
              {Object.entries(groupedTemplates).map(([category, items]) => (
                <div key={category}>
                  <h3 className="text-xs font-bold text-[#6B7280] uppercase tracking-widest mb-4">{category}</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                    {items.map(template => (
                      <div key={template.id} className="group border border-gray-200 rounded-xl overflow-hidden bg-white hover:border-indigo-300 transition-colors shadow-sm relative">
                        <div className="relative bg-gray-50 border-b border-gray-100 overflow-hidden" style={{ height: 140 }}>
                          <iframe
                            srcDoc={template.htmlContent}
                            title={template.name}
                            scrolling="no"
                            className="w-[800px] h-[800px] border-none"
                            style={{
                              transform: 'scale(0.225)',
                              transformOrigin: 'top left',
                              pointerEvents: 'none',
                            }}
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                            <button onClick={() => setPreviewTemplate(template)} className="px-3 py-1.5 bg-white text-[#111827] text-xs font-semibold rounded-lg shadow-sm hover:bg-gray-50">Preview</button>
                            <button onClick={() => selectTemplate(template)} className="px-3 py-1.5 bg-indigo-600 text-white text-xs font-semibold rounded-lg shadow-sm hover:bg-indigo-700">Use This</button>
                          </div>
                        </div>
                        <div className="p-3">
                          <p className="text-sm font-bold text-[#111827] truncate">{template.name}</p>
                          <p className="text-[10px] text-[#6B7280] mt-0.5 truncate">{template.category || 'General'} · Updated recently</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              {Object.keys(groupedTemplates).length === 0 && (
                <div className="text-center py-12 text-[#6B7280]">No templates found matching your criteria.</div>
              )}
            </div>
            
            {/* Preview Overlay */}
            {previewTemplate && (
              <div className="absolute inset-0 z-60 bg-black/70 flex items-center justify-center p-8 backdrop-blur-sm animate-in fade-in">
                <div className="bg-white rounded-2xl max-w-2xl w-full flex flex-col shadow-2xl overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-[#111827]">{previewTemplate.name}</h3>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex bg-gray-100 p-1 rounded-lg">
                        <button onClick={() => setPreviewTab("desktop")} className={`px-3 py-1 text-xs font-semibold rounded-md ${previewTab === 'desktop' ? 'bg-white shadow-sm text-[#111827]' : 'text-[#6B7280]'}`}>Desktop</button>
                        <button onClick={() => setPreviewTab("mobile")} className={`px-3 py-1 text-xs font-semibold rounded-md ${previewTab === 'mobile' ? 'bg-white shadow-sm text-[#111827]' : 'text-[#6B7280]'}`}>Mobile</button>
                      </div>
                      <button onClick={() => setPreviewTemplate(null)} className="text-[#6B7280] hover:text-[#111827]">
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="bg-gray-100 p-6 flex justify-center h-[500px] overflow-hidden">
                    {previewTab === 'desktop' ? (
                      <div className="w-full h-full bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
                        <iframe srcDoc={previewTemplate.htmlContent} className="w-full h-full border-none" />
                      </div>
                    ) : (
                      <div className="w-[375px] h-full bg-white rounded-[2.5rem] shadow-xl overflow-hidden border-[8px] border-gray-900 relative">
                        <iframe srcDoc={previewTemplate.htmlContent} className="w-full h-full border-none" />
                      </div>
                    )}
                  </div>
                  
                  <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-end gap-3 bg-white">
                    <button onClick={() => setPreviewTemplate(null)} className="px-4 py-2 text-sm font-semibold text-[#6B7280] hover:bg-gray-50 rounded-xl transition-colors">Cancel</button>
                    <button onClick={() => selectTemplate(previewTemplate)} className="px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 transition-colors shadow-sm">Use This Template</button>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      )}
    </div>
  );
}
