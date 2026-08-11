import { GoogleGenAI } from '@google/genai';
import { getEligibleModels, reportModelFailure, reportModelSuccess, isModelAvailable } from './model-registry';
import { AiProviderError, classifyHttpError } from './errors';
import { validateAiResponseSchema, validatePreservation } from './validator';
import { AiRequestPayload, AiResponseData, ModelRecord } from './types';

// Bounded retry limits
const MAX_RETRIES_PER_MODEL = 2; // initial + 2 retries = 3 attempts max per model

async function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function calculateBackoff(attempt: number): number {
  if (attempt === 1) return 250;
  if (attempt === 2) return 750;
  return 1500;
}

/**
 * Maps the router request payload to the specific structure required by GoogleGenAI SDK
 */
async function callGeminiSDK(
  model: ModelRecord,
  apiKey: string,
  payload: AiRequestPayload
): Promise<string> {
  const ai = new GoogleGenAI({ apiKey });

  const response = await ai.models.generateContent({
    model: model.id,
    contents: payload.userMessage,
    config: {
      systemInstruction: payload.systemInstruction,
      responseMimeType: "application/json",
      // Enforce JSON parsing directly from SDK (though we still validate structure ourselves)
    }
  });

  if (!response.text) {
    throw new AiProviderError("Model returned empty text", "UNKNOWN_PROVIDER_ERROR", 500);
  }

  return response.text;
}

export class ProviderRouter {
  
  static async generate(
    apiKey: string,
    payload: AiRequestPayload
  ): Promise<AiResponseData> {
    const models = await getEligibleModels(apiKey);
    let lastError: Error | null = null;

    for (const model of models) {
      if (!isModelAvailable(model.id)) {
        console.log(`[AI_ROUTER] Skipping model ${model.id} due to health cooldown.`);
        continue;
      }

      console.log(`[AI_ROUTER] trying model: ${model.id}`);

      let attempts = 0;
      let success = false;
      let modelResponse: string | null = null;

      while (attempts <= MAX_RETRIES_PER_MODEL && !success) {
        attempts++;
        try {
          modelResponse = await callGeminiSDK(model, apiKey, payload);
          success = true;
        } catch (error: any) {
          // GoogleGenAI throws ApiError on non-200 HTTP responses
          const status = error.status || error.response?.status || 500;
          const message = error.message || String(error);
          
          const classification = classifyHttpError(status, message);
          
          if (
            classification === "AUTHENTICATION_ERROR" || 
            classification === "PERMISSION_ERROR"
          ) {
            console.error(`[AI_ROUTER] Fatal Auth/Perm error with model ${model.id}. Halting router.`);
            // These are fatal to the whole app, do not fallback
            throw new AiProviderError(message, classification, status);
          }

          if (
            classification === "MODEL_UNAVAILABLE" || 
            classification === "INVALID_MODEL_CAPABILITY" ||
            classification === "PERMANENT_REQUEST_ERROR"
          ) {
            console.warn(`[AI_ROUTER] model unavailable or incapable: ${model.id} (${classification})`);
            reportModelFailure(model.id, status);
            lastError = new AiProviderError(message, classification, status);
            break; // Stop retrying this model, move to next model
          }

          // Transient errors (429, 502, 503, 504)
          reportModelFailure(model.id, status);
          lastError = new AiProviderError(message, classification, status);
          
          if (attempts <= MAX_RETRIES_PER_MODEL) {
            const ms = calculateBackoff(attempts);
            console.warn(`[AI_ROUTER] Transient error on ${model.id} (${status}). Retrying in ${ms}ms...`);
            await delay(ms);
          } else {
            console.warn(`[AI_ROUTER] Max retries exhausted for ${model.id}`);
          }
        }
      }

      if (success && modelResponse) {
        try {
          // Parse JSON manually as GenAI response.text gives a string
          let rawJson;
          try {
            rawJson = JSON.parse(modelResponse);
          } catch {
            throw new Error("Failed to parse JSON string from AI response.");
          }

          const validatedData = validateAiResponseSchema(rawJson);
          validatePreservation(payload.currentTemplate, validatedData.proposedTemplate, validatedData.intent);
          
          console.log(`[AI_ROUTER] response validated from ${model.id}`);
          reportModelSuccess(model.id);
          return validatedData;

        } catch (validationError: any) {
          console.error(`[AI_ROUTER] Validation failed for ${model.id}:`, validationError.message);
          reportModelFailure(model.id, 400); // Treat as capability/schema failure internally
          lastError = validationError;
          console.log(`[AI_ROUTER] fallback triggered due to validation failure`);
          // Continues to next model fallback
        }
      } else {
        console.log(`[AI_ROUTER] fallback triggered due to API failure`);
      }
    }

    // If we exhaust all models
    console.error(`[AI_ROUTER] All compatible models failed.`);
    throw lastError || new Error("AI completely unavailable.");
  }
}
