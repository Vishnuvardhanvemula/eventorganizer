import { motion, Variants } from "framer-motion";

export function Lounge({ index }: { index: number }) {
  const draw: Variants = {
    hidden: { pathLength: 0, opacity: 0 },
    show: { 
      pathLength: 1, 
      opacity: 1, 
      transition: { duration: 2, ease: "easeInOut", delay: index * 0.1 } 
    }
  };

  return (
    <motion.svg
      initial="hidden"
      animate="show"
      className="absolute bottom-2 md:bottom-8 -right-4 md:-right-8 z-20 w-64 md:w-72 h-40 md:h-44"
      viewBox="0 0 300 180"
      fill="none"
    >
      {/* Outer Curved Backrest of the Half-Moon Sofa */}
      <motion.path 
        variants={draw} 
        d="M 50 140 C 20 140 20 40 150 40 C 280 40 280 140 250 140" 
        stroke="#C9A84C" strokeWidth="12" strokeLinecap="round" fill="none" opacity="0.9" 
      />
      
      {/* Inner Padding Line */}
      <motion.path 
        variants={draw} 
        d="M 60 140 C 35 140 35 50 150 50 C 265 50 265 140 240 140" 
        stroke="var(--color-bg-primary)" strokeWidth="2" strokeLinecap="round" fill="none" 
      />

      {/* Seat Cushions */}
      <motion.path variants={draw} d="M 65 140 C 45 140 50 80 150 80 C 250 80 255 140 235 140 Z" stroke="#C9A84C" strokeWidth="2.5" fill="var(--color-bg-secondary)" />
      <motion.path variants={draw} d="M 120 80 L 110 140 M 180 80 L 190 140" stroke="#C9A84C" strokeWidth="1.5" opacity="0.4" />
      
      {/* Tufting Buttons on Backrest */}
      {[
        {x: 80, y: 65}, {x: 100, y: 55}, {x: 125, y: 50}, 
        {x: 150, y: 48}, {x: 175, y: 50}, {x: 200, y: 55}, {x: 220, y: 65}
      ].map((pos, i) => (
        <motion.circle key={i} variants={draw} cx={pos.x} cy={pos.y} r="1.5" fill="var(--color-bg-secondary)" stroke="#C9A84C" strokeWidth="1" />
      ))}

      {/* Central Coffee Table Base */}
      <motion.ellipse variants={draw} cx="150" cy="135" rx="25" ry="8" stroke="#C9A84C" strokeWidth="1.5" fill="none" opacity="0.5" />
      <motion.path variants={draw} d="M 140 115 L 125 135 M 160 115 L 175 135 M 150 115 L 150 135" stroke="#C9A84C" strokeWidth="1.5" opacity="0.5" />
      
      {/* Sleek Metallic Coffee Table Top */}
      <motion.ellipse variants={draw} cx="150" cy="115" rx="35" ry="12" stroke="#C9A84C" strokeWidth="2.5" fill="var(--color-bg-primary)" />
      <motion.ellipse variants={draw} cx="150" cy="115" rx="30" ry="8" stroke="#C9A84C" strokeWidth="1" fill="none" opacity="0.3" />

      {/* Decorative Table Centerpiece / Glow */}
      <motion.circle variants={draw} cx="150" cy="110" r="4" stroke="#C9A84C" strokeWidth="1.5" fill="var(--color-bg-secondary)" />
      <motion.path variants={draw} d="M 150 106 L 150 102" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" />
      <motion.circle 
        initial={{ r: 0, opacity: 0 }}
        animate={{ r: 25, opacity: [0, 0.15, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        cx="150" cy="110" fill="#C9A84C"
      />

    </motion.svg>
  );
}