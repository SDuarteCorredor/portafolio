import { about, profile } from '../data'
import { Reveal } from './Reveal'

// Lead con palabras destacadas (serif itálica azul) — render simple y confiable.
function Lead({ text, highlight = [] }) {
  const words = text.split(' ')
  return (
    <>
      {words.map((w, i) => (
        <span key={i} className={highlight.includes(i) ? 'font-serif font-normal italic text-santi' : ''}>
          {w}
          {i < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </>
  )
}

export function About() {
  return (
    <section id="sobre" className="container-x py-16 md:py-24">
      <Reveal>
        <div className="mb-8 flex items-center gap-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted">(05)</span>
          <p className="eyebrow">Sobre mí</p>
        </div>
      </Reveal>

      <Reveal>
        <h2 className="max-w-4xl text-pretty font-grotesk text-big font-bold leading-[1.05] tracking-[-0.02em]">
          <Lead text={about.lead} highlight={[2, 8]} />
        </h2>
      </Reveal>

      <div className="mt-12 grid gap-10 md:grid-cols-12 md:items-start md:gap-14">
        {/* Foto — derecha en desktop, primero en móvil */}
        <div className="md:order-2 md:col-span-5">
          <Reveal>
            <div className="group relative aspect-[4/5] overflow-hidden rounded-2xl border border-line bg-surface md:sticky md:top-28">
              {/* Fallback: monograma (si la foto no cargó) */}
              <div className="absolute inset-0 grid place-items-center">
                <span className="font-grotesk text-7xl font-extrabold text-fg/10">SD.</span>
              </div>

              <img
                src="/santiago.png"
                alt={profile.name}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Badge de disponibilidad */}
              <div className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/40 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-white backdrop-blur-md">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-santi opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-santi" />
                </span>
                Disponible · 2026
              </div>
            </div>
          </Reveal>
          <p className="mt-3 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-muted md:text-left">
            {profile.name} · {profile.location}
          </p>
        </div>

        {/* Texto — izquierda en desktop */}
        <div className="space-y-6 text-lg text-muted md:order-1 md:col-span-7">
          {about.body.map((p, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <p className="text-pretty">{p}</p>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Datos clave — banda a ancho completo */}
      <Reveal>
        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {about.facts.map((f) => (
            <div key={f.k} className="group bg-bg p-6 transition-colors duration-300 hover:bg-fg/[0.02]">
              <span className="font-mono text-xs uppercase tracking-widest text-santi">{f.k}</span>
              <span className="mt-2 block text-pretty text-fg transition-transform duration-300 group-hover:translate-x-1">
                {f.v}
              </span>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  )
}
