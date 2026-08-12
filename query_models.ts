import 'dotenv/config';
import { GoogleGenAI } from '@google/genai';

async function listModels() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("No API key");
    process.exit(1);
  }

  const ai = new GoogleGenAI({ apiKey });
  
  try {
    const response = await ai.models.list();
    for await (const model of response) {
      if (model.supportedActions && model.supportedActions.includes('generateContent')) {
        console.log(model.name);
      }
    }
  } catch (e) {
    console.error("Failed to list models:", e);
  }
}

listModels();
