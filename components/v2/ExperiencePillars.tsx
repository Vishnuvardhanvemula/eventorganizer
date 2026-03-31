"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const pillars = [
  {
    id: "wedding",
    title: "Elegant Unions",
    subtitle: "A seamless, architectural standard for luxury weddings.",
    image: "https://images.unsplash.com/photo-1543888554-1bba8cffd6e9?q=80&w=2000",
  },
  {
    id: "corporate",
    title: "Brand Activations",
    subtitle: "Professional, impactful, and precisely executed environments.",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=100&w=2000",
  },
  {
    id: "gala",
    title: "Monumental Galas",
    subtitle: "High-end production for world-class non-profits and milestones.",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=100&w=2000",
  }
];

export function ExperiencePillars() {
  const containerRef = useRef(null);
  
  // Creates a sticky section that scrolls horizontally while tracking vertical scroll
  const { scrollYProgress } = useScroll({ 
    target: containerRef,
    offset: ["start start", "end end"] 
  });
  const x = useTransform(scrollYProgress, [0, 1], ["0vw", "-200vw"]);

  // Internal Parallax for images moving opposite to horizontal scroll
  const imageX = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  return (
    <section ref={containerRef} className="relative h-[300vh] bg-[#0A0A0A]">
      <div className="sticky top-0 h-screen overflow-hidden flex items-center">
        
        {/* Massive background ticker text */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[300vw] pointer-events-none z-0 px-16 opacity-[0.02]">
          <h2 className="font-serif text-[clamp(10rem,25vw,30rem)] leading-none whitespace-nowrap text-white tracking-tighter">
             {pillars.map(p => p.title).join(" · ")}
          </h2>
        </div>

        {/* Horizontal Scrolling Gallery */}
        <motion.div style={{ x }} className="flex h-[80vh] md:h-[85vh] w-[300vw] items-center relative z-10 transition-transform duration-100 ease-linear">
          {pillars.map((pillar, i) => (
            <div key={i} className="relative w-[100vw] px-6 md:px-16 h-full flex flex-col justify-end overflow-hidden group">
              
              <div className="relative w-full h-full rounded-md overflow-hidden bg-black">
                {/* Background Cover with internal Parallax */}
                <motion.div 
                  style={{ x: imageX }}
                  className="absolute -inset-[20%] w-[140%] h-[140%] bg-cover bg-center transform group-hover:scale-[1.03] transition-transform duration-[2s] ease-[0.22,1,0.36,1]"
                >
                  <div 
                    className="w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: `url('${pillar.image}')` }}
                  />
                </motion.div>
                
                {/* 35mm Grain over image */}
                <div 
                  className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none mix-blend-overlay"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                  }}
                />

                {/* Gradient Shadows */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/20 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/80 via-transparent to-transparent opacity-60" />
                
                {/* Typography */}
                <div className="absolute bottom-0 left-0 p-8 md:p-16 w-full max-w-4xl">
                  <span className="font-sans text-[10px] md:text-xs tracking-[0.4em] uppercase text-[#C9A84C] block mb-6 font-semibold">
                    0{i + 1} / Collection
                  </span>
                  
                  <div className="overflow-hidden pb-4 mb-0">
                    <h3 className="font-serif text-5xl md:text-[7rem] text-[#F3F3F3] tracking-tighter leading-[0.9] transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500 ease-[0.22,1,0.36,1]">
                      {pillar.title}
                    </h3>
                  </div>
                  
                  <div className="overflow-hidden pb-4 -mb-4">
                    <p className="font-sans text-base md:text-xl text-[#A0A0A0] max-w-xl opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-700 ease-[0.22,1,0.36,1]">
                      {pillar.subtitle}
                    </p>
                  </div>
                </div>
              </div>

            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
