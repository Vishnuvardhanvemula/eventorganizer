"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { useState, useEffect, useCallback } from "react";

interface Props {
  onCtaClick: () => void;
}

const heroSlides = [
  {
    src: "/assets/images/hero-ballroom.png",
    alt: "Luxury ballroom event with crystal chandeliers",
  },
  {
    src: "/assets/images/hero-energy.png",
    alt: "High-energy event with pyrotechnics and DJ",
  },
  {
    src: "/assets/images/hero-ceremony.png",
    alt: "Elegant outdoor ceremony with string lights",
  },
];

// Floating bokeh particles
function BokehParticles() {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    duration: Math.random() * 8 + 10,
    delay: Math.random() * 5,
    opacity: Math.random() * 0.3 + 0.05,
  }));

  return (
    <div className="absolute inset-0 z-[2] pointer-events-none overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: `radial-gradient(circle, rgba(201,168,76,${p.opacity}) 0%, transparent 70%)`,
            boxShadow: `0 0 ${p.size * 3}px rgba(201,168,76,${p.opacity * 0.5})`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 15, -10, 0],
            opacity: [p.opacity, p.opacity * 1.8, p.opacity],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

// Horizontal line accent animation
function LineAccent() {
  return (
    <motion.div
      initial={{ width: 0, opacity: 0 }}
      animate={{ width: 80, opacity: 1 }}
      transition={{ duration: 1.6, delay: 1.2, ease: [0.6, 0.05, -0.01, 0.9] }}
      className="h-[1px] bg-gradient-to-r from-[#C9A84C] to-transparent"
    />
  );
}

