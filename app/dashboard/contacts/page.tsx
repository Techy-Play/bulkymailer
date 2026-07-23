"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  Users, Plus, Upload, Search, Edit2, Trash2, X, Check, ChevronDown,
  Download, RefreshCw, FileText, AlertCircle, CheckCircle2, ArrowLeft,
} from "lucide-react";

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
  customFields: Record<string, string> | null;
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
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#1a1a2e] border border-slate-700 rounded-2xl w-full max-w-md shadow-2xl">
        <div className="flex items-center justify-between p-5 border-b border-slate-700">
          <h2 className="font-bold text-white">New Contact List</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
        </div>
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          {error && (
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-sm text-red-400">
              {error}
            </div>
          )}
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1.5">List Name *</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required
              placeholder="e.g. Newsletter Subscribers"
              className="w-full px-3 py-2.5 bg-slate-800 border border-slate-600 rounded-xl text-white text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none placeholder:text-slate-500" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1.5">Description</label>
            <textarea value={desc} onChange={(e) => setDesc(e.target.value)} rows={2}
              placeholder="Optional description"
              className="w-full px-3 py-2.5 bg-slate-800 border border-slate-600 rounded-xl text-white text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none placeholder:text-slate-500 resize-none" />
          </div>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose}
              className="flex-1 py-2.5 border border-slate-600 text-slate-300 text-sm font-semibold rounded-xl hover:bg-slate-800 transition">
              Cancel
            </button>
            <button type="submit" disabled={loading || !name.trim()}
              className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white text-sm font-semibold rounded-xl transition">
              {loading ? "Creating…" : "Create List"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Import Modal ───────────────────────────────────────────────────────────

function ImportModal({ lists, onClose, onImported }: {
  lists: ContactList[];
  onClose: () => void;
  onImported: (listId: string) => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [listId, setListId] = useState(lists[0]?.id ?? "");
  const [newListName, setNewListName] = useState("");
  const [createNew, setCreateNew] = useState(lists.length === 0);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ imported: number; duplicates: number; listId: string } | null>(null);
  const [error, setError] = useState("");

  async function handleImport() {
    if (!file) return;
    setLoading(true);
    setError("");
    try {
      const fd = new FormData();
      fd.append("file", file);
      if (createNew && newListName.trim()) {
        fd.append("newListName", newListName.trim());
      } else {
        fd.append("listId", listId);
      }
      const res = await fetch("/api/contacts/import", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) { setError(data.error); return; }
      setResult(data);
    } catch {
      setError("Import failed. Try again.");
    } finally {
      setLoading(false);
    }
  }

  if (result) {
    return (
      <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
        <div className="bg-[#1a1a2e] border border-slate-700 rounded-2xl w-full max-w-md shadow-2xl p-6 text-center">
          <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-8 h-8 text-emerald-500" />
          </div>
          <h2 className="text-xl font-bold text-white mb-1">Import Complete!</h2>
          <p className="text-slate-400 text-sm">
            <span className="font-bold text-emerald-400">{result.imported}</span> contacts imported
            {result.duplicates > 0 && (
              <>, <span className="font-bold text-amber-400">{result.duplicates}</span> updated</>
            )}
          </p>
          <button onClick={() => { onImported(result.listId); onClose(); }}
            className="mt-6 w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-xl transition">
            View Contacts →
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#1a1a2e] border border-slate-700 rounded-2xl w-full max-w-md shadow-2xl">
        <div className="flex items-center justify-between p-5 border-b border-slate-700">
          <h2 className="font-bold text-white">Import Contacts</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
        </div>
        <div className="p-5 space-y-4">
          {error && (
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}

          {/* File drop zone */}
          <div
            onClick={() => fileRef.current?.click()}
            className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition ${
              file ? "border-indigo-500 bg-indigo-500/5" : "border-slate-600 hover:border-slate-500"
            }`}
          >
            <input ref={fileRef} type="file" accept=".csv,.xlsx,.xls" className="hidden"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
            <Upload className="w-8 h-8 text-slate-500 mx-auto mb-2" />
            {file ? (
              <p className="text-sm font-semibold text-indigo-400">{file.name}</p>
            ) : (
              <>
                <p className="text-sm text-slate-400">Click to upload CSV or Excel file</p>
                <p className="text-xs text-slate-600 mt-1">Must have an <code className="text-indigo-400">email</code> column</p>
              </>
            )}
          </div>

          {/* List selection */}
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">Add to list</label>
            <div className="flex gap-2 mb-2">
              <button type="button" onClick={() => setCreateNew(false)}
                className={`flex-1 py-2 text-xs font-semibold rounded-lg border transition ${!createNew ? "bg-indigo-600 border-indigo-600 text-white" : "border-slate-600 text-slate-400 hover:border-slate-500"}`}>
                Existing List
              </button>
              <button type="button" onClick={() => setCreateNew(true)}
                className={`flex-1 py-2 text-xs font-semibold rounded-lg border transition ${createNew ? "bg-indigo-600 border-indigo-600 text-white" : "border-slate-600 text-slate-400 hover:border-slate-500"}`}>
                New List
              </button>
            </div>
            {createNew ? (
              <input type="text" value={newListName} onChange={(e) => setNewListName(e.target.value)}
                placeholder="List name"
                className="w-full px-3 py-2.5 bg-slate-800 border border-slate-600 rounded-xl text-white text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none placeholder:text-slate-500" />
            ) : (
              <select value={listId} onChange={(e) => setListId(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-800 border border-slate-600 rounded-xl text-white text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none">
                {lists.map((l) => (
                  <option key={l.id} value={l.id}>{l.name} ({l._count.contacts} contacts)</option>
                ))}
              </select>
            )}
          </div>

          <div className="flex gap-3 pt-1">
            <button type="button" onClick={onClose}
              className="flex-1 py-2.5 border border-slate-600 text-slate-300 text-sm font-semibold rounded-xl hover:bg-slate-800 transition">
              Cancel
            </button>
            <button onClick={handleImport}
              disabled={loading || !file || (createNew && !newListName.trim()) || (!createNew && !listId)}
              className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white text-sm font-semibold rounded-xl transition">
              {loading ? "Importing…" : "Import"}
            </button>
          </div>
        </div>
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
      <input autoFocus type="text" value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={commit}
        onKeyDown={(e) => { if (e.key === "Enter") commit(); if (e.key === "Escape") { setDraft(value); setEditing(false); } }}
        className="w-full bg-indigo-950 border border-indigo-500 text-white text-xs px-2 py-1 rounded-lg outline-none"
      />
    );
  }

  return (
    <span
      onClick={() => { setDraft(value); setEditing(true); }}
      className="cursor-pointer hover:text-indigo-400 transition text-xs group flex items-center gap-1"
      title="Click to edit"
    >
      {value || <span className="text-slate-600">{placeholder}</span>}
      <Edit2 className="w-2.5 h-2.5 text-slate-600 group-hover:text-indigo-400 transition shrink-0" />
    </span>
  );
}

// ─── Contact Table ──────────────────────────────────────────────────────────

function ContactTable({ listId, listName }: { listId: string; listName: string }) {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [addRow, setAddRow] = useState(false);
  const [newContact, setNewContact] = useState({ email: "", firstName: "", lastName: "", phone: "" });
  const [addError, setAddError] = useState("");

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

  async function saveField(id: string, field: string, value: string) {
    await fetch(`/api/contacts/lists/${listId}/contacts`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, [field]: value }),
    });
    setContacts((prev) => prev.map((c) => c.id === id ? { ...c, [field]: value } : c));
  }

  async function deleteContact(id: string) {
    await fetch(`/api/contacts/lists/${listId}/contacts`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contactId: id }),
    });
    setContacts((prev) => prev.filter((c) => c.id !== id));
    setTotal((t) => t - 1);
  }

  async function addContact() {
    if (!newContact.email) { setAddError("Email is required"); return; }
    setAddError("");
    const res = await fetch(`/api/contacts/lists/${listId}/contacts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newContact),
    });
    const data = await res.json();
    if (!res.ok) { setAddError(data.error); return; }
    setContacts((prev) => [data.contact, ...prev]);
    setTotal((t) => t + 1);
    setNewContact({ email: "", firstName: "", lastName: "", phone: "" });
    setAddRow(false);
  }

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
          <input type="text" placeholder="Search contacts…" value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="w-full pl-9 pr-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white placeholder:text-slate-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none" />
        </div>
        <div className="flex gap-2">
          <button onClick={() => fetchContacts()}
            className="flex items-center gap-2 px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-sm text-slate-300 hover:bg-slate-700 transition">
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
          <button onClick={() => setAddRow(true)}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-xl transition">
            <Plus className="w-4 h-4" /> Add
          </button>
        </div>
      </div>

      <p className="text-xs text-slate-500">{total} contacts · Click any cell to edit</p>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-slate-800">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-900 border-b border-slate-800">
              <th className="text-left px-4 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wide">Email</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wide">First Name</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wide">Last Name</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wide">Phone</th>
              <th className="px-4 py-3 w-10"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {/* Add row */}
            {addRow && (
              <tr className="bg-indigo-950/30">
                <td className="px-4 py-2">
                  <input type="email" placeholder="email@example.com" value={newContact.email}
                    onChange={(e) => setNewContact((p) => ({ ...p, email: e.target.value }))}
                    className="w-full bg-slate-800 border border-indigo-500 text-white text-xs px-2 py-1.5 rounded-lg outline-none" />
                  {addError && <p className="text-[10px] text-red-400 mt-0.5">{addError}</p>}
                </td>
                {(["firstName", "lastName", "phone"] as const).map((f) => (
                  <td key={f} className="px-4 py-2">
                    <input type="text" placeholder="—" value={newContact[f]}
                      onChange={(e) => setNewContact((p) => ({ ...p, [f]: e.target.value }))}
                      className="w-full bg-slate-800 border border-slate-600 text-white text-xs px-2 py-1.5 rounded-lg outline-none" />
                  </td>
                ))}
                <td className="px-4 py-2">
                  <div className="flex gap-1">
                    <button onClick={addContact} className="p-1 text-emerald-400 hover:text-emerald-300"><Check className="w-4 h-4" /></button>
                    <button onClick={() => { setAddRow(false); setAddError(""); }} className="p-1 text-slate-400 hover:text-red-400"><X className="w-4 h-4" /></button>
                  </div>
                </td>
              </tr>
            )}
            {loading ? (
              <tr><td colSpan={5} className="px-4 py-8 text-center text-slate-500 text-sm">Loading…</td></tr>
            ) : contacts.length === 0 ? (
              <tr><td colSpan={5} className="px-4 py-10 text-center text-slate-500 text-sm">No contacts found. Import a CSV or add manually.</td></tr>
            ) : (
              contacts.map((c) => (
                <tr key={c.id} className="hover:bg-slate-800/30 transition">
                  <td className="px-4 py-2.5">
                    <EditableCell value={c.email} onSave={(v) => saveField(c.id, "email", v)} />
                  </td>
                  <td className="px-4 py-2.5">
                    <EditableCell value={c.firstName ?? ""} placeholder="Add first name" onSave={(v) => saveField(c.id, "firstName", v)} />
                  </td>
                  <td className="px-4 py-2.5">
                    <EditableCell value={c.lastName ?? ""} placeholder="Add last name" onSave={(v) => saveField(c.id, "lastName", v)} />
                  </td>
                  <td className="px-4 py-2.5">
                    <EditableCell value={c.phone ?? ""} placeholder="Add phone" onSave={(v) => saveField(c.id, "phone", v)} />
                  </td>
                  <td className="px-4 py-2.5">
                    <button onClick={() => deleteContact(c.id)}
                      className="p-1 text-slate-600 hover:text-red-400 transition">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {total > 50 && (
        <div className="flex items-center gap-2 justify-center">
          <button disabled={page === 1} onClick={() => setPage((p) => p - 1)}
            className="px-3 py-1.5 text-xs bg-slate-800 border border-slate-700 rounded-lg text-slate-300 disabled:opacity-40 hover:bg-slate-700 transition">
            Previous
          </button>
          <span className="text-xs text-slate-400">Page {page} of {Math.ceil(total / 50)}</span>
          <button disabled={page * 50 >= total} onClick={() => setPage((p) => p + 1)}
            className="px-3 py-1.5 text-xs bg-slate-800 border border-slate-700 rounded-lg text-slate-300 disabled:opacity-40 hover:bg-slate-700 transition">
            Next
          </button>
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          {selectedList ? (
            <button onClick={() => setSelectedList(null)} className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition mb-1">
              <ArrowLeft className="w-4 h-4" /> All Lists
            </button>
          ) : null}
          <h1 className="text-2xl font-extrabold text-white">
            {selectedList ? selectedList.name : "Contacts"}
          </h1>
          <p className="text-sm text-slate-400 mt-0.5">
            {selectedList ? (selectedList.description ?? "Manage and edit your contacts") : "Manage your contact lists"}
          </p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setShowImport(true)}
            className="flex items-center gap-2 px-4 py-2 bg-slate-800 border border-slate-700 hover:bg-slate-700 text-slate-300 text-sm font-semibold rounded-xl transition">
            <Upload className="w-4 h-4" /> Import CSV/Excel
          </button>
          {!selectedList && (
            <button onClick={() => setShowCreate(true)}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-xl transition">
              <Plus className="w-4 h-4" /> New List
            </button>
          )}
        </div>
      </div>

      {/* List grid or Contact table */}
      {selectedList ? (
        <ContactTable listId={selectedList.id} listName={selectedList.name} />
      ) : (
        <>
          {loadingLists ? (
            <div className="flex items-center justify-center py-16">
              <RefreshCw className="w-6 h-6 text-indigo-500 animate-spin" />
            </div>
          ) : lists.length === 0 ? (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl flex flex-col items-center justify-center py-16 text-center">
              <div className="w-14 h-14 rounded-2xl bg-slate-800 flex items-center justify-center mb-4">
                <Users className="w-7 h-7 text-slate-600" />
              </div>
              <p className="text-slate-400 font-medium">No contact lists yet</p>
              <p className="text-sm text-slate-600 mt-1 max-w-xs">Create a list and import your contacts via CSV or Excel.</p>
              <div className="flex gap-3 mt-5">
                <button onClick={() => setShowImport(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-slate-800 border border-slate-700 text-slate-300 text-sm font-semibold rounded-xl hover:bg-slate-700 transition">
                  <Upload className="w-4 h-4" /> Import CSV
                </button>
                <button onClick={() => setShowCreate(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-xl transition">
                  <Plus className="w-4 h-4" /> New List
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {lists.map((list) => (
                <div key={list.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 hover:border-indigo-500/50 transition group">
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                      <Users className="w-5 h-5 text-indigo-400" />
                    </div>
                    <button onClick={() => deleteList(list.id)}
                      className="opacity-0 group-hover:opacity-100 p-1 text-slate-600 hover:text-red-400 transition">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <h3 className="font-bold text-white text-sm">{list.name}</h3>
                  {list.description && <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">{list.description}</p>}
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-2xl font-extrabold text-indigo-400">{list._count.contacts.toLocaleString()}</span>
                    <span className="text-xs text-slate-500">contacts</span>
                  </div>
                  <button onClick={() => setSelectedList(list)}
                    className="mt-3 w-full py-2 text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-xl transition">
                    View & Edit →
                  </button>
                </div>
              ))}
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
      {showImport && (
        <ImportModal
          lists={lists}
          onClose={() => setShowImport(false)}
          onImported={(listId) => {
            fetchLists();
            const found = lists.find((l) => l.id === listId);
            if (found) setSelectedList(found);
          }}
        />
      )}
    </div>
  );
}
