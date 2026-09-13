import React from 'react';
import { BookOpen, Package, Store, CheckCircle, Beaker, GraduationCap, ArrowRight } from 'lucide-react';
import { DiagonalBanner } from '../components/Layout';
import { PlaceholderImage } from '../components/PlaceholderImage';
import { Image as ImageIcon } from 'lucide-react';

interface DashboardProps {
  onEnterPhase: (phase: number) => void;
  onViewChange?: (view: any) => void;
}

export function DashboardScreen({ onEnterPhase, onViewChange }: DashboardProps) {
  const overallProgress = 18;

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col pb-24 font-sans">
      <DiagonalBanner />
      <div className="relative z-10 max-w-3xl mx-auto w-full pt-16 px-4">
        
        <div className="mb-8">
          <h1 className="text-4xl font-black text-white tracking-tight mb-2 uppercase">My 11-Week Journey</h1>
          <p className="text-blue-100 font-medium">SDG Entrepreneurship in Resin Craft</p>
          
          <div className="mt-6 bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 text-white">
            <div className="flex justify-between items-center mb-2">
              <span className="font-bold text-sm uppercase tracking-wider">Overall Progress</span>
              <span className="font-bold">{overallProgress}% Complete</span>
            </div>
            <div className="w-full bg-black/40 rounded-full h-3">
              <div className="bg-[#F5A623] h-3 rounded-full" style={{ width: `${overallProgress}%` }}></div>
            </div>
          </div>
        </div>

        
        {/* Gallery Links & Student Uploads */}
        <div className="mb-10 space-y-6">
          <button 
            
            className="w-full bg-[#F5A623] text-[#0B1F3A] p-6 rounded-xl shadow-md border border-[#F5A623] hover:bg-[#e0961b] transition-colors flex items-center justify-between group"
            onClick={() => { if (onViewChange) onViewChange('gallery'); }}
          >
            <div className="text-left">
              <h2 className="font-black text-xl uppercase tracking-wider mb-1">Inspiration Gallery</h2>
              <p className="font-medium text-sm">Browse finished pieces for ideas and craft references.</p>
            </div>
            <ImageIcon className="w-8 h-8 transform group-hover:scale-110 transition-transform" />
          </button>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="font-black text-gray-900 uppercase tracking-wider mb-4">My Uploads</h3>
            <p className="text-gray-500 text-sm mb-6">Your submitted homework photos will appear here as you progress through the weeks.</p>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <PlaceholderImage 
                src="https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?auto=format&fit=crop&w=400" 
                alt="My Mould (Week 4)" 
                label="My Mould (W4)"
                className="h-32 sm:h-40"
              />
              <PlaceholderImage 
                src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=400" 
                alt="Production Photo (Week 6)" 
                label="Production (W6)"
                className="h-32 sm:h-40"
              />
              <PlaceholderImage 
                src="https://images.unsplash.com/photo-1611080922847-7585a73f9f91?auto=format&fit=crop&w=400" 
                alt="Finished Piece (Week 7)" 
                label="Finished Piece (W7)"
                className="h-32 sm:h-40"
              />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* PHASE 1: KNOWLEDGE */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-blue-500 text-white p-4 flex items-center gap-3">
              <BookOpen className="w-6 h-6" />
              <h2 className="font-black text-xl uppercase tracking-wider">Phase 1: Knowledge</h2>
            </div>
            <div className="p-6">
              <p className="text-gray-500 font-bold mb-4 text-sm uppercase tracking-wider">Weeks 1 & 2</p>
              
              <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 space-y-3 mb-6">
                <div className="flex items-center gap-3 text-sm font-bold text-gray-700">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  W1: Orientation (SDG 4, 8, 9, 12)
                </div>
                <div className="flex items-center gap-3 text-sm font-bold text-gray-700">
                  <div className="w-5 h-5 rounded-full border-2 border-gray-300"></div>
                  W2: Safety & Hazard Control (SDG 12)
                </div>
              </div>

              <button 
                onClick={() => onEnterPhase(1)}
                className="w-full bg-[#0B1F3A] text-white py-4 rounded-xl font-bold uppercase tracking-wider hover:bg-[#15325A] transition-colors flex items-center justify-center gap-2"
              >
                Enter Phase 1 ➔
              </button>
            </div>
          </div>

          {/* PHASE 2: PREPARATION */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-emerald-500 text-white p-4 flex items-center gap-3">
              <Beaker className="w-6 h-6" />
              <h2 className="font-black text-xl uppercase tracking-wider">Phase 2: Preparation</h2>
            </div>
            <div className="p-6">
              <p className="text-gray-500 font-bold mb-4 text-sm uppercase tracking-wider">Weeks 3, 4 & 5</p>
              
              <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 space-y-3 mb-6">
                <div className="flex items-center gap-3 text-sm font-bold text-gray-700">
                  <div className="w-5 h-5 rounded-full border-2 border-gray-300"></div>
                  W3: Design & Categories (SDG 9)
                </div>
                <div className="flex items-center gap-3 text-sm font-bold text-gray-700">
                  <div className="w-5 h-5 rounded-full border-2 border-gray-300"></div>
                  W4: Using & Caring for Your Mould (SDG 12)
                </div>
                <div className="flex items-center gap-3 text-sm font-bold text-gray-700">
                  <div className="w-5 h-5 rounded-full border-2 border-gray-300"></div>
                  W5: Final Preparation (SDG 12)
                </div>
              </div>

              <button 
                onClick={() => onEnterPhase(2)}
                className="w-full bg-emerald-600 text-white py-4 rounded-xl font-bold uppercase tracking-wider hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2"
              >
                Enter Phase 2 ➔
              </button>
            </div>
          </div>

          {/* PHASE 3: PRODUCTION */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-orange-500 text-white p-4 flex items-center gap-3">
              <Package className="w-6 h-6" />
              <h2 className="font-black text-xl uppercase tracking-wider">Phase 3: Production</h2>
            </div>
            <div className="p-6">
              <p className="text-gray-500 font-bold mb-2 text-sm uppercase tracking-wider">My Resin Bead Business</p>
              <p className="text-gray-400 font-bold mb-4 text-xs uppercase tracking-wider">Weeks 6 & 7</p>
              
              <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 space-y-3 mb-6">
                <div className="flex items-center gap-3 text-sm font-bold text-gray-700">
                  <div className="w-5 h-5 rounded-full border-2 border-gray-300"></div>
                  W6: Production Day — Zero-Waste (SDG 12)
                </div>
                <div className="flex items-center gap-3 text-sm font-bold text-gray-700">
                  <div className="w-5 h-5 rounded-full border-2 border-gray-300"></div>
                  W7: Finishing, Quality Control & Residue (SDG 12)
                </div>
              </div>

              <button 
                onClick={() => onEnterPhase(3)}
                className="w-full bg-orange-600 text-white py-4 rounded-xl font-bold uppercase tracking-wider hover:bg-orange-700 transition-colors flex items-center justify-center gap-2"
              >
                Enter Phase 3 ➔
              </button>
            </div>
          </div>

          {/* PHASE 4: MARKET */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-red-500 text-white p-4 flex items-center gap-3">
              <Store className="w-6 h-6" />
              <h2 className="font-black text-xl uppercase tracking-wider">Phase 4: Market</h2>
            </div>
            <div className="p-6">
              <p className="text-gray-500 font-bold mb-2 text-sm uppercase tracking-wider">My Resin Bead Business</p>
              <p className="text-gray-400 font-bold mb-4 text-xs uppercase tracking-wider">Weeks 8, 9 & 10</p>
              
              <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 space-y-3 mb-6">
                <div className="flex items-center gap-3 text-sm font-bold text-gray-700">
                  <div className="w-5 h-5 rounded-full border-2 border-gray-300"></div>
                  W8: Branding & Packaging (SDG 8)
                </div>
                <div className="flex items-center gap-3 text-sm font-bold text-gray-700">
                  <div className="w-5 h-5 rounded-full border-2 border-gray-300"></div>
                  W9: The Bead Costing Workshop — Costing, Pricing & Marketing (SDG 8)
                </div>
                <div className="flex items-center gap-3 text-sm font-bold text-gray-700">
                  <div className="w-5 h-5 rounded-full border-2 border-gray-300"></div>
                  W10: Pitch Preparation (SDG 8)
                </div>
              </div>

              <button 
                onClick={() => onEnterPhase(4)}
                className="w-full bg-red-600 text-white py-4 rounded-xl font-bold uppercase tracking-wider hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
              >
                Enter Phase 4 ➔
              </button>
            </div>
          </div>
          
          {/* PHASE 5: GRADUATION */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-purple-600 text-white p-4 flex items-center gap-3">
              <GraduationCap className="w-6 h-6" />
              <h2 className="font-black text-xl uppercase tracking-wider">Phase 5: Graduation</h2>
            </div>
            <div className="p-6">
              <p className="text-gray-500 font-bold mb-2 text-sm uppercase tracking-wider">My Resin Bead Business</p>
              <p className="text-gray-400 font-bold mb-4 text-xs uppercase tracking-wider">Week 11</p>
              
              <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 space-y-3 mb-6">
                <div className="flex items-center gap-3 text-sm font-bold text-gray-700">
                  <div className="w-5 h-5 rounded-full border-2 border-gray-300"></div>
                  W11: Market Day & Certification (SDG 8, 12)
                </div>
              </div>

              <button 
                onClick={() => onEnterPhase(5)}
                className="w-full bg-purple-600 text-white py-4 rounded-xl font-bold uppercase tracking-wider hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
              >
                Enter Phase 5 ➔
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
