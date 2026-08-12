import 'dotenv/config';
import { db as prisma } from '../lib/db';
import { compileTemplateToHtml } from '../lib/templates/compile';

const defaultSettings = {
  width: 600,
  backgroundColor: "#f4f4f5",
  textColor: "#374151",
  linkUnderline: true,
  fontFamily: "Arial, sans-serif",
  locale: "en"
};

const createHeroCtaLayout = (title: string, msg: string, cta: string, heroUrl: string) => {
  return {
    settings: defaultSettings,
    blocks: [
      {
        id: "hero-img",
        type: "custom",
        customType: "advanced_image",
        fieldValues: {
          image: heroUrl,
          altText: title,
          shape: "square",
          borderEnabled: false
        },
        styles: { padding: { top: 0, bottom: 0, left: 0, right: 0 } }
      },
      {
        id: "main-title",
        type: "title",
        content: title,
        level: 1,
        textAlign: "center",
        color: "#111827",
        styles: { padding: { top: 32, bottom: 16, left: 24, right: 24 } }
      },
      {
        id: "main-text",
        type: "paragraph",
        content: msg,
        styles: { padding: { top: 8, bottom: 24, left: 24, right: 24 } }
      },
      {
        id: "main-cta",
        type: "button",
        text: cta,
        url: "https://example.com",
        backgroundColor: "#4f46e5",
        textColor: "#ffffff",
        borderRadius: 8,
        fontSize: 16,
        buttonPadding: { top: 12, right: 24, bottom: 12, left: 24 },
        styles: { padding: { top: 8, bottom: 32, left: 24, right: 24 } }
      },
      {
        id: "div-1",
        type: "divider",
        color: "#e5e7eb",
        thickness: 1,
        width: "full",
        lineStyle: "solid",
        styles: { padding: { top: 16, bottom: 16, left: 24, right: 24 } }
      },
      {
        id: "footer",
        type: "paragraph",
        content: "© 2026 BulkyMailer. <a href='{{unsubscribeUrl}}'>Unsubscribe</a>",
        styles: { padding: { top: 16, bottom: 32, left: 24, right: 24 } }
      }
    ]
  };
};

const createNewsletterLayout = (title: string, msg: string, cta: string, heroUrl: string) => {
  return {
    settings: { ...defaultSettings, backgroundColor: "#ffffff" },
    blocks: [
      {
        id: "header",
        type: "title",
        content: title,
        level: 1,
        textAlign: "center",
        color: "#111827",
        styles: { padding: { top: 32, bottom: 16, left: 24, right: 24 } }
      },
      {
        id: "div-top",
        type: "divider",
        color: "#e5e7eb",
        thickness: 1,
        width: "full",
        lineStyle: "solid",
        styles: { padding: { top: 0, bottom: 24, left: 24, right: 24 } }
      },
      {
        id: "intro-text",
        type: "paragraph",
        content: msg,
        styles: { padding: { top: 8, bottom: 24, left: 24, right: 24 } }
      },
      {
        id: "news-img",
        type: "custom",
        customType: "advanced_image",
        fieldValues: {
          image: heroUrl,
          altText: "Featured",
          shape: "rounded",
          borderEnabled: false
        },
        styles: { padding: { top: 0, bottom: 24, left: 24, right: 24 } }
      },
      {
        id: "article-title",
        type: "title",
        content: "Featured Story",
        level: 2,
        textAlign: "left",
        color: "#111827",
        styles: { padding: { top: 8, bottom: 16, left: 24, right: 24 } }
      },
      {
        id: "article-text",
        type: "paragraph",
        content: "Check out our latest insights and industry news in this featured article.",
        styles: { padding: { top: 0, bottom: 24, left: 24, right: 24 } }
      },
      {
        id: "article-btn",
        type: "button",
        text: "Read More",
        url: "https://example.com",
        backgroundColor: "#111827",
        textColor: "#ffffff",
        borderRadius: 4,
        fontSize: 14,
        buttonPadding: { top: 10, right: 20, bottom: 10, left: 20 },
        styles: { padding: { top: 0, bottom: 32, left: 24, right: 24 } }
      }
    ]
  };
};

