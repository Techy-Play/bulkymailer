"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Loader2, Mail, Server, TestTube } from "lucide-react";

export default function EmailSettingsClient({ initialConfig }: { initialConfig: any }) {
  const [provider, setProvider] = useState(initialConfig?.provider || "RESEND");
  const [smtpHost, setSmtpHost] = useState(initialConfig?.smtpHost || "");
  const [smtpPort, setSmtpPort] = useState(initialConfig?.smtpPort?.toString() || "");
  const [smtpUsername, setSmtpUsername] = useState(initialConfig?.smtpUsername || "");
  const [smtpPassword, setSmtpPassword] = useState("");
  const [smtpSecure, setSmtpSecure] = useState(initialConfig?.smtpSecure ?? true);
  
  const [fromName, setFromName] = useState(initialConfig?.fromName || "");
  const [fromEmail, setFromEmail] = useState(initialConfig?.fromEmail || "");
  const [replyTo, setReplyTo] = useState(initialConfig?.replyTo || "");
  const [enabled, setEnabled] = useState(initialConfig?.enabled ?? true);

  const [saving, setSaving] = useState(false);
  const [testingConnection, setTestingConnection] = useState(false);
  const [testingEmail, setTestingEmail] = useState(false);
  const [testEmailAddress, setTestEmailAddress] = useState("");

  const handleSave = async () => {
    if (provider === "SMTP") {
      if (!smtpHost || !smtpPort || !smtpUsername || (!initialConfig?.encryptedSmtpPassword && !smtpPassword)) {
        toast.error("Please fill in all SMTP fields (Host, Port, Username, Password) before saving.");
        return;
      }
    }

    setSaving(true);
    try {
      const res = await fetch("/api/settings/email", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          provider,
          smtpHost,
          smtpPort: smtpPort ? parseInt(smtpPort, 10) : null,
          smtpUsername,
          smtpPassword,
          smtpSecure,
          fromName,
          fromEmail,
          replyTo,
          enabled
        }),
      });

      if (!res.ok) {
        throw new Error(await res.text());
      }
      
      toast.success("Email configuration saved successfully.");
      setSmtpPassword(""); 
    } catch (error: any) {
      toast.error(error.message || "Failed to save configuration.");
    } finally {
      setSaving(false);
    }
  };

  const handleTestConnection = async () => {
    setTestingConnection(true);
    try {
      const res = await fetch("/api/settings/email/test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || data.message || "Connection failed.");
      }
      toast.success(data.message || "Connection successful!");
    } catch (error: any) {
      toast.error(error.message || "Connection failed.");
    } finally {
      setTestingConnection(false);
    }
  };

  const handleSendTestEmail = async () => {
    if (!testEmailAddress) {
      toast.error("Please enter a test email address.");
      return;
    }
    setTestingEmail(true);
    try {
      const res = await fetch("/api/settings/email/test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ testEmailAddress }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || data.message || "Failed to send test email.");
      }
      toast.success(data.message || "Test email sent!");
    } catch (error: any) {
      toast.error(error.message || "Failed to send test email.");
    } finally {
      setTestingEmail(false);
    }
  };

  return (
    <div className="space-y-6 mt-6">
      {/* Provider Selection */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Email Provider</h4>
        <div className="flex gap-4">
          <label className={`flex-1 flex flex-col items-center justify-center border-2 rounded-xl p-4 cursor-pointer transition-colors ${provider === 'RESEND' ? 'border-indigo-600 bg-indigo-50/50' : 'border-gray-200 hover:border-indigo-200'}`}>
            <input type="radio" name="provider" value="RESEND" checked={provider === 'RESEND'} onChange={() => setProvider('RESEND')} className="sr-only" />
            <Mail className={`w-8 h-8 mb-2 ${provider === 'RESEND' ? 'text-indigo-600' : 'text-gray-400'}`} />
            <span className={`font-medium ${provider === 'RESEND' ? 'text-indigo-900' : 'text-gray-600'}`}>Resend</span>
          </label>
          <label className={`flex-1 flex flex-col items-center justify-center border-2 rounded-xl p-4 cursor-pointer transition-colors ${provider === 'SMTP' ? 'border-indigo-600 bg-indigo-50/50' : 'border-gray-200 hover:border-indigo-200'}`}>
            <input type="radio" name="provider" value="SMTP" checked={provider === 'SMTP'} onChange={() => setProvider('SMTP')} className="sr-only" />
            <Server className={`w-8 h-8 mb-2 ${provider === 'SMTP' ? 'text-indigo-600' : 'text-gray-400'}`} />
            <span className={`font-medium ${provider === 'SMTP' ? 'text-indigo-900' : 'text-gray-600'}`}>Custom SMTP</span>
          </label>
        </div>
      </div>

      {/* SMTP Configuration */}
      {provider === 'SMTP' && (
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-4">
          <h4 className="text-lg font-semibold text-gray-900 mb-2">SMTP Settings</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">SMTP Host</label>
              <input type="text" value={smtpHost} onChange={e => setSmtpHost(e.target.value)} className="w-full border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2 border" placeholder="smtp.example.com" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">SMTP Port</label>
              <input type="number" value={smtpPort} onChange={e => setSmtpPort(e.target.value)} className="w-full border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2 border" placeholder="587" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
              <input type="text" value={smtpUsername} onChange={e => setSmtpUsername(e.target.value)} className="w-full border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2 border" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input type="password" value={smtpPassword} onChange={e => setSmtpPassword(e.target.value)} className="w-full border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2 border" placeholder={initialConfig?.encryptedSmtpPassword ? "••••••••" : ""} />
            </div>
          </div>
          <div className="flex items-center mt-4">
            <input id="smtpSecure" type="checkbox" checked={smtpSecure} onChange={e => setSmtpSecure(e.target.checked)} className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
            <label htmlFor="smtpSecure" className="ml-2 block text-sm text-gray-900">
              Use Secure Connection (TLS/SSL)
            </label>
          </div>
        </div>
      )}

      {/* Default Sender Identity */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-4">
        <h4 className="text-lg font-semibold text-gray-900 mb-2">Default Sender Identity</h4>
        <p className="text-sm text-gray-500 mb-4">Fallback identity if not specified in the campaign.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">From Name</label>
            <input type="text" value={fromName} onChange={e => setFromName(e.target.value)} className="w-full border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2 border" placeholder="Acme Corp" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">From Email</label>
            <input type="email" value={fromEmail} onChange={e => setFromEmail(e.target.value)} className="w-full border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2 border" placeholder="noreply@example.com" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Reply-To Email</label>
            <input type="email" value={replyTo} onChange={e => setReplyTo(e.target.value)} className="w-full border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2 border" placeholder="support@example.com" />
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row items-center gap-4 border-t border-gray-200 pt-6">
        <button
          onClick={handleSave}
          disabled={saving}
          className="w-full sm:w-auto inline-flex justify-center items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          {saving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
          Save Configuration
        </button>

        <button
          onClick={handleTestConnection}
          disabled={testingConnection}
          className="w-full sm:w-auto inline-flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          {testingConnection && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
          Test Connection
        </button>
      </div>

      {/* Test Email Section */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 shadow-sm mt-6">
        <h4 className="text-sm font-semibold text-gray-900 mb-2">Send Test Email</h4>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            value={testEmailAddress}
            onChange={e => setTestEmailAddress(e.target.value)}
            className="flex-1 border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2 border"
            placeholder="test@example.com"
          />
          <button
            onClick={handleSendTestEmail}
            disabled={testingEmail}
            className="inline-flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            {testingEmail && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            <TestTube className="w-4 h-4 mr-2" />
            Send Test
          </button>
        </div>
      </div>
    </div>
  );
}
