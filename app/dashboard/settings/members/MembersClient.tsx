"use client";

import { useState } from "react";
import { toast } from "sonner";
import { User, Mail, Shield, Trash2, MoreVertical, Loader2, Play, Pause, Crown } from "lucide-react";

type Member = any; // simplified for now
type Invitation = any; // simplified for now

export default function MembersClient({ orgId, currentUserId, currentUserRole, initialMemberships, initialInvitations }: any) {
  const [memberships, setMemberships] = useState<Member[]>(initialMemberships);
  const [invitations, setInvitations] = useState<Invitation[]>(initialInvitations);
  
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState("VIEWER");
  const [isInviting, setIsInviting] = useState(false);

  const [loadingAction, setLoadingAction] = useState<string | null>(null);

  const isAdminOrOwner = currentUserRole === "OWNER" || currentUserRole === "ADMIN";
  
  // Can only assign roles lower or equal to own (simplified UI check, backend enforces strictly)
  const availableRoles = ["OWNER", "ADMIN", "MARKETING_MANAGER", "CAMPAIGN_MANAGER", "CONTENT_MANAGER", "SALES", "ANALYST", "VIEWER"];
  
  async function handleInvite(e: React.FormEvent) {
    e.preventDefault();
    setIsInviting(true);
    try {
      const res = await fetch(`/api/organizations/${orgId}/invitations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: inviteEmail, role: inviteRole }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to invite");
      toast.success("Invitation sent successfully");
      setInviteEmail("");
      
      // refresh invitations
      const refresh = await fetch(`/api/organizations/${orgId}/invitations`);
      const refreshData = await refresh.json();
      if (refreshData.invitations) setInvitations(refreshData.invitations);
      
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setIsInviting(false);
    }
  }

  async function handleMemberAction(userId: string, action: string, role?: string) {
    if (!confirm(`Are you sure you want to ${action.toLowerCase().replace("_", " ")} this member?`)) return;
    
    setLoadingAction(userId + action);
    try {
      const res = await fetch(`/api/organizations/${orgId}/members/${userId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, role }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error);
      }
      toast.success(`Member successfully updated`);
      // quick local refresh hack for now
      window.location.reload();
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoadingAction(null);
    }
  }

  async function handleTransferOwnership(userId: string) {
    if (!confirm("Are you absolutely sure you want to transfer ownership? You will be demoted to ADMIN.")) return;
    setLoadingAction(userId + "TRANSFER");
    try {
      const res = await fetch(`/api/organizations/${orgId}/members/${userId}/transfer-ownership`, {
        method: "POST"
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error);
      }
      toast.success(`Ownership transferred successfully`);
      window.location.reload();
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoadingAction(null);
    }
  }

  async function handleInvitationAction(invId: string, action: "resend" | "revoke") {
    setLoadingAction(invId + action);
    try {
      const res = await fetch(`/api/organizations/${orgId}/invitations/${invId}/${action}`, {
        method: "POST"
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error);
      }
      toast.success(`Invitation ${action === "resend" ? "resent" : "revoked"} successfully`);
      window.location.reload();
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoadingAction(null);
    }
  }

  return (
    <div className="space-y-12">
      {/* Active Members */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Active Members</h3>
        </div>
        <ul className="divide-y divide-gray-200">
          {memberships.map((m: any) => (
            <li key={m.id} className="p-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold">
                  {m.user.firstName[0]}
                </div>
                <div>
                  <p className="font-medium text-gray-900">{m.user.firstName} {m.user.lastName} {m.user.id === currentUserId && "(You)"}</p>
                  <p className="text-sm text-gray-500">{m.user.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${m.status === "ACTIVE" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                  {m.status}
                </span>
                
                {isAdminOrOwner && m.user.id !== currentUserId ? (
                  <select
                    className="text-sm border-gray-300 rounded-md"
                    value={m.role}
                    onChange={(e) => handleMemberAction(m.user.id, "CHANGE_ROLE", e.target.value)}
                    disabled={loadingAction !== null}
                  >
                    {availableRoles.map(r => (
                      <option key={r} value={r}>{r.replace("_", " ")}</option>
                    ))}
                  </select>
                ) : (
                  <span className="text-sm font-medium text-gray-600 px-3 py-1 bg-gray-100 rounded-md">
                    {m.role.replace("_", " ")}
                  </span>
                )}

                {/* Actions Dropdown / Buttons */}
                {isAdminOrOwner && m.user.id !== currentUserId && (
                  <div className="flex items-center gap-2">
                    {m.status === "ACTIVE" ? (
                      <button onClick={() => handleMemberAction(m.user.id, "SUSPEND")} className="text-gray-400 hover:text-yellow-600 p-1" title="Suspend">
                        <Pause className="w-4 h-4" />
                      </button>
                    ) : (
                      <button onClick={() => handleMemberAction(m.user.id, "REACTIVATE")} className="text-gray-400 hover:text-green-600 p-1" title="Reactivate">
                        <Play className="w-4 h-4" />
                      </button>
                    )}
                    <button onClick={() => handleMemberAction(m.user.id, "REMOVE")} className="text-gray-400 hover:text-red-600 p-1" title="Remove">
                      <Trash2 className="w-4 h-4" />
                    </button>
                    
                    {currentUserRole === "OWNER" && m.status === "ACTIVE" && m.role === "ADMIN" && (
                      <button onClick={() => handleTransferOwnership(m.user.id)} className="text-gray-400 hover:text-indigo-600 p-1" title="Transfer Ownership">
                        <Crown className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Invitations */}
      {isAdminOrOwner && (
        <>
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Pending Invitations</h3>
            </div>
            {invitations.length === 0 ? (
              <div className="p-6 text-center text-sm text-gray-500">No pending invitations.</div>
            ) : (
              <ul className="divide-y divide-gray-200">
                {invitations.map((inv: any) => (
                  <li key={inv.id} className="p-6 flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">{inv.email}</p>
                      <p className="text-sm text-gray-500">Invited by {inv.invitedBy.firstName} as {inv.role.replace("_", " ")}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${inv.status === "PENDING" ? "bg-yellow-100 text-yellow-800" : "bg-gray-100 text-gray-800"}`}>
                        {inv.status}
                      </span>
                      {inv.status === "PENDING" && (
                        <div className="flex gap-2">
                          <button onClick={() => handleInvitationAction(inv.id, "resend")} className="text-sm text-indigo-600 font-medium hover:text-indigo-800">
                            Resend
                          </button>
                          <button onClick={() => handleInvitationAction(inv.id, "revoke")} className="text-sm text-red-600 font-medium hover:text-red-800">
                            Revoke
                          </button>
                        </div>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Invite Form */}
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Invite New Member</h3>
            <form onSubmit={handleInvite} className="flex gap-4 items-end">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input 
                  type="email" 
                  required 
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-indigo-500 focus:border-indigo-500" 
                  placeholder="colleague@company.com" 
                />
              </div>
              <div className="w-48">
                <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                <select 
                  value={inviteRole}
                  onChange={(e) => setInviteRole(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-indigo-500 focus:border-indigo-500"
                >
                  {availableRoles.filter(r => r !== "OWNER").map(r => (
                    <option key={r} value={r}>{r.replace("_", " ")}</option>
                  ))}
                </select>
              </div>
              <button 
                type="submit" 
                disabled={isInviting}
                className="bg-indigo-600 text-white px-4 py-2 rounded-md font-medium text-sm hover:bg-indigo-700 transition disabled:opacity-50"
              >
                {isInviting ? "Inviting..." : "Send Invite"}
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
}
