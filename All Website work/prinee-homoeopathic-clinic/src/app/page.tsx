import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AboutDoctor from "@/components/AboutDoctor";
import Treatments from "@/components/Treatments";
import Apothecary from "@/components/Apothecary";
import AlopeciaBanner from "@/components/AlopeciaBanner";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Treatments />
        <AboutDoctor />
        <Apothecary />
        <AlopeciaBanner />
        <Testimonials />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
