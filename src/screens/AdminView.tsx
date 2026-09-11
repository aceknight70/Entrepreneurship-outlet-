import React from 'react';
import { ArrowLeft, Users, FileText, Settings, BarChart2 } from 'lucide-react';

export function AdminViewScreen({ onBack }: { onBack: () => void }) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <div className="bg-[#0B1F3A] pt-12 pb-6 px-4">
        <div className="max-w-3xl mx-auto flex items-center gap-4">
          <button onClick={onBack} className="text-white hover:text-gray-200">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-2xl font-black text-white tracking-tight uppercase">Admin Dashboard</h1>
            <p className="text-blue-200 text-sm">School Management System</p>
          </div>
        </div>
      </div>

      <div className="flex-1 max-w-3xl mx-auto w-full p-4 space-y-6 mt-6">
        
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

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="bg-gray-100 p-4 border-b border-gray-200">
            <h2 className="text-sm font-black text-gray-700 uppercase tracking-wider">Recent Activity</h2>
          </div>
          <div className="divide-y divide-gray-100">
            <div className="p-4 flex items-center justify-between">
              <div>
                <p className="font-bold text-gray-900">Sarah Jenkins</p>
                <p className="text-xs text-gray-500">Submitted Week 2 Homework</p>
              </div>
              <button className="text-blue-600 text-sm font-bold hover:underline">Review</button>
            </div>
            <div className="p-4 flex items-center justify-between">
              <div>
                <p className="font-bold text-gray-900">Marcus Cole</p>
                <p className="text-xs text-gray-500">Parent signed Waiver</p>
              </div>
              <span className="text-green-600 text-xs font-bold uppercase">Approved</span>
            </div>
            <div className="p-4 flex items-center justify-between">
              <div>
                <p className="font-bold text-gray-900">Elena Rodriguez</p>
                <p className="text-xs text-gray-500">Completed Phase 1</p>
              </div>
              <span className="text-gray-400 text-xs font-bold uppercase">Auto</span>
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
