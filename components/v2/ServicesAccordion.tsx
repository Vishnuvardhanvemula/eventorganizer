"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const services = [
  {
    title: "Concert Audio",
    desc: "Premium line-arrays and pristine wireless processing ensuring flawless speech intelligibility and club-standard mixing.",
    image: "https://images.unsplash.com/photo-1598387181032-a3103a2db5b3?q=100&w=2000"
  },
  {
    title: "Video Walls",
    desc: "Monumental high-resolution LED screens, custom motion graphics, and live multi-camera feeds.",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=100&w=2000"
  },
  {
    title: "Theatrical Lighting",
    desc: "Rigorous intelligent lighting design, architectural uplighting, and perfectly cued dramatic atmospheres.",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=100&w=2000"
  },
  {
    title: "Atmosphere",
    desc: "Cinematic fog, indoor-safe cold sparks, and immaculate, seamless luxury dance floors.",
    image: "https://images.unsplash.com/photo-1513151233558-d860c5398176?q=100&w=2000"
  }
];

export function ServicesAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="w-full bg-[#0A0A0A] py-32 border-t border-[#1A1A1A] relative z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-16">
        
        <div className="mb-24 max-w-2xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="font-sans text-[10px] md:text-sm tracking-[0.4em] uppercase text-[#C9A84C] mb-6 flex items-center gap-4 font-semibold"
          >
            <span className="w-8 h-[1px] bg-[#C9A84C]"></span>
            The Arsenal
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-serif text-[3.5rem] md:text-7xl text-[#F3F3F3] leading-[0.9] tracking-tighter"
          >
            Scale requires <br /> absolute control.
          </motion.h2>
        </div>

        <div className="flex flex-col border-t border-[#1A1A1A]">
          {services.map((service, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={i} className="flex flex-col border-b border-[#1A1A1A]">
                {/* Header Row */}
                <button 
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full py-8 md:py-12 flex items-center justify-between group"
                >
                  <h3 className={`font-serif text-4xl md:text-6xl tracking-tighter transition-colors duration-500 text-left ${
                    isOpen ? "text-[var(--color-gold)]" : "text-[#A0A0A0] group-hover:text-white"
                  }`}>
                    {service.title}
                  </h3>
                  <div className={`w-12 h-12 md:w-16 md:h-16 rounded-full border flex items-center justify-center transition-colors duration-500 shrink-0 ${
                    isOpen ? "border-[#C9A84C] text-[#C9A84C] bg-[#C9A84C]/5" : "border-[#333333] text-[#A0A0A0] group-hover:border-white group-hover:text-white"
                  }`}>
                    {isOpen ? <Minus strokeWidth={1} size={24} /> : <Plus strokeWidth={1} size={24} />}
                  </div>
                </button>

                {/* Expanding Image & Description */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial="collapsed"
                      animate="open"
                      exit="collapsed"
                      variants={{
                        open: { opacity: 1, height: "auto" },
                        collapsed: { opacity: 0, height: 0 }
                      }}
                      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pb-12 md:pb-16 flex flex-col md:flex-row gap-8 md:gap-16 pt-4">
                        <div className="w-full md:w-1/3 xl:w-1/4">
                          <p className="font-sans text-base md:text-lg text-[#F3F3F3] leading-relaxed">
                            {service.desc}
                          </p>
                        </div>
                        <div className="w-full md:w-2/3 xl:w-3/4 h-[350px] md:h-[600px] relative rounded-sm overflow-hidden bg-black">
                          <motion.div 
                            initial={{ scale: 1.1 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            className="absolute inset-0 bg-cover bg-center"
                            style={{ backgroundImage: `url('${service.image}')` }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-0" />
                          <div 
                            className="absolute inset-0 z-10 opacity-[0.05] pointer-events-none mix-blend-overlay"
                            style={{
                              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                            }}
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
