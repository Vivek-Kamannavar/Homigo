import React from 'react';
import { CustomerStories } from '../components/CustomerStories';
import { FAQ } from '../components/FAQ';
import { Sparkles, HelpCircle, ShieldCheck, Award, Lock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface AssurancePageProps {
  onOpenContractModal: () => void;
}

export const AssurancePage: React.FC<AssurancePageProps> = ({ onOpenContractModal }) => {
  return (
    <div className="space-y-16 pb-20 pt-8">
      {/* Page Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/80 border border-purple-500/30 text-purple-400 text-xs font-mono mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>PAGE 07 & 08: CUSTOMER STORIES, REGULATORY ASSURANCE & FAQ</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight">
          Customer Impact & Fiduciary Assurance
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl mx-auto">
          How seed-stage startups, cross-state logistics fleets, and digital clinics eliminated 100% of DIY spreadsheet labor, backed by certified CPA legal opinion memos.
        </p>
      </div>

      {/* Customer Stories Section */}
      <CustomerStories />

      {/* FAQ Section */}
      <div id="faq">
        <FAQ />
      </div>

      {/* Regulatory Disclosures & Policy Card */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-10 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="flex items-center gap-3 mb-4">
            <Award className="w-6 h-6 text-amber-400" />
            <h3 className="text-xl font-bold text-white">
              Regulatory Representation & Insurance Disclosures
            </h3>
          </div>
          <div className="space-y-3 text-xs text-slate-400 leading-relaxed">
            <p>
              <strong>IRS Circular 230 Disclosure:</strong> Pursuant to regulations governing practice before the Internal Revenue Service, any tax advice contained in service deliverables issued by Aegis Operating Firm is certified under the direct supervision of licensed CPAs admitted to practice under Treasury Circular 230.
            </p>
            <p>
              <strong>Fiduciary Representation:</strong> Aegis Operating Firm Inc. is registered in the State of Delaware (Lic #AEGIS-FID-2024) as an authorized professional fiduciary entity. All completed returns are backed by our $5,000,000 professional Errors & Omissions policy (#AEGIS-5M-2024).
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              onClick={onOpenContractModal}
              className="px-6 py-3 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 shadow-md shadow-emerald-500/20"
            >
              Initiate a Service Contract
            </button>
            <Link
              to="/"
              className="text-xs font-semibold text-emerald-400 hover:underline flex items-center gap-1"
            >
              <span>Return to Platform Overview</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

