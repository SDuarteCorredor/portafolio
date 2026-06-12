import { about } from '../data'
import { Reveal, RevealWords } from './Reveal'

export function About() {
  return (
    <section id="sobre" className="container-x py-16 md:py-24">
      <div className="grid gap-14 md:grid-cols-12">
        <div className="md:col-span-7">
          <Reveal>
            <div className="mb-8 flex items-center gap-3">
              <p className="eyebrow">Sobre mí</p>
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted">(05)</span>
            </div>
          </Reveal>
          <h2 className="font-grotesk text-big font-bold leading-[1.05] tracking-tight">
            <RevealWords text={about.lead} highlight={[2, 8]} />
          </h2>

          <div className="mt-10 space-y-6 text-lg text-muted">
            {about.body.map((p, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <p>{p}</p>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="md:col-span-5 md:pt-4">
          {/* Bloque monograma con anillo cónico girando */}
          <Reveal>
            <div className="relative mb-6 grid place-items-center overflow-hidden rounded-2xl border border-line bg-surface p-10">
              <div className="bracket pointer-events-none absolute inset-4" />
              <div className="relative grid h-40 w-40 place-items-center">
                <div className="conic-ring absolute inset-0 animate-spin-slower rounded-full opacity-70" />
                <div className="absolute inset-[3px] rounded-full bg-surface" />
                <span className="relative font-grotesk text-6xl font-bold tracking-tightest text-fg">
                  SD<span className="text-santi">.</span>
                </span>
              </div>
              <span className="mt-6 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-muted">
                <span className="h-1.5 w-1.5 rounded-full bg-santi animate-pulse" />
                Disponible para proyectos · 2026
              </span>
            </div>
          </Reveal>

          <div className="space-y-px overflow-hidden rounded-2xl border border-line">
            {about.facts.map((f, i) => (
              <Reveal key={f.k} delay={i * 0.06}>
                <div className="group flex flex-col gap-1 bg-surface p-6 transition-colors hover:bg-fg/[0.03]">
                  <span className="font-mono text-xs uppercase tracking-widest text-santi-soft">{f.k}</span>
                  <span className="text-fg transition-transform duration-300 group-hover:translate-x-1">{f.v}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
