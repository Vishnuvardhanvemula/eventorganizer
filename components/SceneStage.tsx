"use client";

import { motion, AnimatePresence, useReducedMotion, type Variants } from "framer-motion";

import React, { useMemo } from "react";

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

// Canonical z-layer + build order for each element
const BUILD_ORDER: Record<string, number> = {
  DanceFloor: 0,
  LEDScreen: 1,
  LineArrays: 2,
  LightingRig: 3,
  DJBooth: 4,
  FloralArch: 5,
  Podium: 5,
  Chandelier: 6,
  Balloons: 7,
};

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

// Accent colors per component for ambient glow tinting
const GLOW_COLORS: Record<string, string> = {
  DJBooth:    "201,168,76",   // gold
  LEDScreen:  "83,134,228",   // blue
  LightingRig:"183,110,121",  // rose
  LineArrays: "200,200,200",  // white/silver
  DanceFloor: "201,168,76",   // gold
  Balloons:   "201,120,160",  // pink
  Chandelier: "255,230,180",  // warm crystal
  FloralArch: "160,200,120",  // green
  Podium:     "201,168,76",   // gold
};

// Fog wisps — pure CSS animations (translateX only), no Framer loops
function FogLayer({ intensity }: { intensity: number }) {
  const baseOpacity = 0.04 + intensity * 0.06;
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 800 560"
      preserveAspectRatio="xMidYMid slice"
      style={{ zIndex: 1 }}
    >
      {/* Each path uses CSS translateX — GPU composited */}
      <path
        d="M -200 380 Q 200 340 600 380 T 1200 360"
        stroke={`rgba(180,160,255,${baseOpacity})`}
        strokeWidth="60" fill="none"
        style={{ filter: "blur(24px)" }}
        className="anim-fog-a gpu-promote"
        opacity={0.5}
      />
      <path
        d="M -200 420 Q 300 390 700 420 T 1200 400"
        stroke={`rgba(180,160,255,${baseOpacity})`}
        strokeWidth="50" fill="none"
        style={{ filter: "blur(20px)" }}
        className="anim-fog-b gpu-promote"
        opacity={0.4}
      />
      <path
        d="M -200 460 Q 100 430 500 460 T 1200 440"
        stroke={`rgba(180,160,255,${baseOpacity * 0.7})`}
        strokeWidth="40" fill="none"
        style={{ filter: "blur(20px)" }}
        className="anim-fog-c gpu-promote"
        opacity={0.3}
      />
      {/* Floor fog pool — CSS pulse only */}
      <ellipse
        cx="400" cy="520" rx="380" ry="40"
        fill={`rgba(120,100,200,${0.05 + intensity * 0.06})`}
        style={{ filter: "blur(28px)" }}
        className="anim-pulse-slow gpu-promote"
      />
    </svg>
  );
}


// Central radial ambient glow that intensifies as more components added
function AmbientGlow({ activeComponents }: { activeComponents: string[] }) {
  const intensity = activeComponents.length / 8;

  const glowColor = useMemo(() => {
    if (activeComponents.includes("LEDScreen")) return "83,134,228";
    if (activeComponents.includes("LightingRig")) return "183,110,121";
    return "201,168,76";
  }, [activeComponents]);

  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    >
      {/* Central bloom */}
      <motion.div
        className="absolute"
        style={{
          left: "50%",
          top: "45%",
          transform: "translate(-50%, -50%)",
          width: `${300 + intensity * 300}px`,
          height: `${200 + intensity * 200}px`,
          background: `radial-gradient(ellipse, rgba(${glowColor},${0.06 + intensity * 0.12}) 0%, transparent 70%)`,
          borderRadius: "50%",
          filter: "blur(40px)",
        }}
        animate={{ scale: [1, 1.08, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Floor reflection glow */}
      <motion.div
        className="absolute bottom-0 left-0 right-0"
        style={{
          height: "120px",
          background: `linear-gradient(to top, rgba(${glowColor},${0.08 + intensity * 0.1}) 0%, transparent 100%)`,
          filter: "blur(20px)",
        }}
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Top-down stage spot */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "300px",
          height: "100%",
          background: `linear-gradient(to bottom, rgba(${glowColor},${0.04 + intensity * 0.06}) 0%, transparent 60%)`,
          filter: "blur(30px)",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}

// Stars/particle grid backdrop
function StageBackdrop() {
  const dots = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: (i * 137.5) % 100,
    y: (i * 83.7) % 80,
    r: i % 3 === 0 ? 1.5 : 0.8,
    opacity: 0.06 + (i % 5) * 0.02,
  }));

  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    >
      {dots.map((d) => (
        <circle
          key={d.id}
          cx={`${d.x}%`}
          cy={`${d.y}%`}
          r={d.r}
          fill="#C9A84C"
          opacity={d.opacity}
        />
      ))}
    </svg>
  );
}

