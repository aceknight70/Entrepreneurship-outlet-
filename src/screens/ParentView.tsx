import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  CheckCircle, 
  Shield, 
  ShieldCheck, 
  Camera, 
  FileText, 
  Sparkles, 
  Lock, 
  Building, 
  CheckCircle2, 
  Clock, 
  Paperclip,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { SCHOOL_CONFIG } from '../config';
import { 
  bridgeService, 
  BridgeRequest, 
  CURRENT_STUDENT_PROFILE 
} from '../lib/bridgeService';

export function ParentViewScreen({ onBack }: { onBack: () => void }) {
  const profile = CURRENT_STUDENT_PROFILE;

  // Bridge request state
  const [bridgeRequest, setBridgeRequest] = useState<BridgeRequest | null>(null);
  const [loadingBridge, setLoadingBridge] = useState(true);

  // Cooperative membership toggle (demonstrates gated requirement)
  const [isCooperativeMember, setIsCooperativeMember] = useState(true);
  const [parentConfirmedResponsibility, setParentConfirmedResponsibility] = useState(false);
  const [parentSignature, setParentSignature] = useState('');
  const [statusFeedback, setStatusFeedback] = useState<string | null>(null);
  const [showEvidence, setShowEvidence] = useState<'plan' | 'log' | 'sales' | null>(null);

  useEffect(() => {
    fetchBridgeData();
  }, []);

  const fetchBridgeData = async () => {
    setLoadingBridge(true);
    try {
      let req = await bridgeService.getStudentBridgeRequest();
      if (!req) {
        // If not created yet, seed demo request so parent can review child's letter immediately
        req = bridgeService.seedDemoRequest();
      }
      setBridgeRequest(req);
      if (req.parent_letter_signature) {
        setParentSignature(req.parent_letter_signature);
        setParentConfirmedResponsibility(true);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingBridge(false);
    }
  };

  const handleAcknowledge = async () => {
    if (!bridgeRequest) return;
    try {
      const updated = await bridgeService.acknowledgeChildLetter(bridgeRequest.id);
      setBridgeRequest(updated);
      setStatusFeedback('You have acknowledged receipt of Chidinma\'s letter! Step 2 is now unlocked.');
    } catch (err) {
      console.error(err);
    }
  };

  const handleParentSubmitToCoop = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isCooperativeMember) {
      setStatusFeedback('You must be a member of the Parent Cooperative to submit this request.');
      return;
    }
    if (!parentConfirmedResponsibility) {
      setStatusFeedback('Please confirm that you are submitting on your child\'s behalf.');
      return;
    }
    if (parentSignature.trim().toUpperCase() !== profile.parentCode) {
      setStatusFeedback(`Please sign using your Parent Signature Code: ${profile.parentCode}`);
      return;
    }

    try {
      const updated = await bridgeService.submitParentLetter({
        requestId: bridgeRequest?.id || 'req-1',
        parentSignature: profile.parentCode
      });
      setBridgeRequest(updated);
      setStatusFeedback('Funding request submitted! It is now under human review by the Cooperative Committee.');
    } catch (err) {
      console.error(err);
      setStatusFeedback('Failed to submit funding request.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans pb-28">
      {/* Top Header */}
      <div className="bg-[#0B1F3A] pt-12 pb-6 px-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={onBack} className="text-white hover:text-gray-200">
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-2xl font-black text-white tracking-tight uppercase">Parent Portal</h1>
              <p className="text-blue-200 text-sm">{SCHOOL_CONFIG.name} • Student Progress & Welfare</p>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-xl border border-white/20 text-xs text-white">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Parent: {profile.parentName}</span>
          </div>
        </div>
      </div>

      <div className="flex-1 max-w-3xl mx-auto w-full p-4 space-y-6 mt-4">

        {/* FEEDBACK NOTIFICATION */}
        {statusFeedback && (
          <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-blue-900 text-xs font-bold flex items-center justify-between shadow-2xs animate-fadeIn">
            <span>{statusFeedback}</span>
            <button 
              onClick={() => setStatusFeedback(null)}
              className="text-[11px] uppercase font-black px-2 py-0.5 rounded hover:bg-blue-100"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* ========================================================================= */}
        {/* GRAPHITTI BRIDGE MODULE (STEP 1 ACKNOWLEDGMENT & STEP 2 COOPERATIVE FLOW) */}
        {/* ========================================================================= */}
        <div className="bg-white rounded-2xl border-2 border-[#0B1F3A] shadow-md overflow-hidden">
          <div className="bg-gradient-to-r from-[#0B1F3A] to-[#15325A] p-5 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#F5A623] text-[#0B1F3A] text-xs font-black uppercase tracking-wider mb-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>The Graphitti Bridge • Two-Step Capital Pathway</span>
              </div>
              <h2 className="text-lg font-black uppercase tracking-tight text-white">
                Child Letter & Cooperative Funding Request
              </h2>
            </div>
            
            {/* Membership status badge */}
            <div className="flex items-center gap-2">
              <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${
                isCooperativeMember 
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400/40' 
                  : 'bg-amber-500/20 text-amber-300 border-amber-400/40'
              }`}>
                {isCooperativeMember ? '✓ Coop Member' : 'Non-Member'}
              </span>
              <button
                type="button"
                onClick={() => setIsCooperativeMember(!isCooperativeMember)}
                className="text-[10px] uppercase font-bold text-gray-300 underline hover:text-white"
                title="Toggle for demonstration"
              >
                (Toggle)
              </button>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* STEP 1: INCOMING LETTER FROM CHILD */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b pb-2">
                <h3 className="font-black text-sm uppercase tracking-wide text-gray-900 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#0B1F3A] text-white flex items-center justify-center text-xs">
                    1
                  </span>
                  <span>Step 1: Letter from Your Child ({profile.name})</span>
                </h3>
                {bridgeRequest?.parent_acknowledged_at ? (
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                    Receipt Acknowledged
                  </span>
                ) : (
                  <span className="text-xs font-bold text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded animate-pulse">
                    Awaiting Acknowledgment
                  </span>
                )}
              </div>

              {/* Exact Letter Body */}
              <div className="p-5 sm:p-6 bg-amber-50/30 rounded-xl border border-amber-200/80 font-serif text-gray-800 text-xs sm:text-sm space-y-4 leading-relaxed">
                <div className="font-bold text-base text-gray-900 border-b border-amber-200 pb-2 font-sans flex items-center justify-between">
                  <span>A Letter to My Parent — Requesting Support to Grow My Business</span>
                  <span className="text-xs font-normal text-gray-500 font-mono">
                    Signed: {bridgeRequest?.child_letter_signature || profile.studentCode}
                  </span>
                </div>

                <p className="font-semibold text-gray-900">
                  Dear Mum/Dad ({profile.parentName}),
                </p>

                <p>
                  I have finished my Resin Craft training as a Shadow SDG Entrepreneur at{' '}
                  <strong className="text-[#0B1F3A] underline decoration-[#F5A623]">
                    {profile.schoolName}
                  </strong>
                  , and I want to share what I've done, and ask for your help to grow it further.
                </p>

                {/* Auto-filled Market Day Sales Record */}
                <div className="bg-white p-4 rounded-xl border border-gray-200 font-sans not-italic space-y-2 text-xs">
                  <div className="flex justify-between font-bold text-gray-700 border-b pb-1">
                    <span className="uppercase tracking-wider text-[11px] text-gray-500">
                      What I made and sold so far:
                    </span>
                    <span className="text-emerald-700 font-bold">Market Day Verified</span>
                  </div>

                  <div className="space-y-1 divide-y divide-gray-50">
                    {profile.salesRecord.map((sale) => (
                      <div key={sale.id} className="pt-1 flex justify-between">
                        <span className="text-gray-800">{sale.name} ({sale.quantity} units @ ₦{sale.unitPrice})</span>
                        <strong className="text-gray-900">₦{sale.total.toLocaleString()}</strong>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between font-black text-sm text-[#0B1F3A] pt-2 border-t">
                    <span>Total Sales:</span>
                    <span className="text-emerald-700">₦{profile.totalSales.toLocaleString()}</span>
                  </div>
                </div>

                {/* Student's Stated Plan & Amount */}
                <div className="bg-white p-4 rounded-xl border border-blue-200 font-sans not-italic text-xs space-y-2">
                  <p>
                    <strong className="text-[#0B1F3A] uppercase tracking-wider block text-[11px]">
                      What I want to do next:
                    </strong>
                    I want to {bridgeRequest?.plan_text || profile.refinedBusinessPlanSummary.monthlyProductionUnits + ' units of custom earrings'}. To do this, I need{' '}
                    <strong className="text-[#0B1F3A] font-black text-sm bg-amber-100 px-1.5 py-0.5 rounded">
                      ₦{(bridgeRequest?.requested_amount || 15000).toLocaleString()}
                    </strong>.
                  </p>
                </div>

                <p>
                  <strong>Why I think this is worth it:</strong>
                  <br />
                  I've already shown I can make something people actually want to buy, and I know exactly what it costs to make and what I can sell it for. I'm not guessing — I have real numbers from my own business plan to back this up.
                </p>

                <p>
                  I'm asking you to take this to the Parent Cooperative for me, since I'm still too young to apply on my own.
                </p>

                <div className="pt-1">
                  <p className="font-bold">With love,</p>
                  <p className="text-base font-script text-[#0B1F3A]">{profile.name}</p>
                  <p className="text-[11px] font-mono text-gray-500 font-sans">
                    Student Signature Code: {bridgeRequest?.child_letter_signature || profile.studentCode}
                  </p>
                </div>

                {/* Attached Evidence Links */}
                <div className="pt-3 border-t border-amber-200 font-sans not-italic text-xs text-gray-600 space-y-1.5">
                  <span className="font-bold text-gray-800 uppercase tracking-wide flex items-center gap-1.5">
                    <Paperclip className="w-3.5 h-3.5 text-gray-500" />
                    <span>Attached Evidence (Automatically linked from student records):</span>
                  </span>
                  <div className="flex flex-wrap gap-2 pt-1">
                    <button 
                      type="button" 
                      onClick={() => setShowEvidence('plan')} 
                      className="px-2.5 py-1 bg-white hover:bg-gray-100 rounded-lg border text-blue-700 font-bold text-[11px] flex items-center gap-1"
                    >
                      <span>Refined Business Plan (45.5% Margin)</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                    <button 
                      type="button" 
                      onClick={() => setShowEvidence('log')} 
                      className="px-2.5 py-1 bg-white hover:bg-gray-100 rounded-lg border text-blue-700 font-bold text-[11px] flex items-center gap-1"
                    >
                      <span>Production Log (Batch #3, 0% Defect)</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                    <button 
                      type="button" 
                      onClick={() => setShowEvidence('sales')} 
                      className="px-2.5 py-1 bg-white hover:bg-gray-100 rounded-lg border text-blue-700 font-bold text-[11px] flex items-center gap-1"
                    >
                      <span>Market Day Sales Receipts</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Action: Acknowledge Receipt */}
              {!bridgeRequest?.parent_acknowledged_at ? (
                <div className="p-4 bg-amber-50 rounded-xl border border-[#F5A623] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h4 className="font-black text-gray-900 text-xs uppercase">
                      Confirm Receipt of Child's Letter
                    </h4>
                    <p className="text-xs text-gray-600 mt-0.5">
                      Acknowledging this letter unlocks your parent submission form for the Day Spring Parent Cooperative.
                    </p>
                  </div>
                  <button
                    onClick={handleAcknowledge}
                    className="bg-[#0B1F3A] hover:bg-[#15325A] text-white px-5 py-2.5 rounded-xl font-black text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 shadow-sm shrink-0"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#F5A623]" />
                    <span>Acknowledge Receipt</span>
                  </button>
                </div>
              ) : (
                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>
                    Receipt acknowledged on {new Date(bridgeRequest.parent_acknowledged_at).toLocaleDateString()} at {new Date(bridgeRequest.parent_acknowledged_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}.
                  </span>
                </div>
              )}
            </div>

            {/* =================================================================== */}
            {/* STEP 2: PARENT'S LETTER TO COOPERATIVE (GATED TO COOP MEMBERS ONLY) */}
            {/* =================================================================== */}
            <div className="space-y-4 pt-4 border-t-2 border-gray-100">
              <div className="flex items-center justify-between border-b pb-2">
                <h3 className="font-black text-sm uppercase tracking-wide text-gray-900 flex items-center gap-2">
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black ${
                    bridgeRequest?.parent_acknowledged_at ? 'bg-purple-800 text-white' : 'bg-gray-200 text-gray-400'
                  }`}>
                    2
                  </span>
                  <span>Step 2: Parent's Funding Request to Cooperative</span>
                </h3>
                {bridgeRequest?.status === 'submitted' ? (
                  <span className="text-xs font-bold text-purple-800 bg-purple-100 px-2.5 py-0.5 rounded flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-purple-700" />
                    Under Committee Review
                  </span>
                ) : bridgeRequest?.parent_acknowledged_at ? (
                  <span className="text-xs font-bold text-blue-800 bg-blue-100 px-2.5 py-0.5 rounded">
                    Unlocked for Parent
                  </span>
                ) : (
                  <span className="text-xs font-bold text-gray-400 bg-gray-100 px-2.5 py-0.5 rounded">
                    Locked (Step 1 Needed)
                  </span>
                )}
              </div>

              {!bridgeRequest?.parent_acknowledged_at ? (
                /* Step 1 Lock Banner */
                <div className="p-6 bg-gray-50 rounded-xl border border-dashed border-gray-300 text-center space-y-2">
                  <Lock className="w-8 h-8 text-gray-400 mx-auto" />
                  <h4 className="font-bold text-xs uppercase text-gray-700">Step 2 Locked</h4>
                  <p className="text-xs text-gray-500 max-w-sm mx-auto">
                    Please acknowledge receipt of your child's letter in Step 1 above to reveal the Cooperative funding request form.
                  </p>
                </div>
              ) : !isCooperativeMember ? (
                /* GATED ELIGIBILITY REQUIREMENT: Direct non-members to join cooperative first */
                <div className="p-6 bg-amber-50 rounded-xl border-2 border-amber-300 space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-xl bg-amber-100 text-amber-800 shrink-0">
                      <Lock className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-black text-gray-900 text-sm uppercase">
                        Cooperative Membership Required
                      </h4>
                      <p className="text-xs text-gray-700 mt-1 leading-relaxed">
                        Only parents who are registered members of the <strong>Day Spring Parent Cooperative</strong> can access this step to submit a funding request on behalf of their child.
                      </p>
                    </div>
                  </div>
                  
                  <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                    <button
                      onClick={() => setIsCooperativeMember(true)}
                      className="w-full sm:w-auto bg-[#0B1F3A] hover:bg-[#15325A] text-white font-bold text-xs uppercase px-5 py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2"
                    >
                      <Building className="w-4 h-4 text-[#F5A623]" />
                      <span>Join Day Spring Parent Cooperative</span>
                    </button>
                    <span className="text-[11px] text-gray-500 italic">
                      Contact school office or tap above to register.
                    </span>
                  </div>
                </div>
              ) : (
                /* The Parent Funding Request Template */
                <div className="bg-purple-50/30 rounded-xl border border-purple-200 p-5 sm:p-6 space-y-5">
                  <div className="p-4 bg-white rounded-xl border border-gray-200 text-xs font-sans space-y-1 shadow-2xs">
                    <p>
                      <strong className="text-gray-500 uppercase">From:</strong>{' '}
                      <span className="font-bold text-gray-900">{profile.parentName}</span>, Cooperative Member
                    </p>
                    <p>
                      <strong className="text-gray-500 uppercase">On behalf of:</strong>{' '}
                      <span className="font-bold text-gray-900">{profile.name}</span>, {profile.schoolName} Shadow SDG Entrepreneur
                    </p>
                  </div>

                  <div className="font-serif text-xs sm:text-sm text-gray-800 space-y-4 leading-relaxed">
                    <p className="font-bold text-base text-gray-900">
                      Dear Cooperative Committee,
                    </p>

                    <p>
                      My child completed the full Shadow SDG Entrepreneurship programme and has already produced real sales as evidence:
                    </p>

                    {/* Auto-filled sales summary */}
                    <div className="p-3.5 bg-white rounded-lg border border-gray-200 font-sans text-xs space-y-1.5">
                      <div className="flex justify-between font-bold text-gray-700 border-b pb-1">
                        <span>Sales Summary:</span>
                        <span className="text-emerald-700">Verified by Supervising Teacher</span>
                      </div>
                      {profile.salesRecord.map((s) => (
                        <div key={s.id} className="flex justify-between text-gray-600">
                          <span>{s.name} ({s.quantity} sold)</span>
                          <span className="font-semibold text-gray-900">₦{s.total.toLocaleString()}</span>
                        </div>
                      ))}
                      <div className="flex justify-between font-black text-sm text-[#0B1F3A] pt-1 border-t">
                        <span>Total:</span>
                        <span>₦{profile.totalSales.toLocaleString()}</span>
                      </div>
                    </div>

                    <p>
                      Based on this record, I am requesting{' '}
                      <strong className="text-purple-900 bg-purple-100 px-2 py-0.5 rounded font-sans">
                        ₦{(bridgeRequest?.requested_amount || 15000).toLocaleString()}
                      </strong>{' '}
                      in startup capital on my child's behalf, to be used for{' '}
                      <strong className="text-gray-900 font-sans bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                        {bridgeRequest?.plan_text || 'expanding resin jewellery production'}
                      </strong>
                      . I understand I am the responsible party for this request.
                    </p>

                    <div className="pt-2">
                      <p className="font-bold">Signed,</p>
                      <p className="text-base font-script text-[#0B1F3A]">{profile.parentName}</p>
                      <p className="text-[11px] font-mono text-gray-500 font-sans">
                        Parent Signature Code: {profile.parentCode}
                      </p>
                    </div>

                    <div className="p-3 bg-gray-50 rounded-lg border text-xs text-gray-600 font-sans space-y-0.5">
                      <p className="font-bold text-gray-800 uppercase tracking-wide">
                        Supporting evidence attached:
                      </p>
                      <p>
                        Child's Refined Business Plan, Production Log, Market Day sales record, and the child's original letter from Step 1.
                      </p>
                    </div>
                  </div>

                  {/* Submission Status or Form */}
                  {bridgeRequest?.status === 'submitted' ? (
                    <div className="p-5 bg-purple-100/70 border border-purple-300 rounded-xl space-y-2 text-center">
                      <CheckCircle2 className="w-8 h-8 text-purple-700 mx-auto" />
                      <h4 className="font-black text-purple-900 uppercase text-sm">
                        Funding Request Submitted to Cooperative Committee
                      </h4>
                      <p className="text-xs text-purple-800 leading-relaxed max-w-md mx-auto">
                        This request is now queued for <strong>human review</strong> by the Cooperative Committee. Funds are not automatically released; the committee evaluates each young entrepreneur's sales record and business plan.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleParentSubmitToCoop} className="space-y-4 pt-2">
                      <div className="p-3 bg-white rounded-xl border border-gray-200 flex items-start gap-2.5">
                        <input
                          type="checkbox"
                          id="parent-agree-guarantor"
                          checked={parentConfirmedResponsibility}
                          onChange={(e) => setParentConfirmedResponsibility(e.target.checked)}
                          className="mt-1 w-4 h-4 text-[#0B1F3A] rounded border-gray-300 focus:ring-[#F5A623] cursor-pointer"
                        />
                        <label htmlFor="parent-agree-guarantor" className="text-xs text-gray-700 leading-relaxed cursor-pointer font-medium">
                          I confirm that I am submitting this request on my child's behalf, and I understand I am the responsible party for this request.
                        </label>
                      </div>

                      <div className="p-3 bg-white rounded-xl border border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div>
                          <label className="text-xs font-black uppercase text-gray-700 block">
                            Parent Signature Code
                          </label>
                          <p className="text-xs text-gray-500">
                            Type: <span className="font-mono font-bold text-[#0B1F3A]">{profile.parentCode}</span>
                          </p>
                        </div>
                        <input
                          type="text"
                          value={parentSignature}
                          onChange={(e) => setParentSignature(e.target.value.toUpperCase())}
                          placeholder={`Type ${profile.parentCode}`}
                          className="font-mono text-sm px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0B1F3A] uppercase text-center"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={!parentConfirmedResponsibility}
                        className={`w-full py-3.5 rounded-xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md ${
                          parentConfirmedResponsibility
                            ? 'bg-purple-700 hover:bg-purple-800 text-white cursor-pointer'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed shadow-none'
                        }`}
                      >
                        <Building className="w-4 h-4" />
                        <span>Submit Funding Request to Cooperative Committee</span>
                      </button>
                    </form>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* EXISTING PARENT PORTAL CONTENT (CHILD PROGRESS, FEES & CONSENTS)         */}
        {/* ========================================================================= */}
        
        {/* Child Progress Card */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-black text-gray-900 uppercase">Child Progress</h2>
            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold uppercase">Graduated</span>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900">Phase 1: Knowledge</h3>
                <p className="text-sm text-gray-500">Completed 100%</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900">Phase 2: Preparation</h3>
                <p className="text-sm text-gray-500">Completed 100%</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-purple-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900">Phase 5: Market Day & Graduation</h3>
                <p className="text-sm text-gray-500">Completed 100% • ₦2,300 Revenue</p>
              </div>
            </div>
          </div>
        </div>

        {/* Programme & Kit Investment Breakdown */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-black text-gray-900 uppercase">Programme & Kit Investment Breakdown</h2>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              Verified Enrolment
            </span>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200 text-xs">
              <div>
                <p className="font-bold text-gray-900">Entrepreneurship Training Fee</p>
                <p className="text-gray-500">11-Week SDG business mentorship and curriculum</p>
              </div>
              <span className="font-bold text-gray-700">Tuition Split</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200 text-xs">
              <div>
                <p className="font-bold text-gray-900">Student Starter Craft Kit</p>
                <p className="text-gray-500">Silicone moulds, clear epoxy resin, hardener, pigments, drill findings</p>
              </div>
              <span className="font-bold text-gray-700">Craft Asset Kit</span>
            </div>

            {/* Explicit Safety Fee Line */}
            <div className="p-4 bg-amber-50 rounded-xl border-2 border-[#F5A623] text-xs space-y-1.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#F5A623]" />
                  <span className="font-black text-gray-900 text-sm">
                    Safety & Materials Handling — ₦500/student
                  </span>
                </div>
                <span className="bg-[#F5A623] text-[#0B1F3A] font-black px-2.5 py-0.5 rounded text-xs">
                  ₦500
                </span>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Covers <strong>group safety coverage for the programme</strong>: certified nitrile gloves, organic vapour filtration masks, splash aprons, silicone work mats, workshop cross-ventilation oversight, and compliant resin curing and waste disposal throughout all 11 weeks.
              </p>
            </div>
          </div>
        </div>

        {/* Parental Consents & Agreements */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-black text-gray-900 uppercase">Parental Consents & Agreements</h2>
            <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
              Recorded at Enrolment
            </span>
          </div>

          <div className="space-y-3">
            <div className="p-4 bg-emerald-50/70 border border-emerald-300 rounded-xl space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span className="font-bold text-gray-900 text-xs uppercase tracking-wide">
                    1. Safety & Materials Consent
                  </span>
                </div>
                <span className="text-[11px] font-black text-emerald-800 bg-white px-2 py-0.5 rounded border border-emerald-200">
                  Signed & Active
                </span>
              </div>
              <p className="text-xs text-gray-700 italic leading-relaxed">
                "I consent to my child handling resin and related materials as part of this programme, and confirm I have disclosed any known allergies or sensitivities relevant to this training."
              </p>
            </div>

            <div className="p-4 bg-emerald-50/70 border border-emerald-300 rounded-xl space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Camera className="w-4 h-4 text-emerald-600" />
                  <span className="font-bold text-gray-900 text-xs uppercase tracking-wide">
                    2. Image & Media Consent (Separate Item)
                  </span>
                </div>
                <span className="text-[11px] font-black text-emerald-800 bg-white px-2 py-0.5 rounded border border-emerald-200">
                  Signed & Active
                </span>
              </div>
              <p className="text-xs text-gray-700 italic leading-relaxed">
                "I consent to my child being photographed/filmed during this programme, for use in school prospectuses, promotional materials, and Market Day coverage."
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* Evidence preview popup */}
      {showEvidence && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b pb-2">
              <h4 className="font-black text-sm uppercase text-gray-900">
                {showEvidence === 'plan' && 'Refined Business Plan (Week 11)'}
                {showEvidence === 'log' && 'Production Log (Batch #3)'}
                {showEvidence === 'sales' && 'Market Day Sales Receipts'}
              </h4>
              <button onClick={() => setShowEvidence(null)} className="text-gray-400 font-bold hover:text-gray-600">✕</button>
            </div>
            <div className="text-xs text-gray-700 space-y-2">
              {showEvidence === 'plan' && (
                <>
                  <p><strong>Target Unit Margin:</strong> 45.5% (Base cost: ₦16, Selling: ₦35)</p>
                  <p><strong>Monthly Capacity:</strong> 40 units</p>
                  <p><strong>Breakeven:</strong> 8 units</p>
                </>
              )}
              {showEvidence === 'log' && (
                <>
                  <p><strong>Batch:</strong> Batch #3 (Week 7-8)</p>
                  <p><strong>Syringe Accuracy:</strong> 45ml resin/hardener mixed 2:1</p>
                  <p><strong>Defect Rate:</strong> 0% (Clean cure, zero bubbles)</p>
                </>
              )}
              {showEvidence === 'sales' && (
                <div className="space-y-1">
                  <p>Swirl Resin Beads: ₦500</p>
                  <p>Gold Leaf Earrings: ₦700</p>
                  <p>Polished Mica Pendant: ₦500</p>
                  <p>Hexagonal Keyholders: ₦600</p>
                  <p className="font-bold text-[#0B1F3A] pt-1 border-t">Total: ₦2,300</p>
                </div>
              )}
            </div>
            <div className="pt-2 text-right">
              <button 
                onClick={() => setShowEvidence(null)} 
                className="bg-[#0B1F3A] text-white px-4 py-2 rounded-lg text-xs font-bold uppercase"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
