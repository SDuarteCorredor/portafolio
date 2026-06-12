import { work } from '../data'
import { Reveal } from './Reveal'

// Card destacada (Lumi) — naranja Lumi, a ancho completo, link a su sitio en vivo.
function Featured({ w, i }) {
  return (
    <a
      href={w.link || undefined}
      target="_blank"
      rel="noreferrer"
      className="group relative block overflow-hidden rounded-3xl border border-line bg-gradient-to-br from-lumi/[0.1] via-surface to-surface p-8 transition-all duration-300 hover:border-lumi/40 md:p-12"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -right-3 -top-8 select-none font-grotesk text-[8rem] font-extrabold leading-none tracking-tight text-outline opacity-[0.06] transition-opacity duration-500 group-hover:opacity-[0.12]"
      >
        0{i + 1}
      </span>

      <div className="grid gap-8 md:grid-cols-12 md:items-end">
        <div className="md:col-span-8">
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
        </div>

        <div className="flex items-center justify-between gap-4 md:col-span-4 md:flex-col md:items-end md:gap-8 md:text-right">
          <span className="font-grotesk text-lg font-medium text-fg">{w.metric}</span>
          <span className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-line px-4 py-2 font-mono text-[10px] uppercase tracking-[0.15em] text-fg transition-colors duration-300 group-hover:border-lumi group-hover:bg-lumi group-hover:text-white">
            {w.cta}
            <span className="transition-transform duration-300 group-hover:translate-x-0.5">↗</span>
          </span>
        </div>
      </div>
    </a>
  )
}

// Card estándar editorial — azul firma, link a Behance / sitio (o "Próximamente").
function Card({ w, i }) {
  const Tag = w.link ? 'a' : 'div'
  const linkProps = w.link ? { href: w.link, target: '_blank', rel: 'noreferrer' } : {}

  return (
    <Tag
      {...linkProps}
      className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface p-8 transition-all duration-300 md:p-10 ${
        w.link ? 'hover:-translate-y-1 hover:border-santi/40' : ''
      }`}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -right-2 -top-6 select-none font-grotesk text-[6rem] font-extrabold leading-none tracking-tight text-outline opacity-[0.05] transition-opacity duration-500 group-hover:opacity-[0.1]"
      >
        0{i + 1}
      </span>

      <div className="flex items-center justify-between font-mono text-xs uppercase tracking-widest">
        <span className="text-santi">{w.kind}</span>
        <span className="text-muted">{w.year}</span>
      </div>

      <h3 className="mt-6 text-left font-grotesk text-2xl font-bold tracking-[-0.02em] md:text-3xl">
        {w.title}
      </h3>
      <p className="mt-4 flex-1 text-pretty text-muted">{w.desc}</p>

      <div className="mt-8 flex items-center justify-between gap-4 border-t border-line pt-5">
        <span className="font-grotesk font-medium text-fg">{w.metric}</span>
        {w.link ? (
          <span className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-line px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.15em] text-muted transition-colors duration-300 group-hover:border-santi group-hover:text-santi">
            {w.cta}
            <span className="transition-transform duration-300 group-hover:translate-x-0.5">↗</span>
          </span>
        ) : (
          <span className="whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.15em] text-muted/60">{w.cta}</span>
        )}
      </div>
    </Tag>
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
            <h2 className="font-grotesk text-huge font-bold leading-[0.95] tracking-[-0.03em]">
              Casos <span className="font-serif font-normal italic text-santi">reales</span>.
            </h2>
          </div>
          <p className="max-w-sm text-pretty text-muted">
            De campañas que multiplicaron ventas a un producto digital construido con IA.
          </p>
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
