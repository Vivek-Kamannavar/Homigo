import React from 'react';
import { HitlDecisionStation } from '../components/HitlDecisionStation';
import { Scale, ArrowRight, ShieldCheck, UserCheck, Lock, Award, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export const HitlPage: React.FC = () => {
  return (
    <div className="space-y-14 pb-20 pt-8">
      {/* Page Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-400 text-xs font-mono mb-4">
          <Scale className="w-3.5 h-3.5" />
          <span>PAGE 03: HUMAN-IN-THE-LOOP CHECKPOINT ARCHITECTURE</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight">
          Humans at Liability Checkpoints. Not Data Entry.
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl mx-auto">
          Removing humans from 95% mundane spreadsheet labor and placing licensed CPAs and Attorneys strictly at high-value statutory ambiguity and fiduciary accountability gates.
        </p>
      </div>

      {/* Main HITL Component */}
      <HitlDecisionStation />

      {/* Partner Assurance & Legal Liability Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-10 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-4 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 text-xs font-mono font-bold bg-cyan-950 text-cyan-300 border border-cyan-500/30 rounded uppercase">
                  Institutional Governance
                </span>
                <span className="text-xs text-slate-400 font-mono">Delaware Lic #AEGIS-FID-2024</span>
              </div>
              <h3 className="text-2xl font-bold text-white">
                How Aegis Assumes Legal Responsibility
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Traditional software disclaims all liability in their Terms of Service. In contrast, Aegis acts as the paid preparer of record on IRS Form 1120-S and signs under Treasury Department Circular 230 regulations, backed by a \$5M Errors & Omissions policy.
              </p>
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Licensed Supervising Partner Signature</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Full Audit Defense Shield Included</span>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 text-center w-full lg:w-72 shrink-0">
              <Award className="w-10 h-10 text-amber-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white font-mono">$5,000,000</div>
              <div className="text-xs text-slate-400 mt-1">E&O Professional Liability Insurance Coverage</div>
              <div className="mt-4 pt-3 border-t border-slate-800 text-[10px] font-mono text-emerald-400">
                Policy #AEGIS-5M-2024
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-800 flex justify-end">
            <Link
              to="/economics"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 shadow-md"
            >
              <span>Explore 10x Economics & Calculator (Page 4)</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
