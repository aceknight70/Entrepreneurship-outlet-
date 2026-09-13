const fs = require('fs');

const file = 'src/screens/Production.tsx';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(
  "{ id: 6, title: 'W6: Production', fullTitle: 'Production Day: Making My Resin Beads (Zero-Waste)' }",
  "{ id: 6, title: 'W6: Production', fullTitle: 'Production Day — Zero-Waste' }"
);

const w6Start = content.indexOf('{/* WEEK 6 CONTENT */}');
const w7Start = content.indexOf('{/* WEEK 7 CONTENT */}');

if (w6Start !== -1 && w7Start !== -1) {
  const beforeW6 = content.substring(0, w6Start);
  const afterW6 = content.substring(w7Start);

  const newW6Content = `{/* WEEK 6 CONTENT */}
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

              `;
              
  fs.writeFileSync(file, beforeW6 + newW6Content + afterW6);
  console.log("Successfully updated Week 6 in Production.tsx");
} else {
  console.error("Could not find the target sections.");
}
