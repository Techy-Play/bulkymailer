import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT ?? 587),
  secure: Number(process.env.SMTP_PORT) === 465,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const FROM = process.env.SMTP_FROM ?? "BulkyMailer <noreply@bulkymailer.com>";
const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

// ---------------------------------------------------------------------------
// OTP Verification Email (6-digit code)
// ---------------------------------------------------------------------------

export async function sendOtpEmail(
  to: string,
  otp: string,
  firstName: string
): Promise<void> {
  await transporter.sendMail({
    from: FROM,
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
<body style="margin:0;padding:0;background:#0f0f14;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0f0f14;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="background:#1a1a2e;border:1px solid #2d2d4a;border-radius:16px;overflow:hidden;">
          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#6366f1 0%,#8b5cf6 100%);padding:32px;text-align:center;">
              <p style="margin:0;color:#FFFFFF;font-size:22px;font-weight:800;letter-spacing:-0.5px;">
                ✉️ BulkyMailer
              </p>
              <p style="margin:8px 0 0;color:rgba(255,255,255,0.75);font-size:13px;">Email Marketing Platform</p>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding:40px 40px 32px;">
              <h1 style="margin:0 0 8px;font-size:22px;font-weight:700;color:#f1f5f9;">
                Hey ${firstName}, verify your email
              </h1>
              <p style="margin:0 0 32px;font-size:15px;color:#94a3b8;line-height:1.6;">
                Use the code below to verify your BulkyMailer account. It expires in <strong style="color:#e2e8f0;">10 minutes</strong>.
              </p>
              <!-- OTP Box -->
              <div style="background:#0f0f14;border:2px solid #6366f1;border-radius:12px;padding:24px;text-align:center;margin-bottom:32px;">
                <p style="margin:0 0 6px;font-size:12px;font-weight:600;color:#6366f1;text-transform:uppercase;letter-spacing:2px;">Your verification code</p>
                <p style="margin:0;font-size:42px;font-weight:800;color:#ffffff;letter-spacing:10px;font-variant-numeric:tabular-nums;">${otp}</p>
              </div>
              <p style="margin:0;font-size:13px;color:#64748b;line-height:1.6;">
                Never share this code with anyone. BulkyMailer will never ask for your code.<br/>
                If you didn't create an account, you can safely ignore this email.
              </p>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="padding:20px 40px;border-top:1px solid #2d2d4a;">
              <p style="margin:0;font-size:11px;color:#475569;">
                BulkyMailer by BUIMB Research · Developed by Lokesh Paneru<br/>
                This is a transactional email — no unsubscribe needed.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`,
    text: `Hey ${firstName},\n\nYour BulkyMailer verification code is: ${otp}\n\nThis code expires in 10 minutes. Never share it with anyone.\n\n— BulkyMailer by BUIMB Research`,
  });
}

// ---------------------------------------------------------------------------
// Welcome email (sent after OTP verification)
// ---------------------------------------------------------------------------

export async function sendWelcomeEmail(
  to: string,
  firstName: string
): Promise<void> {
  await transporter.sendMail({
    from: FROM,
    to,
    subject: `Welcome to BulkyMailer, ${firstName}! 🎉`,
    html: `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"/></head>
<body style="margin:0;padding:0;background:#0f0f14;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0f0f14;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="background:#1a1a2e;border:1px solid #2d2d4a;border-radius:16px;overflow:hidden;">
          <tr>
            <td style="background:linear-gradient(135deg,#6366f1 0%,#8b5cf6 100%);padding:32px;text-align:center;">
              <p style="margin:0;color:#FFFFFF;font-size:22px;font-weight:800;">✉️ BulkyMailer</p>
            </td>
          </tr>
          <tr>
            <td style="padding:40px;">
              <h1 style="margin:0 0 12px;font-size:24px;font-weight:800;color:#f1f5f9;">
                🎉 You're in, ${firstName}!
              </h1>
              <p style="margin:0 0 20px;font-size:15px;color:#94a3b8;line-height:1.6;">
                Your email is verified and your BulkyMailer account is active.<br/>
                Your <strong style="color:#e2e8f0;">Free Plan</strong> gives you <strong style="color:#6366f1;">100 emails/month</strong> to get started.
              </p>
              <a href="${APP_URL}/dashboard"
                 style="display:inline-block;padding:14px 32px;background:linear-gradient(135deg,#6366f1,#8b5cf6);color:#FFFFFF;font-size:14px;font-weight:700;border-radius:10px;text-decoration:none;">
                Go to Dashboard →
              </a>
            </td>
          </tr>
          <tr>
            <td style="padding:20px 40px;border-top:1px solid #2d2d4a;">
              <p style="margin:0;font-size:11px;color:#475569;">BulkyMailer by BUIMB Research · Developed by Lokesh Paneru</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`,
    text: `Hey ${firstName},\n\nYour email is verified! Your Free Plan gives you 100 emails/month.\nGo to your dashboard: ${APP_URL}/dashboard\n\n— BulkyMailer`,
  });
}
