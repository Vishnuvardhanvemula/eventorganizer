"use client";

import { motion } from "framer-motion";
import { Speaker, MonitorPlay, Sun, Box } from "lucide-react";

export function ServicesSection() {
  const services = [
    {
      title: "Audio Production",
      desc: "Premium speaker systems, pristine wireless mic channels, and club-standard DJ setups for a flawless sonic experience.",
      icon: Speaker,
      num: "01"
    },
    {
      title: "LED Video Walls",
      desc: "Custom animated visuals, monograms, and elegant high-resolution LED backdrops that transform any space.",
      icon: MonitorPlay,
      num: "02"
    },
    {
      title: "Stage Lighting",
      desc: "Warm architectural uplighting and programmed intelligent fixtures to set the exact mood your event demands.",
      icon: Sun,
      num: "03"
    },
    {
      title: "Atmosphere & Effects",
      desc: "Cold sparks, seamless custom dance floors, and immersive environmental design that leaves guests breathless.",
      icon: Box,
      num: "04"
    }
  ];

  return (
    <section className="w-full py-32 bg-[var(--color-bg-secondary)] text-[var(--color-text-primary)] overflow-hidden relative">
      {/* Accent line at top */}
      <div className="absolute top-0 right-0 w-1/3 h-[1px] bg-gradient-to-l from-[#C9A84C]/40 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 gap-8">
          <div className="max-w-xl">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="font-sans text-xs tracking-[0.3em] uppercase text-[var(--color-gold-muted)] mb-4 font-medium"
            >
              The Arsenal
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-serif text-4xl md:text-5xl text-[var(--color-text-primary)] leading-tight"
            >
              Every element of your <br className="hidden md:block" />
              production in one place.
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full md:w-auto text-left md:text-right font-sans text-[var(--color-text-muted)] text-sm max-w-sm"
          >
            We don&apos;t outsource. Every piece of premium equipment and technician is in-house for complete quality control.
          </motion.div>
        </div>

        {/* Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: i * 0.12 }}
              className="flex flex-col items-start p-8 rounded-xl bg-[var(--color-bg-primary)] border border-[var(--color-text-primary)]/8 shadow-[0_4px_24px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_40px_rgba(201,168,76,0.1)] transition-all duration-500 transform hover:-translate-y-2 relative group"
            >
              {/* Gold left accent on hover */}
              <div className="absolute -left-[1px] top-8 bottom-8 w-[2px] bg-gradient-to-b from-[#C9A84C]/0 via-[#C9A84C] to-[#C9A84C]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Number watermark */}
              <span className="absolute top-6 right-6 font-sans text-[10px] tracking-[0.2em] text-[var(--color-text-muted)]/40 tabular-nums">
                {service.num}
              </span>
              
              {/* Icon */}
              <div className="w-14 h-14 rounded-xl bg-[#C9A84C]/8 border border-[#C9A84C]/15 flex items-center justify-center mb-8 shrink-0 relative overflow-hidden group-hover:bg-[#C9A84C]/12 group-hover:border-[#C9A84C]/30 transition-colors duration-500">
                <service.icon size={22} className="text-[#C9A84C] relative z-10" strokeWidth={1.5} />
              </div>
              
              {/* Title */}
              <h3 className="font-serif text-2xl text-[var(--color-text-primary)] mb-4">{service.title}</h3>

              {/* Description */}
              <p className="font-sans text-[var(--color-text-muted)] text-[15px] leading-relaxed">{service.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
