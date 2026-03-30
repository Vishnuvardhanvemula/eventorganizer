"use client";

import { motion } from "framer-motion";
import { Speaker, MonitorPlay, Sun, Box } from "lucide-react";

export function ServicesSection() {
  const services = [
    {
      title: "Audio Production",
      desc: "Premium speaker systems, pristine wireless mic channels, and club-standard DJ setups for a flawless experience.",
      icon: Speaker
    },
    {
      title: "LED Video Walls",
      desc: "Custom animated visuals, monograms, and elegant high-resolution LED backdrops.",
      icon: MonitorPlay
    },
    {
      title: "Stage Lighting",
      desc: "Warm architectural uplighting and programmed intelligent fixtures to set the exact mood.",
      icon: Sun
    },
    {
      title: "Atmosphere & Effects",
      desc: "Cold sparks, seamless custom dance floors, and immersive environmental design.",
      icon: Box
    }
  ];

  return (
    <section className="w-full py-32 bg-[var(--color-bg-secondary)] text-[var(--color-text-primary)] overflow-hidden relative">
      <div className="absolute top-0 right-0 w-1/3 h-[1px] bg-gradient-to-l from-[#C9A84C]/40 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
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
            We don't outsource. Every piece of premium equipment and technician is in-house for complete quality control.
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-4 lg:gap-8">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: i * 0.15 }}
              className="flex flex-col items-start p-8 rounded-2xl bg-[var(--color-bg-primary)] border border-[#C9A84C]/15 shadow-[0_20px_40px_rgba(201,168,76,0.03)] hover:shadow-[0_20px_40px_rgba(201,168,76,0.08)] transition-all duration-300 transform hover:-translate-y-1 relative group"
            >
              <div className="absolute -left-[1px] top-8 bottom-8 w-[2px] bg-gradient-to-b from-[#C9A84C]/0 via-[#C9A84C] to-[#C9A84C]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="w-14 h-14 rounded-full bg-[var(--color-bg-secondary)] border border-[#C9A84C]/20 flex items-center justify-center mb-8 shrink-0 relative overflow-hidden shadow-sm">
                <div className="absolute inset-0 bg-[#C9A84C]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <service.icon size={22} className="text-[#C9A84C] relative z-10" strokeWidth={1.5} />
              </div>
              
              <h3 className="font-serif text-2xl text-[var(--color-text-primary)] mb-4">{service.title}</h3>
              <p className="font-sans text-[var(--color-text-muted)] text-[15px] leading-loose">{service.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
