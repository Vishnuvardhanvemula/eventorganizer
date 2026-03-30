import { motion } from "framer-motion";
import { EventType, events } from "../data/events";

interface Props {
  onSelect: (type: EventType) => void;
}

export function EventSelector({ onSelect }: Props) {
  return (
    <motion.div
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl"
    >
      {Object.values(events).map((event, index) => (
        <motion.button
          key={event.id}
          layoutId={`scene-container-${event.id}`}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          onClick={() => onSelect(event.id)}
          className="group relative h-80 flex flex-col items-center justify-center p-8 bg-[var(--color-bg-primary)] hover:bg-[var(--color-border)] border border-[var(--color-border)] transition-colors cursor-pointer overflow-hidden rounded-sm"
        >
          <motion.div layoutId={`scene-content-${event.id}`} className="flex flex-col items-center">
            <h2 className="font-serif text-3xl text-[var(--color-text-primary)] group-hover:text-[var(--color-gold)] transition-colors z-10 text-center">
              {event.label}
            </h2>
            <p className="mt-4 text-sm text-[var(--color-text-muted)] font-sans tracking-[0.2em] uppercase opacity-0 group-hover:opacity-100 transition-opacity z-10">
              Select
            </p>
          </motion.div>
          
          <div className="absolute inset-x-0 bottom-0 h-1 bg-[var(--color-gold)] transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-[0.22,1,0.36,1]" />
        </motion.button>
      ))}
    </motion.div>
  );
}
