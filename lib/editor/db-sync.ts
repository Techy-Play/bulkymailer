import { TemplateJSONNode } from './types';
import { EditorEventBus } from './events';

export async function saveTemplateJSONToDatabase(templateId: string, root: TemplateJSONNode, htmlContent: string): Promise<boolean> {
  if (!templateId) return false;
  try {
    const res = await fetch(`/api/templates/${templateId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        htmlContent,
        jsonTree: root,
      }),
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
