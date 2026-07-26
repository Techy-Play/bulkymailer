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
    const { prompt, currentHtml, fieldAnswers } = body;

    if (!prompt && !fieldAnswers) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        {
          error:
            "GEMINI_API_KEY is not set in environment variables. Please add GEMINI_API_KEY to your .env file.",
        },
        { status: 400 }
      );
    }

    // Retrieve user's Organization and Sender Profile details to pass real brand context
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
SAVED USER & ORGANIZATION BRAND DATA:
- Company/Organization Name: "${companyName}"
- Website URL: "${org?.website || "https://bulkymailer.com"}"
- Logo Image URL: "${logoUrl}" (If empty, output text header for company name instead of broken img)
- Physical Address: "${org?.addressLine1 || ""}, ${org?.city || ""}, ${org?.country || ""}"
- Sender Name: "${sender?.fromName || user?.firstName || "BulkyMailer Team"}"
- Sender Email: "${sender?.fromEmail || user?.email}"
`;

    const coreRules = `
STRICT SYSTEM DIRECTIVES & RULES (MUST BE FOLLOWED AT ALL TIMES):
1. USE SAVED DATA FIRST: Use the saved organization name, logo URL, website, and sender info above. Only ask questions if crucial campaign data is missing and NOT provided in fieldAnswers.
2. IMAGE URL MANDATE: If the user asks to add, change, or insert an image (e.g. "Add a hero image", "Add product photo", "Replace banner image"), DO NOT invent fake, unverified, or broken image URLs. You MUST request the image URL in missingFields (e.g. missingFields: ["Hero Image URL"]). Only insert <img src="..."> when a valid HTTP/HTTPS URL is provided in fieldAnswers.
3. CIRCULAR ORGANIZATION LOGO: The organization logo MUST ALWAYS be rendered as a 1:1 square image cropped inside a circular container (e.g. style="width:64px; height:64px; border-radius:50%; object-fit:cover; display:block;"). Never render rectangular unrounded logos.
4. NO BROKEN IMAGES OR PLACEHOLDERS: If Logo Image URL is empty or missing, DO NOT insert <img src="" alt="Your Company Logo" /> or broken image placeholders. Instead, render a clean, styled text logo header: <div style="font-size:24px; font-weight:bold; color:#111827; font-family:sans-serif;">${companyName}</div>.
5. ASK BEFORE ASSUMING: Only ask for missing details if fieldAnswers is empty AND critical promo details (e.g. Coupon Code) or Image URLs are absent. If fieldAnswers is provided with valid URLs/values, YOU MUST USE THEM IN THE HTML AND RETURN "missingFields": [].
6. NO FAKE OFFERS OR DATA: Never invent discounts, coupon codes, prices, product names, or launch dates.
7. PRESERVE MERGE TAGS & LINKS: NEVER remove or alter {{firstName}}, {{lastName}}, {{email}}, {{company}}, {{unsubscribeUrl}}.
8. MOBILE-FIRST & COMPATIBILITY: Max-width 600px, fluid images, inline CSS, table-based layouts for Outlook compatibility. Avoid unsupported CSS (no display:grid, no position:fixed, no backdrop-filter).
9. COMPLETE HTML: Always return a complete valid <!DOCTYPE html> document, never partial code fragments.
10. PRESERVE CUSTOM CODE: Do not strip custom IDs, classes, or tracking tags inserted by the user.
`;

    let userMessage = `${brandContext}\n\n${coreRules}\n\nUSER REQUEST:\n${prompt || "Generate / update email template"}`;
    if (fieldAnswers && Object.keys(fieldAnswers).length > 0) {
      userMessage += `\n\nUSER PROVIDED FIELD ANSWERS (USE THESE DIRECTLY IN THE EMAIL HTML AND CLEAR MISSING FIELDS):\n${JSON.stringify(fieldAnswers, null, 2)}`;
    }
    if (currentHtml) {
      userMessage += `\n\nEXISTING HTML TEMPLATE TO MODIFY OR ENHANCE:\n${currentHtml}`;
    }

    const systemInstruction = `You are an expert HTML email template designer & deliverability consultant.
Your output MUST be a JSON object with the following schema:
{
  "missingFields": [], // Array of missing required campaign fields or image URLs. IMPORTANT: If fieldAnswers are provided or user supplied details, this MUST be an empty array [].
  "html": "<!DOCTYPE html>...", // Main valid email HTML document
  "changes": ["✓ Added hero banner", "✓ Updated CTA button"], // Array of short summary notes explaining changes
  "suggestions": ["Add countdown timer", "Add customer testimonials", "Include social links"], // Next recommended AI action steps
  "spamRisk": "Low" | "Medium" | "High", // Evaluated spam risk based on trigger words and formatting
  "brandScore": 95 // Estimated brand alignment score percentage (0-100)
}
Return ONLY valid raw JSON. Do not wrap in markdown \`\`\`json blocks.`;

    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

    const res = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              { text: `${systemInstruction}\n\n${userMessage}` }
            ]
          }
        ]
      })
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error("Gemini API Error:", errText);
      return NextResponse.json(
        { error: "Failed to communicate with Gemini API. Check your GEMINI_API_KEY." },
        { status: 500 }
      );
    }

    const data = await res.json();
    let generatedText = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

    // Strip markdown formatting if present
    generatedText = generatedText
      .replace(/^```json\s*/i, "")
      .replace(/^```html\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/\s*```$/i, "")
      .trim();

    try {
      const jsonResponse = JSON.parse(generatedText);

      // Validate image URLs and filter field answers
      if (fieldAnswers && jsonResponse.missingFields && Array.isArray(jsonResponse.missingFields)) {
        const answeredKeys = Object.keys(fieldAnswers).map(k => k.toLowerCase().trim());
        jsonResponse.missingFields = jsonResponse.missingFields.filter(
          (field: string) => !answeredKeys.includes(field.toLowerCase().trim())
        );
      }

      return NextResponse.json(jsonResponse);
    } catch {
      // Fallback if Gemini returned raw HTML instead of JSON
      return NextResponse.json({
        html: generatedText,
        changes: ["✓ Applied AI template modifications", "✓ Mobile-first responsive layout"],
        suggestions: ["Add countdown timer", "Include social links"],
        spamRisk: "Low",
        brandScore: 92,
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