export function HeroSection({ onCtaClick }: Props) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  }, []);

  useEffect(() => {
    if (isHovering) return;
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, [nextSlide, isHovering]);

  return (
    <section
      className="relative w-full h-[100dvh] flex items-end overflow-hidden bg-black"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* === BACKGROUND IMAGE CAROUSEL === */}
      <AnimatePresence mode="sync">
        <motion.div
          key={currentSlide}
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 1.05, opacity: 0 }}
          transition={{ duration: 2, ease: [0.6, 0.05, -0.01, 0.9] }}
          className="absolute inset-0 z-0"
        >
          <Image
            src={heroSlides[currentSlide].src}
            alt={heroSlides[currentSlide].alt}
            fill
            className="object-cover object-center"
            priority={currentSlide === 0}
            quality={90}
            sizes="100vw"
          />
        </motion.div>
      </AnimatePresence>

      {/* === CINEMATIC OVERLAYS === */}

      {/* Primary gradient: deep vignette from bottom & left */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-black via-black/60 to-transparent" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-black/80 via-black/30 to-transparent" />

      {/* Top fade for navbar blend */}
      <div className="absolute top-0 left-0 right-0 h-40 z-[1] bg-gradient-to-b from-black/70 to-transparent" />

      {/* Subtle gold tint overlay */}
      <div className="absolute inset-0 z-[1] bg-[#C9A84C]/[0.03] mix-blend-overlay" />

      {/* Film grain texture overlay */}
      <div className="absolute inset-0 z-[3] pointer-events-none opacity-[0.04] mix-blend-overlay bg-[url('data:image/svg+xml,%3Csvg%20viewBox%3D%220%200%20200%20200%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cfilter%20id%3D%22n%22%3E%3CfeTurbulence%20type%3D%22fractalNoise%22%20baseFrequency%3D%220.9%22%20numOctaves%3D%224%22%20stitchTiles%3D%22stitch%22%2F%3E%3C%2Ffilter%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20filter%3D%22url(%23n)%22%2F%3E%3C%2Fsvg%3E')]" />

      {/* === FLOATING BOKEH PARTICLES === */}
      <BokehParticles />

      {/* === MAIN CONTENT === */}
      <div className="relative z-10 w-full max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20 pb-16 md:pb-24 lg:pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">

          {/* LEFT COLUMN: Editorial text block */}
          <div className="lg:col-span-7 xl:col-span-6 flex flex-col gap-6">

            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
              className="flex items-center gap-4"
            >
              <LineAccent />
              <span className="font-sans text-[10px] md:text-xs tracking-[0.4em] uppercase text-[#C9A84C] font-medium">
                Event Production
              </span>
            </motion.div>

            {/* Headline */}
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.4, delay: 0.6, ease: [0.6, 0.05, -0.01, 0.9] }}
                className="font-serif text-[clamp(2.8rem,8vw,7rem)] leading-[0.95] tracking-[-0.02em] text-white"
              >
                Moments
              </motion.h1>
            </div>
            <div className="overflow-hidden -mt-3">
              <motion.h1
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.4, delay: 0.75, ease: [0.6, 0.05, -0.01, 0.9] }}
                className="font-serif text-[clamp(2.8rem,8vw,7rem)] leading-[0.95] tracking-[-0.02em] text-white/90 italic font-light"
              >
                Engineered.
              </motion.h1>
            </div>

            {/* Body */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 1.1, ease: "easeOut" }}
              className="font-sans text-white/55 text-sm md:text-base lg:text-lg leading-relaxed max-w-md mt-2"
            >
              We don&apos;t just plan events — we architect entire atmospheres. 
              Sound, light, design, and energy; obsessively crafted into one 
              seamless, unforgettable night.
            </motion.p>

            {/* CTA Row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.4, ease: "easeOut" }}
              className="flex flex-col sm:flex-row items-start gap-4 mt-4"
            >
              {/* Primary CTA */}
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={onCtaClick}
                className="group relative font-sans text-[10px] md:text-xs tracking-[0.25em] uppercase bg-[#C9A84C] text-black px-8 md:px-10 py-4 md:py-5 overflow-hidden transition-all duration-500 hover:shadow-[0_8px_40px_rgba(201,168,76,0.3)]"
              >
                <span className="relative z-10 font-semibold">Build Your Night</span>
                <motion.div
                  className="absolute inset-0 bg-white/20"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                />
              </motion.button>

              {/* Secondary CTA */}
              <motion.button
                whileHover={{ scale: 1.02, borderColor: "rgba(201,168,76,0.5)" }}
                whileTap={{ scale: 0.98 }}
                onClick={onCtaClick}
                className="font-sans text-[10px] md:text-xs tracking-[0.25em] uppercase text-white/70 border border-white/15 backdrop-blur-sm px-8 md:px-10 py-4 md:py-5 hover:text-white hover:bg-white/5 transition-all duration-300"
              >
                View Portfolio
              </motion.button>
            </motion.div>
          </div>

          {/* RIGHT COLUMN: Service pillars + slide indicator */}
          <div className="lg:col-span-5 xl:col-span-6 flex flex-col items-end gap-10">

            {/* Service categories — editorial stacked */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8, duration: 1 }}
              className="hidden lg:flex flex-col items-end gap-5"
            >
              {[
                { label: "Sound Design", num: "01" },
                { label: "Lighting Architecture", num: "02" },
                { label: "Live Performance", num: "03" },
                { label: "Visual Storytelling", num: "04" },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 2 + i * 0.15, duration: 0.8, ease: "easeOut" }}
                  className="flex items-center gap-4 group cursor-default"
                >
                  <span className="font-sans text-[11px] tracking-[0.2em] uppercase text-white/40 group-hover:text-white/70 transition-colors duration-500">
                    {item.label}
                  </span>
                  <span className="w-8 h-[1px] bg-white/10 group-hover:bg-[#C9A84C]/40 group-hover:w-12 transition-all duration-500" />
                  <span className="font-sans text-[10px] text-white/20 tabular-nums group-hover:text-[#C9A84C]/50 transition-colors duration-500">
                    {item.num}
                  </span>
                </motion.div>
              ))}
            </motion.div>

            {/* Slide progress indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.2, duration: 1 }}
              className="flex items-center gap-3"
            >
              {heroSlides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  className="relative group flex items-center"
                  aria-label={`Go to slide ${i + 1}`}
                >
                  <div
                    className={`h-[2px] transition-all duration-700 ease-[cubic-bezier(0.6,0.05,-0.01,0.9)] ${
                      i === currentSlide
                        ? "w-10 bg-[#C9A84C]"
                        : "w-4 bg-white/20 group-hover:bg-white/40 group-hover:w-6"
                    }`}
                  />
                </button>
              ))}
              <span className="ml-3 font-sans text-[10px] tabular-nums text-white/30 tracking-widest">
                {String(currentSlide + 1).padStart(2, "0")} / {String(heroSlides.length).padStart(2, "0")}
              </span>
            </motion.div>
          </div>
        </div>
      </div>

      {/* === SCROLL INDICATOR === */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10 cursor-pointer"
        onClick={() =>
          window.scrollTo({ top: window.innerHeight, behavior: "smooth" })
        }
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="font-sans text-[9px] tracking-[0.3em] uppercase text-white/30">
            Scroll
          </span>
          <ChevronDown size={14} className="text-white/30" />
        </motion.div>
      </motion.div>

      {/* === BOTTOM BORDER ACCENT === */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] z-10 bg-gradient-to-r from-transparent via-[#C9A84C]/20 to-transparent" />
    </section>
  );
}
