import React, { useState } from 'react';
import { ArrowLeft, PlayCircle, ClipboardList, CheckCircle, Edit3, Target, UploadCloud, AlertTriangle, PenTool, CheckCircle2, Lock, Shield, Beaker, FileCheck, HelpCircle } from 'lucide-react';
import { DiagonalBanner } from '../components/Layout';

export function KnowledgeScreen({ onNextPhase }: { onNextPhase?: () => void }) {
  const [activeWeek, setActiveWeek] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'learn' | 'do' | 'check' | 'sign'>('learn');
  const [completedWeeks, setCompletedWeeks] = useState<number[]>([]); 
  const [signedWeeks, setSignedWeeks] = useState<Record<number, boolean>>({});

  const completeWeek = (w: number) => {
    if (!completedWeeks.includes(w)) {
      setCompletedWeeks([...completedWeeks, w]);
    }
    if (w < 2) {
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
    { id: 1, title: 'W1: Orientation', fullTitle: 'Orientation - SDG Entrepreneurship' },
    { id: 2, title: 'W2: Safety', fullTitle: 'Safety & Hazard Control' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col pb-24 font-sans">
      <DiagonalBanner />
      <div className="relative z-10 max-w-3xl mx-auto w-full pt-16 px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-black text-white tracking-tight mb-2 uppercase">Phase 1</h1>
          <p className="text-blue-100 font-medium">Knowledge</p>
        </div>

        {/* Top Horizontal Week Toggles */}
        <div className="flex bg-white/20 p-1 rounded-xl mb-6 overflow-x-auto hide-scrollbar">
          {weeks.map((w) => {
            const isUnlocked = w.id === 1 || completedWeeks.includes(w.id - 1);
            const isCompleted = completedWeeks.includes(w.id);
            const isActive = activeWeek === w.id;

            return (
              <button
                key={w.id}
                onClick={() => isUnlocked && setActiveWeek(w.id)}
                className={`flex-1 min-w-[140px] py-3 px-2 text-sm font-bold rounded-lg transition-all flex flex-col items-center justify-center gap-1 ${
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
              
              {/* WEEK 1 CONTENT */}
              {activeWeek === 1 && activeTab === 'learn' && (
                <div className="space-y-6">
                  <div className="aspect-video bg-gray-900 rounded-xl relative overflow-hidden flex items-center justify-center group cursor-pointer border-4 border-gray-100 shadow-lg">
                    <img src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1200" alt="Resin Crafting" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity" />
                    <PlayCircle className="w-16 h-16 text-white relative z-10 group-hover:scale-110 transition-transform drop-shadow-lg" />
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <span className="bg-blue-600 font-bold px-3 py-1 rounded text-xs uppercase tracking-wider">Video Lesson</span>
                      <h3 className="font-bold text-lg mt-2 leading-tight drop-shadow-md">What is an SDG Entrepreneur?</h3>
                    </div>
                  </div>

                  <div>
                    <ul className="space-y-3 text-gray-700 font-medium bg-gray-50 p-6 rounded-xl border border-gray-100">
                      <li><strong>What is an SDG Entrepreneur?</strong><br/>Ordinary Entrepreneur = Makes Money.<br/>SDG Entrepreneur = Makes Money + Protects the Planet (SDG 12) + Helps People (SDG 8).</li>
                      <li><strong>Introduction to Resin Craft:</strong><br/>What is resin? A magical liquid that turns into hard, beautiful plastic when cured.</li>
                    </ul>
                    <div className="mt-4 bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
                      <h4 className="font-bold text-blue-900 mb-1 flex items-center gap-2">🎯 The Venn Diagram of Success</h4>
                      <p className="text-sm text-blue-800">When Profit, Planet, and People overlap, that's where YOU stand as an SDG Entrepreneur.</p>
                    </div>
                  </div>

                  <button onClick={() => setActiveTab('do')} className="w-full bg-[#0B1F3A] text-white py-4 rounded-xl font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-[#15325A]">
                    Continue to Homework ➔
                  </button>
                </div>
              )}

              {activeWeek === 1 && activeTab === 'do' && (
                <div className="space-y-6">
                  <h3 className="text-xl font-black text-gray-900 mb-4">📝 YOUR HOMEWORK ASSIGNMENT</h3>
                  <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                    <ul className="space-y-4 text-gray-700 font-medium">
                      <li className="flex gap-3"><span className="text-blue-500 font-black">1.</span> Introduce yourself in the forum.</li>
                      <li className="flex gap-3"><span className="text-blue-500 font-black">2.</span> Write down which SDG you care about most.</li>
                    </ul>
                  </div>
                  <button onClick={() => setActiveTab('check')} className="w-full bg-[#0B1F3A] text-white py-4 rounded-xl font-bold uppercase tracking-wider hover:bg-[#15325A]">
                    Proceed to Check ➔
                  </button>
                </div>
              )}

              {/* WEEK 2 CONTENT */}
              {activeWeek === 2 && activeTab === 'learn' && (
                <div className="space-y-6">
                  <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden flex divide-x divide-gray-800 shadow-md">
                    <div className="flex-1 bg-red-900/20 p-4 flex flex-col justify-end relative">
                      <div className="absolute inset-0 flex items-center justify-center opacity-30 text-5xl">❌</div>
                      <span className="text-white font-bold bg-black/50 p-1 px-2 rounded self-start text-xs uppercase tracking-wider relative z-10">Messy Workspace</span>
                    </div>
                    <div className="flex-1 bg-green-900/20 p-4 flex flex-col justify-end relative">
                      <div className="absolute inset-0 flex items-center justify-center opacity-30 text-5xl">✅</div>
                      <span className="text-white font-bold bg-black/50 p-1 px-2 rounded self-start text-xs uppercase tracking-wider relative z-10">Clean Workspace</span>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-black text-gray-900 mb-2">Safety is #1. Waste is #2.</h3>
                    <p className="text-gray-600 mb-4">Resin is a chemical. You must wear Personal Protective Equipment (PPE) including Gloves, Mask, and Goggles at all times.</p>
                    
                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
                      <h4 className="font-bold text-yellow-800 mb-1 flex items-center gap-2">💰 Resin is Money. Bubbles are Lost Profit.</h4>
                      <p className="text-sm text-yellow-700">We mix slowly to avoid bubbles. We pour carefully. This is SDG 12 in Action!</p>
                    </div>
                  </div>
                  <button onClick={() => setActiveTab('do')} className="w-full bg-[#0B1F3A] text-white py-4 rounded-xl font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-[#15325A]">
                    Continue to Homework ➔
                  </button>
                </div>
              )}

              {activeWeek === 2 && activeTab === 'do' && (
                <div className="space-y-6">
                  <h3 className="text-xl font-black text-gray-900 mb-4">📝 YOUR HOMEWORK ASSIGNMENT</h3>
                  <div className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 flex gap-4 items-start">
                      <Shield className="w-6 h-6 text-blue-500 shrink-0" />
                      <div>
                        <h4 className="font-bold text-gray-900">1. Personal Safety Checklist</h4>
                        <p className="text-sm text-gray-600">Complete your checklist verifying you have all PPE ready.</p>
                      </div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 flex gap-4 items-start">
                      <Target className="w-6 h-6 text-red-500 shrink-0" />
                      <div>
                        <h4 className="font-bold text-gray-900">2. Hazard Hunt</h4>
                        <p className="text-sm text-gray-600">Identify 3 hazards in the messy workspace.</p>
                      </div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 flex gap-4 items-start">
                      <Beaker className="w-6 h-6 text-green-500 shrink-0" />
                      <div>
                        <h4 className="font-bold text-gray-900">3. Upcycle Plan</h4>
                        <p className="text-sm text-gray-600">What will you do with leftover offcuts?</p>
                      </div>
                    </div>
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
                  <p className="text-gray-600 mb-6">Please hand this device to your parent or guardian to verify you have discussed today's lesson and completed the required assignments.</p>
                  
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
                    {activeWeek === 2 ? 'Unlock Phase 2 (Preparation)' : `Submit Homework & Unlock W${activeWeek + 1}`}
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
