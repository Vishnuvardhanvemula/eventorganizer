"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

function CountUp({ end, duration = 2, suffix = "" }: { end: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      let startTime: number | null = null;
      const step = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
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
  const stats = [
    { label: "Events Produced", num: 250, suffix: "+", emphasis: true },
    { label: "Years Experience", num: 12, suffix: "+", emphasis: false },
    { label: "Missed Cues", num: 0, suffix: "", emphasis: false },
  ];

  return (
    <section className="w-full bg-[#0A0A0A] py-20 relative overflow-hidden">
      {/* Top gold accent line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#C9A84C]/40 to-transparent" />
      {/* Bottom gold accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#C9A84C]/40 to-transparent" />

      {/* Subtle radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,168,76,0.04)_0%,transparent_70%)]" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: i * 0.2 }}
              className="flex flex-col items-center justify-center p-4 relative"
            >
              {/* Divider between items on desktop */}
              {i > 0 && (
                <div className="hidden md:block absolute left-0 top-4 bottom-4 w-[1px] bg-gradient-to-b from-[#C9A84C]/0 via-[#C9A84C]/20 to-[#C9A84C]/0" />
              )}

              <h4 className="font-serif text-5xl md:text-6xl lg:text-7xl text-[#FCFAF5] mb-4 tracking-tighter tabular-nums">
                <CountUp end={stat.num} suffix={stat.suffix} />
              </h4>
              <p className="font-sans text-[11px] tracking-[0.3em] uppercase text-[#C9A84C] font-medium">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
