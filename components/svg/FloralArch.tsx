import { motion, Variants } from "framer-motion";

export function FloralArch({ index }: { index: number }) {
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
      className="absolute bottom-4 left-1/2 -translate-x-1/2 z-15 w-80 h-96 opacity-90"
      viewBox="0 0 300 300"
      fill="none"
    >
      {/* Structural Arch */}
      <motion.path 
        variants={draw} 
        d="M50 300 L50 150 C50 50 250 50 250 150 L250 300" 
        stroke="#C9A84C" strokeWidth="8" strokeLinecap="round" opacity="0.3" 
      />
      {/* Vines */}
      <motion.path 
        variants={draw} 
        d="M30 150 Q70 120 70 80 T130 60 Q180 50 210 80 T260 140" 
        stroke="#C9A84C" strokeWidth="2.5" fill="none" opacity="0.6" 
      />
      
      {/* Blooming florals with stagger pulse */}
      <motion.circle variants={draw} cx="50" cy="150" r="16" stroke="#C9A84C" strokeWidth="2.5" fill="#FFFFFF" />
      
      <motion.circle 
        variants={draw} cx="100" cy="90" r="22" stroke="#C9A84C" strokeWidth="2.5" fill="#FCFAF5" 
        animate={{ scale: [1, 1.1, 1] }} 
        transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
      />
      
      <motion.circle 
        variants={draw} cx="150" cy="70" r="28" stroke="#C9A84C" strokeWidth="3" fill="none" 
        animate={{ scale: [1, 1.05, 1], rotate: [0, 10, 0] }} 
        transition={{ duration: 5, repeat: Infinity, delay: 1 }}
      />
      
      <motion.circle variants={draw} cx="200" cy="90" r="18" stroke="#C9A84C" strokeWidth="2.5" fill="#FFFFFF" />
      
      <motion.circle 
        variants={draw} cx="250" cy="160" r="20" stroke="#C9A84C" strokeWidth="2.5" fill="#FCFAF5" 
        animate={{ scale: [1, 1.15, 1] }} 
        transition={{ duration: 3.5, repeat: Infinity, delay: 1.5 }}
      />
    </motion.svg>
  );
}