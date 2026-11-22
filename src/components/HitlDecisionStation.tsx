import React, { useState } from 'react';
import { Scale, ShieldCheck, AlertCircle, CheckCircle, ArrowRight, UserCheck, Lock, Sparkles, FileText } from 'lucide-react';

export const HitlDecisionStation: React.FC = () => {
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<'r_and_d' | 'nexus' | 'm_and_a'>('r_and_d');

  const scenarios = {
    r_and_d: {
      title: 'Section 41 R&D Credit vs Capitalized Software (IRC § 174)',
      context: 'AI ingested $450,000 in software engineer Git commits and payroll. 98.2% of commits mapped to novel algorithmic architectures.',
      edgeCase: 'Can generative AI model fine-tuning compute costs ($85,000 AWS bill) be classified as qualified research expenses (QRE)?',
      aiAnalysis: 'High probability (89%) of qualifying under Treasury Reg § 1.41-4(a)(5) for elimination of technical uncertainty, but recent 2023 IRS Chief Counsel Advice requires affirmative nexus documentation.',
      humanRole: 'Licensed CPA Partner examines the architectural technical uncertainty memorandum and executes formal tax position sign-off with firm audit insurance.',
      humanTime: '4.5 Minutes of CPA review vs 40 hours of manual spreadsheet auditing.'
    },
    nexus: {
      title: 'Multi-State Economic Nexus & Sales Tax Exposure (Wayfair Doctrine)',
      context: 'AI detected $1.2M in SaaS revenue across 32 states with remote employees in California, Texas, and New York.',
      edgeCase: 'New York tax law imposes franchise tax on remote employees performing software development, but does safe-harbor rule apply to home offices?',
      aiAnalysis: 'Threshold crossed in NY & CA. NY State Tax Memo TSB-M-21(1)C suggests nexus, but home office exception applies if company provides no physical hardware stipend.',
      humanRole: 'State & Local Tax (SALT) Partner confirms home office stipend policy and approves voluntary disclosure filing to eliminate 100% of historical penalties.',
      humanTime: '6 Minutes of Partner review saving client $28,000 in potential back-tax penalties.'
    },
    m_and_a: {
      title: 'Pre-Acquisition Indemnity & Change-of-Control Risk Redline',
      context: 'AI digested 1,840 vendor contracts, IP assignment deeds, and customer enterprise MSAs in 12 minutes.',
      edgeCase: 'Three major enterprise customers hold "most favored nation" and uncapped cyber breach liability indemnity clauses.',
      aiAnalysis: 'Identified $15M aggregate uncapped exposure. Drafted customized carve-out amendment limiting liability to 2x trailing twelve months fees.',
      humanRole: 'Senior M&A Corporate Counsel reviews redlines, aligns with buyer counsel during definitive agreement negotiations, and signs legal opinion memo.',
      humanTime: '15 Minutes of Strategic Counsel vs 3 weeks of paralegal manual redlining.'
    }
  };

  const current = scenarios[selectedCaseStudy];

  return (
    <section id="hitl-station" className="py-24 bg-slate-900/40 border-t border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-400 text-xs font-mono mb-4">
            <Scale className="w-3.5 h-3.5" />
            <span>PILLAR 03: HUMAN-IN-THE-LOOP ARCHITECTURE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Humans at Liability Checkpoints. Not Data Entry.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-400">
            How we solve the AI hallucination and legal liability barrier: AI handles 98.6% of mundane computation, while licensed CPAs and attorneys step in exclusively where judgment and fiduciary accountability matter.
          </p>
        </div>

        {/* Comparison Diagram: Traditional Human Labor vs Aegis HITL */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          
          {/* Traditional Firm Labor Distribution */}
          <div className="p-6 sm:p-8 rounded-2xl bg-slate-950/80 border border-slate-800">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono font-bold text-red-400 uppercase tracking-wider">
                Traditional Firm Workflow
              </span>
              <span className="text-xs font-bold text-slate-400">95% Wasteful Labor</span>
            </div>
            <h3 className="text-lg font-bold text-white mb-3">Humans Doing Machine Labor ($350/hr)</h3>
            
            {/* Visual Bar */}
            <div className="w-full h-7 rounded-xl overflow-hidden flex mb-4 text-[10px] font-mono font-bold">
              <div className="bg-red-500/80 text-white flex items-center justify-center w-[70%]">
                Manual Data Entry (70%)
              </div>
              <div className="bg-amber-500/80 text-slate-950 flex items-center justify-center w-[25%]">
                Formatting (25%)
              </div>
              <div className="bg-emerald-500 text-slate-950 flex items-center justify-center w-[5%]">
                Review (5%)
              </div>
            </div>

            <ul className="space-y-2 text-xs text-slate-400">
              <li className="flex items-start gap-2">
                <span className="text-red-400 font-bold">✕</span>
                <span>Junior associates spend days typing PDF bank statements into spreadsheets</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 font-bold">✕</span>
                <span>High human fatigue leads to missed deductions and transposed numbers</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 font-bold">✕</span>
                <span>Partner review is rushed at the 11th hour before filing deadlines</span>
              </li>
            </ul>
          </div>

          {/* Aegis Autonomous Firm HITL Distribution */}
          <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-emerald-950/30 via-slate-950/80 to-teal-950/20 border border-emerald-500/30">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
                Aegis HITL Operating Architecture
              </span>
              <span className="text-xs font-bold text-emerald-400">100% High-Value Judgment</span>
            </div>
            <h3 className="text-lg font-bold text-white mb-3">AI Does Computation. Humans Govern Liability.</h3>
            
            {/* Visual Bar */}
            <div className="w-full h-7 rounded-xl overflow-hidden flex mb-4 text-[10px] font-mono font-bold">
              <div className="bg-emerald-500 text-slate-950 flex items-center justify-center w-[95%]">
                Autonomous Multi-Agent Execution (98.6%)
              </div>
              <div className="bg-cyan-400 text-slate-950 flex items-center justify-center w-[5%]">
                CPA Stamp (1.4%)
              </div>
            </div>

            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>Zero manual typing: AI agents ingest and vectorize millions of records in seconds</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>Supervising CPAs receive pre-compiled statutory citations and risk matrices</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>Fiduciary liability is legally assumed by Aegis and backed by $5M E&O insurance</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Interactive Scenario Explorer */}
        <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-lg font-bold text-white">Explore Real Judgment Checkpoints</h3>
              <p className="text-xs text-slate-400">See how human partners and AI collaborate on high-liability edge cases.</p>
            </div>

            <div className="flex items-center gap-2 bg-slate-900 p-1 rounded-xl border border-slate-800">
              <button
                onClick={() => setSelectedCaseStudy('r_and_d')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  selectedCaseStudy === 'r_and_d'
                    ? 'bg-emerald-500 text-slate-950'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                R&D Tax Credits
              </button>
              <button
                onClick={() => setSelectedCaseStudy('nexus')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  selectedCaseStudy === 'nexus'
                    ? 'bg-emerald-500 text-slate-950'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Multi-State Nexus
              </button>
              <button
                onClick={() => setSelectedCaseStudy('m_and_a')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  selectedCaseStudy === 'm_and_a'
                    ? 'bg-emerald-500 text-slate-950'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                M&A Diligence
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Step 1: Autonomous Ingestion */}
            <div className="p-5 rounded-xl bg-slate-900/70 border border-slate-800">
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>PHASE 1: AGENT DIGESTION</span>
              </div>
              <h4 className="text-sm font-bold text-white mb-2">{current.title}</h4>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">{current.context}</p>
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-[11px] text-amber-300 font-mono">
                <strong>Edge Case Detected:</strong> {current.edgeCase}
              </div>
            </div>

            {/* Step 2: AI Statutory Reasoning */}
            <div className="p-5 rounded-xl bg-slate-900/70 border border-slate-800">
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-2">
                <FileText className="w-3.5 h-3.5" />
                <span>PHASE 2: AI STATUTORY PRE-AUDIT</span>
              </div>
              <h4 className="text-sm font-bold text-white mb-2">Legal Precedent Mapping</h4>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">{current.aiAnalysis}</p>
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-[11px] text-slate-400">
                AI flags ambiguity threshold & routes to qualified Partner.
              </div>
            </div>

            {/* Step 3: Human Partner Certified Stamp */}
            <div className="p-5 rounded-xl bg-emerald-950/20 border border-emerald-500/40">
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-2">
                <UserCheck className="w-3.5 h-3.5" />
                <span>PHASE 3: HUMAN PARTNER CERTIFICATION</span>
              </div>
              <h4 className="text-sm font-bold text-white mb-2">Strategic Sign-Off</h4>
              <p className="text-xs text-slate-200 leading-relaxed mb-4">{current.humanRole}</p>
              <div className="p-3 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-[11px] text-emerald-300 font-mono">
                ⏱️ {current.humanTime}
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

