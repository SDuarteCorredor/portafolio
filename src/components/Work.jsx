import { work } from '../data'
import { Reveal } from './Reveal'

export function Work() {
  return (
    <section id="trabajo" className="container-x py-24 md:py-36">
      <Reveal>
        <div className="mb-16 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow mb-6">Trabajo seleccionado</p>
            <h2 className="font-grotesk text-huge font-bold leading-[0.95] tracking-tightest">
              Casos <span className="text-outline-blue">reales</span>.
            </h2>
          </div>
          <p className="max-w-sm text-mist">
            De campañas que multiplicaron ventas a un producto digital construido con IA.
          </p>
        </div>
      </Reveal>

      <div className="grid gap-5 md:grid-cols-2">
        {work.map((w, i) => (
          <Reveal key={w.title} delay={i * 0.06} className={w.featured ? 'md:col-span-2' : ''}>
            <a
              href={w.link || undefined}
              data-hot
              className={`group relative block h-full overflow-hidden rounded-3xl border border-white/10 p-8 transition-all duration-500 hover:border-santi/50 md:p-10 ${
                w.featured ? 'bg-gradient-to-br from-santi/15 via-ink2 to-ink2' : 'bg-ink2'
              }`}
            >
              {/* glow hover */}
              <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-santi/30 opacity-0 blur-[80px] transition-opacity duration-500 group-hover:opacity-100" />

              <div className="flex items-center justify-between">
                <span className="font-mono text-xs uppercase tracking-widest text-santi-soft">{w.kind}</span>
                <span className="font-mono text-xs text-mist">{w.year}</span>
              </div>

              <h3 className={`mt-8 font-grotesk font-bold tracking-tightest ${w.featured ? 'text-5xl md:text-7xl' : 'text-3xl md:text-4xl'}`}>
                {w.title}
              </h3>

              <p className="mt-4 max-w-xl text-mist">{w.desc}</p>

              <div className="mt-8 flex items-center justify-between">
                <span className="font-grotesk text-lg text-paper">{w.metric}</span>
                {w.link && (
                  <span className="grid h-11 w-11 place-items-center rounded-full border border-white/15 transition-all group-hover:border-santi group-hover:bg-santi group-hover:text-white">
                    ↗
                  </span>
                )}
              </div>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
