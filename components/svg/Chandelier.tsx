"use client";

// ─── Wedding Chandelier ────────────────────────────────────────────────────
// Classic ornate ballroom/wedding chandelier:
//   ceiling rod → decorative crown → 3 tiers of curved candle arms →
//   crystal chain swags → cascading crystal drops → central teardrop pendant
// All glow & flicker: CSS keyframes (GPU thread).

export function Chandelier({ index }: { index: number }) {
  const cx = 200;

  // Key Y anchors
  const rodTop   = 2;
  const rodBot   = rodTop + 44;    // 46
  const crownTop = rodBot;         // 46
  const crownBot = crownTop + 38;  // 84
  const ringY1   = crownBot + 12;  // 96   — tier-1 ring (inner arms root)
  const ringY2   = ringY1  + 32;   // 128  — tier-2 ring
  const ringY3   = ringY2  + 30;   // 158  — tier-3 ring / bottom of arms
  const dropRoot = ringY3  + 6;    // 164  — crystal drops hang from here
  const pendantY = dropRoot + 52;  // 216  — central pendant

  // Candle arms per tier: [dx, dy relative to ring centre]
  // Curves upward then the candle sits at the tip
  const t1 = [
    { cx: -52, cy: ringY1 - 8 },   // left
    {  cx: 52, cy: ringY1 - 8 },   // right
  ];
  const t2 = [
    { cx: -104, cy: ringY2 - 6 },
    { cx:  -46, cy: ringY2 - 10 },
    { cx:   46, cy: ringY2 - 10 },
    { cx:  104, cy: ringY2 - 6 },
  ];
  const t3 = [
    { cx: -140, cy: ringY3 - 4 },
    { cx:  -80, cy: ringY3 - 8 },
    { cx:   80, cy: ringY3 - 8 },
    { cx:  140, cy: ringY3 - 4 },
  ];

  // Curved arm path: starts at (cx, rootY), curves to tip
  function arm(tipX: number, tipY: number, rootY: number) {
    const mid = cx + (tipX - cx) * 0.5;
    const cpY = rootY - 14;
    return `M ${cx} ${rootY} Q ${mid} ${cpY} ${tipX} ${tipY}`;
  }

  // Crystal swag chain between two x positions at fixed y
  function swag(x1: number, x2: number, y: number, sag: number) {
    const mid = (x1 + x2) / 2;
    return `M ${x1} ${y} Q ${mid} ${y + sag} ${x2} ${y}`;
  }

  // Crystal drop — teardrop shape
  function renderDrop(x: number, wireTop: number, len: number, r: number, delay: number, cls: string) {
    const ty = wireTop + len;
    return (
      <g key={`d-${x}-${wireTop}`}
        className={`${cls} gpu-promote`}
        style={{ transformOrigin: `${x}px ${wireTop}px`, animationDelay: `${delay}s` }}
      >
        <line x1={x} y1={wireTop} x2={x} y2={ty}
          stroke="#C9A84C" strokeWidth="0.45" opacity={0.35} />
        <path
          d={`M${x} ${ty - r}
              C${x - r * 0.9} ${ty - r} ${x - r * 0.9} ${ty + r * 1.5} ${x} ${ty + r * 2.2}
              C${x + r * 0.9} ${ty + r * 1.5} ${x + r * 0.9} ${ty - r} ${x} ${ty - r} Z`}
          fill="url(#ch-crystal)"
          stroke="#C9A84C" strokeWidth="0.5"
          className="anim-shimmer gpu-promote"
          style={{ animationDelay: `${delay}s`, filter: "drop-shadow(0 0 4px rgba(201,168,76,0.5))" }}
        />
        {/* specular glint */}
        <ellipse cx={x - r * 0.3} cy={ty + r * 0.4} rx={r * 0.22} ry={r * 0.35}
          fill="rgba(255,255,240,0.7)" />
      </g>
    );
  }

  // Single candle at tip position
  function renderCandle(tx: number, ty: number, delay: number, scale = 1) {
    const s = scale;
    return (
      <g key={`c-${tx}`}>
        {/* Halo glow */}
        <circle cx={tx} cy={ty - 9 * s} r={11 * s}
          fill="#FFE89A" opacity={0.20} filter="url(#ch-halo)"
          className="anim-pulse gpu-promote"
          style={{ animationDelay: `${delay}s` }}
        />
        {/* Candle wax */}
        <rect x={tx - 3 * s} y={ty - 6 * s} width={6 * s} height={8 * s}
          fill="#f8f0d8" stroke="#C9A84C" strokeWidth="0.5" rx="1"
        />
        {/* Cup bobeche */}
        <ellipse cx={tx} cy={ty + 2 * s} rx={5.5 * s} ry={2 * s}
          fill="#1e1608" stroke="#C9A84C" strokeWidth="0.7"
        />
        {/* Flame body */}
        <ellipse cx={tx} cy={ty - 11 * s} rx={3.5 * s} ry={5 * s}
          fill="url(#ch-flame)"
          className="anim-pulse gpu-promote"
          style={{ animationDelay: `${delay + 0.1}s`,
            filter: `drop-shadow(0 0 6px rgba(255,232,154,0.75))` }}
        />
        {/* Flame tip */}
        <ellipse cx={tx} cy={ty - 16.5 * s} rx={1.5 * s} ry={2.5 * s}
          fill="#fffbe0" opacity={0.85} />
        {/* Wick */}
        <line x1={tx} y1={ty - 6 * s} x2={tx} y2={ty - 7 * s}
          stroke="#333" strokeWidth="0.8" />
      </g>
    );
  }

  return (
    <svg
      className="absolute top-0 left-1/2 -translate-x-1/2 z-[40] pointer-events-none"
      style={{
        width: "440px",
        height: "300px",
        filter: "drop-shadow(0 6px 30px rgba(201,168,76,0.28))",
      }}
      viewBox="0 0 400 300"
      fill="none"
    >
      <defs>
        {/* Rod */}
        <linearGradient id="ch-rod" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="#111008" />
          <stop offset="45%"  stopColor="#C9A84C" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#111008" />
        </linearGradient>

        {/* Crown column */}
        <linearGradient id="ch-crown" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="#1a1408" />
          <stop offset="30%"  stopColor="#C9A84C" stopOpacity="0.55" />
          <stop offset="70%"  stopColor="#C9A84C" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#1a1408" />
        </linearGradient>

        {/* Arm metal */}
        <linearGradient id="ch-arm" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#C9A84C" stopOpacity="0.75" />
          <stop offset="100%" stopColor="#7a5a10" stopOpacity="0.35" />
        </linearGradient>

        {/* Candle flame */}
        <radialGradient id="ch-flame" cx="50%" cy="35%">
          <stop offset="0%"   stopColor="#fffde0" stopOpacity="1" />
          <stop offset="30%"  stopColor="#FFE89A" stopOpacity="0.95" />
          <stop offset="70%"  stopColor="#E8A020" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#8B4500" stopOpacity="0.1" />
        </radialGradient>

        {/* Crystal */}
        <radialGradient id="ch-crystal" cx="30%" cy="22%">
          <stop offset="0%"   stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="35%"  stopColor="#E8D5A0" stopOpacity="0.80" />
          <stop offset="75%"  stopColor="#C9A84C" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#7a5010" stopOpacity="0.20" />
        </radialGradient>

        {/* Pendant */}
        <radialGradient id="ch-pendant" cx="28%" cy="24%">
          <stop offset="0%"   stopColor="#fffef5" stopOpacity="1" />
          <stop offset="30%"  stopColor="#FFE89A" stopOpacity="0.95" />
          <stop offset="65%"  stopColor="#C9A84C" stopOpacity="0.65" />
          <stop offset="100%" stopColor="#8a5500" stopOpacity="0.25" />
        </radialGradient>

        {/* Down beam */}
        <linearGradient id="ch-beam" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="rgba(201,168,76,0.38)" />
          <stop offset="55%"  stopColor="rgba(201,168,76,0.07)" />
          <stop offset="100%" stopColor="rgba(201,168,76,0.00)" />
        </linearGradient>

        {/* Blur filters */}
        <filter id="ch-halo" x="-120%" y="-120%" width="340%" height="340%">
          <feGaussianBlur stdDeviation="4" />
        </filter>
        <filter id="ch-halo-lg" x="-150%" y="-150%" width="400%" height="400%">
          <feGaussianBlur stdDeviation="7" />
        </filter>
      </defs>

      {/* ── CEILING ROD ── */}
      <rect x={cx - 3.5} y={rodTop} width={7} height={rodBot - rodTop}
        fill="url(#ch-rod)" rx="2.5" />
      <rect x={cx - 1} y={rodTop + 4} width={2} height={rodBot - rodTop - 8}
        fill="rgba(255,255,200,0.10)" rx="1" />

      {/* ── TOP MOUNTING DISC ── */}
      <ellipse cx={cx} cy={rodBot} rx={26} ry={6}
        fill="#181410" stroke="#C9A84C" strokeWidth="1.3" />
      <ellipse cx={cx} cy={rodBot} rx={16} ry={3.5}
        fill="none" stroke="#C9A84C" strokeWidth="0.5" opacity={0.4} />

      {/* ── CROWN — decorative column ── */}
      {/* Taper to crown */}
      <path d={`M${cx - 14} ${crownTop} L${cx - 20} ${crownTop + 12} L${cx + 20} ${crownTop + 12} L${cx + 14} ${crownTop} Z`}
        fill="url(#ch-crown)" stroke="#C9A84C" strokeWidth="1" />
      {/* Main barrel */}
      <rect x={cx - 20} y={crownTop + 11} width={40} height={18}
        fill="url(#ch-crown)" stroke="#C9A84C" strokeWidth="1" rx="1.5" />
      {/* Decorative rings on barrel */}
      {[4, 9, 14].map((dy, i) => (
        <line key={i}
          x1={cx - 20} y1={crownTop + 11 + dy}
          x2={cx + 20} y2={crownTop + 11 + dy}
          stroke="#C9A84C" strokeWidth="0.5" opacity={0.28} />
      ))}
      {/* Flared base */}
      <path d={`M${cx - 20} ${crownBot - 4} L${cx - 28} ${crownBot + 6} L${cx + 28} ${crownBot + 6} L${cx + 20} ${crownBot - 4} Z`}
        fill="url(#ch-crown)" stroke="#C9A84C" strokeWidth="1" />
      {/* Base disc */}
      <ellipse cx={cx} cy={crownBot + 6} rx={28} ry={6}
        fill="#181410" stroke="#C9A84C" strokeWidth="1.2" />

      {/* ── TIER-1 ARMS (inner, shortest) ── */}
      {t1.map((a, i) => (
        <path key={i}
          d={arm(a.cx + cx, a.cy, ringY1 - 2)}
          stroke="url(#ch-arm)" strokeWidth="2" strokeLinecap="round" />
      ))}
      {t1.map((a, i) => renderCandle(a.cx + cx, a.cy + 2, i * 0.28, 1))}

      {/* ── Horizontal ring / bobeche band T1 ── */}
      <line x1={t1[0].cx + cx} y1={ringY1 + 2} x2={t1[1].cx + cx} y2={ringY1 + 2}
        stroke="#C9A84C" strokeWidth="0.6" opacity={0.22} strokeDasharray="3 5" />

      {/* ── TIER-2 ARMS ── */}
      {t2.map((a, i) => (
        <path key={i}
          d={arm(a.cx + cx, a.cy, ringY2 - 2)}
          stroke="url(#ch-arm)" strokeWidth="1.7" strokeLinecap="round" />
      ))}
      {t2.map((a, i) => renderCandle(a.cx + cx, a.cy + 2, 0.5 + i * 0.22, 0.9))}

      {/* ── Swag chains between tier-2 arm tips ── */}
      {/* outer-left to inner-left */}
      <path d={swag(t2[0].cx + cx, t2[1].cx + cx, t2[0].cy + 8, 14)}
        stroke="#C9A84C" strokeWidth="0.5" opacity={0.25} strokeDasharray="2 3" />
      <path d={swag(t2[2].cx + cx, t2[3].cx + cx, t2[3].cy + 8, 14)}
        stroke="#C9A84C" strokeWidth="0.5" opacity={0.25} strokeDasharray="2 3" />

      {/* ── TIER-3 ARMS (outer, longest) ── */}
      {t3.map((a, i) => (
        <path key={i}
          d={arm(a.cx + cx, a.cy, ringY3 - 2)}
          stroke="url(#ch-arm)" strokeWidth="1.4" strokeLinecap="round" />
      ))}
      {t3.map((a, i) => renderCandle(a.cx + cx, a.cy + 2, 1.0 + i * 0.18, 0.82))}

      {/* ── Bottom ring band ── */}
      <ellipse cx={cx} cy={ringY3 + 2} rx={92} ry={5}
        fill="none" stroke="#C9A84C" strokeWidth="0.8" opacity={0.3} />

      {/* ── CRYSTAL DROPS from bottom ring ── */}
      {[
        { x: cx - 80, len: 14, r: 2.2, delay: 0.0 },
        { x: cx - 60, len: 20, r: 2.8, delay: 0.2 },
        { x: cx - 38, len: 26, r: 3.2, delay: 0.4 },
        { x: cx - 16, len: 30, r: 3.6, delay: 0.6 },
        { x: cx,      len: 34, r: 4.0, delay: 0.8 },
        { x: cx + 16, len: 30, r: 3.6, delay: 1.0 },
        { x: cx + 38, len: 26, r: 3.2, delay: 1.2 },
        { x: cx + 60, len: 20, r: 2.8, delay: 1.4 },
        { x: cx + 80, len: 14, r: 2.2, delay: 1.6 },
      ].map((d) => renderDrop(d.x, dropRoot, d.len, d.r, d.delay, "anim-bob"))}

      {/* ── CENTRAL PENDANT WIRE ── */}
      <line x1={cx} y1={crownBot + 6} x2={cx} y2={pendantY - 12}
        stroke="#C9A84C" strokeWidth="0.65" opacity={0.30} />

      {/* ── LARGE CENTRE PENDANT ── */}
      {/* Outer glow */}
      <circle cx={cx} cy={pendantY + 4} r={22}
        fill="#FFE89A" opacity={0.16} filter="url(#ch-halo-lg)"
        className="anim-pulse-slow gpu-promote" />
      {/* Teardrop crystal */}
      <path
        d={`M${cx} ${pendantY - 12}
            C${cx - 13} ${pendantY - 12}
             ${cx - 13} ${pendantY + 14}
             ${cx}      ${pendantY + 22}
            C${cx + 13} ${pendantY + 14}
             ${cx + 13} ${pendantY - 12}
             ${cx}      ${pendantY - 12} Z`}
        fill="url(#ch-pendant)"
        stroke="#C9A84C" strokeWidth="1"
        className="anim-pulse gpu-promote"
        style={{ filter: "drop-shadow(0 0 10px rgba(201,168,76,0.65))" }}
      />
      {/* Specular highlights */}
      <ellipse cx={cx - 4} cy={pendantY - 2} rx={3} ry={5}
        fill="rgba(255,255,245,0.85)" />
      <ellipse cx={cx - 2} cy={pendantY + 8} rx={1.2} ry={1.8}
        fill="rgba(255,255,245,0.5)" />

      {/* ── DOWN-LIGHT CONE ── */}
      <path
        d={`M${cx - 18} ${pendantY + 22} L${cx + 18} ${pendantY + 22} L${cx + 65} 298 L${cx - 65} 298 Z`}
        fill="url(#ch-beam)"
        className="anim-pulse-slow gpu-promote"
        style={{ mixBlendMode: "screen" }}
      />
    </svg>
  );
}
