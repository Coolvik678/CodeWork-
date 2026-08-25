import Link from "next/link";
import Image from "next/image";
import { Phone, MessageCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400 py-12 border-t border-gray-800">
      <div className="container mx-auto px-6 lg:px-12 w-full max-w-7xl">
        <div className="grid lg:grid-cols-4 gap-8 mb-12">
          
          {/* Brand - Exactly ONE logo */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-6 group inline-flex">
              <div className="relative w-10 h-10 drop-shadow-md">
                <Image src="/logo.png" alt="PixelCraft Studios Logo" fill className="object-contain" />
              </div>
              <span className="font-heading font-bold text-2xl text-white tracking-tight">PixelCraft <span className="text-[#0D9488]">Studios</span></span>
            </Link>
            <p className="text-sm leading-relaxed max-w-sm mb-6">
              Designing premium, high-converting digital interfaces for businesses across India.
            </p>
            <div className="flex flex-col gap-3">
              <a href="tel:+919691504861" className="inline-flex items-center gap-2 text-white hover:text-[#0D9488] transition-colors font-medium">
                <Phone className="w-4 h-4" />
                +91 96915 04861
              </a>
              <a href="https://wa.me/919691504861" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[#25D366] hover:text-white transition-colors font-medium">
                <MessageCircle className="w-4 h-4" />
                Chat on WhatsApp
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-1">
            <h4 className="text-white font-semibold mb-6 uppercase tracking-wider text-sm">Navigation</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="#services" className="hover:text-[#0D9488] transition-colors">Services</Link></li>
              <li><Link href="#portfolio" className="hover:text-[#0D9488] transition-colors">Portfolio</Link></li>
              <li><Link href="#testimonials" className="hover:text-[#0D9488] transition-colors">Testimonials</Link></li>
              <li><Link href="#contact" className="hover:text-[#0D9488] transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Social / Legal */}
          <div className="lg:col-span-1">
            <h4 className="text-white font-semibold mb-6 uppercase tracking-wider text-sm">Connect</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-[#0D9488] transition-colors">LinkedIn</a></li>
              <li><a href="#" className="hover:text-[#0D9488] transition-colors">Twitter</a></li>
              <li><a href="#" className="hover:text-[#0D9488] transition-colors">Instagram</a></li>
              <li><a href="#" className="hover:text-[#0D9488] transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-gray-800 text-sm text-center md:text-left flex flex-col md:flex-row justify-between items-center">
          <p>&copy; 2025 PixelCraft Studios. All rights reserved.</p>
          <p className="mt-2 md:mt-0 text-gray-500">Made with ❤️ in India.</p>
        </div>
      </div>
    </footer>
  );
}
