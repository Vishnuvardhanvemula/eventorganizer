import { motion, Variants } from "framer-motion";

export function Balloons({ index }: { index: number }) {
  const draw: Variants = {
    hidden: { scale: 0, opacity: 0 },
    show: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        duration: 1.5, 
        ease: [0.6, 0.05, -0.01, 0.9], 
        delay: index * 0.1 
      } 
    }
  };

  const balloons = [
    { cx: 20, cy: 160, r: 14 }, { cx: 35, cy: 150, r: 22 }, { cx: 25, cy: 130, r: 16 },
    { cx: 55, cy: 140, r: 28 }, { cx: 45, cy: 125, r: 20 }, { cx: 75, cy: 130, r: 24 },
    { cx: 65, cy: 110, r: 18 }, { cx: 90, cy: 115, r: 20 }, { cx: 80, cy: 95, r: 26 },
    { cx: 105, cy: 100, r: 22 }, { cx: 125, cy: 90, r: 18 }, { cx: 110, cy: 75, r: 24 },
    { cx: 140, cy: 75, r: 20 }, { cx: 130, cy: 60, r: 16 }, { cx: 155, cy: 55, r: 22 },
    { cx: 145, cy: 40, r: 18 }, { cx: 170, cy: 35, r: 15 }, { cx: 160, cy: 20, r: 12 },
  ];

  return (
    <motion.svg
      className="absolute bottom-16 left-6 md:left-10 z-30 w-56 h-64 md:w-64 md:h-72 pointer-events-none"
      viewBox="0 0 200 200"
      fill="none"
    >
      <motion.g
        initial={{ y: 0 }}
        animate={{ y: [-3, 3, -3] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        {balloons.map((b, i) => (
          <motion.circle 
            key={i} 
            variants={draw} 
            initial="hidden"
            animate="show"
            custom={i}
            cx={b.cx} cy={b.cy} r={b.r} 
            stroke="#C9A84C" strokeWidth={i % 3 === 0 ? "2.5" : "1.5"} 
            fill={i % 2 === 0 ? "var(--color-bg-primary)" : "var(--color-bg-secondary)"} 
            opacity={i % 4 === 0 ? 0.7 : 1}
            style={{ originX: `${b.cx}px`, originY: `${b.cy}px` }}
          />
        ))}
        {/* Sparkle accents on the garland */}
        <motion.path 
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5], rotate: [0, 90] }}
          transition={{ duration: 3, repeat: Infinity, delay: 1 }}
          d="M 55 120 L 55 110 L 65 120 M 55 120 L 55 130 L 45 120" stroke="#C9A84C" strokeWidth="1.5"
        />
        <motion.path 
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5], rotate: [0, 90] }}
          transition={{ duration: 4, repeat: Infinity, delay: 2.5 }}
          d="M 125 70 L 125 60 L 135 70 M 125 70 L 125 80 L 115 70" stroke="#C9A84C" strokeWidth="1.5"
        />
      </motion.g>
    </motion.svg>
  );
}