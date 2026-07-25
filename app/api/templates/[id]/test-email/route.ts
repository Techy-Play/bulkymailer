import { NextRequest, NextResponse } from "next/server";
import { getSessionUserId } from "@/lib/auth";
import { db } from "@/lib/db";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const userId = await getSessionUserId();
    if (!userId) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

    const { id } = await params;
    const body = await req.json();
    const { testEmail } = body;

    if (!testEmail) {
      return NextResponse.json({ error: "testEmail is required" }, { status: 400 });
    }

    const template = await db.template.findFirst({
      where: {
        id,
        OR: [{ userId: null }, { userId }]
      }
    });

    if (!template) return NextResponse.json({ error: "Template not found" }, { status: 404 });

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT ?? 587),
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    });

    await transporter.sendMail({
      from: process.env.SMTP_USER, // Fallback if necessary
      to: testEmail,
      subject: `[Test] ${template.name}`,
      html: template.htmlContent
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[template_test_email_POST]", err);
    return NextResponse.json({ error: "Failed to send test email" }, { status: 500 });
  }
}
