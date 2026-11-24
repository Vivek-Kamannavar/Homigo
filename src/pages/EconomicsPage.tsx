import React from 'react';
import { EconomicsComparison } from '../components/EconomicsComparison';
import { TrendingUp, ArrowRight, DollarSign, Clock, Users, Zap, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export const EconomicsPage: React.FC = () => {
  return (
    <div className="space-y-14 pb-20 pt-8">
      {/* Page Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/80 border border-amber-500/30 text-amber-400 text-xs font-mono mb-4">
          <TrendingUp className="w-3.5 h-3.5" />
          <span>PAGE 04: MARKET DISRUPTION & 10X ECONOMICS</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight">
          10x Faster. 80% Lower Cost. Infinite Scale.
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl mx-auto">
          Traditional accounting and audit firms are fundamentally constrained by human hourly billing. By reducing compute costs per return to pennies, Aegis profitably services the 33 million long-tail SMBs traditional firms reject.
        </p>
      </div>

      {/* Main Economics Simulator */}
      <EconomicsComparison />

      {/* Deep Dive Unit Economics Breakdown */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800">
            <div className="text-xs font-mono text-emerald-400 font-bold mb-2">UNIT ECONOMIC ENGINE</div>
            <h4 className="text-lg font-bold text-white mb-2">Zero Marginal Compute</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              LLM inference and AST tax validation cost less than $1.80 per corporate return. This creates 78%+ gross margins at an 80% lower customer price point.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800">
            <div className="text-xs font-mono text-cyan-400 font-bold mb-2">LABOR LIBERATION</div>
            <h4 className="text-lg font-bold text-white mb-2">300+ Hours Saved / Year</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Founders and accounting teams eliminate manual invoice pairing, receipt chasing, and spreadsheet cell mapping forever.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800">
            <div className="text-xs font-mono text-amber-400 font-bold mb-2">LONG-TAIL UNLOCK</div>
            <h4 className="text-lg font-bold text-white mb-2">Democratic Tax Strategy</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Early-stage startups and solo contractors gain access to Fortune 500 R&D credit optimization without needing a $15,000 Big 4 retainer.
            </p>
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 shadow-md"
          >
            <span>Explore Regulated Services Catalog (Page 5)</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
};

