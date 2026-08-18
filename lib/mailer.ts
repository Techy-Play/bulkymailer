import nodemailer from "nodemailer";
import { Resend } from "resend";
import { decrypt } from "./encryption";

export interface ProviderConfig {
  provider: "RESEND" | "SMTP";
  smtpHost?: string | null;
  smtpPort?: number | null;
  smtpUsername?: string | null;
  encryptedSmtpPassword?: string | null;
  smtpSecure?: boolean;
  fromName?: string | null;
  fromEmail?: string | null;
  replyTo?: string | null;
}

export interface SenderIdentity {
  fromName: string;
  fromEmail: string;
  replyTo?: string | null;
}

const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

const smtpPass = process.env.SMTP_PASS ? process.env.SMTP_PASS.replace(/\s+/g, "") : "";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: Number(process.env.SMTP_PORT ?? 587),
  secure: Number(process.env.SMTP_PORT) === 465,
  auth: {
    user: process.env.SMTP_USER,
    pass: smtpPass,
  },
});

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
const VERIFIED_DOMAIN = "send.au-acadex.com";

/**
 * Robust Merge Tag Parser & Replacer
 */
export function renderTemplateMergeTags(
  html: string,
  vars: {
    firstName?: string;
    lastName?: string;
    email?: string;
    company?: string;
    unsubscribeUrl?: string;
    customFields?: Record<string, any>;
  }
): string {
  const currentYear = new Date().getFullYear().toString();
  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  let rendered = html;

  rendered = rendered.replace(/\{\{\s*(?:currentYear|current_year|year|now|date)\s*(?:\|\s*date:[^}]*)?\s*\}\}/gi, currentYear);
  rendered = rendered.replace(/\{\{\s*(?:currentDate|current_date|today)\s*\}\}/gi, currentDate);

  rendered = rendered.replace(/\{\{\s*firstName(?:\s*\|\s*default:\s*(?:"([^"]*)"|'([^']*)'|([^}\s]+)))?\s*\}\}/gi, (_, d1, d2, d3) => {
    const defaultVal = d1 || d2 || d3 || "";
    return vars.firstName?.trim() ? vars.firstName : (defaultVal || "there");
  });

  rendered = rendered.replace(/\{\{\s*lastName(?:\s*\|\s*default:\s*(?:"([^"]*)"|'([^']*)'|([^}\s]+)))?\s*\}\}/gi, (_, d1, d2, d3) => {
    const defaultVal = d1 || d2 || d3 || "";
    return vars.lastName?.trim() ? vars.lastName : defaultVal;
  });

  rendered = rendered.replace(/\{\{\s*company(?:\s*\|\s*default:\s*(?:"([^"]*)"|'([^']*)'|([^}\s]+)))?\s*\}\}/gi, (_, d1, d2, d3) => {
    const defaultVal = d1 || d2 || d3 || "BulkyMailer";
    return vars.company?.trim() ? vars.company : defaultVal;
  });

  rendered = rendered.replace(/\{\{\s*email\s*\}\}/gi, vars.email || "");

  if (vars.unsubscribeUrl) {
    rendered = rendered.replace(/\{\{\s*unsubscribeUrl\s*\}\}/gi, vars.unsubscribeUrl);
  }

  if (vars.customFields) {
    Object.entries(vars.customFields).forEach(([k, v]) => {
      const reg = new RegExp(`\\{\\{\\s*(?:custom\\.|customFields\\.)?${k}\\s*\\}\\}`, 'gi');
      rendered = rendered.replace(reg, String(v || ''));
    });
  }

  rendered = rendered.replace(/\{\{\s*[^}]*date:\s*(?:"%Y"|'%Y'|"%y"|'%y')\s*\}\}/gi, currentYear);

  return rendered;
}

/**
 * Gets a clean, SPF/DKIM aligned FROM address matching verified domain send.au-acadex.com
 */
export function getFromHeader(fromOverride?: string | null): string {
  if (fromOverride && fromOverride.trim()) {
    let name = "BulkyMailer";
    let email = fromOverride.trim();

    if (fromOverride.includes("<")) {
      const match = fromOverride.match(/^"?(.*?)"?\s*<([^>]+)>/);
      if (match) {
        name = match[1] || "BulkyMailer";
        email = match[2];
      }
    }

    if (!email.endsWith(`@${VERIFIED_DOMAIN}`)) {
      const localPart = email.split("@")[0] || "hello";
      email = `${localPart}@${VERIFIED_DOMAIN}`;
    }

    return `"${name}" <${email}>`;
  }

  const envFrom = process.env.RESEND_FROM;
  if (envFrom) return envFrom;

  return `"BulkyMailer" <hello@${VERIFIED_DOMAIN}>`;
}

/**
 * Converts HTML content to plain text to provide a mandatory multipart text stream.
 */
function htmlToPlainText(html: string): string {
  return html
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<br\s*[\/]?>/gi, "\n")
    .replace(/<\/p>/gi, "\n\n")
    .replace(/<\/h[1-6]>/gi, "\n\n")
    .replace(/<\/li>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/\n\s+\n/g, "\n\n")
    .trim();
}

