"use client";
import { motion } from "framer-motion";

export function DJBooth({ index }: { index: number }) {
  return (
    <motion.svg
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 w-[340px] h-[180px]"
      viewBox="0 0 340 180"
      fill="none"
      // drop-shadow only on static wrapper — NOT on animated children
      style={{ filter: "drop-shadow(0 12px 32px rgba(201,168,76,0.3))" }}
    >
      <defs>
        <linearGradient id="dj-cabinet" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#2a2018" />
          <stop offset="60%"  stopColor="#1a140d" />
          <stop offset="100%" stopColor="#0e0b07" />
        </linearGradient>
        <radialGradient id="cone-l" cx="35%" cy="30%">
          <stop offset="0%"   stopColor="#4a3820" />
          <stop offset="50%"  stopColor="#2a2010" />
          <stop offset="100%" stopColor="#0e0b07" />
        </radialGradient>
        <radialGradient id="cone-r" cx="35%" cy="30%">
          <stop offset="0%"   stopColor="#4a3820" />
          <stop offset="50%"  stopColor="#2a2010" />
          <stop offset="100%" stopColor="#0e0b07" />
        </radialGradient>
        <radialGradient id="platter-l" cx="40%" cy="35%">
          <stop offset="0%"   stopColor="#5a4a2a" />
          <stop offset="40%"  stopColor="#2a2010" />
          <stop offset="100%" stopColor="#0e0b07" />
        </radialGradient>
        <radialGradient id="platter-r" cx="40%" cy="35%">
          <stop offset="0%"   stopColor="#5a4a2a" />
          <stop offset="40%"  stopColor="#2a2010" />
          <stop offset="100%" stopColor="#0e0b07" />
        </radialGradient>
        <linearGradient id="mixer-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#1e1608" />
          <stop offset="100%" stopColor="#0c0906" />
        </linearGradient>
      </defs>

      {/* ── Left Speaker Cabinet ── */}
      <rect x="4" y="38" width="46" height="120" rx="3" fill="url(#dj-cabinet)" stroke="#C9A84C" strokeWidth="1.5" />
      <circle cx="27" cy="115" r="18" fill="url(#cone-l)" stroke="#C9A84C" strokeWidth="1" />
      <circle cx="27" cy="115" r="14" fill="none" stroke="#C9A84C" strokeWidth="0.5" opacity={0.4} />
      <circle cx="27" cy="115" r="9"  fill="none" stroke="#C9A84C" strokeWidth="0.5" opacity={0.3} />
      <circle cx="27" cy="115" r="3"  fill="#C9A84C" opacity={0.6} />
      <circle cx="27" cy="55"  r="8"  fill="url(#cone-l)" stroke="#C9A84C" strokeWidth="1" />
      <circle cx="27" cy="55"  r="4"  fill="none" stroke="#C9A84C" strokeWidth="0.5" opacity={0.4} />
      {/* LED trim — CSS pulse, not Framer */}
      <rect x="4" y="154" width="46" height="2" rx="1" fill="#C9A84C" className="anim-pulse gpu-promote" />

      {/* ── Right Speaker Cabinet ── */}
      <rect x="290" y="38" width="46" height="120" rx="3" fill="url(#dj-cabinet)" stroke="#C9A84C" strokeWidth="1.5" />
      <circle cx="313" cy="115" r="18" fill="url(#cone-r)" stroke="#C9A84C" strokeWidth="1" />
      <circle cx="313" cy="115" r="14" fill="none" stroke="#C9A84C" strokeWidth="0.5" opacity={0.4} />
      <circle cx="313" cy="115" r="9"  fill="none" stroke="#C9A84C" strokeWidth="0.5" opacity={0.3} />
      <circle cx="313" cy="115" r="3"  fill="#C9A84C" opacity={0.6} />
      <circle cx="313" cy="55"  r="8"  fill="url(#cone-r)" stroke="#C9A84C" strokeWidth="1" />
      <circle cx="313" cy="55"  r="4"  fill="none" stroke="#C9A84C" strokeWidth="0.5" opacity={0.4} />
      <rect x="290" y="154" width="46" height="2" rx="1" fill="#C9A84C" className="anim-pulse-d1 gpu-promote" />

      {/* ── Main DJ Desk ── */}
      <rect x="56" y="78" width="228" height="80" rx="6" fill="url(#dj-cabinet)" stroke="#C9A84C" strokeWidth="2" />
      <rect x="62" y="84" width="216" height="68" rx="4" fill="url(#mixer-body)" stroke="#C9A84C" strokeWidth="0.5" opacity={0.5} />
      {/* LED strip — CSS pulse */}
      <rect x="70" y="152" width="200" height="3" rx="1.5" fill="#C9A84C" className="anim-pulse gpu-promote" opacity={0.4} />

      {/* ── Left CDJ ── */}
      <rect x="68" y="60" width="68" height="44" rx="4" fill="#111008" stroke="#C9A84C" strokeWidth="1.5" />
      <circle cx="102" cy="82" r="17" fill="url(#platter-l)" stroke="#C9A84C" strokeWidth="1" />
      {/* Spinning group — CSS spin, not Framer */}
      <g className="anim-spin-cw gpu-promote" style={{ transformOrigin: "102px 82px" }}>
        <path d="M102 65 L102 68 M119 82 L116 82 M102 99 L102 96 M85 82 L88 82" stroke="#C9A84C" strokeWidth="1" opacity={0.5} />
        <circle cx="102" cy="82" r="6" fill="#0e0b07" stroke="#C9A84C" strokeWidth="0.5" opacity={0.6} />
      </g>
      <circle cx="102" cy="82" r="3" fill="#C9A84C" opacity={0.8} />

      {/* ── Mixer Console ── */}
      <rect x="144" y="60" width="52" height="44" rx="4" fill="url(#mixer-body)" stroke="#C9A84C" strokeWidth="1.5" />
      {/* Faders — CSS animation classes */}
      {[156, 164, 172, 180].map((x, i) => (
        <g key={x}>
          <rect x={x} y="66" width="2" height="28" rx="1" fill="#1a1408" stroke="#C9A84C" strokeWidth="0.5" opacity={0.5} />
          <rect
            x={x - 4} y={70 + i * 4} width="10" height="5" rx="1"
            fill="#C9A84C" opacity={0.7}
            className={i % 2 === 0 ? "anim-fader-a gpu-promote" : "anim-fader-b gpu-promote"}
            style={{ transformOrigin: `${x + 1}px ${72 + i * 4}px` }}
          />
        </g>
      ))}
      {/* VU meter dots — CSS pulse delays */}
      <circle cx="153" cy="96" r="2" fill="#C9A84C"  className="anim-pulse gpu-promote" />
      <circle cx="161" cy="96" r="2" fill="#5386E4"  className="anim-pulse-d1 gpu-promote" />
      <circle cx="169" cy="96" r="2" fill="#B76E79"  className="anim-pulse-d2 gpu-promote" />

      {/* ── Right CDJ ── */}
      <rect x="204" y="60" width="68" height="44" rx="4" fill="#111008" stroke="#C9A84C" strokeWidth="1.5" />
      <circle cx="238" cy="82" r="17" fill="url(#platter-r)" stroke="#C9A84C" strokeWidth="1" />
      {/* CSS spin CCW */}
      <g className="anim-spin-ccw gpu-promote" style={{ transformOrigin: "238px 82px" }}>
        <path d="M238 65 L238 68 M255 82 L252 82 M238 99 L238 96 M221 82 L224 82" stroke="#C9A84C" strokeWidth="1" opacity={0.5} />
        <circle cx="238" cy="82" r="6" fill="#0e0b07" stroke="#C9A84C" strokeWidth="0.5" opacity={0.6} />
      </g>
      <circle cx="238" cy="82" r="3" fill="#C9A84C" opacity={0.8} />

      {/* Ground shadow — static, no animation */}
      <ellipse cx="170" cy="173" rx="145" ry="6" fill="rgba(0,0,0,0.5)" style={{ filter: "blur(6px)" }} />
    </motion.svg>
  );
}