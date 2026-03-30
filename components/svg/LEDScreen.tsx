import { motion, Variants } from "framer-motion";

export function LEDScreen({ index }: { index: number }) {
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
      className="absolute bottom-24 left-1/2 -translate-x-1/2 z-0 w-[500px] h-[310px]"
      viewBox="0 0 500 310"
      fill="none"
    >
      {/* Rear Structural Trusses (Grounding the screen) */}
      <motion.g variants={draw} stroke="#C9A84C" strokeWidth="1.5" opacity="0.4">
        {/* Left Truss Leg */}
        <motion.path d="M 50 250 L 50 300 M 70 250 L 70 300" />
        <motion.path d="M 50 250 L 70 275 M 50 275 L 70 300 M 70 250 L 50 275 M 70 275 L 50 300" strokeWidth="1" />
        {/* Center-Left Truss Leg */}
        <motion.path d="M 180 250 L 180 300 M 200 250 L 200 300" />
        <motion.path d="M 180 250 L 200 275 M 180 275 L 200 300 M 200 250 L 180 275 M 200 275 L 180 300" strokeWidth="1" />
        {/* Center-Right Truss Leg */}
        <motion.path d="M 300 250 L 300 300 M 320 250 L 320 300" />
        <motion.path d="M 300 250 L 320 275 M 300 275 L 320 300 M 320 250 L 300 275 M 320 275 L 300 300" strokeWidth="1" />
        {/* Right Truss Leg */}
        <motion.path d="M 430 250 L 430 300 M 450 250 L 450 300" />
        <motion.path d="M 430 250 L 450 275 M 430 275 L 450 300 M 450 250 L 430 275 M 450 275 L 430 300" strokeWidth="1" />
      </motion.g>

      {/* Main Outer Frame/Bezel */}
      <motion.rect variants={draw} x="0" y="0" width="500" height="250" stroke="#C9A84C" strokeWidth="4" fill="var(--color-bg-secondary)" rx="2" />
      <motion.rect variants={draw} x="6" y="6" width="488" height="238" stroke="var(--color-bg-primary)" strokeWidth="1.5" fill="none" rx="2" opacity="0.8" />
      
      {/* LED Panel Matrix (Segment Lines) */}
      <motion.g variants={draw} stroke="#C9A84C" strokeWidth="1" opacity="0.2">
        {Array.from({ length: 9 }).map((_, i) => (
          <path key={`v-${i}`} d={`M ${(i + 1) * 50} 0 L ${(i + 1) * 50} 250`} />
        ))}
        {Array.from({ length: 4 }).map((_, i) => (
          <path key={`h-${i}`} d={`M 0 ${(i + 1) * 50} L 500 ${(i + 1) * 50}`} />
        ))}
      </motion.g>

      {/* Inner Screen Surface */}
      <motion.rect variants={draw} x="8" y="8" width="484" height="234" fill="var(--color-bg-primary)" opacity="0.95" />
      
      {/* Animated Visuals inside the LED Screen (Sine Wave / Audio Wave) */}
      <motion.path 
        initial={{ opacity: 0, pathLength: 0 }}
        animate={{ opacity: [0.2, 0.6, 0.2], pathLength: 1 }}
        transition={{ 
          opacity: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 },
          pathLength: { duration: 2, delay: 1, ease: "easeInOut" }
        }}
        d="M 100 220 Q 250 50 400 220"
        stroke="#C9A84C" strokeWidth="3" fill="none"
      />
      
      <motion.path 
        initial={{ opacity: 0, pathLength: 0 }}
        animate={{ opacity: [0.1, 0.4, 0.1], pathLength: 1 }}
        transition={{ 
          opacity: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1.5 },
          pathLength: { duration: 2, delay: 1.5, ease: "easeInOut" }
        }}
        d="M 50 150 Q 250 250 450 150"
        stroke="#C9A84C" strokeWidth="1.5" fill="none"
      />
    </motion.svg>
  );
}