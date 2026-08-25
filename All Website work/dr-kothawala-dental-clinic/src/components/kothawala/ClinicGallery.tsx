"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Camera, X, Maximize2 } from "lucide-react";
import Image from "next/image";

interface GalleryItem {
  id: number;
  src: string;
  title: string;
  category: string;
  span?: string;
}

export default function ClinicGallery() {
  const [activeImage, setActiveImage] = useState<GalleryItem | null>(null);

  const galleryItems: GalleryItem[] = [
    {
      id: 1,
      src: "/kothawala/chair-grey.jpg",
      title: "Advanced Operatory Suite",
      category: "Clinical Setup",
      span: "md:col-span-2 md:row-span-2"
    },
    {
      id: 2,
      src: "/kothawala/dr-abrar.jpg",
      title: "Dr. Abrar Kothawala",
      category: "Lead Surgeon & Implantologist"
    },
    {
      id: 3,
      src: "/kothawala/before-after.jpg",
      title: "Scaling & Cleaning Transformation",
      category: "Before & After Results"
    },
    {
      id: 4,
      src: "/kothawala/handpiece-treatment.jpg",
      title: "High-Precision Clinical Care",
      category: "Sterile Procedure"
    },
    {
      id: 5,
      src: "/kothawala/chair-blue.jpg",
      title: "Patient Comfort Suite",
      category: "Modern Operatory"
    }
  ];

  return (
    <section id="gallery" className="py-28 lg:py-36 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-7xl">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 text-[#0D9488] text-xs font-bold uppercase tracking-wider mb-4">
            <Camera className="w-3.5 h-3.5" /> Virtual Tour
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-slate-900 tracking-tight mb-4">
            Inside Our <span className="text-[#0D9488]">Care Center</span>
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Explore our state-of-the-art operatory suites, clinical setups, and patient transformations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[240px]">
          {galleryItems.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              onClick={() => setActiveImage(item)}
              className={`relative rounded-3xl overflow-hidden shadow-md group cursor-pointer border border-slate-100 bg-slate-900 ${item.span || ""}`}
            >
              <Image
                src={item.src}
                alt={item.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              <div className="absolute bottom-4 left-4 right-4 text-white flex items-end justify-between">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 block mb-0.5">
                    {item.category}
                  </span>
                  <h3 className="font-heading font-bold text-base sm:text-lg leading-snug">
                    {item.title}
                  </h3>
                </div>

                <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-[#0D9488] transition-colors">
                  <Maximize2 className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      <AnimatePresence>
        {activeImage && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveImage(null)}
              className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-4xl w-full max-h-[85vh] rounded-3xl overflow-hidden bg-slate-900 shadow-2xl z-10 border border-white/10 flex flex-col justify-between"
            >
              <button
                onClick={() => setActiveImage(null)}
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-slate-900/80 text-white hover:bg-slate-800 flex items-center justify-center transition-colors border border-white/20"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="relative w-full h-[65vh]">
                <Image
                  src={activeImage.src}
                  alt={activeImage.title}
                  fill
                  className="object-contain p-4"
                />
              </div>

              <div className="p-6 bg-slate-900 border-t border-white/10 flex items-center justify-between text-white">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                    {activeImage.category}
                  </span>
                  <h3 className="font-heading font-bold text-xl">{activeImage.title}</h3>
                </div>
                <span className="text-xs text-slate-400 font-semibold">Dr. Kothawala Care Center</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