// Per-component entrance variant
function componentEntranceVariants(buildIndex: number): Variants {
  return {
    hidden: { opacity: 0, scale: 0.75, y: 30 },
    show: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        delay: buildIndex * 0.12,
        duration: 0.7,
        ease: [0.34, 1.56, 0.64, 1] as [number, number, number, number],
      },
    },
    exit: {
      opacity: 0,
      scale: 0.88,
      transition: { duration: 0.35, ease: "easeIn" as const },
    },
  };
}

export function SceneStage({ activeComponents }: Props) {
  const shouldReduceMotion = useReducedMotion();
  const intensity = activeComponents.length / 8;

  const sortedComponents = useMemo(
    () =>
      [...activeComponents].sort(
        (a, b) => (BUILD_ORDER[a] ?? 5) - (BUILD_ORDER[b] ?? 5)
      ),
    [activeComponents]
  );

  return (
    <div
      className="relative w-full h-full flex items-center justify-center overflow-hidden"
      style={{ background: "#08080f" }}
    >
      {/* ── Backdrop ── */}
      <StageBackdrop />

      {/* ── Perspective floor grid ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(201,168,76,0.06) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(201,168,76,0.06) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(ellipse 80% 60% at 50% 70%, black 30%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 70%, black 30%, transparent 100%)",
          zIndex: 0,
        }}
      />

      {/* ── Ambient atmosphere ── */}
      <AmbientGlow activeComponents={activeComponents} />

      {/* ── Fog layer ── */}
      {!shouldReduceMotion && <FogLayer intensity={intensity} />}

      {/* ── Stage canvas ── */}
      <motion.div
        className="relative w-full max-w-4xl h-[560px] flex items-center justify-center"
        style={{ zIndex: 2 }}
      >
        <AnimatePresence mode="popLayout">
          {sortedComponents.map((CompName) => {
            const SvgComponent = svgMap[CompName];
            if (!SvgComponent) return null;
            const buildIdx = BUILD_ORDER[CompName] ?? 5;
            const variants = shouldReduceMotion
              ? {
                  hidden: { opacity: 0 },
                  show: { opacity: 1, transition: { duration: 0.3 } },
                  exit: { opacity: 0, transition: { duration: 0.2 } },
                }
              : componentEntranceVariants(buildIdx);

            return (
              <motion.div
                key={CompName}
                variants={variants}
                initial="hidden"
                animate="show"
                exit="exit"
                className="contents"
              >
                <SvgComponent index={buildIdx} />
              </motion.div>
            );
          })}
        </AnimatePresence>

        {/* Empty state */}
        <AnimatePresence>
          {activeComponents.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0 flex flex-col items-center justify-center gap-4 pointer-events-none"
            >
              {/* Animated arc hint */}
              <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                <motion.circle
                  cx="40" cy="40" r="32"
                  stroke="#C9A84C"
                  strokeWidth="1"
                  strokeDasharray="4 6"
                  opacity={0.3}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  style={{ transformOrigin: "40px 40px" }}
                />
                <motion.circle
                  cx="40" cy="40" r="18"
                  stroke="#C9A84C"
                  strokeWidth="1"
                  opacity={0.15}
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />
              </svg>
              <p className="font-sans text-[11px] tracking-[0.25em] uppercase text-white/25 text-center">
                Add components to build your stage
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* ── Vignette edges ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 90% 90% at 50% 50%, transparent 50%, rgba(8,8,15,0.7) 100%)",
          zIndex: 3,
        }}
      />
    </div>
  );
}