const createTransactionalLayout = (title: string, msg: string, cta: string) => {
  return {
    settings: { ...defaultSettings, backgroundColor: "#f9fafb" },
    blocks: [
      {
        id: "logo",
        type: "title",
        content: "BulkyMailer",
        level: 3,
        textAlign: "center",
        color: "#4f46e5",
        styles: { padding: { top: 32, bottom: 16, left: 24, right: 24 } }
      },
      {
        id: "main-box",
        type: "section",
        columns: "1",
        styles: { padding: { top: 0, bottom: 0, left: 24, right: 24 } },
        wrapper: { backgroundColor: "#ffffff", borderRadius: 8, padding: { top: 32, bottom: 32, left: 24, right: 24 } },
        children: [
          [
            {
              id: "trans-title",
              type: "title",
              content: title,
              level: 1,
              textAlign: "left",
              color: "#111827",
              styles: { padding: { top: 0, bottom: 16, left: 0, right: 0 } }
            },
            {
              id: "trans-text",
              type: "paragraph",
              content: msg,
              styles: { padding: { top: 0, bottom: 24, left: 0, right: 0 } }
            },
            {
              id: "trans-btn",
              type: "button",
              text: cta,
              url: "https://example.com",
              backgroundColor: "#4f46e5",
              textColor: "#ffffff",
              borderRadius: 6,
              fontSize: 16,
              buttonPadding: { top: 12, right: 24, bottom: 12, left: 24 },
              styles: { padding: { top: 0, bottom: 0, left: 0, right: 0 } }
            }
          ]
        ]
      },
      {
        id: "footer",
        type: "paragraph",
        content: "If you didn't request this email, there's nothing to worry about — you can safely ignore it.",
        styles: { padding: { top: 24, bottom: 32, left: 24, right: 24 } }
      }
    ]
  };
};

