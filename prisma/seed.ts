import { db as prisma } from '../lib/db';
import { TemplateCategory } from '../app/generated/prisma/enums';

const defaultTemplates = [
  {
    name: "Welcome to our platform!",
    category: TemplateCategory.GENERAL,
    htmlContent: `<!DOCTYPE html>
<html>
<head>
<style>
  body { font-family: -apple-system, sans-serif; background-color: #f8fafc; padding: 40px; margin: 0; }
  .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; padding: 32px; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1); }
  h1 { color: #1e293b; margin-top: 0; }
  p { color: #475569; line-height: 1.6; }
  .btn { display: inline-block; background-color: #4f46e5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: 600; margin-top: 16px; }
</style>
</head>
<body>
  <div class="container">
    <h1>Welcome, {{firstName}}! 👋</h1>
    <p>We're thrilled to have you on board. Our platform is designed to help you achieve your goals faster and easier than ever before.</p>
    <p>Get started by exploring your dashboard and setting up your first project.</p>
    <a href="#" class="btn">Go to Dashboard</a>
  </div>
</body>
</html>`
  },
  {
    name: "Monthly Newsletter",
    category: TemplateCategory.NEWSLETTER,
    htmlContent: `<!DOCTYPE html>
<html>
<head>
<style>
  body { font-family: -apple-system, sans-serif; background-color: #f1f5f9; padding: 20px; margin: 0; }
  .wrapper { max-width: 600px; margin: 0 auto; background: white; border-radius: 8px; overflow: hidden; }
  .header { background: #0f172a; color: white; padding: 32px; text-align: center; }
  .content { padding: 32px; }
  h2 { color: #0f172a; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px; }
  p { color: #334155; line-height: 1.6; }
</style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <h1 style="margin: 0;">Monthly Digest</h1>
      <p style="margin: 8px 0 0; color: #94a3b8;">Everything new this month</p>
    </div>
    <div class="content">
      <p>Hi {{firstName}},</p>
      <p>Here's a look at what we've been working on this month:</p>
      
      <h2>🚀 New Features</h2>
      <p>We've launched several new tools to boost your productivity. Check out the release notes to see them all in action.</p>
      
      <h2>💡 Tip of the Month</h2>
      <p>Did you know you can automate your workflows using our new integration panel? Save hours every week by setting up triggers.</p>
    </div>
  </div>
</body>
</html>`
  },
  {
    name: "Special Offer (50% Off)",
    category: TemplateCategory.PROMOTIONAL,
    htmlContent: `<!DOCTYPE html>
<html>
<head>
<style>
  body { font-family: -apple-system, sans-serif; background-color: #ffe4e6; padding: 40px; margin: 0; }
  .box { max-width: 500px; margin: 0 auto; background: white; border-radius: 16px; padding: 40px; text-align: center; box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1); }
  h1 { color: #be123c; font-size: 32px; margin-bottom: 8px; margin-top: 0; }
  .discount { font-size: 64px; font-weight: 900; color: #e11d48; line-height: 1; margin: 24px 0; }
  p { color: #4c1d95; font-size: 18px; line-height: 1.5; }
  .btn { display: inline-block; background-color: #e11d48; color: white; padding: 16px 32px; text-decoration: none; border-radius: 999px; font-weight: bold; font-size: 18px; margin-top: 24px; text-transform: uppercase; letter-spacing: 1px; }
</style>
</head>
<body>
  <div class="box">
    <h1>Exclusive Offer for You</h1>
    <p>Hi {{firstName}}, you've been selected for a VIP discount.</p>
    <div class="discount">50% OFF</div>
    <p>Use code <strong>VIP50</strong> at checkout to claim your half-price upgrade. Hurry, this expires in 24 hours!</p>
    <a href="#" class="btn">Claim Discount</a>
  </div>
</body>
</html>`
  },
  {
    name: "Receipt / Invoice",
    category: TemplateCategory.TRANSACTIONAL,
    htmlContent: `<!DOCTYPE html>
<html>
<head>
<style>
  body { font-family: 'Courier New', monospace; background-color: #e2e8f0; padding: 40px; margin: 0; }
  .receipt { max-width: 400px; margin: 0 auto; background: #fffbeb; padding: 32px; border: 1px dashed #94a3b8; }
  .header { text-align: center; border-bottom: 2px dashed #94a3b8; padding-bottom: 16px; margin-bottom: 24px; }
  .row { display: flex; justify-content: space-between; margin-bottom: 8px; color: #334155; }
  .total { font-weight: bold; font-size: 18px; margin-top: 16px; border-top: 1px solid #cbd5e1; padding-top: 16px; }
</style>
</head>
<body>
  <div class="receipt">
    <div class="header">
      <h2 style="margin: 0; color: #0f172a;">RECEIPT</h2>
      <p style="margin: 8px 0 0; color: #475569;">Thank you for your purchase!</p>
    </div>
    
    <div class="row">
      <span>Customer:</span>
      <span>{{firstName}} {{lastName}}</span>
    </div>
    <div class="row">
      <span>Order ID:</span>
      <span>#{{custom.orderId}}</span>
    </div>
    <div class="row">
      <span>Date:</span>
      <span>Today</span>
    </div>
    
    <div style="margin: 32px 0;">
      <div class="row">
        <span>Premium Subscription</span>
        <span>$29.00</span>
      </div>
      <div class="row total">
        <span>TOTAL</span>
        <span>$29.00</span>
      </div>
    </div>
    
    <p style="text-align: center; font-size: 12px; color: #64748b;">If you have any questions, reply to this email.</p>
  </div>
</body>
</html>`
  }
];

async function main() {
  console.log("Seeding default templates...");
  
  // Clear existing system templates
  await prisma.template.deleteMany({
    where: { userId: null }
  });

  for (const t of defaultTemplates) {
    const template = await prisma.template.create({
      data: {
        name: t.name,
        category: t.category,
        htmlContent: t.htmlContent,
        userId: null // System template
      }
    });
    console.log(`Created template: ${template.name}`);
  }

  console.log("Seeding complete!");
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
