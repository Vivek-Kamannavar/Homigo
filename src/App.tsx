import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ServiceRequestModal } from './components/ServiceRequestModal';

// 8 Dedicated Webpages
import { HomePage } from './pages/HomePage';
import { PillarsPage } from './pages/PillarsPage';
import { SimulatorPage } from './pages/SimulatorPage';
import { HitlPage } from './pages/HitlPage';
import { EconomicsPage } from './pages/EconomicsPage';
import { ServicesPage } from './pages/ServicesPage';
import { DatabasePage } from './pages/DatabasePage';
import { AssurancePage } from './pages/AssurancePage';

// Scroll to top on route change helper
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

export const App: React.FC = () => {
  const [isContractModalOpen, setIsContractModalOpen] = useState(false);
  const [selectedServiceForModal, setSelectedServiceForModal] = useState('Autonomous Corporate Tax Filing');

  const handleOpenContractModal = (serviceName?: string) => {
    if (serviceName) setSelectedServiceForModal(serviceName);
    setIsContractModalOpen(true);
  };

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-slate-950">
        
        {/* Unified Top Navbar for all 8 Pages */}
        <Navbar
          onOpenContractModal={() => handleOpenContractModal()}
        />

        {/* 8 Dedicated Page Routes */}
        <main className="flex-1">
          <Routes>
            {/* Page 1: Home Overview */}
            <Route
              path="/"
              element={<HomePage onOpenContractModal={() => handleOpenContractModal()} />}
            />

            {/* Page 2: The 4 Shifts */}
            <Route
              path="/pillars"
              element={<PillarsPage />}
            />

            {/* Page 3: Live Agent Simulator */}
            <Route
              path="/simulator"
              element={<SimulatorPage />}
            />

            {/* Page 4: Human-in-the-Loop Station */}
            <Route
              path="/hitl"
              element={<HitlPage />}
            />

            {/* Page 5: 10x Economics & Calculator */}
            <Route
              path="/economics"
              element={<EconomicsPage />}
            />

            {/* Page 6: Services Catalog */}
            <Route
              path="/services"
              element={<ServicesPage onOpenContractModal={handleOpenContractModal} />}
            />

            {/* Page 7: Cloud Firestore Database Explorer */}
            <Route
              path="/database"
              element={<DatabasePage onOpenContractModal={() => handleOpenContractModal()} />}
            />

            {/* Page 8: Customer Stories, Assurance & FAQ */}
            <Route
              path="/assurance"
              element={<AssurancePage onOpenContractModal={() => handleOpenContractModal()} />}
            />

            {/* Catch-all redirect */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        {/* Unified Footer */}
        <Footer />

        {/* Global Contract Booking Modal */}
        <ServiceRequestModal
          isOpen={isContractModalOpen}
          onClose={() => setIsContractModalOpen(false)}
          defaultServiceName={selectedServiceForModal}
          onLaunchSimulation={() => {
            window.location.assign('/simulator');
          }}
        />
      </div>
    </BrowserRouter>
  );
};

export default App;
