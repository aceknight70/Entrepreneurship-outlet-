import React, { useState } from 'react';
import { DiagonalBanner } from '../components/Layout';
import { CheckCircle2, ShieldCheck, Shield, AlertCircle, FileText } from 'lucide-react';
import { SCHOOL_CONFIG } from '../config';

export function EnrolmentScreen() {
  // Identity signatures via code
  const [signed, setSigned] = useState({ 
    parent: false, 
    student: false, 
    teacher: false, 
    management: false 
  });

  // Two separate parental consents (independently completed)
  const [safetyConsent, setSafetyConsent] = useState(false);
  const [mediaConsent, setMediaConsent] = useState(false);

  const allSignaturesComplete = signed.parent && signed.student && signed.teacher && signed.management;
  const isFullyComplete = allSignaturesComplete && safetyConsent && mediaConsent;

  // Hardcoded for prototype demonstration
  const baseCode = `${SCHOOL_CONFIG.initials}-CHI-014`;

  return (
    <div className="min-h-screen bg-gray-50 relative pb-24 font-sans">
      <DiagonalBanner />
      
      <div className="relative z-10 max-w-4xl mx-auto pt-16 px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black text-white mb-2 uppercase tracking-tight">Digital Enrolment</h1>
          <p className="text-blue-100 font-medium">{SCHOOL_CONFIG.name} Entrepreneurship Outlet</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 sm:p-8 flex flex-col md:flex-row gap-8 lg:gap-12">
          {/* Booklet Representation */}
          <div className="flex-1 space-y-8">
            {/* The Commitment */}
            <div className="border-l-4 border-[#0B1F3A] pl-6 py-2">
              <h2 className="text-2xl font-serif text-gray-900 mb-3 font-bold">The Commitment</h2>
              <p className="text-gray-600 leading-relaxed mb-4 text-sm">
                Over the next 11 weeks, we commit to the process of creation, learning, and growth. This is not just a project; it is learning how to create a business venture grounded in the Sustainable Development Goals (SDGs 4, 8, 9, 12).
              </p>
              <ul className="space-y-2 text-xs sm:text-sm text-gray-600 font-medium">
                <li className="flex gap-2"><span className="text-[#F5A623]">•</span> I will respect the materials and safety protocols.</li>
                <li className="flex gap-2"><span className="text-[#F5A623]">•</span> I will calculate my costs honestly.</li>
                <li className="flex gap-2"><span className="text-[#F5A623]">•</span> I will present my work to the market.</li>
                <li className="flex gap-2"><span className="text-[#F5A623]">•</span> I will reflect and draft a concrete plan from it.</li>
              </ul>
            </div>

            {/* PART 1: EXPLICIT SAFETY & MATERIALS HANDLING FEE */}
            <div className="bg-blue-50/70 border border-blue-200/90 rounded-xl p-5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider text-[#0B1F3A] flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-blue-700" />
                  <span>Programme & Kit Investment Breakdown</span>
                </span>
                <span className="text-[11px] font-bold text-blue-800 bg-white px-2.5 py-0.5 rounded-full border border-blue-200 shadow-2xs">
                  Transparent Allocation
                </span>
              </div>

              <div className="space-y-2.5 text-xs">
                {/* 1. Training Fee */}
                <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
                  <div>
                    <p className="font-bold text-gray-900">Entrepreneurship Training Fee</p>
                    <p className="text-gray-500 text-[11px]">11-Week SDG business mentorship, practical craft development, Market Day guidance, and after-market reflection.</p>
                  </div>
                  <span className="font-black text-[#0B1F3A] text-xs bg-gray-100 px-2.5 py-1 rounded">Tuition Split</span>
                </div>

                {/* 2. Craft Kit */}
                <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
                  <div>
                    <p className="font-bold text-gray-900">Student Starter Craft Kit</p>
                    <p className="text-gray-500 text-[11px]">Reusable silicone moulds, premium clear epoxy resin, hardener, mica pigments, and drill findings</p>
                  </div>
                  <span className="font-black text-[#0B1F3A] text-xs bg-gray-100 px-2.5 py-1 rounded">Craft Asset Kit</span>
                </div>

                {/* 3. Safety, Materials & Documentation Fee */}
                <div className="p-3.5 bg-amber-50/90 rounded-xl border-2 border-[#F5A623] shadow-xs space-y-1.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="p-1 rounded-md bg-[#F5A623] text-[#0B1F3A]">
                        <ShieldCheck className="w-4 h-4" />
                      </div>
                      <h4 className="font-black text-gray-900 text-sm">
                        Safety, Materials & Documentation — ₦1,000/student
                      </h4>
                    </div>
                    <span className="font-black text-sm text-[#0B1F3A] bg-[#F5A623] px-2.5 py-0.5 rounded shadow-2xs">
                      ₦1,000
                    </span>
                  </div>
                  <p className="text-gray-700 text-xs leading-relaxed">
                    This covers group safety coverage for the programme — certified nitrile gloves, organic vapour filtration masks, splash aprons, silicone work mats, workshop cross-ventilation oversight, and compliant resin curing and waste disposal throughout all 11 weeks — and ongoing documentation of your child's development throughout the programme, building a real record that supports future Graphitti Bridge funding applications.
                  </p>
                </div>
              </div>
            </div>

            {/* PART 2: TWO SEPARATE PARENTAL CONSENTS (DISTINCT FROM IDENTITY SIGNATURES) */}
            <div className="bg-amber-50/50 rounded-xl p-5 sm:p-6 space-y-4 border border-amber-200/90">
              <div>
                <h3 className="font-black text-gray-900 text-sm uppercase tracking-wider flex items-center gap-2">
                  <Shield className="w-4 h-4 text-[#F5A623]" />
                  <span>Two Parental Consents (Both Required)</span>
                </h3>
                <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                  These two separate agreements protect student welfare and media permissions. They are independent from each other and must both be signed before the student's identity badge unlocks.
                </p>
              </div>

              {/* Consent 1: Safety & Materials Consent */}
              <div className={`p-4 rounded-xl border transition-all ${safetyConsent ? 'bg-emerald-50/70 border-emerald-300' : 'bg-white border-gray-200 shadow-2xs'}`}>
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="safety-consent-checkbox"
                    checked={safetyConsent}
                    onChange={(e) => setSafetyConsent(e.target.checked)}
                    className="mt-1 w-4 h-4 text-[#0B1F3A] rounded border-gray-300 focus:ring-[#F5A623] cursor-pointer"
                  />
                  <div className="flex-1">
                    <label htmlFor="safety-consent-checkbox" className="block text-xs font-bold text-gray-900 uppercase tracking-wide cursor-pointer mb-1">
                      1. Safety & Materials Consent
                    </label>
                    <p className="text-xs text-gray-700 leading-relaxed font-medium italic">
                      "I consent to my child handling resin and related materials as part of this programme, and confirm I have disclosed any known allergies or sensitivities relevant to this training."
                    </p>
                  </div>
                </div>
                <div className="mt-3 pl-7 flex items-center justify-between text-[11px] border-t border-gray-100 pt-2">
                  <span className="text-gray-500">Parental Sign-off:</span>
                  {safetyConsent ? (
                    <span className="font-bold text-emerald-800 flex items-center gap-1 bg-emerald-100/80 px-2 py-0.5 rounded">
                      <CheckCircle2 className="w-3 h-3 text-emerald-700" />
                      Consent Confirmed
                    </span>
                  ) : (
                    <span className="font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
                      Checkbox Required
                    </span>
                  )}
                </div>
              </div>

              {/* Consent 2: Image & Media Consent (SEPARATE) */}
              <div className={`p-4 rounded-xl border transition-all ${mediaConsent ? 'bg-emerald-50/70 border-emerald-300' : 'bg-white border-gray-200 shadow-2xs'}`}>
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="media-consent-checkbox"
                    checked={mediaConsent}
                    onChange={(e) => setMediaConsent(e.target.checked)}
                    className="mt-1 w-4 h-4 text-[#0B1F3A] rounded border-gray-300 focus:ring-[#F5A623] cursor-pointer"
                  />
                  <div className="flex-1">
                    <label htmlFor="media-consent-checkbox" className="block text-xs font-bold text-gray-900 uppercase tracking-wide cursor-pointer mb-1">
                      2. Image & Media Consent (Separate Item)
                    </label>
                    <p className="text-xs text-gray-700 leading-relaxed font-medium italic">
                      "I consent to my child being photographed/filmed during this programme, for use in school prospectuses, promotional materials, and Market Day coverage."
                    </p>
                  </div>
                </div>
                <div className="mt-3 pl-7 flex items-center justify-between text-[11px] border-t border-gray-100 pt-2">
                  <span className="text-gray-500">Media Release Sign-off:</span>
                  {mediaConsent ? (
                    <span className="font-bold text-emerald-800 flex items-center gap-1 bg-emerald-100/80 px-2 py-0.5 rounded">
                      <CheckCircle2 className="w-3 h-3 text-emerald-700" />
                      Consent Confirmed
                    </span>
                  ) : (
                    <span className="font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
                      Checkbox Required
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Identity Signatures via Code */}
            <div className="bg-gray-50 rounded-lg p-6 space-y-6 border border-gray-100">
              <div className="flex items-center justify-between">
                <h3 className="font-black text-gray-800 text-sm uppercase tracking-wider">
                  Required Identity Signatures
                </h3>
                <span className="text-xs font-bold text-gray-500">
                  {Object.values(signed).filter(Boolean).length}/4 Verified
                </span>
              </div>
              
              <div className="space-y-6">
                <SignatureRow 
                  label="Parent / Guardian" 
                  expectedCode={`P-${baseCode}`}
                  isSigned={signed.parent} 
                  onSign={() => setSigned(s => ({ ...s, parent: true }))} 
                />
                <SignatureRow 
                  label="Student Maker" 
                  expectedCode={`S-${baseCode}`}
                  isSigned={signed.student} 
                  onSign={() => setSigned(s => ({ ...s, student: true }))} 
                />
                <SignatureRow 
                  label="Supervising Teacher" 
                  expectedCode={`T-${baseCode}`}
                  isSigned={signed.teacher} 
                  onSign={() => setSigned(s => ({ ...s, teacher: true }))} 
                />
                <SignatureRow 
                  label="School Management" 
                  expectedCode={`M-${baseCode}`}
                  isSigned={signed.management} 
                  onSign={() => setSigned(s => ({ ...s, management: true }))} 
                />
              </div>
            </div>
          </div>

          {/* Outcome Badge Area (Unlocked ONLY when ALL signatures AND BOTH consents are complete) */}
          <div className="w-full md:w-80 flex flex-col items-center justify-center bg-gray-50 rounded-xl border border-gray-200 p-6 sm:p-8 text-center min-h-[360px] self-start sticky top-6">
            {isFullyComplete ? (
              <div className="animate-in fade-in zoom-in duration-500 flex flex-col items-center w-full">
                <div className="w-20 h-20 bg-[#0B1F3A] rounded-full flex items-center justify-center mb-4 shadow-lg border-4 border-white">
                  <CheckCircle2 className="w-10 h-10 text-[#F5A623]" />
                </div>
                <h3 className="text-xl font-black text-gray-900 mb-1 uppercase tracking-tight">
                  Enrolment Complete
                </h3>
                <div className="bg-blue-50 text-[#0B1F3A] px-4 py-2 rounded-full text-xs font-black border border-blue-200 mb-3 shadow-2xs">
                  {SCHOOL_CONFIG.name} SDG Entrepreneur
                </div>
                
                <div className="w-full bg-white p-3 rounded-lg border border-gray-200 text-left text-xs space-y-1.5 mb-3">
                  <p className="font-bold text-gray-700 text-[11px] uppercase tracking-wider">Verified Checklist:</p>
                  <p className="text-emerald-700 flex items-center gap-1.5 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    4 Identity Signatures Verified
                  </p>
                  <p className="text-emerald-700 flex items-center gap-1.5 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    Safety & Materials Handling Consent
                  </p>
                  <p className="text-emerald-700 flex items-center gap-1.5 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    Image & Media Release Consent
                  </p>
                </div>

                <p className="text-[11px] text-gray-400 italic">
                  Student is cleared to receive starter kit and begin Week 1.
                </p>
              </div>
            ) : (
              <div className="text-gray-500 flex flex-col items-center w-full space-y-3">
                <div className="w-16 h-16 border-2 border-dashed border-gray-300 rounded-full flex items-center justify-center bg-white">
                  <Shield className="text-gray-300 w-8 h-8" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-gray-800 uppercase">Badge Locked</h4>
                  <p className="text-xs text-gray-500 mt-1">
                    Complete all requirements to reveal the official identity badge.
                  </p>
                </div>

                {/* Progress Checklist */}
                <div className="w-full bg-white p-3.5 rounded-lg border border-gray-200 text-left text-xs space-y-2">
                  <span className="font-bold text-gray-700 text-[11px] uppercase tracking-wider block border-b pb-1">
                    Outstanding Items:
                  </span>
                  
                  {/* Signatures status */}
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">4 Identity Codes:</span>
                    <span className={`font-bold px-2 py-0.5 rounded text-[11px] ${
                      allSignaturesComplete ? 'text-emerald-700 bg-emerald-50' : 'text-amber-700 bg-amber-50'
                    }`}>
                      {Object.values(signed).filter(Boolean).length}/4
                    </span>
                  </div>

                  {/* Safety consent status */}
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Safety & Materials:</span>
                    <span className={`font-bold px-2 py-0.5 rounded text-[11px] ${
                      safetyConsent ? 'text-emerald-700 bg-emerald-50' : 'text-amber-700 bg-amber-50'
                    }`}>
                      {safetyConsent ? 'Signed' : 'Needed'}
                    </span>
                  </div>

                  {/* Media consent status */}
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Image & Media:</span>
                    <span className={`font-bold px-2 py-0.5 rounded text-[11px] ${
                      mediaConsent ? 'text-emerald-700 bg-emerald-50' : 'text-amber-700 bg-amber-50'
                    }`}>
                      {mediaConsent ? 'Signed' : 'Needed'}
                    </span>
                  </div>
                </div>

                <div className="text-[11px] text-gray-400 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <span>Both parental consents are mandatory.</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function SignatureRow({ label, expectedCode, isSigned, onSign }: { label: string, expectedCode: string, isSigned: boolean, onSign: () => void }) {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.toUpperCase();
    setInputValue(val);
    if (val === expectedCode.toUpperCase()) {
      onSign();
    }
  };

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <span className="text-sm font-bold text-gray-800">{label}</span>
        {!isSigned && (
          <span className="text-xs text-gray-500">
            Please type: <span className="font-mono font-bold text-[#0B1F3A]">{expectedCode}</span>
          </span>
        )}
      </div>
      
      {isSigned ? (
        <div className="border-b-2 border-[#0B1F3A] h-10 flex items-end pb-1 justify-center relative">
          <span className="font-script text-[#0B1F3A] text-2xl transform -rotate-3 absolute bottom-1">Signed</span>
        </div>
      ) : (
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          placeholder="Enter signature code..."
          className="w-full border-b-2 border-dashed border-gray-300 bg-white px-3 py-2 text-center font-mono text-sm uppercase focus:outline-none focus:border-[#0B1F3A] focus:bg-blue-50/30 transition-all rounded-md shadow-sm"
        />
      )}
    </div>
  );
}
