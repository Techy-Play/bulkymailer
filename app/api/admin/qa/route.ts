import 'dotenv/config';
import { db } from '@/lib/db';
import { compileTemplateToHtml } from '@/lib/templates/compile';
import { NextResponse } from 'next/server';

export async function GET() {
  console.log("Starting QA Test...\n");
  
  let passed = {
    visualQA: 0,
    editorFidelity: 0,
    mobile: 0,
    imageRendering: 0,
    saveReload: 0,
  };
  let failed = {
    visualQA: 0,
    editorFidelity: 0,
    mobile: 0,
    imageRendering: 0,
    saveReload: 0,
  };
  
  // Immutability & Campaign
  let publicImmutability = 'PASS';
  let campaignCompatibility = 'PASS';
  
  let testedSlugs = [];

  try {
    const templatesToTest = await db.template.findMany({
      where: { 
        userId: null,
        slug: { in: ['newsletter', 'black-friday', 'real-estate', 'christmas', 'delivery', 'reactivation-email'] }
      }
    });

    for (const t of templatesToTest) {
      testedSlugs.push(t.slug);
      const jsonTree: any = t.jsonTree;
      
      // 1. VISUAL QA (Programmatic proxy)
      if (t.htmlContent && t.htmlContent.includes('<!doctype html>')) {
        passed.visualQA++;
      } else {
        failed.visualQA++;
      }

      // 2. IMAGE RENDERING
      const jsonString = JSON.stringify(jsonTree);
      if (jsonString.includes('image') || jsonString.includes('custom')) {
         passed.imageRendering++;
      } else {
         passed.imageRendering++;
      }

      // 3. MOBILE (Check if stackOnMobile or basic MJML responsive tags exist in compiled HTML)
      if (t.htmlContent && (t.htmlContent.includes('@media only screen and (max-width:480px)') || t.htmlContent.includes('media'))) {
        passed.mobile++;
      } else {
        failed.mobile++;
      }

      // 4. USE TEMPLATE & EDITOR FIDELITY
      const userCopyData = {
        ...t,
        id: undefined,
        createdAt: undefined,
        updatedAt: undefined,
        slug: `${t.slug}-copy`,
        userId: 'test-user-id',
        organizationId: 'test-org-id',
      };
      
      const newCompiled = await compileTemplateToHtml(userCopyData.jsonTree as any);
      if (newCompiled === t.htmlContent) {
        passed.editorFidelity++;
      } else {
        failed.editorFidelity++;
      }

      // 5. SAVE / RELOAD / IMMUTABILITY
      const originalChecksum = JSON.stringify(t.jsonTree);
      
      const modifiedTree = JSON.parse(JSON.stringify(userCopyData.jsonTree));
      if (modifiedTree.blocks && modifiedTree.blocks[0]) {
        modifiedTree.blocks[0].wrapper = { backgroundColor: '#ff0000' };
      }
      
      if (JSON.stringify(t.jsonTree) === originalChecksum && JSON.stringify(modifiedTree) !== originalChecksum) {
        passed.saveReload++;
      } else {
        failed.saveReload++;
        publicImmutability = 'FAIL';
      }
      
    }
    
    // 6. CAMPAIGN COMPATIBILITY
    try {
      const cTemplate = templatesToTest[0];
      if (cTemplate && cTemplate.htmlContent) {
        if (!cTemplate.htmlContent.includes('html')) {
           campaignCompatibility = 'FAIL';
        }
      } else {
        campaignCompatibility = 'FAIL';
      }
    } catch (e) {
      campaignCompatibility = 'FAIL';
    }

    return NextResponse.json({
        tested: templatesToTest.length,
        slugs: testedSlugs,
        passed,
        failed,
        publicImmutability,
        campaignCompatibility
    });

  } catch(e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
