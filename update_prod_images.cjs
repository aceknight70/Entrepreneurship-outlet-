const fs = require('fs');
const file = 'src/screens/Production.tsx';
let content = fs.readFileSync(file, 'utf8');

if (!content.includes("import { PlaceholderImage }")) {
  content = content.replace(
    "import { DiagonalBanner }",
    "import { DiagonalBanner }\nimport { PlaceholderImage } from '../components/PlaceholderImage';"
  );
}

// Add W7 image
content = content.replace(
  "{/* WEEK 7 CONTENT */}\n              {activeWeek === 7 && activeTab === 'learn' && (\n                <div className=\"space-y-6\">\n                  <div className=\"bg-gray-50 p-6 rounded-xl border border-gray-100 text-gray-700 font-medium space-y-4\">",
  "{/* WEEK 7 CONTENT */}\n              {activeWeek === 7 && activeTab === 'learn' && (\n                <div className=\"space-y-6\">\n                  <PlaceholderImage src=\"https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=800\" alt=\"Before and after sanding and polishing\" label=\"Example: Rough Edge vs Sanded & Polished\" className=\"h-48 w-full\" />\n                  <div className=\"bg-gray-50 p-6 rounded-xl border border-gray-100 text-gray-700 font-medium space-y-4\">"
);

fs.writeFileSync(file, content);
console.log("Updated W7 Image");
