import React, { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { DiagonalBanner } from '../components/Layout';
import { PlaceholderImage } from '../components/PlaceholderImage';
import { LogoMaker } from '../components/LogoMaker';
import { SCHOOL_CONFIG } from '../config';

export function MarketScreen({ onNextPhase }: { onNextPhase?: () => void }) {
  const [activeWeek, setActiveWeek] = useState<number>(8);
  const [activeTab, setActiveTab] = useState<'learn' | 'do' | 'check' | 'sign'>('learn');
  const [track, setTrack] = useState<'primary' | 'institute'>('primary');

  const weeks = [
    { id: 8, title: 'W8: Brand', fullTitle: 'Branding & Packaging' },
    { id: 9, title: 'W9: Costing', fullTitle: 'The Bead Costing Workshop — Costing, Pricing & Marketing' },
    { id: 10, title: 'W10: Pitch', fullTitle: track === 'institute' ? 'Sales Pitch & Market Readiness' : 'Pitch Preparation' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col pb-24 font-sans">
      <DiagonalBanner />
      <div className="relative z-10 max-w-3xl mx-auto w-full pt-16 px-4 flex-1">
        <div className="mb-6">
          <h1 className="text-4xl font-black text-white tracking-tight mb-2 uppercase">Phase 4</h1>
          <p className="text-blue-100 font-medium">Market — My Resin Bead Business</p>
        </div>

        {/* UNLOCKED: Top Horizontal Week Toggles */}
        <div className="flex bg-white/20 p-1 rounded-xl mb-6 overflow-x-auto hide-scrollbar">
          {weeks.map((w) => {
            const isActive = activeWeek === w.id;
            return (
              <button
                key={w.id}
                onClick={() => { setActiveWeek(w.id); setActiveTab('learn'); }}
                className={`flex-1 min-w-[100px] py-3 px-2 text-sm font-bold rounded-lg transition-all flex flex-col items-center justify-center gap-1 ${
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

              {/* WEEK 8 CONTENT */}
              {activeWeek === 8 && activeTab === 'learn' && (
                <div className="space-y-6">
                  <PlaceholderImage src="https://images.unsplash.com/photo-1607344645866-009c320b63e0?auto=format&fit=crop&w=800" alt="Packaged pieces" label="Example: Packaged & Branded Pieces" className="h-48 w-full" />
                  <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 text-gray-700 font-medium space-y-4">
                    <p className="font-bold text-gray-900 text-lg">A product without a brand is just a thing. Today you give your piece an identity.</p>

                    <div>
                      <h4 className="font-bold text-blue-900 mb-2">Choosing a brand name</h4>
                      <p>A good brand name is short, easy to say, and easy to remember. It should make someone curious or tell them something about what you make. Try a few different names before picking one — the first idea isn't always the best one.</p>
                    </div>

                    <div>
                      <h4 className="font-bold text-blue-900 mb-2">Designing your badge</h4>
                      <p>Your logo isn't something you draw from scratch — it's your own personal badge, built inside the app using the Logo Maker. Your badge has three parts: your school identity curved around the ring ("{SCHOOL_CONFIG.name} Shadow SDG Entrepreneur"), your own name in the centre, and a short one-line mission underneath it, in your own words. Use the Logo Maker to build yours.</p>
                    </div>

                    <div>
                      <h4 className="font-bold text-blue-900 mb-2">Packaging — protecting your work and showing who made it</h4>
                      <p>Packaging does two jobs: it protects your piece, and it tells the buyer who made it and why. This is where your SDG tag goes — a small label that reads: "This piece came from a {SCHOOL_CONFIG.name} Shadow SDG Entrepreneur." A buyer who reads that knows this isn't just a product — it's tied to a real goal, made by someone real, from a real school.</p>
                    </div>

                    <div>
                      <h4 className="font-bold text-blue-900 mb-2">Why this counts as innovation and decent work (SDG 8, 9)</h4>
                      <p>Branding is where your piece stops being "a resin bead" and becomes "my resin bead" — something a buyer can trust, recognise, and come back for. That trust is what turns a single sale into a returning customer.</p>
                    </div>
                  </div>

                  <button onClick={() => setActiveTab('do')} className="w-full bg-[#0B1F3A] text-white py-4 rounded-xl font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-[#15325A]">
                    Continue to Homework ➔
                  </button>
                </div>
              )}

              {activeWeek === 8 && activeTab === 'do' && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
                  <h3 className="text-xl font-black text-gray-900 mb-4">📝 YOUR HOMEWORK ASSIGNMENT</h3>
                  
                  <LogoMaker />

                  <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                    <ul className="space-y-4 text-gray-700 font-medium">
                      <li className="flex gap-3"><span className="text-blue-500 font-black">1.</span> Use the Logo Maker to personalize your badge — enter your name (or business name, if unlocked) and write your one-line mission.</li>
                      <li className="flex gap-3"><span className="text-blue-500 font-black">2.</span> Design your packaging label, including your SDG tag: "This piece came from a {SCHOOL_CONFIG.name} Shadow SDG Entrepreneur."</li>
                      <li className="flex gap-3"><span className="text-blue-500 font-black">3.</span> Research 3 real resin/bead brands online — how do they present themselves, and what do they charge?</li>
                    </ul>
                  </div>
                  <button onClick={() => setActiveTab('check')} className="w-full bg-[#0B1F3A] text-white py-4 rounded-xl font-bold uppercase tracking-wider hover:bg-[#15325A]">
                    Proceed to Check ➔
                  </button>
                </div>
              )}

              {activeWeek === 8 && activeTab === 'check' && (
                <div className="space-y-6">
                  <h3 className="text-xl font-black text-gray-900 mb-4">Review Your Work</h3>
                  <div className="bg-green-50 border border-green-200 p-6 rounded-xl">
                    <p className="text-green-800 font-medium">Before continuing: can you explain, in your own words, why a brand name and badge matter beyond just looking nice? What does your SDG tag tell a buyer that the piece itself doesn't?</p>
                  </div>
                  <button onClick={() => setActiveTab('sign')} className="w-full bg-[#0B1F3A] text-white py-4 rounded-xl font-bold uppercase tracking-wider hover:bg-[#15325A]">
                    Proceed to Sign-off ➔
                  </button>
                </div>
              )}

              {activeWeek === 8 && activeTab === 'sign' && (
                <div className="space-y-6">
                  <h3 className="text-xl font-black text-gray-900 mb-4">Parent Verification</h3>
                  <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                    <p className="text-gray-700 font-medium italic">Parent discussion prompt: "Ask your child to show you their badge, brand name, and packaging design, and explain why they chose them."</p>
                  </div>
                  <button className="w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all bg-green-100 text-green-700 border-2 border-green-500">
                    <CheckCircle2 className="w-5 h-5" /> Parent Sign-off Complete
                  </button>
                  <button onClick={() => { setActiveWeek(9); setActiveTab('learn'); }} className="w-full mt-6 py-4 rounded-xl font-bold uppercase tracking-wider transition-all bg-[#0B1F3A] text-white shadow-lg hover:-translate-y-1">
                    Proceed to W9
                  </button>
                </div>
              )}

              {/* WEEK 9 CONTENT */}
              {activeWeek === 9 && activeTab === 'learn' && (
                <div className="space-y-6">
                  <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 text-gray-700 font-medium space-y-4">
                    <p className="font-bold text-gray-900 text-lg">The Bead Costing Workshop: Costing, Pricing & Marketing</p>
                    <p>• Most students are making earings , keyholders , pendants , beads — how do you know if you're making a profit?  You must know the exact cost of ONE BEAD.</p>

                    <div>
                      <h4 className="font-bold text-blue-900 mb-2">Remember the Syringe Method from Week 6</h4>
                      <p>You measured your resin with a syringe, not by eye. That exact measurement is what makes today's math possible — you can't work out a fair price if you don't know your real cost.</p>
                    </div>

                    <div>
                      <h4 className="font-bold text-blue-900 mb-2">Scaling up: the math of beads</h4>
                      <p>Once you know the cost of 1 bead, you can work out the cost of 10, 100, or even 200. If one bead's materials cost ₦5:</p>
                      <ul className="list-disc pl-5 mt-2 space-y-1">
                        <li>1 Bead: ₦5</li>
                        <li>10 Beads: 10 × ₦5 = ₦50</li>
                        <li>100 Beads: 100 × ₦5 = ₦500</li>
                        <li>200 Beads: 200 × ₦5 = ₦1,000</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-bold text-blue-900 mb-2">Don't forget the "boring" (drilling) and packaging costs</h4>
                      <p>A bead isn't finished until it has a hole — that's the "boring" step, and it costs something too (drill wear, electricity). Packaging costs too: if a bag costs ₦100 and holds 10 beads, that's ₦10 added to the cost of each bead (₦100 ÷ 10 = ₦10 per bead).</p>
                      <br/>
                      <p className="font-bold text-gray-900">Your final base cost (example, for 1 bead):</p>
                      <ul className="list-disc pl-5 mt-2 space-y-1">
                        <li>Resin + Hardener + Colour = ₦5</li>
                        <li>Boring = ₦1</li>
                        <li>Packaging = ₦10</li>
                        <li>Total Base Cost = ₦16</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-bold text-blue-900 mb-2">Setting your price and profit</h4>
                      <p>You cannot sell a bead for exactly what it cost you — that's zero profit. If your Base Cost is ₦16:</p>
                      <ul className="list-disc pl-5 mt-2 space-y-1">
                        <li>Sell 1 bead for ₦25 → Profit = ₦9</li>
                        <li>Sell a string of 10 for ₦250 → Profit = ₦90</li>
                        <li>Sell 100 → Profit = ₦900</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-bold text-blue-900 mb-2">Record-keeping and marketing</h4>
                      <p>Keep a simple record of what you make, what you sell, and what you spend. Think about how you'll reach a buyer: social media, word of mouth, or a school/community sale. Take a clear, well-lit photo of your piece — a good photo genuinely helps something sell.</p>
                    </div>
                  </div>

                  <button onClick={() => setActiveTab('do')} className="w-full bg-[#0B1F3A] text-white py-4 rounded-xl font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-[#15325A]">
                    Continue to Homework ➔
                  </button>
                </div>
              )}

              {activeWeek === 9 && activeTab === 'do' && (
                <div className="space-y-6">
                  <h3 className="text-xl font-black text-gray-900 mb-4">📝 YOUR HOMEWORK ASSIGNMENT</h3>
                  <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                    <ul className="space-y-4 text-gray-700 font-medium">
                      <li className="flex gap-3"><span className="text-blue-500 font-black">1.</span> Use your syringe measurement to calculate the resin cost for 1 bead.</li>
                      <li className="flex gap-3"><span className="text-blue-500 font-black">2.</span> Calculate your packaging cost per bead (bag cost ÷ beads per bag).</li>
                      <li className="flex gap-3"><span className="text-blue-500 font-black">3.</span> Add the boring/drilling cost.</li>
                      <li className="flex gap-3"><span className="text-blue-500 font-black">4.</span> Calculate your Base Cost for 1 bead, 10 beads, and 100 beads.</li>
                      <li className="flex gap-3"><span className="text-blue-500 font-black">5.</span> Decide your final selling price and calculate your profit.</li>
                      <li className="flex gap-3"><span className="text-blue-500 font-black">6.</span> Write a one-page mini business plan.</li>
                      <li className="flex gap-3"><span className="text-blue-500 font-black">7.</span> Create a simple social media advert mock-up.</li>
                    </ul>
                  </div>
                  <button onClick={() => setActiveTab('check')} className="w-full bg-[#0B1F3A] text-white py-4 rounded-xl font-bold uppercase tracking-wider hover:bg-[#15325A]">
                    Proceed to Check ➔
                  </button>
                </div>
              )}

              {activeWeek === 9 && activeTab === 'check' && (
                <div className="space-y-6">
                  <h3 className="text-xl font-black text-gray-900 mb-4">Review Your Work</h3>
                  <div className="bg-green-50 border border-green-200 p-6 rounded-xl">
                    <p className="text-green-800 font-medium">Parent Check: "Did you remember to add the cost of the packaging and the drilling?"</p>
                  </div>
                  <button onClick={() => setActiveTab('sign')} className="w-full bg-[#0B1F3A] text-white py-4 rounded-xl font-bold uppercase tracking-wider hover:bg-[#15325A]">
                    Proceed to Sign-off ➔
                  </button>
                </div>
              )}

              {activeWeek === 9 && activeTab === 'sign' && (
                <div className="space-y-6">
                  <h3 className="text-xl font-black text-gray-900 mb-4">Parent Verification</h3>
                  <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                    <p className="text-gray-700 font-medium italic">Parent reviews the bead costing sheet and signs.</p>
                  </div>
                  <button className="w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all bg-green-100 text-green-700 border-2 border-green-500">
                    <CheckCircle2 className="w-5 h-5" /> Parent Sign-off Complete
                  </button>
                  <button onClick={() => { setActiveWeek(10); setActiveTab('learn'); }} className="w-full mt-6 py-4 rounded-xl font-bold uppercase tracking-wider transition-all bg-[#0B1F3A] text-white shadow-lg hover:-translate-y-1">
                    Proceed to W10
                  </button>
                </div>
              )}

              {/* WEEK 10 CONTENT */}
              {activeWeek === 10 && track === 'primary' && activeTab === 'learn' && (
                <div className="space-y-6">
                  <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 text-gray-700 font-medium space-y-4">
                    <p className="font-bold text-gray-900 text-lg">You've made it, priced it, and branded it. Now you need to be able to say it — out loud, to a stranger, with confidence.</p>

                    <div>
                      <h4 className="font-bold text-blue-900 mb-2">What a good pitch includes</h4>
                      <p>A pitch doesn't need to be long. In just a few sentences, tell someone: what it is, why it matters (your SDG story), and what it costs. That's it — you don't need to convince someone for five minutes. A short, clear pitch is more convincing than a long, nervous one.</p>
                    </div>

                    <div>
                      <h4 className="font-bold text-blue-900 mb-2">Practicing with a partner</h4>
                      <p>Say your pitch out loud to a classmate before Market Day. Ask them: what did they understand clearly, and what wasn't clear? A pitch that makes sense in your head doesn't always make sense out loud until you've said it a few times.</p>
                    </div>

                    <div>
                      <h4 className="font-bold text-blue-900 mb-2">Getting ready for the day itself</h4>
                      <p>Market Day logistics — where your stall will be, what time it starts, how buyers will get in — are confirmed with the school this week, so there are no surprises on the day.</p>
                    </div>

                    <div>
                      <h4 className="font-bold text-blue-900 mb-2">Here's an example pitch</h4>
                      <p className="italic">"Hi! I'm Chidinma, and I made this resin bead myself. Every piece I make is made carefully so nothing goes to waste — any leftover material gets reused, not thrown away. This one costs ₦25. Would you like one, or would you like to see the other colours I have?"</p>
                      <br/>
                      <p>Notice what that pitch does: it says who made it, what makes it different (the waste story), what it costs, and it ends with a question — not a hard sell, just an easy way for the buyer to say yes.</p>
                    </div>
                  </div>

                  <button onClick={() => setActiveTab('do')} className="w-full bg-[#0B1F3A] text-white py-4 rounded-xl font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-[#15325A]">
                    Continue to Homework ➔
                  </button>
                </div>
              )}

              {activeWeek === 10 && track === 'primary' && activeTab === 'do' && (
                <div className="space-y-6">
                  <h3 className="text-xl font-black text-gray-900 mb-4">📝 YOUR HOMEWORK ASSIGNMENT</h3>
                  <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                    <ul className="space-y-4 text-gray-700 font-medium">
                      <li className="flex gap-3"><span className="text-blue-500 font-black">1.</span> Write your pitch.</li>
                      <li className="flex gap-3"><span className="text-blue-500 font-black">2.</span> Practice it out loud with a partner. Give and receive feedback.</li>
                    </ul>
                  </div>
                  <button onClick={() => setActiveTab('check')} className="w-full bg-[#0B1F3A] text-white py-4 rounded-xl font-bold uppercase tracking-wider hover:bg-[#15325A]">
                    Proceed to Check ➔
                  </button>
                </div>
              )}

              {activeWeek === 10 && track === 'primary' && activeTab === 'check' && (
                <div className="space-y-6">
                  <h3 className="text-xl font-black text-gray-900 mb-4">Review Your Work</h3>
                  <div className="bg-green-50 border border-green-200 p-6 rounded-xl">
                    <p className="text-green-800 font-medium">Market Day logistics confirmed with school administration (space, security, gate access, timing).</p>
                  </div>
                  <button onClick={() => setActiveTab('sign')} className="w-full bg-[#0B1F3A] text-white py-4 rounded-xl font-bold uppercase tracking-wider hover:bg-[#15325A]">
                    Proceed to Sign-off ➔
                  </button>
                </div>
              )}

              {activeWeek === 10 && track === 'primary' && activeTab === 'sign' && (
                <div className="space-y-6">
                  <h3 className="text-xl font-black text-gray-900 mb-4">Parent Verification</h3>
                  <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                    <p className="text-gray-700 font-medium">—</p>
                  </div>
                  <button className="w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all bg-green-100 text-green-700 border-2 border-green-500">
                    <CheckCircle2 className="w-5 h-5" /> Parent Sign-off Complete
                  </button>
                  <button onClick={() => { if(onNextPhase) onNextPhase() }} className="w-full mt-6 py-4 rounded-xl font-bold uppercase tracking-wider transition-all bg-[#0B1F3A] text-white shadow-lg hover:-translate-y-1">
                    Unlock Phase 5 (Graduation)
                  </button>
                </div>
              )}
              {activeWeek === 10 && track === 'institute' && activeTab === 'learn' && (
                <div className="space-y-6">
                  <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 text-gray-700 font-medium space-y-6">
                    <p className="font-bold text-gray-900 text-lg">Step 1 — The 30-Second Pitch Structure</p>
                    <p>Build your pitch in four parts, in this order: (1) Hook — a single line that gets attention (e.g. "This bead was made with zero material waste"); (2) What it is — a plain, concrete description; (3) Value — why it's worth the price (craft, story, SDG grounding); (4) The ask — a direct, low-pressure close ("Would you like one?" or "I have these in three colours"). Keep total delivery under 30 seconds — longer pitches lose a casual buyer's attention.</p>
                    
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="font-bold text-blue-900 mb-2">Example pitch, following this exact structure:</p>
                      <p className="italic text-blue-800">"This bead is made with zero material waste — every offcut gets reused in another piece, not thrown away. It's hand-poured resin, finished and polished by hand. At this price point you're getting a genuinely one-of-a-kind piece, not a mass-produced one. Would you like one, or can I show you the full colour range I have today?"</p>
                      <p className="mt-2 text-sm text-blue-800">Notice the four parts in order: the hook (zero waste), what it is (hand-poured, hand-finished), the value case (one-of-a-kind, not mass-produced), and the ask (a direct but low-pressure close).</p>
                    </div>

                    <div>
                      <h4 className="font-bold text-blue-900 mb-2">Step 2 — Anticipate Objections Before You Hear Them</h4>
                      <p>Prepare a short, confident response to the two most common objections you're likely to face: "That's too expensive" and "Why should I buy from you specifically?" Do not improvise these responses live — have them ready in advance.</p>
                    </div>

                    <div>
                      <h4 className="font-bold text-blue-900 mb-2">Step 3 — Practice With Recorded Review</h4>
                      <p>Where possible, record yourself delivering the pitch (phone video is sufficient) and review it before your live peer practice. Watching yourself reveals filler words, pacing issues, and body language you won't notice while speaking.</p>
                    </div>

                    <div>
                      <h4 className="font-bold text-blue-900 mb-2">Step 4 — Non-Verbal Delivery</h4>
                      <p>Maintain eye contact, stand at a natural distance (not crowding the buyer), and speak at a measured pace — nervous pitches speed up noticeably, which reads as uncertainty even when the content is solid.</p>
                    </div>

                    <div>
                      <h4 className="font-bold text-blue-900 mb-2">Step 5 — Stall/Table Logistics</h4>
                      <p>Before the event: confirm your price tags are clearly visible from a short distance, your stock is displayed attractively (not piled), and you have change ready for common denominations. A buyer who has to ask "how much is this" because a price isn't visible is a buyer you've already lost momentum with.</p>
                    </div>

                    <div>
                      <h4 className="font-bold text-blue-900 mb-2">Step 6 — Capturing Repeat Customers</h4>
                      <p>For any buyer who engages positively, even if they don't purchase immediately, note down a way to reach them again (a social media handle, a phone number if they offer it). A single sale is one transaction; a captured contact is a potential returning customer.</p>
                    </div>
                  </div>

                  <button onClick={() => { if(onNextPhase) onNextPhase() }} className="w-full mt-6 py-4 rounded-xl font-bold uppercase tracking-wider transition-all bg-[#0B1F3A] text-white shadow-lg hover:-translate-y-1">
                    Unlock Phase 5 (Graduation)
                  </button>
                </div>
              )}

              {activeWeek === 10 && track === 'institute' && activeTab !== 'learn' && (
                <div className="space-y-6">
                  <h3 className="text-xl font-black text-gray-900 mb-4">Procedure</h3>
                  <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                    <p className="text-gray-700 font-medium">Please return to the Learn tab to view the Full Procedure for Institute Level.</p>
                  </div>
                  <button onClick={() => { if(onNextPhase) onNextPhase() }} className="w-full mt-6 py-4 rounded-xl font-bold uppercase tracking-wider transition-all bg-[#0B1F3A] text-white shadow-lg hover:-translate-y-1">
                    Unlock Phase 5 (Graduation)
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
