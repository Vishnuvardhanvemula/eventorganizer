"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const questions = [
  {
    id: "vibe",
    label: "What is the energy of your night?",
    options: ["Intimate & Elegant", "High-Energy Explosive", "Corporate Professional"]
  },
  {
    id: "scale",
    label: "How many guests will be immersed?",
    options: ["Under 100", "150–300", "500+ Gala"]
  },
  {
    id: "focus",
    label: "What is your primary focus?",
    options: ["Cinematic Lighting", "Concert-Grade Audio", "Complete Environment Transformation"]
  }
];

export function ConciergeConsultation({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const handleSelect = (option: string) => {
    setAnswers(prev => ({ ...prev, [questions[step].id]: option }));
    if (step < questions.length - 1) {
      setTimeout(() => setStep(step + 1), 400);
    } else {
      setTimeout(() => setStep(99), 400);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-[#0A0A0A] flex flex-col justify-center px-6 md:px-16 overflow-hidden">
      {/* Dynamic Background Noise */}
      <div className="absolute inset-0 z-0 bg-gradient-to-tr from-[#C9A84C]/5 to-transparent opacity-20 pointer-events-none" />
      
      {/* Header */}
      <div className="absolute top-12 left-6 md:left-16 right-6 md:right-16 z-10 flex justify-between items-center">
        <span className="font-sans text-[9px] md:text-[10px] tracking-[0.4em] uppercase text-[#666666]">
          Private Consultation
        </span>
        <button onClick={onClose} className="font-sans text-[9px] md:text-[10px] tracking-[0.3em] uppercase text-white hover:text-[var(--color-gold)] transition-colors duration-300">
          Exit / Return
        </button>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto w-full">
        <AnimatePresence mode="wait">
          {step < questions.length ? (
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <h2 className="font-serif text-4xl md:text-6xl text-[#F3F3F3] leading-tight mb-16 max-w-2xl">
                {questions[step].label}
              </h2>
              
                {questions[step]?.options && (
                  <motion.div 
                    key={questions[step].id}
                    initial="hidden"
                    animate="show"
                    variants={{
                      hidden: { opacity: 0 },
                      show: { opacity: 1, transition: { staggerChildren: 0.15 } }
                    }}
                    className="flex flex-col gap-6"
                  >
                    {questions[step].options.map((opt) => {
                      const isSelected = answers[questions[step].id] === opt;
                      return (
                        <motion.button
                          key={opt}
                          variants={{
                            hidden: { opacity: 0, y: 20 },
                            show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
                          }}
                          onClick={() => handleSelect(opt)}
                          className={`group relative text-left py-6 px-8 border transition-all duration-500 rounded-sm overflow-hidden ${
                             isSelected 
                              ? "border-[var(--color-gold)] bg-[var(--color-gold)]/10" 
                              : "border-[#333333] hover:border-[var(--color-gold)] bg-transparent"
                          }`}
                        >
                          <div className={`absolute inset-0 bg-[var(--color-gold)] transform origin-left transition-transform duration-500 ease-out z-0 ${isSelected ? "scale-x-100 opacity-10" : "scale-x-0 group-hover:scale-x-100 group-hover:opacity-5"}`} />
                          
                          <span className={`relative z-10 font-sans text-lg tracking-wide transition-colors ${
                            isSelected ? "text-[var(--color-gold)]" : "text-[#A0A0A0] group-hover:text-white"
                          }`}>
                            {opt}
                          </span>
                        </motion.button>
                      );
                    })}
                  </motion.div>
                )}
            </motion.div>
          ) : (
            <motion.div
              key="complete"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="text-center flex flex-col items-center"
            >
              <div className="w-16 h-16 rounded-full border border-[var(--color-gold)] flex items-center justify-center mb-8">
                <span className="text-[var(--color-gold)] text-2xl font-sans">✓</span>
              </div>
              <h2 className="font-serif text-5xl md:text-7xl text-[#F3F3F3] mb-6">Execution Initiated.</h2>
              <p className="font-sans text-base md:text-xl text-[#A0A0A0] max-w-xl mx-auto mb-16">
                Our directors have received your parameters. We will contact you perfectly in sync with your timeline to present your bespoke architectural breakdown.
              </p>
              <button 
                onClick={onClose}
                className="font-sans text-xs tracking-[0.25em] uppercase text-[#0A0A0A] font-semibold bg-[#F3F3F3] hover:bg-[var(--color-gold)] hover:text-white px-12 py-5 rounded-sm transition-colors duration-500"
              >
                Return to Lookbook
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Progress Bar */}
      {step < questions.length && (
        <div className="absolute bottom-12 left-6 md:left-16 right-6 md:right-16 flex items-center gap-4 z-10">
          <span className="font-sans text-[10px] text-[#666666] tracking-widest">0{step + 1}</span>
          <div className="h-[1px] bg-[#333333] flex-1 relative overflow-hidden">
             <motion.div 
               className="absolute top-0 left-0 bottom-0 bg-[var(--color-gold)]"
               initial={{ width: `${(step / questions.length) * 100}%` }}
               animate={{ width: `${((step + 1) / questions.length) * 100}%` }}
               transition={{ duration: 0.6, ease: "easeInOut" }}
             />
          </div>
          <span className="font-sans text-[10px] text-[#666666] tracking-widest">0{questions.length}</span>
        </div>
      )}
    </div>
  );
}
