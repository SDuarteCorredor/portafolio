import { Link } from 'react-router-dom'
import { Reveal } from './Reveal'
import { SplitText } from './motion/SplitText'
import { ResourceGrid } from './ResourceCard'
import { resources } from '../content/recursos.js'
import { trackCta } from '../seo/analytics'

// Recursos de código abierto en la home.
//
// Antes el único repo publicado vivía dentro de /perfil/, en la cuarta pantalla
// de una página sobre la trayectoria: quien no iba a leer el perfil no se
// enteraba de que existía. Ahora tiene sección propia en la home y en el menú.
//
// La lista sale del catálogo sincronizado con GitHub (src/content/repos.json):
// un repo público nuevo aparece acá solo. Se muestran los tres primeros —el
// destacado y los más nuevos— y el resto queda a un clic en /recursos/.

const SHOWN = 3

export function Resources() {
  if (!resources.length) return null
  const items = resources.slice(0, SHOWN)

  return (
    <section id="recursos" className="container-x py-16 md:py-24">
      <Reveal>
        <div className="mb-12 flex flex-wrap items-end justify-between gap-x-10 gap-y-6">
          <div>
            <div className="mb-6 flex items-center gap-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted">(05)</span>
              <p className="eyebrow">Recursos abiertos</p>
            </div>
            <SplitText
              as="h2"
              text="Herramientas *gratis*."
              className="block font-grotesk text-huge font-bold leading-[0.95] tracking-[-0.03em]"
            />
            <p className="mt-6 max-w-xl text-pretty text-muted md:text-lg">
              Lo que construyo para mi propio trabajo y publico en abierto: código para producir
              contenido y hacer marketing con IA, listo para clonar.
            </p>
          </div>
          <Link
            to="/recursos/"
            onClick={() => trackCta('Ver todos los recursos', 'resources_header')}
            className="link-underline font-grotesk text-sm text-santi"
          >
            {resources.length > SHOWN ? `Ver los ${resources.length} recursos →` : 'Ver todos los recursos →'}
          </Link>
        </div>
      </Reveal>

      <Reveal>
        <ResourceGrid items={items} source="home_resources" />
      </Reveal>
    </section>
  )
}
