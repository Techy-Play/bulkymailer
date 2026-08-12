import { TemplateJSONNode, EditorCommand, AIDeltaOperation } from './types';
import { EditorEventBus } from './events';

import { safeStringify } from '../safe-json';

function deepClone<T>(obj: T): T {
  return JSON.parse(safeStringify(obj));
}

function findNodeById(root: TemplateJSONNode, id: string): TemplateJSONNode | null {
  if (root.id === id) return root;
  if (root.children) {
    for (const child of root.children) {
      const found = findNodeById(child, id);
      if (found) return found;
    }
  }
  return null;
}

export class CommandManager {
  private undoStack: EditorCommand[] = [];
  private redoStack: EditorCommand[] = [];
  private root: TemplateJSONNode;

  constructor(initialRoot: TemplateJSONNode) {
    this.root = deepClone(initialRoot);
  }

  getRoot(): TemplateJSONNode {
    return this.root;
  }

  setRoot(newRoot: TemplateJSONNode): void {
    this.root = deepClone(newRoot);
  }

  execute(command: EditorCommand): TemplateJSONNode {
    this.root = command.execute(this.root);
    this.undoStack.push(command);
    this.redoStack = []; // Clear redo stack on new action

    EditorEventBus.emit('CommandExecuted', {
      commandName: command.name,
      root: this.root,
      canUndo: this.canUndo(),
      canRedo: this.canRedo(),
    });

    return this.root;
  }

  undo(): TemplateJSONNode | null {
    if (!this.canUndo()) return null;
    const command = this.undoStack.pop()!;
    this.root = command.undo(this.root);
    this.redoStack.push(command);

    EditorEventBus.emit('CommandExecuted', {
      commandName: `Undo (${command.name})`,
      root: this.root,
      canUndo: this.canUndo(),
      canRedo: this.canRedo(),
    });

    return this.root;
  }

  redo(): TemplateJSONNode | null {
    if (!this.canRedo()) return null;
    const command = this.redoStack.pop()!;
    this.root = command.execute(this.root);
    this.undoStack.push(command);

    EditorEventBus.emit('CommandExecuted', {
      commandName: `Redo (${command.name})`,
      root: this.root,
      canUndo: this.canUndo(),
      canRedo: this.canRedo(),
    });

    return this.root;
  }

  canUndo(): boolean {
    return this.undoStack.length > 0;
  }

  canRedo(): boolean {
    return this.redoStack.length > 0;
  }
}

// ---------------------------------------------------------------------------
// Atomic Command Helpers
// ---------------------------------------------------------------------------

export function createUpdatePropCommand(
  nodeId: string,
  propKey: string,
  newValue: any
): EditorCommand {
  let prevValue: any;

  return {
    id: `cmd-prop-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    name: `Update ${propKey}`,
    timestamp: Date.now(),
    execute: (root) => {
      const cloned = deepClone(root);
      const target = findNodeById(cloned, nodeId);
      if (target && !target.locked) {
        if (prevValue === undefined) {
          prevValue = target.props?.[propKey];
        }
        target.props = { ...target.props, [propKey]: newValue };
        target.version = (target.version || 1) + 1;
      }
      return cloned;
    },
    undo: (root) => {
      const cloned = deepClone(root);
      const target = findNodeById(cloned, nodeId);
      if (target && !target.locked && prevValue !== undefined) {
        target.props = { ...target.props, [propKey]: prevValue };
        target.version = (target.version || 1) + 1;
      }
      return cloned;
    },
  };
}

export function createUpdateStyleCommand(
  nodeId: string,
  styleKey: string,
  newValue: any
): EditorCommand {
  let prevValue: any;

  return {
    id: `cmd-style-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    name: `Update ${styleKey}`,
    timestamp: Date.now(),
    execute: (root) => {
      const cloned = deepClone(root);
      const target = findNodeById(cloned, nodeId);
      if (target && !target.locked) {
        if (prevValue === undefined) {
          prevValue = target.style?.[styleKey];
        }
        target.style = { ...target.style, [styleKey]: newValue };
        target.version = (target.version || 1) + 1;
      }
      return cloned;
    },
    undo: (root) => {
      const cloned = deepClone(root);
      const target = findNodeById(cloned, nodeId);
      if (target && !target.locked) {
        target.style = { ...target.style, [styleKey]: prevValue };
        target.version = (target.version || 1) + 1;
      }
      return cloned;
    },
  };
}

export function createApplyAIDeltaCommand(
  operations: AIDeltaOperation[]
): EditorCommand {
  return {
    id: `cmd-ai-${Date.now()}`,
    name: `AI Delta Patch (${operations.length} ops)`,
    timestamp: Date.now(),
    execute: (root) => {
      const cloned = deepClone(root);
      operations.forEach((op) => {
        const target = findNodeById(cloned, op.nodeId);
        if (target && !target.locked) {
          if (op.operation === 'updateProp' && op.property) {
            target.props = { ...target.props, [op.property]: op.value };
          } else if (op.operation === 'updateStyle' && op.property) {
            target.style = { ...target.style, [op.property]: op.value };
          } else if (op.operation === 'updateText') {
            target.props = { ...target.props, content: op.value, title: op.value };
          }
          target.version = (target.version || 1) + 1;
        }
      });
      return cloned;
    },
    undo: (root) => {
      return root; // Snapshots handle AI revert
    },
  };
}
