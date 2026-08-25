"use client";

import React, { useState } from "react";
import { Phone, MessageCircle, MapPin, Clock } from "lucide-react";
import { motion } from "framer-motion";

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    try {
      await fetch("https://formsubmit.co/ajax/myovik@gmail.com", {
        method: "POST",
        body: formData,
      });
      
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 5000);
      form.reset();
    } catch (error) {
      console.error("Form submission error:", error);
      setIsSubmitting(false);
      alert("Something went wrong joining the form. Please try again.");
    }
  };

  return (
    <section id="contact" className="relative py-24 bg-gradient-to-br from-[#F0FDFA] to-[#EBF5FB] overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12 w-full max-w-7xl relative z-20">
        
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 flex flex-col lg:flex-row">
          
          {/* Left Side - Info */}
          <div className="lg:w-2/5 bg-[#0D9488] text-white p-10 lg:p-14 flex flex-col justify-between">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, type: "tween" }}
            >
              <h2 className="text-3xl lg:text-4xl font-heading font-bold mb-4">
                Let's Build Something Great
              </h2>
              <p className="text-teal-100 text-lg mb-12">
                Ready to transform your online presence? Get in touch.
              </p>

              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-teal-50 mb-1">Call Us Direct</h4>
                    <a href="tel:+919691504861" className="text-xl font-bold hover:text-white transition-colors block">
                      +91 96915 04861
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-teal-50 mb-1">WhatsApp Fast Track</h4>
                    <a 
                      href="https://wa.me/919691504861" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-[#25D366] px-4 py-2 rounded-lg font-bold hover:bg-[#1DA851] transition-colors mt-1 text-sm shadow-md"
                    >
                      Chat on WhatsApp →
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-teal-50 mb-1">Operating Hours</h4>
                    <p className="text-lg font-medium">Mon-Sat, 10 AM - 8 PM IST</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-teal-50 mb-1">Location</h4>
                    <p className="text-lg font-medium">Indore, Madhya Pradesh, India</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Side - Form */}
          <div className="lg:w-3/5 p-10 lg:p-14 bg-white relative">
            <h3 className="text-2xl font-heading font-bold text-gray-900 mb-8">Send an Inquiry</h3>
            
            {isSuccess ? (
              <div className="absolute inset-0 bg-white/95 backdrop-blur-sm z-10 flex flex-col items-center justify-center text-center p-8">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">Message Received!</h3>
                <p className="text-gray-600">We will get back to you within 24 hours.</p>
              </div>
            ) : null}

            <form onSubmit={handleSubmit} className="space-y-6">
              <input type="hidden" name="_subject" value="New Website Inquiry: PixelCraft Studios" />
              <input type="hidden" name="_template" value="table" />
              <input type="hidden" name="_captcha" value="false" />
              <input type="text" name="_honey" style={{ display: 'none' }} />

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
                  <input type="text" name="name" required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#0D9488] outline-none" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <input type="tel" name="phone" required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#0D9488] outline-none" placeholder="+91 90000 00000" />
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Business Type</label>
                  <input type="text" name="businessType" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#0D9488] outline-none" placeholder="E.g. Clinic, Ecommerce, Agency" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                  <input type="text" name="city" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#0D9488] outline-none" placeholder="E.g. Mumbai" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Estimated Budget</label>
                <select name="budget" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#0D9488] outline-none bg-white">
                  <option>₹10,000 - ₹20,000</option>
                  <option>₹20,000 - ₹50,000</option>
                  <option>₹50,000+</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea name="message" required rows={4} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#0D9488] outline-none resize-none" placeholder="Tell us about your project requirements..."></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-[#0D9488] text-white rounded-xl font-bold text-lg hover:bg-[#0F766E] transition-colors shadow-lg disabled:opacity-70"
              >
                {isSubmitting ? "Sending..." : "Send Inquiry →"}
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
