"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScroll({ children }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2, // স্ক্রোল কতটা সময় ধরে মসৃণ হবে
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // প্রিমিয়াম ফিজিক্স
      smoothWheel: true,
      wheelMultiplier: 1, // মাউস হুইলের গতি
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
