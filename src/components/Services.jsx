import { services } from '../data'
import { Reveal } from './Reveal'

export function Services() {
  return (
    <section id="servicios" className="container-x py-24 md:py-36">
      <Reveal>
        <div className="mb-16 max-w-3xl">
          <p className="eyebrow mb-6">Qué hago por tu marca</p>
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
              className="group grid grid-cols-1 gap-4 py-8 transition-colors hover:bg-white/[0.02] md:grid-cols-12 md:items-center md:px-4"
            >
              <div className="font-mono text-sm text-santi md:col-span-1">{s.n}</div>
              <h3 className="font-grotesk text-2xl font-medium transition-transform duration-300 group-hover:translate-x-2 md:col-span-4 md:text-3xl">
                {s.title}
              </h3>
              <p className="text-mist md:col-span-5">{s.desc}</p>
              <div className="flex flex-wrap gap-2 md:col-span-2 md:justify-end">
                {s.tags.map((t) => (
                  <span key={t} className="rounded-full border border-white/10 px-3 py-1 text-xs text-mist">
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
