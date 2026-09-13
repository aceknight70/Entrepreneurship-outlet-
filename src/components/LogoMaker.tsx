import React, { useState } from 'react';

export function LogoMaker() {
  const [name, setName] = useState('');
  const [mission, setMission] = useState('');
  const ringText = "JASMINE SCHOOL SHADOW SDG ENTREPRENEUR";

  return (
    <div className="bg-white p-6 rounded-xl border-2 border-gray-100 shadow-sm flex flex-col md:flex-row gap-8 items-center mb-6">
      {/* Controls */}
      <div className="flex-1 space-y-4 w-full">
        <div className="mb-2">
          <h4 className="font-black text-gray-900 text-lg uppercase tracking-wider">Logo Maker</h4>
          <p className="text-sm text-gray-500">Live preview. Builds your official badge.</p>
        </div>
        
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">Center Text (Your Name)</label>
          <input 
            type="text" 
            maxLength={22}
            value={name} 
            onChange={e => setName(e.target.value)} 
            className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
            placeholder="e.g. Chidinma"
          />
        </div>
        
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">Mission Line</label>
          <input 
            type="text" 
            maxLength={60}
            value={mission} 
            onChange={e => setMission(e.target.value)} 
            className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
            placeholder="e.g. Turning resin into real skills."
          />
          <p className="text-xs text-gray-400 mt-1 text-right">{mission.length}/60</p>
        </div>
        
        <button className="w-full bg-[#0B1F3A] text-white py-3 rounded-lg font-bold uppercase tracking-wider hover:bg-[#15325A] transition-all shadow-md hover:shadow-lg mt-2">
          Save Badge
        </button>
      </div>

      {/* Preview */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 bg-blue-50/50 rounded-xl w-full border border-blue-100 min-h-[250px]">
        <div className="relative w-48 h-48 drop-shadow-sm transition-all duration-300">
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <defs>
              {/* Sweep flag 1 draws the top arc */}
              <path id="topArc" d="M 15 110 A 85 85 0 0 1 185 110" fill="none" />
            </defs>
            
            {/* Background Circle */}
            <circle cx="100" cy="100" r="95" fill="#ffffff" stroke="#0B1F3A" strokeWidth="4" />
            
            {/* Inner dotted decorative ring */}
            <circle cx="100" cy="100" r="65" fill="none" stroke="#0B1F3A" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.5" />
            
            {/* Ring Text */}
            <text fontSize="10.5" fill="#0B1F3A" fontWeight="900" letterSpacing="1.2" style={{ textTransform: 'uppercase' }}>
              <textPath href="#topArc" startOffset="50%" textAnchor="middle">
                {ringText}
              </textPath>
            </text>
            
            {/* Center Text */}
            <text x="100" y="108" fontSize="18" fill="#0B1F3A" fontWeight="900" textAnchor="middle" style={{ textTransform: 'uppercase' }}>
              {name || 'YOUR NAME'}
            </text>
          </svg>
        </div>
        
        {/* Mission Line below circle */}
        <div className="mt-6 text-center max-w-[200px] h-10 flex items-center justify-center">
          <p className="text-sm font-medium text-blue-900 leading-tight">
            {mission || 'Your mission statement goes here.'}
          </p>
        </div>
      </div>
    </div>
  );
}
