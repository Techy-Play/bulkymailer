import { TemplateContent } from "@templatical/types";
import { renderToMjml } from "@templatical/renderer";
import mjml2html from "mjml";

export async function compileTemplateToHtml(templateContent: TemplateContent): Promise<string | undefined> {
  if (!templateContent) return undefined;

  try {
    const mjmlString = await renderToMjml(templateContent, {
      async renderCustomBlock(block: any) {
        if (block.customType === 'advanced_image') {
          const src = block.fieldValues?.image || "https://placehold.co/600x400/e2e8f0/64748b?text=Image";
          const alt = block.fieldValues?.altText || "Image";
          const padding = block.fieldValues?.padding || 0;
          return `<mj-image src="${src}" alt="${alt}" padding="${padding}px" />`;
        }
        return '';
      }
    });

    const mjmlFunc = typeof mjml2html === 'function' ? mjml2html : (mjml2html as any).default;
    const result = await mjmlFunc(mjmlString, { validationLevel: "soft" });
    
    if (result && result.errors && result.errors.length > 0) {
      console.warn("[MJML_COMPILE_WARNINGS]", result.errors);
    }

    return result.html;
  } catch (err) {
    console.error("[compileTemplateToHtml] Failed:", err);
    throw err;
  }
}
