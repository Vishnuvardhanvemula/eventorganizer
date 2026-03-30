import { motion, Variants } from "framer-motion";

export function LineArrays({ index }: { index: number }) {
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
      className="absolute top-8 left-1/2 -translate-x-1/2 z-30 w-full max-w-4xl h-96 pointer-events-none"
      viewBox="0 0 800 400"
      fill="none"
    >
      {[60, 740].map((x, sideIndex) => (
        <g key={`array-${sideIndex}`}>
          {/* Suspension Rigging / Cables holding the arrays */}
          <motion.path variants={draw} d={`M${x - 10} 0 L${x - 10} 80 M${x + 10} 0 L${x + 10} 80`} stroke="#C9A84C" strokeWidth="1.5" strokeDasharray="3 3" />
          <motion.rect variants={draw} x={x - 20} y="75" width="40" height="10" fill="var(--color-bg-primary)" stroke="#C9A84C" strokeWidth="2" />
          
          {/* Flown Stacked Array Speakers (Hanging downwards) */}
          {[90, 130, 170, 210, 250].map((y, speakerIndex) => {
            const width = 44;
            const height = 35;
            // The J-curve of a line array (gradually angling downwards)
            const angle = speakerIndex * 6; 
            
            return (
              <motion.g 
                key={`speaker-${speakerIndex}`} 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 + speakerIndex * 0.15 }}
                style={{ originX: `${x}px`, originY: `${y}px`, rotate: sideIndex === 0 ? angle : -angle }}
              >
                {/* Speaker Box */}
                <motion.rect 
                  variants={draw} 
                  x={x - width / 2} 
                  y={y - height / 2} 
                  width={width} 
                  height={height} 
                  rx="2" 
                  fill="var(--color-bg-primary)" 
                  stroke="#C9A84C" 
                  strokeWidth="2.5" 
                />
                
                {/* Woofer Grille Inner Bezel */}
                <motion.rect 
                  variants={draw} 
                  x={x - width / 2 + 6} 
                  y={y - height / 2 + 6} 
                  width={width - 12} 
                  height={height - 12} 
                  rx="1" 
                  stroke="#C9A84C" 
                  strokeWidth="1.5" 
                  fill="none" 
                  strokeDasharray="1 2"
                />

                {/* Animated Thumping Core Left/Right Woofers */}
                <motion.circle 
                  initial={{ r: 4, fillOpacity: 0.2 }}
                  animate={{ r: [4, 6, 4], fillOpacity: [0.2, 0.8, 0.2] }}
                  transition={{ duration: 0.5, repeat: Infinity, ease: "easeOut", delay: sideIndex * 0.15 + speakerIndex * 0.05 }}
                  cx={x - 8} 
                  cy={y} 
                  fill="#C9A84C" 
                />
                <motion.circle 
                  initial={{ r: 4, fillOpacity: 0.2 }}
                  animate={{ r: [4, 6, 4], fillOpacity: [0.2, 0.8, 0.2] }}
                  transition={{ duration: 0.5, repeat: Infinity, ease: "easeOut", delay: sideIndex * 0.15 + speakerIndex * 0.05 }}
                  cx={x + 8} 
                  cy={y} 
                  fill="#C9A84C" 
                />
              </motion.g>
            );
          })}
        </g>
      ))}
    </motion.svg>
  );
}

