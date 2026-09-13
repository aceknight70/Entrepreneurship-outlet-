const fs = require('fs');

const file = 'src/screens/Dashboard.tsx';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(
  "W7: Finishing, QC & Upcycling (SDG 12)",
  "W7: Finishing, Quality Control & Residue (SDG 12)"
);

fs.writeFileSync(file, content);
console.log("Successfully updated Dashboard.tsx");
