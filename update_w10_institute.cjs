const fs = require('fs');

const file = 'src/screens/Market.tsx';
let content = fs.readFileSync(file, 'utf8');

// Replace {activeWeek === 10 && activeTab === 'learn' && (
// with {activeWeek === 10 && track === 'primary' && activeTab === 'learn' && (
content = content.replace(
  "{activeWeek === 10 && activeTab === 'learn' && (",
  "{activeWeek === 10 && track === 'primary' && activeTab === 'learn' && ("
);
content = content.replace(
  "{activeWeek === 10 && activeTab === 'do' && (",
  "{activeWeek === 10 && track === 'primary' && activeTab === 'do' && ("
);
content = content.replace(
  "{activeWeek === 10 && activeTab === 'check' && (",
  "{activeWeek === 10 && track === 'primary' && activeTab === 'check' && ("
);
content = content.replace(
  "{activeWeek === 10 && activeTab === 'sign' && (",
  "{activeWeek === 10 && track === 'primary' && activeTab === 'sign' && ("
);

// Now append the institute content right after the primary sign tab ends
const searchStr = `                  </button>
                </div>
              )}`;

const w10PrimarySignIndex = content.indexOf("Unlock Phase 5 (Graduation)");
if (w10PrimarySignIndex !== -1) {
    const w10PrimaryEnd = content.indexOf(")}", w10PrimarySignIndex) + 2;
    
    const beforeEnd = content.substring(0, w10PrimaryEnd);
    const afterEnd = content.substring(w10PrimaryEnd);
    
    const newW10Institute = `
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
`;
    
    fs.writeFileSync(file, beforeEnd + newW10Institute + afterEnd);
    console.log("Successfully appended Institute Week 10 to Market.tsx");
} else {
    console.error("Could not find insertion point.");
}
