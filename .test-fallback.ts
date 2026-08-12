import { ProviderRouter } from './lib/ai/provider-router';
import { injectFakeTestModel, getEligibleModels } from './lib/ai/model-registry';
import * as dotenv from 'dotenv';
dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error("No API key");
  process.exit(1);
}

const payload = {
  systemInstruction: "You are an AI Email Designer. Return a JSON matching { intent: 'modify', summary: '...', proposedTemplate: { blocks: [] }, suggestions: [] }",
  userMessage: "Change CTA to blue",
  prompt: "Change CTA to blue",
  currentTemplate: {
    blocks: [
      { id: "b1", type: "paragraph", fieldValues: { text: "Hello" } },
      { id: "b2", type: "button", fieldValues: { backgroundColor: "#000" } }
    ]
  },
  conversationHistory: []
};

async function runTest() {
  console.log("=== STARTING FALLBACK TEST ===");
  // Force the fake model into the top of the priority list
  injectFakeTestModel();
  
  const models = await getEligibleModels(apiKey);
  console.log("Models to try:");
  models.forEach(m => console.log(`- ${m.id} (priority: ${m.priority})`));

  try {
    const result = await ProviderRouter.generate(apiKey, payload as any);
    console.log("\n=== TEST PASSED ===");
    console.log("Result Intent:", result.intent);
    console.log("Result Summary:", result.summary);
  } catch (error) {
    console.error("\n=== TEST FAILED ===");
    console.error(error);
  }
}

runTest();
