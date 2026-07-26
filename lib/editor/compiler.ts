import { TemplateJSONNode } from './types';

export function createDefaultTemplateJSON(): TemplateJSONNode {
  return {
    id: 'root-container',
    type: 'container',
    name: 'Root Layout Container',
    version: 1,
    capabilities: { resize: false, duplicate: false, delete: false, move: false, inlineEdit: false, ai: true },
    props: {},
    style: { backgroundColor: '#FFFFFF' },
    children: [
      {
        id: 'hero-1',
        type: 'hero',
        name: 'Hero Banner',
        version: 1,
        capabilities: { resize: true, duplicate: true, delete: true, move: true, inlineEdit: true, ai: true },
        props: {
          title: 'Welcome to Our Summer Sale',
          subtitle: 'Discover handpicked products with exclusive discounts for our subscribers.',
          buttonText: 'Shop Sale Collection →',
          buttonHref: 'https://example.com/sale',
        },
        style: {
          backgroundColor: '#111827',
          textColor: '#FFFFFF',
          paddingTop: '48px',
          paddingBottom: '48px',
          align: 'center',
        },
      },
      {
        id: 'heading-1',
        type: 'heading',
        name: 'Featured Collection',
        version: 1,
        capabilities: { resize: false, duplicate: true, delete: true, move: true, inlineEdit: true, ai: true },
        props: { content: 'Featured Summer Products' },
        style: { textColor: '#111827', fontSize: '24px', fontWeight: '700', align: 'center' },
      },
      {
        id: 'product-1',
        type: 'product',
        name: 'Product Card 1',
        version: 1,
        capabilities: { resize: true, duplicate: true, delete: true, move: true, inlineEdit: true, ai: true },
        props: {
          title: 'Pro Wireless Headphones',
          price: '$199.00',
          image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80',
          buttonText: 'Order Now',
          buttonHref: 'https://example.com/product',
        },
        style: { backgroundColor: '#F9FAFB', borderRadius: '16px' },
      },
      {
        id: 'footer-1',
        type: 'footer',
        name: 'Footer',
        locked: true,
        version: 1,
        capabilities: { resize: false, duplicate: false, delete: false, move: false, inlineEdit: false, ai: false },
        props: {
          companyName: 'BulkyMailer Inc.',
          address: '123 Tech Avenue, San Francisco, CA',
          unsubscribeUrl: '{{unsubscribeUrl}}',
        },
        style: { backgroundColor: '#F9FAFB', textColor: '#9CA3AF' },
      },
    ],
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

  // Basic tags check
  const openTags = (html.match(/<[a-z1-6]+/gi) || []).length;
  const closeTags = (html.match(/<\/[a-z1-6]+/gi) || []).length;

  if (Math.abs(openTags - closeTags) > 10 && (html.endsWith('<') || html.endsWith('</') || html.endsWith('<div'))) {
    return { valid: false, errors: ['Incomplete HTML syntax typing in buffer'] };
  }

  // Compiler returns currentRoot safely if HTML syntax is mid-type
  return { valid: true, nodeTree: currentRoot };
}
