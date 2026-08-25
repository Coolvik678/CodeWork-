"use client";

import { useState, useEffect } from "react";
import ToothLoader from "@/components/dental/ToothLoader";
import Navbar from "@/components/dental/Navbar";
import Hero from "@/components/dental/Hero";
import ServicesMatrix from "@/components/dental/ServicesMatrix";
import ClinicExperience from "@/components/dental/ClinicExperience";
import TestimonialsCarousel from "@/components/dental/TestimonialsCarousel";
import FAQSection from "@/components/dental/FAQSection";
import ContactFooter from "@/components/dental/ContactFooter";
import BookingModal from "@/components/dental/BookingModal";
import WhatsAppFAB from "@/components/dental/WhatsAppFAB";

export default function Home() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  useEffect(() => {
    // Prevent browser from restoring scroll position to the bottom on refresh
    window.history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
  }, []);

  const handleOpenBooking = () => setIsBookingOpen(true);
  const handleCloseBooking = () => setIsBookingOpen(false);

  return (
    <div className="relative flex flex-col min-h-screen bg-white text-slate-900 selection:bg-[#0A7E8C] selection:text-white">
      {/* Dental Preloader */}
      <ToothLoader />

      {/* Navigation Bar */}
      <Navbar onOpenBooking={handleOpenBooking} />

      {/* Main Sections */}
      <main className="flex-grow">
        <Hero onOpenBooking={handleOpenBooking} />
        <ClinicExperience />
        <ServicesMatrix onOpenBooking={handleOpenBooking} />
        <TestimonialsCarousel />
        <FAQSection />
      </main>

      {/* Contact & Location Footer */}
      <ContactFooter onOpenBooking={handleOpenBooking} />

      {/* Floating Interactive Action Elements */}
      <WhatsAppFAB />
      <BookingModal isOpen={isBookingOpen} onClose={handleCloseBooking} />
    </div>
  );
}
