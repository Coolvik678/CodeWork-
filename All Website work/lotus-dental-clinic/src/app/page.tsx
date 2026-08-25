"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/lotus/Navbar";
import Hero from "@/components/lotus/Hero";
import AboutSoni from "@/components/lotus/AboutSoni";
import ServicesGrid from "@/components/lotus/ServicesGrid";
import Testimonials from "@/components/lotus/Testimonials";
import BookingSection from "@/components/lotus/BookingSection";
import Footer from "@/components/lotus/Footer";
import BookingModal from "@/components/lotus/BookingModal";
import WhatsAppFAB from "@/components/lotus/WhatsAppFAB";

export default function Home() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  useEffect(() => {
    // Reset scroll restoration
    window.history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
  }, []);

  const handleOpenBooking = () => setIsBookingOpen(true);
  const handleCloseBooking = () => setIsBookingOpen(false);

  return (
    <div className="relative flex flex-col min-h-screen bg-white text-slate-900 selection:bg-[#064E3B] selection:text-white antialiased">
      {/* Dynamic Navigation */}
      <Navbar onOpenBooking={handleOpenBooking} />

      {/* Page Contents */}
      <main className="flex-grow">
        <Hero onOpenBooking={handleOpenBooking} />
        <AboutSoni />
        <ServicesGrid onOpenBooking={handleOpenBooking} />
        <Testimonials />
        <BookingSection />
      </main>

      {/* Main Footer Details */}
      <Footer />

      {/* Float Actions */}
      <WhatsAppFAB />
      <BookingModal isOpen={isBookingOpen} onClose={handleCloseBooking} />
    </div>
  );
}
