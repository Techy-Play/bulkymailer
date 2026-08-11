export interface AiSuggestion {
  label: string;
  prompt: string;
}

export interface AiResponseData {
  intent: "modify" | "create_new";
  summary: string;
  proposedTemplate: any;
  suggestions: AiSuggestion[];
}

export interface ModelCapabilities {
  generateContent: boolean;
  structuredOutput: boolean;
}

export interface ModelRecord {
  id: string; // e.g., 'models/gemini-3.5-flash'
  provider: "google";
  apiVersion: string; // e.g., 'v1' or 'v1beta'
  capabilities: ModelCapabilities;
  priority: number; // 1 is highest priority
}

export interface ModelHealth {
  modelId: string;
  failureCount: number;
  lastFailure: number | null;
  cooldownUntil: number | null;
  lastSuccess: number | null;
}

export interface AiProviderConfig {
  apiKey: string;
}

export interface AiRequestPayload {
  systemInstruction: string;
  userMessage: string;
  // Raw string for caching/preservation context
  prompt: string;
  currentTemplate: any;
  conversationHistory: any[];
}
