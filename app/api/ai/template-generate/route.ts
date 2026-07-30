import { NextRequest, NextResponse } from "next/server";
import { getSessionUserId } from "@/lib/auth";
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const userId = await getSessionUserId();
    if (!userId) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const body = await req.json();
    const { prompt, currentHtml, fieldAnswers, selectedNode } = body;

    if (!prompt && !fieldAnswers) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "GEMINI_API_KEY is not set in environment variables. Please add GEMINI_API_KEY to your deployment environment." },
        { status: 400 }
      );
    }

    // Retrieve user's Organization and Sender Profile details for brand context
    const user = await db.user.findUnique({
      where: { id: userId },
      include: {
        organization: true,
        senderProfiles: { where: { isDefault: true } },
      },
    });

    const org = user?.organization;
    const sender = user?.senderProfiles?.[0];
    const companyName = org?.name || (user?.firstName ? `${user.firstName} ${user.lastName}` : "BulkyMailer");
    const logoUrl = org?.logoUrl && org.logoUrl.startsWith("http") ? org.logoUrl : "";

    const brandContext = `
SAVED BRAND CONTEXT:
- Company Name: "${companyName}"
- Website: "${org?.website || "https://bulkymailer.com"}"
- Logo URL: "${logoUrl}" (If empty, render text header logo)
- Sender Name: "${sender?.fromName || user?.firstName || "BulkyMailer Team"}"
- Sender Email: "${sender?.fromEmail || user?.email}"
`;

    const coreRules = `
STRICT DESIGN DIRECTIVES & RULES:
1. DESIGN EXCELLENCE: Create modern, visually stunning, conversion-focused email templates with curated color palettes, elegant typography, rounded buttons, and clean spacing.
2. SURGICAL MODIFICATION: If an existing HTML template is provided, apply the requested changes (colors, text, sections, CTA buttons) while preserving valid HTML structures.
3. SINGLE FOOTER & MERGE TAGS: Ensure there is ONLY ONE clean footer containing {{unsubscribeUrl}}. Do not output duplicate footers or raw HTML entities like &copy; (use the literal © character instead).
4. NO BROKEN IMAGES: If no logo URL is provided, use a clean text logo header for "${companyName}".
5. NO MARKDOWN: Output ONLY raw valid JSON. Do not wrap in markdown \`\`\`json code blocks.
`;

    let userMessage = `${brandContext}\n\n${coreRules}\n\nUSER INSTRUCTION:\n${prompt || "Design or enhance this email template"}`;
    if (selectedNode) {
      userMessage += `\n\nFOCUSED COMPONENT NODE:\n${JSON.stringify(selectedNode, null, 2)}`;
    }
    if (fieldAnswers && Object.keys(fieldAnswers).length > 0) {
      userMessage += `\n\nFIELD ANSWERS:\n${JSON.stringify(fieldAnswers, null, 2)}`;
    }
    if (currentHtml) {
      // Strip heavy base64 strings to prevent burning TPM tokens & hitting 429 rate limits
      const sanitizedHtml = String(currentHtml)
        .replace(/data:image\/[^;]+;base64,[^"']+/g, "https://placehold.co/600x300")
        .slice(0, 10000);
      userMessage += `\n\nEXISTING HTML TEMPLATE:\n${sanitizedHtml}`;
    }

    const systemInstruction = `You are BulkyMailer's AI Email Designer.
Return a JSON object with this exact schema:
{
  "missingFields": [],
  "html": "<!DOCTYPE html>...",
  "changes": ["✓ Applied requested styling", "✓ Updated CTA button"],
  "suggestions": ["Add countdown timer", "Include social links"],
  "spamRisk": "Low" | "Medium" | "High",
  "brandScore": 96
}`;

    // Supported active AI models and versions
    const endpointsToTry = [
      { model: "gemini-2.0-flash-lite", version: "v1beta" },
      { model: "gemini-2.5-flash", version: "v1beta" },
      { model: "gemini-2.0-flash", version: "v1beta" },
      { model: "gemini-2.5-pro", version: "v1beta" },
      { model: "gemini-1.5-flash", version: "v1" },
    ];

    let responseData: any = null;
    let lastErrorText = "";
    let isRateLimited = false;

    for (const target of endpointsToTry) {
      const apiUrl = `https://generativelanguage.googleapis.com/${target.version}/models/${target.model}:generateContent?key=${apiKey}`;
      try {
        const res = await fetch(apiUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              {
                parts: [{ text: `${systemInstruction}\n\n${userMessage}` }]
              }
            ]
          })
        });

        if (res.ok) {
          responseData = await res.json();
          break;
        } else {
          lastErrorText = await res.text();
          if (res.status === 429) {
            isRateLimited = true;
            console.warn(`AI model ${target.model} (${target.version}) rate limited (status 429)`);
            // Brief backoff pause before attempting fallback endpoint
            await new Promise((resolve) => setTimeout(resolve, 600));
          } else {
            console.warn(`AI model ${target.model} (${target.version}) returned status ${res.status}`);
          }
        }
      } catch (err: any) {
        lastErrorText = err.message || "Network error";
      }
    }

    if (!responseData) {
      console.error("[ai_template_generate_error]", lastErrorText);
      if (isRateLimited) {
        return NextResponse.json(
          { error: "AI Assistant rate limit reached. Please wait a few seconds and try again." },
          { status: 429 }
        );
      }
      return NextResponse.json(
        { error: "Failed to communicate with AI Assistant service. Please try again." },
        { status: 500 }
      );
    }

    let generatedText = responseData?.candidates?.[0]?.content?.parts?.[0]?.text || "";

    // Clean JSON output string
    generatedText = generatedText
      .replace(/^```json\s*/i, "")
      .replace(/^```html\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/\s*```$/i, "")
      .trim();

    try {
      const jsonResponse = JSON.parse(generatedText);
      return NextResponse.json(jsonResponse);
    } catch {
      // If output was raw HTML string
      return NextResponse.json({
        html: generatedText,
        changes: ["✓ Custom design updates applied", "✓ Optimized responsive email layout"],
        suggestions: ["Add countdown timer", "Add social links"],
        spamRisk: "Low",
        brandScore: 95,
        missingFields: [],
      });
    }
  } catch (err: any) {
    console.error("[ai_template_generate_POST]", err);
    return NextResponse.json(
      { error: err.message || "Failed to generate AI template" },
      { status: 500 }
    );
  }
}
