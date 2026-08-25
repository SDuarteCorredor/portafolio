import { Link } from 'react-router-dom'
import { services } from '../data'
import { Reveal } from './Reveal'
import { trackCta } from '../seo/analytics'


// Una fila de servicio. Cuando el servicio tiene página propia, toda la fila es
// un enlace interno; si no (la estrategia general se explica en el hub), queda
// como bloque estático.
function Row({ s }) {
  const inner = (
    <div className="-mx-3 flex flex-col gap-y-4 rounded-2xl px-3 py-6 transition-colors duration-300 group-hover:bg-fg/[0.03] md:-mx-5 md:grid md:grid-cols-12 md:items-baseline md:gap-x-6 md:px-5 md:py-8">
      <span className="font-mono text-sm text-santi md:col-span-1">{s.n}</span>

      <h3 className="text-left font-grotesk text-2xl font-bold tracking-[-0.02em] transition-transform duration-300 group-hover:translate-x-1 md:col-span-4 md:text-[1.75rem]">
        {s.title}
      </h3>

      <p className="text-pretty text-muted md:col-span-5">{s.desc}</p>

      <div className="flex flex-wrap items-center gap-2 md:col-span-2 md:justify-end">
        {s.tags.map((t) => (
          <span
            key={t}
            className="whitespace-nowrap rounded-full border border-line px-3 py-1 text-xs text-muted transition-colors duration-300 group-hover:border-santi/30"
          >
            {t}
          </span>
        ))}
        {s.slug && (
          <span
            aria-hidden
            className="ml-1 shrink-0 text-santi opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100"
          >
            →
          </span>
        )}
      </div>
    </div>
  )

  if (!s.slug) return inner

  return (
    <Link
      to={`/servicios/${s.slug}/`}
      onClick={() => trackCta(s.title, 'services_row')}
      className="block"
      aria-label={`Ver el servicio: ${s.title}`}
    >
      {inner}
    </Link>
  )
}

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
          <div className="max-w-sm">
            <p className="text-pretty text-muted">
              Estrategia, performance y diseño que conectan cada peso invertido con un resultado.
            </p>
            <Link
              to="/servicios/"
              onClick={() => trackCta('Ver todos los servicios', 'services_header')}
              className="link-underline mt-4 inline-block font-grotesk text-sm text-santi"
            >
              Ver todos los servicios en detalle →
            </Link>
          </div>
        </div>
      </Reveal>

      <div className="border-t border-line">
        {services.map((s, i) => (
          <Reveal key={s.n} delay={i * 0.04}>
            <article className="group border-b border-line">
              <Row s={s} />
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
