import { AiValidationError } from './errors';
import { AiResponseData } from './types';

function isValidString(val: any): boolean {
  return typeof val === 'string' && val.trim().length > 0;
}

/**
 * Validates the raw JSON object matches the required schema.
 */
export function validateAiResponseSchema(rawJson: any): AiResponseData {
  if (!rawJson || typeof rawJson !== 'object') {
    throw new AiValidationError("AI response is not a valid JSON object.");
  }

  if (rawJson.intent !== "modify" && rawJson.intent !== "create_new") {
    throw new AiValidationError("Invalid intent. Must be 'modify' or 'create_new'.");
  }

  if (!isValidString(rawJson.summary)) {
    throw new AiValidationError("Missing or invalid summary.");
  }

  if (!rawJson.proposedTemplate || typeof rawJson.proposedTemplate !== 'object') {
    throw new AiValidationError("Missing or invalid proposedTemplate.");
  }

  if (!Array.isArray(rawJson.proposedTemplate.blocks)) {
    throw new AiValidationError("proposedTemplate must contain a blocks array.");
  }

  if (rawJson.suggestions && !Array.isArray(rawJson.suggestions)) {
    throw new AiValidationError("Suggestions must be an array.");
  }

  // Validate suggestions
  const suggestions = (rawJson.suggestions || []).filter((s: any) => 
    s && typeof s === 'object' && isValidString(s.label) && isValidString(s.prompt)
  );

  return {
    intent: rawJson.intent,
    summary: rawJson.summary,
    proposedTemplate: rawJson.proposedTemplate,
    suggestions
  };
}

/**
 * Extracts a map of block properties for fast lookup.
 */
function extractBlocks(blocks: any[], map: Map<string, any>) {
  for (const block of blocks) {
    if (block.id) {
      map.set(block.id, block);
    }
    if (block.children && Array.isArray(block.children)) extractBlocks(block.children, map);
    if (block.props?.children && Array.isArray(block.props.children)) extractBlocks(block.props.children, map);
    if (block.blocks && Array.isArray(block.blocks)) extractBlocks(block.blocks, map);
  }
}

/**
 * Ensures the proposed template preserves unrelated content.
 * Checks that existing block IDs, merge tags, and image URLs are untouched
 * unless the AI explicitly intended to modify them. (Since we cannot reliably know
 * exact intent programmatically, we enforce strict preservation for non-targeted types or warn).
 * 
 * Note: If intent is create_new, preservation validation is skipped.
 */
export function validatePreservation(currentTemplate: any, proposedTemplate: any, intent: "modify" | "create_new") {
  if (intent === "create_new") return; // Completely new templates don't preserve

  const currentBlocks = new Map<string, any>();
  if (currentTemplate?.blocks) {
    extractBlocks(currentTemplate.blocks, currentBlocks);
  }

  const proposedBlocks = new Map<string, any>();
  if (proposedTemplate?.blocks) {
    extractBlocks(proposedTemplate.blocks, proposedBlocks);
  }

  // Core safety check: Did the AI hallucinate away a huge chunk of the email?
  if (proposedBlocks.size < currentBlocks.size * 0.5 && currentBlocks.size > 2) {
    throw new AiValidationError("Preservation Violation: AI removed more than 50% of the blocks unexpectedly.");
  }

  for (const [id, currentBlock] of currentBlocks.entries()) {
    const proposedBlock = proposedBlocks.get(id);
    if (proposedBlock) {
      // Check for advanced_image URL tampering
      if (currentBlock.type === "custom" && currentBlock.customType === "advanced_image") {
         const currentUrl = currentBlock.fieldValues?.image;
         const proposedUrl = proposedBlock.fieldValues?.image;
         
         // If a URL existed and the AI wiped it out or changed it to a placeholder, reject.
         if (currentUrl && (!proposedUrl || proposedUrl.includes("placeholder") || proposedUrl.includes("example.com"))) {
            throw new AiValidationError(`Preservation Violation: AI dangerously mutated image URL for block ${id}`);
         }
      }
      
      // Check for text merge tag preservation
      if (currentBlock.type === "paragraph" || currentBlock.type === "title") {
         const currentText = currentBlock.fieldValues?.text || "";
         const proposedText = proposedBlock.fieldValues?.text || "";
         
         // If current text contains a merge tag, ensure the AI didn't destroy the syntax (e.g., {{firstName}})
         const mergeTagRegex = /\{\{[^}]+\}\}/g;
         const currentTags = currentText.match(mergeTagRegex) || [];
         
         for (const tag of currentTags) {
           if (!proposedText.includes(tag)) {
             // AI might legitimately remove a paragraph, but if it modifies it, it shouldn't drop merge tags randomly
             throw new AiValidationError(`Preservation Violation: AI removed merge tag ${tag} from block ${id}`);
           }
         }
      }
    }
  }
}
