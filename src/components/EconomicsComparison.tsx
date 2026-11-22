import React, { useState } from 'react';
import { TrendingUp, DollarSign, Clock, Users, ArrowUpRight, Check, Zap } from 'lucide-react';

export const EconomicsComparison: React.FC = () => {
  const [employeeCount, setEmployeeCount] = useState<number>(15);
  const [transactionVolume, setTransactionVolume] = useState<number>(1200);

  // Dynamic calculations based on business metrics
  const traditionalCost = Math.round(3500 + employeeCount * 180 + (transactionVolume / 100) * 80);
  const traditionalDays = Math.round(14 + employeeCount * 0.4);
  const customerLaborHours = Math.round(25 + employeeCount * 1.2);

  const saasToolCost = Math.round(120 + employeeCount * 15);
  const saasCustomerHours = Math.round(35 + employeeCount * 1.5); // DIY tool requires MORE of customer's own time!

  const aegisCost = Math.round(249 + employeeCount * 22 + (transactionVolume / 1000) * 35);
  const aegisMinutes = Math.round(6 + employeeCount * 0.2);
  const aegisCustomerHours = 0.5; // Just 30 mins to upload raw files and 1-click review

  const totalSavings = traditionalCost - aegisCost;
  const savingsPercent = Math.round((totalSavings / traditionalCost) * 100);

  return (
    <section id="economics" className="py-24 bg-slate-950 border-t border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/80 border border-amber-500/30 text-amber-400 text-xs font-mono mb-4">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>PILLAR 04: MARKET DISRUPTION & SCALE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            10x Faster. 80% Cheaper. Serving the Long-Tail SMB.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-400">
            By collapsing marginal labor costs to compute pennies, we deliver elite institutional tax and audit services to millions of small businesses that traditional firms refuse to serve.
          </p>
        </div>

        {/* Interactive Sliders for Economics Simulator */}
        <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/90 border border-slate-800 mb-12">
          <div className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-6">
            Simulate Your Company's Economics:
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            
            {/* Slider 1: Employees */}
            <div>
              <div className="flex items-center justify-between text-sm font-semibold text-white mb-2">
                <span>Team / Contractor Size</span>
                <span className="font-mono text-emerald-400 font-bold">{employeeCount} people</span>
              </div>
              <input
                type="range"
                min="1"
                max="100"
                value={employeeCount}
                onChange={(e) => setEmployeeCount(Number(e.target.value))}
                className="w-full accent-emerald-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-slate-500 mt-1">
                <span>Solo Founder (1)</span>
                <span>Growth Startup (50)</span>
                <span>Mid-Market (100)</span>
              </div>
            </div>

            {/* Slider 2: Monthly Transactions */}
            <div>
              <div className="flex items-center justify-between text-sm font-semibold text-white mb-2">
                <span>Monthly Transaction Volume</span>
                <span className="font-mono text-emerald-400 font-bold">{transactionVolume.toLocaleString()} txns</span>
              </div>
              <input
                type="range"
                min="100"
                max="10000"
                step="100"
                value={transactionVolume}
                onChange={(e) => setTransactionVolume(Number(e.target.value))}
                className="w-full accent-emerald-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-slate-500 mt-1">
                <span>100</span>
                <span>5,000</span>
                <span>10,000+</span>
              </div>
            </div>

          </div>

          {/* Quick Highlight Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-xl bg-slate-950 border border-slate-800">
            <div>
              <div className="text-[11px] text-slate-400">Annual Estimated Cost Savings</div>
              <div className="text-2xl font-black text-emerald-400 font-mono">
                ${(totalSavings * 12).toLocaleString()}/yr
              </div>
              <div className="text-[10px] text-slate-500">{savingsPercent}% cheaper than boutique firm</div>
            </div>
            <div>
              <div className="text-[11px] text-slate-400">Customer Time Liberated</div>
              <div className="text-2xl font-black text-white font-mono">
                {Math.round(customerLaborHours * 12)} hours/yr
              </div>
              <div className="text-[10px] text-slate-500">Zero spreadsheet data entry</div>
            </div>
            <div>
              <div className="text-[11px] text-slate-400">Turnaround Velocity</div>
              <div className="text-2xl font-black text-cyan-400 font-mono">
                {aegisMinutes} mins <span className="text-xs font-normal text-slate-400">vs {traditionalDays} days</span>
              </div>
              <div className="text-[10px] text-slate-500">Autonomous instant fulfillment</div>
            </div>
          </div>
        </div>

        {/* 3-Way Comparative Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          
          {/* 1. Traditional Boutique Firm */}
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono font-bold text-slate-400 uppercase">Model A</span>
                <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded">High Overhead</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-1">Traditional Accounting Firm</h3>
              <p className="text-xs text-slate-400 mb-6">Human billable hours, manual document chasing, slow turnaround.</p>

              <div className="mb-6">
                <div className="text-3xl font-extrabold text-white font-mono mb-1">
                  ${traditionalCost.toLocaleString()}
                  <span className="text-xs text-slate-400 font-normal"> / engagement</span>
                </div>
                <div className="text-xs text-slate-400 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-red-400" />
                  <span>Turnaround: <strong>{traditionalDays} business days</strong></span>
                </div>
              </div>

              <div className="space-y-2.5 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <span className="text-red-400 font-bold">✕</span>
                  <span>Minimum fee barriers block small businesses</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-red-400 font-bold">✕</span>
                  <span>Billable at $350 - $600/hr for routine work</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-red-400 font-bold">✕</span>
                  <span>Requires {customerLaborHours}h of customer back-and-forth</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-800 text-[11px] text-slate-500 text-center font-mono">
              High Labor • Low Scale • High Cost
            </div>
          </div>

          {/* 2. Legacy SaaS Software */}
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono font-bold text-slate-400 uppercase">Model B</span>
                <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded">Tool Provider</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-1">Traditional SaaS Tools</h3>
              <p className="text-xs text-slate-400 mb-6">QuickBooks, Xero, TurboTax DIY. You do all the labor.</p>

              <div className="mb-6">
                <div className="text-3xl font-extrabold text-white font-mono mb-1">
                  ${saasToolCost.toLocaleString()}
                  <span className="text-xs text-slate-400 font-normal"> / mo license</span>
                </div>
                <div className="text-xs text-slate-400 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span>Labor Required: <strong>{saasCustomerHours} hrs of YOUR time</strong></span>
                </div>
              </div>

              <div className="space-y-2.5 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <span className="text-amber-400 font-bold">!</span>
                  <span>Cheap license, but huge customer time tax</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-amber-400 font-bold">!</span>
                  <span>No fiduciary responsibility or audit defense</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-amber-400 font-bold">!</span>
                  <span>Still requires hiring a CPA for official filing</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-800 text-[11px] text-slate-500 text-center font-mono">
              Zero Fiduciary Liability • High Customer Burden
            </div>
          </div>

          {/* 3. Aegis Full-Stack AI Service Operator */}
          <div className="p-6 rounded-2xl bg-gradient-to-b from-emerald-950/40 via-slate-900 to-teal-950/30 border-2 border-emerald-500/50 flex flex-col justify-between shadow-2xl relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-emerald-500 text-slate-950 text-[10px] font-bold font-mono uppercase tracking-wider">
              Disruptive Operator
            </div>

            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono font-bold text-emerald-400 uppercase">Model C</span>
                <span className="text-[10px] bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/30 font-semibold">
                  Service Operator
                </span>
              </div>
              <h3 className="text-lg font-bold text-white mb-1">Aegis Autonomous Firm</h3>
              <p className="text-xs text-slate-300 mb-6">Full contract fulfillment, multi-agent execution, certified CPA sign-off.</p>

              <div className="mb-6">
                <div className="text-3xl font-extrabold text-emerald-400 font-mono mb-1">
                  ${aegisCost.toLocaleString()}
                  <span className="text-xs text-slate-400 font-normal"> / complete service</span>
                </div>
                <div className="text-xs text-emerald-300 flex items-center gap-1.5 font-medium">
                  <Zap className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Turnaround: <strong>{aegisMinutes} minutes (100% CPA Certified)</strong></span>
                </div>
              </div>

              <div className="space-y-2.5 text-xs text-slate-200">
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>80% lower cost due to compute-level efficiency</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Direct fiduciary liability with $5M E&O policy</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Under 30 minutes total customer input</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-emerald-500/30 text-[11px] text-emerald-400 text-center font-mono font-semibold">
              Near-Zero Marginal Labor • Infinite Scale • Certified
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

