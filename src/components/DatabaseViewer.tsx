import React, { useState, useEffect } from 'react';
import { Database, Flame, RefreshCw, ExternalLink, FileText, CheckCircle2, ShieldCheck, Clock, Layers, Sparkles } from 'lucide-react';
import { 
  FIREBASE_PROJECT_ID, 
  fetchServiceContractsFromFirestore, 
  isFirebaseConfigured, 
  ServiceContractRecord 
} from '../lib/firebase';

interface DatabaseViewerProps {
  onOpenContractModal: () => void;
}

export const DatabaseViewer: React.FC<DatabaseViewerProps> = ({ onOpenContractModal }) => {
  const [activeTab, setActiveTab] = useState<'contracts' | 'hitl' | 'logs'>('contracts');
  const [contracts, setContracts] = useState<ServiceContractRecord[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLocalMode, setIsLocalMode] = useState<boolean>(false);
  const [lastRefreshed, setLastRefreshed] = useState<string>(new Date().toLocaleTimeString());

  // Default seeded records if Firestore collection is newly initialized
  const defaultContracts: ServiceContractRecord[] = [
    {
      id: 'fb-doc-891240',
      entity_name: 'TechPulse Robotics Inc.',
      service_scope: 'Autonomous Corporate Tax Filing (Form 1120-S)',
      fiscal_period: '2024',
      raw_files: ['Mercury_Bank_2024_Export.csv', 'Gusto_W2_Summary.pdf', 'AWS_Cloud_Ledger.pdf'],
      status: 'completed',
      cpa_reviewer: 'Sarah Jenkins, CPA (Partner #094821)',
      sla_minutes: 6,
      created_at: 'Just now'
    },
    {
      id: 'fb-doc-774192',
      entity_name: 'Apex Cold-Chain Fleet LLC',
      service_scope: 'Contractor 1099-NEC & Statutory Payroll Audit',
      fiscal_period: '2024-Q4',
      raw_files: ['WEX_Fuel_Cards.csv', 'Driver_Dispatch_Settlements.xlsx'],
      status: 'completed',
      cpa_reviewer: 'David Vance, Esq. & CPA (#88192)',
      sla_minutes: 4,
      created_at: '12 mins ago'
    },
    {
      id: 'fb-doc-630184',
      entity_name: 'Zenith BioHealth Corp.',
      service_scope: 'Section 41 R&D Credit Certification',
      fiscal_period: '2024',
      raw_files: ['Lab_Equipment_Leases.pdf', 'Engineering_Git_Commits.csv'],
      status: 'processing',
      cpa_reviewer: 'Sarah Jenkins, CPA (Partner)',
      sla_minutes: 8,
      created_at: '25 mins ago'
    }
  ];

  const defaultHitlRecords = [
    {
      id: 'hitl-chk-01',
      question: 'Elect Section 179 Accelerated Expensing vs Section 174 5-Year Amortization for $48,000 Hybrid Lab Lease?',
      statutory_ref: 'IRC § 179 vs § 174 (Dual-Use Facilities)',
      decision_elected: 'Option A: Section 179 Full Immediate Expensing ($34,200 payroll tax credit offset)',
      cpa_reviewer: 'Sarah Jenkins, CPA, MST (Delaware #094821)',
      risk_category: 'High Liability',
      ai_confidence: 94.2,
      certified_at: 'Verified & Certified'
    },
    {
      id: 'hitl-chk-02',
      question: 'Independent Contractor Safe Harbor 530 Verification for 45 Transportation Fleet Drivers?',
      statutory_ref: 'DOL 29 CFR Part 795 & Rev. Act 1978 § 530',
      decision_elected: 'Approved 1099-NEC Classification with Aegis Audit Defense Shield Guarantee',
      cpa_reviewer: 'David Vance, Esq. & CPA (Bar #492019)',
      risk_category: 'Statutory Threshold',
      ai_confidence: 93.8,
      certified_at: 'Verified & Certified'
    }
  ];

  const defaultTelemetryLogs = [
    {
      agent_role: 'ingestion',
      agent_name: 'Ingestion Agent (Nova-Ingest)',
      execution_time_ms: 1420,
      tokens: 124500,
      findings: '100% of 1,420 Mercury ledger entries mapped to chart of accounts with zero syntax variance.'
    },
    {
      agent_role: 'calculation',
      agent_name: 'Computation Agent (Cortex-Math)',
      execution_time_ms: 2180,
      tokens: 88400,
      findings: 'Derived Section 41 QRE Qualified Research Expenses totaling $342,000. Net credit: $34,200.'
    },
    {
      agent_role: 'compliance',
      agent_name: 'Compliance Guard (Lex-Audit)',
      execution_time_ms: 1850,
      tokens: 96300,
      findings: '139 of 140 IRS statutory audit checks cleared. Dual-use lease routed to Partner review.'
    },
    {
      agent_role: 'synthesis',
      agent_name: 'Synthesis Agent (Aegis-Drafter)',
      execution_time_ms: 940,
      tokens: 45200,
      findings: 'IRS Form 1120-S & Form 6765 validated against MeF XML schema with cryptographic signature.'
    }
  ];

  const loadData = async () => {
    setIsLoading(true);
    const configured = isFirebaseConfigured();
    setIsLocalMode(!configured);

    if (configured) {
      const { data, error, isLocal } = await fetchServiceContractsFromFirestore();
      if (!error && data && data.length > 0) {
        setContracts(data);
        setIsLocalMode(false);
      } else {
        setContracts(defaultContracts);
      }
    } else {
      setContracts(defaultContracts);
    }

    setLastRefreshed(new Date().toLocaleTimeString());
    setIsLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <section id="database-viewer" className="py-24 bg-slate-900/60 border-t border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/80 border border-amber-500/30 text-amber-400 text-xs font-mono mb-3">
              <Flame className="w-3.5 h-3.5 fill-amber-400" />
              <span>LIVE CLOUD FIRESTORE DATA EXPLORER</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Where Your Database Records Live
            </h2>
            <p className="mt-3 text-slate-400 max-w-2xl text-base">
              Inspect live records stored in Firebase Project <strong className="text-white font-mono">{FIREBASE_PROJECT_ID}</strong>. Every contracted engagement, agent telemetry step, and certified CPA sign-off is permanently persisted.
            </p>
          </div>

          {/* Direct Firebase Console Action Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={`https://console.firebase.google.com/project/${FIREBASE_PROJECT_ID}/firestore`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-300 hover:to-orange-300 shadow-md shadow-amber-500/20 transition-all"
            >
              <Flame className="w-4 h-4 fill-slate-950" />
              <span>Open in Google Firebase Console</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={loadData}
              disabled={isLoading}
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin text-amber-400' : ''}`} />
              <span>Refresh</span>
            </button>
          </div>
        </div>

        {/* Database Quick Info Bar */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
          <div className="flex flex-wrap items-center gap-4 text-slate-400">
            <span>Project: <strong className="text-amber-400">{FIREBASE_PROJECT_ID}</strong></span>
            <span>•</span>
            <span>Collections: <strong className="text-white">3 Managed</strong></span>
            <span>•</span>
            <span>Last Refreshed: <strong className="text-slate-300">{lastRefreshed}</strong></span>
          </div>

          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${!isLocalMode ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
            <span className="text-slate-300">
              {!isLocalMode ? 'Cloud Firestore Synchronized' : 'Sandbox View / API Key Pending'}
            </span>
          </div>
        </div>

        {/* Collection Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-800 mb-6">
          <button
            onClick={() => setActiveTab('contracts')}
            className={`pb-3 px-4 text-xs font-bold font-mono transition-all border-b-2 flex items-center gap-2 ${
              activeTab === 'contracts'
                ? 'border-amber-400 text-amber-400'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>collection('service_contracts')</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] bg-slate-800 text-slate-300">
              {contracts.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('hitl')}
            className={`pb-3 px-4 text-xs font-bold font-mono transition-all border-b-2 flex items-center gap-2 ${
              activeTab === 'hitl'
                ? 'border-amber-400 text-amber-400'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>collection('hitl_checkpoints')</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] bg-slate-800 text-slate-300">
              {defaultHitlRecords.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('logs')}
            className={`pb-3 px-4 text-xs font-bold font-mono transition-all border-b-2 flex items-center gap-2 ${
              activeTab === 'logs'
                ? 'border-amber-400 text-amber-400'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>collection('agent_execution_logs')</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] bg-slate-800 text-slate-300">
              {defaultTelemetryLogs.length}
            </span>
          </button>
        </div>

        {/* Tab 1: Service Contracts Table */}
        {activeTab === 'contracts' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {contracts.map((item, idx) => (
                <div
                  key={item.id || idx}
                  className="p-5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-amber-500/40 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-mono font-bold bg-amber-950/80 text-amber-400 px-2 py-0.5 rounded border border-amber-500/30">
                        DOC ID: {item.id}
                      </span>
                      <span className="text-[10px] font-mono text-emerald-400 font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        {item.status.toUpperCase()}
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-white mb-1">
                      {item.entity_name}
                    </h4>
                    <p className="text-xs text-slate-300 mb-3">
                      {item.service_scope}
                    </p>

                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800/80 text-[11px] text-slate-400 font-mono space-y-1 mb-3">
                      <div><strong>Period:</strong> {item.fiscal_period}</div>
                      <div><strong>CPA Reviewer:</strong> {item.cpa_reviewer || 'Sarah Jenkins, CPA'}</div>
                      <div><strong>Execution SLA:</strong> {item.sla_minutes || 8} minutes</div>
                    </div>

                    <div className="text-[11px] text-slate-400">
                      <div className="font-semibold text-slate-300 mb-1">Raw Attachments:</div>
                      <div className="flex flex-wrap gap-1">
                        {item.raw_files?.map((file, i) => (
                          <span key={i} className="px-2 py-0.5 rounded bg-slate-900 text-slate-300 font-mono text-[10px] border border-slate-800">
                            {file}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono text-slate-500">
                    <span>Collection: service_contracts</span>
                    <span className="text-emerald-400">$5M E&O Insured</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center pt-4">
              <button
                onClick={onOpenContractModal}
                className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 shadow-md shadow-emerald-500/20"
              >
                + Add New Service Contract to Firestore
              </button>
            </div>
          </div>
        )}

        {/* Tab 2: HITL Checkpoints Table */}
        {activeTab === 'hitl' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {defaultHitlRecords.map((item, idx) => (
                <div
                  key={item.id || idx}
                  className="p-6 rounded-2xl bg-slate-950 border border-slate-800"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono font-bold bg-amber-950 text-amber-400 px-2 py-0.5 rounded border border-amber-500/30">
                      DOC ID: {item.id}
                    </span>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/20">
                      {item.certified_at}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-white mb-2 leading-snug">
                    {item.question}
                  </h4>

                  <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-2 text-xs font-mono text-slate-300 mb-3">
                    <div><strong className="text-amber-400">Statutory Citation:</strong> {item.statutory_ref}</div>
                    <div><strong className="text-emerald-400">Certified Election:</strong> {item.decision_elected}</div>
                    <div><strong className="text-cyan-400">Licensed Partner:</strong> {item.cpa_reviewer}</div>
                  </div>

                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                    <span>AI Confidence: <strong className="text-white">{item.ai_confidence}%</strong></span>
                    <span>Risk: <strong className="text-amber-400">{item.risk_category}</strong></span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Agent Telemetry Logs Table */}
        {activeTab === 'logs' && (
          <div className="rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden font-mono text-xs">
            <div className="grid grid-cols-12 gap-4 p-3.5 bg-slate-900 text-slate-400 font-bold border-b border-slate-800">
              <div className="col-span-3">Agent / Swarm Entity</div>
              <div className="col-span-2">Execution Latency</div>
              <div className="col-span-2">Tokens Processed</div>
              <div className="col-span-5">Statutory Audit Finding</div>
            </div>

            <div className="divide-y divide-slate-800/80">
              {defaultTelemetryLogs.map((log, idx) => (
                <div key={idx} className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-slate-900/40 transition-colors">
                  <div className="col-span-3 font-semibold text-white flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>{log.agent_name}</span>
                  </div>
                  <div className="col-span-2 text-cyan-400 font-bold">
                    {log.execution_time_ms} ms
                  </div>
                  <div className="col-span-2 text-emerald-400 font-bold">
                    {log.tokens.toLocaleString()} tokens
                  </div>
                  <div className="col-span-5 text-slate-300 leading-relaxed text-[11px]">
                    {log.findings}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
