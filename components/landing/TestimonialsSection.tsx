"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

export function TestimonialsSection() {
  const testimonials = [
    {
      quote: "The team transformed our venue into a masterpiece — seamlessly synced to our run of show. Flawless execution from the first dance to the last song.",
      author: "Sarah J.",
      event: "High-End Wedding",
      stars: 5,
    },
    {
      quote: "We didn't just want a DJ, we wanted a club environment. The lighting, sparklers, and sound blew our guests away. Best birthday I've ever had.",
      author: "Michael & Elena",
      event: "Private Birthday",
      stars: 5,
    },
    {
      quote: "Our annual gala needed flawless A/V for 800 guests. RCB delivered concert-grade sound, a stunning LED backdrop, and zero technical issues.",
      author: "David Chen",
      event: "Corporate Gala",
      stars: 5,
    },
    {
      quote: "From the custom monogram to the intelligent lighting fixtures, every single detail was breathtaking. Our quinceañera was truly unforgettable.",
      author: "The Rivera Family",
      event: "Sweet 16 / Quinceañera",
      stars: 5,
    }
  ];

  return (
    <section className="relative w-full py-32 bg-[#0A0A0A] overflow-hidden">
      {/* Accent line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#C9A84C]/30 to-transparent" />

      {/* Subtle ambient glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(201,168,76,0.04)_0%,transparent_60%)]" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="font-sans text-xs tracking-[0.3em] uppercase text-[#C9A84C] mb-4"
          >
            Client Stories
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#FCFAF5] tracking-tight"
          >
            The final review <br className="hidden md:block" />
            is all that matters.
          </motion.h2>
        </div>

        {/* 2x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: i * 0.15, ease: "easeOut" }}
              className="flex flex-col p-8 md:p-10 rounded-xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm relative group hover:bg-white/[0.05] hover:border-[#C9A84C]/15 transition-all duration-500"
            >
              {/* Quotation mark */}
              <div className="text-[#C9A84C]/20 font-serif text-7xl leading-none absolute top-4 left-7 select-none">
                &ldquo;
              </div>

              {/* Stars */}
              <div className="flex items-center gap-1 mb-6 relative z-10">
                {Array.from({ length: t.stars }).map((_, si) => (
                  <Star key={si} size={14} className="text-[#C9A84C] fill-[#C9A84C]" />
                ))}
              </div>

              {/* Quote */}
              <p className="font-sans text-[#FCFAF5]/80 text-base md:text-lg leading-relaxed mb-8 flex-1 z-10">
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Attribution */}
              <div className="flex flex-col border-t border-white/[0.08] pt-6">
                <span className="font-sans text-[11px] tracking-[0.2em] uppercase text-[#FCFAF5] font-medium mb-1">
                  {t.author}
                </span>
                <span className="font-sans text-[10px] tracking-[0.15em] uppercase text-[#C9A84C]/70">
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
