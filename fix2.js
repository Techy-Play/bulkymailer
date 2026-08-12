const fs = require('fs');
let code = fs.readFileSync('lib/templates/blueprints.ts', 'utf8');

// Title blocks (no align)
code = code.replace(/type:\s*'title',\s*props:\s*{\s*text:\s*(['"].*?['"]),\s*level:\s*(['"].*?['"])\s*}/g, 
  "type: 'title', content: $1, level: $2");

// Button blocks (no align)
code = code.replace(/type:\s*'button',\s*props:\s*{\s*text:\s*(['"].*?['"]),\s*url:\s*(['"].*?['"]),\s*backgroundColor:\s*(['"].*?['"]),\s*color:\s*(['"].*?['"])\s*}/g, 
  "type: 'button', text: $1, url: $2, backgroundColor: $3, textColor: $4");

// Divider blocks
code = code.replace(/type:\s*'divider',\s*props:\s*{\s*color:\s*(['"].*?['"]),\s*padding:\s*(\d+)\s*}/g, 
  "type: 'divider', lineColor: $1, padding: $2");

fs.writeFileSync('lib/templates/blueprints.ts', code);
console.log('Fixed more blueprints.ts!');
