import { createDefaultTemplateContent, TemplateContent } from '@templatical/types';

export interface TemplateBlueprint {
  id: string;
  name: string;
  description: string;
  category: "NEWSLETTER" | "PROMOTIONAL" | "PERSONALIZED" | "GENERAL" | "TRANSACTIONAL";
  getContent: () => TemplateContent;
}

export const blueprints: TemplateBlueprint[] = [
  {
    id: 'blank',
    name: 'Start from Scratch',
    description: 'A blank canvas for your imagination',
    category: 'GENERAL',
    getContent: () => {
      return createDefaultTemplateContent();
    }
  },
  {
    id: 'product-launch',
    name: 'Product Launch',
    description: 'Announce a new product or feature',
    category: 'PROMOTIONAL',
    getContent: () => {
      const content = createDefaultTemplateContent();
      content.blocks = [
        {
          id: 'img1',
          type: 'custom',
          customType: 'advanced_image',
          fieldValues: { image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30', altText: 'New Product', shape: 'rounded', borderEnabled: false },
          styles: { padding: { top: 0, bottom: 20, left: 0, right: 0 } }
        },
        {
          id: 'h1',
          type: 'title',
          content: 'Introducing Our New Product',
          level: 1,
          textAlign: 'center',
          styles: { padding: { top: 16, bottom: 16, left: 24, right: 24 } }
        },
        {
          id: 'p1',
          type: 'paragraph',
          content: 'We are thrilled to announce the launch of our newest feature that will revolutionize your workflow. Check it out now!',
          styles: { padding: { top: 16, bottom: 24, left: 24, right: 24 } }
        },
        {
          id: 'b1',
          type: 'button',
          text: 'Get Started Today',
          url: 'https://example.com',
          backgroundColor: '#4F46E5',
          textColor: '#ffffff',
          borderRadius: 4,
          fontSize: 16,
          buttonPadding: { top: 12, right: 24, bottom: 12, left: 24 },
          styles: { padding: { top: 16, bottom: 32, left: 24, right: 24 } }
        }
      ] as any;
      return content;
    }
  },
  {
    id: 'newsletter',
    name: 'Newsletter',
    description: 'Weekly digest with featured article and links',
    category: 'NEWSLETTER',
    getContent: () => {
      const content = createDefaultTemplateContent();
      content.blocks = [
        {
          id: 'h1',
          type: 'title',
          content: 'Weekly Digest',
          level: 1,
          textAlign: 'center',
          styles: { padding: { top: 24, bottom: 16, left: 24, right: 24 } }
        },
        {
          id: 'p1',
          type: 'paragraph',
          content: 'Welcome to this week’s newsletter! We have some great articles lined up for you.',
          styles: { padding: { top: 16, bottom: 24, left: 24, right: 24 } }
        },
        {
          id: 'divider1',
          type: 'divider',
          color: '#E5E7EB',
          thickness: 1,
          lineStyle: 'solid',
          width: 'full',
          styles: { padding: { top: 16, bottom: 16, left: 24, right: 24 } }
        },
        {
          id: 'h2',
          type: 'title',
          content: 'Featured Article',
          level: 2,
          textAlign: 'left',
          styles: { padding: { top: 24, bottom: 16, left: 24, right: 24 } }
        },
        {
          id: 'p2',
          type: 'paragraph',
          content: 'Read about the latest trends in our industry and how you can stay ahead of the curve.',
          styles: { padding: { top: 16, bottom: 24, left: 24, right: 24 } }
        },
        {
          id: 'b1',
          type: 'button',
          text: 'Read More',
          url: 'https://example.com',
          backgroundColor: '#4F46E5',
          textColor: '#ffffff',
          borderRadius: 4,
          fontSize: 16,
          buttonPadding: { top: 12, right: 24, bottom: 12, left: 24 },
          styles: { padding: { top: 16, bottom: 32, left: 24, right: 24 } }
        }
      ] as any;
      return content;
    }
  },
  {
    id: 'welcome-email',
    name: 'Welcome Email',
    description: 'Onboarding steps for new users',
    category: 'PERSONALIZED',
    getContent: () => {
      const content = createDefaultTemplateContent();
      content.blocks = [
        {
          id: 'h1',
          type: 'title',
          content: 'Welcome aboard, {{firstName}}!',
          level: 1,
          textAlign: 'center',
          styles: { padding: { top: 32, bottom: 16, left: 24, right: 24 } }
        },
        {
          id: 'p1',
          type: 'paragraph',
          content: 'We are so excited to have you here. To get started, follow these three simple steps:',
          styles: { padding: { top: 16, bottom: 16, left: 24, right: 24 } }
        },
        {
          id: 'p2',
          type: 'paragraph',
          content: '1. Complete your profile<br>2. Invite your team<br>3. Create your first campaign',
          styles: { padding: { top: 8, bottom: 24, left: 24, right: 24 } }
        },
        {
          id: 'b1',
          type: 'button',
          text: 'Go to Dashboard',
          url: 'https://example.com',
          backgroundColor: '#4F46E5',
          textColor: '#ffffff',
          borderRadius: 4,
          fontSize: 16,
          buttonPadding: { top: 12, right: 24, bottom: 12, left: 24 },
          styles: { padding: { top: 16, bottom: 32, left: 24, right: 24 } }
        }
      ] as any;
      return content;
    }
  },
  {
    id: 'order-confirmation',
    name: 'Order Confirmation',
    description: 'Receipt and tracking info',
    category: 'TRANSACTIONAL',
    getContent: () => {
      const content = createDefaultTemplateContent();
      content.blocks = [
        {
          id: 'h1',
          type: 'title',
          content: 'Order Confirmed',
          level: 1,
          textAlign: 'left',
          styles: { padding: { top: 24, bottom: 16, left: 24, right: 24 } }
        },
        {
          id: 'p1',
          type: 'paragraph',
          content: 'Hi {{firstName}}, thank you for your order! We are preparing it for shipment.',
          styles: { padding: { top: 16, bottom: 24, left: 24, right: 24 } }
        },
        {
          id: 'd1',
          type: 'divider',
          color: '#E5E7EB',
          thickness: 1,
          lineStyle: 'solid',
          width: 'full',
          styles: { padding: { top: 16, bottom: 16, left: 24, right: 24 } }
        },
        {
          id: 'p2',
          type: 'paragraph',
          content: 'Order Number: #123456789<br>Estimated Delivery: 3-5 business days',
          styles: { padding: { top: 16, bottom: 24, left: 24, right: 24 } }
        },
        {
          id: 'b1',
          type: 'button',
          text: 'Track Order',
          url: 'https://example.com',
          backgroundColor: '#111827',
          textColor: '#ffffff',
          borderRadius: 4,
          fontSize: 16,
          buttonPadding: { top: 12, right: 24, bottom: 12, left: 24 },
          styles: { padding: { top: 16, bottom: 32, left: 24, right: 24 } }
        }
      ] as any;
      return content;
    }
  },
  {
    id: 'event-invitation',
    name: 'Event Invitation',
    description: 'RSVP and event details',
    category: 'PROMOTIONAL',
    getContent: () => {
      const content = createDefaultTemplateContent();
      content.blocks = [
        {
          id: 'h1',
          type: 'title',
          content: 'You’re Invited!',
          level: 1,
          textAlign: 'center',
          styles: { padding: { top: 32, bottom: 16, left: 24, right: 24 } }
        },
        {
          id: 'p1',
          type: 'paragraph',
          content: 'Join us for our annual summit. It will be an evening of networking, great food, and inspiring talks.',
          styles: { padding: { top: 16, bottom: 24, left: 24, right: 24 } }
        },
        {
          id: 'p2',
          type: 'paragraph',
          content: 'Date: October 15, 2026<br>Time: 7:00 PM EST<br>Location: Virtual Event',
          styles: { padding: { top: 8, bottom: 24, left: 24, right: 24 } }
        },
        {
          id: 'b1',
          type: 'button',
          text: 'RSVP Now',
          url: 'https://example.com',
          backgroundColor: '#4F46E5',
          textColor: '#ffffff',
          borderRadius: 4,
          fontSize: 16,
          buttonPadding: { top: 12, right: 24, bottom: 12, left: 24 },
          styles: { padding: { top: 16, bottom: 32, left: 24, right: 24 } }
        }
      ] as any;
      return content;
    }
  },
  {
    id: 'password-reset',
    name: 'Password Reset',
    description: 'Standard reset password template',
    category: 'TRANSACTIONAL',
    getContent: () => {
      const content = createDefaultTemplateContent();
      content.blocks = [
        {
          id: 'h2',
          type: 'title',
          content: 'Reset Your Password',
          level: 2,
          textAlign: 'center',
          styles: { padding: { top: 32, bottom: 16, left: 24, right: 24 } }
        },
        {
          id: 'p1',
          type: 'paragraph',
          content: 'We received a request to reset your password. Click the button below to choose a new password.',
          styles: { padding: { top: 16, bottom: 24, left: 24, right: 24 } }
        },
        {
          id: 'b1',
          type: 'button',
          text: 'Reset Password',
          url: '{{resetUrl}}',
          backgroundColor: '#4F46E5',
          textColor: '#ffffff',
          borderRadius: 4,
          fontSize: 16,
          buttonPadding: { top: 12, right: 24, bottom: 12, left: 24 },
          styles: { padding: { top: 16, bottom: 24, left: 24, right: 24 } }
        },
        {
          id: 'p2',
          type: 'paragraph',
          content: 'If you did not make this request, you can safely ignore this email.',
          styles: { padding: { top: 8, bottom: 32, left: 24, right: 24 } }
        }
      ] as any;
      return content;
    }
  },
  {
    id: 'black-friday',
    name: 'Black Friday Sale',
    description: 'High urgency promotional campaign',
    category: 'PROMOTIONAL',
    getContent: () => {
      const content = createDefaultTemplateContent();
      content.blocks = [
        {
          id: 'img1',
          type: 'custom',
          customType: 'advanced_image',
          fieldValues: { image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da', altText: 'Sale', shape: 'square', borderEnabled: false },
          styles: { padding: { top: 0, bottom: 0, left: 0, right: 0 } }
        },
        {
          id: 'h1',
          type: 'title',
          content: 'BLACK FRIDAY EARLY ACCESS',
          level: 1,
          textAlign: 'center',
          color: '#000000',
          styles: { padding: { top: 24, bottom: 16, left: 24, right: 24 } }
        },
        {
          id: 'p1',
          type: 'paragraph',
          content: 'Get up to 50% off storewide. Use code BF2026 at checkout.',
          styles: { padding: { top: 8, bottom: 24, left: 24, right: 24 } }
        },
        {
          id: 'b1',
          type: 'button',
          text: 'Shop the Sale',
          url: 'https://example.com',
          backgroundColor: '#000000',
          textColor: '#ffffff',
          borderRadius: 4,
          fontSize: 16,
          buttonPadding: { top: 12, right: 24, bottom: 12, left: 24 },
          styles: { padding: { top: 16, bottom: 32, left: 24, right: 24 } }
        }
      ] as any;
      return content;
    }
  }
];
