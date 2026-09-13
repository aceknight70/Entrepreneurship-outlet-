import React from 'react';
import { DiagonalBanner } from '../components/Layout';
import { PlaceholderImage } from '../components/PlaceholderImage';
import { ArrowLeft } from 'lucide-react';

export function GalleryScreen({ onBack }: { onBack: () => void }) {
  const examplePieces = [
    { id: 1, src: "https://images.unsplash.com/photo-1611080922847-7585a73f9f91?auto=format&fit=crop&w=800", title: "Resin Drop Earrings" },
    { id: 2, src: "https://images.unsplash.com/photo-1599643478524-fb66f70a0922?auto=format&fit=crop&w=800", title: "Polished Pendants" },
    { id: 3, src: "https://images.unsplash.com/photo-1602751584552-8ba73aad10ee?auto=format&fit=crop&w=800", title: "Swirl Effect Keychain" },
    { id: 4, src: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800", title: "Layered Color Collection" },
    { id: 5, src: "https://images.unsplash.com/photo-1618423771880-2bcfa4b6f10c?auto=format&fit=crop&w=800", title: "Fluid Art Patterning" },
    { id: 6, src: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800", title: "Finished Crafts & Tools" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col pb-24 font-sans">
      <DiagonalBanner />
      <div className="relative z-10 max-w-5xl mx-auto w-full pt-16 px-4 flex-1">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors font-bold text-sm uppercase tracking-wider"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </button>

        <div className="mb-8">
          <h1 className="text-4xl font-black text-white tracking-tight mb-2 uppercase">Inspiration Gallery</h1>
          <p className="text-blue-100 font-medium max-w-2xl">
            A curated showcase of finished pieces. This is what's possible when you mix craft, patience, and vision. Explore mixed shapes, colours, and finishing styles for your resin business.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {examplePieces.map((piece) => (
            <div key={piece.id}><PlaceholderImage src={piece.src} alt={piece.title} label={piece.title} className="h-64 sm:h-72 shadow-sm" /></div>
          ))}
        </div>
      </div>
    </div>
  );
}
