import { TemplateJSONNode } from './types';

export function createDefaultTemplateJSON(): TemplateJSONNode {
  const timestamp = Date.now();
  const currentYear = new Date().getFullYear();
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
        props: {
          companyName: 'Your Company Name',
          address: '123 Main Street, Suite 400',
          unsubscribeUrl: '{{unsubscribeUrl}}',
          copyrightYear: String(currentYear),
        },
        style: { backgroundColor: '#F9FAFB', textColor: '#9CA3AF' }
      }
    ],
  };
}

export function compileHTMLToNodeTree(rawHtml: string): TemplateJSONNode {
  if (!rawHtml || !rawHtml.trim()) {
    return createDefaultTemplateJSON();
  }

  const currentYear = new Date().getFullYear();

  // Clean HTML entity typos like &amp;copy; or &copy; -> ©
  const html = rawHtml
    .replace(/&amp;copy;/gi, '©')
    .replace(/&copy;/gi, '©')
    .replace(/\b202[0-5]\b/g, String(currentYear)); // Always upgrade stale 2020-2025 years in footer/text to current year

  // Sequential Token Scanner to preserve exact DOM order
  interface TokenMatch {
    index: number;
    node: TemplateJSONNode;
  }

  const tokens: TokenMatch[] = [];

  // 1. Scan Images in sequential order
  const imgMatches = Array.from(html.matchAll(/<img([^>]*)>/gi));
  imgMatches.forEach((m, idx) => {
    const attrs = m[1];
    const srcMatch = attrs.match(/src=["']([^"']+)["']/i);
    const src = srcMatch ? srcMatch[1] : '';

    if (src && !src.includes('data:image')) {
      const altMatch = attrs.match(/alt=["']([^"']*)["']/i);
      const alt = altMatch ? altMatch[1] : 'Email image';

      const widthMatch = attrs.match(/width=["']?(\d+)["']?/i) || attrs.match(/width:\s*(\d+)px/i);
      const heightMatch = attrs.match(/height=["']?(\d+)["']?/i) || attrs.match(/height:\s*(\d+)px/i);

      const widthVal = widthMatch ? widthMatch[1] : '';
      const heightVal = heightMatch ? heightMatch[1] : '';

      const isCircle =
        /border-radius:\s*(50%|9999px)/i.test(attrs) ||
        /rounded-full/i.test(attrs) ||
        (widthVal && heightVal && widthVal === heightVal && parseInt(widthVal) < 220);

      const isCenter =
        /margin:\s*auto/i.test(attrs) ||
        /align=["']center["']/i.test(attrs) ||
        /text-align:\s*center/i.test(attrs);

      const shape = isCircle ? 'circle' : 'rounded';
      const borderRadius = isCircle ? '50%' : '12px';
      const imgWidth = isCircle ? (widthVal || '140') : (widthVal || '540');
      const imgHeight = isCircle ? (heightVal || widthVal || '140') : (heightVal || 'auto');

      tokens.push({
        index: m.index || 0,
        node: {
          id: `image-${Date.now()}-${idx}`,
          type: 'image',
          name: isCircle ? `Circular Profile Logo ${idx + 1}` : `Image Banner ${idx + 1}`,
          version: 1,
          capabilities: { resize: true, duplicate: true, delete: true, move: true, inlineEdit: true, ai: true },
          props: {
            src,
            alt,
            width: imgWidth,
            height: imgHeight,
            shape,
            objectFit: isCircle ? 'cover' : 'contain',
          },
          style: {
            borderRadius,
            align: isCenter ? 'center' : 'center',
            width: `${imgWidth}px`,
            height: isCircle ? `${imgHeight}px` : 'auto',
            objectFit: isCircle ? 'cover' : 'contain',
          },
        },
      });
    }
  });

  // 2. Scan Headings in sequential order (H1, H2, H3)
  const hMatches = Array.from(html.matchAll(/<(h[1-4])[^>]*>([\s\S]*?)<\/\1>/gi));
  hMatches.forEach((m, idx) => {
    const text = m[2].replace(/<[^>]+>/g, '').trim();
    if (text) {
      const tag = m[1].toLowerCase();
      tokens.push({
        index: m.index || 0,
        node: {
          id: `heading-${Date.now()}-${idx}`,
          type: 'heading',
          name: `${tag.toUpperCase()} Heading ${idx + 1}`,
          version: 1,
          capabilities: { resize: false, duplicate: true, delete: true, move: true, inlineEdit: true, ai: true },
          props: { content: text, level: tag },
          style: {
            textColor: '#111827',
            fontSize: tag === 'h1' ? '28px' : '22px',
            fontWeight: '700',
            align: 'center',
          },
        },
      });
    }
  });

  // 3. Scan Buttons in sequential order
  const btnMatches = Array.from(html.matchAll(/<a[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi));
  btnMatches.forEach((m, idx) => {
    const href = m[1];
    const text = m[2].replace(/<[^>]+>/g, '').trim();
    if (text && text.length < 60 && !text.toLowerCase().includes('unsubscribe')) {
      tokens.push({
        index: m.index || 0,
        node: {
          id: `button-${Date.now()}-${idx}`,
          type: 'button',
          name: `CTA Button ${idx + 1}`,
          version: 1,
          capabilities: { resize: false, duplicate: true, delete: true, move: true, inlineEdit: true, ai: true },
          props: { text, href },
          style: {
            backgroundColor: '#4F46E5',
            textColor: '#FFFFFF',
            borderRadius: '8px',
            paddingTop: '12px',
            paddingBottom: '12px',
            paddingLeft: '24px',
            paddingRight: '24px',
            align: 'center',
          },
        },
      });
    }
  });

  // 4. Scan Paragraphs in sequential order
  const pMatches = Array.from(html.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi));
  pMatches.forEach((m, idx) => {
    const text = m[1].replace(/<[^>]+>/g, '').trim();
    if (text && text.length > 3 && !text.toLowerCase().includes('unsubscribe')) {
      tokens.push({
        index: m.index || 0,
        node: {
          id: `text-${Date.now()}-${idx}`,
          type: 'text',
          name: `Paragraph ${idx + 1}`,
          version: 1,
          capabilities: { resize: false, duplicate: true, delete: true, move: true, inlineEdit: true, ai: true },
          props: { content: text },
          style: { textColor: '#374151', fontSize: '15px', align: 'center' },
        },
      });
    }
  });

  // Sort tokens by their exact DOM appearance order in the HTML string
  tokens.sort((a, b) => a.index - b.index);

  const children: TemplateJSONNode[] = tokens.map((t) => t.node);

  // Fallback: If no structured children were parsed
  if (children.length === 0) {
    const cleanText = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    const snippet = cleanText.substring(0, 150);
    children.push({
      id: `text-${Date.now()}`,
      type: 'text',
      name: 'Email Content',
      version: 1,
      capabilities: { resize: false, duplicate: true, delete: true, move: true, inlineEdit: true, ai: true },
      props: { content: snippet || 'Custom Email Content' },
      style: { textColor: '#374151', fontSize: '15px' },
    });
  }

  // 5. Always Append Footer with Current Year
  const hasExistingFooter = children.some((c) => c.type === 'footer');
  if (!hasExistingFooter) {
    children.push({
      id: `footer-${Date.now()}`,
      type: 'footer',
      name: 'Footer',
      locked: true,
      version: 1,
      capabilities: { resize: false, duplicate: false, delete: false, move: false, inlineEdit: false, ai: false },
      props: {
        companyName: 'BulkyMailer Inc.',
        address: '123 Tech Avenue, San Francisco, CA',
        unsubscribeUrl: '{{unsubscribeUrl}}',
        copyrightYear: String(currentYear),
      },
      style: { backgroundColor: '#F9FAFB', textColor: '#9CA3AF' },
    });
  }

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

export function validateAndParseMonacoHTML(html: string, currentRoot: TemplateJSONNode): { valid: boolean; nodeTree?: TemplateJSONNode } {
  if (!html || !html.trim()) return { valid: false };
  // Only re-compile if HTML has valid body elements
  const compiled = compileHTMLToNodeTree(html);
  return { valid: true, nodeTree: compiled };
}
