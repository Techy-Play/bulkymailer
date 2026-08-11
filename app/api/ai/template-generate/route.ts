import { NextRequest, NextResponse } from "next/server";
import { getSessionUserId } from "@/lib/auth";
import { db } from "@/lib/db";
import { ProviderRouter } from "@/lib/ai/provider-router";
import { AiRequestPayload } from "@/lib/ai/types";

export async function POST(req: NextRequest) {
  try {
    const userId = await getSessionUserId();
    if (!userId) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const body = await req.json();
    const { prompt, currentTemplate, conversationHistory = [] } = body;

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }
    if (!currentTemplate) {
      return NextResponse.json({ error: "Current template is required" }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "GEMINI_API_KEY is not set. Please add GEMINI_API_KEY to your environment." },
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
- Logo URL: "${logoUrl}" (If empty, use a text logo)
- Sender Name: "${sender?.fromName || user?.firstName || "BulkyMailer Team"}"
- Sender Email: "${sender?.fromEmail || user?.email}"
`;

    const coreRules = `
STRICT DESIGN DIRECTIVES & RULES:
1. YOU ARE A CO-EDITOR: You are not generating templates from scratch unless explicitly asked to. You modify the provided \`currentTemplate\` JSON based on user instructions.
2. PRESERVE UNRELATED CONTENT: Do NOT modify unrelated blocks, images, merge tags, IDs, or settings. If the user asks to change a button color, only change that button's color.
3. INTENT CLASSIFICATION: Default intent is "modify". Only use "create_new" if the user explicitly asks to start from scratch or replace the entire template.
4. SUGGESTIONS: Generate 3 contextual suggestions to help the user improve the email further.
5. ADVANCED IMAGE BLOCKS (type: "custom", customType: "advanced_image"):
   - PRESERVE IMAGE URL: MUST preserve the original fieldValues.image URL unless explicitly asked to replace it.
   - SHAPE: "Make the image circular" -> \`shape: "circle"\`. "Make the image rounded" -> \`shape: "rounded"\`. "Square" -> \`shape: "square"\`.
   - BORDER: "Add a 4px orange border" -> \`borderEnabled: true, borderWidth: 4, borderColor: "#ffa500"\`. "Make the border blue" -> change ONLY \`borderColor\`.
   - PADDING: Modify \`padding\` field.
   - CROP: "Crop the image" -> set \`cropTrigger: true\`. Do NOT modify the URL for cropping, just set \`cropTrigger\` to initiate the UI workflow.
`;

    let userMessage = `${brandContext}\n\n${coreRules}\n\n`;
    userMessage += `CURRENT TEMPLATE:\n${JSON.stringify(currentTemplate, null, 2)}\n\n`;
    
    if (conversationHistory && conversationHistory.length > 0) {
      userMessage += `RECENT CONVERSATION HISTORY:\n`;
      for (const msg of conversationHistory) {
        userMessage += `${msg.role.toUpperCase()}: ${msg.content}\n`;
      }
      userMessage += `\n`;
    }

    userMessage += `USER INSTRUCTION:\n${prompt}`;

    const systemInstruction = `You are BulkyMailer's AI Email Designer.
Return a JSON object with this EXACT schema:
{
  "intent": "modify" | "create_new",
  "summary": "Short explanation of changes made.",
  "proposedTemplate": { /* The modified or new TemplateContent JSON tree. Must match Templatical schema perfectly. */ },
  "suggestions": [
    { "label": "Short Action (e.g., Improve CTA)", "prompt": "Hidden full prompt text" }
  ]
}
IMPORTANT: ensure the proposedTemplate follows the Templatical schema, keeping all block IDs intact for unmodified blocks.`;

    const payload: AiRequestPayload = {
      systemInstruction,
      userMessage,
      prompt,
      currentTemplate,
      conversationHistory
    };

    const validatedResponse = await ProviderRouter.generate(apiKey, payload);
    return NextResponse.json(validatedResponse);

  } catch (err: any) {
    console.error("[ai_template_generate_POST]", err);
    // Determine user-friendly status and message
    const status = err.statusCode || 500;
    const message = err.message || "AI completely unavailable.";
    return NextResponse.json(
      { error: message },
      { status }
    );
  }
}
