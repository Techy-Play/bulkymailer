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

    const { name, category, htmlContent } = await req.json();

    if (!name || !htmlContent) {
      return NextResponse.json({ error: "Name and HTML content are required" }, { status: 400 });
    }

    const template = await db.template.create({
      data: {
        name,
        category: category || TemplateCategory.GENERAL,
        htmlContent,
        userId
      }
    });

    return NextResponse.json({ template });
  } catch (err) {
    console.error("[templates_POST]", err);
    return NextResponse.json({ error: "Failed to create template" }, { status: 500 });
  }
}
