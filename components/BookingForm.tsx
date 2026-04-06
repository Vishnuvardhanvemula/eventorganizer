"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Check, Loader2 } from "lucide-react";
import { useState } from "react";

interface Props {
  selectedAddons: string[];
  addonLabels: Record<string, string>;
  onBack: () => void;
  onSuccessReturn: () => void;
}

export function BookingForm({ selectedAddons, addonLabels, onBack, onSuccessReturn }: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate network request
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  const packageDesc = selectedAddons.map((id) => addonLabels[id] || id).join(", ");

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 1, ease: [0.6, 0.05, -0.01, 0.9] }}
      className="w-full max-w-2xl mx-auto py-16 px-6 md:px-0"
    >
      <AnimatePresence mode="wait">
        {!isSuccess ? (
          <motion.div key="form" exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.5 }}>
            {/* Header */}
            <div className="mb-14 flex flex-col items-center text-center">
              <p className="font-sans text-xs tracking-[0.3em] uppercase text-[#C9A84C] mb-4">Your Proposal</p>
              <h3 className="font-serif text-4xl md:text-5xl text-[var(--color-text-primary)] mb-4 leading-tight">
                Let&apos;s make it official.
              </h3>
              <p className="font-sans text-[var(--color-text-muted)] text-base leading-loose max-w-md">
                You&apos;ve built your stage. We&apos;ll take it from here — every detail handled to perfection.
              </p>
            </div>

            {/* Package Summary */}
            <div className="mb-10 p-6 rounded-2xl bg-[var(--color-bg-primary)] border border-[#C9A84C]/20">
              <p className="font-sans text-xs tracking-[0.25em] uppercase text-[#C9A84C] mb-3">Your Custom Build</p>
              <ul className="space-y-2">
                {selectedAddons.map((id) => (
                  <li key={id} className="flex items-center gap-3 font-sans text-sm text-[var(--color-text-primary)]">
                    <Check size={14} className="text-[#C9A84C] shrink-0" strokeWidth={2.5} />
                    {addonLabels[id] || id}
                  </li>
                ))}
              </ul>
            </div>

            <form className="space-y-8" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="col-span-2 relative group">
                  <label htmlFor="name" className="absolute -top-3 left-0 text-[10px] uppercase tracking-widest text-[var(--color-text-muted)] group-focus-within:text-[#C9A84C] transition-colors bg-[var(--color-bg-secondary)] px-1">Full Name</label>
                  <input 
                    id="name"
                    required
                    type="text" 
                    placeholder="Jane Doe"
                    className="w-full bg-transparent border-b border-[var(--color-border)] py-3 px-1 focus:outline-none focus:border-[#C9A84C] transition-colors font-sans text-lg text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)]" 
                  />
                </div>
                
                <div className="relative group">
                  <label htmlFor="email" className="absolute -top-3 left-0 text-[10px] uppercase tracking-widest text-[var(--color-text-muted)] group-focus-within:text-[#C9A84C] transition-colors bg-[var(--color-bg-secondary)] px-1">Email Address</label>
                  <input 
                    id="email"
                    required
                    type="email" 
                    placeholder="jane@example.com"
                    className="w-full bg-transparent border-b border-[var(--color-border)] py-3 px-1 focus:outline-none focus:border-[#C9A84C] transition-colors font-sans text-lg text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)]" 
                  />
                </div>
                
                <div className="relative group">
                  <label htmlFor="phone" className="absolute -top-3 left-0 text-[10px] uppercase tracking-widest text-[var(--color-text-muted)] group-focus-within:text-[#C9A84C] transition-colors bg-[var(--color-bg-secondary)] px-1">Phone Number</label>
                  <input 
                    id="phone"
                    required
                    type="tel" 
                    placeholder="(555) 000-0000"
                    className="w-full bg-transparent border-b border-[var(--color-border)] py-3 px-1 focus:outline-none focus:border-[#C9A84C] transition-colors font-sans text-lg text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)]" 
                  />
                </div>
                
                <div className="relative group">
                  <label htmlFor="date" className="absolute -top-3 left-0 text-[10px] uppercase tracking-widest text-[var(--color-text-muted)] group-focus-within:text-[#C9A84C] transition-colors bg-[var(--color-bg-secondary)] px-1">Event Date</label>
                  <input 
                    id="date"
                    required
                    type="date"
                    className="w-full bg-transparent border-b border-[var(--color-border)] py-3 px-1 focus:outline-none focus:border-[#C9A84C] transition-colors font-sans text-lg text-[var(--color-text-primary)]" 
                  />
                </div>
                
                <div className="relative group">
                  <label htmlFor="venue" className="absolute -top-3 left-0 text-[10px] uppercase tracking-widest text-[var(--color-text-muted)] group-focus-within:text-[#C9A84C] transition-colors bg-[var(--color-bg-secondary)] px-1">Venue / Location</label>
                  <input 
                    id="venue"
                    required
                    type="text" 
                    placeholder="The Grand LA"
                    className="w-full bg-transparent border-b border-[var(--color-border)] py-3 px-1 focus:outline-none focus:border-[#C9A84C] transition-colors font-sans text-lg text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)]" 
                  />
                </div>
              </div>

              <div className="relative group">
                <label htmlFor="notes" className="absolute -top-3 left-0 text-[10px] uppercase tracking-widest text-[var(--color-text-muted)] group-focus-within:text-[#C9A84C] transition-colors bg-[var(--color-bg-secondary)] px-1">Special Requests</label>
                <textarea 
                  id="notes"
                  placeholder="Any specific aesthetic or technical needs?"
                  rows={3}
                  className="w-full bg-transparent border-b border-[var(--color-border)] py-3 px-1 focus:outline-none focus:border-[#C9A84C] transition-colors font-sans text-lg text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] resize-none mt-2" 
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button 
                  type="button"
                  onClick={onBack}
                  disabled={isSubmitting}
                  className="shrink-0 font-sans text-xs tracking-[0.2em] uppercase text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors py-5 px-8 border border-[var(--color-border)] rounded disabled:opacity-50"
                >
                  ← Edit Stage
                </button>
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-[#C9A84C] text-white hover:bg-[#b59540] transition-colors py-5 px-8 font-sans tracking-[0.25em] uppercase text-xs rounded shadow-[0_12px_32px_rgba(201,168,76,0.2)] flex items-center justify-center gap-3 disabled:opacity-80"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Processing...
                    </>
                  ) : (
                    "Request Proposal"
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        ) : (
          <motion.div 
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center text-center py-12"
          >
            <div className="w-20 h-20 bg-[var(--color-bg-primary)] border border-[#C9A84C]/30 rounded-full flex items-center justify-center mb-8 relative">
              <div className="absolute inset-0 rounded-full border border-[#C9A84C]/50 animate-ping opacity-20" />
              <Check size={32} className="text-[#C9A84C]" strokeWidth={2} />
            </div>
            
            <p className="font-sans text-xs tracking-[0.3em] uppercase text-[#C9A84C] mb-4">Received</p>
            <h3 className="font-serif text-4xl md:text-5xl text-[var(--color-text-primary)] mb-6 tracking-tight">
              Proposal initiated.
            </h3>
            
            <p className="font-sans text-[var(--color-text-muted)] text-lg leading-loose max-w-sm mb-12">
              Our production design team is reviewing your stage. We will contact you within 24 hours with a custom quote.
            </p>
            
            <button 
              onClick={onSuccessReturn}
              className="font-sans text-xs tracking-[0.2em] uppercase text-[var(--color-text-muted)] hover:text-[#C9A84C] transition-colors border-b border-transparent hover:border-[#C9A84C] pb-1"
            >
              Return to Homepage
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
