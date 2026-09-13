const fs = require('fs');

const file = 'src/screens/Market.tsx';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(
  "{ id: 9, title: 'W9: Cost', fullTitle: 'The Bead Costing Workshop: Costing, Pricing & Marketing' }",
  "{ id: 9, title: 'W9: Costing', fullTitle: 'The Bead Costing Workshop — Costing, Pricing & Marketing' }"
);

const w9Start = content.indexOf('{/* WEEK 9 CONTENT */}');
const w10Start = content.indexOf('{/* WEEK 10 CONTENT */}');

if (w9Start !== -1 && w10Start !== -1) {
  const beforeW9 = content.substring(0, w9Start);
  const afterW9 = content.substring(w10Start);

  const newW9Content = `{/* WEEK 9 CONTENT */}
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

              `;
              
  fs.writeFileSync(file, beforeW9 + newW9Content + afterW9);
  console.log("Successfully updated Week 9 in Market.tsx");
} else {
  console.error("Could not find the target sections.");
}
