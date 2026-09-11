import React from 'react';

export function DiagonalBanner({ isGraphitti = false }: { isGraphitti?: boolean }) {
  if (isGraphitti) {
    return (
      <div className="absolute top-0 left-0 w-full h-48 overflow-hidden pointer-events-none z-0">
        <div 
          className="absolute -top-32 -left-16 w-[150%] h-48 bg-[#F5A623] transform -rotate-3 origin-top-left opacity-90 shadow-lg"
          style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 80%)' }}
        ></div>
        {/* Secondary stripe */}
        <div 
          className="absolute -top-32 -left-16 w-[150%] h-48 bg-yellow-400 transform -rotate-3 origin-top-left opacity-30 mix-blend-overlay"
          style={{ clipPath: 'polygon(0 0, 100% 0, 100% 85%, 0 100%)' }}
        ></div>
      </div>
    );
  }

  // Default Jasmine School Navy theme
  return (
    <div className="absolute top-0 left-0 w-full h-40 overflow-hidden pointer-events-none z-0">
      <div className="absolute top-0 left-0 w-full h-32 bg-[#0B1F3A] rounded-b-[3rem] shadow-md"></div>
      <div className="absolute top-0 left-0 w-full h-32 bg-blue-900/20 rounded-b-[3rem] border-b border-blue-800/30"></div>
    </div>
  );
}
