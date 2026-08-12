import { renderToMjml } from '@templatical/renderer';
import { createDefaultTemplateContent } from '@templatical/types';

async function run() {
  try {
    const content = createDefaultTemplateContent();
    content.blocks = [{
      id: '1',
      type: 'title',
      content: 'Hello',
      level: 'h1',
      textAlign: 'center',
      styles: { padding: { top: 10, bottom: 10, left: 10, right: 10 } }
    }];
    await renderToMjml(content);
    console.log('success');
  } catch(e) {
    console.error(e);
  }
}

run();
