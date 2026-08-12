import fs from 'fs';
import path from 'path';
import * as cheerio from 'cheerio';
import { randomUUID } from 'crypto';

const inputDir = path.resolve(__dirname, '../scratch/mjml-templates/templates');
const outputFile = path.resolve(__dirname, '../scratch/converted-templates.json');

function generateId() {
  return randomUUID();
}

function parseMjml(filePath: string) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const $ = cheerio.load(content, { xmlMode: true });

  const mjBody = $('mj-body');
  const bodyBgColor = mjBody.attr('background-color') || '#ffffff';

  const settings = {
    width: 600,
    backgroundColor: bodyBgColor,
    textColor: '#374151',
    linkUnderline: true,
    fontFamily: "Arial, sans-serif",
    locale: "en"
  };

  const blocks: any[] = [];

  $('mj-section').each((_, sectionEl) => {
    const $section = $(sectionEl);
    const sectionBg = $section.attr('background-color') || null;
    const sectionPadding = $section.attr('padding') || null;
    const columnsCount = $section.children('mj-column').length || 1;
    
    const children: any[][] = Array.from({ length: columnsCount }, () => []);

    $section.children('mj-column').each((colIdx, colEl) => {
      const $col = $(colEl);
      
      $col.children().each((_, childEl) => {
        const tagName = childEl.tagName.toLowerCase();
        const $child = $(childEl);
        
        const padding = $child.attr('padding');
        const paddingTop = $child.attr('padding-top') ? parseInt($child.attr('padding-top') as string) : 0;
        const paddingBottom = $child.attr('padding-bottom') ? parseInt($child.attr('padding-bottom') as string) : 0;
        
        let styles: any = { padding: { top: paddingTop || 10, bottom: paddingBottom || 10, left: 24, right: 24 } };

        if (tagName === 'mj-text') {
          const fontSize = parseInt($child.attr('font-size') || '14');
          const fontWeight = $child.attr('font-weight');
          const color = $child.attr('color') || '#111827';
          const align = $child.attr('align') || 'left';
          const htmlContent = $child.html()?.trim() || '';

          if (fontSize > 18 || fontWeight === 'bold' || fontWeight === '700' || htmlContent.includes('<h1') || htmlContent.includes('<h2')) {
            children[colIdx].push({
              id: generateId(),
              type: 'title',
              content: htmlContent.replace(/<[^>]*>?/gm, '').trim() || 'Title',
              level: fontSize > 24 ? 1 : (fontSize > 20 ? 2 : 3),
              textAlign: align,
              color: color,
              styles
            });
          } else {
            children[colIdx].push({
              id: generateId(),
              type: 'paragraph',
              content: htmlContent || 'Sample text content goes here.',
              textAlign: align,
              color: color,
              styles
            });
          }
        } 
        else if (tagName === 'mj-image') {
          let src = $child.attr('src') || 'https://placehold.co/600x400/e2e8f0/475569?text=Image';
          const alt = $child.attr('alt') || 'Image';
          // Replace unstable/broken mjml images
          if (src.includes('mjml.io') || src.includes('imgur') || src.includes('unsplash')) {
             // just leave as is, but if we want to be safe, we can use placehold
          }

          children[colIdx].push({
            id: generateId(),
            type: 'custom',
            customType: 'advanced_image',
            fieldValues: {
              image: src,
              altText: alt,
              shape: "square",
              borderEnabled: false
            },
            styles: { padding: { top: 0, bottom: 0, left: 0, right: 0 } }
          });
        }
        else if (tagName === 'mj-button') {
          const text = $child.text().trim() || 'Click Here';
          const href = $child.attr('href') || 'https://example.com';
          const bg = $child.attr('background-color') || '#4f46e5';
          const color = $child.attr('color') || '#ffffff';
          const align = $child.attr('align') || 'center';

          children[colIdx].push({
            id: generateId(),
            type: 'button',
            text: text,
            url: href,
            backgroundColor: bg,
            textColor: color,
            borderRadius: 4,
            fontSize: 14,
            buttonPadding: { top: 12, right: 24, bottom: 12, left: 24 },
            align: align,
            styles
          });
        }
        else if (tagName === 'mj-divider') {
          const color = $child.attr('border-color') || '#e5e7eb';
          children[colIdx].push({
            id: generateId(),
            type: 'divider',
            color: color,
            thickness: 1,
            width: "full",
            lineStyle: "solid",
            styles
          });
        }
        else if (tagName === 'mj-spacer') {
          const height = parseInt($child.attr('height') || '20');
          children[colIdx].push({
            id: generateId(),
            type: 'spacer',
            height: height,
            styles: { padding: { top: 0, bottom: 0, left: 0, right: 0 } }
          });
        }
        else if (tagName === 'mj-social') {
           children[colIdx].push({
            id: generateId(),
            type: 'social',
            align: 'center',
            iconSize: 'large',
            iconStyle: 'solid',
            spacing: 12,
            icons: [
              { id: generateId(), platform: 'facebook', url: 'https://facebook.com' },
              { id: generateId(), platform: 'twitter', url: 'https://twitter.com' },
              { id: generateId(), platform: 'instagram', url: 'https://instagram.com' }
            ],
            styles
          });
        }
      });
    });

    const wrapper: any = {};
    if (sectionBg) wrapper.backgroundColor = sectionBg;
    wrapper.padding = { top: 20, bottom: 20, left: 0, right: 0 };

    // Push the section block
    blocks.push({
      id: generateId(),
      type: 'section',
      columns: columnsCount.toString(),
      children: children,
      wrapper,
      styles: { padding: { top: 0, bottom: 0, left: 0, right: 0 } }
    });
  });

  return {
    settings,
    blocks
  };
}

const templates = [];
const files = fs.readdirSync(inputDir).filter(f => f.endsWith('.mjml'));

for (const file of files) {
  const filePath = path.join(inputDir, file);
  const slug = file.replace('.mjml', '');
  try {
    const jsonTree = parseMjml(filePath);
    
    // basic category assignment
    let category = 'GENERAL';
    if (slug.includes('newsletter')) category = 'NEWSLETTER';
    else if (slug.includes('sale') || slug.includes('black-friday') || slug.includes('discount')) category = 'PROMOTIONAL';
    else if (slug.includes('delivery') || slug.includes('order') || slug.includes('proof')) category = 'TRANSACTIONAL';
    else if (slug.includes('welcome') || slug.includes('basic')) category = 'WELCOME';
    else if (slug.includes('real-estate') || slug.includes('arturia') || slug.includes('ticketshop')) category = 'PRODUCT';
    else if (slug.includes('reactivation') || slug.includes('loyalty')) category = 'ENGAGEMENT';
    else if (slug.includes('christmas') || slug.includes('new-year')) category = 'SEASONAL';

    let name = slug.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ');

    templates.push({
      slug,
      name,
      category,
      desc: `Professional ${name} template design.`,
      jsonTree
    });
    console.log(`Converted: ${slug}`);
  } catch(e) {
    console.error(`Failed to convert ${slug}:`, e);
  }
}

fs.writeFileSync(outputFile, JSON.stringify(templates, null, 2));
console.log(`\nSuccessfully converted ${templates.length} templates. Output saved to scratch/converted-templates.json`);
