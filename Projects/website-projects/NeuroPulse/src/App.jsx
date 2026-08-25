import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Manifesto from './components/Manifesto';
import Protocol from './components/Protocol';
import Pricing from './components/Pricing';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-void text-gray-300 relative selection:bg-plasma-blue/30 selection:text-white">
      {/* Global Noise Texture */}
      <div className="noise-overlay" />

      {/* Global Grid pattern */}
      <div className="grid-bg" />

      <Navbar />
      <Hero />
      <Features />
      <Manifesto />
      <Protocol />
      <Pricing />
      <Footer />
    </div>
  );
}

export default App;
