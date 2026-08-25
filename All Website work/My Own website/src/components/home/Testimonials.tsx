"use client";

import React from "react";
import { Quote, Star } from "lucide-react";
import { motion } from "framer-motion";

const testimonials = [
  {
    text: "We needed a professional website for our dental clinic and PixelCraft Studios delivered beyond our expectations. Our patient bookings have increased by 40% since launch.",
    author: "Dr. Meera Sharma",
    role: "Lead Dentist, Elite Dental Clinic",
    rating: 5,
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=200&auto=format&fit=crop"
  },
  {
    text: "The team understood our brand instantly. They designed a sleek, modern portfolio that truly represents our architectural firm. Highly recommended for their attention to detail.",
    author: "Rajesh Patel",
    role: "Founder, Apex Designs",
    rating: 4,
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format&fit=crop"
  },
  {
    text: "Fast, responsive, and incredibly easy to work with. They took our outdated site and turned it into a conversion machine. The ROI has been phenomenal.",
    author: "Priya Deshmukh",
    role: "Marketing Director, FreshBites",
    rating: 5,
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop"
  }
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="relative py-24 bg-surface-light overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none mix-blend-multiply"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2000&auto=format&fit=crop')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed"
        }}
      />

      <div className="container mx-auto px-6 lg:px-12 relative z-20 w-full max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-accent font-semibold tracking-wider uppercase text-sm mb-3 block">Testimonials</span>
          <h2 className="text-4xl lg:text-5xl font-heading font-bold text-gray-900 mb-6 tracking-tight">
            What Our Clients Say
          </h2>
          <p className="text-lg text-gray-600">
            Don't just take our word for it. Here's what business owners across India have to say about partnering with us.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              className="bg-white/80 glass-card p-8 rounded-2xl shadow-lg relative group transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-primary/30"
            >
              <Quote className="absolute top-6 right-6 w-12 h-12 text-gray-100 group-hover:text-primary/10 transition-colors duration-300" />
              
              <div className="flex gap-1 mb-6">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className={`w-5 h-5 ${star <= testimonial.rating ? "fill-accent text-accent" : "text-gray-300 fill-gray-300"}`} />
                ))}
              </div>
              
              <p className="text-gray-700 leading-relaxed italic mb-8 relative z-10">
                "{testimonial.text}"
              </p>
              
              <div className="flex items-center gap-4 mt-auto">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 ring-2 ring-primary/20">
                  <img src={testimonial.image} alt={testimonial.author} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-gray-900">{testimonial.author}</h4>
                  <p className="text-sm text-primary font-medium">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
