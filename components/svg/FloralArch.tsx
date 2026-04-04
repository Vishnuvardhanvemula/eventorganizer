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

  const pop: Variants = {
    hidden: { scale: 0, opacity: 0 },
    show: { scale: 1, opacity: 1, transition: { duration: 1.5, ease: "easeOut", delay: index * 0.1 + 1 } }
  };

  return (
    <motion.svg
      initial="hidden"
      animate="show"
      className="absolute bottom-4 left-1/2 -translate-x-1/2 z-15 w-80 h-96 opacity-95 pointer-events-none"
      viewBox="0 0 300 300"
      fill="none"
    >
      {/* Structural Arch Framework */}
      <motion.path 
        variants={draw} 
        d="M50 300 L50 150 C50 50 250 50 250 150 L250 300" 
        stroke="#C9A84C" strokeWidth="8" strokeLinecap="round" opacity="0.3" 
      />
      
      {/* Organic Ivy Wrapping Sequence */}
      <motion.path 
        variants={draw} 
        d="M35 300 C80 260 20 220 65 180 C110 140 30 90 90 60 C150 30 220 50 210 90 C200 130 270 180 240 220 C210 260 265 300 265 300" 
        stroke="#C9A84C" strokeWidth="2.5" fill="none" opacity="0.8" 
      />
      <motion.path 
        variants={draw} 
        d="M65 300 C20 250 80 200 35 150 C-10 100 100 30 150 35 C200 40 280 70 265 120 C250 170 280 230 235 280" 
        stroke="#C9A84C" strokeWidth="1.5" fill="none" opacity="0.5" strokeDasharray="6 4"
      />

      {/* Complex Asymmetric Floral Clusters */}
      <motion.g variants={pop} style={{ originX: "60px", originY: "150px" }}>
        {/* Blush / Pearl Blooms */}
        <path d="M60 150 C40 130 80 120 75 160 C70 180 50 170 60 150Z" fill="#B76E79" stroke="#C9A84C" strokeWidth="1.5" />
        <path d="M60 150 C30 160 40 190 70 170 C90 150 60 130 60 150Z" fill="#F8F8F6" stroke="#C9A84C" strokeWidth="2" />
      </motion.g>

      <motion.g variants={pop} style={{ originX: "100px", originY: "70px" }}>
        {/* Large Corner Bloom */}
        <path d="M100 70 C70 40 120 20 125 60 C130 90 80 100 100 70Z" fill="#E5E4E2" stroke="#C9A84C" strokeWidth="2" />
        <path d="M100 70 C70 90 100 120 130 90 C150 70 110 50 100 70Z" fill="#B76E79" stroke="#C9A84C" strokeWidth="2.5" />
        <path d="M100 70 C80 60 90 40 110 50 C120 60 110 80 100 70Z" fill="none" stroke="#C9A84C" strokeWidth="1.5" />
      </motion.g>

      <motion.g variants={pop} style={{ originX: "180px", originY: "50px" }}>
        <path d="M180 50 C160 30 200 10 210 40 C220 70 170 80 180 50Z" fill="#F8F8F6" stroke="#C9A84C" strokeWidth="2" />
        <path d="M180 50 C150 60 180 90 210 70 C230 50 190 30 180 50Z" fill="#B76E79" stroke="#C9A84C" strokeWidth="1.5" />
      </motion.g>

      <motion.g variants={pop} style={{ originX: "240px", originY: "180px" }}>
        <path d="M240 180 C210 160 260 140 260 190 C260 220 220 210 240 180Z" fill="#E5E4E2" stroke="#C9A84C" strokeWidth="2" />
        <path d="M240 180 C220 200 250 230 270 200 C290 170 250 160 240 180Z" fill="#B76E79" stroke="#C9A84C" strokeWidth="1.5" />
      </motion.g>

      {/* Hanging Amaranthus (Cascading linear florals) */}
      <motion.path 
        variants={draw} d="M110 80 Q115 110 105 140 T115 190" 
        stroke="#C9A84C" strokeWidth="2" fill="none" strokeLinecap="round" strokeDasharray="3 6"
      />
      <motion.path 
        variants={draw} d="M190 70 Q180 120 195 160 T185 220" 
        stroke="#C9A84C" strokeWidth="2" fill="none" strokeLinecap="round" strokeDasharray="4 8"
      />
      
      {/* Dynamic drifting leaves */}
      <motion.path 
        d="M130 60 Q140 40 150 60 Q140 70 130 60Z" 
        fill="none" stroke="#C9A84C" strokeWidth="1.5"
        animate={{ y: [0, -10, 0], rotate: [0, 15, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.svg>
  );
}