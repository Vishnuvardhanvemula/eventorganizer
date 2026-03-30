"use client";

import { motion } from "framer-motion";

export function TestimonialsSection() {
  const testimonials = [
    {
      quote: "The team transformed our venue into a masterpiece seamlessly perfectly synced to our run of show. Flawless execution.",
      author: "Sarah J.",
      event: "High-End Wedding",
    },
    {
      quote: "We didn't just want a DJ, we wanted a club environment. The lighting, sparklers, and sound blew our guests away.",
      author: "Michael & Elena",
      event: "Wedding Celebration",
    },
    {
      quote: "From the custom monogram to the intelligent lighting fixtures, every single detail was breathtaking.",
      author: "The Rivera Family",
      event: "Sweet 16 / Quinceañera",
    }
  ];

  return (
    <section className="relative w-full py-32 bg-[#FCFAF5] overflow-hidden border-t border-[#C9A84C]/10">
      <div className="absolute inset-0 bg-gradient-to-b from-white/0 via-[#C9A84C]/5 to-white/0 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="font-serif text-4xl md:text-5xl lg:text-6xl text-neutral-900 tracking-tight"
          >
            The final review <br className="hidden md:block" />
            is all that matters.
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: i * 0.2, ease: "easeOut" }}
              className="glass-panel-light flex flex-col p-8 md:p-10 rounded-2xl relative"
            >
              <div className="text-[var(--color-gold)] font-serif text-6xl leading-none absolute top-4 left-6 opacity-30">
                &ldquo;
              </div>
              <p className="font-sans text-neutral-700 text-lg leading-relaxed mb-8 flex-1 z-10 pt-4">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex flex-col border-t border-neutral-200/60 pt-6">
                <span className="font-sans text-[11px] tracking-[0.2em] uppercase text-neutral-900 font-medium mb-1">
                  {t.author}
                </span>
                <span className="font-sans text-[10px] tracking-[0.1em] uppercase text-[var(--color-gold-muted)]">
                  {t.event}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
