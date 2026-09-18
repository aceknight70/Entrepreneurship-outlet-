const fs = require('fs');

const typewriterComponent = `
const TypewriterText = ({ text, delay = 40 }: { text: string, delay?: number }) => {
  const [displayedText, setDisplayedText] = React.useState('');
  const [isDone, setIsDone] = React.useState(false);

  React.useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText(text.substring(0, i));
      i++;
      if (i > text.length) {
        clearInterval(interval);
        setIsDone(true);
      }
    }, delay);

    return () => clearInterval(interval);
  }, [text, delay]);

  return (
    <div className="mb-8 min-h-[3rem] flex justify-center items-center">
      <span className="font-black text-xs sm:text-sm tracking-[0.2em] text-[#0B1F3A] uppercase max-w-2xl leading-relaxed">
        {displayedText}
        {!isDone && <span className="inline-block w-2 h-4 ml-1 bg-[#F5A623] align-middle"></span>}
      </span>
    </div>
  );
};
`;

let content = fs.readFileSync('src/screens/Landing.tsx', 'utf8');

if (!content.includes('import { SCHOOL_CONFIG }')) {
  content = content.replace("import React from 'react';", "import React from 'react';\nimport { SCHOOL_CONFIG } from '../config';");
}

if (!content.includes('TypewriterText')) {
  content = content.replace("export function LandingScreen", typewriterComponent + "\nexport function LandingScreen");
}

const teleprompterInstance = `        {/* Teleprompter Headline */}
        <TypewriterText text={\`\${SCHOOL_CONFIG.name}, \${SCHOOL_CONFIG.location} — STUDENT ENTREPRENEURSHIP TRAINING\`} />
        
        {/* Jasmine School - Top Level */}`;

content = content.replace("{/* Jasmine School - Top Level */}", teleprompterInstance);

fs.writeFileSync('src/screens/Landing.tsx', content);
console.log("Updated Landing.tsx");
