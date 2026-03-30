import { motion, Variants } from "framer-motion";

export function DJBooth({ index }: { index: number }) {
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
      className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 w-[300px] h-[160px] animate-float"
      viewBox="0 0 300 160"
      fill="none"
    >
      {/* Stereo Speakers */}
      <motion.rect variants={draw} x="10" y="40" width="30" height="90" rx="2" stroke="#C9A84C" strokeWidth="2" fill="#FCFAF5" />
      <motion.circle variants={draw} cx="25" cy="65" r="8" stroke="#C9A84C" strokeWidth="1.5" />
      <motion.circle variants={draw} cx="25" cy="100" r="12" stroke="#C9A84C" strokeWidth="2" />
      
      <motion.rect variants={draw} x="260" y="40" width="30" height="90" rx="2" stroke="#C9A84C" strokeWidth="2" fill="#FCFAF5" />
      <motion.circle variants={draw} cx="275" cy="65" r="8" stroke="#C9A84C" strokeWidth="1.5" />
      <motion.circle variants={draw} cx="275" cy="100" r="12" stroke="#C9A84C" strokeWidth="2" />

      {/* Main DJ Table structure */}
      <motion.rect variants={draw} x="50" y="70" width="200" height="60" rx="4" stroke="#C9A84C" strokeWidth="2.5" fill="#FFFFFF" />
      
      {/* Front Panel Indent */}
      <motion.rect variants={draw} x="60" y="80" width="180" height="40" rx="2" stroke="#C9A84C" strokeWidth="1.5" opacity="0.5" fill="none" />
      
      {/* Glowing LED trim on table bottom */}
      <motion.rect 
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.2, 0.6, 0.2] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        x="60" y="125" width="180" height="2" fill="#C9A84C" 
      />

      {/* Mixer Console */}
      <motion.rect variants={draw} x="125" y="55" width="50" height="30" rx="2" stroke="#C9A84C" strokeWidth="2" fill="#FFFFFF" />
      <motion.path variants={draw} d="M 135 60 L 135 80 M 150 60 L 150 80 M 165 60 L 165 80" stroke="#C9A84C" strokeWidth="2" />
      
      {/* CDJ Turntables */}
      <motion.rect variants={draw} x="75" y="55" width="45" height="30" rx="2" stroke="#C9A84C" strokeWidth="2" fill="#FCFAF5" />
      <motion.circle variants={draw} cx="97.5" cy="70" r="10" stroke="#C9A84C" strokeWidth="2" fill="none" />
      <motion.circle 
        initial={{ r: 5, opacity: 0 }}
        animate={{ r: 12, opacity: [0, 0.4, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        cx="97.5" cy="70" fill="#C9A84C" 
      />

      <motion.rect variants={draw} x="180" y="55" width="45" height="30" rx="2" stroke="#C9A84C" strokeWidth="2" fill="#FCFAF5" />
      <motion.circle variants={draw} cx="202.5" cy="70" r="10" stroke="#C9A84C" strokeWidth="2" fill="none" />
      <motion.circle 
        initial={{ r: 5, opacity: 0 }}
        animate={{ r: 12, opacity: [0, 0.4, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        cx="202.5" cy="70" fill="#C9A84C" 
      />
    </motion.svg>
  );
}