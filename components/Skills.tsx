"use client";
import { motion } from "framer-motion";
import { Activity, Network, Server, ShieldCheck, Workflow } from "lucide-react";
import { observability, skills } from "@/lib/data";
import { Reveal, SectionHead } from "./Reveal";

const icons = { network: Network, server: Server, shield: ShieldCheck, workflow: Workflow };

export function Skills() {
  return (
    <section id="competences" className="border-y border-line bg-bg-2">
      <div className="mx-auto max-w-7xl px-5 py-28 sm:px-8 md:py-36">
        <SectionHead path="competences" title="Quatre domaines, une même façon de travailler."
          intro="Comprendre, automatiser, mesurer. Les outils changent selon la couche, la méthode reste la même." />
        <div className="grid gap-4 md:grid-cols-2">
          {skills.map((g, i) => {
            const Icon = icons[g.icon];
            return (
              <Reveal key={g.id} delay={0.06 * i}>
                <motion.article whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 300, damping: 24 }}
                  className="group relative h-full overflow-hidden rounded-3xl border border-line bg-surface p-8">
                  <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" style={{ background: "var(--glow)" }} />
                  <div className="mb-8 flex items-start justify-between">
                    <span className="grid h-12 w-12 place-items-center rounded-2xl border border-line bg-bg text-accent"><Icon size={22} strokeWidth={1.75} /></span>
                    <span className="path">{String(g.tools.length).padStart(2, "0")} outils</span>
                  </div>
                  <h3 className="text-2xl font-semibold tracking-tight">{g.name}</h3>
                  <p className="mt-2 text-muted">{g.summary}</p>
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {g.tools.map(t => <li key={t} className="rounded-full border border-line bg-bg px-3 py-1.5 text-sm">{t}</li>)}
                  </ul>
                </motion.article>
              </Reveal>
            );
          })}
        </div>
        <Reveal delay={0.1}>
          <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-3 rounded-3xl border border-line bg-surface px-8 py-6">
            <span className="flex items-center gap-2 font-medium"><Activity size={18} className="text-accent-2" /> Supervision</span>
            {observability.map(o => <span key={o} className="text-muted">{o}</span>)}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
