const fs = require('fs');

const file = 'src/screens/Market.tsx';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(
  "{ id: 10, title: 'W10: Pitch', fullTitle: 'Pitch Preparation: Selling My Bead Business' }",
  "{ id: 10, title: 'W10: Pitch', fullTitle: 'Pitch Preparation' }"
);

const w10Start = content.indexOf('{/* WEEK 10 CONTENT */}');

if (w10Start !== -1) {
  const beforeW10 = content.substring(0, w10Start);

  const newW10Content = `{/* WEEK 10 CONTENT */}
              {activeWeek === 10 && activeTab === 'learn' && (
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

              {activeWeek === 10 && activeTab === 'do' && (
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

              {activeWeek === 10 && activeTab === 'check' && (
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

              {activeWeek === 10 && activeTab === 'sign' && (
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

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
`;
              
  fs.writeFileSync(file, beforeW10 + newW10Content);
  console.log("Successfully updated Week 10 in Market.tsx");
} else {
  console.error("Could not find the target section.");
}
