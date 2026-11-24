import React from 'react';
import { LiveAgentSimulator } from '../components/LiveAgentSimulator';
import { Cpu, ArrowRight, ShieldAlert, Sparkles, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';

export const SimulatorPage: React.FC = () => {
  return (
    <div className="space-y-12 pb-20 pt-8">
      {/* Page Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-950/80 border border-teal-500/30 text-teal-400 text-xs font-mono mb-4">
          <Cpu className="w-3.5 h-3.5" />
          <span>PAGE 02: AUTONOMOUS MULTI-AGENT EXECUTION COCKPIT</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight">
          Live Autonomous Multi-Agent Swarm Engine
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl mx-auto">
          Execute real-world business scenarios. Observe the 4 domain-tuned AI agents collaborate through perception, computation, statutory audit verification, and final government XML assembly.
        </p>
      </div>

      {/* Centerpiece Simulator Component */}
      <LiveAgentSimulator
        onTriggerHitlView={() => window.location.assign('/hitl')}
      />

      {/* Agent Fleet Specifications */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
            <div className="text-xs font-mono text-emerald-400 font-bold mb-1">01. NOVA-INGEST</div>
            <h4 className="text-sm font-bold text-white mb-2">Perception & OCR Engine</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Handles multi-modal parsing of bank CSVs, unstructured PDF invoices, and Gusto payroll runs with 99.98% field extraction precision.
            </p>
          </div>
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
            <div className="text-xs font-mono text-teal-400 font-bold mb-1">02. CORTEX-MATH</div>
            <h4 className="text-sm font-bold text-white mb-2">Computation & Tax Logic</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Calculates Section 174 amortization schedules, Section 41 Qualified Research Expenses (QRE), and multi-state nexus allocations in sub-second latency.
            </p>
          </div>
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
            <div className="text-xs font-mono text-amber-400 font-bold mb-1">03. LEX-AUDIT</div>
            <h4 className="text-sm font-bold text-white mb-2">Statutory Compliance Guard</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Simulates 140+ IRS audit triggers, checking drafts against 48,000+ pages of the Internal Revenue Code and flagging ambiguities for human review.
            </p>
          </div>
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
            <div className="text-xs font-mono text-cyan-400 font-bold mb-1">04. AEGIS-DRAFTER</div>
            <h4 className="text-sm font-bold text-white mb-2">Synthesis & Filing Agent</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Compiles certified IRS Form 1120-S, Form 6765, GAAP financial balance sheets, and Modernized e-File (MeF) government XML envelopes.
            </p>
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <Link
            to="/hitl"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 shadow-md"
          >
            <span>Explore Human-in-the-Loop Station (Page 3)</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
};
