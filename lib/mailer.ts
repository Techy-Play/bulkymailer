import nodemailer from "nodemailer";
import { Resend } from "resend";

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

/**
 * Robust Merge Tag Parser & Replacer
 * Evaluates Liquid / Handlebars style merge tags (e.g. {{currentYear | date: "%Y"}}, {{firstName | default: "there"}})
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

  // 1. Current Year tags: {{currentYear | date: "%Y"}}, {{currentYear}}, {{current_year}}, {{year}}, {{date: "%Y"}}
  rendered = rendered.replace(/\{\{\s*(?:currentYear|current_year|year|now|date)\s*(?:\|\s*date:[^}]*)?\s*\}\}/gi, currentYear);

  // 2. Current Date tags: {{currentDate}}, {{date}}, {{today}}
  rendered = rendered.replace(/\{\{\s*(?:currentDate|current_date|today)\s*\}\}/gi, currentDate);

  // 3. First Name with optional default value: {{firstName | default: "there"}}, {{firstName}}
  rendered = rendered.replace(/\{\{\s*firstName(?:\s*\|\s*default:\s*(?:"([^"]*)"|'([^']*)'|([^}\s]+)))?\s*\}\}/gi, (_, d1, d2, d3) => {
    const defaultVal = d1 || d2 || d3 || "";
    return vars.firstName?.trim() ? vars.firstName : (defaultVal || "there");
  });

  // 4. Last Name with optional default value: {{lastName | default: "..."}}
  rendered = rendered.replace(/\{\{\s*lastName(?:\s*\|\s*default:\s*(?:"([^"]*)"|'([^']*)'|([^}\s]+)))?\s*\}\}/gi, (_, d1, d2, d3) => {
    const defaultVal = d1 || d2 || d3 || "";
    return vars.lastName?.trim() ? vars.lastName : defaultVal;
  });

  // 5. Company Name: {{company | default: "..."}}, {{company}}
  rendered = rendered.replace(/\{\{\s*company(?:\s*\|\s*default:\s*(?:"([^"]*)"|'([^']*)'|([^}\s]+)))?\s*\}\}/gi, (_, d1, d2, d3) => {
    const defaultVal = d1 || d2 || d3 || "BulkyMailer";
    return vars.company?.trim() ? vars.company : defaultVal;
  });

  // 6. Email: {{email}}
  rendered = rendered.replace(/\{\{\s*email\s*\}\}/gi, vars.email || "");

  // 7. Unsubscribe URL: {{unsubscribeUrl}}
  if (vars.unsubscribeUrl) {
    rendered = rendered.replace(/\{\{\s*unsubscribeUrl\s*\}\}/gi, vars.unsubscribeUrl);
  }

  // 8. Custom fields: {{custom.x}}, {{customFields.x}}
  if (vars.customFields) {
    Object.entries(vars.customFields).forEach(([k, v]) => {
      const reg = new RegExp(`\\{\\{\\s*(?:custom\\.|customFields\\.)?${k}\\s*\\}\\}`, 'gi');
      rendered = rendered.replace(reg, String(v || ''));
    });
  }

  // 9. Catch-all for any remaining raw liquid date filter tags
  rendered = rendered.replace(/\{\{\s*[^}]*date:\s*(?:"%Y"|'%Y'|"%y"|'%y')\s*\}\}/gi, currentYear);

  return rendered;
}

/**
 * Gets a clean, SPF/DKIM aligned FROM address string.
 */
function getFromHeader(): string {
  const envFrom = process.env.RESEND_FROM || process.env.SMTP_FROM;
  const smtpUser = process.env.SMTP_USER;

  if (envFrom) return envFrom;
  if (smtpUser && smtpUser.endsWith("@gmail.com")) {
    return `"BulkyMailer" <${smtpUser}>`;
  }
  return `"BulkyMailer" <onboarding@resend.dev>`;
}

