import 'dotenv/config';
import { db } from '../lib/db';

async function deleteOldTemplates() {
  console.log('Starting deletion of ALL templates and template versions...');
  
  try {
    const campaigns = await db.campaign.findMany({
      where: { templateId: { not: null } }
    });
    
    console.log(`Found ${campaigns.length} campaigns linked to templates.`);
    console.log(`Don't worry, the schema uses onDelete: SetNull for Campaigns so they won't be deleted.`);
    
    // Delete TemplateVersions first (though cascade might do it anyway, good to be safe)
    const delVersions = await db.templateVersion.deleteMany({});
    console.log(`Deleted ${delVersions.count} TemplateVersion records.`);
    
    // Delete Templates
    const delTemplates = await db.template.deleteMany({});
    console.log(`Deleted ${delTemplates.count} Template records.`);
    
    console.log('\n--- DELETION SUCCESSFUL ---');
    console.log(`Templates Removed: ${delTemplates.count}`);
    console.log(`Template Versions Removed: ${delVersions.count}`);
    console.log('---------------------------\n');
    
  } catch (error) {
    console.error("Deletion failed:", error);
    process.exit(1);
  } finally {
    await db.$disconnect();
  }
}

deleteOldTemplates();
