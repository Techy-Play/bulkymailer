import fs from 'fs';
import path from 'path';
import { db as prisma } from '@/lib/db';
import { compileTemplateToHtml } from '@/lib/templates/compile';
import { NextResponse } from 'next/server';

export async function GET() {
  console.log('Seeding Public Templates from MJML Conversions...');
  
  const convertedFilePath = path.resolve(process.cwd(), 'scratch/converted-templates.json');
  if (!fs.existsSync(convertedFilePath)) {
    return NextResponse.json({ error: `Cannot find ${convertedFilePath}` }, { status: 400 });
  }

  const templates = JSON.parse(fs.readFileSync(convertedFilePath, 'utf-8'));
  let createdCount = 0;
  let updatedCount = 0;
  let failedCount = 0;
  const errors = [];

  for (const t of templates) {
    try {
      const jsonTree = t.jsonTree;
      if (!jsonTree || !jsonTree.blocks || !jsonTree.settings) {
        throw new Error("Invalid TemplateContent structure");
      }

      const compiledHtml = await compileTemplateToHtml(jsonTree);
      if (!compiledHtml || compiledHtml.trim().length === 0) {
        throw new Error("Compilation resulted in empty HTML");
      }
      
      const existing = await prisma.template.findFirst({
        where: { slug: t.slug, userId: null, generation: 'MODERN' }
      });

      if (existing) {
        await prisma.template.update({
          where: { id: existing.id },
          data: {
            name: t.name,
            category: t.category,
            description: t.desc,
            previewText: t.name,
            htmlContent: compiledHtml,
            jsonTree: jsonTree
          }
        });
        updatedCount++;
      } else {
        await prisma.template.create({
          data: {
            slug: t.slug,
            name: t.name,
            category: t.category,
            generation: 'MODERN',
            userId: null,
            organizationId: null,
            description: t.desc,
            previewText: t.name,
            htmlContent: compiledHtml,
            jsonTree: jsonTree
          }
        });
        createdCount++;
      }
    } catch (e: any) {
      console.error(`Failed to process ${t.name}:`, e);
      failedCount++;
      errors.push({ name: t.name, error: e.message });
    }
  }

  return NextResponse.json({
    createdCount,
    updatedCount,
    failedCount,
    errors
  });
}
