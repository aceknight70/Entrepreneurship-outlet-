import { Hand } from 'lucide-react';

export function HandprintBadge({ className = '' }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center w-10 h-10 ${className}`}>
      {/* 5 colored dots representing fingers */}
      <div className="absolute top-0 flex gap-0.5 justify-center w-full pb-3 z-10">
        <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 mt-2"></div>
        <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-0"></div>
        <div className="w-1.5 h-1.5 rounded-full bg-red-500 -mt-1"></div>
        <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-0"></div>
        <div className="w-1.5 h-1.5 rounded-full bg-[#F5A623] mt-2"></div>
      </div>
      <Hand className="absolute bottom-1 text-[#F5A623] w-7 h-7 fill-[#F5A623]" />
    </div>
  );
}

export function GraphittiBrand({ showBadge = true, className = '', dark = false }: { showBadge?: boolean, className?: string, dark?: boolean }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {showBadge && <HandprintBadge />}
      <span className={`font-sans font-black tracking-tighter uppercase text-xl sm:text-2xl ${dark ? 'text-[#F5A623]' : 'text-[#F5A623]'}`}>
        GRAPHITTI STUDIOS
      </span>
    </div>
  );
}

export function EsgmcBrand({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <img 
        src="/Screenshot_20260913_171321_Gallery.jpg" 
        alt="ESGMC Logo" 
        className="w-10 h-10 rounded-full object-contain border border-gray-100 shadow-sm bg-white" 
        onError={(e) => {
          // Fallback if image not found in public folder
          e.currentTarget.style.display = 'none';
          e.currentTarget.nextElementSibling?.classList.remove('hidden');
        }}
      />
      {/* Fallback SVG if image is missing */}
      <div className="hidden w-10 h-10 rounded-full border-2 border-[#0B1F3A] flex items-center justify-center bg-white shadow-sm relative overflow-hidden">
        <span className="font-black text-[#0B1F3A] text-[8px]">ESGMC</span>
      </div>
    </div>
  );
}