/**
 * Converts HTML content to plain text to provide a fallback multipart text stream.
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
// OTP Verification Email (6-digit code)
// ---------------------------------------------------------------------------

export async function sendOtpEmail(
  to: string,
  otp: string,
  firstName: string
): Promise<void> {
  const textContent = `Hey ${firstName},\n\nYour BulkyMailer verification code is: ${otp}\n\nThis code expires in 10 minutes. Never share it with anyone.\n\n— BulkyMailer`;

  if (resend) {
    const { error } = await resend.emails.send({
      from: getFromHeader(),
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
    <p style="font-size:14px;color:#9ca3af;margin-top:40px;">
      — BulkyMailer Team
    </p>
  </div>
</body>
</html>`,
      text: textContent,
    });
    if (!error) return;
  }

  await transporter.sendMail({
    from: getFromHeader(),
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
    <p style="font-size:14px;color:#9ca3af;margin-top:40px;">
      — BulkyMailer Team
    </p>
  </div>
</body>
</html>`,
    text: textContent,
  });
}

// ---------------------------------------------------------------------------
// Welcome email (sent after OTP verification)
// ---------------------------------------------------------------------------

export async function sendWelcomeEmail(
  to: string,
  firstName: string
): Promise<void> {
  const textContent = `Hey ${firstName},\n\nYour email is verified! Your account is now active.\nGo to your dashboard: ${APP_URL}/dashboard\n\n— BulkyMailer`;

  if (resend) {
    const { error } = await resend.emails.send({
      from: getFromHeader(),
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
    <p style="font-size:14px;color:#9ca3af;margin-top:40px;">
      — BulkyMailer Team
    </p>
  </div>
</body>
</html>`,
      text: textContent,
    });
    if (!error) return;
  }

  await transporter.sendMail({
    from: getFromHeader(),
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
    <p style="font-size:14px;color:#9ca3af;margin-top:40px;">
      — BulkyMailer Team
    </p>
  </div>
</body>
</html>`,
    text: textContent,
  });
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

  if (resend) {
    const { error } = await resend.emails.send({
      from: getFromHeader(),
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
    <p style="font-size:14px;color:#6b7280;line-height:1.5;margin-top:30px;">
      If you did not request a password reset, you can safely ignore this email.
    </p>
    <p style="font-size:14px;color:#9ca3af;margin-top:40px;">
      — BulkyMailer Team
    </p>
  </div>
</body>
</html>`,
      text: textContent,
    });
    if (!error) return;
  }

  await transporter.sendMail({
    from: getFromHeader(),
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
    <p style="font-size:14px;color:#6b7280;line-height:1.5;margin-top:30px;">
      If you did not request a password reset, you can safely ignore this email.
    </p>
    <p style="font-size:14px;color:#9ca3af;margin-top:40px;">
      — BulkyMailer Team
    </p>
  </div>
</body>
</html>`,
    text: textContent,
  });
}

// ---------------------------------------------------------------------------
// Campaign & Test Email Sender (Resend API Engine + Nodemailer Fallback)
// ---------------------------------------------------------------------------

export async function sendEmail(
  to: string,
  subject: string,
  html: string,
  isTestMail: boolean = false
): Promise<void> {
  const plainText = htmlToPlainText(html);
  const unsubscribeUrl = `${APP_URL}/unsubscribe?email=${encodeURIComponent(to)}`;

  // Automatically append Anti-Spam compliance footer if missing
  let finalHtml = html;
  if (!finalHtml.toLowerCase().includes("unsubscribe")) {
    finalHtml += `
      <div style="margin-top:32px; padding-top:16px; border-top:1px solid #e5e7eb; text-align:center; font-size:12px; color:#6b7280; font-family:sans-serif;">
        <p style="margin:0 0 8px 0;">You received this email because you are subscribed to our mailing list.</p>
        <p style="margin:0;">
          <a href="${unsubscribeUrl}" style="color:#6366f1; text-decoration:underline;">Unsubscribe from this list</a>
        </p>
      </div>`;
  }

  // 1. Resend API Engine (High deliverability bulk mailer)
  if (resend) {
    const { data, error } = await resend.emails.send({
      from: getFromHeader(),
      to,
      subject,
      html: finalHtml,
      text: plainText,
      headers: {
        "List-Unsubscribe": `<${unsubscribeUrl}>`,
        "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
      },
    });

    if (error) {
      console.error("[resend_sendEmail_error]", error);
      throw new Error(error.message);
    }
    return;
  }

  // 2. Nodemailer Fallback (when RESEND_API_KEY is omitted)
  const replyTo = process.env.SMTP_USER || "noreply@bulkymailer.com";

  const headers: Record<string, string> = {
    "X-Auto-Response-Suppress": "OOF, AutoReply",
    "List-Unsubscribe": `<${unsubscribeUrl}>`,
    "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
    "X-Report-Abuse-To": replyTo,
  };

  if (!isTestMail) {
    headers["Precedence"] = "bulk";
  }

  await transporter.sendMail({
    from: getFromHeader(),
    to,
    replyTo,
    subject,
    html: finalHtml,
    text: plainText,
    headers,
  });
}

// ---------------------------------------------------------------------------
// Batch Resend Bulk Mailer for High Volume Campaign Dispatch
// ---------------------------------------------------------------------------

export async function sendBulkEmailWithResend(
  emails: Array<{ to: string; subject: string; html: string }>
) {
  if (!resend) {
    for (const item of emails) {
      await sendEmail(item.to, item.subject, item.html);
    }
    return;
  }

  const batchPayload = emails.map((item) => {
    const unsubscribeUrl = `${APP_URL}/unsubscribe?email=${encodeURIComponent(item.to)}`;
    let finalHtml = item.html;
    if (!finalHtml.toLowerCase().includes("unsubscribe")) {
      finalHtml += `
        <div style="margin-top:32px; padding-top:16px; border-top:1px solid #e5e7eb; text-align:center; font-size:12px; color:#6b7280; font-family:sans-serif;">
          <p style="margin:0 0 8px 0;">You received this email because you are subscribed to our mailing list.</p>
          <p style="margin:0;">
            <a href="${unsubscribeUrl}" style="color:#6366f1; text-decoration:underline;">Unsubscribe from this list</a>
          </p>
        </div>`;
    }

    return {
      from: getFromHeader(),
      to: item.to,
      subject: item.subject,
      html: finalHtml,
      text: htmlToPlainText(finalHtml),
      headers: {
        "List-Unsubscribe": `<${unsubscribeUrl}>`,
      },
    };
  });

  const { data, error } = await resend.batch.send(batchPayload);
  if (error) {
    console.error("[resend_batch_error]", error);
    throw new Error(error.message);
  }
  return data;
}
