const fs = require('fs');

const file = 'src/screens/Production.tsx';
let content = fs.readFileSync(file, 'utf8');

// Update title in weeks array
content = content.replace(
  "{ id: 7, title: 'W7: QC', fullTitle: 'Finishing, QC & Residue: From Bead to Product' }",
  "{ id: 7, title: 'W7: QC', fullTitle: 'Finishing, Quality Control & Residue' }"
);

const w7Start = content.indexOf('{/* WEEK 7 CONTENT */}');

if (w7Start !== -1) {
  const beforeW7 = content.substring(0, w7Start);

  const newW7Content = `{/* WEEK 7 CONTENT */}
              {activeWeek === 7 && activeTab === 'learn' && (
                <div className="space-y-6">
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
`;
              
  fs.writeFileSync(file, beforeW7 + newW7Content);
  console.log("Successfully updated Week 7 in Production.tsx");
} else {
  console.error("Could not find the target section for Week 7.");
}
