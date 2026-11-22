import React from 'react';
import { ArrowRight, CheckCircle2, ShieldCheck, Zap, Sparkles, AlertCircle, PlayCircle, Scale } from 'lucide-react';

interface HeroProps {
  onLaunchDemo: () => void;
  onExplorePillars: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onLaunchDemo, onExplorePillars }) => {
  return (
    <section className="relative pt-12 pb-20 overflow-hidden hero-grid">
      {/* Background ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-tr from-emerald-500/15 via-teal-500/10 to-transparent blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute top-1/3 right-10 w-[400px] h-[300px] bg-blue-500/10 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Paradigm Shift Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-xs font-medium mb-6 backdrop-blur-md shadow-inner">
            <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
            <span className="font-mono">PARADIGM SHIFT: SERVICE-AS-A-SOFTWARE</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="text-slate-300">Beyond Tool Licenses</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1] mb-6">
            Don't buy software to do work.{' '}
            <span className="block mt-2 bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
              Hire the autonomous AI firm
            </span>
            <span className="block text-slate-300 font-semibold text-3xl sm:text-5xl lg:text-6xl mt-1">
              that fulfills the contract directly.
            </span>
          </h1>

          {/* Subtitle articulating the 4 steps */}
          <p className="text-lg sm:text-xl text-slate-300/90 leading-relaxed max-w-3xl mx-auto mb-10 font-normal">
            Traditional SaaS sells you an empty dashboard and demands 40 hours of your manual labor. 
            <strong className="text-white font-semibold"> Aegis is a full-stack AI service operator</strong>: our autonomous multi-agent swarm ingests raw data, executes tax filings and audits end-to-end, and licensed human CPAs certify the legal liability.
          </p>

          {/* Call to Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
            <button
              onClick={onLaunchDemo}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-7 py-4 rounded-xl text-base font-bold text-slate-950 bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 shadow-xl shadow-emerald-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <PlayCircle className="w-5 h-5 fill-slate-950 text-emerald-400" />
              <span>Simulate Autonomous Execution</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onExplorePillars}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-base font-semibold text-slate-300 bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 hover:border-slate-600 transition-all"
            >
              <Scale className="w-4 h-4 text-emerald-400" />
              <span>Analyze The 4 Core Steps</span>
            </button>
          </div>

          {/* 4 Pillars Fast Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto text-left">
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm">
              <div className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-wider mb-1">01. Service Operator</div>
              <div className="text-xs font-semibold text-white">Full contract fulfillment, zero customer DIY labor</div>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm">
              <div className="text-[10px] font-mono font-bold text-teal-400 uppercase tracking-wider mb-1">02. Multi-Agent Swarm</div>
              <div className="text-xs font-semibold text-white">Ingestion, Math, and Statutory verifier loops</div>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm">
              <div className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-wider mb-1">03. High-Value HITL</div>
              <div className="text-xs font-semibold text-white">Humans at liability & judgment checkpoints only</div>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm">
              <div className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-wider mb-1">04. 10x Disruption</div>
              <div className="text-xs font-semibold text-white">80% lower cost, minutes instead of 3 weeks</div>
            </div>
          </div>
        </div>

        {/* Live System Comparison Floating Showcase */}
        <div className="mt-14 max-w-5xl mx-auto rounded-2xl border border-slate-800 bg-slate-900/90 shadow-2xl p-6 sm:p-8 backdrop-blur-xl">
          <div className="flex flex-col md:flex-row items-stretch justify-between gap-6">
            
            {/* The Old Way */}
            <div className="flex-1 p-5 rounded-xl bg-slate-950/60 border border-red-500/20 relative">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono font-semibold text-red-400 uppercase tracking-wider flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5" />
                  Traditional SaaS Model
                </span>
                <span className="text-[10px] bg-red-950 text-red-300 px-2 py-0.5 rounded border border-red-800/40">Tool Provider</span>
              </div>
              <h3 className="text-base font-bold text-white mb-2">You buy software licenses. YOU do the labor.</h3>
              <ul className="space-y-2 text-xs text-slate-400">
                <li className="flex items-start gap-2">
                  <span className="text-red-400 font-mono font-bold">✕</span>
                  <span>Customer spends 30+ hours manually inputting numbers into boxes</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 font-mono font-bold">✕</span>
                  <span>Software disclaims all fiduciary and legal liability in Terms of Service</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 font-mono font-bold">✕</span>
                  <span>Still requires hiring a $4,500 external CPA to actually sign & file</span>
                </li>
              </ul>
            </div>

            {/* VS Divider */}
            <div className="flex items-center justify-center">
              <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-mono font-bold text-slate-300 shadow-md">
                VS
              </div>
            </div>

            {/* The Aegis Way */}
            <div className="flex-1 p-5 rounded-xl bg-gradient-to-br from-emerald-950/40 via-slate-950/80 to-teal-950/30 border border-emerald-500/40 relative">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono font-semibold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-emerald-400" />
                  Aegis Autonomous Firm
                </span>
                <span className="text-[10px] bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/40 font-semibold">Service Operator</span>
              </div>
              <h3 className="text-base font-bold text-white mb-2">You contract the result. AI & CPAs deliver it.</h3>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Upload raw PDF bank exports or Stripe keys; AI handles 100% of calculation</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Autonomous multi-agent execution completes audit & returns in 10 minutes</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Certified Human CPA Partner signs the return with $5M liability coverage</span>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

