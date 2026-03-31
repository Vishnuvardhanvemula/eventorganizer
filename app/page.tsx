"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Components
import { Navbar } from "../components/Navbar";

// V2 Narrative Sections
import { CinematicHero } from "../components/v2/CinematicHero";
import { ExperiencePillars } from "../components/v2/ExperiencePillars";
import { ConciergeConsultation } from "../components/v2/ConciergeConsultation";

// V1 Legacy Support Sections (Re-styled inherently via V2 CSS context)
import { StatsBar } from "../components/landing/StatsBar";
import { ServicesAccordion } from "../components/v2/ServicesAccordion";
import { CinematicTestimonials } from "../components/v2/CinematicTestimonials";
import { SpotlightReveal } from "../components/v2/SpotlightReveal";
import { EditorialGallery } from "../components/landing/EditorialGallery";
import { Footer } from "../components/landing/Footer";

export default function Home() {
  const [isConsulting, setIsConsulting] = useState(false);

  return (
    <main className="min-h-[100svh] relative selection:bg-[#F3F3F3] selection:text-[#0A0A0A] bg-[#0A0A0A] overflow-clip">
      
      {/* V2 Navigation - Hidden during active consultation */}
      <AnimatePresence>
        {!isConsulting && (
          <motion.div
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            exit={{ y: -100 }}
            transition={{ duration: 0.8, ease: [0.6, 0.05, -0.01, 0.9] }}
          >
            <Navbar 
              onBuildClick={() => setIsConsulting(true)} 
              isBuilderPhase={false}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {/* --- PHASE 1: IMMERSIVE NARRATIVE SCROLL --- */}
        <motion.div
          key="lookbook"
          className="flex flex-col"
          animate={{ scale: isConsulting ? 0.95 : 1, filter: isConsulting ? "blur(10px)" : "blur(0px)" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <CinematicHero onCtaClick={() => setIsConsulting(true)} />
          <ExperiencePillars />
          <StatsBar />
          <ServicesAccordion />
          <CinematicTestimonials />
          <SpotlightReveal />
          <EditorialGallery />
          <Footer />
        </motion.div>

        {/* --- PHASE 2: CONCIERGE CONSULTATION EXPERIENTIAL FORM --- */}
        {isConsulting && (
          <motion.div
            key="concierge"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="fixed inset-0 z-50 pointer-events-auto"
          >
            <ConciergeConsultation onClose={() => setIsConsulting(false)} />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
