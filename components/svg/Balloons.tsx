import { motion, Variants } from "framer-motion";

export function Balloons({ index }: { index: number }) {
  const draw: Variants = {
    hidden: { pathLength: 0, opacity: 0, scale: 0.8 },
    show: { 
      pathLength: 1, 
      opacity: 1,
      scale: 1,
      transition: { duration: 1.5, ease: "easeOut", delay: index * 0.1 } 
    }
  };

  return (
    <motion.svg
      initial="hidden"
      animate="show"
      className="absolute bottom-6 left-8 md:left-12 z-30 w-40 h-48 md:h-56"
      viewBox="0 0 150 200"
      fill="none"
    >
      {/* Balloon strings anchored */}
      <motion.path variants={draw} d="M75 200 Q70 140 50 100" stroke="#C9A84C" strokeWidth="1" opacity="0.4" />
      <motion.path variants={draw} d="M75 200 Q80 140 100 110" stroke="#C9A84C" strokeWidth="1" opacity="0.4" />
      <motion.path variants={draw} d="M75 200 Q75 160 75 120" stroke="#C9A84C" strokeWidth="1" opacity="0.4" />

      {/* Organic floating balloons */}
      <motion.g
        initial={{ y: 0, rotate: -2 }}
        animate={{ y: [-5, 5, -5], rotate: [2, -2, 2] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        style={{ originX: "75px", originY: "200px" }}
      >
        <motion.circle variants={draw} cx="50" cy="100" r="20" stroke="#C9A84C" strokeWidth="2.5" fill="#FFFFFF" />
        <motion.circle variants={draw} cx="100" cy="110" r="25" stroke="#C9A84C" strokeWidth="2" fill="#FCFAF5" opacity="0.9" />
        <motion.circle variants={draw} cx="75" cy="120" r="18" stroke="#C9A84C" strokeWidth="3" fill="none" opacity="0.7" />
        <motion.circle variants={draw} cx="65" cy="80" r="22" stroke="#C9A84C" strokeWidth="2.5" fill="#FFFFFF" />
        <motion.circle variants={draw} cx="110" cy="85" r="16" stroke="#C9A84C" strokeWidth="2" fill="none" />
      </motion.g>
    </motion.svg>
  );
}