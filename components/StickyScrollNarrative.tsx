"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { EventType, events } from "../data/events";
import { useRef } from "react";
import { SceneStage } from "./SceneStage";
import { ServicePanel } from "./ServicePanel";
import { UpsellBanner } from "./UpsellBanner";

interface Props {
  selectedEvent: EventType;
  onReset: () => void;
}

export function StickyScrollNarrative({ selectedEvent, onReset }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Fade out purely at the bottom 10%
  const sceneOpacity = useTransform(scrollYProgress, [0.9, 0.98], [1, 0]);

  const config = events[selectedEvent];
  const services = config.services;

  return (
    <div ref={containerRef} className="relative w-full" style={{ height: "400vh" }}>
      {/* Sticky Background & Scene */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex flex-col items-center pointer-events-none z-0">
        <motion.div style={{ opacity: sceneOpacity }} className="w-full h-full flex flex-col items-center">
          
          {/* Top Left Title (Morphs from center) */}
          <div className="absolute top-10 left-10 z-[60] pointer-events-none">
            <motion.h2 
              layoutId={`title-layout-${selectedEvent}`}
              className="font-sans text-[11px] md:text-xs font-semibold uppercase tracking-[0.25em] text-neutral-900 bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full border border-neutral-200/50 shadow-sm"
            >
              {config.label}
            </motion.h2>
          </div>

          <SceneStage activeComponents={config.components} />
        </motion.div>
      </div>

      {/* Scrolling Content - Glass Panels */}
      {/* Starting after 80vh so the user actually sees the scene build before panning down */}
      <div className="relative z-20 w-full flex flex-col items-center pointer-events-auto mt-[80vh] overflow-x-hidden pt-[20vh] pb-[50vh]">
        
        {/* Services mapping staggered gracefully */}
        {services.map((service, idx) => {
          // Calculate an alternating class
          // idx 0 -> left-align, idx 1 -> right-align, idx 2 -> left-align...
          const alignClass = idx % 2 === 0 
            ? "mr-auto ml-[5%] md:ml-[10%]" 
            : "ml-auto mr-[5%] md:mr-[10%]";

          const isLast = idx === services.length - 1;

          return (
            <div key={idx} className={`w-full max-w-7xl px-4 flex ${isLast ? 'mb-[30vh]' : 'mb-[40vh]'}`}>
              <div className={`w-full max-w-xl ${alignClass}`}>
                <ServicePanel title={service.title} desc={service.desc} icon={service.icon} index={idx} />
              </div>
            </div>
          );
        })}

        {/* Upsell Banner naturally midway relative to services */}
        <div className="w-full max-w-7xl px-4 flex justify-center mt-[10vh]">
          <UpsellBanner upsell={config.upsell} />
        </div>

      </div>
    </div>
  );
}
