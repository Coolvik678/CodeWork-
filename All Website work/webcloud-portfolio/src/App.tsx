import React, { useState } from 'react';
import { DentalCanvas } from './components/DentalCanvas';
import { Navbar } from './components/Navbar';
import { HeroOverlay } from './components/HeroOverlay';
import { DiagnosisSection } from './components/DiagnosisSection';
import { PortfolioSection } from './components/PortfolioSection';
import { GrowthSection } from './components/GrowthSection';
import { PricingSection } from './components/PricingSection';
import { FooterSection } from './components/FooterSection';
import { ProjectModal } from './components/ProjectModal';
import { WhatsAppModal } from './components/WhatsAppModal';
import { WhatsAppFAB } from './components/WhatsAppFAB';
import type { Project } from './data/projects';

export function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [whatsAppModalOpen, setWhatsAppModalOpen] = useState(false);
  const [whatsAppMessage, setWhatsAppMessage] = useState<string | undefined>(undefined);

  const handleOpenWhatsApp = (message?: string) => {
    setWhatsAppMessage(message);
    setWhatsAppModalOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-[#070c14] text-white font-sans antialiased selection:bg-emerald-500 selection:text-slate-950">
      {/* 3D Frame Scrubbing Scroll Canvas Background */}
      <DentalCanvas totalFrames={60} />

      {/* Floating Header */}
      <Navbar onOpenWhatsApp={handleOpenWhatsApp} />

      {/* UI Component Overlays */}
      <main className="relative z-10 space-y-16">
        <HeroOverlay onOpenWhatsApp={handleOpenWhatsApp} />
        <DiagnosisSection onOpenWhatsApp={handleOpenWhatsApp} />
        <PortfolioSection onSelectProject={(project) => setSelectedProject(project)} />
        <GrowthSection onOpenWhatsApp={handleOpenWhatsApp} />
        <PricingSection onOpenWhatsApp={handleOpenWhatsApp} />
      </main>

      {/* Footer Section */}
      <FooterSection onOpenWhatsApp={handleOpenWhatsApp} />

      {/* Floating Action Button */}
      <WhatsAppFAB onOpenWhatsApp={handleOpenWhatsApp} />

      {/* Modals */}
      <WhatsAppModal
        isOpen={whatsAppModalOpen}
        initialMessage={whatsAppMessage}
        onClose={() => setWhatsAppModalOpen(false)}
      />

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onOpenWhatsApp={handleOpenWhatsApp}
      />
    </div>
  );
}

export default App;
