import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { db } from '../lib/db'; // Make sure this path is correct for your Prisma client

async function backupTemplates() {
  const outputPath = 'C:\\Users\\kamal\\Desktop\\BUIMB\\bulkymailer-templates-backup.json';
  console.log(`Starting backup of templates to ${outputPath}...`);

  try {
    const templates = await db.template.findMany();
    const templateVersions = await db.templateVersion.findMany();

    const backupData = {
      timestamp: new Date().toISOString(),
      templatesCount: templates.length,
      versionsCount: templateVersions.length,
      templates,
      templateVersions,
    };

    const jsonString = JSON.stringify(backupData, null, 2);
    
    // Write the backup
    fs.writeFileSync(outputPath, jsonString, 'utf-8');
    
    // Verify file exists
    if (!fs.existsSync(outputPath)) {
      throw new Error("Backup file was not created successfully.");
    }
    
    // Verify JSON parse
    const readBack = fs.readFileSync(outputPath, 'utf-8');
    const parsedBack = JSON.parse(readBack);
    
    if (parsedBack.templatesCount !== templates.length || parsedBack.versionsCount !== templateVersions.length) {
      throw new Error("Verification failed: Row counts do not match backup data.");
    }

    // Generate SHA-256 Checksum
    const hashSum = crypto.createHash('sha256');
    hashSum.update(readBack);
    const hex = hashSum.digest('hex');

    console.log('\n--- BACKUP SUCCESSFUL ---');
    console.log(`Location: ${outputPath}`);
    console.log(`Templates Backed Up: ${templates.length}`);
    console.log(`Template Versions Backed Up: ${templateVersions.length}`);
    console.log(`SHA-256 Checksum: ${hex}`);
    console.log('-------------------------\n');
    console.log('You may now proceed with deletion.');
    
  } catch (error) {
    console.error("Backup failed:", error);
    process.exit(1);
  } finally {
    await db.$disconnect();
  }
}

backupTemplates();
