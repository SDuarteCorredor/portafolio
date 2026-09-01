import { Link } from 'react-router-dom'
import { work } from '../data'
import { Reveal } from './Reveal'
import { trackCta } from '../seo/analytics'
import { CaseCover } from './CaseCover'
import { Tilt } from './motion/Tilt'
import { SplitText } from './motion/SplitText'

// Punto 17 — las tarjetas llevan al caso de estudio interno en vez de salir del
// sitio. El enlace externo (Behance, sitio en vivo) vive dentro del caso.
const caseUrl = (w) => (w.slug ? `/trabajo/${w.slug}/` : '/trabajo/')

// Color propio de cada caso (data.js). Se inyecta como variable CSS para poder
// usarlo en borde, texto y fondo sin generar una clase por proyecto.
//
// Las variantes con alfa se arman concatenando dígitos hex al final (#RRGGBB +
// AA). Tailwind no sabe aplicar opacidad sobre un color que viene de una
// variable arbitraria, así que esta es la vía que no depende de su compilador.
const accentVars = (w) => {
  const a = w.accent || '#1B3CFF'
  return { '--a': a, '--a-40': `${a}66`, '--a-15': `${a}26`, '--a-08': `${a}14` }
}

// Card destacada — a ancho completo, con la portada al lado.
function Featured({ w, i }) {
  return (
    <Tilt max={4} lift={4} scale={1.006} className="rounded-3xl">
      <Link
        to={caseUrl(w)}
        onClick={() => trackCta(w.title, 'work_featured')}
        style={accentVars(w)}
        className="group relative block overflow-hidden rounded-3xl border border-line bg-surface p-8 transition-colors duration-300 hover:border-[color:var(--a-40)] md:p-12"
      >
        {/* Lavado de color propio del caso, en vez de un degradado fijo. */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-60 transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: 'radial-gradient(120% 90% at 78% 15%, var(--a-15), transparent 62%)' }}
        />

        <div className="relative grid gap-8 md:grid-cols-12 md:items-center">
          <div className="md:col-span-6">
            <span
              className="inline-flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em]"
              style={{ borderColor: 'var(--a-40)', background: 'var(--a-15)', color: 'var(--a)' }}
            >
              <span className="h-1.5 w-1.5 animate-pulse rounded-full" style={{ background: 'var(--a)' }} />
              Producto destacado
            </span>

            <div className="mt-6 flex items-center gap-4 font-mono text-xs uppercase tracking-widest text-muted">
              <span style={{ color: 'var(--a)' }}>{w.kind}</span>
              <span className="h-px w-8 bg-line" />
              <span>{w.year}</span>
            </div>

            <h3 className="mt-4 text-left font-grotesk text-[clamp(2.8rem,7vw,5rem)] font-extrabold leading-[0.92] tracking-[-0.03em]">
              {w.title}
            </h3>

            {/* Una línea, no un párrafo: la tarjeta vende con la imagen y el
                número; el detalle está dentro del caso. */}
            <p className="mt-4 max-w-md text-pretty text-muted md:text-lg">{w.hook || w.desc}</p>

            <div className="mt-8 flex flex-wrap items-center gap-5">
              <span className="font-grotesk text-lg font-medium text-fg">{w.metric}</span>
              <span
                className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border px-5 py-2.5 font-mono text-[10px] uppercase tracking-[0.15em] text-fg transition-colors duration-300 group-hover:text-ink"
                style={{ borderColor: 'var(--a-40)' }}
              >
                Ver el caso
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </span>
            </div>
          </div>

          {/* La portada entra en el espacio 3D de la tarjeta: al inclinarse se
              despega del fondo en vez de moverse pegada a él. */}
          <div className="md:col-span-6" style={{ transform: 'translateZ(38px)' }}>
            <CaseCover w={w} ratio="aspect-[4/3]" />
          </div>
        </div>
      </Link>
    </Tilt>
  )
}

// Card estándar — la portada manda, el texto acompaña.
function Card({ w }) {
  return (
    <Tilt max={6} className="h-full rounded-2xl">
      <Link
        to={caseUrl(w)}
        onClick={() => trackCta(w.title, 'work_card')}
        style={accentVars(w)}
        className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface p-4 transition-colors duration-300 hover:border-[color:var(--a-40)]"
      >
        <div style={{ transform: 'translateZ(30px)' }}>
          <CaseCover w={w} ratio="aspect-[16/10]" />
        </div>

        <div className="flex flex-1 flex-col px-3 pb-2 pt-5">
          <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-widest">
            <span style={{ color: 'var(--a)' }}>{w.kind}</span>
            <span className="text-muted">{w.year}</span>
          </div>

          <h3 className="mt-3 text-left font-grotesk text-2xl font-bold tracking-[-0.02em] md:text-3xl">
            {w.title}
          </h3>

          {/* Gancho corto en vez del párrafo completo. */}
          <p className="mt-2 flex-1 text-pretty text-sm text-muted">{w.hook || w.desc}</p>

          <div className="mt-5 flex items-center justify-between gap-4 border-t border-line pt-4">
            <span className="font-grotesk text-sm font-medium text-fg">{w.metric}</span>
            <span
              className="inline-flex items-center gap-1.5 whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.15em] transition-colors duration-300"
              style={{ color: 'var(--a)' }}
            >
              Ver el caso
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </span>
          </div>
        </div>
      </Link>
    </Tilt>
  )
}

export function Work() {
  const featured = work.filter((w) => w.featured)
  const rest = work.filter((w) => !w.featured)

  return (
    <section id="trabajo" className="container-x py-16 md:py-24">
      <Reveal>
        <div className="mb-12 flex flex-wrap items-end justify-between gap-x-10 gap-y-6">
          <div>
            <div className="mb-6 flex items-center gap-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted">(02)</span>
              <p className="eyebrow">Trabajo seleccionado</p>
            </div>
            <SplitText
              as="h2"
              text="Casos *reales*."
              className="block font-grotesk text-huge font-bold leading-[0.95] tracking-[-0.03em]"
            />
          </div>
          <Link
            to="/trabajo/"
            onClick={() => trackCta('Ver todos los casos', 'work_header')}
            className="link-underline font-grotesk text-sm text-santi"
          >
            Ver los 8 casos completos →
          </Link>
        </div>
      </Reveal>

      <div className="space-y-4">
        {featured.map((w) => (
          <Reveal key={w.title}>
            <Featured w={w} i={work.indexOf(w)} />
          </Reveal>
        ))}

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {rest.map((w, i) => (
            <Reveal key={w.title} delay={(i % 3) * 0.06} className="h-full">
              <Card w={w} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
