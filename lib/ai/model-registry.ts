import { GoogleGenAI } from '@google/genai';
import { ModelRecord, ModelHealth } from './types';

const DISCOVERY_CACHE_TTL_MS = 1000 * 60 * 15; // 15 minutes
let cachedModels: ModelRecord[] | null = null;
let cacheTimestamp: number = 0;

const healthRegistry = new Map<string, ModelHealth>();

/**
 * Returns available model records, discovering from the API if needed.
 * Will fallback to a hardcoded stable list ONLY if discovery utterly fails
 * and no cached list exists, to prevent catastrophic unavailability.
 */
export async function getEligibleModels(apiKey: string): Promise<ModelRecord[]> {
  const now = Date.now();
  if (cachedModels && now - cacheTimestamp < DISCOVERY_CACHE_TTL_MS) {
    return cachedModels;
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.list();
    const discovered: ModelRecord[] = [];
    
    for await (const model of response) {
      const name = model.name;
      if (!name) continue;
      if (!model.supportedActions || !model.supportedActions.includes('generateContent')) {
        continue;
      }
      
      // We need general text generation. Ignore embeddings, audio, vision-only, aqa, etc.
      // Stable production models generally start with 'models/gemini' and end with 'flash' or 'pro' 
      // avoiding '-image', '-audio', '-tts'
      if (!name.includes("gemini")) continue;
      if (name.includes("embedding") || name.includes("audio") || name.includes("tts") || name.includes("image") || name.includes("aqa") || name.includes("veo") || name.includes("imagen")) {
        continue;
      }
      
      // Fallback model priority logic:
      let priority = 10;
      if (name.includes("gemini-1.5-flash")) priority = 3;
      else if (name.includes("gemini-1.5-pro")) priority = 4;
      else if (name.includes("gemini-2.5-flash") || name.includes("gemini-3.5-flash")) priority = 1;
      else if (name.includes("gemini-2.5-pro") || name.includes("gemini-3.5-pro")) priority = 2;
      else if (name.includes("latest")) priority = 5;

      discovered.push({
        id: name,
        provider: "google",
        apiVersion: "v1beta", // default for GenAI SDK structured output currently
        capabilities: {
          generateContent: true,
          structuredOutput: true
        },
        priority
      });
    }

    if (discovered.length > 0) {
      // Sort by priority
      discovered.sort((a, b) => a.priority - b.priority);
      cachedModels = discovered;
      cacheTimestamp = now;
      return cachedModels;
    }
  } catch (error) {
    console.error("[AI_REGISTRY] Model discovery failed:", error);
  }

  // If discovery fails and we have a cache, use it even if expired
  if (cachedModels && cachedModels.length > 0) {
    console.warn("[AI_REGISTRY] Using expired cached models due to discovery failure.");
    return cachedModels;
  }

  // Ultimate safe fallback state if completely unreachable during startup
  console.warn("[AI_REGISTRY] Returning safe default model configuration.");
  return [
    { id: "models/gemini-1.5-flash", provider: "google", apiVersion: "v1beta", capabilities: { generateContent: true, structuredOutput: true }, priority: 1 }
  ];
}

export function getModelHealth(modelId: string): ModelHealth {
  if (!healthRegistry.has(modelId)) {
    healthRegistry.set(modelId, {
      modelId,
      failureCount: 0,
      lastFailure: null,
      cooldownUntil: null,
      lastSuccess: null
    });
  }
  return healthRegistry.get(modelId)!;
}

export function reportModelSuccess(modelId: string) {
  const health = getModelHealth(modelId);
  health.failureCount = 0;
  health.lastSuccess = Date.now();
  health.cooldownUntil = null;
}

export function reportModelFailure(modelId: string, status: number) {
  const health = getModelHealth(modelId);
  const now = Date.now();
  
  health.failureCount += 1;
  health.lastFailure = now;

  // 404 means model is gone/invalid in this API version. 
  // Cooldown for a very long time (1 hour).
  if (status === 404) {
    health.cooldownUntil = now + 1000 * 60 * 60;
  } 
  // 429 means rate limited. Cooldown for a moderate time (60 seconds).
  else if (status === 429) {
    health.cooldownUntil = now + 1000 * 60;
  }
  // 503 means service unavailable. Cooldown for 30 seconds.
  else if (status === 503 || status === 502 || status === 504) {
    health.cooldownUntil = now + 1000 * 30;
  }
}

export function isModelAvailable(modelId: string): boolean {
  const health = getModelHealth(modelId);
  if (health.cooldownUntil && Date.now() < health.cooldownUntil) {
    return false;
  }
  return true;
}

// FOR TESTING ONLY (Phase 25)
export function injectFakeTestModel() {
  if (!cachedModels) cachedModels = [];
  cachedModels.unshift({
    id: "models/gemini-9.9-fake",
    provider: "google",
    apiVersion: "v1beta",
    capabilities: { generateContent: true, structuredOutput: true },
    priority: -1 // Top priority so it gets picked first
  });
}
