"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AboutDoctor from "@/components/AboutDoctor";
import ServicesMatrix from "@/components/ServicesMatrix";
import WhyChooseUs from "@/components/WhyChooseUs";
import Testimonials from "@/components/Testimonials";
import ContactFooter from "@/components/ContactFooter";
import BookingModal from "@/components/BookingModal";
import WhatsAppFAB from "@/components/WhatsAppFAB";
import MobileCTAStickyBar from "@/components/MobileCTAStickyBar";

export default function Home() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const handleOpenBooking = () => setIsBookingOpen(true);
  const handleCloseBooking = () => setIsBookingOpen(false);

  return (
    <div className="relative flex flex-col min-h-screen bg-medical-light selection:bg-medical-navy selection:text-white pb-16 md:pb-0">
      
      {/* Navigation Header */}
      <Navbar onOpenBooking={handleOpenBooking} />

      {/* Main Sections */}
      <main className="flex-grow">
        <Hero onOpenBooking={handleOpenBooking} />
        <AboutDoctor />
        <ServicesMatrix onOpenBooking={handleOpenBooking} />
        <WhyChooseUs />
        <Testimonials />
      </main>

      {/* Footer Details & Google Map */}
      <ContactFooter />

      {/* Sticky Widgets & Modals */}
      <WhatsAppFAB />
      <MobileCTAStickyBar />
      <BookingModal isOpen={isBookingOpen} onClose={handleCloseBooking} />

    </div>
  );
}
