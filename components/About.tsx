import { about, profile } from "@/lib/data";
import { Reveal, SectionHead } from "./Reveal";

// Mettre une photo dans public/photo.jpg puis passer PHOTO à "/photo.jpg".
const PHOTO: string | null = null;

function Portrait() {
  return (
    <div className="relative mx-auto aspect-[4/5] w-full max-w-sm">
      <div className="absolute -inset-3 rounded-[2rem] border border-dashed border-line" />
      <div className="relative h-full overflow-hidden rounded-[1.6rem] bg-surface ring-1 ring-line">
        {PHOTO ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={PHOTO} alt={`Portrait de ${profile.firstName} ${profile.lastName}`}
            className="h-full w-full object-cover grayscale contrast-110 transition duration-700 hover:grayscale-0" />
        ) : (
          <div className="grid h-full place-items-center bg-[radial-gradient(circle_at_30%_20%,var(--glow),transparent_60%)]">
            <span className="text-[9rem] font-semibold leading-none tracking-[-0.08em] text-ink/90">HM</span>
          </div>
        )}
        <div className="absolute inset-x-4 bottom-4 flex items-center justify-between rounded-xl border border-line bg-bg/80 px-4 py-3 backdrop-blur">
          <span className="text-sm font-medium">{profile.firstName} {profile.lastName}</span>
          <span className="path">{profile.location}</span>
        </div>
      </div>
    </div>
  );
}

export function About() {
  return (
    <section id="a-propos" className="mx-auto max-w-7xl px-5 py-28 sm:px-8 md:py-36">
      <SectionHead path="a-propos" title="Le réseau, le serveur, le pipeline. Et ce qui les protège." />
      <div className="grid gap-14 lg:grid-cols-[1fr_1.3fr] lg:gap-20">
        <Reveal><Portrait /></Reveal>
        <div>
          {about.paragraphs.map((p, i) => (
            <Reveal key={i} delay={0.08 * i}><p className="mb-6 text-lg leading-[1.75] text-muted first:text-xl first:text-ink">{p}</p></Reveal>
          ))}
          <Reveal delay={0.2}>
            <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line">
              {about.facts.map(f => (
                <div key={f.label} className="bg-bg p-6">
                  <dt className="sr-only">{f.label}</dt>
                  <dd className="text-3xl font-semibold tracking-tight sm:text-4xl">{f.value}</dd>
                  <dd className="mt-2 text-sm leading-snug text-muted">{f.label}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
