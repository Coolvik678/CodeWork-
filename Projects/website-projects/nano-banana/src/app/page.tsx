"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { products } from '@/data/products';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductBottleScroll from '@/components/ProductBottleScroll';
import ProductTextOverlays from '@/components/ProductTextOverlays';

export default function Page() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const product = products[currentIndex];

  useEffect(() => {
    // Sync body background
    document.documentElement.style.setProperty('--product-gradient', product.gradient);
    // Reset scroll position gracefully
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [currentIndex, product]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % products.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
  };

  return (
    <main className="w-full relative selection:bg-orange-500 selection:text-white">
      <Navbar />

      {/* Pagination fixed controls */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center justify-center gap-4 bg-black/50 backdrop-blur-xl px-6 py-3 rounded-full border border-white/20 shadow-2xl">
        <button onClick={handlePrev} className="text-white hover:text-orange-400 font-bold px-2 py-1 transition-colors">
          &larr; Prev
        </button>
        <div className="flex gap-2">
          {products.map((p, idx) => (
            <button
              key={p.id}
              onClick={() => setCurrentIndex(idx)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${currentIndex === idx ? 'w-8 bg-white' : 'bg-white/30 hover:bg-white/60'
                }`}
            />
          ))}
        </div>
        <button onClick={handleNext} className="text-white hover:text-orange-400 font-bold px-2 py-1 transition-colors">
          Next &rarr;
        </button>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="relative w-full"
        >
          {/* The Canvas scroll storytelling */}
          <div className="relative z-0">
            <ProductBottleScroll folderPath={product.folderPath} />
            <ProductTextOverlays
              section1={product.section1}
              section2={product.section2}
              section3={product.section3}
              section4={product.section4}
            />
          </div>

          {/* Information Sections */}
          <div className="relative z-20 bg-black text-white w-full rounded-t-[3rem] -mt-[100vh]">
            {/* Buffer Space inside rounded container */}
            <div className="h-[20vh]" />

            <div className="max-w-7xl mx-auto px-6 space-y-32 py-16">

              {/* Product Details Section */}
              <motion.section
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 50 }}
                viewport={{ once: true, margin: "-100px" }}
                className="grid md:grid-cols-2 gap-12 items-center"
              >
                <div className="space-y-6">
                  <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-100 to-gray-500">
                    {product.detailsSection.title}
                  </h2>
                  <p className="text-xl leading-relaxed text-gray-400 font-light">
                    {product.detailsSection.description}
                  </p>
                  <div className="flex flex-wrap gap-4 mt-8">
                    {product.features.map(f => (
                      <span key={f} className="px-4 py-2 bg-white/10 rounded-full border border-white/20 text-sm font-medium">
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-3xl aspect-square flex items-center justify-center p-12 overflow-hidden relative group">
                  {/* Simulated Image Placeholder or real image wrapper */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-50 group-hover:scale-110 transition-transform duration-700" />
                  <div className="text-center">
                    <p className="font-bold text-2xl tracking-tight text-white/50 w-full mb-4">
                      {product.detailsSection.imageAlt}
                    </p>
                    <div className="grid grid-cols-3 gap-8 mt-6 w-full text-center divide-x divide-white/10 border-t border-white/10 pt-8">
                      {product.stats.map(s => (
                        <div key={s.label}>
                          <div className="text-3xl font-black text-white mb-1">{s.val}</div>
                          <div className="text-xs uppercase tracking-widest text-gray-500">{s.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.section>

              {/* Freshness Section */}
              <motion.section
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 50 }}
                viewport={{ once: true, margin: "-100px" }}
                className="text-center max-w-4xl mx-auto"
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-8">
                  {product.freshnessSection.title}
                </h2>
                <p className="text-2xl font-light text-gray-400 leading-relaxed md:leading-loose">
                  {product.freshnessSection.description}
                </p>
              </motion.section>

              {/* Buy Now Section */}
              <motion.section
                whileInView={{ opacity: 1, scale: 1 }}
                initial={{ opacity: 0, scale: 0.95 }}
                viewport={{ once: true, margin: "-100px" }}
                className="bg-gradient-to-br from-gray-900 to-black rounded-3xl p-8 md:p-16 border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] flex flex-col items-center justify-center text-center space-y-8 relative overflow-hidden"
              >
                <div className="absolute inset-0 z-0 pointer-events-none" style={{ background: `radial-gradient(circle at center, ${product.themeColor}33 0%, transparent 70%)` }} />

                <div className="relative z-10 w-full">
                  <h2 className="text-4xl font-bold mb-2">Claim Your Freshness</h2>
                  <div className="text-5xl font-black my-4 text-white">
                    {product.buyNowSection.price} <span className="text-xl text-gray-500 font-medium"> {product.buyNowSection.unit}</span>
                  </div>

                  <div className="flex justify-center gap-3 flex-wrap mb-10 mt-6">
                    {product.buyNowSection.processingParams.map(p => (
                      <span key={p} className="text-xs font-bold uppercase tracking-widest text-orange-400 bg-orange-500/10 px-3 py-1 rounded">
                        {p}
                      </span>
                    ))}
                  </div>

                  <button style={{ backgroundColor: product.themeColor }} className="text-black px-12 py-5 rounded-full font-black text-xl hover:scale-105 transition-transform shadow-[0_10px_30px_rgba(255,165,0,0.3)] w-full md:w-auto">
                    Add to Cart — Immediate Dispatch
                  </button>

                  <div className="mt-8 text-sm text-gray-500 max-w-md mx-auto space-y-2">
                    <p>🚚 {product.buyNowSection.deliveryPromise}</p>
                    <p>✨ {product.buyNowSection.returnPolicy}</p>
                  </div>
                </div>
              </motion.section>

              {/* Next Flavor Banner Button */}
              <motion.button
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 20 }}
                viewport={{ once: true }}
                onClick={handleNext}
                className="w-full mt-16 bg-white/5 hover:bg-white/10 border-y border-white/10 py-16 flex items-center justify-center gap-6 group transition-all"
              >
                <div className="text-left">
                  <div className="text-gray-500 uppercase tracking-widest text-sm mb-2 font-bold group-hover:text-white transition-colors">Experience Next Mode</div>
                  <div className="text-4xl md:text-5xl font-black">
                    {products[(currentIndex + 1) % products.length].name}
                  </div>
                </div>
                <div className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center text-3xl font-light translate-x-0 group-hover:translate-x-4 transition-transform shadow-lg">
                  &rarr;
                </div>
              </motion.button>

            </div>

            <Footer />
          </div>
        </motion.div>
      </AnimatePresence>
    </main>
  );
}
