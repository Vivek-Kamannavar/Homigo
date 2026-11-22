import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FourPillarsSection } from './components/FourPillarsSection';
import { LiveAgentSimulator } from './components/LiveAgentSimulator';
import { HitlDecisionStation } from './components/HitlDecisionStation';
import { EconomicsComparison } from './components/EconomicsComparison';
import { ServiceCatalog } from './components/ServiceCatalog';
import { DatabaseViewer } from './components/DatabaseViewer';
import { CustomerStories } from './components/CustomerStories';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';
import { ServiceRequestModal } from './components/ServiceRequestModal';

export const App: React.FC = () => {
  const [isContractModalOpen, setIsContractModalOpen] = useState(false);
  const [selectedServiceForModal, setSelectedServiceForModal] = useState('Autonomous Corporate Tax Filing');

  const scrollToSimulator = () => {
    const el = document.getElementById('live-simulator');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToPillars = () => {
    const el = document.getElementById('four-pillars');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToDatabase = () => {
    const el = document.getElementById('database-viewer');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleOpenContractModal = (serviceName?: string) => {
    if (serviceName) setSelectedServiceForModal(serviceName);
    setIsContractModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-slate-950">
      {/* Top Navbar */}
      <Navbar
        onOpenSimulator={scrollToSimulator}
        onOpenContractModal={() => handleOpenContractModal()}
        onScrollToDatabase={scrollToDatabase}
      />

      {/* Hero Section */}
      <main className="flex-1">
        <Hero
          onLaunchDemo={scrollToSimulator}
          onExplorePillars={scrollToPillars}
        />

        {/* Pillar Analysis Section */}
        <FourPillarsSection />

        {/* Live Interactive Agent Execution Simulator */}
        <LiveAgentSimulator
          onTriggerHitlView={() => {
            const el = document.getElementById('hitl-station');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* Human-in-the-Loop Checkpoint Station */}
        <HitlDecisionStation />

        {/* 10x Market Disruption & Economics Simulator */}
        <EconomicsComparison />

        {/* Regulated Service Catalog */}
        <ServiceCatalog
          onSelectService={(serviceName) => handleOpenContractModal(serviceName)}
        />

        {/* Live Firebase Cloud Firestore Database Explorer */}
        <DatabaseViewer
          onOpenContractModal={() => handleOpenContractModal()}
        />

        {/* Real Customer Case Studies */}
        <CustomerStories />

        {/* FAQ */}
        <FAQ />
      </main>

      {/* Footer */}
      <Footer />

      {/* Service Contract Request / Booking Modal */}
      <ServiceRequestModal
        isOpen={isContractModalOpen}
        onClose={() => setIsContractModalOpen(false)}
        defaultServiceName={selectedServiceForModal}
        onLaunchSimulation={scrollToSimulator}
      />
    </div>
  );
};

export default App;
