"use client";

import { motion } from "framer-motion";
import { EventType, events } from "../../data/events";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

interface Props {
  onSelectEvent: (event: EventType) => void;
  onFromScratchClick: () => void;
}

const cardImages: Record<EventType, string> = {
  wedding: "/assets/images/card-wedding.png",
  birthday: "/assets/images/card-birthday.png",
  corporate: "/assets/images/card-corporate.png",
  gala: "/assets/images/card-gala.png",
};

const cardAccents: Record<EventType, string> = {
  wedding: "from-[#C9A84C]/80",
  birthday: "from-purple-500/70",
  corporate: "from-blue-600/70",
  gala: "from-rose-700/70",
};

export function EventShowcase({ onSelectEvent, onFromScratchClick }: Props) {
  const keys = Object.keys(events) as EventType[];

  return (
    <section className="relative w-full py-32 bg-[var(--color-bg-secondary)] text-[var(--color-text-primary)]">
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#C9A84C]/30 to-transparent" />

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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
          {keys.map((key, i) => {
            const ev = events[key];
            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: i * 0.12, ease: [0.6, 0.05, -0.01, 0.9] }}
                onClick={() => onSelectEvent(key)}
                className="group relative min-h-[320px] md:min-h-[380px] rounded-lg cursor-pointer overflow-hidden"
              >
                {/* Background Image */}
                <Image
                  src={cardImages[key]}
                  alt={ev.headline}
                  fill
                  className="object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />

                {/* Gradient overlay — gets darker on hover */}
                <div className={`absolute inset-0 bg-gradient-to-t ${cardAccents[key]} via-black/50 to-black/20 opacity-80 group-hover:opacity-90 transition-opacity duration-500`} />

                {/* Noise texture */}
                <div className="absolute inset-0 opacity-[0.06] mix-blend-overlay bg-[url('data:image/svg+xml,%3Csvg%20viewBox%3D%220%200%20200%20200%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cfilter%20id%3D%22n%22%3E%3CfeTurbulence%20type%3D%22fractalNoise%22%20baseFrequency%3D%220.9%22%20numOctaves%3D%224%22%20stitchTiles%3D%22stitch%22%2F%3E%3C%2Ffilter%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20filter%3D%22url(%23n)%22%2F%3E%3C%2Fsvg%3E')]" />

                {/* Content */}
                <div className="absolute inset-0 z-10 flex flex-col justify-end p-7 md:p-9">
                  {/* Top-right arrow */}
                  <div className="absolute top-6 right-6">
                    <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white/10 group-hover:border-white/40 transition-all duration-500">
                      <ArrowUpRight size={16} className="text-white/60 group-hover:text-white transition-colors duration-300" />
                    </div>
                  </div>

                  {/* Eyebrow */}
                  <p className="font-sans text-[10px] md:text-[11px] tracking-[0.3em] uppercase text-white/50 mb-3 group-hover:text-white/70 transition-colors duration-500">
                    Explore Production
                  </p>

                  {/* Title */}
                  <h3 className="font-serif text-3xl md:text-4xl text-white mb-2 transform group-hover:translate-x-2 transition-transform duration-500">
                    {ev.label}
                  </h3>

                  {/* Subtitle */}
                  <p className="font-sans text-white/60 text-sm md:text-base group-hover:text-white/80 transition-colors duration-500">
                    {ev.headline}
                  </p>

                  {/* Animated bottom border */}
                  <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#C9A84C] transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-700 ease-[cubic-bezier(0.6,0.05,-0.01,0.9)]" />
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-16 text-center"
        >
          <button
            onClick={onFromScratchClick}
            className="font-sans text-xs tracking-[0.2em] uppercase text-[var(--color-text-muted)] hover:text-[var(--color-gold)] transition-colors inline-block relative group"
          >
            Or Build From Scratch →
            <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-[var(--color-gold)] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
