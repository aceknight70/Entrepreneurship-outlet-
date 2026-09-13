const fs = require('fs');

const file = 'src/screens/Dashboard.tsx';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(
  "W8: Branding & Logo Maker (SDG 8, 9)",
  "W8: Branding & Packaging (SDG 8, 9)"
);

fs.writeFileSync(file, content);
console.log("Successfully updated Dashboard.tsx");
