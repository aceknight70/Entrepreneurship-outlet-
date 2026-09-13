import React from 'react';
import { Image as ImageIcon } from 'lucide-react';

export function PlaceholderImage({ src, alt, label, className = '' }: { src: string, alt: string, label?: string, className?: string }) {
  return (
    <div className={`relative overflow-hidden rounded-xl bg-gray-100 border border-gray-200 group ${className}`}>
      <img 
        src={src} 
        alt={alt} 
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 pointer-events-none"></div>
      <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between pointer-events-none">
        {label && <span className="text-white font-bold text-sm leading-tight drop-shadow-md pr-2">{label}</span>}
        <div className="flex items-center gap-1 bg-black/50 backdrop-blur-md text-white/90 text-[9px] uppercase font-bold px-2 py-1 rounded ml-auto flex-shrink-0">
          <ImageIcon className="w-3 h-3" />
          <span>Placeholder</span>
        </div>
      </div>
    </div>
  );
}
