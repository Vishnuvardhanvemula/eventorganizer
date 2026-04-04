"use client";
import { motion } from "framer-motion";

export function LEDScreen({ index }: { index: number }) {
  return (
    <motion.svg
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="absolute bottom-28 left-1/2 -translate-x-1/2 z-0 w-[520px] h-[320px]"
      viewBox="0 0 520 320"
      fill="none"
      // Static wrapper drop-shadow only
      style={{ filter: "drop-shadow(0 0 32px rgba(83,134,228,0.4)) drop-shadow(0 16px 40px rgba(83,134,228,0.15))" }}
    >
      <defs>
        <linearGradient id="led-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#0d1526" />
          <stop offset="100%" stopColor="#060910" />
        </linearGradient>
        <linearGradient id="led-bezel" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#1a2236" />
          <stop offset="100%" stopColor="#0a0f18" />
        </linearGradient>
        <linearGradient id="led-truss" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="#1e1e24" />
          <stop offset="100%" stopColor="#141418" />
        </linearGradient>
        <linearGradient id="led-glare" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%"   stopColor="#fff" stopOpacity="0" />
          <stop offset="40%"  stopColor="#fff" stopOpacity="0.05" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        {/* Wave gradients */}
        <linearGradient id="wave-h-blue" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="#5386E4" stopOpacity="0" />
          <stop offset="50%"  stopColor="#5386E4" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#5386E4" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="wave-h-gold" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="#C9A84C" stopOpacity="0" />
          <stop offset="50%"  stopColor="#C9A84C" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#C9A84C" stopOpacity="0" />
        </linearGradient>
        <clipPath id="led-screen-clip">
          <rect x="10" y="10" width="500" height="250" rx="4" />
        </clipPath>
      </defs>

      {/* ── Truss mounting legs ── */}
      {[46, 190, 330, 474].map((x, i) => (
        <g key={i}>
          <rect x={x} y={260} width={20} height={55} rx="2" fill="url(#led-truss)" stroke="#C9A84C" strokeWidth="1.2" opacity={0.7} />
          {[0, 1, 2].map((j) => (
            <path
              key={j}
              d={`M${x} ${260 + j * 18} L${x + 20} ${278 + j * 18} M${x} ${278 + j * 18} L${x + 20} ${260 + j * 18}`}
              stroke="#C9A84C" strokeWidth="0.8" opacity={0.3}
            />
          ))}
          <rect x={x - 4} y={312} width={28} height={5} rx="2" fill="#1a1a20" stroke="#C9A84C" strokeWidth="1" opacity={0.5} />
        </g>
      ))}

      {/* ── Bezel ── */}
      <rect x="0" y="0" width="520" height="265" rx="6" fill="url(#led-bezel)" stroke="#2a3a5a" strokeWidth="3" />
      <rect x="3" y="3" width="514" height="259" rx="5" fill="none" stroke="#C9A84C" strokeWidth="1" opacity={0.4} />
      <rect x="6" y="6" width="508" height="253" rx="4" fill="none" stroke="#5386E4" strokeWidth="0.5" opacity={0.3} />

      {/* ── Screen surface ── */}
      <rect x="8" y="8" width="504" height="249" rx="4" fill="url(#led-body)" />

      {/* ── Screen content (clipped) ── */}
      <g clipPath="url(#led-screen-clip)">
        <rect x="10" y="10" width="500" height="250" fill="#060912" />

        {/* LED matrix grid — static */}
        <g opacity={0.06} stroke="#5386E4" strokeWidth="0.5">
          {Array.from({ length: 19 }).map((_, i) => (
            <line key={`v${i}`} x1={(i + 1) * 26} y1="10" x2={(i + 1) * 26} y2="260" />
          ))}
          {Array.from({ length: 9 }).map((_, i) => (
            <line key={`h${i}`} x1="10" y1={(i + 1) * 27} x2="510" y2={(i + 1) * 27} />
          ))}
        </g>

        {/*
          PERFORMANCE: Use Framer only for the entrance (1-time animate).
          Continuous wave motion: path morphing → replaced with translateY transform.
          We approximate wave motion with vertical translation of pre-drawn sinusoidal paths.
        */}

        {/* Blue wave — translate Y for "wave" feel, no d morphing */}
        <path
          d="M -60 180 Q 130 60 260 180 T 580 160"
          stroke="url(#wave-h-blue)" strokeWidth="6" fill="none"
          style={{ filter: "blur(3px)" }}
          className="anim-fog-a gpu-promote"
        />
        <path
          d="M -60 180 Q 130 60 260 180 T 580 160"
          stroke="#5386E4" strokeWidth="1.5" fill="none" opacity={0.5}
          className="anim-fog-b gpu-promote"
        />

        {/* Gold pulse line — translate only */}
        <path
          d="M 10 133 L 100 133 L 130 80 L 180 210 L 220 120 L 270 133 L 510 133"
          stroke="#C9A84C" strokeWidth="1.5" fill="none" opacity={0.6}
          className="anim-pulse gpu-promote"
          style={{ filter: "drop-shadow(0 0 3px #C9A84C)" }}
        />

        {/* Rose sub-wave — pulse only */}
        <path
          d="M 10 100 Q 260 280 510 100"
          stroke="#B76E79" strokeWidth="2" fill="none" opacity={0.35}
          className="anim-pulse-d2 gpu-promote"
        />

        {/* Color panels — pulse only, no color change */}
        {[0, 1, 2, 3].map((i) => (
          <rect
            key={i}
            x={10 + i * 125} y={10} width={125} height={250}
            fill={["rgba(83,134,228,0.04)", "rgba(201,168,76,0.03)", "rgba(183,110,121,0.03)", "rgba(83,134,228,0.04)"][i]}
            className="anim-shimmer gpu-promote"
            style={{ animationDelay: `${i * 0.6}s` }}
          />
        ))}

        {/* Scanline — CSS translateY */}
        <rect
          x="10" y="10" width="500" height="3"
          fill="#fff" opacity={0.04}
          className="anim-scan gpu-promote"
        />

        {/* Glass sweep — CSS translateX */}
        <polygon
          points="10,10 130,10 50,260 -70,260"
          fill="url(#led-glare)"
          className="anim-glare gpu-promote"
        />
      </g>

      {/* Outer glow ring — CSS pulse */}
      <rect
        x="0" y="0" width="520" height="265" rx="6"
        fill="none" stroke="#5386E4" strokeWidth="2"
        className="anim-pulse gpu-promote"
        style={{ filter: "blur(1.5px)" }}
      />

      {/* Ground shadow — static */}
      <ellipse cx="260" cy="318" rx="220" ry="8"
        fill="rgba(83,134,228,0.12)"
        style={{ filter: "blur(8px)" }}
      />
    </motion.svg>
  );
}