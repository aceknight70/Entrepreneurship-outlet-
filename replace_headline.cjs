const fs = require('fs');

let content = fs.readFileSync('src/screens/Landing.tsx', 'utf8');

const oldHeadline = `<div className="mb-16">
          <h2 className="text-[#F5A623] font-serif italic text-lg mb-2">Welcome to</h2>
          <h1 className="text-4xl sm:text-6xl font-bold text-white tracking-tight leading-tight" style={{ fontFamily: 'Syne, sans-serif' }}>
            GRAPHITTI STUDIOS
          </h1>
          <p className="text-blue-200 mt-2 font-medium tracking-wide uppercase text-sm max-w-md mx-auto">
            Entrepreneurship School & Creative Enterprise Hub
          </p>
        </div>`;

const newHeadline = `<div className="mb-16">
          <h2 className="text-[#F5A623] font-serif italic text-lg mb-2">Welcome to</h2>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-tight flex flex-col gap-1" style={{ fontFamily: 'Syne, sans-serif' }}>
            <span className="text-white">GRAPHITTI STUDIOS</span>
            <span className="text-black">CREATIVE ENTREPRENEURSHIP SCHOOL</span>
          </h1>
          <p className="text-gray-500 mt-4 font-medium tracking-wide uppercase text-sm max-w-md mx-auto">
            A Shadow School designed in the ESGMC SDG Learning Lab
          </p>
        </div>`;

// Use replace with a regular expression or just plain replace if we remove exact whitespace
// Wait, the whitespace in oldHeadline might not match exactly.
const searchBlock = `        <div className="mb-16">
          <h2 className="text-[#F5A623] font-serif italic text-lg mb-2">Welcome to</h2>
          <h1 className="text-4xl sm:text-6xl font-bold text-white tracking-tight leading-tight" style={{ fontFamily: 'Syne, sans-serif' }}>
            GRAPHITTI STUDIOS
          </h1>
          <p className="text-blue-200 mt-2 font-medium tracking-wide uppercase text-sm max-w-md mx-auto">
            Entrepreneurship School & Creative Enterprise Hub
          </p>
        </div>`;

if (content.includes(searchBlock)) {
  content = content.replace(searchBlock, newHeadline);
  fs.writeFileSync('src/screens/Landing.tsx', content);
  console.log("Successfully replaced headline");
} else {
  // Let's do string surgery
  const startIdx = content.indexOf('<div className="mb-16">');
  const endIdx = content.indexOf('</div>', startIdx) + 6;
  if(startIdx !== -1) {
    const before = content.substring(0, startIdx);
    const after = content.substring(endIdx);
    fs.writeFileSync('src/screens/Landing.tsx', before + newHeadline + after);
    console.log("Successfully replaced headline via index");
  } else {
    console.log("Could not find headline");
  }
}

