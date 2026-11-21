"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Moon, Sun, X } from "lucide-react";
import { useTheme } from "next-themes";
import { nav } from "@/lib/data";

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const dark = !mounted || resolvedTheme === "dark";
  return (
    <button
      type="button"
      onClick={() => setTheme(dark ? "light" : "dark")}
      aria-label={dark ? "Passer en mode clair" : "Passer en mode sombre"}
      className="grid h-10 w-10 place-items-center rounded-full border border-line text-muted transition-colors hover:border-accent hover:text-accent"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span key={dark ? "moon" : "sun"} initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.25 }}>
          {dark ? <Moon size={17} /> : <Sun size={17} />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActive("#" + e.target.id); }),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    nav.forEach(n => { const el = document.querySelector(n.href); if (el) io.observe(el); });
    return () => { window.removeEventListener("scroll", onScroll); io.disconnect(); };
  }, []);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "border-b border-line bg-bg/75 backdrop-blur-xl" : "border-b border-transparent"}`}>
      <nav className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 sm:px-8" aria-label="Navigation principale">
        <a href="#top" className="group flex items-center gap-3" aria-label="Retour en haut de page">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-ink font-mono text-sm font-medium text-bg transition-transform group-hover:-rotate-6">HM</span>
          <span className="hidden text-[15px] font-semibold tracking-tight sm:block">Hayoub Mouffok</span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {nav.map(n => (
            <li key={n.href}>
              <a href={n.href} className={`relative rounded-full px-4 py-2 text-[15px] transition-colors ${active === n.href ? "text-ink" : "text-muted hover:text-ink"}`}>
                {active === n.href && <motion.span layoutId="nav-pill" className="absolute inset-0 -z-10 rounded-full bg-surface ring-1 ring-line" transition={{ type: "spring", stiffness: 380, damping: 32 }} />}
                {n.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a href="#contact" className="hidden rounded-full bg-ink px-5 py-2.5 text-[15px] font-medium text-bg transition-transform hover:-translate-y-0.5 sm:block">Me contacter</a>
          <button type="button" onClick={() => setOpen(o => !o)} aria-expanded={open} aria-controls="menu-mobile" aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            className="grid h-10 w-10 place-items-center rounded-full border border-line md:hidden">
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div id="menu-mobile" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-line bg-bg/95 backdrop-blur-xl md:hidden">
            <ul className="px-5 py-4">
              {nav.map((n, i) => (
                <motion.li key={n.href} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.04 * i }}>
                  <a href={n.href} onClick={() => setOpen(false)} className="block py-3 text-2xl font-medium tracking-tight">{n.label}</a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
