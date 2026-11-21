"use client";
import { motion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { profile } from "@/lib/data";
import { NetworkField } from "./NetworkField";

const ease = [0.22, 1, 0.36, 1] as const;

function Word({ text, delay }: { text: string; delay: number }) {
  return (
    <span className="block overflow-hidden pb-[0.08em]">
      <motion.span className="block" initial={{ y: "105%" }} animate={{ y: 0 }} transition={{ duration: 1, ease, delay }}>
        {text}
      </motion.span>
    </span>
  );
}

export function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden pt-[72px]">
      <div className="grid-bg pointer-events-none absolute inset-0 -z-10" />
      <div className="pointer-events-none absolute -right-40 top-10 -z-10 h-[520px] w-[520px] rounded-full blur-3xl" style={{ background: "var(--glow)" }} />

      <div className="mx-auto grid min-h-[calc(100svh-72px)] max-w-7xl items-center gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[1.15fr_1fr] lg:py-10">
        <div>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.1 }}
            className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-line bg-surface/70 px-3.5 py-1.5 text-sm text-muted backdrop-blur">
            <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" /><span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" /></span>
            Disponible immédiatement · {profile.location}
          </motion.p>

          <h1 className="text-[clamp(3.4rem,9vw,7.6rem)] font-semibold leading-[0.9] tracking-[-0.055em]">
            <Word text={profile.firstName} delay={0.15} />
            <Word text={profile.lastName} delay={0.28} />
          </h1>

          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease, delay: 0.55 }}
            className="mt-8 max-w-xl text-2xl font-medium leading-snug tracking-tight sm:text-[1.7rem]">
            Ingénieur <span className="text-accent">DevOps</span>, systèmes, réseaux et cybersécurité.
          </motion.p>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease, delay: 0.68 }}
            className="mt-4 max-w-lg text-lg leading-relaxed text-muted">
            {profile.tagline}
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease, delay: 0.82 }} className="mt-10 flex flex-wrap gap-3">
            <a href="#projets" className="group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-[15px] font-medium text-bg transition-transform hover:-translate-y-0.5">
              Découvrir mes projets <ArrowDownRight size={18} className="transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
            </a>
            <a href="#contact" className="group inline-flex items-center gap-2 rounded-full border border-line px-6 py-3.5 text-[15px] font-medium transition-colors hover:border-ink">
              Me contacter <ArrowUpRight size={18} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.4, ease, delay: 0.3 }}
          className="relative h-[380px] sm:h-[460px] lg:h-[560px]">
          <div className="absolute inset-0 rounded-[2rem] border border-line bg-surface/40 backdrop-blur-[2px]" />
          <div className="absolute inset-0 overflow-hidden rounded-[2rem]"><NetworkField /></div>
          <p className="path absolute bottom-5 left-6 hidden sm:block">survolez le réseau</p>
          <p className="path absolute bottom-5 right-6"><b>AS 65000</b> · 4 domaines</p>
        </motion.div>
      </div>
    </section>
  );
}
