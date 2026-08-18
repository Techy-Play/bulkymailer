import { redirect } from "next/navigation";
import { requireActiveOrganization } from "@/lib/auth/organization-context";
import { db } from "@/lib/db";
import EmailSettingsClient from "./EmailSettingsClient";

export default async function EmailSettingsPage() {
  const context = await requireActiveOrganization();
  if (!context) {
    return null;
  }

  const { organization } = context;

  const emailConfig = await db.emailProviderConfiguration.findUnique({
    where: { organizationId: organization.id },
  });

  return (
    <div className="max-w-3xl space-y-8">
      <div className="border-b border-gray-200 pb-5">
        <h3 className="text-2xl font-bold leading-6 text-gray-900">Email Delivery</h3>
        <p className="mt-2 text-sm text-gray-500">
          Configure how your emails are sent out. You can use our default high-deliverability Resend setup or plug in your own SMTP server.
        </p>
      </div>
      <EmailSettingsClient initialConfig={emailConfig} />
    </div>
  );
}
