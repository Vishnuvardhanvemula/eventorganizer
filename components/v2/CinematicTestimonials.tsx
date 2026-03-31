"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const testimonials = [
  {
    quote: "The team transformed our venue into a masterpiece perfectly synced to our run of show. Flawless execution.",
    author: "Sarah J.",
    event: "High-End Wedding",
    image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=100&w=2000"
  },
  {
    quote: "We didn't just want a DJ, we wanted a club environment. The lighting, sparklers, and sound blew our guests away.",
    author: "Michael & Elena",
    event: "Wedding Celebration",
    image: "https://images.unsplash.com/photo-1470229722913-7c090be5a524?q=100&w=2000"
  },
  {
    quote: "From the custom monogram to the intelligent architectural fixtures, every single detail was breathtaking.",
    author: "The Rivera Family",
    event: "Sweet 16 / Milestone",
    image: "https://images.unsplash.com/photo-1543888554-1bba8cffd6e9?q=100&w=2000"
  }
];

export function CinematicTestimonials() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 8000); // 8 second slow rotation
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full h-[85vh] bg-[#0A0A0A] overflow-hidden flex items-center justify-center border-t border-[#1A1A1A]">
      
      {/* Dynamic Cinematic Background Layer */}
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 0.25, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 3, ease: "easeInOut" }}
          className="absolute inset-0 bg-cover bg-center z-0 mix-blend-luminosity grayscale"
          style={{ backgroundImage: `url('${testimonials[index].image}')` }}
        />
      </AnimatePresence>
      
      {/* Pitch Black Masks */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-[#0A0A0A] z-0 opacity-90" />
      <div className="absolute inset-0 bg-[#0A0A0A]/70 z-0" />
      
      {/* 35mm Grain Overlay */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.06] pointer-events-none mix-blend-overlay"
        style={{
           backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Quote Container */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30, filter: "blur(5px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -30, filter: "blur(5px)" }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="flex flex-col items-center"
          >
            <div className="text-[#C9A84C] font-serif text-[4rem] md:text-[8rem] leading-none opacity-20 mb-8 md:-mb-4 select-none">
              &ldquo;
            </div>
            <h3 className="font-serif text-3xl md:text-5xl lg:text-6xl text-[#F3F3F3] leading-[1.2] tracking-tight mb-12 max-w-4xl drop-shadow-2xl">
              {testimonials[index].quote}
            </h3>
            
            <div className="flex flex-col items-center pt-8 relative">
               <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-[1px] bg-[#C9A84C]/60" />
               <p className="font-sans text-[10px] md:text-xs tracking-[0.3em] uppercase text-white font-medium mb-3">
                 {testimonials[index].author}
               </p>
               <p className="font-sans text-[9px] md:text-[10px] tracking-[0.2em] uppercase text-[#666666]">
                 {testimonials[index].event}
               </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Manual Navigation Bars */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-4 z-20">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`h-[1px] transition-all duration-700 ease-[0.8,0,0.2,1] ${
              i === index ? "w-12 bg-[#C9A84C]" : "w-4 bg-[#333333] hover:bg-white"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
