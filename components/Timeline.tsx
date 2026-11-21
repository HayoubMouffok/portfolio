"use client";
import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Briefcase, GraduationCap, Rocket } from "lucide-react";
import { timeline } from "@/lib/data";
import { Reveal, SectionHead } from "./Reveal";

const kindIcon = { pro: Briefcase, formation: GraduationCap, projet: Rocket };
const kindLabel = { pro: "Expérience", formation: "Formation", projet: "Projet" };

export function Timeline() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 60%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <section id="parcours" className="border-t border-line bg-bg-2">
      <div className="mx-auto max-w-7xl px-5 py-28 sm:px-8 md:py-36">
        <SectionHead path="parcours" title="Du câble au cluster." intro="Six ans de réseau, de systèmes et de sécurité, entre l'entreprise, la recherche et mon propre produit." />
        <ol ref={ref} className="relative ml-3 md:ml-0">
          <div className="absolute bottom-2 left-0 top-2 w-px bg-line md:left-[11.5rem]" />
          <motion.div style={{ scaleY: progress }} className="absolute bottom-2 left-0 top-2 w-px origin-top bg-accent md:left-[11.5rem]" />
          {timeline.map((s, i) => {
            const Icon = kindIcon[s.kind];
            return (
              <li key={s.title} className="relative grid gap-2 pb-12 pl-10 last:pb-0 md:grid-cols-[11.5rem_1fr] md:gap-0 md:pl-0">
                <Reveal delay={0.04 * i} className="md:pr-10 md:text-right">
                  <span className="font-mono text-sm text-muted">{s.period}</span>
                </Reveal>
                <span className="absolute left-0 top-0 grid h-7 w-7 -translate-x-1/2 place-items-center rounded-full border border-line bg-surface text-accent md:left-[11.5rem]">
                  <Icon size={13} />
                </span>
                <Reveal delay={0.04 * i + 0.05} className="md:pl-12">
                  <p className="mb-1 text-xs font-medium text-accent-2">{kindLabel[s.kind]}</p>
                  <h3 className="text-xl font-semibold tracking-tight sm:text-2xl">{s.title}</h3>
                  <p className="mt-1 text-muted">{s.place}</p>
                  <p className="mt-3 max-w-2xl leading-relaxed text-muted">{s.text}</p>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
