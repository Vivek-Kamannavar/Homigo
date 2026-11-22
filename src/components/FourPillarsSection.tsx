import React, { useState } from 'react';
import { PILLARS_DATA } from '../data/mockData';
import { Check, Shield, Cpu, Scale, TrendingUp, Layers, ChevronRight, Zap } from 'lucide-react';

export const FourPillarsSection: React.FC = () => {
  const [activePillarIndex, setActivePillarIndex] = useState(0);
  const currentPillar = PILLARS_DATA[activePillarIndex];

  const pillarIcons = [
    <Shield className="w-5 h-5 text-emerald-400" />,
    <Cpu className="w-5 h-5 text-teal-400" />,
    <Scale className="w-5 h-5 text-cyan-400" />,
    <TrendingUp className="w-5 h-5 text-amber-400" />,
  ];

  return (
    <section id="four-pillars" className="py-24 bg-slate-900/60 border-t border-b border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-mono mb-4 border border-slate-700">
            <Layers className="w-3.5 h-3.5 text-emerald-400" />
            <span>ARCHITECTURAL FOUNDATION</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            The 4 Foundational Pillars of the Full-Stack AI Firm
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-400">
            Why modern software is no longer a tool you operate, but an autonomous entity that executes regulated professional services directly.
          </p>
        </div>

        {/* Tab Navigation for the 4 Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {PILLARS_DATA.map((pillar, idx) => {
            const isActive = activePillarIndex === idx;
            return (
              <button
                key={pillar.number}
                onClick={() => setActivePillarIndex(idx)}
                className={`text-left p-5 rounded-xl border transition-all relative overflow-hidden group ${
                  isActive
                    ? 'bg-slate-800/90 border-emerald-500/60 shadow-lg shadow-emerald-500/10'
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900/40'
                }`}
              >
                {isActive && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 to-teal-400" />
                )}
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-2xl font-black text-slate-500 group-hover:text-slate-400 transition-colors">
                    {pillar.number}
                  </span>
                  <div className="p-2 rounded-lg bg-slate-900/80 border border-slate-800">
                    {pillarIcons[idx]}
                  </div>
                </div>
                <h3 className={`text-sm font-bold leading-snug ${isActive ? 'text-white' : 'text-slate-300'}`}>
                  {pillar.title}
                </h3>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                  {pillar.subtitle}
                </p>
              </button>
            );
          })}
        </div>

        {/* Detailed Pillar Card */}
        <div className="glass-panel-glow rounded-2xl p-6 sm:p-10 relative overflow-hidden">
          <div className="flex flex-col lg:flex-row gap-8 items-start justify-between">
            
            {/* Left Content */}
            <div className="flex-1 space-y-6">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono font-bold text-emerald-400 px-3 py-1 rounded bg-emerald-950/80 border border-emerald-500/30">
                  PILLAR {currentPillar.number}
                </span>
                <span className="text-sm font-semibold text-slate-400">{currentPillar.subtitle}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                {currentPillar.title}
              </h3>

              <p className="text-base text-slate-300 leading-relaxed font-normal">
                {currentPillar.tagline}
              </p>

              {/* Contrast Comparison Box */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-slate-950/70 border border-red-500/20">
                  <div className="text-xs font-mono font-bold text-red-400 mb-2 flex items-center gap-1.5">
                    <span>✕</span> TRADITIONAL SAAS APPROACH
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {currentPillar.traditionalSaaSVsAegis.traditional}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/70 border border-emerald-500/30">
                  <div className="text-xs font-mono font-bold text-emerald-400 mb-2 flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5" /> AEGIS OPERATOR APPROACH
                  </div>
                  <p className="text-xs text-slate-200 leading-relaxed">
                    {currentPillar.traditionalSaaSVsAegis.aegis}
                  </p>
                </div>
              </div>

              {/* Key Mechanisms Checklist */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                  Operational Architecture:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {currentPillar.keyPillars.map((item, i) => (
                    <div key={i} className="p-3.5 rounded-lg bg-slate-900/80 border border-slate-800">
                      <div className="text-xs font-bold text-white mb-1 flex items-center gap-1.5">
                        <Zap className="w-3 h-3 text-emerald-400 shrink-0" />
                        <span>{item.title}</span>
                      </div>
                      <p className="text-[11px] text-slate-400 leading-snug">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Metric Stat Box */}
            <div className="w-full lg:w-72 shrink-0 p-6 rounded-xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 text-center flex flex-col items-center justify-center">
              <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300 font-mono mb-2">
                {currentPillar.stat.value}
              </div>
              <div className="text-xs font-semibold text-slate-300 max-w-[180px] mb-4">
                {currentPillar.stat.label}
              </div>
              <div className="w-full h-px bg-slate-800 mb-4" />
              <div className="text-[11px] text-slate-400 flex items-center gap-1.5 text-left">
                <Shield className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Audited under strict GAAP & IRC statutory guidelines</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

