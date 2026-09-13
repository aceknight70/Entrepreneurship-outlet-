import React from 'react';
import { GraphittiBrand, EsgmcBrand } from '../components/Branding';
import { DiagonalBanner } from '../components/Layout';

export function LandingScreen({ onEnter }: { onEnter?: () => void }) {
  return (
    <div className="min-h-screen bg-gray-50 relative pb-24">
      <DiagonalBanner />
      
      <div className="relative z-10 max-w-3xl mx-auto pt-16 px-6 flex flex-col items-center text-center">
        {/* Jasmine School - Top Level */}
<div className="mb-16">
          <h2 className="text-[#F5A623] font-serif italic text-lg mb-2">Welcome to</h2>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-tight flex flex-col gap-1" style={{ fontFamily: 'Syne, sans-serif' }}>
            <span className="text-white">GRAPHITTI STUDIOS</span>
            <span className="text-black">CREATIVE ENTREPRENEURSHIP HUB</span>
          </h1>
          <p className="text-gray-500 mt-4 font-medium tracking-wide uppercase text-sm max-w-md mx-auto">
            A Shadow School designed in the ESGMC SDG Learning Lab
          </p>
        </div>

        {/* The Outlet Card */}
        <div className="bg-white rounded-2xl shadow-xl w-full p-8 sm:p-12 border border-gray-100 relative overflow-hidden mt-8">
          {/* Subtle background decoration */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#F5A623]/5 rounded-full blur-3xl"></div>
          
          <div className="relative z-10 space-y-10">
            <div>
              <h3 className="text-gray-500 font-medium text-sm tracking-widest uppercase mb-6">Programme Delivery By</h3>
              
              <div className="flex flex-col items-center gap-4">
                <GraphittiBrand />
                
                <div className="flex items-center justify-center gap-3">
                  <span className="text-gray-700 font-bold tracking-wide uppercase text-sm">and</span>
                  <EsgmcBrand />
                  <span className="text-gray-700 font-bold tracking-wide uppercase text-sm">ESGMC Joint venture</span>
                </div>
              </div>

              <p className="text-gray-600 max-w-md mx-auto mt-6 leading-relaxed">
                An 11 -week immersive journey guiding students from raw materials, craft , entrepreneurial Mindset  development  to market reality, teaching sustainable design and real-world economics.
              </p>
            </div>

            <div className="pt-8 border-t border-gray-100">
              <button 
                onClick={onEnter}
                className="bg-[#0B1F3A] text-white px-8 py-4 rounded-full font-semibold shadow-md hover:bg-[#15325A] transition-colors w-full sm:w-auto min-w-[200px]"
              >
                Enter Programme
              </button>
            </div>
            
            {/* Infrastructure Line */}
            <div className="pt-8">
              <p className="text-gray-400 text-xs font-medium tracking-wider uppercase">
                Powered by ESGMC Shadow School
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
