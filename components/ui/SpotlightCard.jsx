"use client";

import { useRef, useState } from "react";

export function SpotlightCard({ children, className = "" }) {
  const divRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className={`relative rounded-3xl p-[1.5px] transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${className}`}
    >
      {/* ১. বর্ডার গ্লো লেয়ার (বাইরের বর্ডারে আলো জ্বলবে) */}
      <div
        className="pointer-events-none absolute inset-0 rounded-3xl transition-opacity duration-300 -z-10"
        style={{
          opacity,
          background: `radial-gradient(300px circle at ${position.x}px ${position.y}px, #06b6d4, #3b82f6, transparent 70%)`,
        }}
      />

      {/* ২. সাধারণ ডিফল্ট হালকা বর্ডার (যখন হোভার নেই) */}
      <div className="absolute inset-0 rounded-3xl border border-slate-200/80 -z-20 pointer-events-none" />

      {/* ৩. ভেতরের আসল কার্ড (সাদা ব্যাকগ্রাউন্ড) */}
      <div className="relative w-full h-full bg-white rounded-[22px] overflow-hidden p-8 flex flex-col justify-between">
        {/* ভেতরের হালকা মাউস স্পটলাইট */}
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-300"
          style={{
            opacity,
            background: `radial-gradient(350px circle at ${position.x}px ${position.y}px, rgba(6, 182, 212, 0.08), transparent 60%)`,
          }}
        />
        {children}
      </div>
    </div>
  );
}
