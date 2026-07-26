import { TemplateJSONNode, ValidationIssue, DesignTokens } from './types';

export type EditorEventType =
  | 'NodeSelected'
  | 'NodeUpdated'
  | 'CommandExecuted'
  | 'ThemeChanged'
  | 'HealthCheckCompleted'
  | 'AutosaveQueued'
  | 'AIDeltaApplied'
  | 'MonacoSynced';

export interface EditorEventPayloads {
  NodeSelected: { nodeId: string | null; node: TemplateJSONNode | null };
  NodeUpdated: { nodeId: string; node: TemplateJSONNode; root: TemplateJSONNode };
  CommandExecuted: { commandName: string; root: TemplateJSONNode; canUndo: boolean; canRedo: boolean };
  ThemeChanged: { tokens: DesignTokens };
  HealthCheckCompleted: { issues: ValidationIssue[]; score: number };
  AutosaveQueued: { timestamp: string };
  AIDeltaApplied: { operationsCount: number; root: TemplateJSONNode };
  MonacoSynced: { html: string };
}

type EventCallback<K extends EditorEventType> = (payload: EditorEventPayloads[K]) => void;

class EditorEventBusImpl {
  private listeners: Map<EditorEventType, Set<Function>> = new Map();

  on<K extends EditorEventType>(event: K, callback: EventCallback<K>): () => void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    const set = this.listeners.get(event)!;
    set.add(callback);

    // Return unsubscribe function
    return () => {
      set.delete(callback);
    };
  }

  emit<K extends EditorEventType>(event: K, payload: EditorEventPayloads[K]): void {
    const set = this.listeners.get(event);
    if (set) {
      set.forEach((cb) => {
        try {
          cb(payload);
        } catch (err) {
          console.error(`[EditorEventBus] Error handling event ${event}:`, err);
        }
      });
    }
  }

  clear(): void {
    this.listeners.clear();
  }
}

export const EditorEventBus = new EditorEventBusImpl();
