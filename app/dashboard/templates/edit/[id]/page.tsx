"use client";

import { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import Editor from "@monaco-editor/react";
import { ArrowLeft, Save, RefreshCw, Eye } from "lucide-react";
import Link from "next/link";

interface Template {
  id: string;
  name: string;
  category: string;
  htmlContent: string;
  userId: string | null;
}

export default function TemplateEditorPage() {
  const params = useParams();
  const router = useRouter();
  const [template, setTemplate] = useState<Template | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  const [name, setName] = useState("");
  const [category, setCategory] = useState("GENERAL");
  const [htmlContent, setHtmlContent] = useState("");

  useEffect(() => {
    fetch(`/api/templates/${params.id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.template) {
          setTemplate(data.template);
          setName(data.template.name);
          setCategory(data.template.category);
          setHtmlContent(data.template.htmlContent);
        }
        setLoading(false);
      });
  }, [params.id]);

  async function save() {
    setSaving(true);
    await fetch(`/api/templates/${params.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, category, htmlContent })
    });
    setSaving(false);
  }

  if (loading) {
    return <div className="p-8 text-center text-slate-500">Loading editor...</div>;
  }

  if (!template) {
    return <div className="p-8 text-center text-red-500">Template not found</div>;
  }

  return (
    <div className="flex flex-col h-[calc(100vh-6rem)] -m-6">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-slate-800 bg-[#0a0a0f] shrink-0">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/templates" className="text-slate-500 hover:text-white transition">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={template.userId === null}
            className="bg-transparent text-lg font-bold text-white focus:outline-none focus:border-b border-indigo-500 min-w-[200px]"
          />
        </div>
        <div className="flex items-center gap-3">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            disabled={template.userId === null}
            className="bg-slate-900 border border-slate-700 rounded-lg text-sm text-white px-3 py-1.5 focus:outline-none"
          >
            <option value="GENERAL">General</option>
            <option value="NEWSLETTER">Newsletter</option>
            <option value="PROMOTIONAL">Promotional</option>
            <option value="PERSONALIZED">Personalized</option>
            <option value="TRANSACTIONAL">Transactional</option>
          </select>
          {template.userId !== null && (
            <button
              onClick={save}
              disabled={saving}
              className="flex items-center gap-2 px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-sm font-semibold rounded-lg transition"
            >
              {saving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              Save
            </button>
          )}
        </div>
      </div>

      {/* Editor & Preview Split */}
      <div className="flex-1 flex overflow-hidden">
        {/* Monaco Editor */}
        <div className="flex-1 border-r border-slate-800 flex flex-col bg-[#1e1e1e]">
          <div className="px-4 py-2 bg-slate-900 border-b border-slate-800 text-xs font-semibold text-slate-400">
            HTML / Liquid Syntax
          </div>
          <div className="flex-1">
            <Editor
              height="100%"
              defaultLanguage="html"
              theme="vs-dark"
              value={htmlContent}
              onChange={(val) => setHtmlContent(val || "")}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                wordWrap: "on",
                padding: { top: 16 }
              }}
            />
          </div>
        </div>

        {/* Live Preview */}
        <div className="flex-1 flex flex-col bg-white">
          <div className="px-4 py-2 bg-slate-100 border-b border-slate-200 text-xs font-semibold text-slate-500 flex items-center justify-between">
            <span>Live Preview</span>
            <Eye className="w-4 h-4" />
          </div>
          <div className="flex-1 p-4 overflow-y-auto">
            {/* Injecting basic fake vars for preview */}
            <iframe
              srcDoc={htmlContent.replace(/{{firstName}}/g, "John").replace(/{{company}}/g, "Acme Corp")}
              className="w-full h-full border-0 rounded"
              title="Preview"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
