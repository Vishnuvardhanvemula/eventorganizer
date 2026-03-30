"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

interface Props {
  onBuildClick: () => void;
  isBuilderPhase?: boolean;
}

export function Navbar({ onBuildClick, isBuilderPhase = false }: Props) {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || isBuilderPhase
          ? "bg-[var(--color-bg-primary)]/80 backdrop-blur-xl border-b border-[#C9A84C]/10 py-4 shadow-[0_4px_30px_rgba(0,0,0,0.03)]"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-baseline gap-[2px] cursor-pointer" onClick={() => window.scrollTo(0, 0)}>
          <span className="font-serif text-2xl text-[var(--color-text-primary)] tracking-widest">R</span>
          <span className="font-serif text-2xl text-[var(--color-gold)]">C</span>
          <span className="font-serif text-2xl text-[var(--color-text-primary)] tracking-widest">B</span>
          <span className="font-sans text-[10px] tracking-[0.25em] uppercase text-[var(--color-text-muted)] ml-3 hidden md:block mt-1">
            Events & Productions
          </span>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4 md:gap-8">
          <a href="tel:+18005550199" className="hidden md:block font-sans text-xs tracking-[0.15em] uppercase text-[var(--color-text-muted)] hover:text-[var(--color-gold)] transition-colors">
            (800) 555-0199
          </a>
          
          {mounted && (
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-full text-[var(--color-text-muted)] hover:text-[var(--color-gold)] hover:bg-[var(--color-text-primary)]/5 transition-colors"
              aria-label="Toggle Dark Mode"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          )}

          {!isBuilderPhase && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onBuildClick}
              className="font-sans text-[10px] md:text-xs tracking-[0.2em] uppercase bg-[var(--color-gold)] text-white px-5 md:px-6 py-2.5 md:py-3 rounded hover:bg-[#b59540] transition-colors shadow-[0_8px_24px_rgba(201,168,76,0.2)]"
            >
              Get Proposal →
            </motion.button>
          )}
        </div>
      </div>
    </motion.nav>
  );
}
