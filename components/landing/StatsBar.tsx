"use client";

import { motion, useInView, useAnimation } from "framer-motion";
import { useEffect, useRef, useState } from "react";

function CountUp({ end, duration = 2, suffix = "" }: { end: number, duration?: number, suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      let startTime: number | null = null;
      const step = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
        
        // Easing function (easeOutExpo)
        const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        
        setCount(Math.floor(easeProgress * end));
        
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    }
  }, [isInView, end, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export function StatsBar() {
  return (
    <section className="w-full bg-[#FCFAF5] py-20 border-y border-[#C9A84C]/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:divide-x md:divide-[#C9A84C]/10">
          {[
            { label: "Events Produced", num: 250, suffix: "+" },
            { label: "Years Experience", num: 12, suffix: "" },
            { label: "Missed Cues", num: 0, suffix: "" }
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: i * 0.2 }}
              className="flex flex-col items-center justify-center p-4"
            >
              <h4 className="font-serif text-5xl md:text-6xl text-neutral-900 mb-4 tracking-tighter">
                <CountUp end={stat.num} suffix={stat.suffix} />
              </h4>
              <p className="font-sans text-xs tracking-[0.25em] uppercase text-[var(--color-gold-muted)] font-medium">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
