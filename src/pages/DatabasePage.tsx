import React from 'react';
import { DatabaseViewer } from '../components/DatabaseViewer';
import { Database, ArrowRight, ExternalLink, RefreshCw, Server, HardDrive, Layers, ShieldCheck } from 'lucide-react';
import { MONGODB_LOCAL_URI, MONGODB_DB_NAME } from '../lib/mongodb';
import { Link } from 'react-router-dom';

interface DatabasePageProps {
  onOpenContractModal: () => void;
}

export const DatabasePage: React.FC<DatabasePageProps> = ({ onOpenContractModal }) => {
  return (
    <div className="space-y-14 pb-20 pt-8">
      {/* Page Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 text-xs font-mono mb-4">
          <Database className="w-3.5 h-3.5" />
          <span>PAGE 06: LAPTOP MONGODB DATABASE EXPLORER</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight">
          MongoDB Database Portal on Your Laptop
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl mx-auto">
          Connected to MongoDB Server on your machine at <strong className="text-white font-mono">{MONGODB_LOCAL_URI}</strong> (Database: <strong className="text-emerald-400 font-mono">{MONGODB_DB_NAME}</strong>). Inspect live BSON collections, agent telemetry logs, and certified CPA sign-off audit records.
        </p>
      </div>

      {/* Main Database Explorer Component */}
      <DatabaseViewer
        onOpenContractModal={onOpenContractModal}
      />

      {/* MongoDB Architecture & Compass Guide Card */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800">
          <h3 className="text-xl font-bold text-white mb-4">
            MongoDB Schema Collections & Local Laptop Configuration
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-300">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <div className="font-mono font-bold text-emerald-400 mb-1">db.service_contracts</div>
              <p className="text-slate-400 leading-relaxed">
                Stores client entity legal name, service scope, raw file attachments, target SLA, and assigned supervising CPA partner.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <div className="font-mono font-bold text-cyan-400 mb-1">db.agent_execution_logs</div>
              <p className="text-slate-400 leading-relaxed">
                Captures real-time multi-agent execution steps, latency in milliseconds, token throughput, and statutory IRS findings.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <div className="font-mono font-bold text-amber-400 mb-1">db.hitl_checkpoints</div>
              <p className="text-slate-400 leading-relaxed">
                Immutable audit trail for human CPA decisions, statutory citations, license numbers, and certified cryptographic timestamps.
              </p>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs">
            <div className="font-mono text-slate-400 flex items-center gap-2">
              <span className="text-emerald-400">Connection String:</span>
              <code className="text-slate-200 bg-slate-950 px-2 py-1 rounded border border-slate-800">mongodb://127.0.0.1:27017/homigo_aegis_db</code>
            </div>

            <Link
              to="/assurance"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700"
            >
              <span>Customer Stories & Assurance (Page 7 & 8)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
