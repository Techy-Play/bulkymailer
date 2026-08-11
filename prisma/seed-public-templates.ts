import 'dotenv/config';
import { db as prisma } from '../lib/db';

const generateContent = (title: string, msg: string, cta: string, heroUrl: string) => {
  return {
    settings: {},
    root: {
      type: "box",
      backgroundColor: "#f4f4f5",
      styles: { padding: { top: 32, bottom: 32, left: 16, right: 16 } }
    },
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
        level: "h1",
        textAlign: "center",
        color: "#111827",
        styles: { padding: { top: 16, bottom: 16, left: 16, right: 16 } }
      },
      {
        id: "main-text",
        type: "text",
        content: msg,
        color: "#374151",
        styles: { padding: { top: 16, bottom: 16, left: 16, right: 16 } }
      },
      {
        id: "main-cta",
        type: "text",
        content: `<a href="https://example.com" style="display:inline-block;padding:12px 24px;background-color:#4f46e5;color:#ffffff;text-decoration:none;border-radius:8px;font-weight:bold;">${cta}</a>`,
        color: "#111827",
        styles: { padding: { top: 16, bottom: 16, left: 16, right: 16 }, textAlign: "center" }
      },
      {
        id: "div-1",
        type: "divider",
        color: "#e5e7eb",
        thickness: 1,
        width: 100,
        lineStyle: "solid",
        styles: { padding: { top: 16, bottom: 16, left: 16, right: 16 } }
      },
      {
        id: "footer",
        type: "text",
        content: "© 2026 BulkyMailer. {{unsubscribeUrl}}",
        color: "#9ca3af",
        styles: { padding: { top: 16, bottom: 16, left: 16, right: 16 } }
      }
    ]
  };
};

