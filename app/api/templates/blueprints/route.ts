import { NextResponse } from 'next/server';
import { blueprints } from '@/lib/templates/blueprints';

export const revalidate = 86400; // Cache for 24 hours

export async function GET() {
  try {
    const { renderToMjml } = await import('@templatical/renderer');
    const mjml2html = (await import('mjml')).default;

    const previews = await Promise.all(blueprints.map(async (bp) => {
      if (bp.id === 'blank') {
        return {
          id: bp.id,
          name: bp.name,
          description: bp.description,
          category: bp.category,
          htmlContent: `
            <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; height:100%; min-height:400px; font-family:sans-serif; color:#6B7280; background-color:#F9FAFB;">
              <div style="font-size:48px; font-weight:300; margin-bottom:16px;">+</div>
              <div style="font-size:16px; font-weight:500;">Start building here</div>
            </div>
          `
        };
      }

      try {
        const content = bp.getContent();
        const mjml = await renderToMjml(content);
        const compiled = await mjml2html(mjml);
        
        return {
          id: bp.id,
          name: bp.name,
          description: bp.description,
          category: bp.category,
          htmlContent: compiled.html
        };
      } catch (err) {
        console.error(`Failed to compile blueprint ${bp.id}:`, err);
        return {
          id: bp.id,
          name: bp.name,
          description: bp.description,
          category: bp.category,
          htmlContent: `<div style="padding:20px; color:red;">Preview unavailable</div>`
        };
      }
    }));

    return NextResponse.json({ blueprints: previews });
  } catch (err) {
    console.error("[blueprints_GET]", err);
    return NextResponse.json({ error: "Failed to generate blueprint previews" }, { status: 500 });
  }
}
