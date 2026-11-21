"use client";
import { motion } from "framer-motion";

// Apparition au scroll : discrète, une seule fois.
export function Reveal({ children, delay = 0, className }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHead({ path, title, intro }: { path: string; title: string; intro?: string }) {
  return (
    <Reveal className="mb-14 max-w-3xl">
      <p className="path mb-4">~/<b>{path}</b></p>
      <h2 className="text-4xl font-semibold tracking-[-0.03em] sm:text-5xl md:text-6xl">{title}</h2>
      {intro && <p className="mt-5 text-lg leading-relaxed text-muted">{intro}</p>}
    </Reveal>
  );
}
