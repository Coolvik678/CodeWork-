"use client";

import { useEffect, useRef } from "react";
import * as anime from "animejs";

export function useAnimePathDraw(selector: string, triggerOnScroll = true) {
  const animatedRef = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const animatePaths = () => {
      const elements = document.querySelectorAll(selector);
      if (!elements.length) return;

      elements.forEach((el) => {
        if (el instanceof SVGPathElement) {
          const pathLength = el.getTotalLength();
          el.style.strokeDasharray = `${pathLength}`;
          el.style.strokeDashoffset = `${pathLength}`;

          try {
            if (typeof anime === "function") {
              (anime as unknown as (opts: Record<string, unknown>) => void)({
                targets: el,
                strokeDashoffset: [pathLength, 0],
                duration: 2000,
                easing: "easeInOutSine",
              });
            }
          } catch {
            // Graceful fallback
          }
        }
      });
    };

    if (!triggerOnScroll) {
      animatePaths();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !animatedRef.current) {
            animatedRef.current = true;
            animatePaths();
          }
        });
      },
      { threshold: 0.2 }
    );

    const targetEl = document.querySelector(selector);
    if (targetEl) observer.observe(targetEl.parentElement || targetEl);

    return () => observer.disconnect();
  }, [selector, triggerOnScroll]);
}

export function useAnimeStagger(containerSelector: string, itemSelector: string) {
  useEffect(() => {
    const container = document.querySelector(containerSelector);
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            try {
              if (typeof anime === "function") {
                (anime as unknown as (opts: Record<string, unknown>) => void)({
                  targets: `${containerSelector} ${itemSelector}`,
                  translateY: [40, 0],
                  opacity: [0, 1],
                  easing: "easeOutQuad",
                  duration: 800,
                });
              }
            } catch {
              // Fallback
            }
            observer.disconnect();
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [containerSelector, itemSelector]);
}
