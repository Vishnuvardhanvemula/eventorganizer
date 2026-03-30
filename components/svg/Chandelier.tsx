import { motion, Variants } from "framer-motion";

export function Chandelier({ index }: { index: number }) {
  const draw: Variants = {
    hidden: { pathLength: 0, opacity: 0 },
    show: { 
      pathLength: 1, 
      opacity: 1, 
      transition: { duration: 2, ease: "easeInOut", delay: index * 0.1 } 
    }
  };

  const spin: Variants = {
    hidden: { rotateY: 0, opacity: 0 },
    show: { 
      rotateY: 360, 
      opacity: 1,
      transition: { 
        rotateY: { duration: 20, repeat: Infinity, ease: "linear" },
        opacity: { duration: 1, delay: 1 }
      }
    }
  };

  return (
    <motion.svg
      initial="hidden"
      animate="show"
      className="absolute top-8 left-1/2 -translate-x-1/2 z-[40] w-48 md:w-56 h-[300px] pointer-events-none"
      viewBox="0 0 200 300"
      fill="none"
    >
      {/* Structural Suspension Truss / Hanging Chains */}
      <motion.path variants={draw} d="M100 0 L100 80" stroke="#C9A84C" strokeWidth="4" />
      <motion.path variants={draw} d="M80 0 L80 120 M120 0 L120 120" stroke="#C9A84C" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.6" />
      <motion.path variants={draw} d="M60 0 L60 140 M140 0 L140 140" stroke="#C9A84C" strokeWidth="1" strokeDasharray="2 6" opacity="0.3" />

      {/* Kinetic Geometric Shard Clusters */}
      <motion.g 
        variants={spin} 
        style={{ transformOrigin: "100px 150px" }}
      >
        {/* Central Core Bezel */}
        <motion.path d="M100 80 L130 150 L100 220 L70 150 Z" stroke="#C9A84C" strokeWidth="2.5" fill="var(--color-bg-primary)" />
        <motion.path d="M100 80 L100 220 M70 150 L130 150" stroke="#C9A84C" strokeWidth="1" opacity="0.5" />
        
        {/* Layer 2: Shifting Outer Diamond Framework */}
        <motion.path 
          d="M100 100 L150 150 L100 200 L50 150 Z" 
          stroke="#C9A84C" strokeWidth="1.5" fill="none"
          animate={{ rotateY: [-360, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "100px 150px" }}
        />
        
        {/* Layer 3: Inner Micro Crystal Lattice */}
        <motion.path 
          d="M100 120 L115 150 L100 180 L85 150 Z" 
          stroke="#C9A84C" strokeWidth="2" fill="var(--color-bg-secondary)"
          animate={{ rotateY: [0, 360] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "100px 150px" }}
        />
      </motion.g>

      {/* Staggered Light Rays from the Chandelier */}
      <motion.g
        initial={{ opacity: 0, scaleY: 0 }}
        animate={{ opacity: [0.1, 0.5, 0.1], scaleY: 1 }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        style={{ transformOrigin: "100px 220px" }}
      >
        <path d="M100 220 L40 300 L160 300 Z" fill="url(#chandelier-glow)" />
      </motion.g>

      {/* Ambient Halo behind the light */}
      <motion.circle 
        cx="100" cy="150" r="80" 
        fill="#C9A84C" 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: [0, 0.05, 0], scale: [0.8, 1.2, 0.8] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
      
      <defs>
        <linearGradient id="chandelier-glow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#C9A84C" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#C9A84C" stopOpacity="0" />
        </linearGradient>
      </defs>
    </motion.svg>
  );
}
