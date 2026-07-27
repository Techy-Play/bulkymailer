"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  Users, Plus, Upload, Search, Edit2, Trash2, X, Check, ChevronDown,
  RefreshCw, FileText, AlertCircle, CheckCircle2, ArrowLeft,
  UserPlus, FileCheck, Sparkles
} from "lucide-react";
import { LoadingButton } from "@/components/ui/loading-button";

interface ContactList {
  id: string;
  name: string;
  description: string | null;
  createdAt: string;
  _count: { contacts: number };
}

interface Contact {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  phone: string | null;
  createdAt: string;
}

// ─── Create List Modal ──────────────────────────────────────────────────────

function CreateListModal({ onClose, onCreate }: {
  onClose: () => void;
  onCreate: (list: ContactList) => void;
}) {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/contacts/lists", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, description: desc }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error); return; }
      onCreate(data.list);
    } catch {
      setError("Network error. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-gray-900/40 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white border border-gray-200 rounded-2xl w-full max-w-md shadow-2xl">
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <h2 className="font-bold text-[#111827]">New Contact List</h2>
          <button onClick={onClose} className="text-[#6B7280] hover:text-[#111827] transition"><X className="w-5 h-5" /></button>
        </div>
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          {error && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-sm text-red-700">
              {error}
            </div>
          )}
          <div>
            <label className="block text-xs font-semibold text-[#6B7280] uppercase tracking-wide mb-1.5">List Name *</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required
              placeholder="e.g. Newsletter Subscribers"
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-[#111827] focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 focus:outline-none placeholder:text-gray-400 transition" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#6B7280] uppercase tracking-wide mb-1.5">Description</label>
            <textarea value={desc} onChange={(e) => setDesc(e.target.value)} rows={2}
              placeholder="Optional description"
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-[#111827] focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 focus:outline-none placeholder:text-gray-400 resize-none transition" />
          </div>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose}
              className="flex-1 py-2.5 border border-gray-200 text-[#111827] text-sm font-semibold rounded-xl hover:bg-gray-50 transition">
              Cancel
            </button>
            <LoadingButton type="submit" loading={loading} disabled={!name.trim()}
              className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-sm font-semibold rounded-xl transition shadow-sm">
              Create List
            </LoadingButton>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Import Modal with Drag and Drop ────────────────────────────────────────

function ImportModal({ listId, onClose, onImported }: {
  listId: string;
  onClose: () => void;
  onImported: () => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ imported: number; duplicates: number } | null>(null);
  const [error, setError] = useState("");

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];
      const fn = droppedFile.name.toLowerCase();
      if (fn.endsWith('.csv') || fn.endsWith('.xlsx') || fn.endsWith('.xls')) {
        setFile(droppedFile);
        setError("");
      } else {
        setError("Unsupported file format. Please upload a CSV or Excel (.xlsx) file.");
      }
    }
  };

  async function handleImport() {
    if (!file) return;
    setLoading(true);
    setError("");
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("listId", listId);
      const res = await fetch(`/api/contacts/import`, { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) { setError(data.error || "Import failed"); return; }
      setResult(data);
    } catch {
      setError("Import failed. Please check your network connection.");
    } finally {
      setLoading(false);
    }
  }

  if (result) {
    return (
      <div className="fixed inset-0 z-50 bg-gray-900/40 backdrop-blur-sm flex items-center justify-center p-4">
        <div className="bg-white border border-gray-200 rounded-2xl w-full max-w-md shadow-2xl p-6 text-center">
          <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-8 h-8 text-emerald-600" />
          </div>
          <h2 className="text-xl font-bold text-[#111827] mb-1">Import Successful!</h2>
          <p className="text-[#6B7280] text-sm">
            <span className="font-bold text-emerald-600">{result.imported}</span> contacts added to your list
            {result.duplicates > 0 && (
              <>, <span className="font-bold text-amber-600">{result.duplicates}</span> duplicates updated/skipped</>
            )}
          </p>
          <button onClick={() => { onImported(); onClose(); }}
            className="mt-6 w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-xl transition shadow-sm">
            View & Edit Contacts →
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-gray-900/40 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white border border-gray-200 rounded-2xl w-full max-w-md shadow-2xl">
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <h2 className="font-bold text-[#111827]">Import Contacts (CSV / Excel)</h2>
          <button onClick={onClose} className="text-[#6B7280] hover:text-[#111827] transition"><X className="w-5 h-5" /></button>
        </div>
        <div className="p-5 space-y-4">
          {error && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <p className="text-xs font-medium text-red-700">{error}</p>
            </div>
          )}

          {/* Interactive Drag & Drop File Upload Zone */}
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileRef.current?.click()}
            className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-200 ${
              isDragging
                ? "border-indigo-600 bg-indigo-50/80 scale-[1.01]"
                : file
                ? "border-emerald-400 bg-emerald-50/50"
                : "border-gray-300 hover:border-indigo-400 hover:bg-gray-50"
            }`}
          >
            <input
              ref={fileRef}
              type="file"
              accept=".csv,.xlsx,.xls"
              className="hidden"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            />
            {file ? (
              <div className="space-y-2">
                <FileCheck className="w-10 h-10 text-emerald-600 mx-auto" />
                <p className="text-sm font-bold text-emerald-950">{file.name}</p>
                <p className="text-xs text-emerald-700">{(file.size / 1024).toFixed(1)} KB — Ready to import</p>
              </div>
            ) : (
              <div className="space-y-2">
                <Upload className={`w-10 h-10 mx-auto transition ${isDragging ? "text-indigo-600 animate-bounce" : "text-gray-400"}`} />
                <p className="text-sm font-bold text-[#111827]">
                  {isDragging ? "Drop your CSV file here" : "Drag & drop CSV or Excel file"}
                </p>
                <p className="text-xs text-[#6B7280]">or click to browse from computer</p>
                <p className="text-[11px] text-gray-400 pt-2">
                  Must include an <code className="text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded font-mono">email</code> column
                </p>
              </div>
            )}
          </div>

          <div className="flex gap-3 pt-4 border-t border-gray-100">
            <button type="button" onClick={onClose}
              className="flex-1 py-2.5 border border-gray-200 text-[#111827] text-sm font-semibold rounded-xl hover:bg-gray-50 transition">
              Cancel
            </button>
            <LoadingButton onClick={handleImport} loading={loading} disabled={!file}
              className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-sm font-semibold rounded-xl transition shadow-sm">
              Import Contacts →
            </LoadingButton>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Add Contact Modal ──────────────────────────────────────────────────────

function AddContactModal({ listId, onClose, onAdded }: {
  listId: string;
  onClose: () => void;
  onAdded: () => void;
}) {
  const [form, setForm] = useState({ email: "", firstName: "", lastName: "", phone: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/contacts/lists/${listId}/contacts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error); return; }
      onAdded();
    } catch {
      setError("Network error. Try again.");
    } finally {
      setLoading(false);
    }
  }

  const inputClass = "w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-[#111827] focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 focus:outline-none transition placeholder:text-gray-400";
  const labelClass = "block text-xs font-semibold text-[#6B7280] uppercase tracking-wide mb-1.5";

  return (
    <div className="fixed inset-0 z-50 bg-gray-900/40 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white border border-gray-200 rounded-2xl w-full max-w-md shadow-2xl">
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <h2 className="font-bold text-[#111827]">Add Contact</h2>
          <button onClick={onClose} className="text-[#6B7280] hover:text-[#111827] transition"><X className="w-5 h-5" /></button>
        </div>
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          {error && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-sm text-red-700">
              {error}
            </div>
          )}
          <div>
            <label className={labelClass}>Email *</label>
            <input type="email" value={form.email} onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))} required
              placeholder="alice@example.com" className={inputClass} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelClass}>First Name</label>
              <input type="text" value={form.firstName} onChange={(e) => setForm((p) => ({ ...p, firstName: e.target.value }))}
                placeholder="Alice" className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Last Name</label>
              <input type="text" value={form.lastName} onChange={(e) => setForm((p) => ({ ...p, lastName: e.target.value }))}
                placeholder="Smith" className={inputClass} />
            </div>
          </div>
          <div>
            <label className={labelClass}>Phone</label>
            <input type="tel" value={form.phone} onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
              placeholder="+1 555 000 0000" className={inputClass} />
          </div>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose}
              className="flex-1 py-2.5 border border-gray-200 text-[#111827] text-sm font-semibold rounded-xl hover:bg-gray-50 transition">
              Cancel
            </button>
            <LoadingButton type="submit" loading={loading} disabled={!form.email.trim()}
              className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-sm font-semibold rounded-xl transition shadow-sm">
              Add Contact
            </LoadingButton>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Inline Editable Cell ───────────────────────────────────────────────────

function EditableCell({ value, onSave, placeholder = "—" }: {
  value: string;
  onSave: (v: string) => void;
  placeholder?: string;
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);

  function commit() {
    setEditing(false);
    if (draft !== value) onSave(draft);
  }

  if (editing) {
    return (
      <div className="flex items-center gap-1">
        <input autoFocus type="text" value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={commit}
          onKeyDown={(e) => { if (e.key === "Enter") commit(); if (e.key === "Escape") { setDraft(value); setEditing(false); } }}
          className="w-full bg-white border border-indigo-400 text-[#111827] text-xs px-2 py-1 rounded-md outline-none focus:ring-2 focus:ring-indigo-500/40"
        />
      </div>
    );
  }

  return (
    <span
      onClick={() => { setDraft(value); setEditing(true); }}
      className="cursor-pointer hover:text-indigo-600 transition text-xs group flex items-center gap-1"
      title="Click to edit"
    >
      {value || <span className="text-gray-400">{placeholder}</span>}
      <Edit2 className="w-2.5 h-2.5 text-gray-400 group-hover:text-indigo-600 transition shrink-0" />
    </span>
  );
}

// ─── Contact Table ──────────────────────────────────────────────────────────

function ContactTable({ listId, listName, onAddContact, onImportCSV }: { listId: string; listName: string, onAddContact: () => void, onImportCSV: () => void }) {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchContacts = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page: String(page), ...(search ? { search } : {}) });
      const res = await fetch(`/api/contacts/lists/${listId}?${params}`);
      const data = await res.json();
      setContacts(data.contacts ?? []);
      setTotal(data.total ?? 0);
    } catch { /* ignore */ }
    setLoading(false);
  }, [listId, page, search]);

  useEffect(() => { fetchContacts(); }, [fetchContacts]);

  useEffect(() => {
    const handleRefresh = () => fetchContacts();
    window.addEventListener(`refresh-list-${listId}`, handleRefresh);
    return () => window.removeEventListener(`refresh-list-${listId}`, handleRefresh);
  }, [listId, fetchContacts]);

  async function saveField(id: string, field: string, value: string) {
    await fetch(`/api/contacts/lists/${listId}/contacts/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ [field]: value }),
    });
    setContacts((prev) => prev.map((c) => c.id === id ? { ...c, [field]: value } : c));
  }

  async function deleteContact(id: string) {
    if (!confirm("Delete this contact?")) return;
    await fetch(`/api/contacts/lists/${listId}/contacts/${id}`, { method: "DELETE" });
    setContacts((prev) => prev.filter((c) => c.id !== id));
    setTotal((t) => t - 1);
  }

  if (loading && contacts.length === 0) {
    return <div className="py-12 flex justify-center"><RefreshCw className="w-6 h-6 text-indigo-500 animate-spin" /></div>;
  }

  if (contacts.length === 0 && !search) {
    return (
      <div className="space-y-6">
        <div className="bg-white border border-gray-200 rounded-2xl flex flex-col items-center justify-center py-12 text-center shadow-sm">
          <h3 className="text-lg font-bold text-[#111827] mb-6">How would you like to get contacts into your list?</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 px-6 w-full max-w-xl">
            {/* Add Contact */}
            <div onClick={onAddContact} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-indigo-200 transition cursor-pointer text-center">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto mb-3">
                <UserPlus className="w-6 h-6" />
              </div>
              <h4 className="font-semibold text-[#111827]">Add Contacts</h4>
              <p className="text-xs text-[#6B7280] mt-1 mb-4">Add manually</p>
              <span className="text-xs font-semibold text-indigo-600">Add New</span>
            </div>
            {/* Import CSV */}
            <div onClick={onImportCSV} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-indigo-200 transition cursor-pointer text-center">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto mb-3">
                <Upload className="w-6 h-6" />
              </div>
              <h4 className="font-semibold text-[#111827]">Import Contacts</h4>
              <p className="text-xs text-[#6B7280] mt-1 mb-4">Drag & drop CSV or Excel</p>
              <span className="text-xs font-semibold text-indigo-600">Import File</span>
            </div>
          </div>
          <div className="mt-8 text-sm text-[#6B7280] cursor-pointer hover:text-[#111827] transition" onClick={() => window.history.back()}>
            I'll add them later →
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
      {/* Toolbar */}
      <div className="p-4 border-b border-gray-200 flex flex-col sm:flex-row gap-3 justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
          <input type="text" placeholder="Search contacts..." value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm text-[#111827] placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 focus:outline-none transition shadow-sm" />
        </div>
        <div className="flex gap-2">
          <button onClick={onAddContact} className="px-4 py-2 bg-white border border-gray-200 text-[#111827] hover:bg-gray-50 font-semibold text-sm rounded-xl shadow-sm transition">
            + Add Contact
          </button>
          <button onClick={onImportCSV} className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm rounded-xl shadow-sm transition">
            Import CSV
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="text-left px-6 py-3 text-xs font-semibold text-[#6B7280] uppercase tracking-wide">☐</th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-[#6B7280] uppercase tracking-wide">Email</th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-[#6B7280] uppercase tracking-wide">First</th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-[#6B7280] uppercase tracking-wide">Last</th>
              <th className="text-right px-6 py-3 text-xs font-semibold text-[#6B7280] uppercase tracking-wide">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {contacts.map((c) => (
              <tr key={c.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-3 text-[#6B7280]">☐</td>
                <td className="px-6 py-3">
                  <EditableCell value={c.email} onSave={(v) => saveField(c.id, "email", v)} />
                </td>
                <td className="px-6 py-3">
                  <EditableCell value={c.firstName ?? ""} placeholder="First name" onSave={(v) => saveField(c.id, "firstName", v)} />
                </td>
                <td className="px-6 py-3">
                  <EditableCell value={c.lastName ?? ""} placeholder="Last name" onSave={(v) => saveField(c.id, "lastName", v)} />
                </td>
                <td className="px-6 py-3 text-right">
                  <button onClick={() => deleteContact(c.id)} className="text-xs text-red-500 hover:text-red-700 ml-2 font-medium bg-red-50 px-2 py-1 rounded">Del</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {total > 50 && (
        <div className="p-4 border-t border-gray-200 flex items-center justify-between">
          <span className="text-xs text-[#6B7280]">Showing {(page - 1) * 50 + 1} to {Math.min(page * 50, total)} of {total}</span>
          <div className="flex gap-2">
            <button disabled={page === 1} onClick={() => setPage((p) => p - 1)}
              className="px-3 py-1.5 text-xs bg-white border border-gray-200 rounded-lg text-[#111827] disabled:opacity-40 hover:bg-gray-50 transition shadow-sm">
              Prev
            </button>
            <button disabled={page * 50 >= total} onClick={() => setPage((p) => p + 1)}
              className="px-3 py-1.5 text-xs bg-white border border-gray-200 rounded-lg text-[#111827] disabled:opacity-40 hover:bg-gray-50 transition shadow-sm">
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Main Contacts Page ─────────────────────────────────────────────────────

export default function ContactsPage() {
  const [lists, setLists] = useState<ContactList[]>([]);
  const [loadingLists, setLoadingLists] = useState(true);
  const [selectedList, setSelectedList] = useState<ContactList | null>(null);
  const [showCreate, setShowCreate] = useState(false);
  const [showImport, setShowImport] = useState(false);
  const [showAddContact, setShowAddContact] = useState(false);

  async function fetchLists() {
    setLoadingLists(true);
    try {
      const res = await fetch("/api/contacts/lists");
      const data = await res.json();
      setLists(data.lists ?? []);
    } catch { /* ignore */ }
    setLoadingLists(false);
  }

  useEffect(() => { fetchLists(); }, []);

  async function deleteList(id: string) {
    if (!confirm("Delete this list and all its contacts?")) return;
    await fetch(`/api/contacts/lists/${id}`, { method: "DELETE" });
    setLists((prev) => prev.filter((l) => l.id !== id));
    if (selectedList?.id === id) setSelectedList(null);
  }

  function triggerListRefresh(id: string) {
    window.dispatchEvent(new Event(`refresh-list-${id}`));
    fetchLists();
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          {selectedList ? (
            <>
              <button onClick={() => setSelectedList(null)} className="flex items-center gap-1 text-sm text-[#6B7280] hover:text-[#111827] transition font-medium">
                <ArrowLeft className="w-4 h-4" /> All Lists
              </button>
              <h1 className="text-xl font-bold text-[#111827]">{selectedList.name}</h1>
              <span className="bg-gray-100 text-[#6B7280] px-2.5 py-0.5 rounded-full text-xs font-semibold">{selectedList._count.contacts} contacts</span>
            </>
          ) : (
            <h1 className="text-2xl font-bold text-[#111827]">Contacts</h1>
          )}
        </div>
        <div>
          {!selectedList ? (
            <button onClick={() => setShowCreate(true)}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 hover:bg-gray-50 text-[#111827] text-sm font-semibold rounded-xl transition shadow-sm">
              <Plus className="w-4 h-4" /> Create List
            </button>
          ) : (
            <div className="flex gap-2">
              <button onClick={() => setShowAddContact(true)} className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 hover:bg-gray-50 text-[#111827] text-sm font-semibold rounded-xl transition shadow-sm">
                + Add Contact
              </button>
              <button onClick={() => setShowImport(true)} className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 hover:bg-gray-50 text-[#111827] text-sm font-semibold rounded-xl transition shadow-sm">
                Import CSV
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      {selectedList ? (
        <ContactTable 
          listId={selectedList.id} 
          listName={selectedList.name} 
          onAddContact={() => setShowAddContact(true)}
          onImportCSV={() => setShowImport(true)}
        />
      ) : (
        <>
          {/* Search Lists */}
          <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm mb-6 flex items-center gap-3">
            <Search className="w-5 h-5 text-gray-400" />
            <input type="text" placeholder="Search lists..." className="w-full bg-transparent text-sm text-[#111827] focus:outline-none placeholder:text-gray-400" />
          </div>

          {loadingLists ? (
            <div className="flex items-center justify-center py-16">
              <RefreshCw className="w-6 h-6 text-indigo-500 animate-spin" />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {lists.map((list) => (
                <div key={list.id} className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
                  <h3 className="font-bold text-[#111827] mb-2">{list.name}</h3>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-sm font-medium text-[#111827]">{list._count.contacts} contacts</span>
                  </div>
                  <p className="text-xs text-[#6B7280] mb-4">Created {new Date(list.createdAt).toLocaleDateString()}</p>
                  <div className="flex gap-2">
                    <button onClick={() => setSelectedList(list)} className="px-3 py-1.5 text-xs font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition">
                      Open
                    </button>
                    <button onClick={() => deleteList(list.id)} className="px-3 py-1.5 text-xs font-semibold text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition">
                      Delete
                    </button>
                  </div>
                </div>
              ))}
              <div onClick={() => setShowCreate(true)} className="bg-white border border-gray-200 border-dashed rounded-2xl p-5 shadow-sm cursor-pointer hover:border-indigo-300 transition flex flex-col justify-center items-center text-center">
                <Plus className="w-6 h-6 text-[#6B7280] mb-2" />
                <h3 className="font-bold text-[#111827] mb-1">+ New List</h3>
                <p className="text-xs text-[#6B7280]">Create a new contact list</p>
              </div>
            </div>
          )}
        </>
      )}

      {/* Modals */}
      {showCreate && (
        <CreateListModal
          onClose={() => setShowCreate(false)}
          onCreate={(list) => {
            setLists((prev) => [{ ...list, _count: { contacts: 0 } } as ContactList, ...prev]);
            setShowCreate(false);
          }}
        />
      )}
      {showImport && selectedList && (
        <ImportModal
          listId={selectedList.id}
          onClose={() => setShowImport(false)}
          onImported={() => triggerListRefresh(selectedList.id)}
        />
      )}
      {showAddContact && selectedList && (
        <AddContactModal
          listId={selectedList.id}
          onClose={() => setShowAddContact(false)}
          onAdded={() => {
            setShowAddContact(false);
            triggerListRefresh(selectedList.id);
          }}
        />
      )}
    </div>
  );
}
