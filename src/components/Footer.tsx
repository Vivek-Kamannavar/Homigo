import React from 'react';
import { ShieldCheck, ArrowRight, Lock, Award, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          
          {/* Brand Col */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-slate-950 font-bold">
                <ShieldCheck className="w-5 h-5 stroke-[2.5]" />
              </div>
              <span className="text-lg font-bold text-white font-mono">
                AEGIS<span className="text-emerald-400">.firm</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              The full-stack AI service operator that fulfills corporate tax, audit, and regulatory filings directly with autonomous multi-agent execution and certified CPA partner sign-off.
            </p>
            <div className="flex items-center gap-2 text-[11px] font-mono text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>All Agent Fleet Systems Operational</span>
            </div>
          </div>

          {/* Pillars Col */}
          <div>
            <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider mb-4">
              The 4 Pillars
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#four-pillars" className="hover:text-emerald-400 transition-colors">1. Tool to Service Operator</a></li>
              <li><a href="#live-simulator" className="hover:text-emerald-400 transition-colors">2. Autonomous Multi-Agent Swarm</a></li>
              <li><a href="#hitl-station" className="hover:text-emerald-400 transition-colors">3. High-Value HITL Governance</a></li>
              <li><a href="#economics" className="hover:text-emerald-400 transition-colors">4. Market Disruption & 10x Scale</a></li>
            </ul>
          </div>

          {/* Services Col */}
          <div>
            <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider mb-4">
              Autonomous Services
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#services" className="hover:text-emerald-400 transition-colors">Corporate Tax (1120-S / 1065)</a></li>
              <li><a href="#services" className="hover:text-emerald-400 transition-colors">Section 41 R&D Payroll Credit</a></li>
              <li><a href="#services" className="hover:text-emerald-400 transition-colors">Continuous GAAP Audit</a></li>
              <li><a href="#services" className="hover:text-emerald-400 transition-colors">1099 Contractor Reconciliation</a></li>
              <li><a href="#services" className="hover:text-emerald-400 transition-colors">M&A Contract Diligence</a></li>
            </ul>
          </div>

          {/* Regulatory & Security */}
          <div>
            <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider mb-4">
              Fiduciary & Insurance
            </h4>
            <div className="space-y-3 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <Lock className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>IRS Authorized e-File Provider & Modernized e-File (MeF) compliant.</span>
              </div>
              <div className="flex items-start gap-2">
                <Award className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>$5,000,000 Professional Errors & Omissions Policy #AEGIS-5M-2024.</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © 2026 Aegis Autonomous Operating Firm Inc. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-400 cursor-pointer">IRS Circular 230 Notice</span>
            <span className="hover:text-slate-400 cursor-pointer">Fiduciary License Registry</span>
            <span className="hover:text-slate-400 cursor-pointer">Privacy & Encryption</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

