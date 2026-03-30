"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as LucideIcons from "lucide-react";
import { builderModules, AddonId } from "../data/builder";
import { SceneStage } from "./SceneStage";

interface Props {
  onComplete: (addons: string[]) => void;
  onBack: () => void;
  initialAddons?: AddonId[];
}

const UPSELL_RULES: Partial<Record<AddonId, { suggest: AddonId; message: string }>> = {
  DJBooth: { suggest: "LEDScreen", message: "Elevate the DJ performance with a custom LED Video Wall backdrop." },
  LEDScreen: { suggest: "LightingRig", message: "Pair the visual energy with programmed stage lighting." },
  LightingRig: { suggest: "DanceFloor", message: "Complete the stage with a premium seamless dance floor." },
};

const categories = ["Audio", "Video", "Lighting", "Atmosphere"] as const;

export function StageBuilder({ onComplete, onBack, initialAddons = ["DJBooth"] }: Props) {
  const [activeAddons, setActiveAddons] = useState<AddonId[]>(initialAddons);
  const [upsellMessage, setUpsellMessage] = useState<string | null>(null);
  const [upsellTarget, setUpsellTarget] = useState<AddonId | null>(null);
  const [activeCategory, setActiveCategory] = useState<typeof categories[number]>("Audio");
  const [isMobilePanelOpen, setIsMobilePanelOpen] = useState(false);

  const toggle = (id: AddonId) => {
    // Core items can't be removed
    const module = builderModules.find((m) => m.id === id);
    if (module?.isCore) return;

    setActiveAddons((prev) => {
      const next = prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id];
      return next;
    });

    // Trigger upsell if it has a rule and isn't added yet
    const rule = UPSELL_RULES[id];
    if (rule && !activeAddons.includes(rule.suggest)) {
      setTimeout(() => {
        setUpsellMessage(rule.message);
        setUpsellTarget(rule.suggest);
      }, 600);
    }
  };

  const acceptUpsell = () => {
    if (upsellTarget && !activeAddons.includes(upsellTarget)) {
      setActiveAddons((prev) => [...prev, upsellTarget]);
      // Switch tab to show them what was added
      const targetModule = builderModules.find((m) => m.id === upsellTarget);
      if (targetModule) {
        setActiveCategory(targetModule.category as typeof categories[number]);
      }
    }
    setUpsellMessage(null);
    setUpsellTarget(null);
  };

  const dismissUpsell = () => {
    setUpsellMessage(null);
    setUpsellTarget(null);
  };

  const filteredModules = builderModules.filter((m) => m.category === activeCategory);
  
  // Progress bar calculation
  const progressPercent = (activeAddons.length / builderModules.length) * 100;

  return (
    <div className="fixed inset-0 w-full h-screen bg-[radial-gradient(ellipse_at_center,_#FCFAF5_0%,_#FFFFFF_70%)] flex flex-col overflow-hidden">
      
      {/* Top Progress Bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-neutral-100 z-50">
        <motion.div 
          className="h-full bg-[var(--color-gold)]"
          initial={{ width: 0 }}
          animate={{ width: `${progressPercent}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>

      {/* Top Bar */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.6, 0.05, -0.01, 0.9] }}
        className="flex items-center justify-between px-6 md:px-12 pt-8 pb-4 z-20 relative bg-gradient-to-b from-white to-transparent"
      >
        <button 
          onClick={onBack}
          className="flex items-center gap-2 font-sans text-xs tracking-[0.2em] uppercase text-neutral-500 hover:text-neutral-900 transition-colors"
        >
          <LucideIcons.ArrowLeft size={16} />
          <span className="hidden sm:inline">Back</span>
        </button>

        <div className="flex items-center gap-3">
          <span className="font-sans text-xs tracking-[0.2em] uppercase text-neutral-400 hidden md:block mt-1">
            {activeAddons.length} / {builderModules.length} components
          </span>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onComplete(activeAddons)}
            className="font-sans text-[10px] md:text-xs tracking-[0.2em] uppercase bg-[#C9A84C] text-white px-5 md:px-6 py-2.5 md:py-3 rounded shadow-[0_8px_24px_rgba(201,168,76,0.2)] hover:bg-[#b59540] transition-colors"
          >
            Get Proposal →
          </motion.button>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* 2D Stage Canvas */}
        <div className="flex-1 relative flex flex-col items-center justify-center pb-20 md:pb-0">
          <SceneStage activeComponents={activeAddons} />

          {/* Canvas info overlay */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            key={activeAddons.length}
            className="absolute bottom-32 md:bottom-12 left-1/2 -translate-x-1/2 bg-white/80 backdrop-blur-md px-4 py-2 border border-[#C9A84C]/20 rounded-full shadow-sm pointer-events-none"
          >
            <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-neutral-600 font-medium">
              Stage Elements: {activeAddons.length}
            </span>
          </motion.div>

          {/* Empty state hint */}
          {activeAddons.length === 0 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="absolute bottom-24 left-1/2 -translate-x-1/2 font-sans text-xs tracking-[0.2em] uppercase text-neutral-400 text-center pointer-events-none"
            >
              Select components to build your stage →
            </motion.p>
          )}

          {/* Upsell Toast */}
          <AnimatePresence>
            {upsellMessage && (
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.96 }}
                transition={{ duration: 0.6, ease: [0.6, 0.05, -0.01, 0.9] }}
                className="absolute bottom-40 md:bottom-24 left-1/2 -translate-x-1/2 w-[90%] max-w-sm z-50 backdrop-blur-xl bg-white border border-[#C9A84C]/30 rounded-2xl p-5 shadow-[0_20px_60px_rgba(0,0,0,0.06)]"
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-6 h-6 rounded-full bg-[#C9A84C]/10 flex items-center justify-center shrink-0 mt-0.5">
                    <LucideIcons.Sparkles size={12} className="text-[#C9A84C]" />
                  </div>
                  <p className="font-sans text-sm text-neutral-700 leading-snug">{upsellMessage}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={acceptUpsell}
                    className="flex-1 text-xs font-sans tracking-[0.15em] uppercase bg-[#C9A84C] text-white py-2.5 rounded hover:bg-[#b59540] transition-colors shadow-sm"
                  >
                    Add It
                  </button>
                  <button
                    onClick={dismissUpsell}
                    className="text-xs font-sans tracking-[0.15em] uppercase text-neutral-400 hover:text-neutral-700 py-2.5 px-4 transition-colors"
                  >
                    Skip
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Mobile Toggle Button */}
        <button 
          onClick={() => setIsMobilePanelOpen(!isMobilePanelOpen)}
          className="md:hidden absolute bottom-6 left-1/2 -translate-x-1/2 bg-white border border-[#C9A84C]/30 shadow-[0_8px_32px_rgba(201,168,76,0.15)] px-6 py-3 rounded-full flex items-center gap-2 z-40 transition-transform active:scale-95"
        >
          {activeAddons.length > 0 && !isMobilePanelOpen && (
            <>
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#C9A84C] rounded-full animate-ping opacity-75" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#C9A84C] rounded-full shadow-sm" />
            </>
          )}
          <LucideIcons.Settings2 size={16} className="text-[#C9A84C]" />
          <span className="font-sans text-[11px] tracking-[0.2em] uppercase font-bold text-neutral-900">
            {isMobilePanelOpen ? "View Stage" : "Open Toolkit"}
          </span>
        </button>

        {/* Right Control Panel */}
        <motion.aside
          initial={false}
          animate={{ 
            x: isMobilePanelOpen ? 0 : (typeof window !== 'undefined' && window.innerWidth < 768 ? '100%' : 0),
            opacity: 1
          }}
          transition={{ duration: 0.5, ease: [0.6, 0.05, -0.01, 0.9] }}
          className="absolute inset-0 md:relative z-30 w-full md:w-80 xl:w-96 h-full flex flex-col border-l border-neutral-100 bg-white shadow-[-20px_0_60px_rgba(0,0,0,0.03)] md:shadow-none overflow-hidden"
        >
          {/* Mobile Handle / Header */}
          <div className="px-6 pt-6 pb-4 border-b border-neutral-100 flex items-center justify-between">
            <div>
              <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-[#C9A84C] mb-1">Toolkit</p>
              <h2 className="font-serif text-2xl md:text-xl text-neutral-900 leading-none">Choose additions.</h2>
            </div>
            <button 
              className="md:hidden w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-500"
              onClick={() => setIsMobilePanelOpen(false)}
            >
              <LucideIcons.X size={16} />
            </button>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-0 border-b border-neutral-100 px-4 overflow-x-auto hide-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-4 font-sans text-[10px] md:text-[11px] tracking-[0.15em] uppercase transition-colors relative whitespace-nowrap ${
                  activeCategory === cat ? "text-neutral-900 font-medium" : "text-neutral-400 hover:text-neutral-600"
                }`}
              >
                {cat}
                {activeCategory === cat && (
                  <motion.div layoutId="category-underline" className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C9A84C]" />
                )}
              </button>
            ))}
          </div>

          {/* Module Cards */}
          <div className="flex-1 overflow-y-auto px-4 py-5 space-y-3">
            <AnimatePresence mode="popLayout">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.3 }}
                className="space-y-3 pb-24 md:pb-0"
              >
                {filteredModules.map((module) => {
                  const isActive = activeAddons.includes(module.id);
                  const isCore = module.isCore;
                  const Icon = (LucideIcons as any)[module.icon] || LucideIcons.Circle;

                  return (
                    <motion.button
                      key={module.id}
                      onClick={() => toggle(module.id)}
                      whileHover={{ scale: isCore ? 1 : 1.01 }}
                      whileTap={{ scale: isCore ? 1 : 0.98 }}
                      className={`w-full text-left p-4 rounded-xl border transition-all duration-300 relative overflow-hidden group ${
                        isActive
                          ? "border-[#C9A84C]/50 bg-[#FCFAF5] shadow-sm"
                          : "border-neutral-100 bg-white hover:border-neutral-200 shadow-none"
                      }`}
                    >
                      {isActive && !isCore && (
                        <div className="absolute top-0 right-0 w-16 h-16 bg-[#C9A84C]/5 translate-x-1/2 -translate-y-1/2 rounded-full blur-xl pointer-events-none" />
                      )}
                      
                      <div className="flex items-start gap-3 relative z-10">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                          isActive ? "bg-[#C9A84C] text-white" : "bg-neutral-50 text-neutral-400"
                        }`}>
                          <Icon size={18} strokeWidth={isActive ? 2 : 1.5} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-0.5">
                            <span className={`font-sans text-sm font-medium ${isActive ? "text-[#C9A84C]" : "text-neutral-700"}`}>
                              {module.label}
                            </span>
                            {isCore ? (
                              <span className="font-sans text-[9px] tracking-[0.15em] uppercase text-neutral-400 bg-neutral-100 px-2 py-0.5 rounded flex items-center gap-1">
                                <LucideIcons.Lock size={8} /> Core
                              </span>
                            ) : (
                              <div className={`w-4 h-4 rounded-full border-[1.5px] transition-colors flex items-center justify-center ${
                                isActive ? "border-[#C9A84C] bg-[#C9A84C]" : "border-neutral-300"
                              }`}>
                                <AnimatePresence>
                                  {isActive && (
                                    <motion.div
                                      initial={{ scale: 0, opacity: 0 }}
                                      animate={{ scale: 1, opacity: 1 }}
                                      exit={{ scale: 0, opacity: 0 }}
                                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                                    >
                                      <LucideIcons.Check size={10} className="text-white" strokeWidth={3} />
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </div>
                            )}
                          </div>
                          <p className="font-sans text-[11px] text-neutral-500 leading-snug">{module.description}</p>
                          <p className={`font-sans text-[11px] mt-2 font-medium tracking-wide ${isActive ? "text-[#C9A84C]" : "text-neutral-400"}`}>
                            {module.priceEstimate}
                          </p>
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Bottom CTA (Desktop only, mobile has it in top bar) */}
          <div className="px-4 py-4 border-t border-neutral-100 hidden md:block">
            <button
              onClick={() => onComplete(activeAddons)}
              className="w-full py-4 bg-neutral-900 text-white font-sans text-[10px] md:text-xs tracking-[0.25em] uppercase rounded flex justify-between items-center px-6 hover:bg-neutral-800 transition-colors"
            >
              <span>{activeAddons.length} Items</span>
              <span className="flex items-center gap-2">Proceed <LucideIcons.ArrowRight size={14} /></span>
            </button>
          </div>
        </motion.aside>
      </div>
      
      {/* Mobile background overlay */}
      <AnimatePresence>
        {isMobilePanelOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 z-20 md:hidden backdrop-blur-sm"
            onClick={() => setIsMobilePanelOpen(false)}
          />
        )}
      </AnimatePresence>
      
    </div>
  );
}
