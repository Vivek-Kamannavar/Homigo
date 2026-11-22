import React, { useState } from 'react';
import { X, Upload, FileText, CheckCircle2, ShieldCheck, ArrowRight, Sparkles, AlertCircle, Flame } from 'lucide-react';
import confetti from 'canvas-confetti';
import { persistServiceContractToFirestore, isFirebaseConfigured, FIREBASE_PROJECT_ID } from '../lib/firebase';

interface ServiceRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultServiceName?: string;
  onLaunchSimulation: () => void;
}

export const ServiceRequestModal: React.FC<ServiceRequestModalProps> = ({
  isOpen,
  onClose,
  defaultServiceName = 'Autonomous Corporate Tax Filing',
  onLaunchSimulation
}) => {
  const [serviceType, setServiceType] = useState<string>(defaultServiceName);
  const [companyName, setCompanyName] = useState<string>('Apex AI Technologies Inc.');
  const [taxYear, setTaxYear] = useState<string>('2024');
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([
    'Mercury_Bank_2024_Transactions.csv',
    'Gusto_Payroll_Summary_Q1_Q4.pdf'
  ]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [savedContractId, setSavedContractId] = useState<string>('');
  const [isDbPersisted, setIsDbPersisted] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleAddSampleFile = (fileName: string) => {
    if (!uploadedFiles.includes(fileName)) {
      setUploadedFiles([...uploadedFiles, fileName]);
    }
  };

  const handleRemoveFile = (index: number) => {
    setUploadedFiles(uploadedFiles.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Persist to Cloud Firestore
    const { data, error, isLocal } = await persistServiceContractToFirestore({
      entity_name: companyName,
      service_scope: serviceType,
      fiscal_period: taxYear,
      raw_files: uploadedFiles,
      status: 'pending',
      cpa_reviewer: 'Sarah Jenkins, CPA (Partner)',
      sla_minutes: 8
    });

    setIsSubmitting(false);
    setIsSuccess(true);
    setSavedContractId(data?.id || `AEGIS-CTR-${Math.floor(100000 + Math.random() * 900000)}`);
    setIsDbPersisted(!isLocal);

    confetti({
      particleCount: 75,
      spread: 60,
      origin: { y: 0.6 }
    });
  };

  const handleGoToSimulator = () => {
    onClose();
    onLaunchSimulation();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSuccess ? (
          <div>
            {/* Header */}
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 text-xs font-mono font-bold bg-emerald-950 text-emerald-400 border border-emerald-500/30 rounded uppercase">
                Service Contract Initiation
              </span>
              <span className="text-xs text-amber-400 font-mono flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 fill-amber-400" />
                <span>DB: {FIREBASE_PROJECT_ID}</span>
              </span>
            </div>

            <h3 className="text-2xl font-extrabold text-white">
              Hire Aegis Operating Firm
            </h3>
            <p className="text-xs text-slate-400 mt-1 mb-6">
              Contract our autonomous multi-agent swarm to fulfill your tax or audit engagement with certified human partner sign-off.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Service Selection */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Service Contract Scope
                </label>
                <select
                  value={serviceType}
                  onChange={(e) => setServiceType(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="Autonomous Corporate Tax Filing">Autonomous Corporate Tax Filing (Form 1120-S / 1065)</option>
                  <option value="Autonomous Statutory Financial Audit">Autonomous Statutory Financial Audit & GAAP Books</option>
                  <option value="Contractor 1099-NEC & Payroll Audit">Contractor 1099-NEC & Payroll Audit</option>
                  <option value="Autonomous M&A & Contract Diligence">Autonomous M&A & Contract Diligence</option>
                </select>
              </div>

              {/* Company & Year */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Entity Legal Name
                  </label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    required
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500 font-medium"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Filing / Fiscal Period
                  </label>
                  <input
                    type="text"
                    value={taxYear}
                    onChange={(e) => setTaxYear(e.target.value)}
                    required
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500 font-mono"
                  />
                </div>
              </div>

              {/* Raw Document Dropzone */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Attach Raw Financial Data (CSV, PDF, Bank exports)
                </label>
                <div className="p-4 rounded-xl border border-dashed border-slate-700 bg-slate-950/60 text-center">
                  <Upload className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
                  <p className="text-xs text-slate-300 font-medium">
                    Drag and drop raw bank statements, invoices, or payroll reports
                  </p>
                  <p className="text-[11px] text-slate-500 mt-1">
                    AI Ingestion Agent extracts & reconciles fields automatically
                  </p>

                  {/* Sample files to quickly click */}
                  <div className="mt-3 flex flex-wrap justify-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleAddSampleFile('Stripe_Payouts_2024.csv')}
                      className="text-[10px] font-mono bg-slate-900 hover:bg-slate-800 text-slate-300 px-2 py-1 rounded border border-slate-800"
                    >
                      + Add Stripe_Payouts_2024.csv
                    </button>
                    <button
                      type="button"
                      onClick={() => handleAddSampleFile('AWS_Cloud_Invoices_Q1_Q4.pdf')}
                      className="text-[10px] font-mono bg-slate-900 hover:bg-slate-800 text-slate-300 px-2 py-1 rounded border border-slate-800"
                    >
                      + Add AWS_Cloud_Invoices.pdf
                    </button>
                  </div>
                </div>

                {/* File list */}
                {uploadedFiles.length > 0 && (
                  <div className="mt-3 space-y-1.5">
                    {uploadedFiles.map((file, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-2 rounded-lg bg-slate-950 border border-slate-800 text-xs"
                      >
                        <div className="flex items-center gap-2 text-slate-300 font-mono text-[11px]">
                          <FileText className="w-3.5 h-3.5 text-emerald-400" />
                          <span>{file}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveFile(idx)}
                          className="text-slate-500 hover:text-red-400 text-xs px-2"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Guarantees */}
              <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/20 text-xs text-slate-300 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Licensed CPA Sign-off + $5M E&O Insurance Guarantee</span>
                </div>
                <span className="font-mono font-bold text-emerald-400">$299 Flat</span>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-4 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 shadow-xl shadow-emerald-500/20 transition-all flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span>Dispatching Autonomous Swarm...</span>
                ) : (
                  <>
                    <span>Dispatch Autonomous Swarm Execution</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center py-6">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="text-2xl font-extrabold text-white mb-2">
              Autonomous Swarm Dispatched!
            </h3>
            <p className="text-xs text-slate-300 max-w-md mx-auto mb-6">
              Your service contract for <strong className="text-white">{companyName}</strong> is now executing across 4 specialized AI agents. Supervising Partner Sarah Jenkins, CPA is staged at the HITL checkpoint.
            </p>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-left text-xs font-mono mb-6 max-w-md mx-auto space-y-2 text-slate-400">
              <div className="flex items-center justify-between text-emerald-400 font-bold">
                <span>✓ Firestore Doc ID: {savedContractId}</span>
                <span className="text-[10px] bg-slate-900 px-2 py-0.5 rounded border border-slate-800 text-amber-300 flex items-center gap-1">
                  <Flame className="w-3 h-3 fill-amber-400 text-amber-400" />
                  <span>{isDbPersisted ? 'Firestore Synchronized' : 'Local Sandbox Mode'}</span>
                </span>
              </div>
              <div>• Status: Autonomous Multi-Agent Ingestion active</div>
              <div>• Target SLA: Completed under 8 minutes</div>
              <div>• CPA Reviewer: Sarah Jenkins, CPA (Partner)</div>
              <div>• Cloud Firestore: {FIREBASE_PROJECT_ID}/service_contracts</div>
            </div>

            <div className="flex justify-center gap-3">
              <button
                onClick={handleGoToSimulator}
                className="px-6 py-3 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 shadow-lg"
              >
                View Live Swarm Execution Stream
              </button>
              <button
                onClick={onClose}
                className="px-4 py-3 rounded-xl text-xs font-semibold text-slate-400 hover:text-white bg-slate-800"
              >
                Close
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
