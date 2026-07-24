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
  const textContent = `Hey ${firstName},\n\nYour BulkyMailer verification code is: ${otp}\n\nThis code expires in 10 minutes. Never share it with anyone.\n\n— BulkyMailer`;
  
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

  await transporter.sendMail({
    from: FROM,
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
  const resetLink = \`\${APP_URL}/reset-password?token=\${token}\`;
  const textContent = \`Hello,\n\nWe received a request to reset your password. Click the link below to set a new password:\n\n\${resetLink}\n\nIf you did not request this, please ignore this email.\n\n— BulkyMailer\`;

  await transporter.sendMail({
    from: FROM,
    to,
    subject: "Reset your BulkyMailer password",
    html: \`
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
    <a href="\${resetLink}" style="display:inline-block;padding:12px 24px;background:#111827;color:#ffffff;text-decoration:none;border-radius:6px;font-weight:600;font-size:16px;">
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
</html>\`,
    text: textContent,
  });
}

// ---------------------------------------------------------------------------
// Generic Campaign Email
// ---------------------------------------------------------------------------

export async function sendEmail(
  to: string,
  subject: string,
  html: string
): Promise<void> {
  await transporter.sendMail({
    from: FROM,
    to,
    subject,
    html,
  });
}
