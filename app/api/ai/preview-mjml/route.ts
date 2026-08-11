import { NextRequest, NextResponse } from "next/server";
import { getSessionUserId } from "@/lib/auth";
import { renderToMjml } from "@templatical/renderer";
import mjml2html from "mjml";

export async function POST(req: NextRequest) {
  try {
    const userId = await getSessionUserId();
    if (!userId) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const { templateContent } = await req.json();
    if (!templateContent) {
      return NextResponse.json({ error: "templateContent is required" }, { status: 400 });
    }
    const mjmlString = await renderToMjml(templateContent, {
      async renderCustomBlock(block: any) {
        if (block.customType === 'advanced_image') {
          const src = block.fieldValues?.image || "https://placehold.co/600x400/f4f4f5/a1a1aa?text=Image";
          const alt = block.fieldValues?.altText || "Image";
          const padding = block.fieldValues?.padding || 0;
          return `<mj-image src="${src}" alt="${alt}" padding="${padding}px" />`;
        }
        return '';
      }
    });
    const result = await mjml2html(mjmlString, { validationLevel: "soft" });

    if (result.errors && result.errors.length > 0) {
      console.warn("[MJML_PREVIEW_WARNINGS]", result.errors);
    }

    return NextResponse.json({ html: result.html });
  } catch (error: any) {
    console.error("[PREVIEW_MJML_ERROR]", error);
    return NextResponse.json({ error: "Failed to render MJML preview" }, { status: 500 });
  }
}