const templates = [
  { slug: "weekly-newsletter", name: "Weekly Newsletter", category: "NEWSLETTER", desc: "A standard weekly newsletter layout with hero image.", hero: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5" },
  { slug: "product-update", name: "Product Update Newsletter", category: "NEWSLETTER", desc: "Highlight new features in your product.", hero: "https://images.unsplash.com/photo-1551288049-bebda4e38f71" },
  { slug: "monthly-digest", name: "Monthly Digest", category: "NEWSLETTER", desc: "Summary of the month's top news.", hero: "https://images.unsplash.com/photo-1432821596592-e2c18b78144f" },
  
  { slug: "flash-sale", name: "Flash Sale", category: "PROMOTIONAL", desc: "Urgency driven flash sale template.", hero: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da" },
  { slug: "black-friday-sale", name: "Black Friday Sale", category: "PROMOTIONAL", desc: "Dark themed promotional black friday email.", hero: "https://images.unsplash.com/photo-1542838132-92c53300491e" },
  { slug: "summer-sale", name: "Summer Sale", category: "PROMOTIONAL", desc: "Bright promotional summer campaign.", hero: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e" },
  { slug: "limited-time-offer", name: "Limited Time Offer", category: "PROMOTIONAL", desc: "Time sensitive offer layout.", hero: "https://images.unsplash.com/photo-1501183638710-841dd1904471" },
  
  { slug: "product-launch", name: "Product Launch", category: "PRODUCT", desc: "Showcase a brand new product launch.", hero: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e" },
  { slug: "new-feature", name: "New Feature Announcement", category: "PRODUCT", desc: "Announce a newly released feature.", hero: "https://images.unsplash.com/photo-1537498425277-c283d32ef9db" },
  { slug: "product-showcase", name: "Product Showcase", category: "PRODUCT", desc: "Display multiple products in a grid.", hero: "https://images.unsplash.com/photo-1523275335684-37898b6baf30" },
  
  { slug: "welcome-email", name: "Welcome Email", category: "WELCOME", desc: "Standard welcome series starting email.", hero: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3" },
  { slug: "personalized-welcome", name: "Personalized Customer Welcome", category: "PERSONALIZED", desc: "Uses merge tags like {{firstName}}.", hero: "https://images.unsplash.com/photo-1573164713988-8665fc963095" },
  { slug: "thank-you", name: "Thank You Email", category: "PERSONALIZED", desc: "Express gratitude to your customers.", hero: "https://images.unsplash.com/photo-1494178270175-e96de2971df9" },
  
  { slug: "order-confirmation", name: "Order Confirmation", category: "TRANSACTIONAL", desc: "Confirm recent orders securely.", hero: "https://images.unsplash.com/photo-1586880244406-556ebe35f282" },
  { slug: "shipping-confirmation", name: "Shipping Confirmation", category: "TRANSACTIONAL", desc: "Update users on their delivery status.", hero: "https://images.unsplash.com/photo-1580674285054-bed31e145f59" },
  { slug: "password-reset", name: "Password Reset", category: "SECURITY", desc: "Secure password reset link.", hero: "https://images.unsplash.com/photo-1614064641913-6b71a2ecfa31" },
  { slug: "account-verification", name: "Account Verification", category: "SECURITY", desc: "Verify new account registrations.", hero: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb" },
  
  { slug: "event-invitation", name: "Event Invitation", category: "EVENT", desc: "Invite users to a real-world event.", hero: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30" },
  { slug: "webinar-invitation", name: "Webinar Invitation", category: "EVENT", desc: "Registration for an online webinar.", hero: "https://images.unsplash.com/photo-1591115765373-5207764f72e7" },
  
  { slug: "feedback-request", name: "Feedback Request", category: "ENGAGEMENT", desc: "Ask for user feedback or reviews.", hero: "https://images.unsplash.com/photo-1516383274235-5f42d6c6426d" },
  { slug: "re-engagement", name: "Re-engagement Email", category: "ENGAGEMENT", desc: "Win back inactive subscribers.", hero: "https://images.unsplash.com/photo-1455849318743-b2233052fcff" },
  { slug: "abandoned-cart", name: "Abandoned Cart", category: "E_COMMERCE", desc: "Remind users of items left in cart.", hero: "https://images.unsplash.com/photo-1607082349566-187342175e2f" },
  
  { slug: "holiday-greeting", name: "Holiday Greeting", category: "SEASONAL", desc: "Send warm wishes during the holidays.", hero: "https://images.unsplash.com/photo-1512389142860-9c449e58a543" },
  { slug: "new-year", name: "New Year Campaign", category: "SEASONAL", desc: "Kick off the new year with a bang.", hero: "https://images.unsplash.com/photo-1546271876-0640f0976534" }
];

async function main() {
  const { renderToMjml } = await import('@templatical/renderer');
  const mjml2html = (await import('mjml')).default;

  console.log('Seeding 24 Public Templates...');
  let createdCount = 0;
  let skippedCount = 0;

  for (const t of templates) {
    const existing = await prisma.template.findFirst({
      where: { slug: t.slug, userId: null, generation: 'MODERN' }
    });

    if (existing) {
      console.log(`[SKIP] Template '${t.name}' already exists.`);
      skippedCount++;
      continue;
    }

    const title = t.name;
    const msg = `Hello {{firstName}}, this is a beautiful ${t.category.toLowerCase().replace('_', ' ')} email template ready for you to use.`;
    const cta = "View Details";

    const jsonTree = generateContent(title, msg, cta, t.hero);
    const htmlContent = `<html><body style="font-family:sans-serif;background:#f4f4f5;padding:40px;text-align:center;">
      <img src="${t.hero}" alt="Hero" style="max-width:100%;height:auto;border-radius:12px;margin-bottom:20px;"/>
      <h1 style="color:#111827;">${title}</h1>
      <p style="color:#374151;">${msg}</p>
      <a href="https://example.com" style="display:inline-block;padding:12px 24px;background:#4f46e5;color:#fff;text-decoration:none;border-radius:8px;margin-top:20px;">${cta}</a>
    </body></html>`;

    await prisma.template.create({
      data: {
        slug: t.slug,
        name: t.name,
        category: t.category as any,
        generation: 'MODERN',
        userId: null,
        description: t.desc,
        previewText: t.name,
        htmlContent: htmlContent,
        jsonTree: jsonTree as any
      }
    });

    console.log(`[CREATED] Template '${t.name}'.`);
    createdCount++;
  }

  console.log(`\nSeed completed! Created: ${createdCount}, Skipped: ${skippedCount}`);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
