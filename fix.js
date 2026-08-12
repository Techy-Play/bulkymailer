const fs = require('fs');
let code = fs.readFileSync('lib/templates/blueprints.ts', 'utf8');

// Title blocks
code = code.replace(/type:\s*'title',\s*props:\s*{\s*text:\s*(['"].*?['"]),\s*level:\s*(['"].*?['"]),\s*align:\s*(['"].*?['"])\s*}/g, 
  "type: 'title', content: $1, level: $2, textAlign: $3");

// Paragraph blocks
code = code.replace(/type:\s*'paragraph',\s*props:\s*{\s*text:\s*(['"].*?['"])\s*}/g, 
  "type: 'paragraph', content: $1");

// Button blocks
code = code.replace(/type:\s*'button',\s*props:\s*{\s*text:\s*(['"].*?['"]),\s*url:\s*(['"].*?['"]),\s*backgroundColor:\s*(['"].*?['"]),\s*color:\s*(['"].*?['"]),\s*align:\s*(['"].*?['"])\s*}/g, 
  "type: 'button', text: $1, url: $2, backgroundColor: $3, textColor: $4, align: $5");

// Custom advanced_image blocks
code = code.replace(/props:\s*{\s*image:/g, 'fieldValues: { image:');

fs.writeFileSync('lib/templates/blueprints.ts', code);
console.log('Fixed blueprints.ts!');
