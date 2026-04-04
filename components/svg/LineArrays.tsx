"use client";
import { motion } from "framer-motion";

export function LineArrays({ index }: { index: number }) {
  const SIDES = [
    { x: 60,  side: 0 },
    { x: 740, side: 1 },
  ];

  return (
    <motion.svg
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="absolute top-8 left-1/2 -translate-x-1/2 z-30 w-full max-w-4xl h-96 pointer-events-none"
      viewBox="0 0 800 400"
      fill="none"
      style={{ filter: "drop-shadow(0 8px 24px rgba(200,200,210,0.15))" }}
    >
      <defs>
        <linearGradient id="la-tower" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#1c1c22" />
          <stop offset="50%" stopColor="#2a2a32" />
          <stop offset="100%" stopColor="#1c1c22" />
        </linearGradient>
        <linearGradient id="la-cabinet" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1e1e24" />
          <stop offset="100%" stopColor="#0e0e12" />
        </linearGradient>
        <radialGradient id="la-driver" cx="35%" cy="30%">
          <stop offset="0%" stopColor="#3a3a44" />
          <stop offset="100%" stopColor="#0e0e12" />
        </radialGradient>
        <linearGradient id="sound-ripple" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="rgba(200,200,220,0.3)" />
          <stop offset="100%" stopColor="rgba(200,200,220,0)" />
        </linearGradient>
        <radialGradient id="la-driver-r" cx="35%" cy="30%">
          <stop offset="0%" stopColor="#3a3a44" />
          <stop offset="100%" stopColor="#0a0a10" />
        </radialGradient>
        <filter id="la-glow">
          <feGaussianBlur stdDeviation="4" result="b" />
          <feComposite in="SourceGraphic" in2="b" operator="over" />
        </filter>
      </defs>

      {SIDES.map(({ x, side }) => {
        const mirror = side === 1;
        const dx = mirror ? -1 : 1;

        return (
          <g key={side}>
            {/* ── Lift Tower ── */}
            <rect
              x={x - 22} y={-10} width={44} height={405}
              rx="3" fill="url(#la-tower)" stroke="#C9A84C" strokeWidth="1.5" opacity={0.5}
            />
            {/* X-bracing */}
            <g stroke="#C9A84C" strokeWidth="0.8" opacity={0.25}>
              {Array.from({ length: 20 }).map((_, i) => {
                const sy = -10 + i * 20.5;
                return (
                  <path key={i} d={`M${x - 22} ${sy} L${x + 22} ${sy + 20.5} M${x + 22} ${sy} L${x - 22} ${sy + 20.5}`} />
                );
              })}
            </g>
            {/* Tower highlight */}
            <rect x={x - 20} y={-8} width={8} height={400} rx="2" fill="rgba(255,255,255,0.025)" />

            {/* Outrigger base */}
            <path
              d={`M${x - 44} 400 L${x - 22} 368 M${x + 44} 400 L${x + 22} 368`}
              stroke="#C9A84C" strokeWidth="2" opacity={0.4}
            />
            <rect x={x - 54} y={390} width={108} height={10} rx="3" fill="#0e0e14" stroke="#C9A84C" strokeWidth="1.5" opacity={0.6} />
            {/* Foot bolts */}
            {[-30, 0, 30].map((offset) => (
              <circle key={offset} cx={x + offset} cy={395} r={2} fill="#C9A84C" opacity={0.3} />
            ))}

            {/* Winch motor box */}
            <rect x={x - 26} y={-14} width={52} height={28} rx="3" fill="#111116" stroke="#C9A84C" strokeWidth="1.5" />
            <circle cx={x} cy={0} r={6} fill="#C9A84C" opacity={0.7} style={{ filter: "drop-shadow(0 0 4px #C9A84C)" }} />
            <circle cx={x} cy={0} r={3} fill="#0e0e12" />

            {/* Rigging cables */}
            <path
              d={`M${x - 12} 14 L${x - 12} 72 M${x + 12} 14 L${x + 12} 72`}
              stroke="#C9A84C" strokeWidth="1" strokeDasharray="3 3" opacity={0.5}
            />

            {/* ── Rigging bumper ── */}
            <rect x={x - 26} y={72} width={52} height={12} rx="2" fill="#1a1a20" stroke="#C9A84C" strokeWidth="1.5" />

            {/* ── Speaker Module Stack (J-curve) ── */}
            {Array.from({ length: 8 }).map((_, i) => {
              const isJCurve = i > 3;
              const angle    = isJCurve ? (i - 3) * 5 : 0;
              const finalAngle = mirror ? -angle : angle;
              const offsetX  = isJCurve ? (i - 3) * dx * 1.5 : 0;
              const currentY = 86 + i * 20;

              return (
                <g
                  key={i}
                  transform={`translate(${offsetX}, 0) rotate(${finalAngle}, ${x}, ${currentY})`}
                >
                  {/* Cabinet body */}
                  <rect
                    x={x - 24} y={currentY - 9} width={48} height={18}
                    rx="2" fill="url(#la-cabinet)" stroke="#C9A84C" strokeWidth="1.2"
                  />
                  {/* Cabinet highlight */}
                  <rect x={x - 22} y={currentY - 8} width={44} height={4} rx="1" fill="rgba(255,255,255,0.03)" />

                  {/* Driver circles */}
                  {[-10, 0, 10].map((dx2) => (
                    <g key={dx2}>
                      <circle cx={x + dx2} cy={currentY} r={5} fill="url(#la-driver-r)" stroke="#C9A84C" strokeWidth="0.8" opacity={0.7} />
                      <circle cx={x + dx2} cy={currentY} r={2} fill="rgba(255,255,255,0.1)" />
                    </g>
                  ))}

                  {/* Module separator */}
                  <line
                    x1={x - 24} y1={currentY + 9}
                    x2={x + 24} y2={currentY + 9}
                    stroke="#C9A84C" strokeWidth="0.5" opacity={0.4}
                  />
                </g>
              );
            })}

            {/* ── Sound pressure ripples ── */}
            {[1, 2, 3].map((ring) => (
              <motion.path
                key={ring}
                d={
                  mirror
                    ? `M${x - 28} ${140} A${ring * 30} ${ring * 20} 0 0 0 ${x - 28} ${240}`
                    : `M${x + 28} ${140} A${ring * 30} ${ring * 20} 0 0 1 ${x + 28} ${240}`
                }
                stroke="rgba(200,200,220,0.15)"
                strokeWidth="1.5"
                fill="none"
                animate={{ opacity: [0, 0.6, 0], scale: [0.8, 1.2, 0.8] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: ring * 0.8,
                  ease: "easeOut",
                }}
                style={{ transformOrigin: `${x}px 190px` }}
              />
            ))}

            {/* ── Ground shadow ── */}
            <ellipse
              cx={x} cy={400} rx={30} ry={5}
              fill="rgba(0,0,0,0.6)"
              style={{ filter: "blur(6px)" }}
            />
          </g>
        );
      })}
    </motion.svg>
  );
}
