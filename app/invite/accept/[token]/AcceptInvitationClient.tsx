"use client";

import { useState } from "react";
import { acceptInvitationAction } from "./actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Building, ArrowRight, Loader2, Mail, Lock, User } from "lucide-react";

type Props = {
  invitation: {
    id: string;
    email: string;
    role: string;
    organizationName: string;
    inviterName: string;
  };
  isLoggedIn: boolean;
  token: string;
};

export default function AcceptInvitationClient({ invitation, isLoggedIn, token }: Props) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleAccept(formData?: FormData) {
    setLoading(true);
    try {
      const result = await acceptInvitationAction(token, formData);
      if (result.error) {
        toast.error(result.error);
        setLoading(false);
        return;
      }
      
      toast.success("Invitation accepted successfully!");
      router.push("/dashboard");
    } catch (err: any) {
      toast.error(err.message || "Failed to accept invitation");
      setLoading(false);
    }
  }

  if (isLoggedIn) {
    return (
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 max-w-md w-full">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 text-indigo-600 mb-4">
            <Building className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Join {invitation.organizationName}</h1>
          <p className="text-gray-500 mt-2">
            You've been invited by <strong>{invitation.inviterName}</strong> to join as a <strong>{invitation.role.replace("_", " ")}</strong>.
          </p>
        </div>

        <button
          onClick={() => handleAccept()}
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-4 rounded-xl font-medium transition disabled:opacity-50"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Accept Invitation"}
          {!loading && <ArrowRight className="w-5 h-5" />}
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 max-w-md w-full">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 text-indigo-600 mb-4">
          <Building className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Join {invitation.organizationName}</h1>
        <p className="text-gray-500 mt-2">
          Create an account to accept the invitation from <strong>{invitation.inviterName}</strong>.
        </p>
      </div>

      <form action={handleAccept} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="email"
              value={invitation.email}
              readOnly
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-500 cursor-not-allowed focus:outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
            <div className="relative">
              <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                name="firstName"
                required
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 outline-none"
                placeholder="John"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
            <input
              type="text"
              name="lastName"
              required
              className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 outline-none"
              placeholder="Doe"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="password"
              name="password"
              required
              minLength={8}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 outline-none"
              placeholder="••••••••"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-4 rounded-xl font-medium transition disabled:opacity-50 mt-6"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Create Account & Join"}
          {!loading && <ArrowRight className="w-5 h-5" />}
        </button>
      </form>
    </div>
  );
}
