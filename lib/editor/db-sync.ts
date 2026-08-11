import { TemplateJSONNode } from './types';
import { EditorEventBus } from './events';

export async function saveTemplateJSONToDatabase(
  templateId: string,
  root: TemplateJSONNode,
  htmlContent: string,
  name?: string,
  category?: string
): Promise<boolean> {
  if (!templateId) return false;
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
      EditorEventBus.emit('AutosaveQueued', {
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      });
      return true;
    }
    return false;
  } catch (err) {
    console.error('[db-sync] Failed to persist template JSON to database:', err);
    return false;
  }
}
