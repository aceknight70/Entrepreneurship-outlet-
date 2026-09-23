import React, { useState, useEffect } from 'react';
import { DiagonalBanner } from '../components/Layout';
import { ArrowLeft, ArrowRight, Image as ImageIcon, ShieldCheck, Sparkles, Filter } from 'lucide-react';
import { galleryService, GalleryItem, GalleryCategory, GALLERY_CATEGORIES } from '../lib/galleryService';

interface GalleryScreenProps {
  onBack: () => void;
  onOpenAdmin?: () => void;
  onProceedToEnrolment?: () => void;
}

export function GalleryScreen({ onBack, onOpenAdmin, onProceedToEnrolment }: GalleryScreenProps) {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeCategory, setActiveCategory] = useState<'All' | GalleryCategory>('All');

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    try {
      const res = await galleryService.getGalleryItems();
      setItems(res.items);
    } catch (err) {
      console.error('Failed to load gallery items in public view:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredItems = items.filter((item) => {
    if (activeCategory === 'All') return true;
    return item.category === activeCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col pb-24 font-sans">
      <DiagonalBanner />
      <div className="relative z-10 max-w-6xl mx-auto w-full pt-16 px-4 flex-1">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <button 
            onClick={onBack}
            className="inline-flex items-center gap-2 text-white/90 hover:text-white transition-colors font-black text-xs uppercase tracking-wider bg-white/10 px-3.5 py-2 rounded-xl border border-white/20 w-fit"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>

          <div className="flex items-center gap-2">
            {onOpenAdmin && (
              <button
                onClick={onOpenAdmin}
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase px-3.5 py-2 rounded-xl border border-white/20 transition-all w-fit"
              >
                <ShieldCheck className="w-4 h-4 text-[#F5A623]" />
                <span className="hidden sm:inline">Admin Manager</span>
              </button>
            )}

            {onProceedToEnrolment && (
              <button
                onClick={onProceedToEnrolment}
                className="inline-flex items-center gap-2 bg-[#F5A623] hover:bg-[#e0961b] text-[#0B1F3A] font-black text-xs uppercase px-4 py-2 rounded-xl transition-all shadow-md w-fit"
              >
                <span>Continue to Enrolment</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        <div className="mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F5A623]/20 text-[#F5A623] text-xs font-black uppercase tracking-wider mb-2 border border-[#F5A623]/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Product Inspiration & Quality Benchmark</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-2 uppercase">
            Inspiration Gallery
          </h1>
          <p className="text-blue-100 font-medium max-w-2xl text-sm sm:text-base leading-relaxed">
            A curated showcase of finished pieces. This is what's possible when you mix craft, patience, and vision. Explore mixed shapes, colours, and finishing styles for your resin business.
          </p>
        </div>

        {/* Category Filters */}
        <div className="mb-6 flex flex-wrap items-center gap-2 bg-white/90 backdrop-blur-xs p-2 rounded-2xl border border-gray-200 shadow-sm">
          <button
            onClick={() => setActiveCategory('All')}
            className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
              activeCategory === 'All'
                ? 'bg-[#0B1F3A] text-white shadow-sm'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            All Items ({items.length})
          </button>
          {GALLERY_CATEGORIES.map((cat) => {
            const count = items.filter((i) => i.category === cat).length;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeCategory === cat
                    ? 'bg-[#0B1F3A] text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                {cat} ({count})
              </button>
            );
          })}
        </div>

        {/* Photos Grid */}
        {loading ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-gray-200 shadow-sm">
            <div className="w-8 h-8 border-3 border-[#F5A623] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-sm font-bold text-gray-600">Loading inspiration gallery...</p>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-gray-200 shadow-sm">
            <ImageIcon className="w-12 h-12 text-gray-300 mx-auto mb-2" />
            <p className="text-gray-600 font-bold text-sm">No photos found in this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((piece) => (
              <div 
                key={piece.id} 
                className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-all group flex flex-col justify-between"
              >
                <div className="relative aspect-4/3 bg-gray-100 overflow-hidden">
                  <img
                    src={piece.image_url}
                    alt={piece.caption || piece.category}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="text-[11px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#0B1F3A]/90 text-[#F5A623] shadow-md backdrop-blur-xs">
                      {piece.category}
                    </span>
                  </div>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between">
                  <p className="text-xs font-semibold text-gray-800 leading-relaxed">
                    {piece.caption || `${piece.category} craft reference piece`}
                  </p>
                  <p className="text-[11px] text-gray-400 mt-2 font-medium">
                    Added {new Date(piece.created_at).toLocaleDateString(undefined, {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Next Step Call to Action */}
        {onProceedToEnrolment && (
          <div className="mt-12 bg-gradient-to-r from-[#0B1F3A] to-[#15325A] rounded-2xl p-6 sm:p-8 text-white shadow-lg border-2 border-[#F5A623] flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="space-y-1">
              <span className="text-[11px] font-black uppercase tracking-wider text-[#F5A623]">
                Next Step: Programme Onboarding
              </span>
              <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white">
                Inspired to Create Your Own Pieces?
              </h3>
              <p className="text-blue-100 text-xs sm:text-sm max-w-xl leading-relaxed">
                Complete student enrolment to receive your complete Starter Craft Kit, verified safety gear, and 11 weeks of guided entrepreneurship mentorship.
              </p>
            </div>
            <button
              onClick={onProceedToEnrolment}
              className="bg-[#F5A623] hover:bg-[#e0961b] text-[#0B1F3A] px-6 py-3.5 rounded-xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md shrink-0 cursor-pointer"
            >
              <span>Proceed to Enrolment</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
