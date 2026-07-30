import { NextRequest, NextResponse } from "next/server";
import { getSessionUserId } from "@/lib/auth";
import { db } from "@/lib/db";
import { TemplateCategory } from "@/app/generated/prisma/enums";

export async function GET(req: NextRequest) {
  try {
    const userId = await getSessionUserId();
    if (!userId) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    // Fetch system templates (userId = null) and user templates
    const templates = await db.template.findMany({
      where: {
        OR: [
          { userId: null },
          { userId }
        ]
      },
      orderBy: { createdAt: "desc" }
    });

    return NextResponse.json({ templates });
  } catch (err) {
    console.error("[templates_GET]", err);
    return NextResponse.json({ error: "Failed to fetch templates" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const userId = await getSessionUserId();
    if (!userId) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const { name, category, htmlContent, description, previewText } = await req.json();

    if (!name) {
      return NextResponse.json({ error: "Template name is required" }, { status: 400 });
    }

    const defaultHtml = typeof htmlContent === "string" && htmlContent.trim()
      ? htmlContent
      : "<!DOCTYPE html><html><head></head><body style='font-family:sans-serif;padding:32px;background-color:#ffffff;'><div style='max-w:600px;margin:0 auto;'><h1 style='color:#111827;'>Welcome to Your Campaign</h1><p style='color:#374151;'>Start writing your email content here...</p></div></body></html>";

    const template = await db.template.create({
      data: {
        name,
        category: category || TemplateCategory.GENERAL,
        htmlContent: defaultHtml,
        description,
        previewText,
        userId
      }
    });

    return NextResponse.json({ template });
  } catch (err) {
    console.error("[templates_POST]", err);
    return NextResponse.json({ error: "Failed to create template" }, { status: 500 });
  }
}