// ---------------------------------------------------------------------------
// OTP Verification Email (Transactional - High Priority)
// ---------------------------------------------------------------------------

export async function sendOtpEmail(
  to: string,
  otp: string,
  firstName: string
): Promise<void> {
  const textContent = `Hey ${firstName},\n\nYour BulkyMailer verification code is: ${otp}\n\nThis code expires in 10 minutes. Never share it with anyone.\n\n— BulkyMailer`;
  const fromHeader = getFromHeader();

  if (resend) {
    const { error } = await resend.emails.send({
      from: fromHeader,
      replyTo: `support@${VERIFIED_DOMAIN}`,
      to,
      subject: `${otp} is your BulkyMailer verification code`,
      html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Verify your email</title>
</head>
<body style="margin:0;padding:0;background:#ffffff;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#111827;">
  <div style="max-w-md;margin:0 auto;padding:40px 20px;">
    <h1 style="font-size:20px;font-weight:700;margin-bottom:20px;">Verify your email</h1>
    <p style="font-size:16px;line-height:1.5;margin-bottom:20px;color:#374151;">
      Hey ${firstName},<br><br>
      Use the code below to verify your BulkyMailer account. It expires in 10 minutes.
    </p>
    <div style="background:#f3f4f6;padding:20px;border-radius:8px;text-align:center;margin-bottom:20px;">
      <span style="font-size:32px;font-weight:bold;letter-spacing:4px;color:#111827;">${otp}</span>
    </div>
    <p style="font-size:14px;color:#6b7280;line-height:1.5;">
      Never share this code with anyone.<br>
      If you didn't create an account, you can safely ignore this email.
    </p>
    <div style="margin-top:32px;padding-top:16px;border-top:1px solid #e5e7eb;font-size:12px;color:#9ca3af;text-align:center;">
      BulkyMailer Team
    </div>
  </div>
</body>
</html>`,
      text: textContent,
    });
    if (!error) return;
  }

  await transporter.sendMail({
    from: fromHeader,
    to,
    subject: `${otp} is your BulkyMailer verification code`,
    html: `<!DOCTYPE html><html lang="en"><body><div style="padding:20px;"><h1>Verify Code: ${otp}</h1></div></body></html>`,
    text: textContent,
  });
}

// ---------------------------------------------------------------------------
// Welcome email
// ---------------------------------------------------------------------------

export async function sendWelcomeEmail(
  to: string,
  firstName: string
): Promise<void> {
  const textContent = `Hey ${firstName},\n\nYour email is verified! Your account is now active.\nGo to your dashboard: ${APP_URL}/dashboard\n\n— BulkyMailer`;
  const fromHeader = getFromHeader();

  if (resend) {
    const { error } = await resend.emails.send({
      from: fromHeader,
      replyTo: `support@${VERIFIED_DOMAIN}`,
      to,
      subject: `Welcome to BulkyMailer, ${firstName}!`,
      html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Welcome to BulkyMailer</title>
</head>
<body style="margin:0;padding:0;background:#ffffff;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#111827;">
  <div style="max-w-md;margin:0 auto;padding:40px 20px;">
    <h1 style="font-size:20px;font-weight:700;margin-bottom:20px;">You're in, ${firstName}!</h1>
    <p style="font-size:16px;line-height:1.5;margin-bottom:30px;color:#374151;">
      Your email is verified and your BulkyMailer account is active. You can now start creating and sending campaigns.
    </p>
    <a href="${APP_URL}/dashboard" style="display:inline-block;padding:12px 24px;background:#111827;color:#ffffff;text-decoration:none;border-radius:6px;font-weight:600;font-size:16px;">
      Go to Dashboard
    </a>
    <div style="margin-top:32px;padding-top:16px;border-top:1px solid #e5e7eb;font-size:12px;color:#9ca3af;text-align:center;">
      BulkyMailer Team
    </div>
  </div>
</body>
</html>`,
      text: textContent,
    });
    if (!error) return;
  }
}

// ---------------------------------------------------------------------------
// Password Reset Email
// ---------------------------------------------------------------------------

