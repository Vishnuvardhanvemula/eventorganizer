"use client";

import { motion, AnimatePresence } from "framer-motion";
import { EventType, events } from "../data/events";
import { useState } from "react";

interface Props {
  onSelect: (event: EventType) => void;
  isExiting: boolean;
  selectedEvent: EventType | null;
}

export function HeroSequence({ onSelect, isExiting, selectedEvent }: Props) {
  const [hoveredEvent, setHoveredEvent] = useState<EventType | null>(null);

  const keys = Object.keys(events) as EventType[];

  return (
    <div className="fixed inset-0 w-full flex flex-col items-center justify-center p-8 bg-[var(--color-bg-secondary)] z-0 pointer-events-none">
      <div className="pointer-events-auto flex flex-col items-center z-10">
        <AnimatePresence>
          {!isExiting && (
            <motion.p
              key="hero-title"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 1.5, ease: [0.6, 0.05, -0.01, 0.9] }}
              className="font-serif text-2xl md:text-3xl lg:text-4xl text-[var(--color-text-primary)] mb-20 text-center"
            >
              Every great night starts with one decision.
            </motion.p>
          )}
        </AnimatePresence>

        <div className="flex flex-col md:flex-row items-center justify-center gap-x-16 gap-y-10 relative">
          <AnimatePresence>
            {keys.map((key, i) => {
              const isSelected = selectedEvent === key;
              const isHidden = isExiting && !isSelected;

              if (isHidden) return null;

              return (
                <div
                  key={key}
                  className="relative flex items-center justify-center"
                  onMouseEnter={() => setHoveredEvent(key)}
                  onMouseLeave={() => setHoveredEvent(null)}
                >
                  {!isExiting && hoveredEvent === key && (
                    <motion.svg
                      layoutId="hover-bloom"
                      className="absolute w-40 h-40 pointer-events-none"
                      viewBox="0 0 100 100"
                    >
                      {/* Simple abstract ink draw loop */}
                      <motion.path
                        d="M30 50 Q50 30 70 50 T30 50 M50 30 Q70 70 50 70 T50 30"
                        fill="none"
                        stroke="#C9A84C"
                        strokeWidth="0.5"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 0.4 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.2, ease: "easeInOut" }}
                      />
                    </motion.svg>
                  )}
                  <motion.button
                    layoutId={`title-layout-${key}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={!isSelected ? { opacity: 0, filter: "blur(4px)" } : undefined}
                    transition={{ 
                      delay: isExiting ? 0 : 1 + i * 0.2, 
                      duration: isExiting ? 0.4 : 1,
                      ease: [0.6, 0.05, -0.01, 0.9] 
                    }}
                    onClick={() => onSelect(key)}
                    className="font-sans text-lg md:text-[22px] uppercase tracking-[0.25em] text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors z-10 relative cursor-pointer"
                  >
                    {events[key].label}
                  </motion.button>
                </div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
