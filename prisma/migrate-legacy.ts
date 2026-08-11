import { Client } from 'pg';
import * as dotenv from 'dotenv';
dotenv.config();

function getConnectionString(): string {
  let url = process.env.DATABASE_URL || "";
  if (
    url.includes("sslmode=require") ||
    url.includes("sslmode=prefer") ||
    url.includes("sslmode=verify-ca")
  ) {
    url = url.replace(/sslmode=(require|prefer|verify-ca)/g, "sslmode=verify-full");
  } else if (url && !url.includes("sslmode=")) {
    url += (url.includes("?") ? "&" : "?") + "sslmode=verify-full";
  }
  return url;
}

async function main() {
  const client = new Client({
    connectionString: getConnectionString()
  });

  await client.connect();

  console.log("Starting legacy template migration...");

  const res = await client.query('SELECT id, "jsonTree" FROM "Template"');
  
  let legacyCount = 0;
  let modernCount = 0;

  for (const row of res.rows) {
    let tree = row.jsonTree;
    let isLegacy = false;
    
    if (!tree) {
      isLegacy = true;
    } else if (typeof tree === 'string') {
      try {
        const parsed = JSON.parse(tree);
        isLegacy = Array.isArray(parsed);
      } catch (e) {
        isLegacy = true;
      }
    } else {
      isLegacy = Array.isArray(tree);
    }

    const generation = isLegacy ? 'LEGACY' : 'MODERN';
    
    await client.query('UPDATE "Template" SET generation = $1 WHERE id = $2', [generation, row.id]);
    
    if (isLegacy) legacyCount++;
    else modernCount++;
  }

  console.log(`Migration complete.`);
  console.log(`Marked as LEGACY: ${legacyCount}`);
  console.log(`Marked as MODERN: ${modernCount}`);
  
  await client.end();
}

main().catch(console.error);
