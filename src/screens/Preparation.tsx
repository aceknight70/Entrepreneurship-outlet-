import React, { useState } from 'react';
import { Shield, Target, Lock, CheckCircle2 } from 'lucide-react';
import { DiagonalBanner } from '../components/Layout';

export function PreparationScreen({ onNextPhase }: { onNextPhase?: () => void }) {
  const [activeWeek, setActiveWeek] = useState<number>(3);
  const [activeTab, setActiveTab] = useState<'learn' | 'do' | 'check' | 'sign'>('learn');
  const [completedWeeks, setCompletedWeeks] = useState<number[]>([2]); // Week 2 is complete from Phase 1
  const [signedWeeks, setSignedWeeks] = useState<Record<number, boolean>>({});

  const completeWeek = (w: number) => {
    if (!completedWeeks.includes(w)) {
      setCompletedWeeks([...completedWeeks, w]);
    }
    if (w < 5) {
      setActiveWeek(w + 1);
      setActiveTab('learn');
    } else {
      if (onNextPhase) onNextPhase();
    }
  };

  const handleSign = () => {
    setSignedWeeks({ ...signedWeeks, [activeWeek]: true });
  };

  const weeks = [
    { id: 3, title: 'W3: Design', fullTitle: 'Design & Categories' },
    { id: 4, title: 'W4: Moulds', fullTitle: 'Mould-Making & Practice' },
    { id: 5, title: 'W5: Prep', fullTitle: 'Final Preparation' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col pb-24 font-sans">
      <DiagonalBanner />
      <div className="relative z-10 max-w-3xl mx-auto w-full pt-16 px-4 flex-1">
        <div className="mb-6">
          <h1 className="text-4xl font-black text-white tracking-tight mb-2 uppercase">Phase 2</h1>
          <p className="text-blue-100 font-medium">Preparation</p>
        </div>

        {/* Top Horizontal Week Toggles */}
        <div className="flex bg-white/20 p-1 rounded-xl mb-6 overflow-x-auto hide-scrollbar">
          {weeks.map((w) => {
            const isUnlocked = completedWeeks.includes(w.id - 1);
            const isCompleted = completedWeeks.includes(w.id);
            const isActive = activeWeek === w.id;

            return (
              <button
                key={w.id}
                onClick={() => isUnlocked && setActiveWeek(w.id)}
                className={`flex-1 min-w-[90px] py-3 px-2 text-sm font-bold rounded-lg transition-all flex flex-col items-center justify-center gap-1 ${
                  isActive
                    ? 'bg-white text-[#0B1F3A] shadow-md scale-100'
                    : isUnlocked
                    ? 'bg-transparent text-white hover:bg-white/10'
                    : 'bg-transparent text-white/50 cursor-not-allowed'
                }`}
              >
                <div className="flex items-center gap-1">
                  {isCompleted ? (
                    <CheckCircle2 className={`w-4 h-4 ${isActive ? 'text-green-500' : 'text-green-300'}`} />
                  ) : !isUnlocked ? (
                    <Lock className="w-4 h-4" />
                  ) : null}
                  <span>{w.title}</span>
                </div>
              </button>
            );
          })}
        </div>

        <div className="bg-white rounded-xl shadow-sm border-2 border-blue-100 overflow-hidden mb-6">
          <div className="bg-[#0B1F3A] text-white p-4 flex items-center gap-4">
            <h2 className="font-bold tracking-wider uppercase flex-1">
              W{activeWeek}: {weeks.find(w => w.id === activeWeek)?.fullTitle}
            </h2>
          </div>

          <div className="bg-gray-50 border-b border-gray-200">
            <div className="flex justify-between items-center px-6 py-3 text-[10px] sm:text-xs font-bold text-gray-400">
              <span className={['learn', 'do', 'check', 'sign'].includes(activeTab) ? 'text-[#0B1F3A]' : ''}>🎓 LEARN</span>
              <span className="hidden sm:inline">────</span>
              <span className={['do', 'check', 'sign'].includes(activeTab) ? 'text-[#0B1F3A]' : ''}>🛠️ DO</span>
              <span className="hidden sm:inline">────</span>
              <span className={['check', 'sign'].includes(activeTab) ? 'text-[#0B1F3A]' : ''}>📝 CHECK</span>
              <span className="hidden sm:inline">────</span>
              <span className={['sign'].includes(activeTab) ? 'text-[#0B1F3A]' : ''}>✍️ SIGN</span>
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

              {/* WEEK 3 CONTENT */}
              {activeWeek === 3 && activeTab === 'learn' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-black text-gray-900 mb-2">Design & Product Categories</h3>
                  <p className="text-gray-600 mb-4">Learn about choosing colours, mixing pigments, and adding decorative elements like glitter or dried flowers.</p>
                  <ul className="list-disc pl-5 text-gray-600 space-y-2 font-medium">
                    <li>Jewellery (Earrings, Pendants)</li>
                    <li>Keychains & Bookmarks</li>
                    <li>Small Decor (Coasters, Frames)</li>
                  </ul>
                  <button onClick={() => setActiveTab('do')} className="w-full bg-[#0B1F3A] text-white py-4 rounded-xl font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-[#15325A]">
                    Continue to Homework ➔
                  </button>
                </div>
              )}

              {activeWeek === 3 && activeTab === 'do' && (
                <div className="space-y-6">
                  <h3 className="text-xl font-black text-gray-900 mb-4">📝 YOUR HOMEWORK ASSIGNMENT</h3>
                  <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                    <ul className="space-y-4 text-gray-700 font-medium">
                      <li className="flex gap-3"><span className="text-blue-500 font-black">1.</span> Record your chosen colours and pigments. Explain why.</li>
                      <li className="flex gap-3"><span className="text-blue-500 font-black">2.</span> Peer review 2 classmates' designs.</li>
                    </ul>
                  </div>
                  <button onClick={() => setActiveTab('check')} className="w-full bg-[#0B1F3A] text-white py-4 rounded-xl font-bold uppercase tracking-wider hover:bg-[#15325A]">
                    Proceed to Check ➔
                  </button>
                </div>
              )}

              {/* WEEK 4 CONTENT */}
              {activeWeek === 4 && activeTab === 'learn' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-black text-gray-900 mb-2">Mould-Making & Practice Mixing</h3>
                  <p className="text-gray-600 mb-4">How to make a simple silicone mould. We will practice mixing on scrap material to avoid bubbles before the real production day.</p>
                  <button onClick={() => setActiveTab('do')} className="w-full bg-[#0B1F3A] text-white py-4 rounded-xl font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-[#15325A]">
                    Continue to Homework ➔
                  </button>
                </div>
              )}

              {activeWeek === 4 && activeTab === 'do' && (
                <div className="space-y-6">
                  <h3 className="text-xl font-black text-gray-900 mb-4">📝 YOUR HOMEWORK ASSIGNMENT</h3>
                  <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                    <ul className="space-y-4 text-gray-700 font-medium">
                      <li className="flex gap-3"><span className="text-blue-500 font-black">1.</span> Upload a photo of "My Mould."</li>
                      <li className="flex gap-3"><span className="text-blue-500 font-black">2.</span> Log the estimated cost of practice materials.</li>
                    </ul>
                  </div>
                  <button onClick={() => setActiveTab('check')} className="w-full bg-[#0B1F3A] text-white py-4 rounded-xl font-bold uppercase tracking-wider hover:bg-[#15325A]">
                    Proceed to Check ➔
                  </button>
                </div>
              )}

              {/* WEEK 5 CONTENT */}
              {activeWeek === 5 && activeTab === 'learn' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-black text-gray-900 mb-2">Final Preparation</h3>
                  <p className="text-gray-600 mb-4">Reviewing design for feasibility. Distributing real materials for next week. Re-briefing all safety rules.</p>
                  <button onClick={() => setActiveTab('do')} className="w-full bg-[#0B1F3A] text-white py-4 rounded-xl font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-[#15325A]">
                    Continue to Homework ➔
                  </button>
                </div>
              )}

              {activeWeek === 5 && activeTab === 'do' && (
                <div className="space-y-6">
                  <h3 className="text-xl font-black text-gray-900 mb-4">📝 YOUR HOMEWORK ASSIGNMENT</h3>
                  <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                    <ul className="space-y-4 text-gray-700 font-medium">
                      <li className="flex gap-3"><span className="text-blue-500 font-black">1.</span> Design Sign-off. Confirm you are 100% ready for Production Day.</li>
                    </ul>
                  </div>
                  <button onClick={() => setActiveTab('check')} className="w-full bg-[#0B1F3A] text-white py-4 rounded-xl font-bold uppercase tracking-wider hover:bg-[#15325A]">
                    Proceed to Check ➔
                  </button>
                </div>
              )}

              {/* CHECK TAB (Shared) */}
              {activeTab === 'check' && (
                <div className="space-y-6">
                  <h3 className="text-xl font-black text-gray-900 mb-4">Review Your Work</h3>
                  <div className="bg-green-50 border border-green-200 p-6 rounded-xl">
                    <p className="text-green-800 font-medium">Please review your homework answers before asking for parent sign-off. Everything looks complete!</p>
                  </div>
                  <button onClick={() => setActiveTab('sign')} className="w-full bg-[#0B1F3A] text-white py-4 rounded-xl font-bold uppercase tracking-wider hover:bg-[#15325A]">
                    Proceed to Sign-off ➔
                  </button>
                </div>
              )}

              {/* SIGN TAB (Shared) */}
              {activeTab === 'sign' && (
                <div className="space-y-6">
                  <h3 className="text-xl font-black text-gray-900 mb-4">Parent Verification</h3>
                  <p className="text-gray-600 mb-6">Please hand this device to your parent or guardian to verify you have discussed today's lesson.</p>
                  
                  <button 
                    onClick={handleSign}
                    className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
                      signedWeeks[activeWeek] ? 'bg-green-100 text-green-700 border-2 border-green-500' : 'bg-gray-100 text-gray-500 hover:bg-gray-200 border-2 border-transparent'
                    }`}
                  >
                    {signedWeeks[activeWeek] ? (
                      <><CheckCircle2 className="w-5 h-5" /> Parent Sign-off Complete</>
                    ) : (
                      <><span className="text-lg">🖊️</span> TAP TO SIGN</>
                    )}
                  </button>

                  <button 
                    onClick={() => completeWeek(activeWeek)}
                    disabled={!signedWeeks[activeWeek]}
                    className={`w-full mt-6 py-4 rounded-xl font-bold uppercase tracking-wider transition-all ${
                      signedWeeks[activeWeek] ? 'bg-[#0B1F3A] text-white shadow-lg hover:-translate-y-1' : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    {activeWeek === 5 ? 'Unlock Phase 3 (Production)' : `Submit Homework & Unlock W${activeWeek + 1}`}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
