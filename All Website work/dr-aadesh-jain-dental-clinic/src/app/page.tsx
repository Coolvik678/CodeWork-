"use client";

import { useState } from "react";
import Navbar from "@/components/dental/Navbar";
import Hero from "@/components/dental/Hero";
import Highlights from "@/components/dental/Highlights";
import AboutJain from "@/components/dental/AboutJain";
import ServicesGrid from "@/components/dental/ServicesGrid";
import Gallery from "@/components/dental/Gallery";
import Testimonials from "@/components/dental/Testimonials";
import ContactSection from "@/components/dental/ContactSection";
import BookingModal from "@/components/dental/BookingModal";
import WhatsAppFAB from "@/components/dental/WhatsAppFAB";

export default function Home() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <>
      <Navbar onOpenBooking={() => setIsBookingOpen(true)} />
      
      <main className="flex-grow">
        <Hero onOpenBooking={() => setIsBookingOpen(true)} />
        <Highlights />
        <AboutJain />
        <ServicesGrid onOpenBooking={() => setIsBookingOpen(true)} />
        <Gallery />
        <Testimonials />
        <ContactSection />
      </main>

      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
      <WhatsAppFAB />
    </>
  );
}
