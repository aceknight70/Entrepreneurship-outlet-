const fs = require('fs');

function replaceInFile(filepath, replacements, addImport = true) {
  let content = fs.readFileSync(filepath, 'utf8');
  
  if (addImport && !content.includes("SCHOOL_CONFIG")) {
    // count folder depth for relative import
    const depth = filepath.split('/').length - 2;
    const importPath = depth === 1 ? '../config' : './config';
    
    // Find the last import statement
    const importRegex = /import\s+.*?from\s+['"].*?['"];?\n/g;
    let match;
    let lastIndex = 0;
    while ((match = importRegex.exec(content)) !== null) {
      lastIndex = match.index + match[0].length;
    }
    
    const importStmt = `import { SCHOOL_CONFIG } from '${importPath}';\n`;
    content = content.substring(0, lastIndex) + importStmt + content.substring(lastIndex);
  }

  for (const { search, replace } of replacements) {
    content = content.split(search).join(replace);
  }

  fs.writeFileSync(filepath, content);
}

// 1. Enrolment.tsx
replaceInFile('src/screens/Enrolment.tsx', [
  { search: 'Jasmine School Entrepreneurship Outlet', replace: '{SCHOOL_CONFIG.name} Entrepreneurship Outlet' },
  { search: 'const baseCode = "JS-CHI-014";', replace: 'const baseCode = `${SCHOOL_CONFIG.initials}-CHI-014`;' },
  { search: 'Jasmine School SDG Entrepreneur', replace: '{SCHOOL_CONFIG.name} SDG Entrepreneur' }
]);

// 2. Market.tsx
replaceInFile('src/screens/Market.tsx', [
  { search: '("Jasmine School Shadow SDG Entrepreneur")', replace: '("{SCHOOL_CONFIG.name} Shadow SDG Entrepreneur")' },
  { search: '"This piece came from a Jasmine School Shadow SDG Entrepreneur."', replace: '"This piece came from a {SCHOOL_CONFIG.name} Shadow SDG Entrepreneur."' },
  { search: 'a Jasmine School Shadow SDG Entrepreneur.', replace: 'a {SCHOOL_CONFIG.name} Shadow SDG Entrepreneur.' }
]);

// 3. Graduation.tsx
replaceInFile('src/screens/Graduation.tsx', [
  { search: 'is a Jasmine School Shadow SDG Entrepreneur', replace: 'is a {SCHOOL_CONFIG.name} Shadow SDG Entrepreneur' }
]);

// 4. Landing.tsx (no visual Jasmine School text here, but I will do the teleprompter effect)
// But wait, there is a comment `// Default Jasmine School Navy theme` in Layout.tsx, doesn't matter much.

console.log("School renamed successfully.");
