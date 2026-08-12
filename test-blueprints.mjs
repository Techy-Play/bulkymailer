import { renderToMjml } from '@templatical/renderer';
import { blueprints } from './lib/templates/blueprints.js'; 

async function run() {
  for (const bp of blueprints) {
    if (bp.id === 'blank') continue;
    try {
      await renderToMjml(bp.getContent());
      console.log(`✅ ${bp.id} OK`);
    } catch(e) {
      console.log(`❌ ${bp.id} FAILED:`, e.stack);
    }
  }
}
run();
