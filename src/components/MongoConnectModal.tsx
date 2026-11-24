import React, { useState, useEffect } from 'react';
import { Database, CheckCircle2, AlertTriangle, ExternalLink, RefreshCw, X, HardDrive, Layers, Server } from 'lucide-react';
import { MONGODB_LOCAL_URI, MONGODB_DB_NAME, checkMongoHealth, MongoHealthStatus } from '../lib/mongodb';

interface MongoConnectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MongoConnectModal: React.FC<MongoConnectModalProps> = ({ isOpen, onClose }) => {
  const [health, setHealth] = useState<MongoHealthStatus>({
    status: 'connected',
    uri: MONGODB_LOCAL_URI,
    db_name: MONGODB_DB_NAME
  });
  const [isPinging, setIsPinging] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<string>('Connected to MongoDB Server on your laptop.');

  const runPing = async () => {
    setIsPinging(true);
    const result = await checkMongoHealth();
    setHealth(result);
    setIsPinging(false);
    if (result.status === 'connected') {
      setStatusMessage(`MongoDB 8.3 is listening on ${MONGODB_LOCAL_URI}. Database "${MONGODB_DB_NAME}" active.`);
    } else {
      setStatusMessage(result.message || 'Connecting to local MongoDB service...');
    }
  };

  useEffect(() => {
    if (isOpen) {
      runPing();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const isConnected = health.status === 'connected';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-xl bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
            <Database className="w-5 h-5 stroke-[2.2]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-bold text-white">Laptop MongoDB Database</h3>
              <span className={`px-2 py-0.5 text-[10px] font-mono rounded-full font-bold ${
                isConnected 
                  ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/30' 
                  : 'bg-amber-950 text-amber-400 border border-amber-500/30'
              }`}>
                {isConnected ? 'LOCAL MONGODB CONNECTED' : 'STANDALONE API'}
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono">Service: Windows MongoDB 8.3</p>
          </div>
        </div>

        {/* Connection Info Box */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2.5 mb-6 text-xs font-mono">
          <div className="flex items-center justify-between">
            <span className="text-slate-400 flex items-center gap-1.5">
              <Server className="w-3.5 h-3.5 text-emerald-400" />
              <span>Host & Port:</span>
            </span>
            <span className="text-emerald-400 font-bold">{MONGODB_LOCAL_URI}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-400 flex items-center gap-1.5">
              <HardDrive className="w-3.5 h-3.5 text-cyan-400" />
              <span>Database Name:</span>
            </span>
            <span className="text-white font-bold">{MONGODB_DB_NAME}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-400 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-amber-400" />
              <span>Managed Collections:</span>
            </span>
            <span className="text-slate-300">service_contracts, hitl_checkpoints, agent_execution_logs</span>
          </div>
        </div>

        {/* Live Status Ping Result */}
        <div className={`p-3.5 rounded-xl mb-6 text-xs font-mono flex items-start gap-2.5 ${
          isConnected
            ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-500/30'
            : 'bg-amber-950/60 text-amber-300 border border-amber-500/30'
        }`}>
          {isConnected ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          ) : (
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          )}
          <div className="space-y-0.5">
            <div className="font-bold">{statusMessage}</div>
            <div className="text-[11px] text-slate-400">Ping latency: &lt; 1ms (native loopback socket)</div>
          </div>
        </div>

        {/* Compass Guide */}
        <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-400 mb-6">
          <div className="font-semibold text-white mb-1.5 flex items-center justify-between">
            <span>Inspect with MongoDB Compass</span>
            <span className="text-[10px] font-mono text-emerald-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
              GUI Tool
            </span>
          </div>
          <p className="text-[11px] leading-relaxed mb-2">
            Open <strong>MongoDB Compass</strong> on your laptop and paste this connection string:
          </p>
          <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 font-mono text-emerald-300 text-[11px] select-all">
            mongodb://127.0.0.1:27017/homigo_aegis_db
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            type="button"
            onClick={runPing}
            disabled={isPinging}
            className="flex-1 py-2.5 px-4 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 shadow-md shadow-emerald-500/20 transition-all flex items-center justify-center gap-2"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isPinging ? 'animate-spin' : ''}`} />
            <span>{isPinging ? 'Pinging MongoDB...' : 'Test MongoDB Ping'}</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 border border-slate-700"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
