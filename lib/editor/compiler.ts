import { TemplateJSONNode } from './types';

export function createDefaultTemplateJSON(): TemplateJSONNode {
  const timestamp = Date.now();
  return {
    id: 'root-container',
    type: 'container',
    name: 'Root Layout Container',
    version: 1,
    capabilities: { resize: false, duplicate: false, delete: false, move: false, inlineEdit: false, ai: true },
    props: {},
    style: { backgroundColor: '#FFFFFF', minHeight: '600px', padding: '32px' },
    children: [
      {
        id: `hero-${timestamp}-1`,
        type: 'hero',
        name: 'Hero Section',
        version: 1,
        capabilities: { resize: true, duplicate: true, delete: true, move: true, inlineEdit: true, ai: true },
        props: {
          title: 'Welcome to Your Campaign',
          subtitle: 'Start customizing this email template using the visual inspector or AI Assistant.',
          buttonText: 'Get Started →',
          buttonHref: 'https://example.com',
        },
        style: { backgroundColor: '#4F46E5', textColor: '#FFFFFF', paddingTop: '40px', paddingBottom: '40px', align: 'center' }
      },
      {
        id: `text-${timestamp}-2`,
        type: 'text',
        name: 'Main Content Text',
        version: 1,
        capabilities: { resize: false, duplicate: true, delete: true, move: true, inlineEdit: true, ai: true },
        props: { content: 'Add your custom email text here. Click any element on the canvas to inspect and modify colors, fonts, links, or styling in real time.' },
        style: { textColor: '#374151', fontSize: '15px' }
      },
      {
        id: `footer-${timestamp}-3`,
        type: 'footer',
        name: 'Footer',
        locked: true,
        version: 1,
        capabilities: { resize: false, duplicate: false, delete: false, move: false, inlineEdit: false, ai: false },
        props: { companyName: 'Your Company Name', address: '123 Main Street, Suite 400', unsubscribeUrl: '{{unsubscribeUrl}}' },
        style: { backgroundColor: '#F9FAFB', textColor: '#9CA3AF' }
      }
    ],
  };
}

export function compileHTMLToNodeTree(html: string): TemplateJSONNode {
  if (!html || !html.trim()) {
    return createDefaultTemplateJSON();
  }

  const children: TemplateJSONNode[] = [];

  // 1. Extract H1 title
  const h1Match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  const titleText = h1Match ? h1Match[1].replace(/<[^>]+>/g, '').trim() : '';

  // 2. Extract subtitle/paragraph after h1
  const pMatch = html.match(/<p[^>]*>([\s\S]*?)<\/p>/i);
  const subtitleText = pMatch ? pMatch[1].replace(/<[^>]+>/g, '').trim() : '';

  // 3. Extract CTA button link & text
  const btnMatch = html.match(/<a[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/i);
  const btnHref = btnMatch ? btnMatch[1] : 'https://example.com';
  const btnText = btnMatch ? btnMatch[2].replace(/<[^>]+>/g, '').trim() : '';

  if (titleText) {
    children.push({
      id: `hero-${Date.now()}`,
      type: 'hero',
      name: 'Hero Banner',
      version: 1,
      capabilities: { resize: true, duplicate: true, delete: true, move: true, inlineEdit: true, ai: true },
      props: {
        title: titleText,
        subtitle: subtitleText || 'Special announcement and updates',
        buttonText: btnText || 'Get Started →',
        buttonHref: btnHref,
      },
      style: { backgroundColor: '#111827', textColor: '#FFFFFF', paddingTop: '48px', paddingBottom: '48px', align: 'center' }
    });
  }

  // 4. Extract Headings
  const h2Matches = Array.from(html.matchAll(/<h[2-4][^>]*>([\s\S]*?)<\/h[2-4]>/gi));
  h2Matches.forEach((m, idx) => {
    const text = m[1].replace(/<[^>]+>/g, '').trim();
    if (text && text !== titleText) {
      children.push({
        id: `heading-${Date.now()}-${idx}`,
        type: 'heading',
        name: `Heading ${idx + 1}`,
        version: 1,
        capabilities: { resize: false, duplicate: true, delete: true, move: true, inlineEdit: true, ai: true },
        props: { content: text },
        style: { textColor: '#111827', fontSize: '22px', fontWeight: '700', align: 'left' }
      });
    }
  });

  // 5. Extract Images
  const imgMatches = Array.from(html.matchAll(/<img[^>]*src=["']([^"']+)["'][^>]*>/gi));
  imgMatches.forEach((m, idx) => {
    const src = m[1];
    if (src && !src.includes('data:image')) {
      children.push({
        id: `image-${Date.now()}-${idx}`,
        type: 'image',
        name: `Image ${idx + 1}`,
        version: 1,
        capabilities: { resize: true, duplicate: true, delete: true, move: true, inlineEdit: true, ai: true },
        props: { src, alt: 'Email image', width: '540' },
        style: { borderRadius: '12px' }
      });
    }
  });

  // 6. Extract paragraphs as text nodes
  const allParagraphs = Array.from(html.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi));
  allParagraphs.forEach((m, idx) => {
    const text = m[1].replace(/<[^>]+>/g, '').trim();
    if (text && text !== subtitleText && text.length > 5) {
      children.push({
        id: `text-${Date.now()}-${idx}`,
        type: 'text',
        name: `Paragraph ${idx + 1}`,
        version: 1,
        capabilities: { resize: false, duplicate: true, delete: true, move: true, inlineEdit: true, ai: true },
        props: { content: text },
        style: { textColor: '#374151', fontSize: '15px' }
      });
    }
  });

  // Fallback: If no structured children were parsed, build default visual text & button nodes
  if (children.length === 0) {
    const cleanText = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    const snippet = cleanText.substring(0, 150);
    children.push({
      id: `text-${Date.now()}`,
      type: 'text',
      name: 'Email Content',
      version: 1,
      capabilities: { resize: false, duplicate: true, delete: true, move: true, inlineEdit: true, ai: true },
      props: { content: snippet || 'Custom AI Generated Email Content' },
      style: { textColor: '#374151', fontSize: '15px' }
    });
  }

  // 7. Footer Node
  children.push({
    id: `footer-${Date.now()}`,
    type: 'footer',
    name: 'Footer',
    locked: true,
    version: 1,
    capabilities: { resize: false, duplicate: false, delete: false, move: false, inlineEdit: false, ai: false },
    props: { companyName: 'BulkyMailer', address: 'CAN-SPAM Compliant Address', unsubscribeUrl: '{{unsubscribeUrl}}' },
    style: { backgroundColor: '#F9FAFB', textColor: '#9CA3AF' }
  });

  return {
    id: 'root-container',
    type: 'container',
    name: 'Root Layout Container',
    version: 1,
    capabilities: { resize: false, duplicate: false, delete: false, move: false, inlineEdit: false, ai: true },
    props: {},
    style: { backgroundColor: '#FFFFFF', minHeight: '600px', padding: '32px' },
    children,
  };
}

export interface CompilerResult {
  valid: boolean;
  nodeTree?: TemplateJSONNode;
  errors?: string[];
}

export function validateAndParseMonacoHTML(html: string, currentRoot: TemplateJSONNode): CompilerResult {
  if (!html || !html.trim()) {
    return { valid: false, errors: ['HTML string is empty'] };
  }

  // Parse HTML into structured node tree
  const compiledTree = compileHTMLToNodeTree(html);

  return { valid: true, nodeTree: compiledTree };
}
