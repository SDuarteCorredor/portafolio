import { Link } from 'react-router-dom'
import { Reveal } from './Reveal'
import { SplitText } from './motion/SplitText'
import { doors } from '../content/aula.js'
import { trackCta } from '../seo/analytics'

// Las tres puertas de la marca, justo debajo de la portada.
//
// ivansantiagoduarte.com dejó de ser solo un portafolio: es la página maestra
// de la marca personal. Quien llega puede querer contratar, aprender o llevarse
// una herramienta gratis, y antes solo la primera opción era evidente. Tres
// tarjetas cortas, en el mismo orden en que siguen las secciones de la home.

export function ThreeDoors() {
  return (
    <section id="puertas" className="container-x pt-16 md:pt-24">
      <Reveal>
        <div className="mb-10 flex items-center gap-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted">(01)</span>
          <p className="eyebrow">{doors.eyebrow}</p>
        </div>
        <SplitText
          as="h2"
          text={doors.title}
          className="block font-grotesk text-big font-bold leading-[1] tracking-[-0.03em]"
        />
      </Reveal>

      <Reveal>
        <ul className="mt-10 grid gap-4 md:grid-cols-3">
          {doors.items.map((d) => (
            <li key={d.n}>
              <Link
                to={d.to}
                onClick={() => trackCta(d.title, 'home_puertas')}
                className="group flex h-full flex-col rounded-2xl border border-line bg-surface p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-santi/50 md:p-7"
              >
                <span className="font-mono text-[11px] tracking-[0.2em] text-santi">{d.n}</span>
                <span className="mt-4 block font-grotesk text-2xl font-bold tracking-[-0.02em] text-fg">
                  {d.title}
                </span>
                <span className="mt-3 block flex-1 text-pretty text-sm leading-relaxed text-muted">{d.body}</span>
                <span className="mt-6 inline-flex items-center gap-1.5 font-grotesk text-sm font-semibold text-santi">
                  {d.cta}
                  <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  )
}
