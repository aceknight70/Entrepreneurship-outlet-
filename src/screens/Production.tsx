import React, { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { DiagonalBanner } from '../components/Layout';
import { PlaceholderImage } from '../components/PlaceholderImage';

export function ProductionScreen({ onNextPhase }: { onNextPhase?: () => void }) {
  const [activeWeek, setActiveWeek] = useState<number>(6);
  const [activeTab, setActiveTab] = useState<'learn' | 'do' | 'check' | 'sign'>('learn');

  const weeks = [
    { id: 6, title: 'W6: Production', fullTitle: 'Production Day — Zero-Waste' },
    { id: 7, title: 'W7: QC', fullTitle: 'Finishing, Quality Control & Residue' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col pb-24 font-sans">
      <DiagonalBanner />
      <div className="relative z-10 max-w-3xl mx-auto w-full pt-16 px-4 flex-1">
        <div className="mb-6">
          <h1 className="text-4xl font-black text-white tracking-tight mb-2 uppercase">Phase 3</h1>
          <p className="text-blue-100 font-medium">Production — My Resin Bead Business</p>
        </div>

        {/* UNLOCKED: Top Horizontal Week Toggles */}
        <div className="flex bg-white/20 p-1 rounded-xl mb-6 overflow-x-auto hide-scrollbar">
          {weeks.map((w) => {
            const isActive = activeWeek === w.id;
            return (
              <button
                key={w.id}
                onClick={() => { setActiveWeek(w.id); setActiveTab('learn'); }}
                className={`flex-1 min-w-[120px] py-3 px-2 text-sm font-bold rounded-lg transition-all flex flex-col items-center justify-center gap-1 ${
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

              {/* WEEK 6 CONTENT */}
              {activeWeek === 6 && activeTab === 'learn' && (
                <div className="space-y-6">
                  <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 text-gray-700 font-medium space-y-4">
                    <p className="font-bold text-gray-900 text-lg">This is it — real materials, real pieces. No more practice viewing Runs </p>

                    <div>
                      <h4 className="font-bold text-blue-900 mb-2">The Syringe Method: why exact measurement matters</h4>
                      <p>Before you mix, you'll measure your resin using a syringe rather than just pouring by eye. Here's why this matters, beyond just neatness: if you don't know exactly how much resin went into your piece, you can never really know what it cost you to make. A syringe gives you an exact number — say, 2ml of resin for one bead — and that exact number is what makes it possible to work out your true cost per piece later, instead of guessing.</p>
                      <br/>
                      <p> Follow your instructor's guide on the exact measurement for your piece.</p>
                    </div>

                    <div>
                      <h4 className="font-bold text-blue-900 mb-2">Mixing and pouring — put the practice to work</h4>
                      <p>Everything you practiced in Week 4 matters now: stir slowly in one direction, let the resin sit briefly so trapped air can rise out, then pour close to the mould rather than from above. This time, it isn't practice — this is the piece.</p>
                    </div>

                    <div>
                      <h4 className="font-bold text-blue-900 mb-2">Curing</h4>
                      <p>Once poured, your piece needs time to cure — the liquid resin undergoes a chemical change that turns it solid. During this time, it must stay completely still and undisturbed. Moving or tilting it while it's curing can ruin the shape. Follow your instructor's guide on how long curing takes.</p>
                    </div>

                    <div>
                      <h4 className="font-bold text-blue-900 mb-2">Zero-waste in practice</h4>
                      <p>Pour exactly what your measurement calls for — not more "just in case." Every bit of resin poured beyond what your piece needs is resin wasted, which is exactly the SDG 12 lesson from Week 2 wants  you to understand, now happening for real.</p>
                    </div>
                  </div>

                  <button onClick={() => setActiveTab('do')} className="w-full bg-[#0B1F3A] text-white py-4 rounded-xl font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-[#15325A]">
                    Continue to Homework ➔
                  </button>
                </div>
              )}

              {activeWeek === 6 && activeTab === 'do' && (
                <div className="space-y-6">
                  <h3 className="text-xl font-black text-gray-900 mb-4">📝 YOUR HOMEWORK ASSIGNMENT</h3>
                  <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                    <ul className="space-y-4 text-gray-700 font-medium">
                      <li className="flex gap-3"><span className="text-blue-500 font-black">1.</span> Fill out your Production Log: materials used, the exact amount measured, cost, and ap photo of your poured piece.</li>
                      <li className="flex gap-3"><span className="text-blue-500 font-black">2.</span> Bubble Control check: confirm you stirred slowly and deliberately.</li>
                      <li className="flex gap-3"><span className="text-blue-500 font-black">3.</span> Precision Pouring check: confirm every drop entered the mould with zero spillage.</li>
                      <li className="flex gap-3"><span className="text-blue-500 font-black">4.</span> <div>Efficiency Reflection: did you have any spills or bubbles? If yes,p what will you do differently next time?<br/>P</div></li>
                    </ul>
                  </div>
                  <button onClick={() => setActiveTab('check')} className="w-full bg-[#0B1F3A] text-white py-4 rounded-xl font-bold uppercase tracking-wider hover:bg-[#15325A]">
                    Proceed to Check ➔
                  </button>
                </div>
              )}

              {activeWeek === 6 && activeTab === 'check' && (
                <div className="space-y-6">
                  <h3 className="text-xl font-black text-gray-900 mb-4">Review Your Work</h3>
                  <div className="bg-green-50 border border-green-200 p-6 rounded-xl">
                    <p className="text-green-800 font-medium">Before continuing: can you explain, in your own words, why measuring your resin with a syringe — instead of guessing — matters for pricing your piece later?</p>
                  </div>
                  <button onClick={() => setActiveTab('sign')} className="w-full bg-[#0B1F3A] text-white py-4 rounded-xl font-bold uppercase tracking-wider hover:bg-[#15325A]">
                    Proceed to Sign-off ➔
                  </button>
                </div>
              )}

              {activeWeek === 6 && activeTab === 'sign' && (
                <div className="space-y-6">
                  <h3 className="text-xl font-black text-gray-900 mb-4">Parent Verification</h3>
                  <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                    <p className="text-gray-700 font-medium italic">Parent discussion prompt: "Ask your child: did we have any bubbles or spills today? How can we prevent this next time?"</p>
                  </div>
                  <button className="w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all bg-green-100 text-green-700 border-2 border-green-500">
                    <CheckCircle2 className="w-5 h-5" /> Parent Sign-off Complete
                  </button>
                  <button onClick={() => { setActiveWeek(7); setActiveTab('learn'); }} className="w-full mt-6 py-4 rounded-xl font-bold uppercase tracking-wider transition-all bg-[#0B1F3A] text-white shadow-lg hover:-translate-y-1">
                    Proceed to W7
                  </button>
                </div>
              )}

              {/* WEEK 7 CONTENT */}
              {activeWeek === 7 && activeTab === 'learn' && (
                <div className="space-y-6">
                  <PlaceholderImage src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=800" alt="Before and after sanding and polishing" label="Example: Rough Edge vs Sanded & Polished" className="h-48 w-full" />
                  <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 text-gray-700 font-medium space-y-4">
                    <p className="font-bold text-gray-900 text-lg">Today your piece comes out of the mould and gets finished.</p>

                    <div>
                      <h4 className="font-bold text-blue-900 mb-2">Demoulding</h4>
                      <p>Release your piece the same way you learned in Week 4: flex the silicone mould gently from the outside. Never pry it out with a hard tool — that can tear the mould or damage your piece.</p>
                    </div>

                    <div>
                      <h4 className="font-bold text-blue-900 mb-2">Sanding and polishing</h4>
                      <p>Smooth any rough edges or seam lines left from the mould, working from a rougher grit of sandpaper to a finer one for a clean, polished finish. Follow your instructor's guide on the technique.</p>
                    </div>

                    <div>
                      <h4 className="font-bold text-blue-900 mb-2">Checking your work — what to look for</h4>
                      <p>Not every piece comes out perfect, and knowing how to check your own work is a real skill. Look for:</p>
                      <ul className="list-disc pl-5 mt-2 space-y-1">
                        <li>Bubbles trapped inside — small pockets that make the piece look cloudy instead of clear.</li>
                        <li>Cracks or uneven surfaces.</li>
                        <li>Soft or sticky spots — press your piece gently. If any part feels soft, bendable, or tacky instead of hard, that means it didn't cure properly.</li>
                      </ul>
                      <p className="mt-2">This is different from a bubble — a soft spot can't be fixed, and a piece like this can't be sold. Recognizing this early is part of real quality control, not a failure on your part.</p>
                    </div>

                    <div>
                      <h4 className="font-bold text-blue-900 mb-2">Your leftover material — Residue Lesson</h4>
                      <p>Remember Week 2: cured resin scraps can be crushed into small chips and embedded into a brand new piece as decoration, the same way glitter is added.</p>
                      <br/>
                      <p> Today, gather your fully cured offcuts and hand them to the residue activity — someone else's piece may use your leftover material as its decoration.</p>
                    </div>
                  </div>

                  <button onClick={() => setActiveTab('do')} className="w-full bg-[#0B1F3A] text-white py-4 rounded-xl font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-[#15325A]">
                    Continue to Homework ➔
                  </button>
                </div>
              )}

              {activeWeek === 7 && activeTab === 'do' && (
                <div className="space-y-6">
                  <h3 className="text-xl font-black text-gray-900 mb-4">📝 YOUR HOMEWORK ASSIGNMENT</h3>
                  <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                    <ul className="space-y-4 text-gray-700 font-medium">
                      <li className="flex gap-3"><span className="text-blue-500 font-black">1.</span> Inspect your finished piece and note anything you'd improve.</li>
                      <li className="flex gap-3"><span className="text-blue-500 font-black">2.</span> Complete your Quality Control checklist (bubbles, cracks, surface evenness, hardness check).</li>
                      <li className="flex gap-3"><span className="text-blue-500 font-black">3.</span> (Junior Secondary / residue track): log what you made using someone else's leftover offcuts.</li>
                    </ul>
                  </div>
                  <button onClick={() => setActiveTab('check')} className="w-full bg-[#0B1F3A] text-white py-4 rounded-xl font-bold uppercase tracking-wider hover:bg-[#15325A]">
                    Proceed to Check ➔
                  </button>
                </div>
              )}

              {activeWeek === 7 && activeTab === 'check' && (
                <div className="space-y-6">
                  <h3 className="text-xl font-black text-gray-900 mb-4">Review Your Work</h3>
                  <div className="bg-green-50 border border-green-200 p-6 rounded-xl">
                    <p className="text-green-800 font-medium">Before continuing: can you explain the difference between a bubble (cosmetic) and a soft/sticky spot (a real cure failure)? Can you explain why a soft spot means the piece cannot be sold or fixed?</p>
                  </div>
                  <button onClick={() => setActiveTab('sign')} className="w-full bg-[#0B1F3A] text-white py-4 rounded-xl font-bold uppercase tracking-wider hover:bg-[#15325A]">
                    Proceed to Sign-off ➔
                  </button>
                </div>
              )}

              {activeWeek === 7 && activeTab === 'sign' && (
                <div className="space-y-6">
                  <h3 className="text-xl font-black text-gray-900 mb-4">Parent Verification</h3>
                  <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                    <p className="text-gray-700 font-medium italic">Parent discussion prompt: "Ask your child to expplain their finished piece, and  also explain what they checked for and what they found."</p>
                  </div>
                  <button className="w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all bg-green-100 text-green-700 border-2 border-green-500">
                    <CheckCircle2 className="w-5 h-5" /> Parent Sign-off Complete
                  </button>
                  <button onClick={() => { if(onNextPhase) onNextPhase() }} className="w-full mt-6 py-4 rounded-xl font-bold uppercase tracking-wider transition-all bg-[#0B1F3A] text-white shadow-lg hover:-translate-y-1">
                    Unlock Phase 4 (Market)
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
