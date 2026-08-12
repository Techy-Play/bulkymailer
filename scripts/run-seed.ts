import { GET } from '../app/api/admin/seed/route';

async function main() {
  console.log("Running seed script manually...");
  const result = await GET();
  const json = await result.json();
  console.log("Seed result:", json);
}

main().catch(console.error).finally(() => process.exit(0));
