const fs = require('fs');

const file = 'src/screens/Market.tsx';
let content = fs.readFileSync(file, 'utf8');

// Update title in weeks array
content = content.replace(
  "{ id: 8, title: 'W8: Brand', fullTitle: 'Branding & Packaging: Naming My Bead Business' }",
  "{ id: 8, title: 'W8: Brand', fullTitle: 'Branding & Packaging' }"
);

const w8Start = content.indexOf('{/* WEEK 8 CONTENT */}');
const w9Start = content.indexOf('{/* WEEK 9 CONTENT */}');

if (w8Start !== -1 && w9Start !== -1) {
  const beforeW8 = content.substring(0, w8Start);
  const afterW8 = content.substring(w9Start);

  const newW8Content = `{/* WEEK 8 CONTENT */}
              {activeWeek === 8 && activeTab === 'learn' && (
                <div className="space-y-6">
                  <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 text-gray-700 font-medium space-y-4">
                    <p className="font-bold text-gray-900 text-lg">A product without a brand is just a thing. Today you give your piece an identity.</p>

                    <div>
                      <h4 className="font-bold text-blue-900 mb-2">Choosing a brand name</h4>
                      <p>A good brand name is short, easy to say, and easy to remember. It should make someone curious or tell them something about what you make. Try a few different names before picking one — the first idea isn't always the best one.</p>
                    </div>

                    <div>
                      <h4 className="font-bold text-blue-900 mb-2">Designing your badge</h4>
                      <p>Your logo isn't something you draw from scratch — it's your own personal badge, built inside the app using the Logo Maker. Your badge has three parts: your school identity curved around the ring ("Jasmine School Shadow SDG Entrepreneur"), your own name in the centre, and a short one-line mission underneath it, in your own words. Use the Logo Maker to build yours.</p>
                    </div>

                    <div>
                      <h4 className="font-bold text-blue-900 mb-2">Packaging — protecting your work and showing who made it</h4>
                      <p>Packaging does two jobs: it protects your piece, and it tells the buyer who made it and why. This is where your SDG tag goes — a small label that reads: "This piece came from a Jasmine School Shadow SDG Entrepreneur." A buyer who reads that knows this isn't just a product — it's tied to a real goal, made by someone real, from a real school.</p>
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
                <div className="space-y-6">
                  <h3 className="text-xl font-black text-gray-900 mb-4">📝 YOUR HOMEWORK ASSIGNMENT</h3>
                  <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                    <ul className="space-y-4 text-gray-700 font-medium">
                      <li className="flex gap-3"><span className="text-blue-500 font-black">1.</span> Try a few brand names before settling on one.</li>
                      <li className="flex gap-3"><span className="text-blue-500 font-black">2.</span> Use the Logo Maker to build your badge — enter your name and write your one-line mission.</li>
                      <li className="flex gap-3"><span className="text-blue-500 font-black">3.</span> Design your packaging label, including your SDG tag: "This piece came from a Jasmine School Shadow SDG Entrepreneur."</li>
                      <li className="flex gap-3"><span className="text-blue-500 font-black">4.</span> Research 3 real resin/bead brands online — how do they present themselves, and what do they charge?</li>
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

              `;
              
  fs.writeFileSync(file, beforeW8 + newW8Content + afterW8);
  console.log("Successfully updated Week 8 in Market.tsx");
} else {
  console.error("Could not find the target sections.");
}
