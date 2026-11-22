import React, { useState, useEffect } from 'react';
import { Database, CheckCircle2, AlertTriangle, ExternalLink, Key, Check, RefreshCw, X, Flame } from 'lucide-react';
import { 
  FIREBASE_PROJECT_ID, 
  isFirebaseConfigured, 
  getFirebaseConfig, 
  fetchServiceContractsFromFirestore,
  persistServiceContractToFirestore
} from '../lib/firebase';

interface FirebaseConnectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FirebaseConnectModal: React.FC<FirebaseConnectModalProps> = ({ isOpen, onClose }) => {
  const [apiKey, setApiKey] = useState<string>('');
  const [appId, setAppId] = useState<string>('');
  const [senderId, setSenderId] = useState<string>('');
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [testStatus, setTestStatus] = useState<'idle' | 'testing' | 'success' | 'error'>('idle');
  const [testMessage, setTestMessage] = useState<string>('');

  useEffect(() => {
    const config = getFirebaseConfig();
    if (config.apiKey) setApiKey(config.apiKey);
    if (config.appId) setAppId(config.appId);
    if (config.messagingSenderId) setSenderId(config.messagingSenderId);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSaveConfig = (e: React.FormEvent) => {
    e.preventDefault();
    if (typeof window !== 'undefined') {
      localStorage.setItem('firebase_api_key', apiKey.trim());
      if (appId.trim()) localStorage.setItem('firebase_app_id', appId.trim());
      if (senderId.trim()) localStorage.setItem('firebase_sender_id', senderId.trim());
    }
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
    testConnection();
  };

  const testConnection = async () => {
    setTestStatus('testing');
    setTestMessage(`Testing Cloud Firestore connection for project: ${FIREBASE_PROJECT_ID}...`);

    try {
      // Try writing a quick ping document
      const result = await persistServiceContractToFirestore({
        entity_name: 'Diagnostic Connectivity Probe',
        service_scope: 'Cloud Firestore Ping Test',
        fiscal_period: '2026-TEST',
        raw_files: ['diagnostic_probe.log'],
        status: 'completed',
        cpa_reviewer: 'System Probe',
        sla_minutes: 1
      });

      if (result.error) {
        setTestStatus('error');
        setTestMessage(`Firestore error: ${result.error.message || 'Check Firestore Security Rules or API Key'}`);
      } else if (result.isLocal) {
        setTestStatus('error');
        setTestMessage('Firebase API key is required. Copy the Web API Key from your Firebase Project Settings.');
      } else {
        setTestStatus('success');
        setTestMessage(`Successfully connected to Cloud Firestore! Document written to 'service_contracts' (ID: ${result.data?.id})`);
      }
    } catch (err: any) {
      setTestStatus('error');
      setTestMessage(err.message || 'Failed to connect to Firebase.');
    }
  };

  const isConfigured = isFirebaseConfigured();

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
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
            <Flame className="w-5 h-5 fill-amber-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-bold text-white">Firebase Cloud Firestore</h3>
              <span className={`px-2 py-0.5 text-[10px] font-mono rounded-full font-bold ${
                isConfigured 
                  ? 'bg-amber-950 text-amber-400 border border-amber-500/30' 
                  : 'bg-slate-800 text-slate-400 border border-slate-700'
              }`}>
                {isConfigured ? 'FIREBASE CONNECTED' : 'KEY REQUIRED'}
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono">Project ID: {FIREBASE_PROJECT_ID}</p>
          </div>
        </div>

        {/* Project Links Box */}
        <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2 mb-6 text-xs font-mono">
          <div className="flex items-center justify-between">
            <span className="text-slate-400">Firebase Console:</span>
            <a
              href={`https://console.firebase.google.com/project/${FIREBASE_PROJECT_ID}/overview`}
              target="_blank"
              rel="noreferrer"
              className="text-amber-400 hover:underline flex items-center gap-1 font-bold"
            >
              <span>{FIREBASE_PROJECT_ID} Dashboard</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-400">Cloud Firestore DB:</span>
            <a
              href={`https://console.firebase.google.com/project/${FIREBASE_PROJECT_ID}/firestore`}
              target="_blank"
              rel="noreferrer"
              className="text-cyan-400 hover:underline flex items-center gap-1"
            >
              <span>View Firestore Collections</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Configuration Form */}
        <form onSubmit={handleSaveConfig} className="space-y-4 mb-6">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <Key className="w-3.5 h-3.5 text-amber-400" />
                <span>Firebase Web API Key</span>
              </label>
              <a
                href={`https://console.firebase.google.com/project/${FIREBASE_PROJECT_ID}/settings/general`}
                target="_blank"
                rel="noreferrer"
                className="text-[11px] text-amber-400 hover:underline"
              >
                Project Settings → Web API Key
              </a>
            </div>
            <input
              type="text"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="e.g. AIzaSyB7..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white font-mono focus:outline-none focus:border-amber-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] text-slate-400 mb-1">
                App ID (Optional)
              </label>
              <input
                type="text"
                value={appId}
                onChange={(e) => setAppId(e.target.value)}
                placeholder="1:123456:web:abcd..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white font-mono focus:outline-none focus:border-amber-500"
              />
            </div>
            <div>
              <label className="block text-[11px] text-slate-400 mb-1">
                Sender ID (Optional)
              </label>
              <input
                type="text"
                value={senderId}
                onChange={(e) => setSenderId(e.target.value)}
                placeholder="1234567890"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white font-mono focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          <div className="flex gap-2">
            <button
              type="submit"
              className="flex-1 py-2.5 px-4 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-300 hover:to-orange-300 shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2"
            >
              {isSaved ? <Check className="w-4 h-4" /> : <Flame className="w-4 h-4 fill-slate-950" />}
              <span>{isSaved ? 'Firebase Config Saved!' : 'Save & Connect Firebase'}</span>
            </button>

            <button
              type="button"
              onClick={testConnection}
              className="py-2.5 px-4 rounded-xl text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 border border-slate-700 flex items-center gap-1.5"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${testStatus === 'testing' ? 'animate-spin text-amber-400' : ''}`} />
              <span>Ping DB</span>
            </button>
          </div>
        </form>

        {/* Test Ping Status */}
        {testStatus !== 'idle' && (
          <div className={`p-3 rounded-xl mb-4 text-xs font-mono flex items-start gap-2 ${
            testStatus === 'success' 
              ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-500/30' 
              : testStatus === 'error'
              ? 'bg-red-950/60 text-red-300 border border-red-500/30'
              : 'bg-slate-950 text-slate-400 border border-slate-800'
          }`}>
            {testStatus === 'success' ? <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" /> : <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />}
            <span className="leading-relaxed">{testMessage}</span>
          </div>
        )}

        {/* Firestore Collections Guide */}
        <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-400">
          <div className="font-semibold text-white mb-1.5 flex items-center gap-1.5">
            <Flame className="w-3.5 h-3.5 text-amber-400" />
            <span>Cloud Firestore Collections Managed:</span>
          </div>
          <ul className="space-y-1 text-[11px] list-disc list-inside">
            <li><code className="text-amber-300">service_contracts</code>: Client orders, scopes, raw files, and CPA assignments</li>
            <li><code className="text-amber-300">agent_execution_logs</code>: Autonomous 4-agent telemetry, tokens, and findings</li>
            <li><code className="text-amber-300">hitl_checkpoints</code>: Certified CPA partner statutory judgments</li>
          </ul>
        </div>

      </div>
    </div>
  );
};

