import { services } from '../data'
import { Reveal } from './Reveal'

export function Services() {
  return (
    <section id="servicios" className="container-x py-16 md:py-24">
      <Reveal>
        <div className="mb-12 flex flex-wrap items-end justify-between gap-x-10 gap-y-6">
          <div>
            <div className="mb-6 flex items-center gap-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted">(04)</span>
              <p className="eyebrow">Qué hago por tu marca</p>
            </div>
            <h2 className="font-grotesk text-huge font-bold leading-[0.95] tracking-[-0.03em]">
              Servicios que <span className="font-serif font-normal italic text-santi">mueven</span> números.
            </h2>
          </div>
          <p className="max-w-sm text-pretty text-muted">
            Estrategia, performance y diseño que conectan cada peso invertido con un resultado.
          </p>
        </div>
      </Reveal>

      <div className="border-t border-line">
        {services.map((s, i) => (
          <Reveal key={s.n} delay={i * 0.04}>
            <article className="group border-b border-line">
              <div className="grid grid-cols-1 gap-x-6 gap-y-4 py-7 transition-colors duration-300 group-hover:bg-fg/[0.02] md:grid-cols-12 md:items-baseline md:px-4 md:py-8">
                <span className="font-mono text-sm text-santi md:col-span-1">{s.n}</span>

                <h3 className="flex items-center gap-3 text-left font-grotesk text-2xl font-bold tracking-[-0.02em] transition-transform duration-300 group-hover:translate-x-1 md:col-span-4 md:text-[1.75rem]">
                  {s.title}
                  <span className="whitespace-nowrap text-santi opacity-0 transition-opacity duration-300 group-hover:opacity-100">→</span>
                </h3>

                <p className="text-pretty text-muted md:col-span-5">{s.desc}</p>

                <div className="flex flex-wrap gap-2 md:col-span-2 md:justify-end">
                  {s.tags.map((t) => (
                    <span
                      key={t}
                      className="whitespace-nowrap rounded-full border border-line px-3 py-1 text-xs text-muted transition-colors duration-300 group-hover:border-santi/30"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
