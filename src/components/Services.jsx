import { services } from '../data'
import { Reveal } from './Reveal'

export function Services() {
  return (
    <section id="servicios" className="container-x py-24 md:py-36">
      <Reveal>
        <div className="mb-16 max-w-3xl">
          <div className="mb-6 flex items-center gap-3">
            <p className="eyebrow">Qué hago por tu marca</p>
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-mist">(04)</span>
          </div>
          <h2 className="font-grotesk text-huge font-bold leading-[0.95] tracking-tightest">
            Servicios que <span className="font-serif italic text-glow">mueven</span> números.
          </h2>
        </div>
      </Reveal>

      <div className="divide-y divide-white/10 border-y border-white/10">
        {services.map((s, i) => (
          <Reveal key={s.n} delay={i * 0.04}>
            <article
              data-hot
              className="group relative grid grid-cols-1 gap-4 overflow-hidden py-8 transition-colors hover:bg-white/[0.02] md:grid-cols-12 md:items-center md:px-4"
            >
              {/* Número fantasma gigante que entra al hover */}
              <span
                aria-hidden
                className="pointer-events-none absolute right-6 top-1/2 -translate-y-1/2 translate-x-10 select-none font-grotesk text-[8rem] font-bold leading-none text-outline-blue opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-[0.18]"
              >
                {s.n}
              </span>

              <div className="font-mono text-sm text-santi md:col-span-1">{s.n}</div>
              <h3 className="flex items-center gap-3 font-grotesk text-2xl font-medium transition-transform duration-300 group-hover:translate-x-2 md:col-span-4 md:text-3xl">
                {s.title}
                <span className="text-santi opacity-0 transition-opacity duration-300 group-hover:opacity-100">→</span>
              </h3>
              <p className="text-mist md:col-span-5">{s.desc}</p>
              <div className="relative z-10 flex flex-wrap gap-2 md:col-span-2 md:justify-end">
                {s.tags.map((t) => (
                  <span key={t} className="rounded-full border border-white/10 px-3 py-1 text-xs text-mist transition-colors group-hover:border-santi/30">
                    {t}
                  </span>
                ))}
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
