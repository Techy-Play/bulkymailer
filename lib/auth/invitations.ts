import { randomBytes, createHash } from "crypto";
import { db } from "@/lib/db";
import { getFromHeader } from "@/lib/mailer";
import { Resend } from "resend";

const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;
const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

/**
 * Generates a secure random token and its corresponding SHA-256 hash.
 */
export function generateInvitationToken() {
  const rawToken = randomBytes(32).toString("hex");
  const tokenHash = createHash("sha256").update(rawToken).digest("hex");
  return { rawToken, tokenHash };
}

/**
 * Sends the invitation email to the recipient with the single-use raw token URL.
 */
export async function sendInvitationEmail(
  to: string,
  inviterName: string,
  organizationName: string,
  role: string,
  rawToken: string
): Promise<void> {
  const acceptUrl = `${APP_URL}/invite/accept/${rawToken}`;
  const subject = `${inviterName} invited you to join ${organizationName} on BulkyMailer`;
  const fromHeader = getFromHeader();
  
  const textContent = `Hi there,\n\n${inviterName} has invited you to join ${organizationName} as a ${role.replace("_", " ")} on BulkyMailer.\n\nClick the link below to accept the invitation:\n${acceptUrl}\n\nThis invitation will expire in 7 days.\n\n— BulkyMailer Team`;

  if (resend) {
    const { error } = await resend.emails.send({
      from: fromHeader,
      replyTo: "support@send.au-acadex.com",
      to,
      subject,
      text: textContent,
      html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>You've been invited to join ${organizationName}</title>
</head>
<body style="margin:0;padding:0;background:#f9fafb;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#111827;">
  <div style="max-w-md;margin:0 auto;padding:40px 20px;">
    <div style="background:#ffffff;padding:32px;border-radius:12px;box-shadow:0 1px 3px rgba(0,0,0,0.1);text-align:center;">
      <h1 style="font-size:20px;font-weight:700;margin-bottom:16px;">You're Invited!</h1>
      <p style="font-size:15px;line-height:1.6;margin-bottom:24px;color:#4b5563;">
        <strong>${inviterName}</strong> has invited you to join <strong>${organizationName}</strong> as a <strong>${role.replace("_", " ")}</strong> on BulkyMailer.
      </p>
      <a href="${acceptUrl}" style="display:inline-block;padding:12px 28px;background:#4f46e5;color:#ffffff;text-decoration:none;border-radius:6px;font-weight:600;font-size:15px;">
        Accept Invitation
      </a>
      <p style="font-size:13px;color:#6b7280;margin-top:24px;line-height:1.5;">
        This invitation will expire in 7 days.<br>
        If you didn't expect this invitation, you can safely ignore this email.
      </p>
    </div>
    <div style="margin-top:24px;font-size:12px;color:#9ca3af;text-align:center;">
      BulkyMailer Team
    </div>
  </div>
</body>
</html>`
    });

    if (error) {
      console.error("[sendInvitationEmail_error]", error);
      throw new Error(error.message);
    }
  } else {
    // If running locally without Resend, just log it.
    console.log(`[LOCAL DEV] Invitation email to ${to}: ${acceptUrl}`);
  }
}
