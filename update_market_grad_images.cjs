const fs = require('fs');

// Market (W8)
let marketContent = fs.readFileSync('src/screens/Market.tsx', 'utf8');
if (!marketContent.includes("import { PlaceholderImage }")) {
  marketContent = marketContent.replace(
    "import { DiagonalBanner }",
    "import { DiagonalBanner }\nimport { PlaceholderImage } from '../components/PlaceholderImage';"
  );
}
marketContent = marketContent.replace(
  "{/* WEEK 8 CONTENT */}\n              {activeWeek === 8 && activeTab === 'learn' && (\n                <div className=\"space-y-6\">\n                  <div className=\"bg-gray-50 p-6 rounded-xl border border-gray-100 text-gray-700 font-medium space-y-4\">",
  "{/* WEEK 8 CONTENT */}\n              {activeWeek === 8 && activeTab === 'learn' && (\n                <div className=\"space-y-6\">\n                  <PlaceholderImage src=\"https://images.unsplash.com/photo-1607344645866-009c320b63e0?auto=format&fit=crop&w=800\" alt=\"Packaged pieces\" label=\"Example: Packaged & Branded Pieces\" className=\"h-48 w-full\" />\n                  <div className=\"bg-gray-50 p-6 rounded-xl border border-gray-100 text-gray-700 font-medium space-y-4\">"
);
fs.writeFileSync('src/screens/Market.tsx', marketContent);

// Graduation (W11)
let gradContent = fs.readFileSync('src/screens/Graduation.tsx', 'utf8');
if (!gradContent.includes("import { PlaceholderImage }")) {
  gradContent = gradContent.replace(
    "import { DiagonalBanner }",
    "import { DiagonalBanner }\nimport { PlaceholderImage } from '../components/PlaceholderImage';"
  );
}
gradContent = gradContent.replace(
  "{activeTab === 'learn' && (\n                <div className=\"space-y-6\">\n                  <h3 className=\"text-lg font-black text-gray-900 mb-2\">Market Day!</h3>",
  "{activeTab === 'learn' && (\n                <div className=\"space-y-6\">\n                  <PlaceholderImage src=\"https://images.unsplash.com/photo-1533900298318-6b8da08a523e?auto=format&fit=crop&w=800\" alt=\"Market stall setup\" label=\"Example: Market Exhibition Stall\" className=\"h-48 w-full\" />\n                  <h3 className=\"text-lg font-black text-gray-900 mb-2\">Market Day!</h3>"
);
fs.writeFileSync('src/screens/Graduation.tsx', gradContent);

console.log("Updated W8 and W11 Images");