export async function sendPasswordResetEmail(
  to: string,
  token: string
): Promise<void> {
  const resetLink = `${APP_URL}/reset-password?token=${token}`;
  const textContent = `Hello,\n\nWe received a request to reset your password. Click the link below to set a new password:\n\n${resetLink}\n\nIf you did not request this, please ignore this email.\n\n— BulkyMailer`;
  const fromHeader = getFromHeader();

  if (resend) {
    const { error } = await resend.emails.send({
      from: fromHeader,
      replyTo: `support@${VERIFIED_DOMAIN}`,
      to,
      subject: "Reset your BulkyMailer password",
      html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Reset your password</title>
</head>
<body style="margin:0;padding:0;background:#ffffff;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#111827;">
  <div style="max-w-md;margin:0 auto;padding:40px 20px;">
    <h1 style="font-size:20px;font-weight:700;margin-bottom:20px;">Reset your password</h1>
    <p style="font-size:16px;line-height:1.5;margin-bottom:30px;color:#374151;">
      We received a request to reset the password for your BulkyMailer account. Click the button below to set a new password. This link expires in 1 hour.
    </p>
    <a href="${resetLink}" style="display:inline-block;padding:12px 24px;background:#111827;color:#ffffff;text-decoration:none;border-radius:6px;font-weight:600;font-size:16px;">
      Reset Password
    </a>
    <div style="margin-top:32px;padding-top:16px;border-top:1px solid #e5e7eb;font-size:12px;color:#9ca3af;text-align:center;">
      BulkyMailer Team
    </div>
  </div>
</body>
</html>`,
      text: textContent,
    });
    if (!error) return;
  }
}

// ---------------------------------------------------------------------------
// Campaign & Bulk Mail Dispatcher
// ---------------------------------------------------------------------------

export async function sendEmail(
  to: string,
  subject: string,
  html: string,
  isTestMail: boolean = false,
  fromOverride?: string | null,
  campaignId?: string,
  attachments?: any[],
  providerConfig?: ProviderConfig | null,
  senderProfile?: SenderIdentity | null
): Promise<void> {
  const unsubscribeUrl = `${APP_URL}/unsubscribe?email=${encodeURIComponent(to)}`;
  const privacyUrl = `${APP_URL}/privacy`;
  
  // Determine Sender Identity
  let finalFromName = senderProfile?.fromName || providerConfig?.fromName;
  let finalFromEmail = senderProfile?.fromEmail || providerConfig?.fromEmail;
  let finalReplyTo = senderProfile?.replyTo || providerConfig?.replyTo || `support@${VERIFIED_DOMAIN}`;
  
  let fromHeader = getFromHeader(fromOverride);
  if (finalFromName && finalFromEmail) {
    fromHeader = `"${finalFromName}" <${finalFromEmail}>`;
  } else if (finalFromEmail) {
    fromHeader = finalFromEmail;
  }

  // Compliant Anti-Spam Footer matching exact application APP_URL domain
  let finalHtml = html;
  if (!finalHtml.toLowerCase().includes("unsubscribe")) {
    finalHtml += `
      <div style="margin-top:40px; padding-top:20px; border-top:1px solid #e5e7eb; text-align:center; font-size:12px; color:#6b7280; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif; line-height:1.6;">
        <p style="margin:0 0 4px 0; font-weight:600; color:#374151;">BulkyMailer</p>
        <p style="margin:0;">
          <a href="${unsubscribeUrl}" style="color:#4f46e5; text-decoration:underline;">Unsubscribe</a>
          <span style="margin:0 8px; color:#d1d5db;">|</span>
          <a href="${privacyUrl}" style="color:#4f46e5; text-decoration:underline;">Privacy Policy</a>
        </p>
      </div>`;
  }

  const plainText = htmlToPlainText(finalHtml);

  // Use Dynamic Provider if specified
  const isSmtp = providerConfig?.provider === "SMTP";
  
  if (isSmtp) {
    if (!providerConfig?.smtpHost || !providerConfig?.encryptedSmtpPassword) {
      throw new Error("Incomplete SMTP configuration");
    }
    
    let pass = "";
    try {
      pass = decrypt(providerConfig.encryptedSmtpPassword);
    } catch (e) {
      throw new Error("Invalid SMTP credentials configuration");
    }

    const dynamicTransporter = nodemailer.createTransport({
      host: providerConfig.smtpHost,
      port: providerConfig.smtpPort || 587,
      secure: providerConfig.smtpSecure ?? false,
      auth: {
        user: providerConfig.smtpUsername || "",
        pass: pass,
      },
    });

    await dynamicTransporter.sendMail({
      from: fromHeader,
      to,
      replyTo: finalReplyTo,
      subject,
      html: finalHtml,
      text: plainText,
      headers: {
        "List-Unsubscribe": `<${unsubscribeUrl}>`,
        "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
        "Feedback-ID": `campaign:bulkymailer:${VERIFIED_DOMAIN}`,
      },
      ...(attachments ? { attachments } : {})
    });
    return;
  }

  // 1. Resend Engine
  if (resend) {
    const { data, error } = await resend.emails.send({
      from: fromHeader,
      replyTo: `support@${VERIFIED_DOMAIN}`,
      to,
      subject,
      html: finalHtml,
      text: plainText,
      headers: {
        "List-Unsubscribe": `<${unsubscribeUrl}>`,
        "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
        "Feedback-ID": `campaign:bulkymailer:${VERIFIED_DOMAIN}`,
        "X-Entity-Ref-ID": `${Date.now()}`,
        ...(campaignId ? { "X-Campaign-Id": campaignId } : {})
      },
      ...(campaignId ? { tags: [{ name: "campaign_id", value: campaignId }] } : {}),
      ...(attachments ? { attachments } : {})
    });

    if (error) {
      console.error("[resend_sendEmail_error]", error);
      throw new Error(error.message);
    }
    return;
  }

  // 2. Nodemailer Fallback
  const replyTo = `support@${VERIFIED_DOMAIN}`;
  await transporter.sendMail({
    from: fromHeader,
    to,
    replyTo,
    subject,
    html: finalHtml,
    text: plainText,
    headers: {
      "List-Unsubscribe": `<${unsubscribeUrl}>`,
      "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
      "Feedback-ID": `campaign:bulkymailer:${VERIFIED_DOMAIN}`,
    },
    ...(attachments ? { attachments } : {})
  });
}

// ---------------------------------------------------------------------------
// Batch Resend Bulk Mailer for High Volume Campaign Dispatch
// ---------------------------------------------------------------------------

export async function sendBulkEmailWithResend(
  emails: Array<{ to: string; subject: string; html: string }>,
  fromOverride?: string | null,
  campaignId?: string,
  providerConfig?: ProviderConfig | null,
  senderProfile?: SenderIdentity | null
) {
  // If provider is SMTP or Resend is not configured globally, fallback to loop
  if (providerConfig?.provider === "SMTP" || !resend) {
    for (const item of emails) {
      await sendEmail(item.to, item.subject, item.html, false, fromOverride, campaignId, undefined, providerConfig, senderProfile);
    }
    return;
  }

  // Determine Sender Identity for bulk
  let finalFromName = senderProfile?.fromName || providerConfig?.fromName;
  let finalFromEmail = senderProfile?.fromEmail || providerConfig?.fromEmail;
  let finalReplyTo = senderProfile?.replyTo || providerConfig?.replyTo || `support@${VERIFIED_DOMAIN}`;
  
  let fromHeader = getFromHeader(fromOverride);
  if (finalFromName && finalFromEmail) {
    fromHeader = `"${finalFromName}" <${finalFromEmail}>`;
  } else if (finalFromEmail) {
    fromHeader = finalFromEmail;
  }

  const batchPayload = emails.map((item) => {
    const unsubscribeUrl = `${APP_URL}/unsubscribe?email=${encodeURIComponent(item.to)}`;
    const privacyUrl = `${APP_URL}/privacy`;
    let finalHtml = item.html;
    if (!finalHtml.toLowerCase().includes("unsubscribe")) {
      finalHtml += `
        <div style="margin-top:40px; padding-top:20px; border-top:1px solid #e5e7eb; text-align:center; font-size:12px; color:#6b7280; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif; line-height:1.6;">
          <p style="margin:0 0 4px 0; font-weight:600; color:#374151;">BulkyMailer</p>
          <p style="margin:0;">
            <a href="${unsubscribeUrl}" style="color:#4f46e5; text-decoration:underline;">Unsubscribe</a>
            <span style="margin:0 8px; color:#d1d5db;">|</span>
            <a href="${privacyUrl}" style="color:#4f46e5; text-decoration:underline;">Privacy Policy</a>
          </p>
        </div>`;
    }

    return {
      from: fromHeader,
      replyTo: finalReplyTo,
      to: item.to,
      subject: item.subject,
      html: finalHtml,
      text: htmlToPlainText(finalHtml),
      headers: {
        "List-Unsubscribe": `<${unsubscribeUrl}>`,
        "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
        "Feedback-ID": `campaign:bulkymailer:${VERIFIED_DOMAIN}`,
        ...(campaignId ? { "X-Campaign-Id": campaignId } : {})
      },
      ...(campaignId ? { tags: [{ name: "campaign_id", value: campaignId }] } : {})
    };
  });

  const { data, error } = await resend.batch.send(batchPayload);
  if (error) {
    console.error("[resend_batch_error]", error);
    throw new Error(error.message);
  }
  return data;
}
