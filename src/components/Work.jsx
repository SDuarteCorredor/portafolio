import { Link } from 'react-router-dom'
import { work } from '../data'
import { Reveal } from './Reveal'
import { trackCta } from '../seo/analytics'
import { CaseCover } from './CaseCover'
import { Tilt } from './motion/Tilt'
import { SplitText } from './motion/SplitText'

// Punto 17 — las tarjetas ahora llevan al caso de estudio interno en vez de
// salir del sitio. El enlace externo (Behance, sitio en vivo) vive dentro del
// caso, así el enlace interno acumula el valor y el visitante no se va antes
// de leer el trabajo.
const caseUrl = (w) => (w.slug ? `/trabajo/${w.slug}/` : '/trabajo/')

// Card destacada (Lumi) — naranja Lumi, a ancho completo, con portada al lado.
function Featured({ w, i }) {
  return (
    <Tilt max={4} lift={4} scale={1.006} className="rounded-3xl">
      <Link
        to={caseUrl(w)}
        onClick={() => trackCta(w.title, 'work_featured')}
        className="group relative block overflow-hidden rounded-3xl border border-line bg-gradient-to-br from-lumi/[0.1] via-surface to-surface p-8 transition-colors duration-300 hover:border-lumi/40 md:p-12"
      >
        <span
          aria-hidden
          className="pointer-events-none absolute -right-3 -top-8 select-none font-grotesk text-[8rem] font-extrabold leading-none tracking-tight text-outline opacity-[0.06] transition-opacity duration-500 group-hover:opacity-[0.12]"
        >
          0{i + 1}
        </span>

        <div className="grid gap-8 md:grid-cols-12 md:items-center">
          <div className="md:col-span-7">
            <span className="inline-flex items-center gap-2 rounded-full border border-lumi/40 bg-lumi/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-lumi">
              <span className="h-1.5 w-1.5 rounded-full bg-lumi animate-pulse" /> Producto destacado
            </span>

            <div className="mt-6 flex items-center gap-4 font-mono text-xs uppercase tracking-widest text-muted">
              <span className="text-lumi">{w.kind}</span>
              <span className="h-px w-8 bg-line" />
              <span>{w.year}</span>
            </div>

            <h3 className="mt-4 text-left font-grotesk text-[clamp(2.6rem,6vw,4.5rem)] font-extrabold leading-[0.95] tracking-[-0.03em]">
              {w.title}
            </h3>
            <p className="mt-5 max-w-xl text-pretty text-muted md:text-lg">{w.desc}</p>

            <div className="mt-8 flex flex-wrap items-center gap-5">
              <span className="font-grotesk text-lg font-medium text-fg">{w.metric}</span>
              <span className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-line px-4 py-2 font-mono text-[10px] uppercase tracking-[0.15em] text-fg transition-colors duration-300 group-hover:border-lumi group-hover:bg-lumi group-hover:text-white">
                Ver el caso
                <span className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
              </span>
            </div>
          </div>

          {/* La portada se mete dentro del espacio 3D de la tarjeta: al inclinarse
              se separa del fondo en vez de moverse pegada a él. */}
          <div className="md:col-span-5" style={{ transform: 'translateZ(38px)' }}>
            <CaseCover w={w} ratio="aspect-[4/3]" />
          </div>
        </div>
      </Link>
    </Tilt>
  )
}

// Card estándar editorial — azul firma, portada arriba.
function Card({ w, i }) {
  return (
    <Tilt max={6} className="h-full rounded-2xl">
      <Link
        to={caseUrl(w)}
        onClick={() => trackCta(w.title, 'work_card')}
        className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface p-6 transition-colors duration-300 hover:border-santi/40 md:p-8"
      >
        <div style={{ transform: 'translateZ(30px)' }}>
          <CaseCover w={w} ratio="aspect-[16/10]" />
        </div>

        <div className="mt-6 flex items-center justify-between font-mono text-xs uppercase tracking-widest">
          <span className="text-santi">{w.kind}</span>
          <span className="text-muted">{w.year}</span>
        </div>

        <h3 className="mt-4 text-left font-grotesk text-2xl font-bold tracking-[-0.02em] md:text-3xl">
          {w.title}
        </h3>
        <p className="mt-3 flex-1 text-pretty text-muted">{w.desc}</p>

        <div className="mt-6 flex items-center justify-between gap-4 border-t border-line pt-5">
          <span className="font-grotesk font-medium text-fg">{w.metric}</span>
          <span className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-line px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.15em] text-muted transition-colors duration-300 group-hover:border-santi group-hover:text-santi">
            Ver el caso
            <span className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
          </span>
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
        <div className="mb-14 flex flex-wrap items-end justify-between gap-x-10 gap-y-6">
          <div>
            <div className="mb-6 flex items-center gap-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted">(03)</span>
              <p className="eyebrow">Trabajo seleccionado</p>
            </div>
            <SplitText
              as="h2"
              text="Casos *reales*."
              className="block font-grotesk text-huge font-bold leading-[0.95] tracking-[-0.03em]"
            />
          </div>
          <div className="max-w-sm">
            <p className="text-pretty text-muted">
              De campañas que multiplicaron ventas a un producto digital construido con IA.
            </p>
            <Link
              to="/trabajo/"
              onClick={() => trackCta('Ver todos los casos', 'work_header')}
              className="link-underline mt-4 inline-block font-grotesk text-sm text-santi"
            >
              Ver los 8 casos completos →
            </Link>
          </div>
        </div>
      </Reveal>

      <div className="space-y-4">
        {featured.map((w) => (
          <Reveal key={w.title}>
            <Featured w={w} i={work.indexOf(w)} />
          </Reveal>
        ))}

        <div className="grid gap-4 md:grid-cols-2">
          {rest.map((w) => (
            <Reveal key={w.title} delay={(work.indexOf(w) % 2) * 0.06} className="h-full">
              <Card w={w} i={work.indexOf(w)} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
