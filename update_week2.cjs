const fs = require('fs');

const file = 'src/screens/Knowledge.tsx';
let content = fs.readFileSync(file, 'utf8');

// Find the start of Week 2 content
const w2Start = content.indexOf('{/* WEEK 2 CONTENT */}');
const w2End = content.indexOf('</div>', content.indexOf('{activeWeek === 2 && activeTab === \'sign\' && (')) + 6; // Roughly find the end

// This is the new week 2 content
const newW2Content = `{/* WEEK 2 CONTENT */}
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
              )}`;

const targetCodeStart = `{/* WEEK 2 CONTENT */}`;
const targetCodeEndStr = `</button>
                </div>
              )}

            </div>`;
            
const startIdx = content.indexOf(targetCodeStart);
const endIdx = content.indexOf(targetCodeEndStr) + targetCodeEndStr.length - 23; // leave the </div></div>

if (startIdx !== -1 && endIdx !== -1) {
    const updatedContent = content.substring(0, startIdx) + newW2Content + content.substring(endIdx);
    fs.writeFileSync(file, updatedContent);
    console.log('Successfully updated Knowledge.tsx');
} else {
    console.error('Could not find the target code block.');
}
