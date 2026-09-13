import React, { useState } from 'react';
import { PlayCircle, Shield, Target, Beaker, CheckCircle2 } from 'lucide-react';
import { DiagonalBanner } from '../components/Layout';

export function KnowledgeScreen({ onNextPhase }: { onNextPhase?: () => void }) {
  const [activeWeek, setActiveWeek] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'learn' | 'do' | 'check' | 'sign'>('learn');

  const weeks = [
    { id: 1, title: 'W1: Orientation', fullTitle: 'Orientation: SDG Entrepreneurship in Resin Craft' },
    { id: 2, title: 'W2: Safety', fullTitle: 'Safety & Hazard Control: Resin Safety in Practice' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col pb-24 font-sans">
      <DiagonalBanner />
      <div className="relative z-10 max-w-3xl mx-auto w-full pt-16 px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-black text-white tracking-tight mb-2 uppercase">Phase 1</h1>
          <p className="text-blue-100 font-medium">Knowledge — SDG Entrepreneurship in Resin Craft</p>
        </div>

        {/* UNLOCKED: Top Horizontal Week Toggles */}
        <div className="flex bg-white/20 p-1 rounded-xl mb-6 overflow-x-auto hide-scrollbar">
          {weeks.map((w) => {
            const isActive = activeWeek === w.id;
            return (
              <button
                key={w.id}
                onClick={() => { setActiveWeek(w.id); setActiveTab('learn'); }}
                className={`flex-1 min-w-[140px] py-3 px-2 text-sm font-bold rounded-lg transition-all flex flex-col items-center justify-center gap-1 ${
                  isActive
                    ? 'bg-white text-[#0B1F3A] shadow-md scale-100'
                    : 'bg-transparent text-white hover:bg-white/10'
                }`}
              >
                <span>{w.title}</span>
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
                      <h3 className="font-bold text-lg mt-2 leading-tight drop-shadow-md">Welcome, Shadow Entrepreneur!</h3>
                    </div>
                  </div>

                  <div>
                    <ul className="space-y-3 text-gray-700 font-medium bg-gray-50 p-6 rounded-xl border border-gray-100">
                      <li><strong>Welcome, Shadow Entrepreneur!</strong><br/>Did you know making a bead can change the world?</li>
                      <li><strong>What is an SDG Entrepreneur?</strong><br/>Ordinary Entrepreneur = Makes Money.<br/>SDG Entrepreneur = Makes Money + Protects the Planet (SDG 12) + Helps People (SDG 8).</li>
                      <li><strong>Introduction to Resin Craft:</strong><br/>What resin is, how it cures from liquid to hard plastic.</li>
                      <li><strong>What can we make?</strong><br/>Beads (our focus), plus jewellery, keychains, bookmarks, decorative art.</li>
                    </ul>
                    <div className="mt-4 bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
                      <h4 className="font-bold text-blue-900 mb-1 flex items-center gap-2">🎯 The Venn Diagram of Success</h4>
                      <p className="text-sm text-blue-800">Profit, Planet, People — where YOU stand as an SDG Entrepreneur.</p>
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
                      <li className="flex gap-3"><span className="text-blue-500 font-black">1.</span> <strong>Icebreaker:</strong> "What would I like to create and sell?"</li>
                      <li className="flex gap-3"><span className="text-blue-500 font-black">2.</span> <strong>Research:</strong> 3 resin/bead businesses or artisans — record their products and prices.</li>
                      <li className="flex gap-3"><span className="text-blue-500 font-black">3.</span> <strong>Guess Business Plan:</strong> what I'll make, who buys it, what I expect to earn, how I'll make impact.</li>
                    </ul>
                  </div>
                  <button onClick={() => setActiveTab('check')} className="w-full bg-[#0B1F3A] text-white py-4 rounded-xl font-bold uppercase tracking-wider hover:bg-[#15325A]">
                    Proceed to Check ➔
                  </button>
                </div>
              )}

              {activeWeek === 1 && activeTab === 'check' && (
                <div className="space-y-6">
                  <h3 className="text-xl font-black text-gray-900 mb-4">Self-quiz</h3>
                  <div className="bg-green-50 border border-green-200 p-6 rounded-xl">
                    <p className="text-green-800 font-medium">Can you state, in your own words, the difference between an ordinary entrepreneur and an SDG entrepreneur?</p>
                  </div>
                  <button onClick={() => setActiveTab('sign')} className="w-full bg-[#0B1F3A] text-white py-4 rounded-xl font-bold uppercase tracking-wider hover:bg-[#15325A]">
                    Proceed to Sign-off ➔
                  </button>
                </div>
              )}

              {activeWeek === 1 && activeTab === 'sign' && (
                <div className="space-y-6">
                  <h3 className="text-xl font-black text-gray-900 mb-4">Parent Verification</h3>
                  <p className="text-gray-600 mb-6">Discussed with parent, parent initials.</p>
                  
                  <button className="w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all bg-green-100 text-green-700 border-2 border-green-500">
                    <CheckCircle2 className="w-5 h-5" /> Parent Sign-off Complete
                  </button>

                  <button 
                    onClick={() => { setActiveWeek(2); setActiveTab('learn'); }}
                    className="w-full mt-6 py-4 rounded-xl font-bold uppercase tracking-wider transition-all bg-[#0B1F3A] text-white shadow-lg hover:-translate-y-1"
                  >
                    Proceed to W2
                  </button>
                </div>
              )}

              {/* WEEK 2 CONTENT */}
              {activeWeek === 2 && activeTab === 'learn' && (
                <div className="space-y-6">
                  <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 text-gray-700 font-medium space-y-4">
                    <p>Before you touch resin, you need to understand what it actually is.</p>
                    <p>Resin starts as a liquid — but not a harmless one. While it's uncured, it can irritate your skin and give off fumes. Once it's mixed and cured, it is completely safe. The product you wear afterward has none of these risks. That's why we prepare properly before we start.</p>
                    <p>Ensure you have your protection materials: gloves, a mask, an apron, and a covering mat — resin can be really sticky. Open a window for ventilation.</p>
                  </div>

                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-r-lg space-y-4">
                    <h4 className="font-bold text-yellow-800 text-lg flex items-center gap-2">💰 The Money Lesson: Why Bubbles Are Lost Profit</h4>
                    <p className="text-yellow-900">What actually happens when you stir resin too fast, or stir it back and forth instead of in one steady direction? You create tiny pockets of air in the liquid. These air pockets don't disappear — they get trapped. When the resin cures, they're frozen inside your product. Your bead looks cloudy and cheap instead of clear and glassy, and anyone looking at it can see the difference instantly against a bead someone took the time to mix properly.</p>
                    <p className="text-yellow-900">A bubble doesn't just ruin the look. It used the exact amount of resin you paid for — and it gives you a product that may be priced lower than the one made carefully.</p>
                    
                    <div>
                      <p className="font-bold text-yellow-900 mb-2">The fix is simple:</p>
                      <ul className="list-decimal pl-5 space-y-2 text-yellow-900">
                        <li>Stir slowly, in one direction, for the full time your instructor tells you.</li>
                        <li>After mixing, let the resin sit for the time your instructor guides you to, so trapped air can rise and escape.</li>
                        <li>Pour slowly, close to the mould — not from high up.</li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg space-y-4">
                    <h4 className="font-bold text-blue-900 text-lg">Waste, the right way:</h4>
                    <p className="text-blue-900">Cured resin scraps are inert — they don't need special handling. But cured resin also can't simply be thrown away as ordinary waste, because it can be reused. Cured resin cannot be melted down and re-poured like plastic — once it cures, it stays that way permanently. But it CAN be broken or crushed into small chips, and those chips can be embedded into a brand new resin pour — the same way glitter or dried flowers are added for decoration. Your leftover cured resin from one piece can become the decorative chips inside a completely different new piece — a frame, a coaster, another bead.</p>
                    <p className="text-blue-900 font-bold">So: cured offcuts are never thrown in the bin. They are gathered and handed to whoever is running that week's waste-to-art activity, to be crushed and reused as decoration in someone else's piece.</p>
                    <p className="text-blue-900">Liquid resin that's still wet never goes down a drain or in a bin as-is. Wipe tools clean with paper towel first, let any leftover wet resin cure fully on a scrap surface, then dispose of it once it's hardened — at which point it becomes the same reusable cured material described above.</p>
                  </div>

                  <div className="bg-[#0B1F3A] text-white p-6 rounded-xl font-bold text-center">
                    This is Safety #1, Waste #2 — you handle yourself safely first, and you handle the material responsibly second.
                  </div>

                  <button onClick={() => setActiveTab('do')} className="w-full bg-[#0B1F3A] text-white py-4 rounded-xl font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-[#15325A]">
                    Continue to Homework ➔
                  </button>
                </div>
              )}

              {activeWeek === 2 && activeTab === 'do' && (
                <div className="space-y-6">
                  <h3 className="text-xl font-black text-gray-900 mb-4">📝 YOUR HOMEWORK ASSIGNMENT</h3>
                  <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                    <ul className="space-y-4 text-gray-700 font-medium">
                      <li className="flex gap-3"><span className="text-blue-500 font-black">1.</span> Complete your Personal Safety Checklist (gloves, mask, apron, mat, ventilation confirmed).</li>
                      <li className="flex gap-3"><span className="text-blue-500 font-black">2.</span> Hazard Hunt — tap the 3 hazards in a sample messy workspace image.</li>
                      <li className="flex gap-3"><span className="text-blue-500 font-black">3.</span> Upcycle Plan — write what you'll do with your leftover cured resin: name one thing you could make by crushing it and embedding it into a new piece.</li>
                    </ul>
                  </div>
                  <button onClick={() => setActiveTab('check')} className="w-full bg-[#0B1F3A] text-white py-4 rounded-xl font-bold uppercase tracking-wider hover:bg-[#15325A]">
                    Proceed to Check ➔
                  </button>
                </div>
              )}

              {activeWeek === 2 && activeTab === 'check' && (
                <div className="space-y-6">
                  <h3 className="text-xl font-black text-gray-900 mb-4">Review Your Work</h3>
                  <div className="bg-green-50 border border-green-200 p-6 rounded-xl">
                    <p className="text-green-800 font-medium">Before continuing: can you name your 3 pieces of protection, and explain in your own words why a bubble in a bead is lost money, not just a mistake?</p>
                  </div>
                  <button onClick={() => setActiveTab('sign')} className="w-full bg-[#0B1F3A] text-white py-4 rounded-xl font-bold uppercase tracking-wider hover:bg-[#15325A]">
                    Proceed to Sign-off ➔
                  </button>
                </div>
              )}

              {activeWeek === 2 && activeTab === 'sign' && (
                <div className="space-y-6">
                  <h3 className="text-xl font-black text-gray-900 mb-4">Parent Verification</h3>
                  <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                    <p className="text-gray-700 font-medium italic">Parent discussion prompt: "Ask your child what protective gear they'll wear, why resin needs care while it's being worked with, and what they plan to do with their leftover resin scraps instead of throwing them away."</p>
                  </div>
                  
                  <button className="w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all bg-green-100 text-green-700 border-2 border-green-500">
                    <CheckCircle2 className="w-5 h-5" /> Parent Sign-off Complete
                  </button>

                  <button 
                    onClick={() => { if(onNextPhase) onNextPhase() }}
                    className="w-full mt-6 py-4 rounded-xl font-bold uppercase tracking-wider transition-all bg-[#0B1F3A] text-white shadow-lg hover:-translate-y-1"
                  >
                    Unlock Phase 2 (Preparation)
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
