import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Send, 
  CheckCircle2, 
  FileText, 
  TrendingUp, 
  Layers, 
  Award, 
  ShieldCheck, 
  Clock, 
  AlertCircle, 
  Building, 
  Lock, 
  UserCheck, 
  Paperclip, 
  ChevronRight,
  Sparkles,
  ExternalLink,
  Coins
} from 'lucide-react';
import { 
  bridgeService, 
  BridgeRequest, 
  CURRENT_STUDENT_PROFILE 
} from '../lib/bridgeService';
import { SCHOOL_CONFIG } from '../config';
import { DiagonalBanner } from '../components/Layout';

interface GraphittiBridgeProps {
  onBack: () => void;
  onNavigateParentView?: () => void;
  onNavigateAdminView?: () => void;
}

export function GraphittiBridgeScreen({ onBack, onNavigateParentView, onNavigateAdminView }: GraphittiBridgeProps) {
  const profile = CURRENT_STUDENT_PROFILE;

  // View state within the bridge module:
  // 'step1_child' | 'step2_parent' | 'view_submitted'
  const [activeStep, setActiveStep] = useState<'step1_child' | 'step2_parent' | 'preview'>('step1_child');

  // Step 1: Child inputs
  const [planText, setPlanText] = useState(
    'purchase a bulk 1kg epoxy pack and a 6-cavity geometric silicone mould so I can produce 50 wholesale earring and pendant sets for the upcoming Christmas exhibition and school store orders'
  );
  const [requestedAmount, setRequestedAmount] = useState('15000');
  const [studentSignature, setStudentSignature] = useState('');
  const [childSubmitted, setChildSubmitted] = useState(false);
  const [currentRequest, setCurrentRequest] = useState<BridgeRequest | null>(null);

  // Step 2: Parent inputs & Cooperative state
  const [isCooperativeMember, setIsCooperativeMember] = useState(true);
  const [parentConfirmedResponsibility, setParentConfirmedResponsibility] = useState(false);
  const [parentSignature, setParentSignature] = useState('');
  const [parentSubmitted, setParentSubmitted] = useState(false);

  // Evidence modal or drawer
  const [activeEvidenceModal, setActiveEvidenceModal] = useState<'plan' | 'log' | 'sales' | null>(null);

  // Status feedback
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'info' | 'error'; text: string } | null>(null);

  useEffect(() => {
    loadRequest();
  }, []);

  const loadRequest = async () => {
    try {
      const req = await bridgeService.getStudentBridgeRequest();
      if (req) {
        setCurrentRequest(req);
        if (req.plan_text) setPlanText(req.plan_text);
        if (req.requested_amount) setRequestedAmount(String(req.requested_amount));
        if (req.child_letter_signature) {
          setStudentSignature(req.child_letter_signature);
          setChildSubmitted(true);
        }
        if (req.parent_letter_signature) {
          setParentSignature(req.parent_letter_signature);
          setParentSubmitted(true);
          setParentConfirmedResponsibility(true);
        }
      }
    } catch (err) {
      console.error('Failed to load bridge request:', err);
    }
  };

  // Student submits letter to parent
  const handleChildSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!planText.trim()) {
      setStatusMessage({ type: 'error', text: 'Please fill in your specific plan for what you want to do next.' });
      return;
    }
    const amt = parseFloat(requestedAmount);
    if (isNaN(amt) || amt <= 0) {
      setStatusMessage({ type: 'error', text: 'Please enter a valid amount (₦) you are requesting.' });
      return;
    }
    if (studentSignature.trim().toUpperCase() !== profile.studentCode) {
      setStatusMessage({ 
        type: 'error', 
        text: `Please sign using your official Student Signature Code: ${profile.studentCode}` 
      });
      return;
    }

    try {
      const req = await bridgeService.submitChildLetter({
        planText: planText.trim(),
        requestedAmount: amt,
        signature: profile.studentCode
      });
      setCurrentRequest(req);
      setChildSubmitted(true);
      setStatusMessage({ 
        type: 'success', 
        text: 'Step 1 Complete! Your letter has been sent to your parent. It is now awaiting acknowledgment in Parent View.' 
      });
    } catch (err: any) {
      console.error(err);
      setStatusMessage({ type: 'error', text: 'Failed to submit letter. Please try again.' });
    }
  };

  // Parent acknowledges letter
  const handleParentAcknowledge = async () => {
    if (!currentRequest) return;
    try {
      const updated = await bridgeService.acknowledgeChildLetter(currentRequest.id);
      setCurrentRequest(updated);
      setStatusMessage({ 
        type: 'success', 
        text: 'Letter acknowledged! Step 2: Parent Funding Request to Cooperative is now unlocked.' 
      });
      setActiveStep('step2_parent');
    } catch (err) {
      console.error(err);
    }
  };

  // Parent submits letter to Cooperative
  const handleParentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isCooperativeMember) {
      setStatusMessage({ 
        type: 'error', 
        text: 'You must be a member of the Parent Cooperative to submit this request.' 
      });
      return;
    }
    if (!parentConfirmedResponsibility) {
      setStatusMessage({ 
        type: 'error', 
        text: 'Please confirm that you are submitting on your child\'s behalf.' 
      });
      return;
    }
    if (parentSignature.trim().toUpperCase() !== profile.parentCode) {
      setStatusMessage({ 
        type: 'error', 
        text: `Please sign using your Parent Signature Code: ${profile.parentCode}` 
      });
      return;
    }

    try {
      const updated = await bridgeService.submitParentLetter({
        requestId: currentRequest?.id || 'demo-req',
        parentSignature: profile.parentCode
      });
      setCurrentRequest(updated);
      setParentSubmitted(true);
      setStatusMessage({ 
        type: 'success', 
        text: 'Funding request submitted! It is now queued for human review by the Cooperative Committee.' 
      });
    } catch (err: any) {
      console.error(err);
      setStatusMessage({ type: 'error', text: 'Failed to submit request to Cooperative.' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans pb-28">
      <DiagonalBanner />

      {/* Header */}
      <header className="relative z-10 max-w-5xl mx-auto w-full pt-16 px-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <button 
            onClick={onBack}
            className="inline-flex items-center gap-2 text-white/90 hover:text-white transition-colors font-black text-xs uppercase tracking-wider bg-white/10 px-3.5 py-2 rounded-xl border border-white/20 w-fit"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Graduation
          </button>

          {/* Quick Perspective Switcher for Testing/Demonstration */}
          <div className="flex items-center gap-2 bg-[#0B1F3A]/90 backdrop-blur-xs p-1.5 rounded-xl border border-white/20 text-xs">
            <span className="text-gray-300 font-bold px-2 hidden sm:inline">Active View:</span>
            <button
              onClick={() => setActiveStep('step1_child')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                activeStep === 'step1_child'
                  ? 'bg-[#F5A623] text-[#0B1F3A] shadow-xs'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              1. Child's Letter
            </button>
            <button
              onClick={() => setActiveStep('step2_parent')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                activeStep === 'step2_parent'
                  ? 'bg-[#F5A623] text-[#0B1F3A] shadow-xs'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              2. Parent to Cooperative
            </button>
          </div>
        </div>

        <div className="mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F5A623]/20 text-[#F5A623] text-xs font-black uppercase tracking-wider mb-2 border border-[#F5A623]/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Post-Graduation Milestone • Week 11 Unlocked</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight uppercase">
            The Graphitti Bridge
          </h1>
          <p className="text-blue-100 font-medium max-w-2xl text-sm sm:text-base leading-relaxed mt-1">
            Two-step capital pathway connecting student market traction directly to the Day Spring Parent Cooperative for seed startup funding.
          </p>
        </div>

        {/* Status Tracker */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-gray-200 mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-bold">
            {/* Step 1 indicator */}
            <div className={`p-3 rounded-xl border flex items-center gap-3 ${
              childSubmitted 
                ? 'bg-emerald-50 border-emerald-300 text-emerald-900' 
                : 'bg-amber-50 border-[#F5A623] text-amber-900'
            }`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black ${
                childSubmitted ? 'bg-emerald-600 text-white' : 'bg-[#F5A623] text-[#0B1F3A]'
              }`}>
                {childSubmitted ? <CheckCircle2 className="w-4 h-4" /> : '1'}
              </div>
              <div>
                <p className="uppercase text-[11px] text-gray-500">Step 1</p>
                <p className="font-black text-sm">Child Writes to Parent</p>
                <span className="text-[11px] font-medium">
                  {childSubmitted ? 'Submitted to Parent' : 'Fill 2 fields & sign'}
                </span>
              </div>
            </div>

            {/* Step 2 indicator */}
            <div className={`p-3 rounded-xl border flex items-center gap-3 ${
              currentRequest?.parent_acknowledged_at
                ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                : childSubmitted
                ? 'bg-blue-50 border-blue-300 text-blue-900'
                : 'bg-gray-50 border-gray-200 text-gray-400'
            }`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black ${
                currentRequest?.parent_acknowledged_at
                  ? 'bg-emerald-600 text-white'
                  : childSubmitted
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-500'
              }`}>
                {currentRequest?.parent_acknowledged_at ? <CheckCircle2 className="w-4 h-4" /> : '2'}
              </div>
              <div>
                <p className="uppercase text-[11px] text-gray-500">Parent Step</p>
                <p className="font-black text-sm">Parent Acknowledgment</p>
                <span className="text-[11px] font-medium">
                  {currentRequest?.parent_acknowledged_at ? 'Acknowledged' : childSubmitted ? 'Awaiting Parent' : 'Locked'}
                </span>
              </div>
            </div>

            {/* Step 3 indicator */}
            <div className={`p-3 rounded-xl border flex items-center gap-3 ${
              parentSubmitted
                ? 'bg-purple-50 border-purple-300 text-purple-900'
                : currentRequest?.parent_acknowledged_at
                ? 'bg-amber-50 border-[#F5A623] text-amber-900'
                : 'bg-gray-50 border-gray-200 text-gray-400'
            }`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black ${
                parentSubmitted
                  ? 'bg-purple-600 text-white'
                  : currentRequest?.parent_acknowledged_at
                  ? 'bg-[#F5A623] text-[#0B1F3A]'
                  : 'bg-gray-200 text-gray-500'
              }`}>
                {parentSubmitted ? <CheckCircle2 className="w-4 h-4" /> : '3'}
              </div>
              <div>
                <p className="uppercase text-[11px] text-gray-500">Step 2</p>
                <p className="font-black text-sm">Parent to Cooperative</p>
                <span className="text-[11px] font-medium">
                  {parentSubmitted ? 'Under Committee Review' : currentRequest?.parent_acknowledged_at ? 'Coop Member Gated' : 'Locked'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Status Alerts */}
        {statusMessage && (
          <div className={`mb-6 p-4 rounded-xl text-sm font-bold flex items-center justify-between shadow-sm animate-fadeIn ${
            statusMessage.type === 'success' 
              ? 'bg-emerald-50 text-emerald-900 border border-emerald-200' 
              : statusMessage.type === 'error'
              ? 'bg-red-50 text-red-900 border border-red-200'
              : 'bg-blue-50 text-blue-900 border border-blue-200'
          }`}>
            <span>{statusMessage.text}</span>
            <button onClick={() => setStatusMessage(null)} className="text-xs uppercase font-extrabold hover:bg-black/5 px-2 py-0.5 rounded">
              Dismiss
            </button>
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 max-w-5xl mx-auto w-full px-4 space-y-8">
        
        {/* ========================================================= */}
        {/* STEP 1 — CHILD'S LETTER TO PARENT                         */}
        {/* ========================================================= */}
        {activeStep === 'step1_child' && (
          <section className="space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-[#0B1F3A] to-[#15325A] p-6 text-white flex items-center justify-between">
                <div>
                  <span className="text-xs font-black uppercase tracking-wider text-[#F5A623]">
                    Step 1 of 2
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight">
                    A Letter to My Parent — Requesting Support to Grow My Business
                  </h2>
                  <p className="text-blue-100 text-xs sm:text-sm mt-1">
                    Fill in your plan and amount. All your verified sales and production records attach automatically.
                  </p>
                </div>
                <div className="p-3 bg-white/10 rounded-2xl hidden sm:block">
                  <FileText className="w-8 h-8 text-[#F5A623]" />
                </div>
              </div>

              {/* The Official Letter Body */}
              <div className="p-6 sm:p-8 space-y-6 text-gray-800 text-sm sm:text-base leading-relaxed font-serif bg-amber-50/20 border-b">
                <p className="font-bold text-gray-900 text-lg">
                  Dear Mum/Dad ({profile.parentName}),
                </p>

                <p>
                  I have finished my Resin Craft training as a Shadow SDG Entrepreneur at{' '}
                  <strong className="text-[#0B1F3A] underline decoration-[#F5A623] decoration-2">
                    {profile.schoolName}
                  </strong>
                  , and I want to share what I've done, and ask for your help to grow it further.
                </p>

                {/* Auto-filled Market Day Sales */}
                <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-2xs font-sans not-italic space-y-3">
                  <div className="flex items-center justify-between border-b pb-2">
                    <span className="text-xs font-black uppercase tracking-wider text-gray-500">
                      What I made and sold so far (Auto-filled from Market Day Sales Record):
                    </span>
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                      Verified Traction
                    </span>
                  </div>

                  <div className="divide-y divide-gray-100 text-xs">
                    {profile.salesRecord.map((sale) => (
                      <div key={sale.id} className="py-2 flex items-center justify-between">
                        <div>
                          <span className="font-bold text-gray-900">{sale.name}</span>
                          <span className="text-gray-500 ml-2">({sale.quantity} units @ ₦{sale.unitPrice})</span>
                        </div>
                        <span className="font-black text-gray-900">₦{sale.total.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t font-black text-sm text-[#0B1F3A]">
                    <span>Total Sales Generated:</span>
                    <span className="text-base text-emerald-700 bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-200">
                      ₦{profile.totalSales.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* The Two Student Inputs (Plan & Amount) */}
                <div className="font-sans not-italic space-y-4 bg-white p-6 rounded-xl border-2 border-[#0B1F3A]/20 shadow-xs">
                  <div className="flex items-center gap-2 text-xs font-black uppercase text-[#0B1F3A]">
                    <span className="w-5 h-5 rounded-full bg-[#0B1F3A] text-white flex items-center justify-center text-[10px]">
                      ✍️
                    </span>
                    <span>Student Input Section (Only 2 Fields to Complete)</span>
                  </div>

                  {/* Input 1: Plan */}
                  <div className="space-y-1">
                    <label className="block text-xs font-bold uppercase text-gray-700">
                      What I want to do next (Your specific plan): <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      value={planText}
                      onChange={(e) => setPlanText(e.target.value)}
                      disabled={childSubmitted}
                      rows={3}
                      placeholder="e.g. purchase a bulk 1kg epoxy pack and a 6-cavity geometric silicone mould so I can produce 50 wholesale earring sets for the upcoming Christmas exhibition..."
                      className="w-full text-sm p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0B1F3A] bg-gray-50/50 disabled:bg-gray-100 disabled:cursor-not-allowed"
                    />
                  </div>

                  {/* Input 2: Amount Requested */}
                  <div className="space-y-1">
                    <label className="block text-xs font-bold uppercase text-gray-700">
                      Amount Requested (₦): <span className="text-red-500">*</span>
                    </label>
                    <div className="relative max-w-xs">
                      <span className="absolute left-3.5 top-2.5 text-gray-500 font-black">₦</span>
                      <input
                        type="number"
                        value={requestedAmount}
                        onChange={(e) => setRequestedAmount(e.target.value)}
                        disabled={childSubmitted}
                        placeholder="15000"
                        className="w-full text-sm pl-8 pr-3 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0B1F3A] font-black text-gray-900 disabled:bg-gray-100"
                      />
                    </div>
                  </div>
                </div>

                <p>
                  <strong>Why I think this is worth it:</strong>
                  <br />
                  I've already shown I can make something people actually want to buy, and I know exactly what it costs to make and what I can sell it for. I'm not guessing — I have real numbers from my own business plan to back this up.
                </p>

                <p>
                  I'm asking you to take this to the Parent Cooperative for me, since I'm still too young to apply on my own.
                </p>

                <div className="pt-2">
                  <p className="font-bold">With love,</p>
                  <p className="text-lg font-script text-[#0B1F3A]">{profile.name}</p>
                </div>
              </div>

              {/* Automatic Attachments Bar */}
              <div className="bg-gray-50 p-6 border-b space-y-3">
                <span className="text-xs font-black uppercase text-gray-600 tracking-wider flex items-center gap-1.5">
                  <Paperclip className="w-3.5 h-3.5 text-gray-500" />
                  <span>Automatic Attachments (Linked from student portfolio — no re-upload needed)</span>
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setActiveEvidenceModal('plan')}
                    className="p-3 bg-white rounded-xl border border-gray-200 hover:border-[#0B1F3A] text-left transition-all shadow-2xs group flex items-center justify-between"
                  >
                    <div>
                      <p className="font-bold text-xs text-gray-900 group-hover:text-blue-600">
                        📄 Refined Business Plan
                      </p>
                      <p className="text-[11px] text-gray-500 mt-0.5">Margins: 45.5% • Unit Cost: ₦16</p>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-gray-400 group-hover:text-blue-600" />
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveEvidenceModal('log')}
                    className="p-3 bg-white rounded-xl border border-gray-200 hover:border-[#0B1F3A] text-left transition-all shadow-2xs group flex items-center justify-between"
                  >
                    <div>
                      <p className="font-bold text-xs text-gray-900 group-hover:text-blue-600">
                        🔬 Production Log
                      </p>
                      <p className="text-[11px] text-gray-500 mt-0.5">Batch #3 • 0% Defect Rate</p>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-gray-400 group-hover:text-blue-600" />
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveEvidenceModal('sales')}
                    className="p-3 bg-white rounded-xl border border-gray-200 hover:border-[#0B1F3A] text-left transition-all shadow-2xs group flex items-center justify-between"
                  >
                    <div>
                      <p className="font-bold text-xs text-gray-900 group-hover:text-blue-600">
                        🛍️ Market Day Sales Record
                      </p>
                      <p className="text-[11px] text-gray-500 mt-0.5">4 Products • ₦2,300 Revenue</p>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-gray-400 group-hover:text-blue-600" />
                  </button>
                </div>
              </div>

              {/* Student Signature & Submission Action */}
              <div className="p-6 bg-white">
                {childSubmitted ? (
                  <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-emerald-600 text-white rounded-full flex items-center justify-center font-black">
                        <CheckCircle2 className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-black text-emerald-900 uppercase text-sm">
                          Letter Submitted to Parent
                        </h4>
                        <p className="text-xs text-emerald-700">
                          Signed by {profile.name} with code <code className="font-mono font-bold">{profile.studentCode}</code>.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setActiveStep('step2_parent')}
                        className="bg-[#0B1F3A] hover:bg-[#15325A] text-white px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-1.5"
                      >
                        <span>Open Parent View to Acknowledge</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleChildSubmit} className="space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-gray-50 p-4 rounded-xl border border-gray-200">
                      <div>
                        <label className="text-xs font-black uppercase text-gray-700 block">
                          Student Signature Code
                        </label>
                        <p className="text-xs text-gray-500">
                          Type your code to sign: <span className="font-mono font-bold text-[#0B1F3A]">{profile.studentCode}</span>
                        </p>
                      </div>
                      <input
                        type="text"
                        value={studentSignature}
                        onChange={(e) => setStudentSignature(e.target.value.toUpperCase())}
                        placeholder={`Type ${profile.studentCode}`}
                        className="font-mono text-sm px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0B1F3A] uppercase text-center"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-[#F5A623] hover:bg-[#e0961b] text-[#0B1F3A] py-4 rounded-xl font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
                    >
                      <Send className="w-4 h-4" />
                      <span>Send Letter to Parent (Mum/Dad)</span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </section>
        )}

        {/* ========================================================= */}
        {/* STEP 2 — PARENT'S LETTER TO COOPERATIVE                   */}
        {/* ========================================================= */}
        {activeStep === 'step2_parent' && (
          <section className="space-y-6">
            {/* Step 1 Acknowledgment Guard */}
            {!currentRequest?.parent_acknowledged_at && (
              <div className="bg-amber-50 border-2 border-[#F5A623] rounded-2xl p-6 shadow-sm space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-[#F5A623] text-[#0B1F3A]">
                      <Clock className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-base font-black uppercase text-gray-900">
                        Action Required: Acknowledge Child's Letter
                      </h3>
                      <p className="text-xs text-gray-600 mt-0.5">
                        Your child, <strong>{profile.name}</strong>, has submitted their request for ₦{Number(requestedAmount).toLocaleString()} with their full Market Day sales record.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                  <button
                    onClick={handleParentAcknowledge}
                    className="w-full sm:w-auto bg-[#0B1F3A] hover:bg-[#15325A] text-white px-6 py-3 rounded-xl font-black text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 shadow-sm"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#F5A623]" />
                    <span>Acknowledge Receipt of Child's Letter</span>
                  </button>
                  <button
                    onClick={() => setActiveStep('step1_child')}
                    className="w-full sm:w-auto text-xs font-bold text-gray-600 hover:text-gray-900 px-4 py-3"
                  >
                    Review Child's Original Letter
                  </button>
                </div>
              </div>
            )}

            {/* Gated Eligibility Requirement: Parent Cooperative Membership */}
            {currentRequest?.parent_acknowledged_at && !isCooperativeMember ? (
              <div className="bg-white rounded-2xl border border-amber-200 shadow-sm p-8 text-center max-w-xl mx-auto space-y-4">
                <div className="w-16 h-16 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center mx-auto">
                  <Lock className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-xl font-black uppercase text-gray-900">
                    Cooperative Membership Required
                  </h3>
                  <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                    Only parents who are active members of the <strong>Day Spring Parent Cooperative</strong> can access this step to submit funding requests on behalf of their child.
                  </p>
                </div>
                <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    onClick={() => setIsCooperativeMember(true)}
                    className="w-full sm:w-auto bg-[#0B1F3A] hover:bg-[#15325A] text-white font-bold text-xs uppercase px-5 py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
                  >
                    <Building className="w-4 h-4 text-[#F5A623]" />
                    <span>Join Day Spring Parent Cooperative (Verify Membership)</span>
                  </button>
                </div>
              </div>
            ) : currentRequest?.parent_acknowledged_at && isCooperativeMember && (
              /* The Parent Letter to Cooperative */
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="bg-gradient-to-r from-purple-900 to-[#0B1F3A] p-6 text-white flex items-center justify-between">
                  <div>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#F5A623] text-[#0B1F3A] text-xs font-black uppercase tracking-wider mb-2">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Cooperative Member Eligible</span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight">
                      Graphitti Bridge — Parent Funding Request
                    </h2>
                    <p className="text-purple-100 text-xs sm:text-sm mt-1">
                      Submitted to the Parent Cooperative Committee on behalf of your child.
                    </p>
                  </div>
                  <div className="p-3 bg-white/10 rounded-2xl hidden sm:block">
                    <Building className="w-8 h-8 text-[#F5A623]" />
                  </div>
                </div>

                {/* Parent Letter Body */}
                <div className="p-6 sm:p-8 space-y-6 text-gray-800 text-sm sm:text-base leading-relaxed font-serif bg-purple-50/20 border-b">
                  <div className="bg-white p-4 rounded-xl border border-gray-200 font-sans not-italic text-xs space-y-1">
                    <p>
                      <strong className="text-gray-500 uppercase">From:</strong>{' '}
                      <span className="font-bold text-gray-900">{profile.parentName}</span>, Cooperative Member
                    </p>
                    <p>
                      <strong className="text-gray-500 uppercase">On behalf of:</strong>{' '}
                      <span className="font-bold text-gray-900">{profile.name}</span>, {profile.schoolName} Shadow SDG Entrepreneur
                    </p>
                  </div>

                  <p className="font-bold text-gray-900 text-lg">
                    Dear Cooperative Committee,
                  </p>

                  <p>
                    My child completed the full Shadow SDG Entrepreneurship programme and has already produced real sales as evidence:
                  </p>

                  {/* Auto-filled sales summary */}
                  <div className="bg-white p-4 rounded-xl border border-gray-200 font-sans not-italic text-xs space-y-2">
                    <div className="flex justify-between font-bold text-gray-700 border-b pb-1">
                      <span>Market Day Sales Summary:</span>
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
                      ₦{Number(requestedAmount).toLocaleString()}
                    </strong>{' '}
                    in startup capital on my child's behalf, to be used for{' '}
                    <strong className="text-gray-900 font-sans bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                      {planText}
                    </strong>
                    . I understand I am the responsible party for this request.
                  </p>

                  <div className="pt-2">
                    <p className="font-bold">Signed,</p>
                    <p className="text-lg font-script text-[#0B1F3A]">{profile.parentName}</p>
                    <p className="text-xs font-mono text-gray-500 font-sans mt-0.5">
                      Cooperative Membership Code: P-DSS-CHI-014
                    </p>
                  </div>

                  {/* Supporting evidence note */}
                  <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 text-xs font-sans not-italic text-gray-600 space-y-1">
                    <p className="font-bold text-gray-800 uppercase tracking-wide">
                      Supporting evidence attached:
                    </p>
                    <p>
                      Child's Refined Business Plan, Production Log, Market Day sales record, and the child's original letter from Step 1.
                    </p>
                  </div>
                </div>

                {/* Parent Confirmation & Signature */}
                <div className="p-6 bg-white">
                  {parentSubmitted ? (
                    <div className="bg-purple-50 border border-purple-200 rounded-xl p-6 text-center space-y-3">
                      <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center mx-auto">
                        <CheckCircle2 className="w-6 h-6" />
                      </div>
                      <h4 className="font-black text-purple-900 uppercase text-base">
                        Funding Request Submitted to Cooperative Committee
                      </h4>
                      <p className="text-xs text-purple-800 max-w-md mx-auto leading-relaxed">
                        This request is now queued for <strong>human review</strong> by the Cooperative Committee. Funds are not automatically released; the committee will review your child's business plan and sales traction.
                      </p>
                      {onNavigateAdminView && (
                        <button
                          onClick={onNavigateAdminView}
                          className="inline-flex items-center gap-2 bg-[#0B1F3A] hover:bg-[#15325A] text-white px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-colors mt-2"
                        >
                          <Building className="w-4 h-4 text-[#F5A623]" />
                          <span>View Cooperative Committee Admin Portal</span>
                        </button>
                      )}
                    </div>
                  ) : (
                    <form onSubmit={handleParentSubmit} className="space-y-5">
                      {/* Checkbox confirmation */}
                      <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 flex items-start gap-3">
                        <input
                          type="checkbox"
                          id="parent-confirm-responsibility"
                          checked={parentConfirmedResponsibility}
                          onChange={(e) => setParentConfirmedResponsibility(e.target.checked)}
                          className="mt-1 w-4 h-4 text-[#0B1F3A] rounded border-gray-300 focus:ring-[#F5A623] cursor-pointer"
                        />
                        <label htmlFor="parent-confirm-responsibility" className="text-xs text-gray-700 leading-relaxed cursor-pointer font-medium">
                          I confirm that I am submitting this Graphitti Bridge funding request on my child's behalf, and I agree to act as the responsible guarantor and mentor for these cooperative funds.
                        </label>
                      </div>

                      {/* Parent Signature Code */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-gray-50 p-4 rounded-xl border border-gray-200">
                        <div>
                          <label className="text-xs font-black uppercase text-gray-700 block">
                            Parent Signature Code
                          </label>
                          <p className="text-xs text-gray-500">
                            Type your code to sign: <span className="font-mono font-bold text-[#0B1F3A]">{profile.parentCode}</span>
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
                        className={`w-full py-4 rounded-xl font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md ${
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
              </div>
            )}
          </section>
        )}
      </main>

      {/* EVIDENCE PREVIEW MODALS */}
      {activeEvidenceModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-gray-100 space-y-4 animate-scaleUp">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-base font-black uppercase text-gray-900 tracking-tight flex items-center gap-2">
                {activeEvidenceModal === 'plan' && '📄 Refined Business Plan'}
                {activeEvidenceModal === 'log' && '🔬 Production Log Summary'}
                {activeEvidenceModal === 'sales' && '🛍️ Market Day Sales Record'}
              </h3>
              <button
                onClick={() => setActiveEvidenceModal(null)}
                className="text-gray-400 hover:text-gray-600 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            {activeEvidenceModal === 'plan' && (
              <div className="text-xs space-y-3">
                <div className="p-3 bg-blue-50 rounded-xl border border-blue-200">
                  <p className="font-bold text-blue-900">Student: {profile.name} (Week 11 Refined Plan)</p>
                  <p className="text-blue-700 mt-0.5">Focus: Sustainable Epoxy Beads & Jewellery</p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-2 bg-gray-50 rounded-lg border">
                    <span className="text-gray-500 block">Unit Base Cost:</span>
                    <strong className="text-gray-900 text-sm">₦{profile.refinedBusinessPlanSummary.unitBaseCost}</strong>
                  </div>
                  <div className="p-2 bg-gray-50 rounded-lg border">
                    <span className="text-gray-500 block">Selling Price:</span>
                    <strong className="text-gray-900 text-sm">₦{profile.refinedBusinessPlanSummary.unitSalePrice}</strong>
                  </div>
                  <div className="p-2 bg-gray-50 rounded-lg border">
                    <span className="text-gray-500 block">Profit Margin:</span>
                    <strong className="text-emerald-700 text-sm">{profile.refinedBusinessPlanSummary.targetMargin}</strong>
                  </div>
                  <div className="p-2 bg-gray-50 rounded-lg border">
                    <span className="text-gray-500 block">Breakeven Volume:</span>
                    <strong className="text-gray-900 text-sm">{profile.refinedBusinessPlanSummary.breakevenUnits} units</strong>
                  </div>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  Refined following real buyer feedback on Market Day. Shifted toward earrings and decorative pendants to maximize unit margin.
                </p>
              </div>
            )}

            {activeEvidenceModal === 'log' && (
              <div className="text-xs space-y-3">
                <div className="p-3 bg-purple-50 rounded-xl border border-purple-200">
                  <p className="font-bold text-purple-900">{profile.productionLogSummary.batchNumber}</p>
                  <p className="text-purple-700 mt-0.5">Technique: {profile.productionLogSummary.technique}</p>
                </div>
                <div className="space-y-1.5 bg-gray-50 p-3 rounded-lg border">
                  <p><strong className="text-gray-700">Resin Consumed:</strong> {profile.productionLogSummary.resinUsedMl}ml measured with syringes</p>
                  <p><strong className="text-gray-700">Cure Period:</strong> {profile.productionLogSummary.cureTimeHours} hours in dust-free enclosure</p>
                  <p><strong className="text-gray-700">Quality Inspection:</strong> <span className="text-emerald-700 font-bold">{profile.productionLogSummary.defectRate}</span></p>
                </div>
              </div>
            )}

            {activeEvidenceModal === 'sales' && (
              <div className="text-xs space-y-3">
                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 flex justify-between items-center">
                  <span className="font-bold text-emerald-900">Total Receipts:</span>
                  <span className="font-black text-emerald-900 text-base">₦{profile.totalSales.toLocaleString()}</span>
                </div>
                <div className="divide-y border rounded-xl overflow-hidden">
                  {profile.salesRecord.map((s) => (
                    <div key={s.id} className="p-2.5 bg-white flex justify-between">
                      <span className="text-gray-800">{s.name} ({s.quantity}x)</span>
                      <strong className="text-gray-900">₦{s.total.toLocaleString()}</strong>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-2 text-right">
              <button
                type="button"
                onClick={() => setActiveEvidenceModal(null)}
                className="bg-[#0B1F3A] text-white px-4 py-2 rounded-lg text-xs font-bold uppercase"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
