import React from 'react';
import { Quote, Star, ArrowUpRight, CheckCircle2, TrendingUp } from 'lucide-react';

export const CustomerStories: React.FC = () => {
  const stories = [
    {
      company: 'Kinetic Robotics (YC W23)',
      founder: 'Marcus Chen, Founder & CEO',
      industry: 'Hardware & AI',
      quote: 'Traditional CPA firms quoted us $12,000 for our 1120-S corporate return and R&D tax credit study, saying our team was too small for priority service. Aegis ingested our Mercury bank exports, identified $42,000 in payroll R&D tax credits, and their partner signed off in under 15 minutes for $399.',
      savings: '$11,600 Saved',
      timeSaved: '3 Weeks → 12 Mins',
      badge: 'Seed Startup'
    },
    {
      company: 'Vanguard Freight Network',
      founder: 'Elena Rostova, Managing Member',
      industry: 'Cross-State Logistics',
      quote: 'We have 60 independent contractor drivers across 12 states. Tax season was an absolute nightmare of manual 1099 classification. Aegis runs continuous multi-agent reconciliation and audits safe-harbor compliance in real time. We fired our $4,000/mo bookkeeper.',
      savings: '$48,000/yr Saved',
      timeSaved: '40 Hours/mo Saved',
      badge: 'Mid-Market Logistics'
    },
    {
      company: 'Oasis Clinical Health',
      founder: 'Dr. Aris Thorne, Medical Director',
      industry: 'Telehealth & Digital Care',
      quote: 'Software like QuickBooks only made our lives harder because our clinical staff had to spend weekends categorizing transactions. With Aegis, we do zero data entry. We forward raw statements and receive bank-ready GAAP certified balance sheets every month.',
      savings: '$32,000/yr Saved',
      timeSaved: '100% Zero DIY Labor',
      badge: 'Healthcare SMB'
    }
  ];

  return (
    <section className="py-24 bg-slate-950 border-t border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 text-xs font-mono mb-4">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>LONG-TAIL MARKET TRANSFORMATION</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Unlocking Businesses Traditional Firms Ignored
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-400">
            See how startups and small businesses access Fortune 500-grade fiduciary tax and audit execution at a fraction of the cost.
          </p>
        </div>

        {/* 3 Story Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {stories.map((story, i) => (
            <div
              key={i}
              className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between hover:border-slate-700 transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800">
                    {story.badge}
                  </span>
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, idx) => (
                      <Star key={idx} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>

                <Quote className="w-8 h-8 text-emerald-500/30 mb-3" />

                <p className="text-xs text-slate-300 leading-relaxed italic mb-6">
                  "{story.quote}"
                </p>
              </div>

              <div>
                <div className="grid grid-cols-2 gap-2 p-3 rounded-xl bg-slate-950 border border-slate-800 mb-4">
                  <div>
                    <div className="text-[10px] text-slate-500 uppercase">Cost Advantage</div>
                    <div className="text-xs font-bold text-emerald-400 font-mono">{story.savings}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500 uppercase">Velocity Gain</div>
                    <div className="text-xs font-bold text-cyan-400 font-mono">{story.timeSaved}</div>
                  </div>
                </div>

                <div className="border-t border-slate-800 pt-4">
                  <div className="text-sm font-bold text-white">{story.company}</div>
                  <div className="text-xs text-slate-400">{story.founder}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

