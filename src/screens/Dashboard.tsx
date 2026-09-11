import React from 'react';
import { BookOpen, Package, Store, CheckCircle, Lock, Beaker, GraduationCap } from 'lucide-react';
import { DiagonalBanner } from '../components/Layout';

interface DashboardProps {
  onEnterPhase: (phase: number) => void;
}

export function DashboardScreen({ onEnterPhase }: DashboardProps) {
  // Hardcoded progress for prototype purposes
  const overallProgress = 18;

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col pb-24 font-sans">
      <DiagonalBanner />
      <div className="relative z-10 max-w-3xl mx-auto w-full pt-16 px-4">
        
        <div className="mb-8">
          <h1 className="text-4xl font-black text-white tracking-tight mb-2 uppercase">My 11-Week Journey</h1>
          
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

              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold text-gray-400 uppercase">Progress</span>
                <span className="text-xs font-bold text-gray-600">50%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '50%' }}></div>
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
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden opacity-75">
            <div className="bg-emerald-500 text-white p-4 flex items-center gap-3">
              <Beaker className="w-6 h-6" />
              <h2 className="font-black text-xl uppercase tracking-wider">Phase 2: Preparation</h2>
            </div>
            <div className="p-6">
              <p className="text-gray-500 font-bold mb-4 text-sm uppercase tracking-wider">Weeks 3, 4 & 5</p>
              
              <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 space-y-3 mb-6">
                <div className="flex items-center gap-3 text-sm font-bold text-gray-400">
                  <Lock className="w-5 h-5" />
                  W3: Design & Categories (SDG 9)
                </div>
                <div className="flex items-center gap-3 text-sm font-bold text-gray-400">
                  <Lock className="w-5 h-5" />
                  W4: Mould-Making & Practice (SDG 12)
                </div>
                <div className="flex items-center gap-3 text-sm font-bold text-gray-400">
                  <Lock className="w-5 h-5" />
                  W5: Final Preparation (SDG 12)
                </div>
              </div>

              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold text-gray-400 uppercase">Progress</span>
                <span className="text-xs font-bold text-gray-400">0%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-6"></div>

              <button className="w-full bg-gray-100 text-gray-400 py-4 rounded-xl font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-not-allowed">
                <Lock className="w-5 h-5" />
                Locked - Complete Phase 1 to unlock
              </button>
            </div>
          </div>

          {/* PHASE 3: PRODUCTION */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden opacity-75">
            <div className="bg-orange-500 text-white p-4 flex items-center gap-3">
              <Package className="w-6 h-6" />
              <h2 className="font-black text-xl uppercase tracking-wider">Phase 3: Production</h2>
            </div>
            <div className="p-6">
              <p className="text-gray-500 font-bold mb-4 text-sm uppercase tracking-wider">Weeks 6 & 7</p>
              
              <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 space-y-3 mb-6">
                <div className="flex items-center gap-3 text-sm font-bold text-gray-400">
                  <Lock className="w-5 h-5" />
                  W6: Production Day - Zero-Waste (SDG 12)
                </div>
                <div className="flex items-center gap-3 text-sm font-bold text-gray-400">
                  <Lock className="w-5 h-5" />
                  W7: Finishing, QC & Upcycling (SDG 12)
                </div>
              </div>

              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold text-gray-400 uppercase">Progress</span>
                <span className="text-xs font-bold text-gray-400">0%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-6"></div>

              <button className="w-full bg-gray-100 text-gray-400 py-4 rounded-xl font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-not-allowed">
                <Lock className="w-5 h-5" />
                Locked
              </button>
            </div>
          </div>

          {/* PHASE 4: MARKET */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden opacity-75">
            <div className="bg-red-500 text-white p-4 flex items-center gap-3">
              <Store className="w-6 h-6" />
              <h2 className="font-black text-xl uppercase tracking-wider">Phase 4: Market</h2>
            </div>
            <div className="p-6">
              <p className="text-gray-500 font-bold mb-4 text-sm uppercase tracking-wider">Weeks 8, 9 & 10</p>
              
              <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 space-y-3 mb-6">
                <div className="flex items-center gap-3 text-sm font-bold text-gray-400">
                  <Lock className="w-5 h-5" />
                  W8: Branding & Packaging (SDG 8)
                </div>
                <div className="flex items-center gap-3 text-sm font-bold text-gray-400">
                  <Lock className="w-5 h-5" />
                  W9: Costing, Pricing & Marketing (SDG 8)
                </div>
                <div className="flex items-center gap-3 text-sm font-bold text-gray-400">
                  <Lock className="w-5 h-5" />
                  W10: Pitch Preparation (SDG 8)
                </div>
              </div>

              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold text-gray-400 uppercase">Progress</span>
                <span className="text-xs font-bold text-gray-400">0%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-6"></div>

              <button className="w-full bg-gray-100 text-gray-400 py-4 rounded-xl font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-not-allowed">
                <Lock className="w-5 h-5" />
                Locked
              </button>
            </div>
          </div>
          
          {/* PHASE 5: GRADUATION */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden opacity-75">
            <div className="bg-purple-600 text-white p-4 flex items-center gap-3">
              <GraduationCap className="w-6 h-6" />
              <h2 className="font-black text-xl uppercase tracking-wider">Phase 5: Graduation</h2>
            </div>
            <div className="p-6">
              <p className="text-gray-500 font-bold mb-4 text-sm uppercase tracking-wider">Week 11</p>
              
              <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 space-y-3 mb-6">
                <div className="flex items-center gap-3 text-sm font-bold text-gray-400">
                  <Lock className="w-5 h-5" />
                  W11: Market Day & Certification (SDG 8, 12)
                </div>
              </div>

              <button className="w-full bg-gray-100 text-gray-400 py-4 rounded-xl font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-not-allowed">
                <Lock className="w-5 h-5" />
                Locked
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
