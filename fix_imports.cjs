const fs = require('fs');

function fixImport(file) {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(
    "import { DiagonalBanner }\nimport { PlaceholderImage } from '../components/PlaceholderImage'; from '../components/Layout';",
    "import { DiagonalBanner } from '../components/Layout';\nimport { PlaceholderImage } from '../components/PlaceholderImage';"
  );
  fs.writeFileSync(file, content);
}

fixImport('src/screens/Preparation.tsx');
fixImport('src/screens/Production.tsx');
fixImport('src/screens/Market.tsx');
fixImport('src/screens/Graduation.tsx');
fixImport('src/screens/Dashboard.tsx');

console.log("Fixed imports");
