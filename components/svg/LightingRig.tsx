import { motion, Variants } from "framer-motion";

export function LightingRig({ index }: { index: number }) {
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
      className="absolute top-0 left-1/2 -translate-x-1/2 z-30 w-full max-w-4xl h-80 pointer-events-none"
      viewBox="0 0 800 300"
      fill="none"
    >
      {/* Top Truss Beam structure */}
      <motion.rect variants={draw} x="0" y="10" width="800" height="24" stroke="#C9A84C" strokeWidth="2.5" fill="#FCFAF5" />
      <motion.path variants={draw} d="M0 10 L800 34 M0 34 L800 10" stroke="#C9A84C" strokeWidth="1.5" />
      
      {/* Continuous X-Bracing across the beam */}
      <motion.g variants={draw} stroke="#C9A84C" strokeWidth="1" opacity="0.6">
        {Array.from({ length: 40 }).map((_, i) => (
          <path key={i} d={`M${i * 20} 10 L${(i + 1) * 20} 34 M${i * 20} 34 L${(i + 1) * 20} 10`} />
        ))}
      </motion.g>

      {/* Vertical Support Legs */}
      <motion.rect variants={draw} x="0" y="34" width="16" height="250" stroke="#C9A84C" strokeWidth="2" fill="#FCFAF5" />
      <motion.g variants={draw} stroke="#C9A84C" strokeWidth="1" opacity="0.6">
        {Array.from({ length: 12 }).map((_, i) => (
          <path key={`L${i}`} d={`M0 ${34 + i * 20.8} L16 ${34 + (i + 1) * 20.8} M0 ${34 + (i + 1) * 20.8} L16 ${34 + i * 20.8}`} />
        ))}
      </motion.g>

      <motion.rect variants={draw} x="784" y="34" width="16" height="250" stroke="#C9A84C" strokeWidth="2" fill="#FCFAF5" />
      <motion.g variants={draw} stroke="#C9A84C" strokeWidth="1" opacity="0.6">
        {Array.from({ length: 12 }).map((_, i) => (
          <path key={`R${i}`} d={`M784 ${34 + i * 20.8} L800 ${34 + (i + 1) * 20.8} M784 ${34 + (i + 1) * 20.8} L800 ${34 + i * 20.8}`} />
        ))}
      </motion.g>

      {/* Moving Head Lights */}
      {[100, 250, 400, 550, 700].map((x, i) => (
        <g key={`head-${i}`}>
          <motion.rect variants={draw} x={x - 12} y="34" width="24" height="15" stroke="#C9A84C" strokeWidth="2" fill="#FFFFFF" />
          <motion.path variants={draw} d={`M${x - 16} 49 L${x + 16} 49 L${x + 10} 65 L${x - 10} 65 Z`} stroke="#C9A84C" strokeWidth="2.5" fill="#FCFAF5" />
          <motion.circle variants={draw} cx={x} cy="65" r="8" stroke="#C9A84C" strokeWidth="2" fill="#FCFAF5" strokeDasharray="2 2" />
          
          {/* Animated Sweeping Light Beams */}
          <motion.g
            initial={{ rotate: -10, opacity: 0 }}
            animate={{ rotate: 10, opacity: 0.12 }}
            transition={{ 
              rotate: { duration: 3.5 + (i % 2 === 0 ? 0.5 : 0), repeat: Infinity, repeatType: "reverse", ease: "easeInOut" },
              opacity: { delay: 1.5, duration: 2 }
            }}
            style={{ originX: `${x}px`, originY: '65px' }}
          >
            <motion.path 
              d={`M${x - 10} 65 L${x - 120} 500 L${x + 120} 500 L${x + 10} 65 Z`} 
              fill="#C9A84C" 
            />
          </motion.g>
        </g>
      ))}
    </motion.svg>
  );
}