import { motion, Variants } from "framer-motion";

export function DanceFloor({ index }: { index: number }) {
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
      className="absolute bottom-0 left-1/2 -translate-x-1/2 z-10 w-[800px] h-48 opacity-80"
      viewBox="0 0 800 200"
      fill="none"
    >
      {/* Dynamic central pulse glow (Soft Floor Underglow) */}
      <motion.path 
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.05, 0.25, 0.05] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        d="M150 0 L650 0 L800 200 L0 200 Z" 
        fill="#C9A84C" 
      />

      {/* Main floor tile bounds */}
      <motion.path 
        variants={draw} 
        d="M150 0 L650 0 L800 200 L0 200 Z" 
        fill="var(--color-bg-primary)" 
        stroke="#C9A84C" 
        strokeWidth="3" 
      />
      
      {/* Outer Glow Ring / Extrusion edge */}
      <motion.path variants={draw} d="M140 -5 L660 -5 L810 195 L-10 195 Z" stroke="#C9A84C" strokeWidth="1" opacity="0.3" />

      {/* Perspective Grid lines (Complex) */}
      <motion.g variants={draw} opacity="0.4">
        {/* Vertical Perspective */}
        <motion.path d="M250 0 L150 200" stroke="#C9A84C" strokeWidth="1.5" />
        <motion.path d="M350 0 L300 200" stroke="#C9A84C" strokeWidth="1.5" />
        <motion.path d="M450 0 L500 200" stroke="#C9A84C" strokeWidth="1.5" />
        <motion.path d="M550 0 L650 200" stroke="#C9A84C" strokeWidth="1.5" />
        
        {/* Horizontal Perspective */}
        <motion.path d="M112 50 L687 50" stroke="#C9A84C" strokeWidth="1.5" />
        <motion.path d="M75 100 L725 100" stroke="#C9A84C" strokeWidth="1.5" />
        <motion.path d="M37 150 L762 150" stroke="#C9A84C" strokeWidth="1.5" />
      </motion.g>

      {/* Edge Anchor points */}
      <motion.circle variants={draw} cx="150" cy="0" r="4" fill="#C9A84C" />
      <motion.circle variants={draw} cx="650" cy="0" r="4" fill="#C9A84C" />
      <motion.circle variants={draw} cx="0" cy="200" r="6" fill="var(--color-bg-secondary)" stroke="#C9A84C" strokeWidth="2" />
      <motion.circle variants={draw} cx="800" cy="200" r="6" fill="var(--color-bg-secondary)" stroke="#C9A84C" strokeWidth="2" />
      
    </motion.svg>
  );
}