"use client";

import { motion } from "framer-motion";
import * as LucideIcons from "lucide-react";
import React from "react";

interface Props {
  title: string;
  desc: string;
  icon: string;
  index: number;
}

export function ServicePanel({ title, desc, icon, index }: Props) {
  // Dynamically resolve the lucide icon component
  const IconComponent = (LucideIcons as any)[icon] || LucideIcons.Circle;

  return (
    <motion.div
      initial={{ opacity: 0, y: 70, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: false, margin: "-150px 0px" }}
      transition={{ duration: 1.2, delay: index * 0.1, ease: [0.6, 0.05, -0.01, 0.9] }}
      className="p-8 md:p-12 w-full max-w-xl backdrop-blur-xl bg-[var(--color-bg-secondary)]/40 border border-white/60 shadow-[0_32px_64px_rgba(0,0,0,0.05)] rounded-2xl flex flex-col items-start text-left relative overflow-hidden group"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-white/20 to-transparent pointer-events-none transform transition-transform duration-1000 group-hover:scale-105" />
      
      {/* Glossy Icon Container */}
      <div className="w-14 h-14 rounded-2xl backdrop-blur-lg bg-[var(--color-bg-secondary)]/70 border border-[#C9A84C]/40 shadow-sm flex items-center justify-center mb-8 relative z-10 transition-transform duration-500 group-hover:-translate-y-1">
        <IconComponent size={24} className="text-[#C9A84C]" strokeWidth={1.5} />
      </div>

      <h4 className="font-serif text-2xl md:text-3xl mb-3 text-[var(--color-text-primary)] relative z-10 tracking-tight">{title}</h4>
      <p className="font-sans text-[var(--color-text-muted)] text-[15px] md:text-base leading-loose relative z-10">{desc}</p>
    </motion.div>
  );
}
