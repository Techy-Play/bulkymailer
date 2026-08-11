import { TemplateJSONNode } from './types';
import { EditorEventBus } from './events';

export interface SaveResult {
  ok: boolean;
  templateId?: string;
  isForked?: boolean;
}

export async function saveTemplateJSONToDatabase(
  templateId: string,
  root: TemplateJSONNode,
  htmlContent: string,
  name?: string,
  category?: string
): Promise<SaveResult> {
  if (!templateId) return { ok: false };
  try {
    const payload: Record<string, unknown> = {
      htmlContent,
      jsonTree: root,
    };
    if (name !== undefined) payload.name = name;
    if (category !== undefined) payload.category = category;

    const res = await fetch(`/api/templates/${templateId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      const data = await res.json();
      EditorEventBus.emit('AutosaveQueued', {
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      });
      return {
        ok: true,
        templateId: data.template?.id || templateId,
        isForked: !!data.isForked,
      };
    }
    return { ok: false };
  } catch (err) {
    console.error('[db-sync] Failed to persist template JSON to database:', err);
    return { ok: false };
  }
}
