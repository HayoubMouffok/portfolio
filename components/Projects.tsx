"use client";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { GithubIcon } from "./BrandIcons";
import { projects, type Project } from "@/lib/data";
import { FabricPreview, GitopsPreview } from "./Previews";
import { Reveal, SectionHead } from "./Reveal";

function Preview({ p }: { p: Project }) {
  if (p.preview === "k8s")
    return (
      <video className="h-full w-full bg-[#181a1f] object-contain" src="/projects/k8s-demo.mp4" poster="/projects/k8s-demo.png" muted loop playsInline autoPlay preload="metadata">
        Démo : une attaque réussit, une politique est générée, la même attaque est bloquée.
      </video>
    );
  return <div className="h-full w-full p-6">{p.preview === "fabric" ? <FabricPreview /> : <GitopsPreview />}</div>;
}

function Card({ p, large }: { p: Project; large?: boolean }) {
  return (
    <motion.article whileHover="hover" initial="rest" animate="rest"
      className={`group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-line bg-surface ${large ? "lg:grid lg:grid-cols-[1.25fr_1fr]" : ""}`}>
      <div className={`relative overflow-hidden border-line bg-bg-2 ${large ? "aspect-[16/10] border-b lg:aspect-auto lg:border-b-0 lg:border-r" : "aspect-[16/10] border-b"}`}>
        <motion.div className="h-full w-full" variants={{ rest: { scale: 1 }, hover: { scale: 1.03 } }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
          <Preview p={p} />
        </motion.div>
      </div>
      <div className={`flex flex-1 flex-col ${large ? "p-8 sm:p-10" : "p-7 sm:p-8"}`}>
        <p className="path mb-4">{p.kicker}</p>
        <h3 className={`font-semibold tracking-tight ${large ? "text-3xl sm:text-4xl" : "text-2xl"}`}>{p.name}</h3>
        <p className="mt-4 leading-relaxed text-muted">{p.description}</p>
        <p className="mt-5 border-l-2 border-accent pl-4 font-medium">{p.result}</p>
        <ul className="mt-6 flex flex-wrap gap-2">
          {p.stack.map(s => <li key={s} className="rounded-full border border-line px-3 py-1 font-mono text-xs text-muted">{s}</li>)}
        </ul>
        <div className="mt-auto flex flex-wrap gap-3 pt-8">
          <a href={`${p.repo}#readme`} target="_blank" rel="noopener" className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-bg transition-transform hover:-translate-y-0.5">
            Voir le projet <ArrowUpRight size={16} />
          </a>
          <a href={p.repo} target="_blank" rel="noopener" className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm font-medium transition-colors hover:border-ink">
            <GithubIcon size={16} /> Code source
          </a>
        </div>
      </div>
    </motion.article>
  );
}

export function Projects() {
  const [first, ...rest] = projects;
  return (
    <section id="projets" className="mx-auto max-w-7xl px-5 py-28 sm:px-8 md:py-36">
      <SectionHead path="projets" title="Des projets mesurés, pas seulement montés."
        intro="Chaque projet est publié avec son code, ses tests automatisés et des résultats que l'on peut rejouer." />
      <div className="grid gap-5">
        <Reveal><Card p={first} large /></Reveal>
        <div className="grid gap-5 md:grid-cols-2">
          {rest.map((p, i) => <Reveal key={p.slug} delay={0.08 * i}><Card p={p} /></Reveal>)}
        </div>
      </div>
    </section>
  );
}
