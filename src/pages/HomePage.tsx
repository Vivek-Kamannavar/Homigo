import React from 'react';
import { Link } from 'react-router-dom';
import { Hero } from '../components/Hero';
import { ArrowRight, ShieldCheck, Cpu, Scale, TrendingUp, Building2, Database, Award, CheckCircle2, Sparkles, Flame } from 'lucide-react';
import { FIREBASE_PROJECT_ID } from '../lib/firebase';

interface HomePageProps {
  onOpenContractModal: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenContractModal }) => {
  const pagesList = [
    {
      title: '01. The 4 Paradigm Shifts',
      path: '/pillars',
      icon: <ShieldCheck className="w-6 h-6 text-emerald-400" />,
      desc: 'Tool Provider vs Service Operator, multi-agent swarms, liability checkpoints, and infinite scale.',
      badge: 'Core Architecture'
    },
    {
      title: '02. Live Multi-Agent Simulator',
      path: '/simulator',
      icon: <Cpu className="w-6 h-6 text-teal-400" />,
      desc: 'Interactive 4-agent execution cockpit with sub-agent communication, token telemetry, and live audit streams.',
      badge: 'Interactive Demo'
    },
    {
      title: '03. Human-in-the-Loop Station',
      path: '/hitl',
      icon: <Scale className="w-6 h-6 text-cyan-400" />,
      desc: 'Licensed CPA & Attorney high-liability judgment checkpoints, regulatory ambiguities, and $5M E&O sign-offs.',
      badge: 'Fiduciary Checkpoint'
    },
    {
      title: '04. 10x Economics & Calculator',
      path: '/economics',
      icon: <TrendingUp className="w-6 h-6 text-amber-400" />,
      desc: 'Simulate financial disruption: 80% lower cost, minutes turnaround, and unlocking 33M long-tail SMBs.',
      badge: 'Market Disruption'
    },
    {
      title: '05. Regulated Services Catalog',
      path: '/services',
      icon: <Building2 className="w-6 h-6 text-indigo-400" />,
      desc: 'Direct corporate tax returns (1120-S), GAAP monthly audits, 1099 compliance, and M&A contract diligence.',
      badge: 'Fiduciary Contracts'
    },
    {
      title: '06. Cloud Firestore Explorer',
      path: '/database',
      icon: <Flame className="w-6 h-6 text-amber-400 fill-amber-400" />,
      desc: `Live database inspection for Firebase Project ${FIREBASE_PROJECT_ID} with collections for contracts, HITL, and logs.`,
      badge: 'Firebase Live'
    },
    {
      title: '07. Customer Stories & Impact',
      path: '/assurance',
      icon: <Sparkles className="w-6 h-6 text-purple-400" />,
      desc: 'Real case studies from YC startups, freight fleets, and health clinics saving $11K-$48K/yr with zero manual labor.',
      badge: 'Case Studies'
    },
    {
      title: '08. Fiduciary FAQ & Disclosures',
      path: '/assurance#faq',
      icon: <Award className="w-6 h-6 text-rose-400" />,
      desc: 'Legal liability answers, IRS Circular 230 compliance, Delaware license registry, and audit defense shield.',
      badge: 'Legal & Insurance'
    }
  ];

  return (
    <div className="space-y-16 pb-20">
      {/* Hero section */}
      <Hero
        onLaunchDemo={() => window.location.assign('/simulator')}
        onExplorePillars={() => window.location.assign('/pillars')}
      />

      {/* 8 Webpages Directory Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 text-xs font-mono mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>PLATFORM NAVIGATION DIRECTORY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Explore All 8 Dedicated Platform Pages
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base">
            Every step and architectural layer is broken down into a dedicated full-page experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pagesList.map((page, idx) => (
            <Link
              key={idx}
              to={page.path}
              className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-emerald-500/50 hover:bg-slate-850/80 transition-all flex flex-col justify-between group shadow-lg hover:shadow-emerald-500/10"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 group-hover:scale-105 transition-transform">
                    {page.icon}
                  </div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-950 text-emerald-400 border border-emerald-500/20">
                    {page.badge}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors">
                  {page.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  {page.desc}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold text-emerald-400 group-hover:translate-x-1 transition-transform">
                <span>View Full Webpage</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Quick Launch CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-emerald-950/60 via-slate-900 to-teal-950/50 border border-emerald-500/40 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
                Full-Stack Service Operator
              </span>
              <span className="text-slate-600">|</span>
              <span className="text-xs text-slate-400 font-mono">$5M Liability Backed</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              Ready to bypass software licenses and contract the result?
            </h3>
            <p className="text-sm text-slate-300 mt-2 max-w-2xl">
              Upload your raw Mercury exports, Stripe data, or invoices. Our autonomous agent swarm executes the return, and licensed CPAs stamp the filing in under 10 minutes.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
            <button
              onClick={onOpenContractModal}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 shadow-xl shadow-emerald-500/20 transition-all transform active:scale-95"
            >
              Fulfill a Contract ($299)
            </button>
            <Link
              to="/simulator"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-all text-center"
            >
              Launch Live Simulator
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
