const fs = require('fs');

let content = fs.readFileSync('src/screens/Dashboard.tsx', 'utf8');
content = content.replace(
  "import { DiagonalBanner }\nimport { PlaceholderImage } from '../components/PlaceholderImage';\nimport { Image as ImageIcon } from 'lucide-react'; from '../components/Layout';",
  "import { DiagonalBanner } from '../components/Layout';\nimport { PlaceholderImage } from '../components/PlaceholderImage';\nimport { Image as ImageIcon } from 'lucide-react';"
);
fs.writeFileSync('src/screens/Dashboard.tsx', content);

console.log("Fixed dashboard imports");
