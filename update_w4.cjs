const fs = require('fs');

const file = 'src/screens/Preparation.tsx';
let content = fs.readFileSync(file, 'utf8');

// 1. Update the weeks array fullTitle
content = content.replace(
  "{ id: 4, title: 'W4: Moulds', fullTitle: 'Mould-Making & Practice: Building My Bead Mould' }",
  "{ id: 4, title: 'W4: Moulds', fullTitle: 'Using & Caring for Your Mould — Practice' }"
);

// 2. Replace Week 4 content
const w4Start = content.indexOf('{/* WEEK 4 CONTENT */}');
const w5Start = content.indexOf('{/* WEEK 5 CONTENT */}');

if (w4Start !== -1 && w5Start !== -1) {
  const beforeW4 = content.substring(0, w4Start);
  const afterW4 = content.substring(w5Start);

  const newW4Content = `{/* WEEK 4 CONTENT */}
              {activeWeek === 4 && activeTab === 'learn' && (
                <div className="space-y-6">
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
                  
                  <div className="bg-purple-50 border-l-4 border-purple-500 p-6 rounded-r-lg space-y-2">
                    <h4 className="font-bold text-purple-900 text-lg">Want to go further?</h4>
                    <p className="text-purple-900 font-medium">Learning to make your OWN custom mould from raw silicone — not just use a ready-made one — is a real, separate skill. If you want to learn that, it's taught at Graphitti Institute as a deeper training beyond this programme.</p>
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

              `;
              
  fs.writeFileSync(file, beforeW4 + newW4Content + afterW4);
  console.log("Successfully updated Week 4 in Preparation.tsx");
} else {
  console.error("Could not find the target sections.");
}

