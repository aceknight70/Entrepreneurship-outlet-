import React, { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { DiagonalBanner } from '../components/Layout';
import { PlaceholderImage } from '../components/PlaceholderImage';

export function PreparationScreen({ onNextPhase }: { onNextPhase?: () => void }) {
  const [activeWeek, setActiveWeek] = useState<number>(3);
  const [activeTab, setActiveTab] = useState<'learn' | 'do' | 'check' | 'sign'>('learn');

  const weeks = [
    { id: 3, title: 'W3: Design', fullTitle: 'Design & Categories: Choosing My Bead Design' },
    { id: 4, title: 'W4: Moulds', fullTitle: 'Using & Caring for Your Mould — Practice' },
    { id: 5, title: 'W5: Prep', fullTitle: 'Final Preparation — Ready for Production Day' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col pb-24 font-sans">
      <DiagonalBanner />
      <div className="relative z-10 max-w-3xl mx-auto w-full pt-16 px-4 flex-1">
        <div className="mb-6">
          <h1 className="text-4xl font-black text-white tracking-tight mb-2 uppercase">Phase 2</h1>
          <p className="text-blue-100 font-medium">Preparation — SDG Entrepreneurship in Resin Craft</p>
        </div>

        {/* UNLOCKED: Top Horizontal Week Toggles */}
        <div className="flex bg-white/20 p-1 rounded-xl mb-6 overflow-x-auto hide-scrollbar">
          {weeks.map((w) => {
            const isActive = activeWeek === w.id;
            return (
              <button
                key={w.id}
                onClick={() => { setActiveWeek(w.id); setActiveTab('learn'); }}
                className={`flex-1 min-w-[90px] py-3 px-2 text-sm font-bold rounded-lg transition-all flex flex-col items-center justify-center gap-1 ${
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

              {/* WEEK 3 CONTENT */}
              {activeWeek === 3 && activeTab === 'learn' && (
                <div className="space-y-6">
                  <PlaceholderImage src="https://images.unsplash.com/photo-1618423771880-2bcfa4b6f10c?auto=format&fit=crop&w=800" alt="Swirl vs Blend Examples" label="Example: Swirl & Marble Effects" className="h-48 w-full" />
                  <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 text-gray-700 font-medium space-y-4">
                    <p className="font-bold text-gray-900 text-lg">Before you mix anything, you make your first real business decision: what will this piece actually look like?</p>
                    
                    <div>
                      <h4 className="font-bold text-blue-900 mb-2">Colour and pigment: how it actually works</h4>
                      <p>Mica powder is a fine pigment. When you stir it into liquid resin, it spreads through the whole mixture and changes how the light passes through it. A small amount of powder gives you a light, see-through tint — More powder makes it fully opaque — Follow your instructor guide carefully on how to mix it and the look you should aim for.</p>
                      <br/>
                      <p>Mixing two or more colours partway — a few gentle stirs, not full blending — you get a swirl or marble effect, with streaks of both colours visible. Fully mixing gets you one single blended shade. Follow your instructor's guide on what to do.</p>
                    </div>
                  </div>

                  <div className="bg-purple-50 border-l-4 border-purple-500 p-6 rounded-r-lg space-y-4">
                    <h4 className="font-bold text-purple-900 text-lg">Glitter and decoration: mixed in vs. layered</h4>
                    <p className="text-purple-900">Glitter or small decorative pieces can be added in two ways. Stir them into the resin before pouring. Or, pour your resin in two thin layers instead of one, adding the glitter or decorative pieces only between the first and second layer. Follow your instructor's guide.</p>
                  </div>

                  <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg space-y-4">
                    <h4 className="font-bold text-blue-900 text-lg">Choosing your product category</h4>
                    <p className="text-blue-900">Today you also choose what shape you're making — Earring, Keyholder, Pendant, beads, or small decorative pieces — your colour choice, your mixing technique, and your shape all work together to create one finished look.</p>
                  </div>

                  <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg space-y-4">
                    <h4 className="font-bold text-green-900 text-lg">Why this counts as innovation (SDG 9)</h4>
                    <p className="text-green-900">Design isn't decoration — it's the point where you take a basic material everyone has access to and make a decision that makes YOUR piece different from anyone else's.</p>
                  </div>

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
                      <li className="flex gap-3"><span className="text-blue-500 font-black">1.</span> Record your chosen colours and technique (full blend or swirl).</li>
                      <li className="flex gap-3"><span className="text-blue-500 font-black">2.</span> Confirm your product category/shape for mould.</li>
                      <li className="flex gap-3"><span className="text-blue-500 font-black">3.</span> Peer review: look at 2 classmates' design choices. For each, write one thing you like about it, and one thing you'd suggest they try.</li>
                    </ul>
                  </div>
                  <button onClick={() => setActiveTab('check')} className="w-full bg-[#0B1F3A] text-white py-4 rounded-xl font-bold uppercase tracking-wider hover:bg-[#15325A]">
                    Proceed to Check ➔
                  </button>
                </div>
              )}

              {activeWeek === 3 && activeTab === 'check' && (
                <div className="space-y-6">
                  <h3 className="text-xl font-black text-gray-900 mb-4">Review Your Work</h3>
                  <div className="bg-green-50 border border-green-200 p-6 rounded-xl">
                    <p className="text-green-800 font-medium">Before continuing: can you explain the difference between fully mixing two colours and only partly stirring them for a swirl effect? Can you explain why glitter added between two layers looks different from glitter stirred all the way through?</p>
                  </div>
                  <button onClick={() => setActiveTab('sign')} className="w-full bg-[#0B1F3A] text-white py-4 rounded-xl font-bold uppercase tracking-wider hover:bg-[#15325A]">
                    Proceed to Sign-off ➔
                  </button>
                </div>
              )}

              {activeWeek === 3 && activeTab === 'sign' && (
                <div className="space-y-6">
                  <h3 className="text-xl font-black text-gray-900 mb-4">Parent Verification</h3>
                  <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                    <p className="text-gray-700 font-medium italic">Parent discussion prompt: "Ask your child what colours and design they chose, and why they think it will look attractive to a buyer."</p>
                  </div>
                  <button className="w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all bg-green-100 text-green-700 border-2 border-green-500">
                    <CheckCircle2 className="w-5 h-5" /> Parent Sign-off Complete
                  </button>
                  <button onClick={() => { setActiveWeek(4); setActiveTab('learn'); }} className="w-full mt-6 py-4 rounded-xl font-bold uppercase tracking-wider transition-all bg-[#0B1F3A] text-white shadow-lg hover:-translate-y-1">
                    Proceed to W4
                  </button>
                </div>
              )}

              {/* WEEK 4 CONTENT */}
              {activeWeek === 4 && activeTab === 'learn' && (
                <div className="space-y-6">
                  <PlaceholderImage src="https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?auto=format&fit=crop&w=800" alt="Properly used silicone mould" label="Example: Clean Silicone Mould & Finished Piece" className="h-48 w-full" />
                  <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 text-gray-700 font-medium space-y-4">
                    <p className="font-bold text-gray-900 text-lg">Today you learn how to properly use and care for your mould, so it lasts and gives you clean results every time.</p>
                    
                    <div>
                      <h4 className="font-bold text-blue-900 mb-2">What a mould actually does</h4>
                      <p>A mould is the reverse shape of whatever you want to create. Pour liquid resin into it, let it cure, and it comes out solid in that exact shape. Your kit comes with a ready-made silicone mould — your job today is to learn how to use it properly.</p>
                    </div>
                    
                    <div>
                      <h4 className="font-bold text-blue-900 mb-2">Using your mould correctly</h4>
                      <p>Keep your mould flat and level while the resin cures — if it tilts, the resin pools unevenly and your piece won't be the shape you wanted. Once your piece has fully cured, release it gently by flexing the silicone mould from the outside — never pry it out with a hard tool, which can tear the mould. Clean your mould between uses so old residue doesn't affect your next piece. Follow your instructor's guide on the full process.</p>
                    </div>
                    
                    <div>
                      <h4 className="font-bold text-blue-900 mb-2">Practicing your technique</h4>
                      <p>Before you use your kit materials for a real piece, you'll practice your mixing and pouring technique. This is where the money lesson from Week 2 matters most: every bubble or mistake you catch now, in practice, is one you won't make when it counts. Follow your instructor's guide on how practice is run.</p>
                    </div>
                    
                    <div>
                      <h4 className="font-bold text-blue-900 mb-2">Your mould is yours to keep</h4>
                      <p>Unlike the resin and pigment you use up as you go, your mould doesn't get used up — you keep it, and you can use it again and again for future pieces and future orders.</p>
                    </div>
                  </div>
                  


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
                      <li className="flex gap-3"><span className="text-blue-500 font-black">1.</span> Upload a photo: "My Mould" — with a note on what you could make with it for future orders.</li>
                      <li className="flex gap-3"><span className="text-blue-500 font-black">2.</span> Log your practice: materials used and estimated cost.</li>
                      <li className="flex gap-3"><span className="text-blue-500 font-black">3.</span> Note: did you get any bubbles during practice? What will you change before Production Day?</li>
                    </ul>
                  </div>
                  <button onClick={() => setActiveTab('check')} className="w-full bg-[#0B1F3A] text-white py-4 rounded-xl font-bold uppercase tracking-wider hover:bg-[#15325A]">
                    Proceed to Check ➔
                  </button>
                </div>
              )}

              {activeWeek === 4 && activeTab === 'check' && (
                <div className="space-y-6">
                  <h3 className="text-xl font-black text-gray-900 mb-4">Review Your Work</h3>
                  <div className="bg-green-50 border border-green-200 p-6 rounded-xl">
                    <p className="text-green-800 font-medium">Before continuing: can you explain how to safely release a finished piece from your mould without damaging it? Can you explain why we practice technique before using our real kit materials?</p>
                  </div>
                  <button onClick={() => setActiveTab('sign')} className="w-full bg-[#0B1F3A] text-white py-4 rounded-xl font-bold uppercase tracking-wider hover:bg-[#15325A]">
                    Proceed to Sign-off ➔
                  </button>
                </div>
              )}

              {activeWeek === 4 && activeTab === 'sign' && (
                <div className="space-y-6">
                  <h3 className="text-xl font-black text-gray-900 mb-4">Parent Verification</h3>
                  <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                    <p className="text-gray-700 font-medium italic">Parent discussion prompt: "Ask your child to show you their mould, and explain what they learned about caring for it and practicing before Production Day."</p>
                  </div>
                  <button className="w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all bg-green-100 text-green-700 border-2 border-green-500">
                    <CheckCircle2 className="w-5 h-5" /> Parent Sign-off Complete
                  </button>
                  <button onClick={() => { setActiveWeek(5); setActiveTab('learn'); }} className="w-full mt-6 py-4 rounded-xl font-bold uppercase tracking-wider transition-all bg-[#0B1F3A] text-white shadow-lg hover:-translate-y-1">
                    Proceed to W5
                  </button>
                </div>
              )}

              {/* WEEK 5 CONTENT */}
              {activeWeek === 5 && activeTab === 'learn' && (
                <div className="space-y-6">
                  <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 text-gray-700 font-medium space-y-4">
                    <p className="font-bold text-gray-900 text-lg">This is your last stop before Production Day — the day your real materials become your real piece.</p>
                    
                    <div>
                      <h4 className="font-bold text-blue-900 mb-2">Reviewing your design one more time</h4>
                      <p>The colours and design you chose in Week 3 need one final check. What looked right on paper doesn't always work exactly the same in real resin — your instructor will help you confirm your plan is realistic before anything is mixed for real.</p>
                    </div>

                    <div>
                      <h4 className="font-bold text-blue-900 mb-2">Materials distribution</h4>
                      <p>Today, your real kit materials are handed out — not scrap, the actual resin and hardener meant for your finished piece. From this point, your materials are fixed. This is why the practice you did in Week 4 mattered: real materials are counted and shared out for exactly what you need, not for retrying if something goes wrong.</p>
                    </div>

                    <div>
                      <h4 className="font-bold text-blue-900 mb-2">One more safety check</h4>
                      <p>Before Production Day, we briefly go back over the safety rules from Week 2. This isn't because you forgot — it's because Production Day is when the stakes are real, and a quick reminder right before you start is what actually sticks.</p>
                    </div>

                    <div>
                      <h4 className="font-bold text-blue-900 mb-2">Confirming you're ready</h4>
                      <p>Just like a real business owner does one last check before opening day, you'll confirm you're ready before Production Day begins.</p>
                    </div>
                  </div>

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
                      <li className="flex gap-3"><span className="text-blue-500 font-black">1.</span> Design sign-off — confirm your final design as it will actually be made.</li>
                      <li className="flex gap-3"><span className="text-blue-500 font-black">2.</span> Readiness confirmation — write: "I am ready for Production Day."</li>
                    </ul>
                  </div>
                  <button onClick={() => setActiveTab('check')} className="w-full bg-[#0B1F3A] text-white py-4 rounded-xl font-bold uppercase tracking-wider hover:bg-[#15325A]">
                    Proceed to Check ➔
                  </button>
                </div>
              )}

              {activeWeek === 5 && activeTab === 'check' && (
                <div className="space-y-6">
                  <h3 className="text-xl font-black text-gray-900 mb-4">Review Your Work</h3>
                  <div className="bg-green-50 border border-green-200 p-6 rounded-xl">
                    <p className="text-green-800 font-medium">Before continuing: can you state your exact plan for Production Day — what you're making, and in what order? Can you repeat your top safety reminder from Week 2?</p>
                  </div>
                  <button onClick={() => setActiveTab('sign')} className="w-full bg-[#0B1F3A] text-white py-4 rounded-xl font-bold uppercase tracking-wider hover:bg-[#15325A]">
                    Proceed to Sign-off ➔
                  </button>
                </div>
              )}

              {activeWeek === 5 && activeTab === 'sign' && (
                <div className="space-y-6">
                  <h3 className="text-xl font-black text-gray-900 mb-4">Parent Verification</h3>
                  <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                    <p className="text-gray-700 font-medium italic">Parent discussion prompt: "Ask your child to explain their plan for Production Day, and what they'll do if something goes wrong, like a bubble forming."</p>
                  </div>
                  <button className="w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all bg-green-100 text-green-700 border-2 border-green-500">
                    <CheckCircle2 className="w-5 h-5" /> Parent Sign-off Complete
                  </button>
                  <button onClick={() => { if(onNextPhase) onNextPhase() }} className="w-full mt-6 py-4 rounded-xl font-bold uppercase tracking-wider transition-all bg-[#0B1F3A] text-white shadow-lg hover:-translate-y-1">
                    Unlock Phase 3 (Production)
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
