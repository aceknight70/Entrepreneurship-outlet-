const fs = require('fs');

const file = 'src/screens/Preparation.tsx';
let content = fs.readFileSync(file, 'utf8');

const targetCodeStart = `{/* WEEK 3 CONTENT */}`;
const targetCodeEndStr = `</button>
                </div>
              )}`;
              
// find the first occurrence of week 3 start
const startIdx = content.indexOf(targetCodeStart);

// find the end of week 3 which is right before week 4
const w4StartIdx = content.indexOf(`{/* WEEK 4 CONTENT */}`);
const targetCodeEndStrActual = content.substring(startIdx, w4StartIdx).trim();


const newW3Content = `{/* WEEK 3 CONTENT */}
              {activeWeek === 3 && activeTab === 'learn' && (
                <div className="space-y-6">
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
              )}`;

if (startIdx !== -1 && w4StartIdx !== -1) {
    const updatedContent = content.substring(0, startIdx) + newW3Content + "\n\n              " + content.substring(w4StartIdx);
    fs.writeFileSync(file, updatedContent);
    console.log('Successfully updated Preparation.tsx');
} else {
    console.error('Could not find the target code block.');
}
