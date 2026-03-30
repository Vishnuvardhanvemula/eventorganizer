"use client";

import { motion, AnimatePresence } from "framer-motion";
import React from "react";

import { DJBooth } from "./svg/DJBooth";
import { DanceFloor } from "./svg/DanceFloor";
import { LightingRig } from "./svg/LightingRig";
import { LEDScreen } from "./svg/LEDScreen";
import { LineArrays } from "./svg/LineArrays";
import { Balloons } from "./svg/Balloons";
import { FloralArch } from "./svg/FloralArch";
import { Chandelier } from "./svg/Chandelier";
import { Podium } from "./svg/Podium";

interface Props {
  activeComponents: string[];
}

const svgMap: Record<string, React.FC<{ index: number }>> = {
  DJBooth,
  DanceFloor,
  LightingRig,
  LEDScreen,
  LineArrays,
  Balloons,
  FloralArch,
  Chandelier,
  Podium,
};

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

export function SceneStage({ activeComponents }: Props) {
  return (
    <div className="relative w-full h-full flex items-center justify-center bg-[var(--color-bg-primary)] overflow-hidden">
      
      {/* Premium Architectural Grid Pattern */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-40">
        <div 
          className="w-full h-full absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(201, 168, 76, 0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(201, 168, 76, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: `40px 40px`,
            maskImage: `radial-gradient(circle at center, black 20%, transparent 70%)`,
            WebkitMaskImage: `radial-gradient(circle at center, black 20%, transparent 70%)`
          }}
        />
        {/* Central Anchor Glow */}
        <div className="absolute center w-96 h-96 bg-[#C9A84C] opacity-5 rounded-full blur-3xl" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="relative w-full max-w-4xl h-[560px] flex items-center justify-center"
      >
        <AnimatePresence mode="popLayout">
          {activeComponents.map((CompName, i) => {
            const SvgComponent = svgMap[CompName];
            if (!SvgComponent) return null;
            return (
              <motion.div
                key={CompName}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95, filter: "blur(4px)" }}
                transition={{ duration: 0.8, ease: [0.6, 0.05, -0.01, 0.9] }}
                className="contents"
              >
                <SvgComponent index={i} />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

