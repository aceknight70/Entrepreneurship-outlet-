const fs = require('fs');

// Update Types
let typesContent = fs.readFileSync('src/types.ts', 'utf8');
if (!typesContent.includes("'gallery'")) {
  typesContent = typesContent.replace("'dashboard'", "'dashboard'\n  | 'gallery'");
  fs.writeFileSync('src/types.ts', typesContent);
}

// Update App.tsx
let appContent = fs.readFileSync('src/App.tsx', 'utf8');
if (!appContent.includes("import { GalleryScreen }")) {
  appContent = appContent.replace(
    "import { ParentViewScreen } from './screens/ParentView';",
    "import { ParentViewScreen } from './screens/ParentView';\nimport { GalleryScreen } from './screens/Gallery';"
  );
}

if (!appContent.includes("case 'gallery':")) {
  appContent = appContent.replace(
    "case 'admin':",
    "case 'gallery':\n        return <GalleryScreen onBack={() => setCurrentView('dashboard')} />;\n      case 'admin':"
  );
  fs.writeFileSync('src/App.tsx', appContent);
}

console.log("Updated types and App.tsx");
