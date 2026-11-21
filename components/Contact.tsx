"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Check, Copy, Download, Loader2, Mail, Send } from "lucide-react";
import { profile } from "@/lib/data";
import { GithubIcon, LinkedinIcon } from "./BrandIcons";
import { Reveal } from "./Reveal";

type State = "idle" | "sending" | "sent" | "error";

export function Contact() {
  const [state, setState] = useState<State>("idle");
  const [copied, setCopied] = useState(false);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    setState("sending");
    try {
      // Formulaire traité par Netlify Forms (voir public/__forms.html)
      const res = await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(data as unknown as Record<string, string>).toString(),
      });
      if (!res.ok) throw new Error(String(res.status));
      setState("sent");
      e.currentTarget?.reset();
    } catch {
      setState("error");
    }
  }

  async function copyMail() {
    try { await navigator.clipboard.writeText(profile.email); setCopied(true); setTimeout(() => setCopied(false), 1800); } catch { /* presse-papiers indisponible */ }
  }

  const field = "w-full rounded-2xl border border-line bg-bg px-5 py-4 text-base outline-none transition-colors placeholder:text-muted/70 focus:border-accent";

  return (
    <section id="contact" className="relative overflow-hidden border-t border-line">
      <div className="pointer-events-none absolute -left-40 bottom-0 h-[480px] w-[480px] rounded-full blur-3xl" style={{ background: "var(--glow)" }} />
      <div className="relative mx-auto grid max-w-7xl gap-16 px-5 py-28 sm:px-8 md:py-36 lg:grid-cols-[1.1fr_1fr]">
        <Reveal>
          <p className="path mb-4">~/<b>contact</b></p>
          <h2 className="text-5xl font-semibold leading-[0.95] tracking-[-0.045em] sm:text-6xl md:text-7xl">
            Un poste, un projet, une question ? <span className="whitespace-nowrap">Parlons-en.</span>
          </h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-muted">
            Je cherche un poste d'ingénieur DevOps, systèmes, réseaux ou cybersécurité en Île-de-France, disponible immédiatement.
          </p>
          <div className="mt-10 space-y-3">
            <div className="flex flex-wrap items-center gap-3">
              <a href={`mailto:${profile.email}`} className="group inline-flex items-center gap-3 text-xl font-medium sm:text-2xl">
                <Mail size={22} className="text-accent" />
                <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 group-hover:bg-[length:100%_1px]">{profile.email}</span>
              </a>
              <button type="button" onClick={copyMail} aria-label="Copier l'adresse e-mail" className="grid h-9 w-9 place-items-center rounded-full border border-line text-muted transition-colors hover:text-ink">
                {copied ? <Check size={15} /> : <Copy size={15} />}
              </button>
            </div>
            <div className="pt-4">
              <p className="mb-3 text-sm text-muted">Télécharger mon CV</p>
              <div className="flex flex-wrap gap-2">
                {[["DevOps", "DevOps"], ["Réseaux", "Reseaux"], ["Systèmes", "Systemes"], ["Cybersécurité", "Securite"]].map(([label, file]) => (
                  <a key={file} href={`/cv/CV_Hayoub_Mouffok_${file}.pdf`} download className="inline-flex items-center gap-1.5 rounded-full bg-surface px-4 py-2 text-sm ring-1 ring-line transition-colors hover:ring-accent">
                    <Download size={14} className="text-accent" /> {label}
                  </a>
                ))}
              </div>
            </div>
            <div className="flex gap-3 pt-4">
              <a href={profile.linkedin} target="_blank" rel="noopener" className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm font-medium transition-colors hover:border-ink"><LinkedinIcon /> LinkedIn <ArrowUpRight size={15} /></a>
              <a href={profile.github} target="_blank" rel="noopener" className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm font-medium transition-colors hover:border-ink"><GithubIcon /> GitHub <ArrowUpRight size={15} /></a>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <form name="contact" method="POST" onSubmit={submit} className="rounded-[2rem] border border-line bg-surface p-6 sm:p-8">
            <input type="hidden" name="form-name" value="contact" />
            <p className="hidden"><label>Ne pas remplir : <input name="bot-field" /></label></p>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block"><span className="mb-2 block text-sm text-muted">Nom</span><input name="nom" required autoComplete="name" className={field} placeholder="Votre nom" /></label>
              <label className="block"><span className="mb-2 block text-sm text-muted">E-mail</span><input name="email" type="email" required autoComplete="email" className={field} placeholder="vous@entreprise.fr" /></label>
            </div>
            <label className="mt-4 block"><span className="mb-2 block text-sm text-muted">Entreprise (facultatif)</span><input name="entreprise" autoComplete="organization" className={field} placeholder="Votre entreprise" /></label>
            <label className="mt-4 block"><span className="mb-2 block text-sm text-muted">Message</span><textarea name="message" required rows={5} className={`${field} resize-none`} placeholder="Le poste, le contexte, vos questions…" /></label>
            <button type="submit" disabled={state === "sending"}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-ink px-6 py-4 text-[15px] font-medium text-bg transition-transform hover:-translate-y-0.5 disabled:opacity-60">
              {state === "sending" ? <><Loader2 size={18} className="animate-spin" /> Envoi…</> : <><Send size={17} /> Envoyer le message</>}
            </button>
            <AnimatePresence>
              {state === "sent" && <motion.p initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} role="status" className="mt-4 text-center text-sm text-accent-2">Message envoyé. Je reviens vers vous rapidement.</motion.p>}
              {state === "error" && <motion.p initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} role="alert" className="mt-4 text-center text-sm text-red-500">L'envoi a échoué. Écrivez-moi directement à {profile.email}.</motion.p>}
            </AnimatePresence>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
