import React, { useState } from 'react';
import { Award, CheckCircle2, Sparkles, ArrowRight, FileText } from 'lucide-react';
import { DiagonalBanner } from '../components/Layout';
import { PlaceholderImage } from '../components/PlaceholderImage';
import { SCHOOL_CONFIG } from '../config';

interface GraduationScreenProps {
  onOpenBridge?: () => void;
}

export function GraduationScreen({ onOpenBridge }: GraduationScreenProps) {
  const [activeTab, setActiveTab] = useState<'learn' | 'do' | 'check' | 'sign'>('learn');
  const [isGraduated, setIsGraduated] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col pb-24 font-sans">
      <DiagonalBanner />
      <div className="relative z-10 max-w-3xl mx-auto w-full pt-16 px-4 flex-1">
        <div className="mb-6">
          <h1 className="text-4xl font-black text-white tracking-tight mb-2 uppercase">Phase 5</h1>
          <p className="text-blue-100 font-medium">Graduation — My Resin Bead Business</p>
        </div>

        {/* Top Horizontal Week Toggle - Just Week 11 */}
        <div className="flex bg-white/20 p-1 rounded-xl mb-6 overflow-x-auto hide-scrollbar">
          <button className="flex-1 min-w-[140px] py-3 px-2 text-sm font-bold rounded-lg transition-all flex flex-col items-center justify-center gap-1 bg-white text-[#0B1F3A] shadow-md scale-100">
            <div className="flex items-center gap-1">
              <Award className="w-4 h-4" />
              <span>W11: Graduation</span>
            </div>
          </button>
        </div>

        {/* Graphitti Bridge Unlocked Hero Banner (Unlocks immediately after completing Week 11) */}
        {isGraduated && (
          <div className="bg-gradient-to-r from-[#0B1F3A] via-[#15325A] to-purple-900 rounded-2xl p-6 text-white shadow-lg border-2 border-[#F5A623] mb-6 relative overflow-hidden animate-fadeIn">
            <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-[#F5A623]/20 rounded-full blur-2xl pointer-events-none" />
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full bg-[#F5A623] text-[#0B1F3A] text-xs font-black uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                Unlocked Post-Graduation
              </span>
              <span className="text-xs text-purple-200 font-medium">Week 11 Milestone</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white mb-2">
              The Graphitti Bridge is Now Open! 🌉
            </h3>
            <p className="text-blue-100 text-xs sm:text-sm leading-relaxed mb-4 max-w-xl">
              You proved your products on Market Day and earned real revenue. Now write your letter to your parent to request seed startup capital from the <strong>Day Spring Parent Cooperative</strong>.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              {onOpenBridge && (
                <button
                  onClick={onOpenBridge}
                  className="bg-[#F5A623] hover:bg-[#e0961b] text-[#0B1F3A] px-5 py-3 rounded-xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md"
                >
                  <FileText className="w-4 h-4" />
                  <span>Start Step 1: Write Letter to Parent</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        )}

        <div className="bg-white rounded-xl shadow-sm border-2 border-purple-100 overflow-hidden mb-6">
          <div className="bg-purple-600 text-white p-4 flex items-center gap-4">
            <h2 className="font-bold tracking-wider uppercase flex-1">
              W11: Market Day & Certification
            </h2>
          </div>

          <div className="bg-gray-50 border-b border-gray-200">
            <div className="flex justify-between items-center px-6 py-3 text-[10px] sm:text-xs font-bold text-gray-400">
              <span className={['learn', 'do', 'check', 'sign'].includes(activeTab) ? 'text-purple-600' : ''}>🎓 LEARN</span>
              <span className="hidden sm:inline">────</span>
              <span className={['do', 'check', 'sign'].includes(activeTab) ? 'text-purple-600' : ''}>🛠️ DO</span>
              <span className="hidden sm:inline">────</span>
              <span className={['check', 'sign'].includes(activeTab) ? 'text-purple-600' : ''}>📝 CHECK</span>
              <span className="hidden sm:inline">────</span>
              <span className={['sign'].includes(activeTab) ? 'text-purple-600' : ''}>✍️ SIGN</span>
            </div>
          </div>

          <div className="p-6">
            <div className="flex bg-gray-200 rounded-lg p-1 mb-8 overflow-x-auto hide-scrollbar">
              <button onClick={() => setActiveTab('learn')} className={`flex-1 min-w-[70px] py-2 text-xs font-bold rounded-md transition-colors ${activeTab === 'learn' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>LEARN</button>
              <button onClick={() => setActiveTab('do')} className={`flex-1 min-w-[70px] py-2 text-xs font-bold rounded-md transition-colors ${activeTab === 'do' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>DO</button>
              <button onClick={() => setActiveTab('check')} className={`flex-1 min-w-[70px] py-2 text-xs font-bold rounded-md transition-colors ${activeTab === 'check' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>CHECK</button>
              <button onClick={() => setActiveTab('sign')} className={`flex-1 min-w-[70px] py-2 text-xs font-bold rounded-md transition-colors ${activeTab === 'sign' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>SIGN</button>
            </div>

            <div className="animate-in fade-in slide-in-from-bottom-4">
              {activeTab === 'learn' && (
                <div className="space-y-6">
                  <PlaceholderImage src="https://images.unsplash.com/photo-1533900298318-6b8da08a523e?auto=format&fit=crop&w=800" alt="Market stall setup" label="Example: Market Exhibition Stall" className="h-48 w-full" />
                  <h3 className="text-lg font-black text-gray-900 mb-2">Market Day!</h3>
                  <ul className="list-disc pl-5 text-gray-600 space-y-2 font-medium">
                    <li>Market Day framing: a Shark Tank-style pitch/pricing event — exposure and validation, not a guaranteed sale.</li>
                  </ul>
                  <button onClick={() => setActiveTab('do')} className="w-full bg-purple-600 text-white py-4 rounded-xl font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-purple-700">
                    Continue to Final Task ➔
                  </button>
                </div>
              )}

              {activeTab === 'do' && (
                <div className="space-y-6">
                  <h3 className="text-xl font-black text-gray-900 mb-4">📝 YOUR FINAL ASSIGNMENT</h3>
                  <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                    <ul className="space-y-4 text-gray-700 font-medium">
                      <li className="flex gap-3"><span className="text-purple-500 font-black">1.</span> Display price shown.</li>
                      <li className="flex gap-3"><span className="text-purple-500 font-black">2.</span> Log buyer interest (Low/Medium/High) and final outcome.</li>
                      <li className="flex gap-3"><span className="text-purple-500 font-black">3.</span> Brief on-the-spot reflection right after Market Day closes.</li>
                      <li className="flex gap-3"><span className="text-purple-500 font-black">4.</span> Refined Business Plan, completed at home shortly after via the portal — sits next to the original Week 1 Guess Business Plan so before/after growth is visible in one view.</li>
                    </ul>
                  </div>
                  <button onClick={() => setActiveTab('check')} className="w-full bg-purple-600 text-white py-4 rounded-xl font-bold uppercase tracking-wider hover:bg-purple-700">
                    Proceed to Check ➔
                  </button>
                </div>
              )}

              {activeTab === 'check' && (
                <div className="space-y-6">
                  <h3 className="text-xl font-black text-gray-900 mb-4">Review Your Work</h3>
                  <div className="bg-green-50 border border-green-200 p-6 rounded-xl">
                    <p className="text-green-800 font-medium">Please review your final submission. Congratulations on reaching the end of the program!</p>
                  </div>
                  <button onClick={() => setActiveTab('sign')} className="w-full bg-purple-600 text-white py-4 rounded-xl font-bold uppercase tracking-wider hover:bg-purple-700">
                    Proceed to Final Sign-off ➔
                  </button>
                </div>
              )}

              {activeTab === 'sign' && (
                <div className="space-y-6">
                  <h3 className="text-xl font-black text-gray-900 mb-4">Final Parent Verification</h3>
                  <p className="text-gray-600 mb-6">Final parent sign-off.</p>
                  
                  <div className="bg-yellow-50 border-2 border-yellow-200 p-6 rounded-xl text-center mb-6">
                    <Award className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
                    <h4 className="font-black text-yellow-900 uppercase tracking-wider mb-2">Certificate of Completion</h4>
                    <p className="text-yellow-800 italic font-medium leading-relaxed">
                      "This certifies that [Student Name] is a {SCHOOL_CONFIG.name} Shadow SDG Entrepreneur — Resin Craft, having completed the 11-week journey from raw materials to market reality."
                    </p>
                    <p className="text-sm text-yellow-700 mt-4 font-bold">
                      Signed by Head of School and Graphitti Programme Director.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <button 
                      onClick={() => setIsGraduated(true)}
                      className="w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all bg-green-100 text-green-700 border-2 border-green-500"
                    >
                      <CheckCircle2 className="w-5 h-5" /> GRADUATION COMPLETE
                    </button>

                    {onOpenBridge && (
                      <button
                        onClick={onOpenBridge}
                        className="w-full py-4 rounded-xl font-black flex items-center justify-center gap-2 transition-all bg-[#F5A623] hover:bg-[#e0961b] text-[#0B1F3A] uppercase tracking-wider shadow-md"
                      >
                        <Sparkles className="w-5 h-5" />
                        <span>Proceed to Graphitti Bridge (Child's Letter) ➔</span>
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

