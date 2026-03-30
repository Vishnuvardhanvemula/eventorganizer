import { motion, Variants } from "framer-motion";

export function Podium({ index }: { index: number }) {
  const draw: Variants = {
    hidden: { pathLength: 0, opacity: 0 },
    show: { 
      pathLength: 1, 
      opacity: 1, 
      transition: { duration: 1.5, ease: "easeInOut", delay: index * 0.1 } 
    }
  };

  return (
    <motion.svg
      initial="hidden"
      animate="show"
      className="absolute bottom-16 left-1/2 -translate-x-1/2 z-[25] w-28 h-40"
      viewBox="0 0 100 160"
      fill="none"
    >
      <motion.rect variants={draw} x="10" y="150" width="80" height="10" rx="2" stroke="#C9A84C" strokeWidth="2.5" fill="#FFFFFF" />
      
      {/* Front Face */}
      <motion.path variants={draw} d="M20 30 L80 30 L90 150 L10 150 Z" stroke="#C9A84C" strokeWidth="2.5" fill="#FFFFFF" />
      
      {/* Dynamic shimmer on the front face */}
      <motion.path 
        initial={{ opacity: 0, fillOpacity: 0 }}
        animate={{ opacity: 1, fillOpacity: [0.05, 0.2, 0.05] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        d="M20 30 L80 30 L90 150 L10 150 Z" 
        fill="#C9A84C" stroke="none" 
      />

      {/* Top Face */}
      <motion.path variants={draw} d="M10 20 L90 20 L80 30 L20 30 Z" stroke="#C9A84C" strokeWidth="2.5" fill="#FCFAF5" />
      
      {/* Mic Line */}
      <motion.rect variants={draw} x="48" y="0" width="4" height="20" fill="#C9A84C" />
      <motion.circle variants={draw} cx="50" cy="0" r="4" fill="#C9A84C" />
    </motion.svg>
  );
}