"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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

export default function LegacyTemplateEditorPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [template, setTemplate] = useState<Template | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  const [name, setName] = useState("");
  const [category, setCategory] = useState("GENERAL");
  const [htmlContent, setHtmlContent] = useState("");

  useEffect(() => {
    if (!id) return;
    fetch(`/api/templates/${id}`)
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
  }, [id]);

  async function save() {
    if (!id) return;
    setSaving(true);
    await fetch(`/api/templates/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, category, htmlContent })
    });
    setSaving(false);
  }

  if (loading) {
    return <div className="p-8 text-center text-gray-500">Loading editor...</div>;
  }

  if (!template) {
    return <div className="p-8 text-center text-red-500">Template not found</div>;
  }

  return (
    <div className="flex flex-col h-[calc(100vh-6rem)] -m-6 bg-white">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-gray-200 bg-white shrink-0">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/templates" className="text-gray-500 hover:text-gray-900 transition">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={template.userId === null}
            className="bg-transparent text-lg font-bold text-[#111827] focus:outline-none focus:border-b border-indigo-500 min-w-[200px]"
          />
        </div>
        <div className="flex items-center gap-3">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            disabled={template.userId === null}
            className="bg-gray-50 border border-gray-200 rounded-lg text-sm text-[#111827] px-3 py-1.5 focus:outline-none"
          >
            <option value="GENERAL">General</option>
            <option value="NEWSLETTER">Newsletter</option>
            <option value="PROMOTIONAL">Promotional</option>
            <option value="TRANSACTIONAL">Transactional</option>
            <option value="PERSONALIZED">Personalized</option>
          </select>
          {template.userId !== null && (
            <button
              onClick={save}
              disabled={saving}
              className="flex items-center gap-2 px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-sm font-semibold rounded-lg transition shadow-2xs"
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
        <div className="flex-1 border-r border-gray-200 flex flex-col bg-white">
          <div className="px-4 py-2 bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-500">
            HTML / Liquid Syntax
          </div>
          <div className="flex-1">
            <Editor
              height="100%"
              defaultLanguage="html"
              theme="vs"
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
          <div className="px-4 py-2 bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-500 flex items-center justify-between">
            <span>Live Preview</span>
            <Eye className="w-4 h-4" />
          </div>
          <div className="flex-1 p-4 overflow-y-auto">
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
