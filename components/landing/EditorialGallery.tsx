"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function EditorialGallery() {
  const images = [
    {
      src: "/assets/images/gallery-gala-table.png",
      alt: "Luxury Gala Table Setting",
      aspectRatio: "aspect-[3/4]",
    },
    {
      src: "/assets/images/gallery-concert.png",
      alt: "Concert Lighting Rig",
      aspectRatio: "aspect-square",
    },
    {
      src: "/assets/images/gallery-dancefloor.png",
      alt: "Premium Dance Floor",
      aspectRatio: "aspect-[4/5]",
    },
    {
      src: "/assets/images/gallery-stage.png",
      alt: "Corporate Stage Event",
      aspectRatio: "aspect-[16/9]",
    },
    {
      src: "/assets/images/gallery-floral.png",
      alt: "Wedding Floral Architecture",
      aspectRatio: "aspect-[3/4]",
    },
    {
      src: "/assets/images/gallery-sparks.png",
      alt: "Cold Spark Special Effects",
      aspectRatio: "aspect-square",
    },
  ];

  return (
    <section className="w-full pt-16 pb-32 bg-[var(--color-bg-primary)] overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-20">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="font-sans text-xs tracking-[0.3em] uppercase text-[var(--color-gold-muted)] mb-4"
          >
            The Portfolio
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-serif text-4xl md:text-5xl lg:text-6xl text-[var(--color-text-primary)] tracking-tight max-w-3xl"
          >
            Flawless execution is <br className="hidden md:block" />
            our only standard.
          </motion.h2>
        </div>

        {/* Masonry Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-5 space-y-5">
          {images.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50, filter: "blur(5px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, delay: i * 0.08, ease: [0.6, 0.05, -0.01, 0.9] }}
              className={`relative group overflow-hidden rounded-lg break-inside-avoid ${img.aspectRatio} cursor-pointer`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover transform scale-[1.02] group-hover:scale-[1.08] transition-transform duration-[1.5s] ease-[cubic-bezier(0.22,1,0.36,1)] brightness-90 group-hover:brightness-100"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none flex items-end p-7">
                <span className="font-sans text-[11px] tracking-[0.2em] uppercase text-[#C9A84C] font-medium translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  {img.alt}
                </span>
              </div>

              {/* Subtle border */}
              <div className="absolute inset-0 rounded-lg border border-[var(--color-text-primary)]/5 pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
