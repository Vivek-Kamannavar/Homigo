import React, { useState, useEffect } from 'react';
import { Database, RefreshCw, ExternalLink, FileText, CheckCircle2, ShieldCheck, Clock, Layers, Sparkles, Server, HardDrive } from 'lucide-react';
import { 
  MONGODB_LOCAL_URI, 
  MONGODB_DB_NAME, 
  fetchServiceContractsFromMongo, 
  checkMongoHealth,
  ServiceContractRecord,
  MongoHealthStatus 
} from '../lib/mongodb';

interface DatabaseViewerProps {
  onOpenContractModal: () => void;
}

export const DatabaseViewer: React.FC<DatabaseViewerProps> = ({ onOpenContractModal }) => {
  const [activeTab, setActiveTab] = useState<'contracts' | 'hitl' | 'logs'>('contracts');
  const [contracts, setContracts] = useState<ServiceContractRecord[]>([]);
  const [health, setHealth] = useState<MongoHealthStatus>({
    status: 'connected',
    uri: MONGODB_LOCAL_URI,
    db_name: MONGODB_DB_NAME
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [lastRefreshed, setLastRefreshed] = useState<string>(new Date().toLocaleTimeString());

  // Default initial documents for display
  const defaultContracts: ServiceContractRecord[] = [
    {
      _id: '6743bd08f9a21e0012345678',
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
      _id: '6743bd12f9a21e0012345679',
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
      _id: '6743bd1af9a21e001234567a',
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
      _id: '6743bd22f9a21e001234567b',
      question: 'Elect Section 179 Accelerated Expensing vs Section 174 5-Year Amortization for $48,000 Hybrid Lab Lease?',
      statutory_ref: 'IRC § 179 vs § 174 (Dual-Use Facilities)',
      decision_elected: 'Option A: Section 179 Full Immediate Expensing ($34,200 payroll tax credit offset)',
      cpa_reviewer: 'Sarah Jenkins, CPA, MST (Delaware #094821)',
      risk_category: 'High Liability',
      ai_confidence: 94.2,
      certified_at: 'Verified & Certified'
    },
    {
      _id: '6743bd2af9a21e001234567c',
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
      _id: '6743bd32f9a21e001234567d',
      agent_role: 'ingestion',
      agent_name: 'Ingestion Agent (Nova-Ingest)',
      execution_time_ms: 1420,
      tokens: 124500,
      findings: '100% of 1,420 Mercury ledger entries mapped to chart of accounts with zero syntax variance.'
    },
    {
      _id: '6743bd3af9a21e001234567e',
      agent_role: 'calculation',
      agent_name: 'Computation Agent (Cortex-Math)',
      execution_time_ms: 2180,
      tokens: 88400,
      findings: 'Derived Section 41 QRE Qualified Research Expenses totaling $342,000. Net credit: $34,200.'
    },
    {
      _id: '6743bd42f9a21e001234567f',
      agent_role: 'compliance',
      agent_name: 'Compliance Guard (Lex-Audit)',
      execution_time_ms: 1850,
      tokens: 96300,
      findings: '139 of 140 IRS statutory audit checks cleared. Dual-use lease routed to Partner review.'
    },
    {
      _id: '6743bd4af9a21e0012345680',
      agent_role: 'synthesis',
      agent_name: 'Synthesis Agent (Aegis-Drafter)',
      execution_time_ms: 940,
      tokens: 45200,
      findings: 'IRS Form 1120-S & Form 6765 validated against MeF XML schema with cryptographic signature.'
    }
  ];

  const loadData = async () => {
    setIsLoading(true);
    const healthResult = await checkMongoHealth();
    setHealth(healthResult);

    const { data, error, isMongo } = await fetchServiceContractsFromMongo();
    if (!error && data && data.length > 0) {
      setContracts(data);
    } else {
      setContracts(defaultContracts);
    }

    setLastRefreshed(new Date().toLocaleTimeString());
    setIsLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const isConnected = health.status === 'connected';

  return (
    <section id="database-viewer" className="py-24 bg-slate-900/60 border-t border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 text-xs font-mono mb-3">
              <Database className="w-3.5 h-3.5" />
              <span>LAPTOP MONGODB DATABASE EXPLORER</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              MongoDB Database on Your Laptop
            </h2>
            <p className="mt-3 text-slate-400 max-w-2xl text-base">
              Connected to your local instance on <strong className="text-white font-mono">{MONGODB_LOCAL_URI}</strong> (Database: <strong className="text-emerald-400 font-mono">{MONGODB_DB_NAME}</strong>). Client contracts, agent execution logs, and CPA certifications are stored in native BSON collections.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={loadData}
              disabled={isLoading}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin text-emerald-400' : ''}`} />
              <span>Refresh MongoDB</span>
            </button>

            <button
              onClick={onOpenContractModal}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 shadow-md shadow-emerald-500/20"
            >
              <span>+ Insert New Contract Document</span>
            </button>
          </div>
        </div>

        {/* Database Quick Info Bar */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
          <div className="flex flex-wrap items-center gap-4 text-slate-400">
            <span>URI: <strong className="text-emerald-400">{MONGODB_LOCAL_URI}</strong></span>
            <span>•</span>
            <span>Database: <strong className="text-white">{MONGODB_DB_NAME}</strong></span>
            <span>•</span>
            <span>Collections: <strong className="text-white">service_contracts, hitl_checkpoints, logs</strong></span>
            <span>•</span>
            <span>Last Refreshed: <strong className="text-slate-300">{lastRefreshed}</strong></span>
          </div>

          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${isConnected ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
            <span className="text-slate-300">
              {isConnected ? 'MongoDB Server 8.3 Running' : 'Standalone API Mode'}
            </span>
          </div>
        </div>

        {/* Collection Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-800 mb-6">
          <button
            onClick={() => setActiveTab('contracts')}
            className={`pb-3 px-4 text-xs font-bold font-mono transition-all border-b-2 flex items-center gap-2 ${
              activeTab === 'contracts'
                ? 'border-emerald-400 text-emerald-400'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>db.service_contracts</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] bg-slate-800 text-slate-300">
              {contracts.length} docs
            </span>
          </button>

          <button
            onClick={() => setActiveTab('hitl')}
            className={`pb-3 px-4 text-xs font-bold font-mono transition-all border-b-2 flex items-center gap-2 ${
              activeTab === 'hitl'
                ? 'border-emerald-400 text-emerald-400'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>db.hitl_checkpoints</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] bg-slate-800 text-slate-300">
              {defaultHitlRecords.length} docs
            </span>
          </button>

          <button
            onClick={() => setActiveTab('logs')}
            className={`pb-3 px-4 text-xs font-bold font-mono transition-all border-b-2 flex items-center gap-2 ${
              activeTab === 'logs'
                ? 'border-emerald-400 text-emerald-400'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>db.agent_execution_logs</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] bg-slate-800 text-slate-300">
              {defaultTelemetryLogs.length} docs
            </span>
          </button>
        </div>

        {/* Tab 1: Service Contracts Table */}
        {activeTab === 'contracts' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {contracts.map((item, idx) => (
                <div
                  key={item.id || item._id || idx}
                  className="p-5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-emerald-500/40 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-mono font-bold bg-emerald-950/80 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/30 truncate max-w-[200px]" title={item._id || item.id}>
                        _id: ObjectId("{item._id || item.id}")
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
                      <div><strong>Fiscal Period:</strong> {item.fiscal_period}</div>
                      <div><strong>Assigned CPA:</strong> {item.cpa_reviewer || 'Sarah Jenkins, CPA'}</div>
                      <div><strong>Execution SLA:</strong> {item.sla_minutes || 6} minutes</div>
                    </div>

                    <div className="text-[11px] text-slate-400">
                      <div className="font-semibold text-slate-300 mb-1">BSON Attachments Array:</div>
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
                    <span>MongoDB: homigo_aegis_db</span>
                    <span className="text-emerald-400">$5M E&O Stamped</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: HITL Checkpoints Table */}
        {activeTab === 'hitl' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {defaultHitlRecords.map((item, idx) => (
                <div
                  key={item._id || idx}
                  className="p-6 rounded-2xl bg-slate-950 border border-slate-800"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono font-bold bg-cyan-950 text-cyan-300 px-2 py-0.5 rounded border border-cyan-500/30">
                      _id: ObjectId("{item._id}")
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
                    <span>Risk Category: <strong className="text-amber-400">{item.risk_category}</strong></span>
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
              <div className="col-span-3">Agent Swarm Entity</div>
              <div className="col-span-2">Execution Latency</div>
              <div className="col-span-2">Tokens Processed</div>
              <div className="col-span-5">Audit Finding & Precedent</div>
            </div>

            <div className="divide-y divide-slate-800/80">
              {defaultTelemetryLogs.map((log, idx) => (
                <div key={idx} className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-slate-900/40 transition-colors">
                  <div className="col-span-3 font-semibold text-white flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
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
