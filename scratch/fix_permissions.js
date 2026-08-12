const fs = require('fs');
const path = require('path');

const files = [
  "app/api/analytics/route.ts",
  "app/api/campaigns/[id]/route.ts",
  "app/api/campaigns/[id]/send/route.ts",
  "app/api/campaigns/route.ts",
  "app/api/contacts/import/route.ts",
  "app/api/contacts/lists/[id]/contacts/[contactId]/route.ts",
  "app/api/contacts/lists/[id]/contacts/route.ts",
  "app/api/contacts/lists/[id]/route.ts",
  "app/api/contacts/lists/route.ts",
  "app/api/media/google-drive/route.ts",
  "app/api/media/route.ts",
  "app/api/sender-profiles/[id]/route.ts",
  "app/api/sender-profiles/route.ts",
  "app/api/templates/[id]/duplicate/route.ts",
  "app/api/templates/[id]/route.ts",
  "app/api/templates/[id]/test-email/route.ts",
  "app/api/templates/[id]/versions/route.ts",
  "app/api/templates/route.ts",
  "app/api/upload/org-logo/route.ts",
  "app/api/upload/template-image/route.ts"
];

const basePath = "c:/Users/kamal/Desktop/BUIMB/bulkymailer";

for (const file of files) {
  const fullPath = path.join(basePath, file);
  if (fs.existsSync(fullPath)) {
    let content = fs.readFileSync(fullPath, 'utf8');
    content = content.replace(/^[ \t]*await requirePermission\(orgId, "(.*?)"\);/gm, (match, p1) => {
      // Find the indentation
      const indentMatch = match.match(/^[ \t]*/);
      const indent = indentMatch ? indentMatch[0] : '    ';
      return `${indent}const __perm = await requirePermission(orgId, "${p1}");\n${indent}if (!__perm) return NextResponse.json({ error: "Forbidden" }, { status: 403 });`;
    });
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`Updated ${file}`);
  }
}
