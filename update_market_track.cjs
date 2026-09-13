const fs = require('fs');
const file = 'src/screens/Market.tsx';
let content = fs.readFileSync(file, 'utf8');

// Add track state
content = content.replace(
  "const [activeTab, setActiveTab] = useState<'learn' | 'do' | 'check' | 'sign'>('learn');",
  "const [activeTab, setActiveTab] = useState<'learn' | 'do' | 'check' | 'sign'>('learn');\n  const [track, setTrack] = useState<'primary' | 'institute'>('primary');"
);

// Add track toggle UI just below the weeks toggle
const toggleUI = `
        <div className="flex justify-end mb-4">
          <div className="bg-white rounded-lg p-1 inline-flex shadow-sm border border-gray-200">
            <button 
              onClick={() => setTrack('primary')}
              className={\`px-4 py-1.5 text-sm font-bold rounded-md transition-colors \${track === 'primary' ? 'bg-[#0B1F3A] text-white' : 'text-gray-500 hover:text-gray-700'}\`}
            >
              Primary / Secondary
            </button>
            <button 
              onClick={() => setTrack('institute')}
              className={\`px-4 py-1.5 text-sm font-bold rounded-md transition-colors \${track === 'institute' ? 'bg-[#0B1F3A] text-white' : 'text-gray-500 hover:text-gray-700'}\`}
            >
              Institute Level
            </button>
          </div>
        </div>
`;

content = content.replace(
  "        <div className=\"bg-white rounded-xl shadow-sm border-2 border-blue-100 overflow-hidden mb-6\">",
  toggleUI + "        <div className=\"bg-white rounded-xl shadow-sm border-2 border-blue-100 overflow-hidden mb-6\">"
);

// We'll update the fullTitle for Week 10 dynamically based on track
content = content.replace(
  "{ id: 10, title: 'W10: Pitch', fullTitle: 'Pitch Preparation' }",
  "{ id: 10, title: 'W10: Pitch', fullTitle: track === 'institute' ? 'Sales Pitch & Market Readiness' : 'Pitch Preparation' }"
);

fs.writeFileSync(file, content);
console.log("Track toggle added to Market.tsx");
