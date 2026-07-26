import { NextRequest, NextResponse } from "next/server";
import { getSessionUserId } from "@/lib/auth";
import { db } from "@/lib/db";
import { sendEmail, renderTemplateMergeTags } from "@/lib/mailer";

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const userId = await getSessionUserId();
    if (!userId) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

    const { id } = await params;
    const body = await req.json();
    const { testEmail, firstName, lastName, company } = body;

    if (!testEmail) {
      return NextResponse.json({ error: "Recipient email is required" }, { status: 400 });
    }

    const template = await db.template.findFirst({
      where: {
        id,
        OR: [{ userId: null }, { userId }]
      }
    });

    if (!template) return NextResponse.json({ error: "Template not found" }, { status: 404 });

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    // Use robust Liquid / Handlebars merge tag renderer for dates, defaults, names & urls
    const personalizedHtml = renderTemplateMergeTags(template.htmlContent, {
      firstName: firstName || "John",
      lastName: lastName || "Doe",
      company: company || "BulkyMailer",
      email: testEmail,
      unsubscribeUrl: `${appUrl}/unsubscribe?email=${encodeURIComponent(testEmail)}`,
    });

    await sendEmail(
      testEmail,
      template.name ? `Preview: ${template.name}` : "Email Template Preview",
      personalizedHtml,
      true // isTestMail = true so it bypasses bulk headers & lands in Primary Inbox!
    );

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("[template_test_email_POST]", err);
    return NextResponse.json({ error: err.message || "Failed to send test email" }, { status: 500 });
  }
}
