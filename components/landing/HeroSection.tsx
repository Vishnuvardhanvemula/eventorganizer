"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface Props {
  onCtaClick: () => void;
}

export function HeroSection({ onCtaClick }: Props) {
  return (
    <section className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden bg-[var(--color-bg-primary)] px-6">
      {/* Background radial gold bloom for light mode */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 70% 70% at 50% -20%, rgba(201,168,76,0.08) 0%, transparent 70%)"
        }}
      />

      <div className="z-10 flex flex-col items-center text-center max-w-3xl mt-12 relative">
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
          className="font-sans text-xs md:text-sm tracking-[0.35em] uppercase text-[var(--color-gold-muted)] mb-6 font-medium"
        >
          Weddings · Private Parties · Celebrations
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, scale: 0.95, filter: "blur(8px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.6, delay: 0.5, ease: [0.6, 0.05, -0.01, 0.9] }}
          className="font-serif text-5xl md:text-7xl lg:text-8xl text-neutral-900 leading-[1.05] tracking-tight mb-8"
        >
          Your night, <br className="hidden md:block" />
          <em className="not-italic text-[var(--color-gold)]">flawless.</em>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.9, ease: "easeOut" }}
          className="font-sans text-neutral-600 text-lg md:text-xl leading-relaxed max-w-xl mb-12"
        >
          Elegant audio, bespoke lighting, and premium DJs. One seamless team dedicated to your perfect celebration.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          transition={{ duration: 1.2, delay: 1.2, ease: "easeOut" }}
          onClick={onCtaClick}
          className="bg-[var(--color-gold)] text-white font-sans text-xs md:text-sm tracking-[0.25em] uppercase px-12 md:px-14 py-5 md:py-6 rounded shadow-[0_16px_40px_rgba(201,168,76,0.15)] hover:bg-[#b59540] transition-colors"
        >
          Build Your Stage
        </motion.button>
      </div>

      {/* Floating Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 animate-float cursor-pointer z-10"
        onClick={() => {
          window.scrollTo({
            top: window.innerHeight,
            behavior: "smooth"
          });
        }}
      >
        <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-neutral-400 font-medium">Discover</span>
        <ChevronDown size={16} className="text-[var(--color-gold)]/60" />
      </motion.div>
      
      {/* Bottom anchors */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="absolute bottom-8 w-full px-12 hidden md:flex items-center justify-between pointer-events-none"
      >
        {["Premium DJs", "Uplighting", "Dance Floors", "Visuals"].map((label) => (
          <span key={label} className="font-sans text-[11px] tracking-[0.2em] uppercase text-neutral-400 font-medium">
            {label}
          </span>
        ))}
      </motion.div>
    </section>
  );
}
