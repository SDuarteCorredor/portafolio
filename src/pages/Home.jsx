import { Hero } from '../components/Hero'
import { Marquee } from '../components/Marquee'
import { Stats } from '../components/Stats'
import { Services } from '../components/Services'
import { Work } from '../components/Work'
import { About } from '../components/About'
import { Contact } from '../components/Contact'
import { Reveal } from '../components/Reveal'
import { SearchIntent } from '../components/page/SearchIntent'
import { Tldr } from '../components/page/Tldr'
import { Faq } from '../components/page/Faq'
import { Related } from '../components/page/Related'
import { ProseTable, ProseList, ProseP } from '../components/page/Prose'
import { ShareButton } from '../components/ShareButton'
import { stripAccent } from '../components/page/Accent'

// La home conserva el diseño de una sola página (hero, marquee, cifras, casos,
// servicios, perfil, contacto) y le suma encima las piezas de SEO: intención de
// búsqueda, TL;DR, cuerpo editorial, FAQ y relacionados.
//
// El CTA que exige el punto 15 ya está en el hero, justo debajo del primer
// párrafo, así que no se duplica aquí.

// El lead de la home son ~80 palabras. Completo en el hero es un muro: lo
// primero que ve el visitante es un párrafo, no el trabajo. Se muestra la
// primera frase arriba (que es la que posiciona y la que se lee) y el resto
// baja al bloque de introducción — el texto sigue en la página, solo deja de
// estar todo apilado en la portada.
function splitLead(lead = '') {
  const text = String(lead).trim()
  // Corta en el primer punto seguido de espacio y mayúscula: evita partir en
  // abreviaturas o en decimales.
  const m = text.match(/^(.+?\.)\s+(?=[A-ZÁÉÍÓÚÑ¿¡])/)
  if (!m) return [text, '']
  const first = m[1]
  // Una frase demasiado corta no sostiene el hero sola.
  if (first.length < 60) {
    const second = text.slice(m[0].length).match(/^(.+?\.)\s+(?=[A-ZÁÉÍÓÚÑ¿¡])/)
    if (second) return [`${first} ${second[1]}`, text.slice(m[0].length + second[0].length)]
  }
  return [first, text.slice(m[0].length)]
}

function Section({ section, index }) {
  return (
    <Reveal>
      <section className="mt-16 border-t border-line pt-12 first:mt-0">
        <div className="mb-5 flex items-center gap-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-santi">
            {String(index + 1).padStart(2, '0')}
          </span>
          <span className="h-px w-10 bg-line" />
        </div>

        <h2 className="max-w-[24ch] text-balance font-grotesk text-big font-bold leading-[1.06] tracking-[-0.02em] text-fg">
          {section.h2}
        </h2>

        {section.body?.map((p, i) => <ProseP key={i}>{p}</ProseP>)}
        <ProseList list={section.list} />
        <ProseTable table={section.table} />

        {section.subsections?.map((sub) => (
          <div key={sub.h3} className="mt-10">
            <h3 className="font-grotesk text-xl font-bold tracking-[-0.01em] text-fg md:text-2xl">
              {sub.h3}
            </h3>
            {sub.body?.map((p, i) => <ProseP key={i}>{p}</ProseP>)}
            <ProseList list={sub.list} />
            <ProseTable table={sub.table} />
          </div>
        ))}
      </section>
    </Reveal>
  )
}

export default function Home({ page }) {
  const [heroLead, restLead] = splitLead(stripAccent(page.lead))

  return (
    <>
      <Hero h1={page.h1} lead={heroLead} eyebrow={page.navLabel} />
      <Marquee />

      {/* El trabajo va primero: es un portafolio, lo que convence son los casos,
          no la explicación previa. Antes venían dos bloques de texto (intención
          de búsqueda y TL;DR) entre la portada y la primera imagen. */}
      <Work />
      <Stats />
      <Services />

      {/* Punto 10 y, pegado debajo, puntos 12 y 14. Ahora debajo del trabajo:
          quien llegó hasta acá ya vio los casos y sí quiere leer. */}
      <div className="container-x pt-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="eyebrow">Qué vas a encontrar acá</p>
          <ShareButton page={page} />
        </div>
        {restLead && (
          <p className="mt-6 max-w-3xl text-pretty text-lg text-muted">{restLead}</p>
        )}
        <SearchIntent intent={page.intent} />
        <Tldr items={page.tldr} />
      </div>

      {/* Cuerpo editorial con la jerarquía H2/H3 — punto 16 */}
      <div className="container-x pt-8">
        {page.sections?.map((s, i) => <Section key={s.h2} section={s} index={i} />)}
      </div>

      <About />

      <div className="container-x">
        <Reveal><Faq items={page.faq} path={page.path} /></Reveal>
        <Reveal><Related items={page.related} title="Por dónde seguir" /></Reveal>
      </div>

      <Contact />
    </>
  )
}
