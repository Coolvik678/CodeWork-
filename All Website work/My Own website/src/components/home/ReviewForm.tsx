"use client";

import React, { useState, useEffect } from "react";
import { Star, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface Review {
  name: string;
  business: string;
  rating: number;
  text: string;
  date: string;
}

export default function ReviewForm() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    business: "",
    text: ""
  });

  // Load reviews from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("pixelcraft_reviews");
    if (stored) {
      try {
        setReviews(JSON.parse(stored));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rating || !formData.name || !formData.business || formData.text.length < 20) {
      alert("Please fill all fields and leave a review of at least 20 characters.");
      return;
    }

    setIsSubmitting(true);
    
    // Simulate network delay
    setTimeout(() => {
      const newReview: Review = {
        ...formData,
        rating,
        date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
      };
      
      const updatedReviews = [newReview, ...reviews];
      setReviews(updatedReviews);
      localStorage.setItem("pixelcraft_reviews", JSON.stringify(updatedReviews));
      
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: "", business: "", text: "" });
      setRating(0);

      // Reset success message after 5 seconds
      setTimeout(() => setIsSuccess(false), 5000);
    }, 1000);
  };

  return (
    <section className="relative py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12 relative z-20 w-full max-w-4xl">
        
        {/* Dynamic Reviews Display (Hidden if empty) */}
        {reviews.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-20"
          >
            <div className="text-center mb-10">
              <span className="text-primary font-semibold tracking-wider uppercase text-sm mb-2 block">Community Feedback</span>
              <h3 className="text-3xl font-heading font-bold text-gray-900">Recent Client Reviews</h3>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {reviews.map((review, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-surface-light p-6 rounded-2xl border border-gray-100 shadow-sm"
                >
                  <div className="flex gap-1 mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className={cn("w-4 h-4", star <= review.rating ? "fill-accent text-accent" : "text-gray-300")} />
                    ))}
                  </div>
                  <p className="text-gray-700 italic mb-4">"{review.text}"</p>
                  <div className="mt-auto border-t border-gray-100 pt-4">
                    <p className="font-heading font-bold text-gray-900">{review.name}</p>
                    <div className="flex justify-between items-center text-sm text-gray-500 mt-1">
                      <span>{review.business}</span>
                      <span>{review.date}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Review Submission Form */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="bg-white glass-card rounded-3xl p-8 lg:p-12 shadow-2xl premium-shadow border border-gray-100"
        >
          <div className="text-center mb-10">
            <h2 className="text-3xl lg:text-4xl font-heading font-bold text-gray-900 mb-4">
              Share Your Experience
            </h2>
            <p className="text-gray-600">
              Your feedback is absolutely critical to our growth. Let us know how we did!
            </p>
          </div>

          <AnimatePresence mode="wait">
            {isSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex flex-col items-center justify-center py-12 text-center"
              >
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank you!</h3>
                <p className="text-gray-600">Your review has been successfully submitted and helps us improve.</p>
              </motion.div>
            ) : (
              <motion.form 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit} 
                className="space-y-6 max-w-2xl mx-auto"
              >
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Your Business / City *</label>
                    <input
                      type="text"
                      required
                      value={formData.business}
                      onChange={(e) => setFormData({...formData, business: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                      placeholder="TechCorp, Mumbai"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Rating *</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="focus:outline-none transition-transform hover:scale-110"
                      >
                        <Star
                          className={cn(
                            "w-8 h-8 transition-colors",
                            (hoverRating || rating) >= star
                              ? "fill-accent text-accent"
                              : "text-gray-300"
                          )}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Your Review *</label>
                  <textarea
                    required
                    minLength={20}
                    rows={4}
                    value={formData.text}
                    onChange={(e) => setFormData({...formData, text: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none"
                    placeholder="Tell us about your experience... (min. 20 characters)"
                  ></textarea>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-6 py-3 bg-gray-900 text-white font-semibold flex items-center justify-center transition-all hover:bg-gray-800 disabled:opacity-70"
                    style={{ borderRadius: '8px' }}
                  >
                    {isSubmitting ? "Submitting..." : "Submit Review"}
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
