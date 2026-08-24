import { trackFaqOpen } from '../../seo/analytics'
import { Linkify } from './Linkify'

// Punto 19 — FAQ visible, emparejada con el schema FAQPage que se emite en el
// <head>. Google exige que la pregunta y la respuesta estén visibles en la
// página: por eso <details>/<summary> (colapsado pero presente en el DOM) y no
// un panel que se monte con JavaScript.

export function Faq({ items = [], path, title = 'Preguntas frecuentes' }) {
  if (!items.length) return null

  return (
    <section id="faq" aria-labelledby="faq-title" className="mt-20">
      <div className="mb-8 flex items-center gap-3">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted">FAQ</span>
        <span className="h-px flex-1 bg-line" />
      </div>

      <h2 id="faq-title" className="font-grotesk text-big font-bold leading-[1.05] tracking-[-0.02em]">
        {title}
      </h2>

      <div className="mt-8 divide-y divide-line border-y border-line">
        {items.map((f, i) => (
          <details
            key={i}
            className="group py-5"
            onToggle={(e) => e.currentTarget.open && trackFaqOpen(f.q, path)}
          >
            <summary className="flex cursor-pointer list-none items-start justify-between gap-6 font-grotesk text-lg font-semibold text-fg transition-colors hover:text-santi [&::-webkit-details-marker]:hidden">
              <h3 className="text-pretty text-lg font-semibold leading-snug">{f.q}</h3>
              <span
                aria-hidden
                className="mt-1 shrink-0 text-santi transition-transform duration-300 group-open:rotate-45"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </span>
            </summary>
            <p className="mt-4 max-w-[68ch] text-pretty leading-relaxed text-muted">
              <Linkify>{f.a}</Linkify>
            </p>
          </details>
        ))}
      </div>
    </section>
  )
}
