import 'dotenv/config';
import { db } from '../lib/db';

async function validateTemplates() {
  console.log("Template Validation\n────────────────────────────");

  try {
    const templates = await db.template.findMany({
      where: { userId: null, generation: 'MODERN' }
    });

    let passed = 0;
    let failed = 0;

    for (const t of templates) {
      let isError = false;
      let reasons = [];

      // 1. Ownership & generation check
      if (t.userId !== null || t.organizationId !== null) {
        isError = true;
        reasons.push("Ownership is not completely public (null).");
      }
      
      // 2. Content check
      if (!t.jsonTree) {
        isError = true;
        reasons.push("Missing jsonTree (TemplateContent).");
      }
      if (!t.htmlContent || t.htmlContent.trim().length === 0) {
        isError = true;
        reasons.push("Empty or missing htmlContent.");
      }

      if (isError) {
        console.log(`✗ ${t.slug} - FAILED`);
        reasons.forEach(r => console.log(`  - ${r}`));
        failed++;
      } else {
        console.log(`✓ ${t.slug}`);
        passed++;
      }
    }

    console.log(`\nPassed: ${passed}`);
    console.log(`Failed: ${failed}`);

    if (failed > 0) {
      process.exit(1);
    }
  } catch(e) {
    console.error("Validation error:", e);
    process.exit(1);
  } finally {
    await db.$disconnect();
  }
}

validateTemplates();
