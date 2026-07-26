/**
 * Enterprise Visual Document Engine — Core Type Definitions
 */

export interface NodeCapabilities {
  resize: boolean;
  duplicate: boolean;
  delete: boolean;
  move: boolean;
  inlineEdit: boolean;
  ai: boolean;
}

export type ComponentType =
  | 'hero'
  | 'button'
  | 'image'
  | 'heading'
  | 'text'
  | 'container'
  | 'product'
  | 'social'
  | 'divider'
  | 'footer';

export interface TemplateJSONNode {
  id: string; // Permanent stable ID (e.g. "hero-1", "button-2")
  type: ComponentType;
  name: string;
  locked?: boolean;
  visible?: boolean;
  version: number;
  capabilities: NodeCapabilities;
  props: Record<string, any>;
  style?: Record<string, any>;
  children?: TemplateJSONNode[];
  createdAt?: string;
  updatedAt?: string;
}

export interface DesignTokens {
  colors: {
    primary: string;
    secondary: string;
    background: string;
    cardBackground: string;
    textPrimary: string;
    textMuted: string;
    accent: string;
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  borderRadius: {
    none: string;
    sm: string;
    md: string;
    lg: string;
    full: string;
  };
  typography: {
    fontFamily: string;
    baseSize: string;
  };
}

export interface ValidationIssue {
  id: string;
  severity: 'error' | 'warning' | 'info';
  category: 'accessibility' | 'deliverability' | 'outlook' | 'mergetags' | 'brand';
  nodeId?: string;
  message: string;
  ruleId: string;
  recommendation?: string;
}

export interface AIDeltaOperation {
  operation: 'updateProp' | 'updateStyle' | 'updateText' | 'insertNode' | 'removeNode' | 'replaceNode';
  nodeId: string;
  property?: string;
  value?: any;
  nodeData?: Partial<TemplateJSONNode>;
  explanation?: string;
}

export interface PluginManifest {
  type: ComponentType;
  name: string;
  icon: string; // Lucide icon identifier
  category: 'basic' | 'layout' | 'commerce' | 'structural';
  version: string;
  supportsAI: boolean;
  supportsDarkMode: boolean;
  supportsMobile: boolean;
}

export interface EditorCommand {
  id: string;
  name: string;
  timestamp: number;
  execute: (root: TemplateJSONNode) => TemplateJSONNode;
  undo: (root: TemplateJSONNode) => TemplateJSONNode;
}
