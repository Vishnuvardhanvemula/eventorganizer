"use client";

import { motion } from "framer-motion";
import { EventType, events } from "../../data/events";

interface Props {
  onSelectEvent: (event: EventType) => void;
  onFromScratchClick: () => void;
}

export function EventShowcase({ onSelectEvent, onFromScratchClick }: Props) {
  const keys = Object.keys(events) as EventType[];

  return (
    <section className="relative w-full py-32 bg-[var(--color-bg-secondary)] text-[var(--color-text-primary)] border-t border-[var(--color-gold)]/20">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-20">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="font-sans text-xs tracking-[0.3em] uppercase text-[var(--color-gold-muted)] mb-4"
          >
            Choose Your Night
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-serif text-4xl md:text-5xl lg:text-6xl text-[var(--color-text-primary)] tracking-tight"
          >
            Tailored Experiences
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {keys.map((key, i) => {
            const ev = events[key];
            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: [0.6, 0.05, -0.01, 0.9] }}
                onClick={() => onSelectEvent(key)}
                className="group relative flex flex-col items-start justify-end min-h-[240px] md:min-h-[300px] p-6 md:p-8 bg-[var(--color-bg-primary)] rounded-xl cursor-pointer overflow-hidden border border-[#C9A84C]/10 shadow-[0_20px_40px_rgba(201,168,76,0.03)] hover:shadow-[0_20px_40px_rgba(201,168,76,0.08)] hover:-translate-y-1 transition-all duration-500"
              >
                {/* Subtle gradient background on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#FCFAF5]/80 to-transparent opacity-0 group-hover:opacity-10 transition-opacity duration-500 z-0" />
                
                {/* Visual Image/Pattern Placeholder */}
                <div className="absolute top-6 right-6 text-[var(--color-gold)] opacity-5 group-hover:opacity-10 transition-opacity duration-500 z-0">
                  <span className="font-serif text-8xl md:text-9xl leading-none">{ev.label.charAt(0)}</span>
                </div>

                <div className="relative z-10 w-full transform transition-transform duration-500 group-hover:-translate-y-1 bg-[var(--color-bg-secondary)]/60 backdrop-blur-sm p-6 rounded-lg border border-[var(--color-border)] shadow-sm">
                  <p className="font-sans text-[10px] md:text-[11px] tracking-[0.25em] uppercase text-[var(--color-gold-muted)] mb-3">
                    Explore Production
                  </p>
                  <h3 className="font-serif text-3xl md:text-4xl text-[var(--color-text-primary)] mb-2">{ev.label}</h3>
                  <p className="font-sans text-[var(--color-text-muted)] text-sm md:text-base">{ev.headline}</p>
                </div>

                {/* Animated bottom border instead of full background change */}
                <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-[var(--color-gold)] transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-700 ease-[0.6,0.05,-0.01,0.9]" />
              </motion.div>
            );
          })}
        </div>
        
        <div className="mt-16 text-center">
          <button 
            onClick={onFromScratchClick}
            className="font-sans text-xs tracking-[0.2em] uppercase text-[var(--color-text-muted)] hover:text-[var(--color-gold)] transition-colors inline-block relative group"
          >
            Or Build From Scratch →
            <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-[var(--color-gold)] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
          </button>
        </div>
      </div>
    </section>
  );
}
