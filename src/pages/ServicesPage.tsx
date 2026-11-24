import React from 'react';
import { ServiceCatalog } from '../components/ServiceCatalog';
import { Building2, ArrowRight, ShieldCheck, CheckCircle2, Clock, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ServicesPageProps {
  onOpenContractModal: (serviceName?: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onOpenContractModal }) => {
  return (
    <div className="space-y-14 pb-20 pt-8">
      {/* Page Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-500/30 text-indigo-400 text-xs font-mono mb-4">
          <Building2 className="w-3.5 h-3.5" />
          <span>PAGE 05: REGULATED FIDUCIARY SERVICES CATALOG</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight">
          Services We Fulfill Directly as an AI Firm
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl mx-auto">
          We do not sell software seats or empty templates. You contract our autonomous firm to deliver statutory filings, stamped by licensed CPAs with $5,000,000 liability insurance.
        </p>
      </div>

      {/* Main Service Catalog */}
      <ServiceCatalog
        onSelectService={(serviceName) => onOpenContractModal(serviceName)}
      />

      {/* SLA & Delivery Guarantees */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <div className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider mb-1">
                Aegis Fiduciary SLA Guarantee
              </div>
              <h3 className="text-xl font-bold text-white">
                Guaranteed On-Time Filing or 100% Service Fee Refund
              </h3>
              <p className="text-xs text-slate-400 mt-1 max-w-2xl">
                Every corporate tax return, contractor 1099 filing, and statutory audit package is completed within your guaranteed SLA target and e-filed through direct IRS MeF integration.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => onOpenContractModal()}
                className="px-6 py-3 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 shadow-md shadow-emerald-500/20"
              >
                Fulfill a Service Contract
              </button>
              <Link
                to="/database"
                className="px-5 py-3 rounded-xl text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 border border-slate-700"
              >
                View Database Records
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

