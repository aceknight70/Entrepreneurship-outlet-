const fs = require('fs');
const file = 'src/screens/Preparation.tsx';
let content = fs.readFileSync(file, 'utf8');

if (!content.includes("import { PlaceholderImage }")) {
  content = content.replace(
    "import { DiagonalBanner }",
    "import { DiagonalBanner }\nimport { PlaceholderImage } from '../components/PlaceholderImage';"
  );
}

// Add W3 image
content = content.replace(
  "{/* WEEK 3 CONTENT */}\n              {activeWeek === 3 && activeTab === 'learn' && (\n                <div className=\"space-y-6\">\n                  <div className=\"bg-gray-50 p-6 rounded-xl border border-gray-100 text-gray-700 font-medium space-y-4\">",
  "{/* WEEK 3 CONTENT */}\n              {activeWeek === 3 && activeTab === 'learn' && (\n                <div className=\"space-y-6\">\n                  <PlaceholderImage src=\"https://images.unsplash.com/photo-1618423771880-2bcfa4b6f10c?auto=format&fit=crop&w=800\" alt=\"Swirl vs Blend Examples\" label=\"Example: Swirl & Marble Effects\" className=\"h-48 w-full\" />\n                  <div className=\"bg-gray-50 p-6 rounded-xl border border-gray-100 text-gray-700 font-medium space-y-4\">"
);

// Add W4 image
content = content.replace(
  "{/* WEEK 4 CONTENT */}\n              {activeWeek === 4 && activeTab === 'learn' && (\n                <div className=\"space-y-6\">\n                  <div className=\"bg-gray-50 p-6 rounded-xl border border-gray-100 text-gray-700 font-medium space-y-4\">",
  "{/* WEEK 4 CONTENT */}\n              {activeWeek === 4 && activeTab === 'learn' && (\n                <div className=\"space-y-6\">\n                  <PlaceholderImage src=\"https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?auto=format&fit=crop&w=800\" alt=\"Properly used silicone mould\" label=\"Example: Clean Silicone Mould & Finished Piece\" className=\"h-48 w-full\" />\n                  <div className=\"bg-gray-50 p-6 rounded-xl border border-gray-100 text-gray-700 font-medium space-y-4\">"
);

fs.writeFileSync(file, content);
console.log("Updated W3/W4 Images");
