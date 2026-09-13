const fs = require('fs');

const file = 'src/screens/Dashboard.tsx';
let content = fs.readFileSync(file, 'utf8');

// Update Week 4 title in Dashboard
content = content.replace(
  "W4: Mould-Making & Practice (SDG 12)",
  "W4: Using & Caring for Your Mould (SDG 12)"
);

fs.writeFileSync(file, content);
console.log("Successfully updated Dashboard.tsx");
