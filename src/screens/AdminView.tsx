import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Users, 
  FileText, 
  Settings, 
  BarChart2, 
  Image as ImageIcon, 
  Sparkles, 
  ShieldCheck, 
  Building, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Paperclip,
  TrendingUp,
  AlertCircle
} from 'lucide-react';
import { 
  bridgeService, 
  BridgeRequest, 
  BridgeRequestStatus, 
  CURRENT_STUDENT_PROFILE 
} from '../lib/bridgeService';

interface AdminViewProps {
  onBack: () => void;
  onOpenGalleryAdmin?: () => void;
  onOpenBridge?: () => void;
}

export function AdminViewScreen({ onBack, onOpenGalleryAdmin, onOpenBridge }: AdminViewProps) {
  const profile = CURRENT_STUDENT_PROFILE;
  const [requests, setRequests] = useState<BridgeRequest[]>([]);
  const [committeeNotes, setCommitteeNotes] = useState<Record<string, string>>({});
  const [actionMessage, setActionMessage] = useState<string | null>(null);

  useEffect(() => {
    loadRequests();
  }, []);

  const loadRequests = async () => {
    try {
      const data = await bridgeService.getAllRequests();
      if (data.length === 0) {
        // Provide demo request for testing
        const seeded = bridgeService.seedDemoRequest();
        setRequests([seeded]);
      } else {
        setRequests(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleCommitteeAction = async (id: string, status: BridgeRequestStatus) => {
    try {
      const notes = committeeNotes[id] || '';
      await bridgeService.updateRequestStatus(id, status, notes);
      await loadRequests();
      setActionMessage(
        status === 'approved'
          ? 'Approved! Startup capital disbursement scheduled for student.'
          : 'Decision recorded: Revision requested with feedback notes.'
      );
      setTimeout(() => setActionMessage(null), 4000);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans pb-24">
      {/* Top Bar */}
      <div className="bg-[#0B1F3A] pt-12 pb-6 px-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={onBack} className="text-white hover:text-gray-200">
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-2xl font-black text-white tracking-tight uppercase">Admin Dashboard</h1>
              <p className="text-blue-200 text-sm">School Management & Cooperative Committee</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {onOpenBridge && (
              <button
                onClick={onOpenBridge}
                className="hidden sm:flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase px-3.5 py-2 rounded-xl border border-white/20 transition-colors"
              >
                <Sparkles className="w-4 h-4 text-[#F5A623]" />
                <span>Bridge Module</span>
              </button>
            )}
            {onOpenGalleryAdmin && (
              <button
                onClick={onOpenGalleryAdmin}
                className="hidden sm:flex items-center gap-2 bg-[#F5A623] hover:bg-[#e0961b] text-[#0B1F3A] font-extrabold text-xs uppercase px-4 py-2 rounded-xl transition-colors shadow-sm"
              >
                <ImageIcon className="w-4 h-4" />
                <span>Gallery Admin</span>
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="flex-1 max-w-4xl mx-auto w-full p-4 space-y-6 mt-6">

        {actionMessage && (
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-bold flex items-center justify-between animate-fadeIn shadow-xs">
            <span>{actionMessage}</span>
            <button onClick={() => setActionMessage(null)} className="text-[11px] uppercase font-black">Dismiss</button>
          </div>
        )}

        {/* ========================================================================= */}
        {/* COOPERATIVE COMMITTEE REVIEW: GRAPHITTI BRIDGE REQUESTS (HUMAN REVIEW)    */}
        {/* ========================================================================= */}
        <div className="bg-white rounded-2xl border-2 border-purple-900 shadow-md overflow-hidden">
          <div className="bg-gradient-to-r from-purple-950 via-[#0B1F3A] to-purple-900 p-6 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#F5A623] text-[#0B1F3A] text-xs font-black uppercase tracking-wider mb-1">
                <Building className="w-3.5 h-3.5" />
                <span>Parent Cooperative Committee View</span>
              </div>
              <h2 className="text-xl font-black uppercase tracking-tight text-white flex items-center gap-2">
                <span>Graphitti Bridge — Funding Requests Review</span>
              </h2>
              <p className="text-purple-200 text-xs sm:text-sm leading-relaxed max-w-xl">
                Human review committee queue. <strong>Startup funding is never auto-approved</strong>; applications require validation of Market Day sales traction and parent guardianship.
              </p>
            </div>

            <div className="text-right shrink-0">
              <span className="bg-white/10 text-white px-3 py-1.5 rounded-xl border border-white/20 text-xs font-black uppercase tracking-wider block">
                {requests.filter(r => r.status === 'submitted').length} Pending Human Review
              </span>
            </div>
          </div>

          <div className="p-6 divide-y divide-gray-100">
            {requests.length === 0 ? (
              <div className="text-center py-8 text-gray-500 text-xs">
                No active Graphitti Bridge funding requests submitted yet.
              </div>
            ) : (
              requests.map((req) => {
                const isSubmitted = req.status === 'submitted';
                const isApproved = req.status === 'approved';
                const isDeclined = req.status === 'declined';
                const isParentReview = req.status === 'parent_review';

                return (
                  <div key={req.id} className="py-5 first:pt-0 last:pb-0 space-y-4">
                    {/* Header line */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-black text-gray-900 text-base">
                            {req.student_name || profile.name}
                          </h3>
                          <span className="text-xs text-gray-500 font-medium">
                            • {req.school_name || profile.schoolName}
                          </span>
                        </div>
                        <p className="text-xs text-gray-600">
                          Submitted by Parent: <strong>{req.parent_name || profile.parentName}</strong> (Cooperative Member)
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        {isSubmitted && (
                          <span className="bg-purple-100 text-purple-800 text-xs font-black uppercase px-3 py-1 rounded-full border border-purple-300 flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-purple-700" />
                            Awaiting Committee Review
                          </span>
                        )}
                        {isApproved && (
                          <span className="bg-emerald-100 text-emerald-800 text-xs font-black uppercase px-3 py-1 rounded-full border border-emerald-300 flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                            Approved for Funding
                          </span>
                        )}
                        {isDeclined && (
                          <span className="bg-red-100 text-red-800 text-xs font-black uppercase px-3 py-1 rounded-full border border-red-300 flex items-center gap-1">
                            <XCircle className="w-3.5 h-3.5 text-red-700" />
                            Revision Requested
                          </span>
                        )}
                        {isParentReview && (
                          <span className="bg-amber-100 text-amber-800 text-xs font-black uppercase px-3 py-1 rounded-full border border-amber-300 flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-amber-700" />
                            In Step 1 (Parent Acknowledgment)
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Funding Request Details */}
                    <div className="bg-purple-50/40 rounded-xl p-4 border border-purple-100 space-y-3 text-xs">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-purple-100 pb-2">
                        <div>
                          <span className="text-gray-500 uppercase tracking-wider text-[11px] block">
                            Requested Startup Capital:
                          </span>
                          <span className="text-lg font-black text-purple-950">
                            ₦{Number(req.requested_amount || 70000).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-right sm:text-left">
                          <span className="text-gray-500 uppercase tracking-wider text-[11px] block">
                            Market Day Proven Traction:
                          </span>
                          <span className="text-sm font-black text-emerald-700">
                            ₦{profile.totalSales.toLocaleString()} ({profile.salesRecord.length} products sold)
                          </span>
                        </div>
                      </div>

                      <div>
                        <strong className="text-gray-800 uppercase tracking-wider text-[11px] block mb-0.5">
                          Child's Stated Expansion Plan:
                        </strong>
                        <p className="text-gray-800 italic bg-white p-3 rounded-lg border border-gray-200 leading-relaxed font-serif">
                          "{req.plan_text || profile.refinedBusinessPlanSummary.monthlyProductionUnits + ' wholesale units'}"
                        </p>
                      </div>

                      {/* Evidence attached */}
                      <div className="space-y-1">
                        <span className="text-[11px] font-black uppercase text-gray-500 flex items-center gap-1">
                          <Paperclip className="w-3 h-3" /> Attached Evidence Verified
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                          <div className="bg-white p-2 rounded-lg border text-[11px]">
                            <span className="text-gray-500 block">Refined Plan:</span>
                            <span className="font-bold text-gray-900">{profile.refinedBusinessPlanSummary.targetMargin} margin</span>
                          </div>
                          <div className="bg-white p-2 rounded-lg border text-[11px]">
                            <span className="text-gray-500 block">Production Log:</span>
                            <span className="font-bold text-gray-900">{profile.productionLogSummary.defectRate}</span>
                          </div>
                          <div className="bg-white p-2 rounded-lg border text-[11px]">
                            <span className="text-gray-500 block">Signatures:</span>
                            <span className="font-bold text-gray-900 font-mono text-[10px]">
                              {req.child_letter_signature || profile.studentCode} / {req.parent_letter_signature || profile.parentCode}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Committee Decision Actions (Human Review Required) */}
                    <div className="space-y-3 bg-gray-50 p-4 rounded-xl border border-gray-200">
                      <div>
                        <label className="text-[11px] font-black uppercase text-gray-700 block mb-1">
                          Cooperative Committee Feedback & Notes:
                        </label>
                        <input
                          type="text"
                          value={committeeNotes[req.id] || req.committee_notes || ''}
                          onChange={(e) => setCommitteeNotes({ ...committeeNotes, [req.id]: e.target.value })}
                          placeholder="e.g. Excellent traction on earrings. Approved with 10% mentor match from cooperative pool..."
                          className="w-full text-xs p-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-900 bg-white"
                        />
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                        <div className="text-[11px] text-gray-500 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5 text-amber-500" />
                          <span>Committee quorum requires 2 officer endorsements.</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleCommitteeAction(req.id, 'declined')}
                            className="bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 px-3.5 py-2 rounded-lg text-xs font-bold uppercase transition-colors"
                          >
                            Request Revision
                          </button>
                          <button
                            type="button"
                            onClick={() => handleCommitteeAction(req.id, 'approved')}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-xs font-black uppercase tracking-wider transition-colors shadow-xs flex items-center gap-1.5"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Approve Startup Capital</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Featured Card: Gallery Admin for Master/Manager */}
        {onOpenGalleryAdmin && (
          <div className="bg-gradient-to-r from-[#0B1F3A] to-[#15325A] rounded-2xl p-6 text-white shadow-md border border-[#0B1F3A] relative overflow-hidden flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1 relative z-10 max-w-lg">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#F5A623] text-[#0B1F3A] text-xs font-black uppercase tracking-wider mb-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Master & Manager Exclusive</span>
              </div>
              <h2 className="text-xl font-black uppercase tracking-tight text-white flex items-center gap-2">
                <span>Inspiration Gallery Management</span>
              </h2>
              <p className="text-blue-100 text-xs sm:text-sm leading-relaxed">
                Upload real product photos directly into Supabase Storage. Set categories, manage captions, and replace or delete items with zero code changes.
              </p>
            </div>
            <button
              onClick={onOpenGalleryAdmin}
              className="bg-[#F5A623] hover:bg-[#e0961b] text-[#0B1F3A] font-black text-xs uppercase px-5 py-3 rounded-xl transition-all shadow-md shrink-0 flex items-center justify-center gap-2"
            >
              <ImageIcon className="w-4 h-4" />
              <span>Open Gallery Admin</span>
            </button>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col items-center justify-center text-center">
            <Users className="w-8 h-8 text-blue-500 mb-2" />
            <h3 className="text-3xl font-black text-gray-900">42</h3>
            <p className="text-sm font-bold text-gray-500 uppercase">Active Students</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col items-center justify-center text-center">
            <FileText className="w-8 h-8 text-green-500 mb-2" />
            <h3 className="text-3xl font-black text-gray-900">18</h3>
            <p className="text-sm font-bold text-gray-500 uppercase">Pending Approvals</p>
          </div>
        </div>

        {/* Programme Fee Structure & Safety Fund */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-black text-gray-800 uppercase tracking-wider">
              Programme Fees & Materials Allocation
            </h2>
            <span className="text-xs bg-blue-50 text-blue-800 font-bold px-2.5 py-0.5 rounded-full border border-blue-200">
              Per-Student Breakdown
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            <div className="p-3 bg-gray-50 rounded-xl border border-gray-200">
              <span className="text-gray-500 font-bold uppercase text-[10px] block">Stream 1</span>
              <p className="font-black text-gray-900 text-sm mt-0.5">Training Fee Split</p>
              <p className="text-gray-500 text-[11px] mt-1">Curriculum delivery & teacher mentorship</p>
            </div>

            <div className="p-3 bg-gray-50 rounded-xl border border-gray-200">
              <span className="text-gray-500 font-bold uppercase text-[10px] block">Stream 2</span>
              <p className="font-black text-gray-900 text-sm mt-0.5">Kit Asset Allocation</p>
              <p className="text-gray-500 text-[11px] mt-1">Reusable silicone moulds, resin & craft supplies</p>
            </div>

            <div className="p-3.5 bg-amber-50 rounded-xl border-2 border-[#F5A623] shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="text-amber-800 font-black uppercase text-[10px] block">Dedicated Coverage</span>
                <span className="bg-[#F5A623] text-[#0B1F3A] font-black px-1.5 py-0.5 rounded text-[11px]">
                  ₦1,000 / std
                </span>
              </div>
              <p className="font-black text-gray-900 text-sm mt-0.5">
                Safety, Materials & Documentation
              </p>
              <p className="text-gray-700 text-[11px] mt-1 leading-relaxed">
                Group safety coverage: certified PPE (nitrile gloves, organic vapour masks), ventilation oversight, compliant disposal, and student development documentation. (Total Pool: ₦42,000 for 42 students).
              </p>
            </div>
          </div>
        </div>

        {/* Separate Parental Consent Compliance Tracking */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-black text-gray-800 uppercase tracking-wider">
              Parental Consent Compliance (Two Separate Agreements)
            </h2>
            <span className="text-xs bg-emerald-50 text-emerald-800 font-bold px-2 py-0.5 rounded border border-emerald-200">
              Independent Signatures
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 bg-emerald-50/60 rounded-xl border border-emerald-200 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-black text-gray-900">1. Safety & Materials Consent</span>
                <span className="font-bold text-emerald-700 bg-white px-2 py-0.5 rounded border border-emerald-300">
                  42 / 42 (100%)
                </span>
              </div>
              <p className="text-gray-600 text-[11px] leading-relaxed">
                Mandatory before first practical session: resin handling clearance & allergy disclosure confirmation.
              </p>
            </div>

            <div className="p-4 bg-blue-50/60 rounded-xl border border-blue-200 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-black text-gray-900">2. Image & Media Consent</span>
                <span className="font-bold text-blue-700 bg-white px-2 py-0.5 rounded border border-blue-300">
                  40 / 42 (95.2%)
                </span>
              </div>
              <p className="text-gray-600 text-[11px] leading-relaxed">
                Independently granted for prospectuses, promo materials, and Market Day filming. (2 students opted out of media while fully cleared for safety).
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center gap-3 hover:bg-gray-50 transition-colors">
            <BarChart2 className="w-5 h-5 text-gray-600" />
            <span className="font-bold text-gray-700 uppercase text-sm">Reports</span>
          </button>
          <button className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center gap-3 hover:bg-gray-50 transition-colors">
            <Settings className="w-5 h-5 text-gray-600" />
            <span className="font-bold text-gray-700 uppercase text-sm">Settings</span>
          </button>
        </div>

      </div>
    </div>
  );
}
