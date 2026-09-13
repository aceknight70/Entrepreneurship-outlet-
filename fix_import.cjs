const fs = require('fs');
const file = 'src/screens/Market.tsx';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(
  "import { DiagonalBanner }\nimport { LogoMaker } from '../components/LogoMaker'; from '../components/Layout';",
  "import { DiagonalBanner } from '../components/Layout';\nimport { LogoMaker } from '../components/LogoMaker';"
);

fs.writeFileSync(file, content);
console.log("Fixed import in Market.tsx");
