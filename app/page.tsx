"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Components
import { Navbar } from "../components/Navbar";
import { StageBuilder } from "../components/StageBuilder";
import { BookingForm } from "../components/BookingForm";

// Landing Sections
import { HeroSection } from "../components/landing/HeroSection";
import { EventShowcase } from "../components/landing/EventShowcase";
import { StatsBar } from "../components/landing/StatsBar";
import { ServicesSection } from "../components/landing/ServicesSection";
import { TestimonialsSection } from "../components/landing/TestimonialsSection";
import { Footer } from "../components/landing/Footer";

// Data
import { EventType, events } from "../data/events";
import { builderModules, AddonId } from "../data/builder";

type Phase = "LANDING" | "STORY" | "BUILDER" | "PROPOSAL";

export default function Home() {
  const [phase, setPhase] = useState<Phase>("LANDING");
  const [selectedEvent, setSelectedEvent] = useState<EventType | "CUSTOM">("CUSTOM");
  const [selectedAddons, setSelectedAddons] = useState<AddonId[]>(["DJBooth"]);

  // Set phase based on hash in URL
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash === '#builder') {
        setPhase("BUILDER");
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  // --- Handlers ---

  const handleSelectEvent = (type: EventType) => {
    setSelectedEvent(type);
    setSelectedAddons(events[type].recommendedAddons);
    setPhase("BUILDER");
    window.scrollTo(0, 0);
  };

  const handleBuildFromScratch = () => {
    setSelectedEvent("CUSTOM");
    setSelectedAddons(["DJBooth"]);
    setPhase("BUILDER");
    window.scrollTo(0, 0);
  };

  const handleBuilderComplete = (addons: string[]) => {
    setSelectedAddons(addons as AddonId[]);
    setPhase("PROPOSAL");
    window.scrollTo(0, 0);
  };

  const addonLabels = Object.fromEntries(builderModules.map((m) => [m.id, m.label]));

  return (
    <main className="min-h-screen relative selection:bg-[var(--color-gold)] selection:text-white bg-[var(--color-dark)] overflow-hidden">
      {/* Navbar is persistent mostly, hidden only in full builder if desired, but we keep it for BRAND */}
      {phase !== "BUILDER" && (
        <Navbar 
          onBuildClick={handleBuildFromScratch} 
          isBuilderPhase={phase === "PROPOSAL"}
        />
      )}

      <AnimatePresence mode="wait">
        
        {/* --- PHASE 1: FULL LANDING PAGE --- */}
        {phase === "LANDING" && (
          <motion.div
            key="landing"
            exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="flex flex-col"
          >
            <HeroSection onCtaClick={handleBuildFromScratch} />
            <EventShowcase 
              onSelectEvent={handleSelectEvent} 
              onFromScratchClick={handleBuildFromScratch} 
            />
            <StatsBar />
            <ServicesSection />
            <TestimonialsSection />
            <Footer />
          </motion.div>
        )}

        {/* --- PHASE 2: BUILDER (StageBuilder takes full screen) --- */}
        {phase === "BUILDER" && (
          <motion.div
            key="builder"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8, ease: [0.6, 0.05, -0.01, 0.9] }}
            className="fixed inset-0 z-50 bg-white"
          >
            <StageBuilder 
              initialAddons={selectedAddons}
              onComplete={handleBuilderComplete} 
              onBack={() => { setPhase("LANDING"); window.scrollTo(0, 0); }}
            />
          </motion.div>
        )}

        {/* --- PHASE 3: PROPOSAL FORM --- */}
        {phase === "PROPOSAL" && (
          <motion.div
            key="proposal"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8, ease: [0.6, 0.05, -0.01, 0.9] }}
            className="min-h-screen pt-24 pb-20 bg-white flex items-center justify-center relative z-40"
          >
            <BookingForm 
              selectedAddons={selectedAddons}
              addonLabels={addonLabels}
              onBack={() => setPhase("BUILDER")}
              onSuccessReturn={() => {
                setPhase("LANDING");
                window.scrollTo(0, 0);
              }}
            />
          </motion.div>
        )}

      </AnimatePresence>
    </main>
  );
}
