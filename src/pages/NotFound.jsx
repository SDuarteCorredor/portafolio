import { Link } from 'react-router-dom'
import { childrenOf } from '../content/index.js'

// 404 útil: en vez de un callejón sin salida, ofrece los dos clusters para que
// el visitante (y el crawler) sigan encontrando páginas reales.
export default function NotFound() {
  const servicios = childrenOf('/servicios/')

  return (
    <main className="container-x flex min-h-[70svh] flex-col justify-center pb-24 pt-36">
      <p className="eyebrow">Error 404</p>
      <h1 className="mt-5 max-w-[16ch] text-balance font-grotesk text-huge font-extrabold leading-[0.98] tracking-[-0.035em]">
        Esta página no <span className="font-serif font-normal italic text-santi">existe</span>.
      </h1>
      <p className="mt-6 max-w-[52ch] text-pretty leading-relaxed text-muted">
        Puede que el enlace esté mal escrito o que la página haya cambiado de dirección.
        Estos son los caminos que sí llevan a algún lado.
      </p>

      <div className="mt-10 flex flex-wrap gap-3">
        <Link to="/" className="btn-blue">Ir al inicio</Link>
        <Link to="/trabajo/" className="btn-ghost">Ver el trabajo</Link>
        <Link to="/contacto/" className="btn-ghost">Hablemos</Link>
      </div>

      {servicios.length > 0 && (
        <div className="mt-14 border-t border-line pt-8">
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted">Servicios</p>
          <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-3">
            {servicios.map((s) => (
              <li key={s.path}>
                <Link to={s.path} className="link-underline font-grotesk text-sm text-fg">
                  {s.navLabel}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </main>
  )
}
