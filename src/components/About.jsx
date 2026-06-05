import { about } from '../data'
import { Reveal, RevealWords } from './Reveal'

export function About() {
  return (
    <section id="sobre" className="container-x py-24 md:py-36">
      <div className="grid gap-14 md:grid-cols-12">
        <div className="md:col-span-7">
          <Reveal>
            <p className="eyebrow mb-8">Sobre mí</p>
          </Reveal>
          <h2 className="font-grotesk text-big font-bold leading-[1.05] tracking-tight">
            <RevealWords text={about.lead} highlight={[2, 8]} />
          </h2>

          <div className="mt-10 space-y-6 text-lg text-mist">
            {about.body.map((p, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <p>{p}</p>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="md:col-span-5 md:pt-20">
          <div className="space-y-px overflow-hidden rounded-2xl border border-white/10">
            {about.facts.map((f, i) => (
              <Reveal key={f.k} delay={i * 0.06}>
                <div className="flex flex-col gap-1 bg-ink2 p-6 transition-colors hover:bg-white/[0.03]">
                  <span className="font-mono text-xs uppercase tracking-widest text-santi-soft">{f.k}</span>
                  <span className="text-paper">{f.v}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
