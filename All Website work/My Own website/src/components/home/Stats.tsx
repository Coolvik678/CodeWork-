"use client";

import React, { useState, useEffect, useRef } from "react";
import { useInView } from "framer-motion";

interface StatItemProps {
  label: string;
  targetValue: number;
  suffix?: string;
  prefix?: string;
  decimal?: boolean;
}

const StatCounter = ({ label, targetValue, suffix = "", prefix = "", decimal = false }: StatItemProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = targetValue;
      const duration = 2000; // 2 seconds
      const incrementTime = 20;
      const totalSteps = duration / incrementTime;
      const stepValue = end / totalSteps;

      const counter = setInterval(() => {
        start += stepValue;
        if (start >= end) {
          clearInterval(counter);
          setCount(end);
        } else {
          setCount(start);
        }
      }, incrementTime);

      return () => clearInterval(counter);
    }
  }, [isInView, targetValue]);

  return (
    <div ref={ref} className="text-center p-6 bg-white rounded-2xl shadow-sm border border-[#E8F8F5] transition-transform hover:-translate-y-1">
      <div className="text-4xl lg:text-5xl font-heading font-extrabold text-[#0D9488] mb-2">
        {prefix}
        {decimal ? count.toFixed(1) : Math.floor(count)}
        {suffix}
      </div>
      <div className="text-gray-700 font-medium">{label}</div>
    </div>
  );
};

export default function Stats() {
  const [dynamicRating, setDynamicRating] = useState(4.9);

  useEffect(() => {
    const stored = localStorage.getItem("pixelcraft_reviews");
    if (stored) {
      try {
        const reviews = JSON.parse(stored);
        if (reviews.length > 0) {
          const sum = reviews.reduce((acc: number, r: any) => acc + r.rating, 0);
          const avg = ((4.9 * 3 + sum) / (3 + reviews.length));
          setDynamicRating(avg);
        }
      } catch (e) {
        console.error("Failed to parse reviews", e);
      }
    }
  }, []);

  return (
    <section className="py-20 bg-gradient-to-br from-[#F0FDFA] to-[#EBF5FB] relative">
      <div className="container mx-auto px-6 lg:px-12 relative z-20 w-full max-w-7xl">
        {/* Enforced 2x2 grid on mobile, 4 columns on desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10">
          <StatCounter label="Websites Delivered" targetValue={5} suffix="+" />
          <StatCounter label="Happy Clients" targetValue={3} suffix="+" />
          <StatCounter label="On-Time Delivery" targetValue={100} suffix="%" />
          <StatCounter label="Average Rating" targetValue={dynamicRating} suffix="★" decimal={true} />
        </div>
      </div>
    </section>
  );
}
