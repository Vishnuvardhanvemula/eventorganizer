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
      className="absolute bottom-12 left-1/2 -translate-x-1/2 z-[25] w-48 h-56"
      viewBox="0 0 200 240"
      fill="none"
    >
      <defs>
        <linearGradient id="podium-glow" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#C9A84C" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#C9A84C" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="podium-aura-left" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#C9A84C" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#C9A84C" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="podium-aura-right" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#C9A84C" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#C9A84C" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Floor Uplighting Aura */}
      <motion.path 
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.4, 0.1] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        d="M60 210 L0 50 L90 50 Z"
        fill="url(#podium-aura-left)" 
      />
      <motion.path 
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.4, 0.1] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        d="M140 210 L200 50 L110 50 Z"
        fill="url(#podium-aura-right)" 
      />

      {/* Podium Base */}
      <motion.rect variants={draw} x="50" y="210" width="100" height="12" rx="3" stroke="#C9A84C" strokeWidth="2.5" fill="var(--color-bg-primary)" />
      <motion.rect variants={draw} x="60" y="222" width="80" height="6" rx="2" stroke="#C9A84C" strokeWidth="1.5" fill="var(--color-bg-secondary)" opacity="0.5" />
      
      {/* Front Face / Acrylic Shield */}
      <motion.path variants={draw} d="M70 70 L130 70 L140 210 L60 210 Z" stroke="#C9A84C" strokeWidth="2.5" fill="var(--color-bg-secondary)" />
      
      {/* Dynamic LED Center Spine */}
      <motion.path variants={draw} d="M100 70 L100 210" stroke="var(--color-bg-primary)" strokeWidth="8" />
      <motion.path 
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: [0, 1, 0], opacity: [0, 1, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        d="M100 70 L100 210" 
        stroke="#C9A84C" strokeWidth="4" 
        style={{ filter: "drop-shadow(0px 0px 8px rgba(201,168,76,0.8))" }}
      />
      <motion.path 
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.1, 0.5, 0.1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        d="M70 70 L130 70 L140 210 L60 210 Z" 
        fill="url(#podium-glow)" stroke="none" 
      />

      {/* Top Reading Desk */}
      <motion.path variants={draw} d="M50 50 L150 50 L130 70 L70 70 Z" stroke="#C9A84C" strokeWidth="3" fill="var(--color-bg-primary)" strokeLinejoin="round" />
      <motion.path variants={draw} d="M60 60 L140 60" stroke="#C9A84C" strokeWidth="1" opacity="0.4" />
      
      {/* Dual Gooseneck Mics */}
      <motion.path variants={draw} d="M90 50 C90 30 80 20 80 15" stroke="#C9A84C" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <motion.circle variants={draw} cx="80" cy="12" r="4" fill="#C9A84C" />
      
      <motion.path variants={draw} d="M110 50 C110 30 120 20 120 15" stroke="#C9A84C" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <motion.circle variants={draw} cx="120" cy="12" r="4" fill="#C9A84C" />
    </motion.svg>
  );
}