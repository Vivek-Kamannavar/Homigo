import React from 'react';
import { SERVICE_OFFERINGS } from '../data/mockData';
import { Check, ArrowRight, ShieldCheck, Clock, Zap, FileSpreadsheet, Building2 } from 'lucide-react';

interface ServiceCatalogProps {
  onSelectService: (serviceName: string) => void;
}

export const ServiceCatalog: React.FC<ServiceCatalogProps> = ({ onSelectService }) => {
  return (
    <section id="services" className="py-24 bg-slate-900/60 border-t border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 text-xs font-mono mb-4">
            <Building2 className="w-3.5 h-3.5" />
            <span>OPERATING SERVICES</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Regulated Services We Fulfill Directly
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-400">
            You don't configure workflows or manage software seats. You hire us to deliver statutory outcomes, filed and certified by licensed practitioners.
          </p>
        </div>

        {/* 3 Major Service Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {SERVICE_OFFERINGS.map((service) => (
            <div
              key={service.id}
              className="p-8 rounded-2xl bg-slate-950 border border-slate-800 hover:border-emerald-500/50 transition-all flex flex-col justify-between group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl group-hover:bg-emerald-500/10 transition-all" />

              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-emerald-400">
                    {service.badge}
                  </span>
                  <div className="flex items-center gap-1 text-[11px] font-mono text-slate-400">
                    <Clock className="w-3 h-3 text-emerald-400" />
                    <span>{service.turnaround}</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-emerald-300 transition-colors">
                  {service.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Price contrast */}
                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 mb-6">
                  <div className="flex items-baseline justify-between mb-1">
                    <span className="text-xs text-slate-400">Aegis Service Fee:</span>
                    <span className="text-xl font-bold font-mono text-emerald-400">{service.startingPrice}</span>
                  </div>
                  <div className="flex items-baseline justify-between text-[11px] text-slate-500 line-through">
                    <span>Traditional Firm Fee:</span>
                    <span>{service.traditionalPrice}</span>
                  </div>
                </div>

                {/* Deliverables List */}
                <div className="space-y-2.5 mb-8">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-semibold mb-2">
                    Service Scope & Deliverables:
                  </div>
                  {service.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => onSelectService(service.title)}
                className="w-full py-3 px-4 rounded-xl text-xs font-bold text-white bg-slate-900 hover:bg-emerald-500 hover:text-slate-950 border border-slate-700 hover:border-emerald-400 transition-all flex items-center justify-center gap-2 group/btn"
              >
                <span>Initiate Service Engagement</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          ))}
        </div>

        {/* Fiduciary Assurance Banner */}
        <div className="mt-12 p-6 rounded-2xl bg-slate-950/60 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-500/30 text-emerald-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Full Fiduciary Representation & IRS Audit Shield</h4>
              <p className="text-xs text-slate-400">Every contract fulfilled by Aegis includes free audit defense and $5,000,000 E&O coverage.</p>
            </div>
          </div>
          <div className="text-xs font-mono text-slate-400">
            Delaware Lic #AEGIS-FID-2024
          </div>
        </div>

      </div>
    </section>
  );
};

