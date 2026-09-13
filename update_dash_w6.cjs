const fs = require('fs');

const file = 'src/screens/Dashboard.tsx';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(
  "W6: Production Day - Zero-Waste (SDG 12)",
  "W6: Production Day — Zero-Waste (SDG 12)"
);

fs.writeFileSync(file, content);
console.log("Successfully updated Dashboard.tsx");
