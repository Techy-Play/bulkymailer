import { GoogleGenAI } from '@google/genai';

async function listModels() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("No API key");
    process.exit(1);
  }

  const ai = new GoogleGenAI({ apiKey });
  
  try {
    const models = await ai.models.list();
    for (const model of models) {
      console.log(`Model: ${model.name}`);
      console.log(`  Display: ${model.displayName}`);
      console.log(`  Description: ${model.description}`);
      console.log(`  Supported Generation Methods: ${model.supportedGenerationMethods?.join(', ')}`);
    }
  } catch (e) {
    console.error("Failed to list models:", e);
  }
}

listModels();
