import { about, profile, education, certifications } from '../data'
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
        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
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

      {/* Educación + Certificaciones */}
      <Reveal>
        <div className="mt-14 grid gap-12 md:grid-cols-12 md:gap-14">
          {/* Educación */}
          <div className="md:col-span-5">
            <div className="mb-7 flex items-center gap-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-santi">Educación</span>
              <span className="h-px flex-1 bg-line" />
            </div>
            <div className="space-y-7">
              {education.map((e) => (
                <div key={e.title} className="relative border-l border-line pl-5">
                  <span className="absolute -left-[3.5px] top-1.5 h-2 w-2 rounded-full bg-santi" />
                  <p className="font-grotesk font-semibold text-fg">{e.title}</p>
                  <p className="text-sm text-muted">{e.school}</p>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.15em] text-muted">{e.period}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Certificaciones */}
          <div className="md:col-span-7">
            <div className="mb-7 flex items-center gap-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-santi">Certificaciones</span>
              <span className="font-mono text-[10px] text-muted">({certifications.length})</span>
              <span className="h-px flex-1 bg-line" />
            </div>
            <div className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
              {certifications.map((c) => (
                <div key={c.name} className="flex flex-col border-t border-line pt-3">
                  <span className="text-pretty font-medium leading-snug text-fg">{c.name}</span>
                  <span className="mt-1 font-mono text-[10px] uppercase tracking-[0.12em] text-muted">
                    {c.issuer} · {c.year}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
