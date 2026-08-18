'use client';

import { use, useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft, Check, X, Search, FileText, Plus, Sparkles, Edit3, Eye,
  CheckCircle2, Monitor, Smartphone, Inbox, Loader2, Globe
} from "lucide-react";
import { LoadingButton } from "@/components/ui/loading-button";

interface TemplateItem {
  id: string;
  name: string;
  category?: string;
  htmlContent: string;
  userId?: string | null;
  createdAt?: string;
}

interface OptionItem {
  id: string;
  name: string;
  count?: number;
}

const CATEGORY_ORDER = ["MY TEMPLATES", "NEWSLETTER", "PROMOTIONAL", "PERSONALIZED", "GENERAL", "TRANSACTIONAL"];

export default function EditCampaignPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: campaignId } = use(params);
  const router = useRouter();

  // Campaign State
  const [loading, setLoading] = useState(true);
  const [subject, setSubject] = useState("");
  const [campaignName, setCampaignName] = useState("Untitled Campaign");
  const [isEditingName, setIsEditingName] = useState(false);
  const [status, setStatus] = useState("DRAFT");

  const [senderName, setSenderName] = useState("");
  const [senderEmail, setSenderEmail] = useState("");

  const [templates, setTemplates] = useState<TemplateItem[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateItem | null>(null);
  const [editedHtml, setEditedHtml] = useState("");

  const [hasSmtp, setHasSmtp] = useState(true);
  const [smtpSource, setSmtpSource] = useState("NONE");
  const [orgRole, setOrgRole] = useState("OWNER");

  const [lists, setLists] = useState<OptionItem[]>([]);
  const [selectedListId, setSelectedListId] = useState("");

  const [senders, setSenders] = useState<any[]>([]);
  const [selectedSenderId, setSelectedSenderId] = useState("");

  // Modals & Tabs
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
  const [previewTemplate, setPreviewTemplate] = useState<TemplateItem | null>(null);
  const [templateSearch, setTemplateSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [previewTab, setPreviewTab] = useState<"desktop" | "mobile" | "edit">("desktop");

  // Loading & Feedback
  const [savingDraft, setSavingDraft] = useState(false);
  const [draftSavedMessage, setDraftSavedMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const iframeRef = useRef<HTMLIFrameElement>(null);
  const editedHtmlRef = useRef<string>("");
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!campaignId) return;

    Promise.all([
      fetch(`/api/campaigns/${campaignId}`).then((r) => r.json()),
      fetch("/api/templates").then((r) => r.json()),
      fetch("/api/contacts/lists").then((r) => r.json()),
      fetch("/api/sender-profiles").then((r) => r.json()),
    ]).then(([cData, tData, lData, sData]) => {
      let loadedTemplate: TemplateItem | null = null;

      if (tData.templates) {
        setTemplates(tData.templates);
      }
      if (lData.lists) setLists(lData.lists);
      if (sData.senderProfiles) setSenders(sData.senderProfiles);

      if (cData.campaign) {
        setHasSmtp(cData.hasSmtp ?? true);
        setSmtpSource(cData.smtpSource ?? "NONE");
        setOrgRole(cData.orgRole ?? "OWNER");

        const c = cData.campaign;
        setSubject(c.subject || "");
        setCampaignName(c.campaignName || c.subject || "Untitled Campaign");
        setSelectedListId(c.contactListId || "");
        setSelectedSenderId(c.senderProfileId || "");
        setStatus(c.status || "DRAFT");

        if (c.senderProfile) {
          setSenderName(c.senderProfile.fromName);
          setSenderEmail(c.senderProfile.fromEmail);
        } else if (sData.senderProfiles && sData.senderProfiles.length > 0) {
          setSenderName(sData.senderProfiles[0].fromName);
          setSenderEmail(sData.senderProfiles[0].fromEmail);
        }

        if (c.template) {
          loadedTemplate = c.template;
          setSelectedTemplate(c.template);
        } else if (c.templateId && tData.templates) {
          loadedTemplate = tData.templates.find((t: any) => t.id === c.templateId) || null;
          setSelectedTemplate(loadedTemplate);
        }

        const initialContent = c.htmlSnapshot || loadedTemplate?.htmlContent || "";
        setEditedHtml(initialContent);
        editedHtmlRef.current = initialContent;
      }
      setLoading(false);
    }).catch(err => {
      console.error(err);
      setLoading(false);
    });
  }, [campaignId]);

  // When a template is picked from modal
  const selectTemplate = (t: TemplateItem) => {
    setSelectedTemplate(t);
    setEditedHtml(t.htmlContent);
    editedHtmlRef.current = t.htmlContent;
    setIsTemplateModalOpen(false);
    setPreviewTemplate(null);
  };

  // Enable inline editing inside the preview iframe WITHOUT losing cursor focus!
  const makeIframeEditable = () => {
    if (!iframeRef.current) return;
    try {
      const doc = iframeRef.current.contentDocument || iframeRef.current.contentWindow?.document;
      if (doc && doc.body) {
        doc.body.contentEditable = "true";
        doc.designMode = "on";

        doc.body.oninput = () => {
          const currentContent = doc.documentElement.outerHTML;
          editedHtmlRef.current = currentContent;

          if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
          debounceTimerRef.current = setTimeout(() => {
            setEditedHtml(currentContent);
          }, 1500);
        };

        doc.body.onblur = () => {
          if (editedHtmlRef.current) {
            setEditedHtml(editedHtmlRef.current);
          }
        };
      }
    } catch { /* ignore cross-origin */ }
  };

  // Save Draft (Updates existing campaign record)
  const handleSaveDraft = async () => {
    setSavingDraft(true);
    setErrorMessage("");
    try {
      const currentHtmlToSave = editedHtmlRef.current || editedHtml || selectedTemplate?.htmlContent || "";

      const payload = {
        subject: subject || campaignName || "Untitled Campaign",
        campaignName: campaignName || subject || "Untitled Campaign",
        templateId: selectedTemplate?.id || null,
        contactListId: selectedListId || null,
        senderProfileId: selectedSenderId || null,
        htmlSnapshot: currentHtmlToSave,
      };

      const res = await fetch(`/api/campaigns/${campaignId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update campaign draft");

      setDraftSavedMessage(`Draft Saved ✓ at ${new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`);
      setTimeout(() => setDraftSavedMessage(""), 3500);
    } catch (err: any) {
      setErrorMessage(err.message || "Failed to save draft");
    } finally {
      setSavingDraft(false);
    }
  };

  // Send Campaign
  const handleSend = async () => {
    if (!hasSmtp) {
      setErrorMessage("Custom SMTP is not configured. Please configure it in your Settings.");
      return;
    }
    if (!subject.trim()) {
      setErrorMessage("Please enter a subject line for your campaign.");
      return;
    }
    if (!selectedListId) {
      setErrorMessage("Please select a contact list recipient.");
      return;
    }

    const currentHtmlToSave = editedHtmlRef.current || editedHtml || selectedTemplate?.htmlContent || "";
    if (!currentHtmlToSave) {
      setErrorMessage("Please select an email template or content.");
      return;
    }

    setSending(true);
    setErrorMessage("");
    try {
      // 1. Ensure draft is saved & htmlSnapshot contains edited text
      const payload = {
        subject,
        campaignName,
        templateId: selectedTemplate?.id || null,
        contactListId: selectedListId,
        senderProfileId: selectedSenderId || null,
        htmlSnapshot: currentHtmlToSave,
      };

      await fetch(`/api/campaigns/${campaignId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      // 2. Trigger async email send worker
      const resSend = await fetch(`/api/campaigns/${campaignId}/send`, { method: "POST" });
      const dataSend = await resSend.json();
      if (!resSend.ok) throw new Error(dataSend.error || "Failed to send campaign");

      router.push("/dashboard/campaigns");
    } catch (err: any) {
      setErrorMessage(err.message || "Failed to dispatch campaign");
    } finally {
      setSending(false);
    }
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#F8FAFC]">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  // Separate User-created templates from System templates
  const userCreatedTemplates = templates.filter((t) => t.userId !== null && t.userId !== undefined);

  const filteredTemplates = templates.filter((t) =>
    t.name.toLowerCase().includes(templateSearch.toLowerCase())
  );

  const groupedTemplates: Record<string, TemplateItem[]> = {};

  if (userCreatedTemplates.length > 0 && (activeCategory === "ALL" || activeCategory === "MY TEMPLATES")) {
    const userFiltered = userCreatedTemplates.filter((t) =>
      t.name.toLowerCase().includes(templateSearch.toLowerCase())
    );
    if (userFiltered.length > 0) {
      groupedTemplates["⭐ MY SAVED TEMPLATES"] = userFiltered;
    }
  }

  CATEGORY_ORDER.filter((c) => c !== "MY TEMPLATES").forEach((cat) => {
    const items = filteredTemplates.filter(
      (t) =>
        t.userId === null &&
        (activeCategory === "ALL"
          ? (t.category || "GENERAL").toUpperCase() === cat
          : activeCategory === cat && (t.category || "GENERAL").toUpperCase() === cat)
    );
    if (items.length > 0) groupedTemplates[cat] = items;
  });

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="max-w-[1400px] mx-auto p-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: Campaign Settings Form */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center justify-between">
            <Link href="/dashboard/campaigns" className="text-[#6B7280] hover:text-[#111827] text-sm font-medium">
              ← Campaigns
            </Link>

            {draftSavedMessage && (
              <span className="px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-xl text-xs font-semibold flex items-center gap-1.5 animate-in fade-in">
                <CheckCircle2 className="w-3.5 h-3.5" /> {draftSavedMessage}
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            {isEditingName ? (
              <input
                type="text"
                value={campaignName}
                onChange={(e) => setCampaignName(e.target.value)}
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
            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-bold rounded-lg uppercase">
              {status}
            </span>
          </div>

          {errorMessage && (
            <div className="p-3.5 bg-red-50 border border-red-200 rounded-2xl text-xs font-medium text-red-700 flex items-center gap-2">
              <X className="w-4 h-4 text-red-600 shrink-0" />
              {errorMessage}
            </div>
          )}

          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            
            {/* SUBJECT LINE */}
            <div className="p-6">
              <label className="block text-xs uppercase text-[#6B7280] font-semibold tracking-wider mb-2">
                SUBJECT LINE *
              </label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Give a suitable subject line to your campaign."
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-[#111827] text-sm focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 focus:outline-none transition-all font-medium"
              />
            </div>

            <hr className="border-gray-100" />

            {/* SENDER */}
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="text-xs font-semibold text-[#6B7280] tracking-wider uppercase mb-1">
                    SENDER
                  </h4>
                  <p className="text-xs text-[#6B7280]">
                    Who is sending this email campaign?
                  </p>
                </div>
                <Link href="/dashboard/settings/domains" target="_blank" className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 bg-indigo-50 px-3 py-1.5 rounded-lg transition-colors">
                  <Plus className="w-3.5 h-3.5" />
                  Manage Identities
                </Link>
              </div>

              {senders.length > 0 ? (
                <select
                  value={selectedSenderId}
                  onChange={(e) => {
                    setSelectedSenderId(e.target.value);
                    const s = senders.find((x) => x.id === e.target.value);
                    if (s) {
                      setSenderName(s.fromName);
                      setSenderEmail(s.fromEmail);
                    }
                  }}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-[#111827] text-sm focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 focus:outline-none"
                >
                  {senders.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.fromName} ({s.fromEmail})
                    </option>
                  ))}
                </select>
              ) : (
                <div className="bg-gray-50 border border-dashed border-gray-300 rounded-xl p-6 text-center">
                  <Globe className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-xs text-gray-600 font-bold mb-1">No verified sender profiles found.</p>
                  <p className="text-[10px] text-gray-500 mb-4">You must add a Sender Identity (verified domain) to send emails.</p>
                  <Link href="/dashboard/settings/domains" className="inline-flex items-center px-4 py-2 text-xs font-bold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition">
                    Configure Sender Profile
                  </Link>
                </div>
              )}
            </div>

            <hr className="border-gray-100" />

            {/* RECIPIENT */}
            <div className="p-6">
              <label className="block text-xs uppercase text-[#6B7280] font-semibold tracking-wider mb-1">
                RECIPIENT *
              </label>
              <p className="text-xs text-[#6B7280] mb-4">Choose the contact list you wish to send to.</p>

              <select
                value={selectedListId}
                onChange={(e) => setSelectedListId(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-[#111827] text-sm focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 focus:outline-none"
              >
                <option value="">Select a contact list...</option>
                {lists.map((l) => (
                  <option key={l.id} value={l.id}>
                    {l.name}
                  </option>
                ))}
              </select>
              {selectedListId && (
                <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-50 text-green-700 rounded-lg text-xs font-semibold border border-green-200">
                  <Check className="w-4 h-4 text-green-600" />
                  {lists.find((l) => l.id === selectedListId)?.name} selected
                </div>
              )}
            </div>

            <hr className="border-gray-100" />

            {/* EMAIL CONTENT & TEMPLATE PICKER */}
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs uppercase text-[#6B7280] font-semibold tracking-wider">
                  EMAIL CONTENT & TEMPLATE
                </label>
                {selectedTemplate && (
                  <button
                    onClick={() => setIsTemplateModalOpen(true)}
                    className="text-xs font-bold text-indigo-600 hover:text-indigo-800 transition"
                  >
                    Change Template →
                  </button>
                )}
              </div>

              {!selectedTemplate && !editedHtml ? (
                <div className="mt-2 border-2 border-dashed border-gray-200 rounded-2xl p-8 flex flex-col items-center justify-center text-center bg-gray-50">
                  <div className="w-14 h-14 bg-white rounded-2xl shadow-sm border border-gray-200 flex items-center justify-center mb-3">
                    <FileText className="w-7 h-7 text-indigo-500" />
                  </div>
                  <p className="text-sm text-[#111827] font-bold mb-1">Select or design campaign email template.</p>
                  <p className="text-xs text-[#6B7280] mb-5">Choose from your saved templates or pre-designed layouts.</p>
                  <button
                    onClick={() => setIsTemplateModalOpen(true)}
                    className="px-5 py-2.5 bg-indigo-600 text-white text-xs font-bold rounded-xl hover:bg-indigo-700 shadow-sm transition"
                  >
                    Browse Templates & My Designs →
                  </button>
                </div>
              ) : (
                <div className="mt-2 border border-gray-200 rounded-2xl p-4 flex items-center gap-4 bg-gray-50">
                  <div className="w-20 h-16 bg-white border border-gray-200 rounded-lg overflow-hidden relative shrink-0">
                    <iframe
                      srcDoc={editedHtml || selectedTemplate?.htmlContent}
                      className="w-[800px] h-[800px] border-0"
                      style={{ transform: "scale(0.1)", transformOrigin: "top left", pointerEvents: "none" }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-[#111827] truncate">
                      {selectedTemplate?.name || "Custom Draft Template"}
                    </p>
                    <p className="text-xs text-emerald-600 font-semibold mt-0.5">Template Content Loaded & Preserved</p>
                  </div>
                  <button
                    onClick={() => setIsTemplateModalOpen(true)}
                    className="px-3.5 py-1.5 text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-xl text-xs font-semibold transition"
                  >
                    Change
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>

        {/* RIGHT COLUMN: Realistic Device Preview Frames & Direct Text Editor */}
        <div className="lg:col-span-5">
          <div className="sticky top-6 bg-white border border-gray-200 rounded-2xl shadow-sm flex flex-col overflow-hidden">
            
            {/* Live Preview Header Controls */}
            <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-white">
              <h2 className="text-[#111827] font-bold text-sm flex items-center gap-1.5">
                <Eye className="w-4 h-4 text-indigo-600" /> Live Interactive Preview
              </h2>

              {/* Desktop / Mobile / Direct Edit Mode Tabs */}
              <div className="flex bg-gray-100 p-1 rounded-xl text-xs border border-gray-200">
                <button
                  onClick={() => setPreviewTab("desktop")}
                  className={`px-3 py-1 font-semibold rounded-lg transition ${
                    previewTab === "desktop" ? "bg-white text-[#111827] shadow-2xs" : "text-gray-500"
                  }`}
                >
                  <Monitor className="w-3.5 h-3.5 inline mr-1" /> Desktop
                </button>
                <button
                  onClick={() => setPreviewTab("mobile")}
                  className={`px-3 py-1 font-semibold rounded-lg transition ${
                    previewTab === "mobile" ? "bg-white text-[#111827] shadow-2xs" : "text-gray-500"
                  }`}
                >
                  <Smartphone className="w-3.5 h-3.5 inline mr-1" /> Mobile
                </button>
                <button
                  onClick={() => {
                    setPreviewTab("edit");
                    setTimeout(makeIframeEditable, 150);
                  }}
                  className={`px-3 py-1 font-semibold rounded-lg transition ${
                    previewTab === "edit" ? "bg-purple-600 text-white shadow-2xs" : "text-purple-700 hover:bg-purple-50"
                  }`}
                  title="Click directly inside the email preview to edit text without losing cursor focus!"
                >
                  <Edit3 className="w-3.5 h-3.5 inline mr-1" /> Direct Text Edit
                </button>
              </div>
            </div>

            {/* Live Preview Body */}
            <div className="p-4 bg-gray-50 flex-1 flex flex-col space-y-4">
              
              {/* Inbox Card Preview */}
              <div className="flex items-start gap-3 p-3 bg-white border border-gray-200 rounded-xl shadow-2xs">
                <div className="w-9 h-9 rounded-full bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center text-sm shrink-0">
                  {senderName?.[0]?.toUpperCase() || "B"}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-[#111827] truncate">{senderName || "BulkyMailer Sender"}</span>
                    <span className="text-[10px] text-gray-400">Just now</span>
                  </div>
                  <p className="text-xs font-semibold text-[#111827] truncate">{subject || "Your Subject Line"}</p>
                  <p className="text-[11px] text-gray-500 truncate">Email preview content loaded below...</p>
                </div>
              </div>

              {/* Direct Editing Instruction Banner */}
              {previewTab === "edit" && (
                <div className="p-2.5 bg-purple-50 border border-purple-200 rounded-xl text-xs text-purple-900 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-purple-600 shrink-0" />
                  <span><strong>Live Direct Editing:</strong> Click any text block inside the email screen below to type directly! Cursor focus stays rock solid.</span>
                </div>
              )}

              {/* Device Viewport Containers */}
              {previewTab === "desktop" || previewTab === "edit" ? (
                /* REALISTIC DESKTOP MONITOR FRAME */
                <div className="w-full flex flex-col">
                  <div className="w-full bg-[#1F2937] rounded-t-[18px] p-2.5 shadow-xl border border-gray-700 flex flex-col">
                    <div className="bg-[#111827] px-4 py-2 rounded-t-xl flex items-center justify-between border-b border-gray-800">
                      <div className="flex items-center gap-1.5">
                        <span className="w-3 h-3 rounded-full bg-red-500 inline-block"></span>
                        <span className="w-3 h-3 rounded-full bg-yellow-500 inline-block"></span>
                        <span className="w-3 h-3 rounded-full bg-green-500 inline-block"></span>
                      </div>
                      <div className="bg-[#1F2937] px-4 py-1 rounded-md text-[10px] font-mono text-gray-400 border border-gray-700 flex items-center gap-1 max-w-xs truncate">
                        <Globe className="w-3 h-3 text-indigo-400" /> preview.bulkymailer.com/campaign
                      </div>
                      <div className="w-12"></div>
                    </div>
                    
                    <div className="bg-white rounded-b-xl overflow-hidden relative min-h-[460px] border-t border-gray-800">
                      {selectedTemplate || editedHtml ? (
                        <iframe
                          ref={iframeRef}
                          srcDoc={editedHtml || selectedTemplate?.htmlContent}
                          onLoad={previewTab === "edit" ? makeIframeEditable : undefined}
                          className="w-full h-[460px] border-0"
                        />
                      ) : (
                        <div className="flex flex-col items-center justify-center h-[460px] text-[#6B7280] text-center p-8">
                          <FileText className="w-10 h-10 text-gray-300 mb-2" />
                          <p className="text-xs font-bold text-gray-700">No Template Loaded</p>
                          <p className="text-[11px] text-gray-500 mt-1">Select a template to view desktop live preview.</p>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="w-24 h-3 bg-gradient-to-b from-gray-700 to-gray-900 mx-auto rounded-b-md"></div>
                  <div className="w-40 h-1.5 bg-gray-800 mx-auto rounded-full shadow-md"></div>
                </div>
              ) : (
                /* REALISTIC MOBILE SMARTPHONE FRAME */
                <div className="relative w-[340px] h-[640px] bg-black rounded-[3rem] p-3 shadow-2xl border-4 border-gray-800 shrink-0 mx-auto my-2">
                  <div className="absolute top-4 inset-x-0 w-28 h-4 bg-black rounded-full mx-auto z-40 flex items-center justify-center">
                    <span className="w-2.5 h-2.5 rounded-full bg-gray-900 border border-gray-800 mr-2"></span>
                    <span className="w-2 h-2 rounded-full bg-blue-950"></span>
                  </div>
                  
                  <div className="w-full h-full bg-white rounded-[2.2rem] overflow-hidden relative border border-gray-900 pt-6">
                    {selectedTemplate || editedHtml ? (
                      <iframe
                        srcDoc={editedHtml || selectedTemplate?.htmlContent}
                        className="w-full h-[580px] border-0"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center h-[580px] text-[#6B7280] text-center p-6">
                        <FileText className="w-8 h-8 text-gray-300 mb-2" />
                        <p className="text-xs font-bold text-gray-700">No Template Loaded</p>
                        <p className="text-[11px] text-gray-500 mt-1">Select a template to view mobile preview.</p>
                      </div>
                    )}
                  </div>

                  <div className="absolute bottom-2 inset-x-0 w-32 h-1 bg-gray-400 rounded-full mx-auto z-40"></div>
                </div>
              )}

            </div>

            {/* Bottom Actions Footer */}
            <div className="p-4 border-t border-gray-100 bg-white flex items-center justify-between">
              <div className="flex-1 flex justify-end gap-2">
                {!hasSmtp && (
                  <div className="hidden md:flex items-center text-xs font-bold text-red-600 bg-red-50 border border-red-200 px-3 rounded-lg">
                    SMTP Required
                  </div>
                )}
                <LoadingButton variant="secondary" onClick={handleSaveDraft} loading={savingDraft}>
                  Save Draft
                </LoadingButton>
                <LoadingButton variant="primary" onClick={handleSend} loading={sending} disabled={!hasSmtp}>
                  Send Campaign →
                </LoadingButton>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* TEMPLATE PICKER MODAL */}
      {isTemplateModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl shadow-2xl max-w-5xl w-full max-h-[90vh] flex flex-col overflow-hidden relative">
            
            {/* Modal Top Header with [+ Create New Template] Button */}
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-white z-10">
              <div className="flex items-center gap-3">
                <h2 className="text-lg font-bold text-[#111827]">Choose a Template</h2>
                <Link
                  href="/dashboard/templates/new"
                  target="_blank"
                  className="px-3 py-1.5 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-200 text-xs font-bold rounded-xl transition flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" /> Create New Template
                </Link>
              </div>
              <button onClick={() => setIsTemplateModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full text-[#6B7280]">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Category Filter Tabs */}
            <div className="px-6 py-3 border-b border-gray-200 bg-gray-50 flex items-center gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-[#6B7280] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search templates by name..."
                  value={templateSearch}
                  onChange={(e) => setTemplateSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-xs border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500/30 outline-none bg-white"
                />
              </div>
              <div className="flex items-center gap-1.5 overflow-x-auto">
                {["ALL", "MY TEMPLATES", ...CATEGORY_ORDER.filter(c => c !== "MY TEMPLATES")].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-xl whitespace-nowrap transition ${
                      activeCategory === cat
                        ? "bg-[#111827] text-white"
                        : "bg-white border border-gray-200 text-[#6B7280] hover:bg-gray-100"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Template Cards Grid */}
            <div className="flex-1 overflow-y-auto p-6 bg-white space-y-8">
              {Object.entries(groupedTemplates).map(([category, items]) => (
                <div key={category}>
                  <h3 className="text-xs font-bold text-indigo-900 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                    {category.includes("MY SAVED") && <Sparkles className="w-3.5 h-3.5 text-purple-600 fill-purple-600" />}
                    {category}
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                    {items.map((template) => (
                      <div
                        key={template.id}
                        className={`group border rounded-2xl overflow-hidden bg-white hover:border-indigo-400 transition-all shadow-2xs relative ${
                          template.userId ? "border-purple-200 bg-purple-50/20" : "border-gray-200"
                        }`}
                      >
                        <div className="relative bg-gray-50 border-b border-gray-100 overflow-hidden" style={{ height: 140 }}>
                          <iframe
                            srcDoc={template.htmlContent}
                            title={template.name}
                            scrolling="no"
                            className="w-[800px] h-[800px] border-none"
                            style={{
                              transform: "scale(0.225)",
                              transformOrigin: "top left",
                              pointerEvents: "none",
                            }}
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                            <button
                              onClick={() => setPreviewTemplate(template)}
                              className="px-3 py-1.5 bg-white text-[#111827] text-xs font-semibold rounded-lg shadow-sm hover:bg-gray-50"
                            >
                              Preview
                            </button>
                            <button
                              onClick={() => selectTemplate(template)}
                              className="px-3 py-1.5 bg-indigo-600 text-white text-xs font-semibold rounded-lg shadow-sm hover:bg-indigo-700"
                            >
                              Use This
                            </button>
                          </div>
                        </div>
                        <div className="p-3">
                          <p className="text-xs font-bold text-[#111827] truncate">{template.name}</p>
                          <div className="flex items-center justify-between mt-1">
                            <span className="text-[10px] text-[#6B7280] truncate">{template.category || "General"}</span>
                            {template.userId && (
                              <span className="px-1.5 py-0.5 bg-purple-100 text-purple-700 text-[9px] font-bold rounded">Custom</span>
                            )}
                          </div>
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

            {/* Template Full Preview Overlay */}
            {previewTemplate && (
              <div className="absolute inset-0 z-60 bg-black/70 flex items-center justify-center p-8 backdrop-blur-sm animate-in fade-in">
                <div className="bg-white rounded-3xl max-w-2xl w-full flex flex-col shadow-2xl overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                    <h3 className="font-bold text-[#111827] text-sm">{previewTemplate.name}</h3>
                    <button onClick={() => setPreviewTemplate(null)} className="text-[#6B7280] hover:text-[#111827]">
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="bg-gray-100 p-6 flex justify-center h-[460px] overflow-hidden">
                    <iframe srcDoc={previewTemplate.htmlContent} className="w-full h-full bg-white rounded-xl shadow-sm border-0" />
                  </div>
                  <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-end gap-3 bg-white">
                    <button onClick={() => setPreviewTemplate(null)} className="px-4 py-2 text-xs font-semibold text-[#6B7280] hover:bg-gray-50 rounded-xl transition">
                      Cancel
                    </button>
                    <button onClick={() => selectTemplate(previewTemplate)} className="px-4 py-2 bg-indigo-600 text-white text-xs font-bold rounded-xl hover:bg-indigo-700 transition shadow-sm">
                      Use This Template
                    </button>
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
