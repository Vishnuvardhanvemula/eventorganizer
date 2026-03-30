import { motion, Variants } from "framer-motion";

export function Monogram({ index }: { index: number }) {
  const draw: Variants = {
    hidden: { pathLength: 0, opacity: 0 },
    show: { 
      pathLength: 1, 
      opacity: 0.8, 
      transition: { duration: 2, ease: "easeInOut", delay: index * 0.1 } 
    }
  };

  return (
    <motion.svg
      initial="hidden"
      animate="show"
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[4] w-80 h-80 pointer-events-none"
      viewBox="0 0 300 300"
      fill="none"
    >
      <motion.circle variants={draw} cx="150" cy="150" r="140" stroke="#C9A84C" strokeWidth="2.5" fill="none" />
      
      {/* Pulsing inner dashed ring */}
      <motion.circle 
        variants={draw} 
        cx="150" cy="150" r="120" stroke="#C9A84C" strokeWidth="1.5" strokeDasharray="5 5" fill="none" 
      />
      <motion.circle 
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        cx="150" cy="150" r="120" stroke="#C9A84C" strokeWidth="2" strokeDasharray="20 40" fill="none" opacity="0.4"
        style={{ originX: "150px", originY: "150px" }}
      />

      <motion.text 
        initial={{ opacity: 0, filter: "blur(10px)" }}
        animate={{ opacity: [0.8, 1, 0.8], filter: ["blur(0px)", "blur(2px)", "blur(0px)"] }}
        transition={{ 
          opacity: { delay: 1.5, duration: 3, repeat: Infinity, ease: "easeInOut" },
          filter: { delay: 1.5, duration: 3, repeat: Infinity, ease: "easeInOut" }
        }}
        x="150" y="180" fill="#C9A84C" fontSize="100" fontFamily="serif" textAnchor="middle"
      >
        E
      </motion.text>
    </motion.svg>
  );
}