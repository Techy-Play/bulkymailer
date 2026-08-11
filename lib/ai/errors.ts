export type AiErrorClassification =
  | "PERMANENT_REQUEST_ERROR"
  | "AUTHENTICATION_ERROR"
  | "PERMISSION_ERROR"
  | "MODEL_UNAVAILABLE"
  | "RATE_LIMITED"
  | "TEMPORARY_PROVIDER_ERROR"
  | "INVALID_MODEL_CAPABILITY"
  | "INVALID_STRUCTURED_OUTPUT"
  | "UNKNOWN_PROVIDER_ERROR";

export class AiProviderError extends Error {
  public classification: AiErrorClassification;
  public statusCode: number;

  constructor(message: string, classification: AiErrorClassification, statusCode: number = 500) {
    super(message);
    this.name = "AiProviderError";
    this.classification = classification;
    this.statusCode = statusCode;
  }
}

export class AiValidationError extends Error {
  public classification: AiErrorClassification;

  constructor(message: string) {
    super(message);
    this.name = "AiValidationError";
    this.classification = "INVALID_STRUCTURED_OUTPUT";
  }
}

export function classifyHttpError(status: number, message: string): AiErrorClassification {
  if (status === 401) return "AUTHENTICATION_ERROR";
  if (status === 403) return "PERMISSION_ERROR";
  if (status === 404) return "MODEL_UNAVAILABLE";
  if (status === 429) return "RATE_LIMITED";
  if (status === 502 || status === 503 || status === 504) return "TEMPORARY_PROVIDER_ERROR";
  
  if (status === 400) {
    const lowerMessage = message.toLowerCase();
    if (lowerMessage.includes("capability") || lowerMessage.includes("unsupported")) {
      return "INVALID_MODEL_CAPABILITY";
    }
    return "PERMANENT_REQUEST_ERROR";
  }

  return "UNKNOWN_PROVIDER_ERROR";
}
