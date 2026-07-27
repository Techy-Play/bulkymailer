import { NextRequest, NextResponse } from "next/server";
import { sendOtpEmail, sendPasswordResetEmail, sendEmail } from "@/lib/mailer";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const targetEmail = searchParams.get("email") || "mrtechy9505@gmail.com";

    // 1. Send Transactional OTP Verification Email
    await sendOtpEmail(targetEmail, "849204", "Techy User");

    // 2. Send Password Reset Email
    await sendPasswordResetEmail(targetEmail, "test-reset-token-12345");

    // 3. Send Product Campaign Update Email
    const newsletterHtml = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>BulkyMailer Monthly Digest</title>
      </head>
      <body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif; background-color:#f8fafc; margin:0; padding:20px;">
        <div style="max-width:600px; margin:0 auto; background:#ffffff; border-radius:16px; padding:32px; border:1px solid #e2e8f0;">
          <h2 style="color:#1e293b; margin-top:0;">🚀 BulkyMailer Monthly Digest</h2>
          <p style="color:#475569; line-height:1.6;">
            Hey Techy,<br><br>
            Here are the latest product updates and deliverability tools added to your BulkyMailer account this month.
          </p>
          <div style="background:#f1f5f9; padding:20px; border-radius:12px; margin:20px 0;">
            <h4 style="margin:0 0 8px 0; color:#0f172a;">✨ New High-Deliverability Resend Engine</h4>
            <p style="margin:0; font-size:14px; color:#334155;">
              All emails are now dispatched with DKIM, SPF alignment, and RFC 8058 One-Click List-Unsubscribe headers.
            </p>
          </div>
          <a href="http://localhost:3000/dashboard" style="display:inline-block; background:#4f46e5; color:#ffffff; padding:12px 24px; border-radius:8px; font-weight:600; text-decoration:none;">
            View Dashboard Analytics →
          </a>
        </div>
      </body>
      </html>
    `;

    await sendEmail(
      targetEmail,
      "BulkyMailer Monthly Digest & High-Deliverability Updates",
      newsletterHtml,
      true
    );

    return NextResponse.json({
      success: true,
      targetEmail,
      sentCount: 3,
      message: `Dispatched 3 test emails (Transactional OTP, Password Reset, and Newsletter) to ${targetEmail} via verified domain send.au-acadex.com`
    });
  } catch (err: any) {
    console.error("[test_deliverability_error]", err);
    return NextResponse.json({ error: err.message || "Failed to send test emails" }, { status: 500 });
  }
}
