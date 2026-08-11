import { ComponentType, PluginManifest, TemplateJSONNode } from '../types';

export interface ComponentPlugin {
  manifest: PluginManifest;
  defaultProps: Record<string, any>;
  defaultStyle?: Record<string, any>;
  renderHtml: (node: TemplateJSONNode) => string;
  healthCheck?: (node: TemplateJSONNode) => string[];
}

export const PLUGIN_REGISTRY: Record<ComponentType, ComponentPlugin> = {
  hero: {
    manifest: {
      type: 'hero',
      name: 'Hero Section',
      icon: 'Layout',
      category: 'layout',
      version: '1.0.0',
      supportsAI: true,
      supportsDarkMode: true,
      supportsMobile: true,
    },
    defaultProps: {
      title: 'Welcome to Our Exclusive Sale',
      subtitle: 'Discover handpicked products with special discounts this week only.',
      buttonText: 'Shop Special Offers',
      buttonHref: 'https://example.com/sale',
      bgImage: '',
    },
    defaultStyle: {
      backgroundColor: '#111827',
      textColor: '#FFFFFF',
      paddingTop: '48px',
      paddingBottom: '48px',
      align: 'center',
    },
    renderHtml: (node) => {
      const p = node.props || {};
      const s = node.style || {};
      return `
<table data-node-id="${node.id}" role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color:${s.backgroundColor || '#111827'};">
  <tr>
    <td align="${s.align || 'center'}" style="padding:${s.paddingTop || '48px'} 24px ${s.paddingBottom || '48px'} 24px; text-align:${s.align || 'center'};">
      <h1 style="color:${s.textColor || '#FFFFFF'}; font-size:32px; font-weight:800; margin:0 0 16px 0; line-height:1.2;">${p.title}</h1>
      <p style="color:#D1D5DB; font-size:16px; margin:0 0 28px 0; max-width:520px; line-height:1.5;">${p.subtitle}</p>
      <a href="${p.buttonHref}" style="display:inline-block; background-color:#4F46E5; color:#FFFFFF; padding:14px 28px; border-radius:8px; font-weight:700; text-decoration:none; font-size:15px;">${p.buttonText}</a>
    </td>
  </tr>
</table>`;
    },
  },

  button: {
    manifest: {
      type: 'button',
      name: 'CTA Button',
      icon: 'MousePointer',
      category: 'basic',
      version: '1.0.0',
      supportsAI: true,
      supportsDarkMode: true,
      supportsMobile: true,
    },
    defaultProps: {
      text: 'Claim Offer Now',
      href: 'https://example.com',
      utmSource: 'bulkymailer',
      utmMedium: 'email',
      utmCampaign: 'newsletter',
    },
    defaultStyle: {
      backgroundColor: '#4F46E5',
      textColor: '#FFFFFF',
      paddingTop: '12px',
      paddingBottom: '12px',
      paddingLeft: '24px',
      paddingRight: '24px',
      borderRadius: '8px',
      align: 'center',
    },
    renderHtml: (node) => {
      const p = node.props || {};
      const s = node.style || {};
      let finalHref = p.href || '#';
      if (p.utmSource && !finalHref.includes('utm_source')) {
        const sep = finalHref.includes('?') ? '&' : '?';
        finalHref += `${sep}utm_source=${encodeURIComponent(p.utmSource)}&utm_medium=${encodeURIComponent(p.utmMedium || 'email')}&utm_campaign=${encodeURIComponent(p.utmCampaign || 'campaign')}`;
      }
      return `
<table data-node-id="${node.id}" role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
  <tr>
    <td align="${s.align || 'center'}" style="padding: 12px 0;">
      <a href="${finalHref}" style="display:inline-block; background-color:${s.backgroundColor || '#4F46E5'}; color:${s.textColor || '#FFFFFF'}; padding:${s.paddingTop || '12px'} ${s.paddingRight || '24px'} ${s.paddingBottom || '12px'} ${s.paddingLeft || '24px'}; border-radius:${s.borderRadius || '8px'}; font-weight:700; text-decoration:none; font-size:15px;">${p.text}</a>
    </td>
  </tr>
</table>`;
    },
  },

  image: {
    manifest: {
      type: 'image',
      name: 'Image Element',
      icon: 'Image',
      category: 'basic',
      version: '1.0.0',
      supportsAI: true,
      supportsDarkMode: true,
      supportsMobile: true,
    },
    defaultProps: {
      src: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&q=80',
      alt: 'Campaign Image',
      href: '',
      width: '560',
    },
    defaultStyle: {
      borderRadius: '12px',
      align: 'center',
    },
    renderHtml: (node) => {
      const p = node.props || {};
      const s = node.style || {};
      const imgTag = `<img src="${p.src}" alt="${p.alt || ''}" width="${p.width || '560'}" style="max-width:100%; height:auto; display:block; border-radius:${s.borderRadius || '12px'}; border:0;" />`;
      if (p.href) {
        return `<table data-node-id="${node.id}" role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%"><tr><td align="${s.align || 'center'}"><a href="${p.href}">${imgTag}</a></td></tr></table>`;
      }
      return `<table data-node-id="${node.id}" role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%"><tr><td align="${s.align || 'center'}">${imgTag}</td></tr></table>`;
    },
    healthCheck: (node) => {
      const warnings: string[] = [];
      if (!node.props?.alt) warnings.push('Missing ALT text for screen readers');
      return warnings;
    },
  },

  heading: {
    manifest: {
      type: 'heading',
      name: 'Heading Text',
      icon: 'Type',
      category: 'basic',
      version: '1.0.0',
      supportsAI: true,
      supportsDarkMode: true,
      supportsMobile: true,
    },
    defaultProps: {
      content: 'Special Announcement',
      level: 'h2',
    },
    defaultStyle: {
      textColor: '#111827',
      fontSize: '24px',
      fontWeight: '700',
      align: 'left',
    },
    renderHtml: (node) => {
      const p = node.props || {};
      const s = node.style || {};
      return `<h2 data-node-id="${node.id}" style="color:${s.textColor || '#111827'}; font-size:${s.fontSize || '24px'}; font-weight:${s.fontWeight || '700'}; text-align:${s.align || 'left'}; margin:16px 0 8px 0; line-height:1.3;">${p.content}</h2>`;
    },
  },

  text: {
    manifest: {
      type: 'text',
      name: 'Paragraph Text',
      icon: 'AlignLeft',
      category: 'basic',
      version: '1.0.0',
      supportsAI: true,
      supportsDarkMode: true,
      supportsMobile: true,
    },
    defaultProps: {
      content: 'Thank you for being a valued subscriber. We are thrilled to share our latest updates and exclusive perks with you.',
    },
    defaultStyle: {
      textColor: '#374151',
      fontSize: '15px',
      lineHeight: '1.6',
      align: 'left',
    },
    renderHtml: (node) => {
      const p = node.props || {};
      const s = node.style || {};
      return `<p data-node-id="${node.id}" style="color:${s.textColor || '#374151'}; font-size:${s.fontSize || '15px'}; line-height:${s.lineHeight || '1.6'}; text-align:${s.align || 'left'}; margin:8px 0 16px 0;">${p.content}</p>`;
    },
  },

  container: {
    manifest: {
      type: 'container',
      name: 'Section Container',
      icon: 'Box',
      category: 'layout',
      version: '1.0.0',
      supportsAI: true,
      supportsDarkMode: true,
      supportsMobile: true,
    },
    defaultProps: {},
    defaultStyle: {
      backgroundColor: '#FFFFFF',
      paddingTop: '24px',
      paddingBottom: '24px',
      paddingLeft: '24px',
      paddingRight: '24px',
    },
    renderHtml: (node) => {
      const s = node.style || {};
      const innerHtml = node.children ? node.children.map(child => PLUGIN_REGISTRY[child.type]?.renderHtml(child) || '').join('') : '';
      return `
<table data-node-id="${node.id}" role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color:${s.backgroundColor || '#FFFFFF'};">
  <tr>
    <td style="padding:${s.paddingTop || '24px'} ${s.paddingRight || '24px'} ${s.paddingBottom || '24px'} ${s.paddingLeft || '24px'};">
      ${innerHtml}
    </td>
  </tr>
</table>`;
    },
  },

  product: {
    manifest: {
      type: 'product',
      name: 'Product Showcase Card',
      icon: 'ShoppingBag',
      category: 'commerce',
      version: '1.0.0',
      supportsAI: true,
      supportsDarkMode: true,
      supportsMobile: true,
    },
    defaultProps: {
      title: 'Pro Wireless Headphones',
      price: '$199.00',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80',
      buttonText: 'Buy Now',
      buttonHref: 'https://example.com/product',
    },
    defaultStyle: {
      backgroundColor: '#F9FAFB',
      borderRadius: '16px',
    },
    renderHtml: (node) => {
      const p = node.props || {};
      const s = node.style || {};
      return `
<table data-node-id="${node.id}" role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color:${s.backgroundColor || '#F9FAFB'}; border-radius:${s.borderRadius || '16px'}; overflow:hidden; margin:16px 0;">
  <tr>
    <td align="center" style="padding:20px;">
      <img src="${p.image}" alt="${p.title}" width="280" style="max-width:100%; height:auto; border-radius:12px; display:block;" />
      <h3 style="color:#111827; font-size:18px; font-weight:700; margin:16px 0 4px 0;">${p.title}</h3>
      <p style="color:#4F46E5; font-size:16px; font-weight:800; margin:0 0 16px 0;">${p.price}</p>
      <a href="${p.buttonHref}" style="display:inline-block; background-color:#111827; color:#FFFFFF; padding:10px 20px; border-radius:8px; font-weight:600; text-decoration:none; font-size:14px;">${p.buttonText}</a>
    </td>
  </tr>
</table>`;
    },
  },

  social: {
    manifest: {
      type: 'social',
      name: 'Social Media Links',
      icon: 'Share2',
      category: 'basic',
      version: '1.0.0',
      supportsAI: true,
      supportsDarkMode: true,
      supportsMobile: true,
    },
    defaultProps: {
      twitter: 'https://twitter.com',
      linkedin: 'https://linkedin.com',
      github: 'https://github.com',
    },
    defaultStyle: {
      align: 'center',
    },
    renderHtml: (node) => {
      return `
<table data-node-id="${node.id}" role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
  <tr>
    <td align="center" style="padding: 16px 0;">
      <a href="https://twitter.com" style="color:#6B7280; text-decoration:none; margin:0 8px; font-size:13px; font-weight:600;">Twitter</a>
      <a href="https://linkedin.com" style="color:#6B7280; text-decoration:none; margin:0 8px; font-size:13px; font-weight:600;">LinkedIn</a>
      <a href="https://github.com" style="color:#6B7280; text-decoration:none; margin:0 8px; font-size:13px; font-weight:600;">GitHub</a>
    </td>
  </tr>
</table>`;
    },
  },

  divider: {
    manifest: {
      type: 'divider',
      name: 'Divider Line',
      icon: 'Minus',
      category: 'structural',
      version: '1.0.0',
      supportsAI: false,
      supportsDarkMode: true,
      supportsMobile: true,
    },
    defaultProps: {},
    defaultStyle: {
      color: '#E5E7EB',
      margin: '24px',
    },
    renderHtml: (node) => {
      const s = node.style || {};
      return `<hr data-node-id="${node.id}" style="border:0; border-top:1px solid ${s.color || '#E5E7EB'}; margin:${s.margin || '24px'} 0;" />`;
    },
  },

  footer: {
    manifest: {
      type: 'footer',
      name: 'Footer Section',
      icon: 'FileText',
      category: 'layout',
      version: '1.0.0',
      supportsAI: true,
      supportsDarkMode: true,
      supportsMobile: true,
    },
    defaultProps: {
      companyName: 'BulkyMailer Inc.',
      address: '123 Tech Avenue, San Francisco, CA',
      unsubscribeUrl: '{{unsubscribeUrl}}',
    },
    defaultStyle: {
      backgroundColor: '#F9FAFB',
      textColor: '#9CA3AF',
    },
    renderHtml: (node) => {
      const p = node.props || {};
      const s = node.style || {};
      const year = new Date().getFullYear();
      return `
<table data-node-id="${node.id}" role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color:${s.backgroundColor || '#F9FAFB'};">
  <tr>
    <td align="center" style="padding:32px 24px; color:${s.textColor || '#9CA3AF'}; font-size:12px; line-height:1.5;">
      <p style="margin:0 0 8px 0; font-weight:600; color:#6B7280;">© ${year} ${p.companyName || 'BulkyMailer'}. All rights reserved.</p>
      <p style="margin:0 0 12px 0;">${p.address || ''}</p>
      <p style="margin:0;"><a href="${p.unsubscribeUrl || '{{unsubscribeUrl}}'}" style="color:#6366F1; text-decoration:underline;">Unsubscribe from this mailing list</a></p>
    </td>
  </tr>
</table>`;
    },
  },
};
