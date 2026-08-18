import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireActiveOrganization, requirePermission } from "@/lib/auth/organization-context";
import { decrypt } from "@/lib/encryption";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const orgContext = await requireActiveOrganization();
    if (!orgContext) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const permitted = await requirePermission(orgContext.organization.id, "email_provider.test");
    if (!permitted) {
      return new NextResponse("Forbidden", { status: 403 });
    }

    const body = await req.json();
    const { testEmailAddress } = body;

    const config = await db.emailProviderConfiguration.findUnique({
      where: { organizationId: orgContext.organization.id }
    });

    if (!config) {
      return NextResponse.json({ success: false, error: "No email configuration found." }, { status: 400 });
    }

    if (config.provider === "SMTP") {
      if (!config.smtpHost || !config.smtpPort || !config.smtpUsername || !config.encryptedSmtpPassword) {
        return NextResponse.json({ success: false, error: "Incomplete SMTP configuration." }, { status: 400 });
      }

      let decryptedPassword;
      try {
        decryptedPassword = decrypt(config.encryptedSmtpPassword);
      } catch (err) {
        console.error("Decryption failed", err);
        return NextResponse.json({ success: false, error: "Failed to decrypt SMTP password. Please reconfigure." }, { status: 400 });
      }

      const transporter = nodemailer.createTransport({
        host: config.smtpHost,
        port: config.smtpPort,
        secure: config.smtpSecure,
        auth: {
          user: config.smtpUsername,
          pass: decryptedPassword,
        },
      });

      try {
        await transporter.verify();
      } catch (err: any) {
        console.error("SMTP verification failed", err);
        return NextResponse.json({ success: false, error: "SMTP Connection failed: " + err.message }, { status: 400 });
      }

      if (testEmailAddress) {
        try {
          const from = config.fromEmail 
            ? (config.fromName ? `"${config.fromName}" <${config.fromEmail}>` : config.fromEmail)
            : config.smtpUsername;
            
          await transporter.sendMail({
            from: from,
            to: testEmailAddress,
            subject: "Test Email from BulkyMailer",
            text: "This is a test email to verify your SMTP configuration in BulkyMailer.",
          });
        } catch (err: any) {
          console.error("SMTP send failed", err);
          return NextResponse.json({ success: false, error: "Failed to send test email: " + err.message }, { status: 400 });
        }
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[EMAIL_PROVIDER_TEST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
