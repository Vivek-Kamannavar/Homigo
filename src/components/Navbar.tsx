import React from 'react';
import { ShieldCheck, Cpu, ArrowRight, Activity, Award } from 'lucide-react';

interface NavbarProps {
  onOpenSimulator: () => void;
  onOpenContractModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenSimulator, onOpenContractModal }) => {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-slate-950/80 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-emerald-500/20 text-slate-950">
              <ShieldCheck className="w-6 h-6 stroke-[2.2]" />
            </div>
            <span className="absolute -bottom-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold tracking-tight text-white font-mono">
                AEGIS<span className="text-emerald-400">.firm</span>
              </span>
              <span className="px-2 py-0.5 text-[10px] font-semibold tracking-wide uppercase bg-emerald-950/80 text-emerald-400 border border-emerald-500/30 rounded-full">
                Service Operator
              </span>
            </div>
            <p className="text-[11px] text-slate-400 tracking-wider">Autonomous Fiduciary & Tax Firm</p>
          </div>
        </div>

        {/* Live Operating Status Pill */}
        <div className="hidden lg:flex items-center gap-3 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 text-xs">
          <div className="flex items-center gap-2 text-emerald-400 font-mono">
            <Activity className="w-3.5 h-3.5 animate-pulse text-emerald-400" />
            <span>SWARM STATUS: 99.98% AUTONOMOUS</span>
          </div>
          <span className="text-slate-600">|</span>
          <div className="flex items-center gap-1.5 text-slate-300">
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span>4 CPA Partners On-Duty</span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
          <a href="#four-pillars" className="hover:text-emerald-400 transition-colors">
            The 4 Shifts
          </a>
          <a href="#live-simulator" className="hover:text-emerald-400 transition-colors flex items-center gap-1">
            <Cpu className="w-3.5 h-3.5 text-emerald-400" />
            <span>Agent Simulator</span>
          </a>
          <a href="#hitl-station" className="hover:text-emerald-400 transition-colors">
            Human-in-the-Loop
          </a>
          <a href="#economics" className="hover:text-emerald-400 transition-colors">
            10x Economics
          </a>
          <a href="#services" className="hover:text-emerald-400 transition-colors">
            Services
          </a>
        </nav>

        {/* CTA Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenSimulator}
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-slate-600 transition-all"
          >
            Run Agent Pipeline
          </button>
          <button
            onClick={onOpenContractModal}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold text-slate-950 bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 shadow-md shadow-emerald-500/20 transition-all transform active:scale-95"
          >
            <span>Fulfill a Contract</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </header>
  );
};

