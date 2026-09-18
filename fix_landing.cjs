const fs = require('fs');
let content = fs.readFileSync('src/screens/Landing.tsx', 'utf8');

// The block to replace:
// <div className="mb-8 min-h-[3rem] flex justify-center items-center">
//   <span className="font-black text-xs sm:text-sm tracking-[0.2em] text-[#0B1F3A] uppercase max-w-2xl leading-relaxed">

content = content.replace(
  /className="mb-8 min-h-\[3rem\] flex justify-center items-center"/,
  'className="mb-12 min-h-[5rem] flex justify-center items-center"'
);

content = content.replace(
  /className="font-black text-xs sm:text-sm tracking-\[0\.2em\] text-\[#0B1F3A\] uppercase max-w-2xl leading-relaxed"/,
  'className="font-black text-2xl sm:text-3xl md:text-4xl text-[#F5A623] uppercase max-w-4xl leading-tight"'
);

content = content.replace(
  /className="inline-block w-2 h-4 ml-1 bg-\[#F5A623\] align-middle"/,
  'className="inline-block w-3 h-7 md:h-9 ml-2 bg-[#F5A623] align-middle"'
);

fs.writeFileSync('src/screens/Landing.tsx', content);
console.log("Updated Landing.tsx styling.");
