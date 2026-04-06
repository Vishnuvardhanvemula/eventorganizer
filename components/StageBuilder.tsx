"use client";

import { useState, useMemo } from "react";
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
type Category = typeof categories[number];

const CATEGORY_ICONS: Record<Category, keyof typeof LucideIcons> = {
  Audio: "Headphones",
  Video: "MonitorPlay",
  Lighting: "Sun",
  Atmosphere: "Sparkles",
};

// Parse price strings like "$1,500+" → 1500
function parsePrice(price: string): number {
  return parseInt(price.replace(/[^0-9]/g, ""), 10) || 0;
}

function formatTotal(addons: AddonId[]): string {
  const total = builderModules
    .filter((m) => addons.includes(m.id))
    .reduce((sum, m) => sum + parsePrice(m.priceEstimate), 0);
  return total >= 1000
    ? `$${(total / 1000).toFixed(1)}k+`
    : `$${total}+`;
}

export function StageBuilder({ onComplete, onBack, initialAddons = ["DJBooth"] }: Props) {
  const [activeAddons, setActiveAddons] = useState<AddonId[]>(initialAddons);
  const [upsellMessage, setUpsellMessage] = useState<string | null>(null);
  const [upsellTarget, setUpsellTarget] = useState<AddonId | null>(null);
  const [activeCategory, setActiveCategory] = useState<Category>("Audio");
  const [isMobilePanelOpen, setIsMobilePanelOpen] = useState(false);

  const toggle = (id: AddonId) => {
    const stageModule = builderModules.find((m) => m.id === id);
    if (stageModule?.isCore) return;

    setActiveAddons((prev) => {
      const next = prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id];
      return next;
    });

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
      const targetModule = builderModules.find((m) => m.id === upsellTarget);
      if (targetModule) setActiveCategory(targetModule.category as Category);
    }
    setUpsellMessage(null);
    setUpsellTarget(null);
  };

  const dismissUpsell = () => {
    setUpsellMessage(null);
    setUpsellTarget(null);
  };

  const filteredModules = builderModules.filter((m) => m.category === activeCategory);
  const nonCoreSelected = activeAddons.filter((id) => !builderModules.find((m) => m.id === id)?.isCore);
  const totalPrice = formatTotal(activeAddons);

  // Count how many items per category have been selected (for badges)
  const categoryBadge = useMemo(() => {
    const counts: Record<string, number> = {};
    categories.forEach((cat) => {
      counts[cat] = builderModules.filter(
        (m) => m.category === cat && activeAddons.includes(m.id) && !m.isCore
      ).length;
    });
    return counts;
  }, [activeAddons]);

  return (
    <div className="fixed inset-0 w-full h-screen bg-[#08080f] flex flex-col overflow-hidden">

      {/* ── Top bar ─────────────────────────────────────────────── */}
      <motion.header
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.6, 0.05, -0.01, 0.9] }}
        className="flex items-center justify-between px-5 md:px-10 pt-5 pb-3 z-20 relative border-b border-white/[0.06] shrink-0"
      >
        {/* Back */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 font-sans text-[11px] tracking-[0.18em] uppercase text-white/40 hover:text-white/70 transition-colors group"
        >
          <LucideIcons.ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
          <span className="hidden sm:inline">Back</span>
        </button>

        {/* Centre — Step label */}
        <div className="absolute left-1/2 -translate-x-1/2 text-center pointer-events-none">
          <p className="font-sans text-[9px] tracking-[0.3em] uppercase text-[#C9A84C]/70 mb-0.5">Step 2 of 3</p>
          <p className="font-sans text-[11px] tracking-[0.15em] uppercase text-white/50 font-medium">Customise Your Stage</p>
        </div>

        {/* Running price pill */}
        <div className="flex items-center gap-3">
          <motion.div
            key={totalPrice}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="hidden md:flex items-center gap-2 bg-white/[0.04] border border-white/10 px-3 py-1.5 rounded-full"
          >
            <LucideIcons.Receipt size={11} className="text-[#C9A84C]" />
            <span className="font-sans text-[11px] tracking-widest text-white/60">Estimate</span>
            <span className="font-sans text-[12px] font-semibold tracking-wide text-[#C9A84C]">{totalPrice}</span>
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onComplete(activeAddons)}
            className="font-sans text-[10px] md:text-[11px] tracking-[0.2em] uppercase bg-[#C9A84C] text-black px-4 md:px-6 py-2.5 rounded-lg shadow-[0_4px_20px_rgba(201,168,76,0.35)] hover:bg-[#d4b461] transition-colors font-semibold"
          >
            Get Proposal →
          </motion.button>
        </div>
      </motion.header>

      {/* ── Main content ────────────────────────────────────────── */}
      <div className="flex flex-1 overflow-hidden relative">

        {/* ── LEFT: Stage canvas ──────────────────────────────── */}
        <motion.div
          animate={{ y: isMobilePanelOpen && typeof window !== "undefined" && window.innerWidth < 768 ? "-25%" : 0 }}
          transition={{ duration: 0.5, ease: [0.6, 0.05, -0.01, 0.9] }}
          className="flex-1 relative flex flex-col items-center justify-center pb-20 md:pb-0"
        >
          <SceneStage activeComponents={activeAddons} />

          {/* Stage element count — bottom of canvas */}
          <motion.div
            key={activeAddons.length}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute bottom-28 md:bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-white/[0.05] border border-white/10 backdrop-blur-md px-4 py-2 rounded-full pointer-events-none"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C] animate-pulse" />
            <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-white/40">
              {activeAddons.length} element{activeAddons.length !== 1 ? "s" : ""} on stage
            </span>
          </motion.div>

          {/* Empty state */}
          {activeAddons.length === 0 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="absolute bottom-20 left-1/2 -translate-x-1/2 font-sans text-xs tracking-[0.2em] uppercase text-white/20 text-center pointer-events-none"
            >
              Add elements from the panel →
            </motion.p>
          )}

          {/* Upsell toast */}
          <AnimatePresence>
            {upsellMessage && (
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                transition={{ duration: 0.5, ease: [0.6, 0.05, -0.01, 0.9] }}
                className="absolute bottom-40 md:bottom-20 left-1/2 -translate-x-1/2 w-[90%] max-w-sm z-50 bg-[#111118] border border-[#C9A84C]/30 rounded-2xl p-5 shadow-[0_16px_48px_rgba(0,0,0,0.5)]"
              >
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-7 h-7 rounded-full bg-[#C9A84C]/15 flex items-center justify-center shrink-0 mt-0.5">
                    <LucideIcons.Sparkles size={13} className="text-[#C9A84C]" />
                  </div>
                  <div>
                    <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-[#C9A84C] mb-1">Suggested Pairing</p>
                    <p className="font-sans text-sm text-white/80 leading-snug">{upsellMessage}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={acceptUpsell}
                    className="flex-1 text-[11px] font-sans tracking-[0.15em] uppercase bg-[#C9A84C] text-black py-2.5 rounded-lg hover:bg-[#d4b461] transition-colors font-semibold"
                  >
                    Add It
                  </button>
                  <button
                    onClick={dismissUpsell}
                    className="text-[11px] font-sans tracking-[0.15em] uppercase text-white/30 hover:text-white/60 py-2.5 px-4 transition-colors"
                  >
                    Skip
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* ── Mobile toggle ──────────────────────────────────── */}
        <button
          onClick={() => setIsMobilePanelOpen(!isMobilePanelOpen)}
          className="md:hidden absolute bottom-5 left-1/2 -translate-x-1/2 bg-[#1a1a24] border border-[#C9A84C]/30 shadow-[0_8px_32px_rgba(0,0,0,0.5)] px-6 py-3 rounded-full flex items-center gap-2 z-40 transition-transform active:scale-95"
        >
          {activeAddons.length > 0 && !isMobilePanelOpen && (
            <>
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#C9A84C] rounded-full animate-ping opacity-75" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#C9A84C] rounded-full" />
            </>
          )}
          <LucideIcons.SlidersHorizontal size={15} className="text-[#C9A84C]" />
          <span className="font-sans text-[11px] tracking-[0.2em] uppercase font-semibold text-white/80">
            {isMobilePanelOpen ? "View Stage" : "Customise"}
          </span>
        </button>

        {/* ── RIGHT: Control panel ──────────────────────────── */}
        <motion.aside
          initial={false}
          animate={{
            y: typeof window !== "undefined" && window.innerWidth < 768 ? (isMobilePanelOpen ? 0 : "100%") : 0,
            opacity: 1,
          }}
          transition={{ duration: 0.5, ease: [0.6, 0.05, -0.01, 0.9] }}
          className="absolute bottom-0 left-0 right-0 top-auto md:relative z-30 w-full md:w-[340px] xl:w-[380px] h-[65vh] md:h-full flex flex-col border-t md:border-t-0 md:border-l border-white/[0.07] bg-[#0e0e18] shadow-[-20px_0_60px_rgba(0,0,0,0.3)] overflow-hidden rounded-t-3xl md:rounded-none"
        >
          {/* Panel header */}
          <div className="px-6 pt-6 pb-0 shrink-0">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-[#C9A84C]/80 mb-1">Stage Toolkit</p>
                <h2 className="font-serif text-[22px] md:text-xl text-white leading-tight">
                  Add to your stage.
                </h2>
                <p className="font-sans text-[11px] text-white/30 mt-1 leading-snug">
                  Toggle elements to see them appear live.
                </p>
              </div>
              <button
                className="md:hidden w-8 h-8 rounded-full bg-white/[0.06] flex items-center justify-center text-white/40 hover:text-white/70 transition-colors shrink-0 mt-0.5"
                onClick={() => setIsMobilePanelOpen(false)}
              >
                <LucideIcons.X size={14} />
              </button>
            </div>

            {/* Running total — mobile visible */}
            <div className="md:hidden flex items-center gap-2 mb-4 bg-white/[0.04] border border-white/[0.08] px-3 py-2 rounded-lg">
              <LucideIcons.Receipt size={12} className="text-[#C9A84C]" />
              <span className="font-sans text-[11px] text-white/40">Estimated total</span>
              <span className="font-sans text-[13px] font-semibold text-[#C9A84C] ml-auto">{totalPrice}</span>
            </div>

            {/* Category tabs */}
            <div className="flex items-center gap-1 border-b border-white/[0.07] -mx-6 px-5 overflow-x-auto hide-scrollbar">
              {categories.map((cat) => {
                const IconComp = (LucideIcons as any)[CATEGORY_ICONS[cat]] || LucideIcons.Circle;
                const isActive = activeCategory === cat;
                const badge = categoryBadge[cat];
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`flex items-center gap-1.5 px-3 py-3.5 font-sans text-[10px] tracking-[0.12em] uppercase transition-colors relative whitespace-nowrap shrink-0 ${
                      isActive ? "text-white" : "text-white/30 hover:text-white/50"
                    }`}
                  >
                    <IconComp size={11} strokeWidth={isActive ? 2.5 : 1.5} />
                    {cat}
                    {badge > 0 && (
                      <span className="w-3.5 h-3.5 rounded-full bg-[#C9A84C] text-black text-[8px] font-bold flex items-center justify-center">
                        {badge}
                      </span>
                    )}
                    {isActive && (
                      <motion.div
                        layoutId="cat-underline"
                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C9A84C]"
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Module cards */}
          <div className="flex-1 overflow-y-auto px-5 py-4 space-y-2.5">
            <AnimatePresence mode="popLayout">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.25 }}
                className="space-y-2.5 pb-28 md:pb-4"
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
                      className={`w-full text-left p-4 rounded-xl border transition-all duration-300 relative overflow-hidden cursor-pointer ${
                        isActive
                          ? "border-[#C9A84C]/40 bg-[#C9A84C]/[0.06] shadow-[0_2px_12px_rgba(201,168,76,0.1)]"
                          : "border-white/[0.07] bg-white/[0.02] hover:border-white/[0.14] hover:bg-white/[0.04]"
                      } ${isCore ? "cursor-default" : "cursor-pointer"}`}
                    >
                      {/* Active glow orb */}
                      {isActive && !isCore && (
                        <div className="absolute top-0 right-0 w-20 h-20 bg-[#C9A84C]/8 translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl pointer-events-none" />
                      )}

                      <div className="flex items-center gap-3.5 relative z-10">
                        {/* Icon */}
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 ${
                          isActive
                            ? "bg-[#C9A84C] shadow-[0_0_16px_rgba(201,168,76,0.4)]"
                            : "bg-white/[0.06]"
                        }`}>
                          <Icon
                            size={17}
                            strokeWidth={isActive ? 2 : 1.5}
                            className={isActive ? "text-black" : "text-white/40"}
                          />
                        </div>

                        {/* Text */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2 mb-0.5">
                            <span className={`font-sans text-[13px] font-semibold leading-tight ${
                              isActive ? "text-white" : "text-white/70"
                            }`}>
                              {module.label}
                            </span>

                            {/* Core badge OR checkbox */}
                            {isCore ? (
                              <span className="font-sans text-[9px] tracking-[0.12em] uppercase text-white/25 bg-white/[0.06] border border-white/[0.08] px-2 py-0.5 rounded flex items-center gap-1 shrink-0">
                                <LucideIcons.Lock size={7} />
                                Included
                              </span>
                            ) : (
                              <div className={`w-5 h-5 rounded-full border-[1.5px] flex items-center justify-center shrink-0 transition-all duration-200 ${
                                isActive
                                  ? "border-[#C9A84C] bg-[#C9A84C]"
                                  : "border-white/20 bg-transparent"
                              }`}>
                                <AnimatePresence>
                                  {isActive && (
                                    <motion.div
                                      initial={{ scale: 0 }}
                                      animate={{ scale: 1 }}
                                      exit={{ scale: 0 }}
                                      transition={{ type: "spring", stiffness: 500, damping: 28 }}
                                    >
                                      <LucideIcons.Check size={10} className="text-black" strokeWidth={3} />
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </div>
                            )}
                          </div>

                          <p className={`font-sans text-[11px] leading-snug ${isActive ? "text-white/50" : "text-white/25"}`}>
                            {module.description}
                          </p>

                          <p className={`font-sans text-[11px] mt-2 font-semibold tracking-wide tabular-nums ${
                            isActive ? "text-[#C9A84C]" : "text-white/25"
                          }`}>
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

          {/* ── Bottom CTA ── */}
          <div className="px-5 py-4 border-t border-white/[0.07] shrink-0 bg-[#0e0e18]">
            {/* Selection summary */}
            <div className="flex items-center gap-2 mb-3">
              <div className="flex -space-x-1.5">
                {activeAddons.slice(0, 4).map((id) => {
                  const m = builderModules.find((x) => x.id === id);
                  const Ic = m ? ((LucideIcons as any)[m.icon] || LucideIcons.Circle) : LucideIcons.Circle;
                  return (
                    <div key={id} className="w-6 h-6 rounded-full bg-[#C9A84C]/15 border border-[#C9A84C]/30 flex items-center justify-center">
                      <Ic size={9} className="text-[#C9A84C]" />
                    </div>
                  );
                })}
                {activeAddons.length > 4 && (
                  <div className="w-6 h-6 rounded-full bg-white/[0.06] border border-white/10 flex items-center justify-center">
                    <span className="font-sans text-[8px] text-white/40">+{activeAddons.length - 4}</span>
                  </div>
                )}
              </div>
              <span className="font-sans text-[11px] text-white/30">
                {activeAddons.length} element{activeAddons.length !== 1 ? "s" : ""} selected
              </span>
              <span className="ml-auto font-sans text-[12px] font-semibold text-[#C9A84C]">{totalPrice}</span>
            </div>

            <button
              onClick={() => onComplete(activeAddons)}
              className="w-full py-3.5 bg-[#C9A84C] text-black font-sans text-[11px] tracking-[0.2em] uppercase rounded-xl flex justify-between items-center px-5 hover:bg-[#d4b461] transition-colors font-bold shadow-[0_4px_20px_rgba(201,168,76,0.3)]"
            >
              <span>Review & Get Proposal</span>
              <LucideIcons.ArrowRight size={14} />
            </button>
          </div>
        </motion.aside>
      </div>

      {/* Mobile overlay backdrop */}
      <AnimatePresence>
        {isMobilePanelOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-20 md:hidden backdrop-blur-sm"
            onClick={() => setIsMobilePanelOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
