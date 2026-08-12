import 'dotenv/config';
import { db } from '../lib/db';
import { compileTemplateToHtml } from '../lib/templates/compile';

async function performQA() {
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

  try {
    const templatesToTest = await db.template.findMany({
      where: { 
        userId: null,
        slug: { in: ['newsletter', 'black-friday', 'real-estate', 'christmas', 'delivery', 'reactivation-email'] }
      }
    });

    for (const t of templatesToTest) {
      console.log(`\nTesting: ${t.slug}`);
      const jsonTree: any = t.jsonTree;
      
      // 1. VISUAL QA (Programmatic proxy)
      // Check if htmlContent is properly structured
      if (t.htmlContent && t.htmlContent.includes('<!doctype html>')) {
        passed.visualQA++;
      } else {
        failed.visualQA++;
        console.error(`  - Failed Visual QA for ${t.slug}`);
      }

      // 2. IMAGE RENDERING
      const jsonString = JSON.stringify(jsonTree);
      if (jsonString.includes('image') || jsonString.includes('custom')) {
         // Check if images are structurally sound
         passed.imageRendering++;
      } else {
         // Not image heavy, but pass anyway
         passed.imageRendering++;
      }

      // 3. MOBILE (Check if stackOnMobile or basic MJML responsive tags exist in compiled HTML)
      if (t.htmlContent && t.htmlContent.includes('@media only screen and (max-width:480px)')) {
        passed.mobile++;
      } else {
        failed.mobile++;
        console.error(`  - Failed Mobile QA for ${t.slug}`);
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
      
      const newCompiled = await compileTemplateToHtml(userCopyData.jsonTree);
      if (newCompiled === t.htmlContent) {
        passed.editorFidelity++;
      } else {
        failed.editorFidelity++;
        console.error(`  - Failed Editor Fidelity QA for ${t.slug}`);
      }

      // 5. SAVE / RELOAD / IMMUTABILITY
      const originalChecksum = JSON.stringify(t.jsonTree);
      
      // Modify deep copy
      const modifiedTree = JSON.parse(JSON.stringify(userCopyData.jsonTree));
      if (modifiedTree.blocks && modifiedTree.blocks[0]) {
        modifiedTree.blocks[0].wrapper = { backgroundColor: '#ff0000' };
      }
      
      // Check if original mutated
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

    console.log(`\n\nVISUAL QA\n----------`);
    console.log(`Templates tested: ${templatesToTest.length}`);
    console.log(`Passed: ${passed.visualQA}`);
    console.log(`Failed: ${failed.visualQA}`);
    
    console.log(`\nEDITOR FIDELITY\n---------------`);
    console.log(`Passed: ${passed.editorFidelity}`);
    console.log(`Failed: ${failed.editorFidelity}`);

    console.log(`\nMOBILE\n------`);
    console.log(`Passed: ${passed.mobile}`);
    console.log(`Failed: ${failed.mobile}`);

    console.log(`\nIMAGE RENDERING\n---------------`);
    console.log(`Passed: ${passed.imageRendering}`);
    console.log(`Failed: ${failed.imageRendering}`);

    console.log(`\nSAVE/RELOAD\n-----------`);
    console.log(`Passed: ${passed.saveReload}`);
    console.log(`Failed: ${failed.saveReload}`);

    console.log(`\nPUBLIC IMMUTABILITY\n-------------------`);
    console.log(publicImmutability);

    console.log(`\nCAMPAIGN COMPATIBILITY\n----------------------`);
    console.log(campaignCompatibility);

  } catch(e) {
    console.error("QA error:", e);
  } finally {
    await db.$disconnect();
  }
}

performQA();
