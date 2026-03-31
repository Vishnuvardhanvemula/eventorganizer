"use client";

import { motion, Variants } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface Props {
  onCtaClick: () => void;
}

export function CinematicHero({ onCtaClick }: Props) {
  // Animation variables
  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.4 }
    }
  };

  const item: Variants = {
    hidden: { y: "150%", opacity: 0, rotate: 2 },
    show: { y: "0%", opacity: 1, rotate: 0, transition: { duration: 1.4, ease: [0.6, 0.05, -0.01, 0.9] } }
  };

  return (
    <section className="relative w-full h-[100svh] overflow-hidden bg-[#0A0A0A] flex flex-col justify-end pb-[10vh] px-6 md:px-16">
      {/* Immersive Background Image */}
      <motion.div
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.4 }}
        transition={{ duration: 3, ease: "easeOut" }}
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=100&w=2500')"
        }}
      />
      
      {/* 35mm Film Grain Overlay */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Heavy Cinematic Gradient */}
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/50 to-transparent" />
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#0A0A0A]/90 via-transparent to-transparent" />

      {/* Content Container */}
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 w-full max-w-7xl mx-auto"
      >
        <div className="overflow-hidden pb-2 mb-6 md:mb-10">
          <motion.h2 variants={item} className="font-sans text-[10px] md:text-sm tracking-[0.4em] uppercase text-[var(--color-gold)] font-medium flex items-center gap-4">
            <span className="w-8 h-[1px] bg-[var(--color-gold)]"></span>
            Immersive Event Production
          </motion.h2>
        </div>

        <div className="overflow-hidden pb-4 -mb-4">
          <motion.h1 
            variants={item}
            className="font-serif text-[4rem] md:text-8xl lg:text-[10rem] text-[#F3F3F3] leading-[0.85] tracking-tighter"
          >
            A night of <br />
            <em className="not-italic text-[var(--color-gold)] drop-shadow-[0_0_30px_rgba(201,168,76,0.3)]">visceral luxury.</em>
          </motion.h1>
        </div>

        <div className="overflow-hidden pb-4 pt-2 -mt-2 mt-12 mb-12 max-w-xl">
          <motion.p variants={item} className="font-sans text-[#A0A0A0] text-base md:text-xl leading-relaxed">
            We don't just build stages. We engineer flawless emotional environments. Let us handle the pressure; you experience the magic.
          </motion.p>
        </div>

        <motion.div variants={item} className="overflow-hidden inline-block pb-2 -mb-2">
          <button 
            onClick={onCtaClick}
            className="relative font-sans text-[10px] md:text-sm tracking-[0.25em] uppercase text-[#F3F3F3] font-semibold border border-[#F3F3F3]/40 px-12 md:px-14 py-5 md:py-6 overflow-hidden group hover:border-[#C9A84C] transition-colors duration-700 ease-out"
          >
            <span className="relative z-10 transition-colors duration-500 group-hover:text-[#0A0A0A]">Begin Consultation</span>
            <div className="absolute inset-0 bg-[#C9A84C] transform -translate-x-[101%] group-hover:translate-x-0 transition-transform duration-700 ease-[0.8,0,0.2,1] z-0" />
          </button>
        </motion.div>
      </motion.div>

      {/* Bottom anchors (Scroll indicator) */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 right-6 md:right-16 flex flex-col items-end gap-3 z-10 cursor-pointer group"
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: "smooth" })}
      >
        <span className="font-sans text-[9px] md:text-[10px] tracking-[0.2em] uppercase text-[#666666] group-hover:text-[var(--color-gold)] transition-colors duration-300">
          Enter The Void
        </span>
        <ChevronDown size={18} className="text-[#666666] group-hover:text-[var(--color-gold)] animate-bounce transition-colors duration-300" strokeWidth={1.5} />
      </motion.div>
    </section>
  );
}
