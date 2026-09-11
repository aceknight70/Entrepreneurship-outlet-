import React, { useState } from 'react';
import { DiagonalBanner } from '../components/Layout';
import { CheckCircle2 } from 'lucide-react';

export function EnrolmentScreen() {
  const [signed, setSigned] = useState({ parent: false, student: false, teacher: false });

  const allSigned = signed.parent && signed.student && signed.teacher;

  return (
    <div className="min-h-screen bg-gray-50 relative pb-24">
      <DiagonalBanner />
      
      <div className="relative z-10 max-w-4xl mx-auto pt-16 px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Digital Enrolment</h1>
          <p className="text-blue-100">Jasmine School Entrepreneurship Outlet</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 flex flex-col md:flex-row gap-12">
          {/* Booklet Representation */}
          <div className="flex-1 space-y-8">
            <div className="border-l-4 border-[#0B1F3A] pl-6 py-2">
              <h2 className="text-2xl font-serif text-gray-900 mb-4">The Commitment</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Over the next 11 weeks, we commit to the process of creation, learning, and growth. This is not just a project; it is learning how to create a business venture grounded in the Sustainable Development Goals (SDGs 4, 8, 9, 12).
              </p>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex gap-2"><span className="text-[#F5A623]">•</span> I will respect the materials.</li>
                <li className="flex gap-2"><span className="text-[#F5A623]">•</span> I will calculate my costs honestly.</li>
                <li className="flex gap-2"><span className="text-[#F5A623]">•</span> I will present my work to the market.</li>
              </ul>
            </div>

            {/* Signatures */}
            <div className="bg-gray-50 rounded-lg p-6 space-y-6 border border-gray-100">
              <h3 className="font-semibold text-gray-800 text-sm uppercase tracking-wider mb-4">Required Signatures</h3>
              
              <div className="space-y-4">
                <SignatureRow 
                  label="Parent / Guardian" 
                  isSigned={signed.parent} 
                  onSign={() => setSigned(s => ({ ...s, parent: true }))} 
                />
                <SignatureRow 
                  label="Student Maker" 
                  isSigned={signed.student} 
                  onSign={() => setSigned(s => ({ ...s, student: true }))} 
                />
                <SignatureRow 
                  label="Supervising Teacher" 
                  isSigned={signed.teacher} 
                  onSign={() => setSigned(s => ({ ...s, teacher: true }))} 
                />
              </div>
            </div>
          </div>

          {/* Outcome Badge Area */}
          <div className="w-full md:w-72 flex flex-col items-center justify-center bg-gray-50 rounded-xl border border-gray-200 p-8 text-center min-h-[300px]">
            {allSigned ? (
              <div className="animate-in fade-in zoom-in duration-500 flex flex-col items-center">
                <div className="w-24 h-24 bg-[#0B1F3A] rounded-full flex items-center justify-center mb-6 shadow-lg border-4 border-white">
                  <CheckCircle2 className="w-12 h-12 text-[#F5A623]" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Enrolment Complete</h3>
                <div className="bg-blue-50 text-[#0B1F3A] px-4 py-2 rounded-full text-sm font-semibold border border-blue-100 mb-4">
                  Jasmine School SDG Entrepreneur
                </div>
                <p className="text-xs text-gray-500 italic">Business name locked until Market Exposure is logged.</p>
              </div>
            ) : (
              <div className="text-gray-400 flex flex-col items-center">
                <div className="w-20 h-20 border-2 border-dashed border-gray-300 rounded-full mb-4 flex items-center justify-center">
                  <span className="text-gray-300 text-2xl">?</span>
                </div>
                <p className="text-sm">Complete all signatures to reveal your identity badge.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function SignatureRow({ label, isSigned, onSign }: { label: string, isSigned: boolean, onSign: () => void }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm font-medium text-gray-700 w-1/3">{label}</span>
      {isSigned ? (
        <div className="flex-1 border-b-2 border-[#0B1F3A] mx-4 relative h-8 flex items-end pb-1 justify-center">
          <span className="font-script text-[#0B1F3A] text-xl transform -rotate-3">Signed</span>
        </div>
      ) : (
        <button 
          onClick={onSign}
          className="flex-1 border-b-2 border-dashed border-gray-300 mx-4 h-8 flex items-end pb-1 justify-center text-xs text-gray-400 hover:border-[#F5A623] hover:text-[#F5A623] transition-colors"
        >
          Tap to initial
        </button>
      )}
    </div>
  );
}
