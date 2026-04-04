"use client";
import { motion } from "framer-motion";

// Fixed beam triangles — swept via CSS rotate, NOT d-attribute morphing.
// Each beam is a fixed SVG polygon, rotated from the light-head pivot using CSS transform.
const HEAD_POSITIONS = [120, 240, 400, 560, 680];

const BEAM_COLORS = [
  { hex: "#C9A84C", rgb: "201,168,76",  animClass: "anim-beam-l",    gradId: "beam-gold"  },
  { hex: "#B76E79", rgb: "183,110,121", animClass: "anim-beam-r",    gradId: "beam-rose"  },
  { hex: "#5386E4", rgb: "83,134,228",  animClass: "anim-beam-l-d1", gradId: "beam-blue"  },
  { hex: "#E8E8E0", rgb: "232,232,224", animClass: "anim-beam-r-d1", gradId: "beam-white" },
  { hex: "#C9A84C", rgb: "201,168,76",  animClass: "anim-beam-l-d2", gradId: "beam-gold2" },
];

export function LightingRig({ index }: { index: number }) {
  return (
    <motion.svg
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="absolute top-0 left-1/2 -translate-x-1/2 z-30 w-full max-w-4xl h-[460px] pointer-events-none"
      viewBox="0 0 800 460"
      fill="none"
    >
      <defs>
        <linearGradient id="truss-metal" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2a2820" />
          <stop offset="50%" stopColor="#1a1810" />
          <stop offset="100%" stopColor="#0e0c08" />
        </linearGradient>
        <linearGradient id="truss-side" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#1a1810" />
          <stop offset="100%" stopColor="#0e0c08" />
        </linearGradient>
        <linearGradient id="foot-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#1e1c14" />
          <stop offset="100%" stopColor="#0a0906" />
        </linearGradient>
        <radialGradient id="head-chrome" cx="35%" cy="30%">
          <stop offset="0%"   stopColor="#3a3020" />
          <stop offset="100%" stopColor="#0e0c08" />
        </radialGradient>

        {/* Beam gradient — static, no animation on the gradient itself */}
        {BEAM_COLORS.map(({ gradId, rgb }) => (
          <linearGradient key={gradId} id={gradId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor={`rgba(${rgb},0.55)`} />
            <stop offset="70%"  stopColor={`rgba(${rgb},0.06)`} />
            <stop offset="100%" stopColor={`rgba(${rgb},0)`} />
          </linearGradient>
        ))}
      </defs>

      {/* ── Main Horizontal Truss Beam ── */}
      <rect x="12" y="6" width="776" height="28" rx="3" fill="url(#truss-metal)" stroke="#C9A84C" strokeWidth="1.5" />
      <g stroke="#C9A84C" strokeWidth="1" opacity={0.5}>
        {Array.from({ length: 32 }).map((_, i) => {
          const sx = 12 + i * 24;
          return <path key={i} d={`M${sx} 6 L${sx + 24} 34 M${sx} 34 L${sx + 24} 6`} />;
        })}
      </g>
      <rect x="12" y="6" width="776" height="4" rx="2" fill="rgba(255,255,255,0.04)" />

      {/* ── Left Vertical Support ── */}
      <rect x="12" y="34" width="28" height="360" rx="2" fill="url(#truss-side)" stroke="#C9A84C" strokeWidth="1.5" />
      <g stroke="#C9A84C" strokeWidth="1" opacity={0.4}>
        {Array.from({ length: 15 }).map((_, i) => {
          const sy = 34 + i * 24;
          return <path key={i} d={`M12 ${sy} L40 ${sy + 24} M12 ${sy + 24} L40 ${sy}`} />;
        })}
      </g>
      <path d="M0 394 L56 394 L48 380 L8 380 Z" fill="url(#foot-grad)" stroke="#C9A84C" strokeWidth="1.5" />
      <rect x="0" y="394" width="56" height="6" rx="2" fill="#0a0906" stroke="#C9A84C" strokeWidth="1" opacity={0.6} />

      {/* ── Right Vertical Support ── */}
      <rect x="760" y="34" width="28" height="360" rx="2" fill="url(#truss-side)" stroke="#C9A84C" strokeWidth="1.5" />
      <g stroke="#C9A84C" strokeWidth="1" opacity={0.4}>
        {Array.from({ length: 15 }).map((_, i) => {
          const sy = 34 + i * 24;
          return <path key={i} d={`M760 ${sy} L788 ${sy + 24} M760 ${sy + 24} L788 ${sy}`} />;
        })}
      </g>
      <path d="M744 394 L800 394 L792 380 L752 380 Z" fill="url(#foot-grad)" stroke="#C9A84C" strokeWidth="1.5" />
      <rect x="744" y="394" width="56" height="6" rx="2" fill="#0a0906" stroke="#C9A84C" strokeWidth="1" opacity={0.6} />

      {/* ── Moving Head Lights ── */}
      {HEAD_POSITIONS.map((x, i) => {
        const color = BEAM_COLORS[i % BEAM_COLORS.length];
        // Beam is a fixed triangle — CSS rotate sweeps it, no d-morphing
        const beamHalfW = 70;

        return (
          <g key={i}>
            {/*
              FIX: Beam uses CSS rotate animation from pivot at head tip (x, 72).
              This is MUCH cheaper than morphing the d attribute.
              We use a foreignObject-style approach via SVG transform-origin.
            */}
            <polygon
              points={`${x} 72, ${x - beamHalfW} 460, ${x + beamHalfW} 460`}
              fill={`url(#${color.gradId})`}
              className={`${color.animClass} gpu-promote`}
              style={{
                transformOrigin: `${x}px 72px`,
                mixBlendMode: "screen",
                opacity: 0.45,
              }}
            />

            {/* Rigging bracket */}
            <rect x={x - 10} y="34" width="20" height="10" rx="1" fill="#0e0c08" stroke="#C9A84C" strokeWidth="1" />
            {/* Yoke arms */}
            <path d={`M${x - 14} 44 L${x - 14} 56 M${x + 14} 44 L${x + 14} 56`} stroke="#C9A84C" strokeWidth="1.5" opacity={0.6} />
            {/* Chassis body */}
            <rect x={x - 24} y="44" width="48" height="20" rx="2" fill="url(#head-chrome)" stroke="#C9A84C" strokeWidth="1.5" />
            {/* Lens housing */}
            <path d={`M${x - 18} 64 L${x + 18} 64 L${x + 14} 72 L${x - 14} 72 Z`} fill="#0a0906" stroke={color.hex} strokeWidth="1.5" />
            {/* Aperture glow — CSS pulse, NOT Framer */}
            <rect
              x={x - 10} y={66} width={20} height={4} rx="2"
              fill={color.hex}
              className={`anim-aperture-d${i} gpu-promote`}
              style={{ filter: `drop-shadow(0 0 4px ${color.hex})` }}
            />
            {/* Head highlight */}
            <rect x={x - 22} y="45" width="44" height="5" rx="1" fill="rgba(255,255,255,0.04)" />
          </g>
        );
      })}
    </motion.svg>
  );
}