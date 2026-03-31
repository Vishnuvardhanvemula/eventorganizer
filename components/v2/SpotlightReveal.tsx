"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useSpring, useMotionTemplate } from "framer-motion";

export function SpotlightReveal() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Initialize mouse coordinates relative to container
  const mouseX = useSpring(0, { stiffness: 400, damping: 30 });
  const mouseY = useSpring(0, { stiffness: 400, damping: 30 });
  
  // Spotlight physics state
  const [isHovered, setIsHovered] = useState(false);
  const spotlightRadius = useSpring(0, { stiffness: 200, damping: 40 });
  
  useEffect(() => {
    spotlightRadius.set(isHovered ? 450 : 0);
  }, [isHovered, spotlightRadius]);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const { left, top } = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  };

  const maskImage = useMotionTemplate`radial-gradient(${spotlightRadius}px circle at ${mouseX}px ${mouseY}px, black 30%, transparent 80%)`;

  return (
    <section 
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
      className="relative w-full h-[100vh] bg-[#050505] overflow-hidden flex items-center justify-center border-t border-[#111] cursor-crosshair"
    >
      {/* 2. Base layer (Pitch Black + Minimal Instruction) */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
        <h3 className={`font-sans text-[10px] md:text-sm tracking-[0.5em] uppercase text-[#333] transition-opacity duration-1000 ${isHovered ? 'opacity-0' : 'opacity-100'}`}>
          Engage To Ignite
        </h3>
      </div>

      {/* 1. Underlying Breathtaking Image (Revealed by mask) */}
      <motion.div 
        className="absolute inset-0 bg-cover bg-center z-10 pointer-events-none"
        style={{ 
           backgroundImage: "url('https://images.unsplash.com/photo-1549451371-64aa98a6f660?q=100&w=2000')", // Concert intense lasers/lighting
           maskImage: maskImage,
           WebkitMaskImage: maskImage,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        
        {/* Overlay texts strictly visible ONLY when Spotlight shines on them */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
          <h2 className="font-sans text-[4rem] md:text-[9rem] text-white leading-[0.85] tracking-tighter font-black uppercase drop-shadow-[0_0_40px_rgba(0,0,0,1)] text-center">
            You dictate <br />
            <span className="text-[#F3F3F3] opacity-90 drop-shadow-[0_0_40px_rgba(0,0,0,1)]">the atmosphere.</span>
          </h2>
        </div>
      </motion.div>
      
      {/* 35mm global grain to unify with V2 Lookbook */}
      <div 
        className="absolute inset-0 z-20 opacity-[0.06] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </section>
  );
}
