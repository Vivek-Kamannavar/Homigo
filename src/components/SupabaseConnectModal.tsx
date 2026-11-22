import React, { useState, useEffect } from 'react';
import { Database, CheckCircle2, AlertTriangle, ExternalLink, Key, Copy, Check, RefreshCw, X } from 'lucide-react';
import { SUPABASE_PROJECT_ID, SUPABASE_DEFAULT_URL, isSupabaseConfigured, getSupabaseConfig, fetchServiceContracts } from '../lib/supabase';

interface SupabaseConnectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SupabaseConnectModal: React.FC<SupabaseConnectModalProps> = ({ isOpen, onClose }) => {
  const [anonKey, setAnonKey] = useState<string>('');
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [testStatus, setTestStatus] = useState<'idle' | 'testing' | 'success' | 'error'>('idle');
  const [testMessage, setTestMessage] = useState<string>('');
  const [copiedSql, setCopiedSql] = useState<boolean>(false);

  useEffect(() => {
    const { anonKey: currentKey } = getSupabaseConfig();
    if (currentKey) {
      setAnonKey(currentKey);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSaveKey = async (e: React.FormEvent) => {
    e.preventDefault();
    if (typeof window !== 'undefined') {
      localStorage.setItem('supabase_anon_key', anonKey.trim());
    }
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
    testConnection();
  };

  const testConnection = async () => {
    setTestStatus('testing');
    setTestMessage('Verifying connection to ' + SUPABASE_DEFAULT_URL + '...');

    try {
      const { data, error, isLocal } = await fetchServiceContracts();
      if (error) {
        setTestStatus('error');
        const errMessage = (error as any)?.message || JSON.stringify(error) || 'Check if tables exist or if anon key is valid';
        setTestMessage(`Database response: ${errMessage}`);
      } else {
        setTestStatus('success');
        setTestMessage(`Successfully connected to Supabase project "${SUPABASE_PROJECT_ID}". Tables reachable!`);
      }
    } catch (err: any) {
      setTestStatus('error');
      setTestMessage(err.message || 'Connection failed.');
    }
  };

  const copySqlToClipboard = () => {
    const sqlScript = `-- Run this in https://supabase.com/dashboard/project/${SUPABASE_PROJECT_ID}/sql/new
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS service_contracts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    entity_name TEXT NOT NULL,
    service_scope TEXT NOT NULL,
    fiscal_period TEXT NOT NULL,
    raw_files TEXT[] DEFAULT '{}',
    status TEXT NOT NULL DEFAULT 'pending',
    cpa_reviewer TEXT,
    sla_minutes INTEGER DEFAULT 10,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE service_contracts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public all" ON service_contracts FOR ALL USING (true);`;

    navigator.clipboard.writeText(sqlScript);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2000);
  };

  const isConfigured = isSupabaseConfigured();

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
            <Database className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-bold text-white">Supabase Connection</h3>
              <span className={`px-2 py-0.5 text-[10px] font-mono rounded-full font-bold ${
                isConfigured 
                  ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/30' 
                  : 'bg-amber-950 text-amber-400 border border-amber-500/30'
              }`}>
                {isConfigured ? 'CONNECTED' : 'KEY REQUIRED'}
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono">Project ID: {SUPABASE_PROJECT_ID}</p>
          </div>
        </div>

        {/* Connection Info */}
        <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2 mb-6 text-xs font-mono">
          <div className="flex items-center justify-between">
            <span className="text-slate-400">Target URL:</span>
            <span className="text-emerald-400 font-bold">{SUPABASE_DEFAULT_URL}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-400">Dashboard Link:</span>
            <a
              href={`https://supabase.com/dashboard/project/${SUPABASE_PROJECT_ID}?showConnect=true&connectTab=framework`}
              target="_blank"
              rel="noreferrer"
              className="text-cyan-400 hover:underline flex items-center gap-1"
            >
              <span>Open Connect Panel</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Key Configuration Form */}
        <form onSubmit={handleSaveKey} className="space-y-4 mb-6">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <Key className="w-3.5 h-3.5 text-emerald-400" />
                <span>Supabase Anon Public API Key</span>
              </label>
              <a
                href={`https://supabase.com/dashboard/project/${SUPABASE_PROJECT_ID}/settings/api`}
                target="_blank"
                rel="noreferrer"
                className="text-[11px] text-emerald-400 hover:underline"
              >
                Find your anon key →
              </a>
            </div>
            <textarea
              rows={2}
              value={anonKey}
              onChange={(e) => setAnonKey(e.target.value)}
              placeholder="Paste your anon public key (e.g. eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...)"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white font-mono focus:outline-none focus:border-emerald-500 resize-none"
            />
          </div>

          <div className="flex gap-2">
            <button
              type="submit"
              className="flex-1 py-2.5 px-4 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2"
            >
              {isSaved ? <Check className="w-4 h-4" /> : <Database className="w-4 h-4" />}
              <span>{isSaved ? 'Key Saved & Applied!' : 'Save & Connect'}</span>
            </button>

            <button
              type="button"
              onClick={testConnection}
              className="py-2.5 px-4 rounded-xl text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 border border-slate-700 flex items-center gap-1.5"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${testStatus === 'testing' ? 'animate-spin' : ''}`} />
              <span>Test Ping</span>
            </button>
          </div>
        </form>

        {/* Test Connection Output */}
        {testStatus !== 'idle' && (
          <div className={`p-3 rounded-xl mb-4 text-xs font-mono flex items-start gap-2 ${
            testStatus === 'success' 
              ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-500/30' 
              : testStatus === 'error'
              ? 'bg-red-950/60 text-red-300 border border-red-500/30'
              : 'bg-slate-950 text-slate-400 border border-slate-800'
          }`}>
            {testStatus === 'success' ? <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" /> : <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />}
            <span>{testMessage}</span>
          </div>
        )}

        {/* Schema Migration Helper */}
        <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-400">
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold text-white">Database Migration SQL</span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={copySqlToClipboard}
                className="text-[11px] font-mono text-emerald-400 hover:underline flex items-center gap-1"
              >
                {copiedSql ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                <span>{copiedSql ? 'Copied SQL!' : 'Copy SQL Script'}</span>
              </button>
              <a
                href={`https://supabase.com/dashboard/project/${SUPABASE_PROJECT_ID}/sql/new`}
                target="_blank"
                rel="noreferrer"
                className="text-[11px] font-mono text-cyan-400 hover:underline flex items-center gap-1"
              >
                <span>Run in SQL Editor</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
          <p className="text-[11px] leading-relaxed">
            The database schema is saved in <code className="text-emerald-400">supabase/schema.sql</code>. It creates the <code className="text-white">service_contracts</code>, <code className="text-white">agent_execution_logs</code>, and <code className="text-white">hitl_checkpoints</code> tables.
          </p>
        </div>

      </div>
    </div>
  );
};
