import React from 'react';
import { ArrowLeft, CheckCircle, Shield, AlertTriangle } from 'lucide-react';

export function ParentViewScreen({ onBack }: { onBack: () => void }) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <div className="bg-[#0B1F3A] pt-12 pb-6 px-4">
        <div className="max-w-3xl mx-auto flex items-center gap-4">
          <button onClick={onBack} className="text-white hover:text-gray-200">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-2xl font-black text-white tracking-tight uppercase">Parent Portal</h1>
            <p className="text-blue-200 text-sm">Monitor your child's progress</p>
          </div>
        </div>
      </div>

      <div className="flex-1 max-w-3xl mx-auto w-full p-4 space-y-6 mt-6">
        
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-black text-gray-900 uppercase">Child Progress</h2>
            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold uppercase">On Track</span>
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
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900">Phase 2: Preparation</h3>
                <p className="text-sm text-gray-500">In Progress (Week 3)</p>
              </div>
              <button className="bg-[#0B1F3A] text-white px-4 py-2 rounded-lg text-xs font-bold uppercase hover:bg-[#15325A]">
                Sign Homework
              </button>
            </div>
            
            <div className="flex items-center gap-4 opacity-50">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                <Shield className="w-6 h-6 text-gray-400" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900">Phase 3: Production</h3>
                <p className="text-sm text-gray-500">Locked</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h2 className="text-lg font-black text-gray-900 uppercase mb-4">Safety Agreements</h2>
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
            <h4 className="font-bold text-yellow-800 mb-1 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" /> Liability Waiver
            </h4>
            <p className="text-sm text-yellow-700">Signed on Aug 15, 2024. Covers resin handling and workshop tools.</p>
          </div>
        </div>

      </div>
    </div>
  );
}
