const fs = require('fs');

const file = 'src/screens/Preparation.tsx';
let content = fs.readFileSync(file, 'utf8');

// Replace Week 5 content
const w5Start = content.indexOf('{/* WEEK 5 CONTENT */}');

if (w5Start !== -1) {
  const beforeW5 = content.substring(0, w5Start);

  const newW5Content = `{/* WEEK 5 CONTENT */}
              {activeWeek === 5 && activeTab === 'learn' && (
                <div className="space-y-6">
                  <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 text-gray-700 font-medium space-y-4">
                    <p className="font-bold text-gray-900 text-lg">This is your last stop before Production Day — the day your real materials become your real piece.</p>
                    
                    <div>
                      <h4 className="font-bold text-blue-900 mb-2">Reviewing your design one more time</h4>
                      <p>The colours and design you chose in Week 3 need one final check. What looked right on paper doesn't always work exactly the same in real resin — your instructor will help you confirm your plan is realistic before anything is mixed for real.</p>
                    </div>

                    <div>
                      <h4 className="font-bold text-blue-900 mb-2">Materials distribution</h4>
                      <p>Today, your real kit materials are handed out — not scrap, the actual resin and hardener meant for your finished piece. From this point, your materials are fixed. This is why the practice you did in Week 4 mattered: real materials are counted and shared out for exactly what you need, not for retrying if something goes wrong.</p>
                    </div>

                    <div>
                      <h4 className="font-bold text-blue-900 mb-2">One more safety check</h4>
                      <p>Before Production Day, we briefly go back over the safety rules from Week 2. This isn't because you forgot — it's because Production Day is when the stakes are real, and a quick reminder right before you start is what actually sticks.</p>
                    </div>

                    <div>
                      <h4 className="font-bold text-blue-900 mb-2">Confirming you're ready</h4>
                      <p>Just like a real business owner does one last check before opening day, you'll confirm you're ready before Production Day begins.</p>
                    </div>
                  </div>

                  <button onClick={() => setActiveTab('do')} className="w-full bg-[#0B1F3A] text-white py-4 rounded-xl font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-[#15325A]">
                    Continue to Homework ➔
                  </button>
                </div>
              )}

              {activeWeek === 5 && activeTab === 'do' && (
                <div className="space-y-6">
                  <h3 className="text-xl font-black text-gray-900 mb-4">📝 YOUR HOMEWORK ASSIGNMENT</h3>
                  <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                    <ul className="space-y-4 text-gray-700 font-medium">
                      <li className="flex gap-3"><span className="text-blue-500 font-black">1.</span> Design sign-off — confirm your final design as it will actually be made.</li>
                      <li className="flex gap-3"><span className="text-blue-500 font-black">2.</span> Readiness confirmation — write: "I am ready for Production Day."</li>
                    </ul>
                  </div>
                  <button onClick={() => setActiveTab('check')} className="w-full bg-[#0B1F3A] text-white py-4 rounded-xl font-bold uppercase tracking-wider hover:bg-[#15325A]">
                    Proceed to Check ➔
                  </button>
                </div>
              )}

              {activeWeek === 5 && activeTab === 'check' && (
                <div className="space-y-6">
                  <h3 className="text-xl font-black text-gray-900 mb-4">Review Your Work</h3>
                  <div className="bg-green-50 border border-green-200 p-6 rounded-xl">
                    <p className="text-green-800 font-medium">Before continuing: can you state your exact plan for Production Day — what you're making, and in what order? Can you repeat your top safety reminder from Week 2?</p>
                  </div>
                  <button onClick={() => setActiveTab('sign')} className="w-full bg-[#0B1F3A] text-white py-4 rounded-xl font-bold uppercase tracking-wider hover:bg-[#15325A]">
                    Proceed to Sign-off ➔
                  </button>
                </div>
              )}

              {activeWeek === 5 && activeTab === 'sign' && (
                <div className="space-y-6">
                  <h3 className="text-xl font-black text-gray-900 mb-4">Parent Verification</h3>
                  <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                    <p className="text-gray-700 font-medium italic">Parent discussion prompt: "Ask your child to explain their plan for Production Day, and what they'll do if something goes wrong, like a bubble forming."</p>
                  </div>
                  <button className="w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all bg-green-100 text-green-700 border-2 border-green-500">
                    <CheckCircle2 className="w-5 h-5" /> Parent Sign-off Complete
                  </button>
                  <button onClick={() => { if(onNextPhase) onNextPhase() }} className="w-full mt-6 py-4 rounded-xl font-bold uppercase tracking-wider transition-all bg-[#0B1F3A] text-white shadow-lg hover:-translate-y-1">
                    Unlock Phase 3 (Production)
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
              
  fs.writeFileSync(file, beforeW5 + newW5Content);
  console.log("Successfully updated Week 5 in Preparation.tsx");
} else {
  console.error("Could not find the target sections.");
}

