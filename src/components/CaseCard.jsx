import { Link } from 'react-router-dom'
import { trackCta } from '../seo/analytics'
import { CaseCover } from './CaseCover'
import { Tilt } from './motion/Tilt'

// La tarjeta de caso vivía dentro de Work.jsx, así que solo existía en la home.
// El hub /trabajo/ — la página que un reclutador abre cuando quiere ver el
// trabajo — mostraba los ocho proyectos como filas de una tabla y párrafos.
// Sacarla acá permite usar la misma tarjeta en los dos lugares.

// Punto 17 — las tarjetas llevan al caso de estudio interno en vez de salir del
// sitio. El enlace externo (Behance, sitio en vivo) vive dentro del caso.
export const caseUrl = (w) => (w.slug ? `/trabajo/${w.slug}/` : '/trabajo/')

// Color propio de cada caso (data.js). Se inyecta como variable CSS para poder
// usarlo en borde, texto y fondo sin generar una clase por proyecto.
//
// Las variantes con alfa se arman concatenando dígitos hex al final (#RRGGBB +
// AA). Tailwind no sabe aplicar opacidad sobre un color que viene de una
// variable arbitraria, así que esta es la vía que no depende de su compilador.
export const accentVars = (w) => {
  const a = w.accent || '#1B3CFF'
  return { '--a': a, '--a-40': `${a}66`, '--a-15': `${a}26`, '--a-08': `${a}14` }
}

/**
 * Tarjeta estándar — la portada manda, el texto acompaña.
 *
 * @param {{ w: object, source?: string }} props
 *   `source` es la etiqueta que se manda a analítica, para poder distinguir un
 *   clic desde la home de uno desde el hub.
 */
export function CaseCard({ w, source = 'work_card' }) {
  return (
    <Tilt max={6} className="h-full rounded-2xl">
      <Link
        to={caseUrl(w)}
        onClick={() => trackCta(w.title, source)}
        style={accentVars(w)}
        className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface p-4 transition-colors duration-300 hover:border-[color:var(--a-40)]"
      >
        <div style={{ transform: 'translateZ(30px)' }}>
          <CaseCover w={w} ratio="aspect-[16/10]" />
        </div>

        <div className="flex flex-1 flex-col px-3 pb-2 pt-5">
          <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-widest">
            <span style={{ color: 'var(--a)' }}>{w.kind}</span>
            {w.year && <span className="text-muted">{w.year}</span>}
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
