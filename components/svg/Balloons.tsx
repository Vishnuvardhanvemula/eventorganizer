"use client";
import { motion } from "framer-motion";

const BALLOON_DATA = [
  // Left cluster
  { cx: 120, cy: 458, r: 34, color: "#C9A84C", animClass: "anim-float-a" },
  { cx: 152, cy: 468, r: 22, color: "#B76E79", animClass: "anim-float-b" },
  { cx: 105, cy: 474, r: 16, color: "#5386E4", animClass: "anim-float-c" },
  { cx: 140, cy: 452, r: 13, color: "#E8C8E8", animClass: "anim-float-a-d" },
  { cx: 128, cy: 440, r: 10, color: "#C9A84C", animClass: "anim-float-b-d" },
  // Right cluster
  { cx: 680, cy: 458, r: 34, color: "#C9A84C", animClass: "anim-float-b" },
  { cx: 648, cy: 468, r: 22, color: "#B76E79", animClass: "anim-float-a" },
  { cx: 695, cy: 474, r: 16, color: "#5386E4", animClass: "anim-float-a-d" },
  { cx: 660, cy: 452, r: 13, color: "#E8C8E8", animClass: "anim-float-c" },
  { cx: 672, cy: 440, r: 10, color: "#C9A84C", animClass: "anim-float-b-d" },
];

const SPARKLES = [
  { x: 86,  y: 420, color: "#C9A84C", animClass: "anim-sparkle-a" },
  { x: 710, y: 410, color: "#B76E79", animClass: "anim-sparkle-b" },
  { x: 165, y: 390, color: "#5386E4", animClass: "anim-sparkle-c" },
  { x: 638, y: 430, color: "#E8C8E8", animClass: "anim-sparkle-d" },
];

function lighten(hex: string, factor: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgb(${Math.round(r + (255 - r) * factor)},${Math.round(g + (255 - g) * factor)},${Math.round(b + (255 - b) * factor)})`;
}
function darken(hex: string, factor: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgb(${Math.round(r * (1 - factor))},${Math.round(g * (1 - factor))},${Math.round(b * (1 - factor))})`;
}

export function Balloons({ index }: { index: number }) {
  return (
    <motion.svg
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="absolute inset-0 z-30 w-full h-full pointer-events-none"
      viewBox="0 0 800 600"
      fill="none"
    >
      <defs>
        {BALLOON_DATA.map((b, i) => (
          <radialGradient key={i} id={`ball-${i}`} cx="35%" cy="28%" r="65%">
            <stop offset="0%"   stopColor={lighten(b.color, 0.5)} stopOpacity="0.9" />
            <stop offset="45%"  stopColor={b.color}               stopOpacity="0.85" />
            <stop offset="100%" stopColor={darken(b.color, 0.5)}  stopOpacity="0.9" />
          </radialGradient>
        ))}
      </defs>

      {/* Strings — static SVG, no animation */}
      <path d="M120 492 Q124 511 120 530" stroke="rgba(255,255,255,0.2)" strokeWidth="0.8" fill="none" />
      <path d="M152 490 Q148 510 148 530" stroke="rgba(255,255,255,0.2)" strokeWidth="0.8" fill="none" />
      <path d="M105 490 Q108 510 108 530" stroke="rgba(255,255,255,0.2)" strokeWidth="0.8" fill="none" />
      <path d="M680 492 Q676 511 680 530" stroke="rgba(255,255,255,0.2)" strokeWidth="0.8" fill="none" />
      <path d="M648 490 Q652 510 652 530" stroke="rgba(255,255,255,0.2)" strokeWidth="0.8" fill="none" />
      <path d="M695 490 Q692 510 692 530" stroke="rgba(255,255,255,0.2)" strokeWidth="0.8" fill="none" />

      {/* Balloons — entrance via Framer (one-time), continuous float via CSS class */}
      {BALLOON_DATA.map((b, i) => (
        <motion.g
          key={i}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: i * 0.05, ease: [0.34, 1.56, 0.64, 1] }}
          style={{ transformOrigin: `${b.cx}px ${b.cy + b.r}px` }}
        >
          {/* Float group — CSS class (NOT Framer motion) */}
          <g
            className={`${b.animClass} gpu-promote`}
            style={{ transformOrigin: `${b.cx}px ${b.cy}px` }}
          >
            {/* Balloon body */}
            <circle cx={b.cx} cy={b.cy} r={b.r} fill={`url(#ball-${i})`} />
            {/* Highlight spot */}
            <ellipse
              cx={b.cx - b.r * 0.28}
              cy={b.cy - b.r * 0.3}
              rx={b.r * 0.2}
              ry={b.r * 0.14}
              fill="rgba(255,255,255,0.35)"
              style={{ transform: "rotate(-30deg)", transformOrigin: `${b.cx}px ${b.cy}px` }}
            />
            {/* Knot */}
            <circle cx={b.cx} cy={b.cy + b.r} r={b.r * 0.12} fill={darken(b.color, 0.6)} />
          </g>
        </motion.g>
      ))}

      {/* Sparkles — CSS only */}
      {SPARKLES.map((s, i) => (
        <path
          key={i}
          d={`M${s.x} ${s.y - 8} L${s.x} ${s.y + 8} M${s.x - 8} ${s.y} L${s.x + 8} ${s.y}`}
          stroke={s.color}
          strokeWidth="1.2"
          strokeLinecap="round"
          className={`${s.animClass} gpu-promote`}
          style={{
            transformOrigin: `${s.x}px ${s.y}px`,
            filter: `drop-shadow(0 0 3px ${s.color})`,
          }}
        />
      ))}
    </motion.svg>
  );
}