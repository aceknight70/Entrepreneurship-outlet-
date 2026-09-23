import React from 'react';
import { ViewState } from '../types';
import { Layers, GraduationCap, LayoutDashboard, BookOpen, PenTool, Store, Shield, Users, Package, Image as ImageIcon, Sparkles } from 'lucide-react';

interface PrototypeNavProps {
  currentView: ViewState;
  onViewChange: (view: ViewState) => void;
}

export function PrototypeNav({ currentView, onViewChange }: PrototypeNavProps) {
  const navItems: { id: ViewState; label: string; icon: React.ReactNode }[] = [
    { id: 'landing', label: '1. Landing', icon: <Layers className="w-4 h-4" /> },
    { id: 'gallery', label: '2. Gallery', icon: <ImageIcon className="w-4 h-4" /> },
    { id: 'enrolment', label: '3. Enrolment', icon: <PenTool className="w-4 h-4" /> },
    { id: 'dashboard', label: '4. Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'knowledge', label: '5. Knowledge', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'preparation', label: '6. Preparation', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'production', label: '7. Production', icon: <Package className="w-4 h-4" /> },
    { id: 'market', label: '8. Market', icon: <Store className="w-4 h-4" /> },
    { id: 'graduation', label: '9. Graduation', icon: <GraduationCap className="w-4 h-4" /> },
    { id: 'admin', label: '10. Admin View', icon: <Shield className="w-4 h-4" /> },
    { id: 'parent', label: '11. Parent View', icon: <Users className="w-4 h-4" /> },
    { id: 'bridge', label: '12. Graphitti Bridge', icon: <Sparkles className="w-4 h-4" /> },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800 p-2 z-50 overflow-x-auto">
      <div className="flex items-center gap-2 max-w-7xl mx-auto min-w-max px-2">
        <span className="text-gray-400 text-xs font-semibold uppercase tracking-wider mr-2">Prototype Navigation:</span>
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onViewChange(item.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
              currentView === item.id
                ? 'bg-[#F5A623] text-gray-900 shadow-md'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
            }`}
          >
            {item.icon}
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}
