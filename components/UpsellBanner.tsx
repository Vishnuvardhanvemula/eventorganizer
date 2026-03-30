"use client";

import { motion } from "framer-motion";
import { Plus } from "lucide-react";

interface UpsellType {
  title: string;
  subtitle: string;
}

interface Props {
  upsell: UpsellType;
  onAddOption?: () => void;
}

export function UpsellBanner({ upsell, onAddOption }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 70, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: false, margin: "-150px 0px" }}
      transition={{ duration: 1.2, ease: [0.6, 0.05, -0.01, 0.9] }}
      className="p-10 md:p-14 w-full max-w-3xl backdrop-blur-lg bg-[#FCFAF5]/40 border-t border-l border-[#C9A84C]/40 shadow-[0_32px_64px_rgba(201,168,76,0.06)] rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-12 text-left relative overflow-hidden group"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent pointer-events-none" />
      
      <div className="flex-1 flex flex-col items-start z-10 relative">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-full bg-[#C9A84C]/10 flex items-center justify-center">
            <Plus size={14} className="text-[#C9A84C]" strokeWidth={2.5} />
          </div>
          <p className="font-sans text-[#C9A84C] text-[11px] font-semibold tracking-[0.3em] uppercase">The Full Setup</p>
        </div>
        
        <h4 className="font-serif text-3xl text-neutral-900 mb-3 tracking-tight">{upsell.title}</h4>
        <p className="font-sans text-neutral-600 text-[15px] leading-loose max-w-lg">{upsell.subtitle}</p>
      </div>

      <motion.button 
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onAddOption}
        className="shrink-0 z-10 w-full md:w-auto font-sans text-xs font-semibold tracking-[0.25em] uppercase bg-[#C9A84C] text-white hover:bg-[#b0903a] px-10 py-5 transition-colors duration-300 rounded shadow-[0_12px_24px_rgba(201,168,76,0.15)] flex items-center justify-center relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
        Add to Proposal
      </motion.button>
    </motion.div>
  );
}
