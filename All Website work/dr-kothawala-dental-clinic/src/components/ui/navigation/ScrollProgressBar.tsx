"use client";

import React, { useEffect, useState } from "react";

export function ScrollProgressBar() {
  const [scrollPercentage, setScrollPercentage] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollPercentage((window.scrollY / totalHeight) * 100);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-[#070A0F]">
      <div
        className="h-full bg-gradient-to-r from-[#E5C158] via-cyan-400 to-emerald-400 transition-all duration-150"
        style={{ width: `${scrollPercentage}%` }}
      />
    </div>
  );
}
