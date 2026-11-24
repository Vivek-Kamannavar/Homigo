import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { ShieldCheck, Cpu, ArrowRight, Activity, Award, Flame, Menu, X, Database, Scale, TrendingUp, Building2, Sparkles, Home } from 'lucide-react';
import { isFirebaseConfigured, FIREBASE_PROJECT_ID } from '../lib/firebase';
import { FirebaseConnectModal } from './FirebaseConnectModal';

interface NavbarProps {
  onOpenContractModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenContractModal }) => {
  const [isFirebaseModalOpen, setIsFirebaseModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isConnected = isFirebaseConfigured();

  const navLinks = [
    { label: 'Overview', path: '/', icon: <Home className="w-3.5 h-3.5" /> },
    { label: '4 Shifts', path: '/pillars', icon: <ShieldCheck className="w-3.5 h-3.5" /> },
    { label: 'Simulator', path: '/simulator', icon: <Cpu className="w-3.5 h-3.5" /> },
    { label: 'HITL Station', path: '/hitl', icon: <Scale className="w-3.5 h-3.5" /> },
    { label: '10x Economics', path: '/economics', icon: <TrendingUp className="w-3.5 h-3.5" /> },
    { label: 'Services', path: '/services', icon: <Building2 className="w-3.5 h-3.5" /> },
    { label: 'Database', path: '/database', icon: <Flame className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /> },
    { label: 'Stories & FAQ', path: '/assurance', icon: <Sparkles className="w-3.5 h-3.5" /> },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-slate-950/85 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 shrink-0">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-emerald-500/20 text-slate-950">
                <ShieldCheck className="w-6 h-6 stroke-[2.2]" />
              </div>
              <span className="absolute -bottom-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold tracking-tight text-white font-mono">
                  AEGIS<span className="text-emerald-400">.firm</span>
                </span>
                <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-semibold tracking-wide uppercase bg-emerald-950/80 text-emerald-400 border border-emerald-500/30 rounded-full">
                  Service Operator
                </span>
              </div>
              <p className="text-[11px] text-slate-400 tracking-wider">Autonomous Fiduciary & Tax Firm</p>
            </div>
          </Link>

          {/* Desktop Navigation Links (All 8 Pages) */}
          <nav className="hidden xl:flex items-center gap-1 bg-slate-900/60 p-1 rounded-xl border border-slate-800 text-xs font-medium">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800'
                  }`
                }
              >
                {link.icon}
                <span>{link.label}</span>
              </NavLink>
            ))}
          </nav>

          {/* Right Action Icons & Status */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Firebase Database Status Button */}
            <button
              onClick={() => setIsFirebaseModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-amber-500/50 text-xs font-mono transition-all group"
              title="Click to view Firebase DB settings"
            >
              <Flame className={`w-3.5 h-3.5 ${isConnected ? 'text-amber-400 fill-amber-400' : 'text-amber-400'}`} />
              <span className="hidden md:inline text-slate-300">DB: <strong className="text-amber-400 font-semibold">{FIREBASE_PROJECT_ID}</strong></span>
              <span className={`w-2 h-2 rounded-full ${isConnected ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
            </button>

            {/* CTA Contract Button */}
            <button
              onClick={onOpenContractModal}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold text-slate-950 bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 shadow-md shadow-emerald-500/20 transition-all transform active:scale-95"
            >
              <span>Fulfill Contract</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-lg text-slate-300 bg-slate-900 border border-slate-800 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Navigation Menu */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-slate-950/95 border-b border-slate-800 p-4 space-y-1">
            <div className="text-[10px] font-mono font-bold text-slate-500 uppercase px-3 py-1 mb-1">
              Select Page (8 Dedicated Tabs):
            </div>
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-emerald-500 text-slate-950 font-bold'
                      : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                  }`
                }
              >
                {link.icon}
                <span>{link.label}</span>
              </NavLink>
            ))}
          </div>
        )}
      </header>

      {/* Firebase Configuration Modal */}
      <FirebaseConnectModal
        isOpen={isFirebaseModalOpen}
        onClose={() => setIsFirebaseModalOpen(false)}
      />
    </>
  );
};
