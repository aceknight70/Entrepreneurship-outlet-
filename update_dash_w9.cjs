const fs = require('fs');
const file = 'src/screens/Dashboard.tsx';
let content = fs.readFileSync(file, 'utf8');
content = content.replace(
  "W9: Costing, Pricing & Marketing (SDG 8)",
  "W9: The Bead Costing Workshop — Costing, Pricing & Marketing (SDG 8)"
);
fs.writeFileSync(file, content);
console.log("Successfully updated Dashboard.tsx");
