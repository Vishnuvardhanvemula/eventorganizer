"use client";
import React from "react";
import { motion } from "framer-motion";

// ─── Luxury Dance Floor ────────────────────────────────────────────────────
// Dark marble surface with a classic herringbone parquet inlay, gold border
// trim, and a soft warm chandelier-light reflection. No flash, pure class.

export function DanceFloor({ index }: { index: number }) {
  // Parquet herringbone: alternating planks in two directions
  // Viewbox 820×210, floor shape: trapezoid M155 0 L665 0 L820 210 L0 210

  const plankW = 28;
  const plankH = 10;

  // Generate herringbone planks in two orientations across the floor
  // Orientation A: tilted right  Orientation B: tilted left
  function herringboneBlock(bx: number, by: number, orient: "A" | "B", key: string) {
    if (orient === "A") {
      // Parallelogram leaning right
      return (
        <path
          key={key}
          d={`M${bx} ${by} L${bx + plankW} ${by} L${bx + plankW + 6} ${by + plankH} L${bx + 6} ${by + plankH} Z`}
          fill="none"
          stroke="rgba(201,168,76,0.10)"
          strokeWidth="0.5"
        />
      );
    } else {
      // Parallelogram leaning left
      return (
        <path
          key={key}
          d={`M${bx + 6} ${by} L${bx + plankW + 6} ${by} L${bx + plankW} ${by + plankH} L${bx} ${by + plankH} Z`}
          fill="none"
          stroke="rgba(201,168,76,0.10)"
          strokeWidth="0.5"
        />
      );
    }
  }

  const planks: React.ReactNode[] = [];
  for (let row = 0; row < 21; row++) {
    for (let col = 0; col < 32; col++) {
      const bx = col * (plankW + 1) - 20;
      const by = row * (plankH + 1);
      const orient: "A" | "B" = Math.floor(row / 2) % 2 === 0
        ? (col % 2 === 0 ? "A" : "B")
        : (col % 2 === 0 ? "B" : "A");
      planks.push(herringboneBlock(bx, by, orient, `${row}-${col}`));
    }
  }

  // Gold medallion inlay at centre of floor (decorative diamond)
  const mc = { x: 410, y: 108 }; // centre of trapezoid approx
  const mr = 38; // medallion radius

  return (
    <motion.svg
      initial={{ opacity: 0, scaleX: 0.7 }}
      animate={{ opacity: 1, scaleX: 1 }}
      transition={{ duration: 0.9, ease: [0.34, 1.2, 0.64, 1] }}
      className="absolute bottom-0 left-1/2 -translate-x-1/2 z-10 w-[820px] h-52"
      viewBox="0 0 820 210"
      fill="none"
      style={{
        filter: "drop-shadow(0 -10px 50px rgba(201,168,76,0.18))",
        transformOrigin: "410px 210px",
      }}
    >
      <defs>
        {/* Deep marble surface — dark charcoal with warm undertone */}
        <linearGradient id="df-marble" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#1c1710" stopOpacity="0.98" />
          <stop offset="45%"  stopColor="#131008" stopOpacity="1" />
          <stop offset="100%" stopColor="#0a0806" stopOpacity="1" />
        </linearGradient>

        {/* Warm chandelier reflection at top centre */}
        <radialGradient id="df-reflect" cx="50%" cy="0%" r="55%">
          <stop offset="0%"   stopColor="#C9A84C" stopOpacity="0.13" />
          <stop offset="40%"  stopColor="#C9A84C" stopOpacity="0.05" />
          <stop offset="100%" stopColor="#C9A84C" stopOpacity="0" />
        </radialGradient>

        {/* Subtle marble vein overlay */}
        <linearGradient id="df-vein1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%"   stopColor="#C9A84C" stopOpacity="0" />
          <stop offset="48%"  stopColor="#C9A84C" stopOpacity="0.04" />
          <stop offset="52%"  stopColor="#C9A84C" stopOpacity="0.06" />
          <stop offset="100%" stopColor="#C9A84C" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="df-vein2" x1="1" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#C9A84C" stopOpacity="0" />
          <stop offset="45%"  stopColor="#E8D5A0" stopOpacity="0.035" />
          <stop offset="55%"  stopColor="#E8D5A0" stopOpacity="0.055" />
          <stop offset="100%" stopColor="#C9A84C" stopOpacity="0" />
        </linearGradient>

        {/* Gold medallion gradient */}
        <radialGradient id="df-medallion" cx="50%" cy="50%">
          <stop offset="0%"   stopColor="#E8D5A0" stopOpacity="0.7" />
          <stop offset="50%"  stopColor="#C9A84C" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#7a5a10" stopOpacity="0.1" />
        </radialGradient>

        {/* Gold border glow */}
        <filter id="df-border-glow" x="-10%" y="-200%" width="120%" height="500%">
          <feGaussianBlur stdDeviation="3" />
        </filter>

        {/* Clip to floor shape */}
        <clipPath id="df-clip">
          <path d="M155 0 L665 0 L820 210 L0 210 Z" />
        </clipPath>

        {/* Soft reflection bloom filter */}
        <filter id="df-bloom" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* ── Subtle outer underglow (very soft, warm) ── */}
      <path
        d="M155 0 L665 0 L820 210 L0 210 Z"
        fill="none"
        stroke="#C9A84C"
        strokeWidth="18"
        opacity={0.07}
        style={{ filter: "blur(12px)" }}
      />

      {/* ── Floor body ── */}
      <path d="M155 0 L665 0 L820 210 L0 210 Z" fill="url(#df-marble)" />

      {/* ── Everything clipped inside floor shape ── */}
      <g clipPath="url(#df-clip)">

        {/* Herringbone parquet lines */}
        {planks}

        {/* Marble veins — two diagonal sweeps */}
        <path
          d="M0 50 Q 200 80 450 95 T 900 60"
          stroke="url(#df-vein1)" strokeWidth="28" fill="none"
        />
        <path
          d="M900 100 Q 600 130 300 118 T -100 105"
          stroke="url(#df-vein2)" strokeWidth="20" fill="none"
        />

        {/* Fine secondary vein */}
        <path
          d="M100 0 Q 300 60 550 40 T 820 180"
          stroke="rgba(201,168,76,0.025)" strokeWidth="12" fill="none"
        />

        {/* ── Central medallion inlay ── */}
        {/* Outer diamond */}
        <path
          d={`M${mc.x} ${mc.y - mr} L${mc.x + mr * 0.7} ${mc.y} L${mc.x} ${mc.y + mr} L${mc.x - mr * 0.7} ${mc.y} Z`}
          stroke="#C9A84C" strokeWidth="0.8" opacity={0.35}
          fill="url(#df-medallion)"
        />
        {/* Inner diamond */}
        <path
          d={`M${mc.x} ${mc.y - mr * 0.55} L${mc.x + mr * 0.4} ${mc.y} L${mc.x} ${mc.y + mr * 0.55} L${mc.x - mr * 0.4} ${mc.y} Z`}
          stroke="#C9A84C" strokeWidth="0.6" opacity={0.25}
          fill="none"
        />
        {/* Concentric circle */}
        <circle cx={mc.x} cy={mc.y} r={mr * 0.28}
          stroke="#C9A84C" strokeWidth="0.5" opacity={0.2} fill="none"
        />
        {/* Four corner accent ticks */}
        {[0, 90, 180, 270].map((deg) => {
          const rad = (deg * Math.PI) / 180;
          const x1 = mc.x + mr * 0.85 * Math.cos(rad);
          const y1 = mc.y + mr * 0.85 * Math.sin(rad) * 0.9;
          const x2 = mc.x + mr * 0.65 * Math.cos(rad);
          const y2 = mc.y + mr * 0.65 * Math.sin(rad) * 0.9;
          return (
            <line key={deg} x1={x1} y1={y1} x2={x2} y2={y2}
              stroke="#C9A84C" strokeWidth="0.8" opacity={0.25} />
          );
        })}

        {/* ── Chandelier warm reflection at top-centre ── */}
        <rect x="0" y="0" width="820" height="210" fill="url(#df-reflect)" />

        {/* Soft specular streak across mid-floor (moving glare) */}
        <ellipse
          cx={410} cy={70} rx={180} ry={12}
          fill="rgba(255,245,210,0.035)"
          className="anim-glare gpu-promote"
        />
      </g>

      {/* ── Border trim ── */}
      {/* Glowing rear edge (top of trapezoid) */}
      <line x1={155} y1={0} x2={665} y2={0}
        stroke="#C9A84C" strokeWidth="8"
        opacity={0.12}
        style={{ filter: "blur(5px)" }}
      />
      <line x1={155} y1={0} x2={665} y2={0}
        stroke="#C9A84C" strokeWidth="2"
        opacity={0.55}
        className="anim-pulse-slow gpu-promote"
      />
      {/* Fine inner offset line — classic double border */}
      <line x1={175} y1={8} x2={645} y2={8}
        stroke="#C9A84C" strokeWidth="0.5" opacity={0.18}
      />

      {/* Side edges */}
      <line x1={155} y1={0}   x2={0}   y2={210}
        stroke="#C9A84C" strokeWidth="1" opacity={0.25} />
      <line x1={665} y1={0}   x2={820} y2={210}
        stroke="#C9A84C" strokeWidth="1" opacity={0.25} />

      {/* Front edge */}
      <line x1={0} y1={210} x2={820} y2={210}
        stroke="#C9A84C" strokeWidth="1" opacity={0.12} />

      {/* ── Corner accent diamonds (subtle, not blinking) ── */}
      {[
        { x: 155, y: 0   },
        { x: 665, y: 0   },
        { x: 0,   y: 210 },
        { x: 820, y: 210 },
      ].map((pt, i) => (
        <g key={i}>
          <path
            d={`M${pt.x} ${pt.y - 5} L${pt.x + 4} ${pt.y} L${pt.x} ${pt.y + 5} L${pt.x - 4} ${pt.y} Z`}
            fill="#C9A84C" opacity={0.45}
          />
          <path
            d={`M${pt.x} ${pt.y - 5} L${pt.x + 4} ${pt.y} L${pt.x} ${pt.y + 5} L${pt.x - 4} ${pt.y} Z`}
            fill="#C9A84C" opacity={0.4}
            style={{ filter: "blur(3px)" }}
          />
        </g>
      ))}
    </motion.svg>
  );
}