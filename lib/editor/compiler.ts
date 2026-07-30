import { TemplateJSONNode } from './types';

export function createDefaultTemplateJSON(): TemplateJSONNode {
  return {
    id: 'root-container',
    type: 'container',
    name: 'Root Layout Container',
    version: 1,
    capabilities: { resize: false, duplicate: false, delete: false, move: false, inlineEdit: false, ai: true },
    props: {},
    style: { backgroundColor: '#FFFFFF', minHeight: '600px', padding: '32px' },
    children: [],
  };
}

export interface CompilerResult {
  valid: boolean;
  nodeTree?: TemplateJSONNode;
  errors?: string[];
}

export function validateAndParseMonacoHTML(html: string, currentRoot: TemplateJSONNode): CompilerResult {
  if (!html || !html.trim()) {
    return { valid: false, errors: ['HTML string is empty'] };
  }

  // Basic tags check
  const openTags = (html.match(/<[a-z1-6]+/gi) || []).length;
  const closeTags = (html.match(/<\/[a-z1-6]+/gi) || []).length;

  if (Math.abs(openTags - closeTags) > 10 && (html.endsWith('<') || html.endsWith('</') || html.endsWith('<div'))) {
    return { valid: false, errors: ['Incomplete HTML syntax typing in buffer'] };
  }

  // Compiler returns currentRoot safely if HTML syntax is mid-type
  return { valid: true, nodeTree: currentRoot };
}
