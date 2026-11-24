import React from 'react';
import { FourPillarsSection } from '../components/FourPillarsSection';
import { ShieldCheck, Cpu, Scale, TrendingUp, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export const PillarsPage: React.FC = () => {
  return (
    <div className="space-y-16 pb-20 pt-8">
      {/* Page Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 text-xs font-mono mb-4">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>PAGE 01: THE 4 FOUNDATIONAL PILLARS</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight">
          The Architectural Blueprint of the Full-Stack AI Firm
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl mx-auto">
          Analyzing the fundamental shift from selling empty software licenses to operating as the actual licensed legal and fiduciary entity that executes professional service contracts directly.
        </p>
      </div>

      {/* Interactive Four Pillars Main Component */}
      <FourPillarsSection />

      {/* Deep Dive Comparative Matrix */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-10 rounded-2xl bg-slate-900 border border-slate-800">
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-6">
            Detailed Paradigm Comparison: Traditional SaaS vs Aegis Firm
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400">
                  <th className="py-3 px-4">Evaluation Dimension</th>
                  <th className="py-3 px-4 text-red-400">Legacy Tool Provider (SaaS 1.0/2.0)</th>
                  <th className="py-3 px-4 text-emerald-400 font-bold">Aegis Service Operator (SaaS 3.0)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                <tr>
                  <td className="py-3 px-4 font-bold text-white">Business Model</td>
                  <td className="py-3 px-4">Software license ($150–$350/seat/mo)</td>
                  <td className="py-3 px-4 text-emerald-300 font-semibold">Service Contract Fulfillment ($299 flat fee)</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-bold text-white">Who Performs Labor?</td>
                  <td className="py-3 px-4 text-red-300">Customer founder or internal staff (40+ hours)</td>
                  <td className="py-3 px-4 text-emerald-300 font-semibold">Autonomous multi-agent swarm (&lt; 30 mins human input)</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-bold text-white">Fiduciary Liability</td>
                  <td className="py-3 px-4">Disclaimed 100% in Terms of Service</td>
                  <td className="py-3 px-4 text-emerald-300 font-semibold">Assumed by Aegis; backed by $5,000,000 E&O Policy</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-bold text-white">Turnaround Latency</td>
                  <td className="py-3 px-4">Weeks of manual back-and-forth</td>
                  <td className="py-3 px-4 text-emerald-300 font-semibold">6 to 10 Minutes autonomous pipeline</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-bold text-white">Long-Tail Accessibility</td>
                  <td className="py-3 px-4">SMBs burdened with DIY complexity</td>
                  <td className="py-3 px-4 text-emerald-300 font-semibold">Democratized access for 33M solopreneurs & startups</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-8 flex justify-end gap-3">
            <Link
              to="/simulator"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 shadow-md"
            >
              <span>See Agent Swarm in Action (Next Page)</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