const templates = [
  { slug: "weekly-newsletter", name: "Weekly Newsletter", category: "NEWSLETTER", desc: "A standard weekly newsletter layout with hero image.", hero: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5", layout: "newsletter" },
  { slug: "product-update", name: "Product Update Newsletter", category: "NEWSLETTER", desc: "Highlight new features in your product.", hero: "https://images.unsplash.com/photo-1551288049-bebda4e38f71", layout: "newsletter" },
  { slug: "monthly-digest", name: "Monthly Digest", category: "NEWSLETTER", desc: "Summary of the month's top news.", hero: "https://images.unsplash.com/photo-1432821596592-e2c18b78144f", layout: "newsletter" },
  
  { slug: "flash-sale", name: "Flash Sale", category: "PROMOTIONAL", desc: "Urgency driven flash sale template.", hero: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da", layout: "hero" },
  { slug: "black-friday-sale", name: "Black Friday Sale", category: "PROMOTIONAL", desc: "Dark themed promotional black friday email.", hero: "https://images.unsplash.com/photo-1542838132-92c53300491e", layout: "hero" },
  { slug: "summer-sale", name: "Summer Sale", category: "PROMOTIONAL", desc: "Bright promotional summer campaign.", hero: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e", layout: "hero" },
  { slug: "limited-time-offer", name: "Limited Time Offer", category: "PROMOTIONAL", desc: "Time sensitive offer layout.", hero: "https://images.unsplash.com/photo-1501183638710-841dd1904471", layout: "hero" },
  
  { slug: "product-launch", name: "Product Launch", category: "PRODUCT", desc: "Showcase a brand new product launch.", hero: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e", layout: "hero" },
  { slug: "new-feature", name: "New Feature Announcement", category: "PRODUCT", desc: "Announce a newly released feature.", hero: "https://images.unsplash.com/photo-1537498425277-c283d32ef9db", layout: "hero" },
  { slug: "product-showcase", name: "Product Showcase", category: "PRODUCT", desc: "Display multiple products in a grid.", hero: "https://images.unsplash.com/photo-1523275335684-37898b6baf30", layout: "hero" },
  
  { slug: "welcome-email", name: "Welcome Email", category: "WELCOME", desc: "Standard welcome series starting email.", hero: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3", layout: "hero" },
  { slug: "personalized-welcome", name: "Personalized Customer Welcome", category: "PERSONALIZED", desc: "Uses merge tags like {{firstName}}.", hero: "https://images.unsplash.com/photo-1573164713988-8665fc963095", layout: "newsletter" },
  { slug: "thank-you", name: "Thank You Email", category: "PERSONALIZED", desc: "Express gratitude to your customers.", hero: "https://images.unsplash.com/photo-1494178270175-e96de2971df9", layout: "hero" },
  
  { slug: "order-confirmation", name: "Order Confirmation", category: "TRANSACTIONAL", desc: "Confirm recent orders securely.", hero: "", layout: "transactional" },
  { slug: "shipping-confirmation", name: "Shipping Confirmation", category: "TRANSACTIONAL", desc: "Update users on their delivery status.", hero: "", layout: "transactional" },
  { slug: "password-reset", name: "Password Reset", category: "SECURITY", desc: "Secure password reset link.", hero: "", layout: "transactional" },
  { slug: "account-verification", name: "Account Verification", category: "SECURITY", desc: "Verify new account registrations.", hero: "", layout: "transactional" },
  
  { slug: "event-invitation", name: "Event Invitation", category: "EVENT", desc: "Invite users to a real-world event.", hero: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30", layout: "hero" },
  { slug: "webinar-invitation", name: "Webinar Invitation", category: "EVENT", desc: "Registration for an online webinar.", hero: "https://images.unsplash.com/photo-1591115765373-5207764f72e7", layout: "newsletter" },
  
  { slug: "feedback-request", name: "Feedback Request", category: "ENGAGEMENT", desc: "Ask for user feedback or reviews.", hero: "https://images.unsplash.com/photo-1516383274235-5f42d6c6426d", layout: "hero" },
  { slug: "re-engagement", name: "Re-engagement Email", category: "ENGAGEMENT", desc: "Win back inactive subscribers.", hero: "https://images.unsplash.com/photo-1455849318743-b2233052fcff", layout: "hero" },
  { slug: "abandoned-cart", name: "Abandoned Cart", category: "E_COMMERCE", desc: "Remind users of items left in cart.", hero: "https://images.unsplash.com/photo-1607082349566-187342175e2f", layout: "hero" },
  
  { slug: "holiday-greeting", name: "Holiday Greeting", category: "SEASONAL", desc: "Send warm wishes during the holidays.", hero: "https://images.unsplash.com/photo-1512389142860-9c449e58a543", layout: "hero" },
  { slug: "new-year", name: "New Year Campaign", category: "SEASONAL", desc: "Kick off the new year with a bang.", hero: "https://images.unsplash.com/photo-1546271876-0640f0976534", layout: "hero" }
];

async function main() {
  console.log('Seeding 24 Public Templates...');
  let createdCount = 0;
  let updatedCount = 0;

  for (const t of templates) {
    const title = t.name;
    const msg = `Hello {{firstName}}, this is a beautiful ${t.category.toLowerCase().replace('_', ' ')} email template ready for you to use.`;
    const cta = "View Details";

    let jsonTree: any;
    if (t.layout === 'newsletter') {
      jsonTree = createNewsletterLayout(title, msg, cta, t.hero);
    } else if (t.layout === 'transactional') {
      jsonTree = createTransactionalLayout(title, msg, cta);
    } else {
      jsonTree = createHeroCtaLayout(title, msg, cta, t.hero);
    }

    let compiledHtml;
    try {
      compiledHtml = await compileTemplateToHtml(jsonTree as any);
    } catch (e) {
      console.error(`[ERROR] Exception compiling template ${t.name}:`, e);
    }

    if (!compiledHtml) {
      console.error(`[ERROR] Failed to compile template ${t.name}`);
      continue;
    }

    const existing = await prisma.template.findFirst({
      where: { slug: t.slug, userId: null, generation: 'MODERN' }
    });

    if (existing) {
      await prisma.template.update({
        where: { id: existing.id },
        data: {
          name: t.name,
          category: t.category as any,
          description: t.desc,
          previewText: t.name,
          htmlContent: compiledHtml,
          jsonTree: jsonTree
        }
      });
      console.log(`[UPDATED] Template '${t.name}'.`);
      updatedCount++;
    } else {
      await prisma.template.create({
        data: {
          slug: t.slug,
          name: t.name,
          category: t.category as any,
          generation: 'MODERN',
          userId: null,
          description: t.desc,
          previewText: t.name,
          htmlContent: compiledHtml,
          jsonTree: jsonTree
        }
      });
      console.log(`[CREATED] Template '${t.name}'.`);
      createdCount++;
    }
  }

  console.log(`\nSeed completed! Created: ${createdCount}, Updated: ${updatedCount}`);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
