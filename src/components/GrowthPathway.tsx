import React from 'react';
import { SCHOOL_CONFIG } from '../config';
import { 
  BadgeCheck, 
  Leaf, 
  PackageCheck, 
  Landmark, 
  Store, 
  ArrowRight,
  Sparkles
} from 'lucide-react';

export function GrowthPathway() {
  const stages = [
    {
      stageNumber: '01',
      stageTag: 'Starting Point',
      audience: 'Every Student • Day 1',
      title: `${SCHOOL_CONFIG.name} SDG Entrepreneur`,
      description: 'Every student starts here. This is a real identity, not a finished business.',
      icon: BadgeCheck,
      iconBg: 'bg-blue-50 text-blue-700 border-blue-200',
      badgeColor: 'bg-blue-100 text-blue-800',
      milestone: 'Day 1 Starting Identity'
    },
    {
      stageNumber: '02',
      stageTag: 'Junior Tier',
      audience: 'Primary & JSS Students',
      title: 'Responsible Use Champion',
      description: 'Younger students build the foundation: understanding responsible, sustainable production before moving to full production themselves.',
      icon: Leaf,
      iconBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      badgeColor: 'bg-emerald-100 text-emerald-800',
      milestone: 'Sustainable Craft Foundation'
    },
    {
      stageNumber: '03',
      stageTag: 'Senior Tier',
      audience: 'SS Students • Post-Production',
      title: 'Producer & Asset Owner',
      description: 'Students who complete production hold real, sellable items and real assets. This stage opens eligibility for SDG Entrepreneur Mentorship Grants.',
      icon: PackageCheck,
      iconBg: 'bg-amber-50 text-amber-700 border-amber-200',
      badgeColor: 'bg-amber-100 text-amber-800',
      milestone: 'Real Products & Grant Eligibility'
    },
    {
      stageNumber: '04',
      stageTag: 'Graduate Tier',
      audience: 'Age 18+ & Alumni',
      title: 'Industry-Ready Entrepreneur',
      description: 'Graduates can apply for support from the Bank of Industry and other industry/investor sources, backed by their documented training and mentorship record from the programme.',
      icon: Landmark,
      iconBg: 'bg-indigo-50 text-indigo-700 border-indigo-200',
      badgeColor: 'bg-indigo-100 text-indigo-800',
      milestone: 'Bank of Industry & Capital Access'
    }
  ];

  return (
    <section id="growth-pathway-section" className="w-full mt-14 text-left">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-10 relative overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#F5A623]/5 rounded-full blur-3xl pointer-events-none" />
        
        {/* Section Header */}
        <div className="max-w-2xl mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0B1F3A]/5 text-[#0B1F3A] text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#F5A623]" />
            <span>Honest Progression Framework</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#0B1F3A] tracking-tight">
            Your Child's Growth Pathway
          </h2>
          <p className="text-gray-600 mt-2 text-sm sm:text-base leading-relaxed">
            We don't promise overnight entrepreneurs. We provide an authentic starting identity on Day 1, followed by a grounded, step-by-step pathway from foundation knowledge to real asset ownership and institutional backing.
          </p>
        </div>

        {/* 4-Stage Pathway Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 relative">
          {stages.map((stage, index) => {
            const IconComponent = stage.icon;
            return (
              <div 
                key={stage.stageNumber}
                id={`growth-stage-${stage.stageNumber}`}
                className="relative bg-gray-50/80 hover:bg-gray-50 border border-gray-200/80 rounded-xl p-5 sm:p-6 transition-all duration-200 flex flex-col justify-between group"
              >
                <div>
                  {/* Top row: Icon + Stage Tag */}
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className={`w-14 h-14 rounded-xl border flex items-center justify-center shrink-0 shadow-xs ${stage.iconBg}`}>
                      <IconComponent className="w-7 h-7" strokeWidth={2.2} />
                    </div>
                    
                    <div className="text-right">
                      <span className="text-[11px] font-black uppercase tracking-wider text-gray-400 block">
                        STAGE {stage.stageNumber}
                      </span>
                      <span className={`inline-block text-xs font-bold px-2.5 py-0.5 rounded-full mt-1 ${stage.badgeColor}`}>
                        {stage.stageTag}
                      </span>
                    </div>
                  </div>

                  {/* Audience Subtitle */}
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                    {stage.audience}
                  </p>

                  {/* Stage Title */}
                  <h3 className="text-lg sm:text-xl font-black text-[#0B1F3A] leading-snug tracking-tight mb-2.5">
                    {stage.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {stage.description}
                  </p>
                </div>

                {/* Milestone Footer Badge */}
                <div className="mt-5 pt-3.5 border-t border-gray-200/70 flex items-center justify-between text-xs">
                  <span className="text-gray-500 font-medium">Outcome Focus:</span>
                  <span className="font-bold text-gray-800 flex items-center gap-1.5">
                    {stage.milestone}
                    {index < 3 && <ArrowRight className="w-3.5 h-3.5 text-gray-400 hidden sm:inline" />}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Ongoing Stage Banner */}
        <div 
          id="growth-stage-ongoing"
          className="mt-6 bg-gradient-to-r from-[#0B1F3A] to-[#15325A] text-white rounded-xl p-6 sm:p-7 border border-[#0B1F3A] shadow-md flex flex-col sm:flex-row items-start sm:items-center gap-5"
        >
          <div className="w-14 h-14 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center shrink-0 text-[#F5A623]">
            <Store className="w-7 h-7" strokeWidth={2.2} />
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-[#F5A623] text-[#0B1F3A] text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded">
                Ongoing • Every Stage
              </span>
              <span className="text-blue-200 text-xs font-semibold">Continuous Ecosystem</span>
            </div>
            
            <h3 className="text-lg sm:text-xl font-black text-white tracking-tight">
              Connected to the {SCHOOL_CONFIG.name} Marketplace
            </h3>
            
            <p className="text-blue-100/90 text-sm mt-1 leading-relaxed max-w-2xl">
              Students stay connected to a marketplace to keep selling and growing, not just at one Market Day event.
            </p>
          </div>
        </div>

        {/* Authenticity Notice */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500 max-w-xl mx-auto italic">
            * Progression reflects verified course completion, hands-on workshop safety standards, and real portfolio documentation.
          </p>
        </div>
      </div>
    </section>
  );
}
