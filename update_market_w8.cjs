const fs = require('fs');
const file = 'src/screens/Market.tsx';
let content = fs.readFileSync(file, 'utf8');

if (!content.includes('import { LogoMaker }')) {
  content = content.replace(
    "import { DiagonalBanner }",
    "import { DiagonalBanner }\nimport { LogoMaker } from '../components/LogoMaker';"
  );
}

// Find the W8 DO tab content and replace it
const oldDoTabStart = "{activeWeek === 8 && activeTab === 'do' && (";
const oldDoTabEnd = "Proceed to Check ➔\n                  </button>\n                </div>\n              )}";

const startIndex = content.indexOf(oldDoTabStart);
if (startIndex !== -1) {
  const endIndex = content.indexOf(oldDoTabEnd, startIndex) + oldDoTabEnd.length;
  
  const beforeDo = content.substring(0, startIndex);
  const afterDo = content.substring(endIndex);
  
  const newDoTab = `{activeWeek === 8 && activeTab === 'do' && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
                  <h3 className="text-xl font-black text-gray-900 mb-4">📝 YOUR HOMEWORK ASSIGNMENT</h3>
                  
                  <LogoMaker />

                  <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                    <ul className="space-y-4 text-gray-700 font-medium">
                      <li className="flex gap-3"><span className="text-blue-500 font-black">1.</span> Use the Logo Maker to personalize your badge — enter your name (or business name, if unlocked) and write your one-line mission.</li>
                      <li className="flex gap-3"><span className="text-blue-500 font-black">2.</span> Design your packaging label, including your SDG tag: "This piece came from a Jasmine School Shadow SDG Entrepreneur."</li>
                      <li className="flex gap-3"><span className="text-blue-500 font-black">3.</span> Research 3 real resin/bead brands online — how do they present themselves, and what do they charge?</li>
                    </ul>
                  </div>
                  <button onClick={() => setActiveTab('check')} className="w-full bg-[#0B1F3A] text-white py-4 rounded-xl font-bold uppercase tracking-wider hover:bg-[#15325A]">
                    Proceed to Check ➔
                  </button>
                </div>
              )}`;
              
  fs.writeFileSync(file, beforeDo + newDoTab + afterDo);
  console.log("Successfully updated W8 DO tab.");
} else {
  console.error("Could not find W8 DO tab.");
}
