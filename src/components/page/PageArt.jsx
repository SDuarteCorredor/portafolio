import { work, services } from '../../data'
import { CaseArt } from '../CaseArt'
import { ServiceGlyph } from '../ServiceGlyph'

// Portada de las páginas internas.
//
// El problema: las 19 rutas del sitio usan la misma plantilla editorial —
// H1, párrafo, CTA, intención, TL;DR y cuerpo. Correcta para leer, y
// completamente plana: ninguna tenía una sola imagen antes del primer bloque
// de texto. Alguien que abre /servicios/google-ads/ o /trabajo/nona-gastro-bar/
// ve un muro de tipografía y decide en dos segundos si se queda.
//
// Cada página recibe ahora una portada con volumen, a sangre del contenedor,
// antes de que empiece el texto. No es decoración genérica: sale del propio
// contenido de la página.
//
//   caso      → la escena de CaseArt del proyecto, con su métrica flotando
//   servicio  → la marca del servicio en grande, con sus etiquetas alrededor
//   resto     → el panel de atmósfera con las fichas del contexto
//
// El recurso común, que es el que da profundidad, son las fichas flotando en
// perspectiva sobre el panel: cada una lleva un dato real de la página.

/**
 * Ficha flotante. `tilt` la saca del plano del panel.
 *
 * Sigue el tema como el resto del sitio: en claro es una ficha de papel sobre
 * el panel, en oscuro es vidrio ahumado.
 */
function Chip({ children, className = '', tilt = 0, delay = '0s' }) {
  return (
    <span
      className={
        'pointer-events-none absolute z-10 inline-flex animate-floaty items-center gap-2 rounded-xl ' +
        'px-3.5 py-2 font-mono text-[10px] uppercase tracking-[0.14em] backdrop-blur-md ' +
        'border border-black/10 bg-white/85 text-ink shadow-[0_14px_34px_-14px_rgba(6,7,13,0.35)] ' +
        'dark:border-white/15 dark:bg-[#0B0D17]/80 dark:text-white/90 ' +
        'dark:shadow-[0_18px_40px_-14px_rgba(6,7,13,0.9)] ' +
        className
      }
      style={{ transform: `rotate(${tilt}deg)`, animationDelay: delay }}
    >
      {children}
    </span>
  )
}

/**
 * Panel base: atmósfera de color, rejilla y viñeta.
 *
 * Estaba fijo en casi negro (`bg-ink`) en los dos temas, así que en modo claro
 * cada portada era un bloque oscuro incrustado en una página de papel. Ahora
 * sigue al tema: fondo claro con el color en tinte suave, o fondo hundido con
 * el color en foco. Las piezas que sí van sobre negro —la escena de un caso,
 * el retrato— se siguen tratando como obra enmarcada sobre ese fondo, que es
 * la misma decisión que ya tomaba CaseCover.
 */
function Panel({ accent = '#1B3CFF', children, className = '' }) {
  return (
    <div
      className={
        'relative isolate overflow-hidden rounded-3xl border border-line ' +
        'bg-surface shadow-[0_24px_60px_-34px_rgba(6,7,13,0.35)] ' +
        'dark:bg-ink dark:shadow-[0_30px_80px_-40px_rgba(6,7,13,0.6)] ' +
        className
      }
      style={{ '--pa': accent }}
    >
      {/* Dos focos encontrados: es lo que le da cuerpo al fondo en vez de
          dejarlo como un rectángulo plano. En claro el color va mucho más
          diluido — sobre papel, la misma intensidad se vuelve una mancha. */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 dark:hidden"
        style={{
          background:
            'radial-gradient(70% 90% at 76% 12%, color-mix(in srgb, var(--pa) 20%, transparent), transparent 64%),' +
            'radial-gradient(60% 80% at 14% 88%, color-mix(in srgb, var(--pa) 12%, transparent), transparent 68%)',
        }}
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 hidden dark:block"
        style={{
          background:
            'radial-gradient(70% 90% at 76% 12%, color-mix(in srgb, var(--pa) 38%, transparent), transparent 62%),' +
            'radial-gradient(60% 80% at 14% 88%, color-mix(in srgb, var(--pa) 22%, transparent), transparent 66%)',
        }}
      />

      {/* Rejilla tenue: da escala y evita que el degradado se lea como una
          mancha suelta. Se dibuja con el color del texto, así que se invierte
          sola con el tema. */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 text-fg opacity-[0.10] dark:opacity-[0.16]"
        style={{
          backgroundImage:
            'linear-gradient(to right, currentColor 1px, transparent 1px),' +
            'linear-gradient(to bottom, currentColor 1px, transparent 1px)',
          backgroundSize: '44px 44px',
          maskImage: 'radial-gradient(70% 70% at 50% 50%, #000, transparent 78%)',
          WebkitMaskImage: 'radial-gradient(70% 70% at 50% 50%, #000, transparent 78%)',
        }}
      />
      {children}
    </div>
  )
}

// Arte generado que reemplaza a la escena dibujada de una ruta.
//
// Las escenas de este archivo son el piso: existen para que ninguna página
// quede plana mientras no haya arte final. Cuando llegue una pieza generada,
// se agrega acá y esa ruta la usa en lugar de la escena.
//
// Van DOS archivos por pieza, uno por tema, y no uno solo con transparencia.
// La razón es la que hace que las referencias de este estilo funcionen: buena
// parte de su fuerza está en el resplandor sangrando sobre el fondo. Recortado
// contra transparencia, el objeto queda flotando sin atmósfera y pierde
// justamente lo que se estaba buscando. Dos tomas de la misma escena —una
// montada sobre negro, otra sobre campo claro— conservan el efecto en los dos
// temas, y el sitio ya sabe intercambiar por tema.
//
// Requisitos de cada archivo:
//
//   · Proporción 4:5 y el objeto centrado con aire alrededor: el mismo archivo
//     se sirve en 4:3 (móvil), 16:10 (tablet) y 4:5 (escritorio), así que los
//     bordes se recortan.
//   · Sin texto ni logos dentro. El texto lo pone el sitio con tipografía real.
//   · El fondo del archivo tiene que casar con el panel: #06070D en oscuro,
//     #F7F6F2 en claro.
//
// Formato: { '<ruta>': { dark, light, alt } }. Vacío a propósito: una ruta que
// apunte a un archivo inexistente cuesta un request fallido por visita.
const ART_IMAGE = {
  '/servicios/': {
    dark: '/img/arte/servicios-dark',
    light: '/img/arte/servicios-light',
    alt: 'Seis piezas de vidrio esmerilado suspendidas en el vacío, iluminadas por un resplandor azul cenital.',
  },
}

/**
 * La pieza generada de una ruta, a sangre del panel.
 *
 * Va `object-cover` y sin padding: la pieza trae su propio fondo y su propio
 * aire, así que tiene que llenar el marco como una foto, no quedar contenida
 * con un borde alrededor.
 *
 * Cada entrada del mapa da la base del archivo sin extensión; acá se arma el
 * trío avif/webp/png, igual que el retrato en About.jsx.
 */
function ArtPicture({ base, alt, hidden = false }) {
  const common = 'absolute inset-0 h-full w-full object-cover'
  return (
    <picture className={hidden ? 'hidden dark:block' : 'dark:hidden'}>
      <source srcSet={`${base}.avif`} type="image/avif" />
      <source srcSet={`${base}.webp`} type="image/webp" />
      <img
        src={`${base}.png`}
        alt={hidden ? '' : alt}
        aria-hidden={hidden || undefined}
        decoding="async"
        className={common}
      />
    </picture>
  )
}

function ArtImage({ path }) {
  const art = ART_IMAGE[path]
  if (!art) return null

  return (
    <>
      <ArtPicture base={art.light} alt={art.alt} />
      <ArtPicture base={art.dark} alt={art.alt} hidden />
    </>
  )
}

/**
 * Placa: la superficie sobre la que se apoya una marca de servicio.
 *
 * Tiene que existir en los dos temas. La primera versión era `bg-white/[0.07]`
 * con borde blanco translúcido, que sobre el panel claro desaparecía: quedaba
 * un ícono suelto sin superficie.
 */
function Plate({ children, className = '', style }) {
  return (
    <span
      className={
        'grid place-items-center text-santi ' +
        'border border-black/[0.07] bg-white shadow-[0_18px_44px_-16px_rgba(27,60,255,0.45)] ' +
        'dark:border-white/15 dark:bg-white/[0.07] dark:backdrop-blur-md ' +
        'dark:shadow-[0_28px_70px_-18px_rgba(27,60,255,0.85)] ' +
        className
      }
      style={style}
    >
      {children}
    </span>
  )
}

/** Caso — la escena del proyecto, a lo ancho, con el resultado flotando. */
function CaseHeroArt({ page }) {
  const item = work.find((w) => `/trabajo/${w.slug}/` === page.path)
  if (!item) return null

  const meta = page.caseMeta || {}

  return (
    <Panel accent={item.accent} className="aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/5]">
      {/* La escena de CaseArt está compuesta en 16/10. Estirada al alto del
          panel se recortaba por los lados y se perdía justo el objeto. Va
          dentro de su propio marco, a su proporción, flotando sobre el fondo:
          además de no recortar, es la lectura que se buscaba — la pieza
          apoyada sobre la atmósfera, no pegada al fondo. */}
      <div className="absolute inset-0 grid place-items-center p-6 sm:p-8">
        <div
          className="w-full overflow-hidden rounded-2xl border border-white/10 shadow-[0_40px_90px_-30px_rgba(6,7,13,0.95)]"
          style={{ transform: 'rotate(-1.5deg)' }}
        >
          <div className="aspect-[16/10]">
            <CaseArt
              slug={item.slug}
              accent={item.accent}
              label={item.title}
              alt={item.coverAlt || `Portada del caso ${item.title}: ${item.kind}`}
            />
          </div>
        </div>
      </div>

      {/* El resultado es lo que se lleva quien solo mira la portada. */}
      <Chip className="left-4 top-4 sm:left-7 sm:top-7" tilt={-2}>
        <span className="h-1.5 w-1.5 rounded-full" style={{ background: item.accent }} />
        {item.metric}
      </Chip>

      {meta.year && (
        <Chip className="right-4 top-4 sm:right-7 sm:top-7" tilt={2} delay="-2.2s">
          {meta.year}
        </Chip>
      )}

      {meta.scope?.[0] && (
        <Chip className="bottom-4 left-4 hidden sm:inline-flex sm:bottom-7 sm:left-7" tilt={1.5} delay="-4s">
          {meta.scope.slice(0, 2).join(' · ')}
        </Chip>
      )}
    </Panel>
  )
}

// Las páginas de servicio del sitio no son exactamente los seis items de
// `services` en data.js: ahí Google y Meta van juntos en una fila, y acá cada
// uno tiene su página.
//
// Las etiquetas van escritas acá y no se toman de `page.keywords`: las palabras
// clave son frases de búsqueda ("publicidad en facebook e instagram") y no
// caben en una ficha — se salían del panel. Una ficha necesita dos palabras.
const SERVICE_BY_PATH = {
  '/servicios/google-ads/': { slug: 'google-ads', tags: ['Search', 'Performance Max', 'Remarketing'] },
  '/servicios/meta-ads/': { slug: 'meta-ads', tags: ['Facebook', 'Instagram', 'Creativo'] },
  '/servicios/seo-sem/': { slug: 'seo-sem', tags: ['SEO técnico', 'Contenido', 'SEM'] },
  '/servicios/ecommerce/': { slug: 'ecommerce', tags: ['WooCommerce', 'Shopify', 'CRO'] },
  '/servicios/branding/': { slug: 'branding', tags: ['Identidad', 'Brand book', 'Piezas'] },
  '/servicios/producto-ia/': { slug: 'producto-ia', tags: ['React', 'IA', 'Deploy'] },
}

/** Servicio — la marca en grande, con las etiquetas del servicio alrededor. */
function ServiceHeroArt({ page }) {
  const entry = SERVICE_BY_PATH[page.path]
  if (!entry) return null

  const { slug, tags } = entry
  const item = services.find((s) => s.slug === slug)

  return (
    <Panel className="aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/5]">
      {/* La marca, en placa y a tamaño de portada. */}
      <div className="absolute inset-0 grid place-items-center">
        <Plate className="h-32 w-32 rounded-[2rem] sm:h-40 sm:w-40">
          <ServiceGlyph service={{ slug, n: item?.n }} className="h-16 w-16 sm:h-20 sm:w-20" />
        </Plate>
      </div>

      {tags[0] && <Chip className="left-4 top-5 sm:left-[9%] sm:top-[18%]" tilt={-4}>{tags[0]}</Chip>}
      {tags[1] && (
        <Chip className="right-4 top-5 sm:right-[10%] sm:top-[24%]" tilt={3} delay="-2.4s">
          {tags[1]}
        </Chip>
      )}
      {tags[2] && (
        <Chip className="bottom-5 left-1/2 -translate-x-1/2 sm:bottom-[16%] sm:left-[16%] sm:translate-x-0" tilt={2} delay="-4.2s">
          {tags[2]}
        </Chip>
      )}
    </Panel>
  )
}

/**
 * Perfil — el retrato.
 *
 * La foto ya existía en el repo y solo aparecía en la sección "Perfil" de la
 * home, muy abajo. En la página que habla de quién es, la portada evidente es
 * la persona: para un reclutador es lo que más rápido construye confianza.
 */
function PortraitHeroArt({ facts }) {
  return (
    <Panel className="aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/5]">
      <picture>
        <source srcSet="/img/ivan-santiago-duarte-retrato-profesional.avif" type="image/avif" />
        <source srcSet="/img/ivan-santiago-duarte-retrato-profesional.webp" type="image/webp" />
        <img
          src="/img/ivan-santiago-duarte-retrato-profesional.png"
          alt="Retrato profesional de Iván Santiago Duarte"
          width="1200"
          height="1500"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </picture>

      {/* Degradado inferior: sostiene las fichas sobre la foto. */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent"
      />

      {facts.map((f, i) => (
        <Chip
          key={f}
          className={
            [
              'left-4 top-5 sm:left-6 sm:top-7',
              'right-4 top-5 sm:right-6 sm:top-7',
              'bottom-5 left-4 sm:bottom-7 sm:left-6',
            ][i]
          }
          tilt={[-3, 3, 2][i]}
          delay={['0s', '-2.4s', '-4.2s'][i]}
        >
          {f}
        </Chip>
      ))}
    </Panel>
  )
}

/**
 * Hub de trabajo — las portadas de los casos en abanico.
 *
 * Es la página que resume los ocho proyectos: mostrarlos apilados en
 * perspectiva dice de qué va antes de que la grilla aparezca al hacer scroll.
 */
function WorkHubArt() {
  const picks = ['bio-laboratorios', 'limonada-pink', 'lumi']
    .map((slug) => work.find((w) => w.slug === slug))
    .filter(Boolean)

  return (
    <Panel className="aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/5]">
      <div className="absolute inset-0 grid place-items-center [perspective:1100px]">
        <div className="relative w-[78%]">
          {picks.map((w, i) => (
            <div
              key={w.slug}
              className="absolute left-0 top-1/2 w-full overflow-hidden rounded-xl border border-white/10 shadow-[0_30px_70px_-24px_rgba(6,7,13,0.95)]"
              style={{
                // Cada portada se separa de la anterior en el eje Z y baja un
                // poco: la pila se lee como profundidad, no como desorden.
                transform: `translateY(-50%) translate(${(i - 1) * 9}%, ${(i - 1) * 13}%) rotateY(${
                  -16 + i * 5
                }deg) rotateZ(${-4 + i * 3.5}deg) scale(${0.86 + i * 0.07})`,
                zIndex: i,
              }}
            >
              <div className="aspect-[16/10]">
                <CaseArt slug={w.slug} accent={w.accent} label={w.title} alt="" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Panel>
  )
}

/**
 * Hub de servicios — las seis marcas en cascada.
 *
 * La primera versión era una grilla de 2 × 3 con una inclinación mínima. Sin
 * profundidad real se leía como seis botones planos, no como un sistema de
 * piezas: una rejilla regular es exactamente la forma de un icono de
 * aplicación. Acá las placas caen en diagonal dentro de un espacio con
 * perspectiva, cada una a su distancia, y la que está al frente es la más
 * grande y nítida.
 */
function ServicesHubArt() {
  const all = Object.values(SERVICE_BY_PATH)

  // Si ya hay pieza generada para esta ruta, manda ella.
  const generated = ART_IMAGE['/servicios/']
  if (generated) {
    return (
      <Panel className="aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/5]">
        <ArtImage path="/servicios/" />
      </Panel>
    )
  }

  return (
    <Panel className="aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/5]">
      <div className="absolute inset-0 grid place-items-center [perspective:1200px]">
        <div className="relative h-[78%] w-[78%] [transform-style:preserve-3d]">
          {all.map((s, i) => {
            // De atrás (arriba a la derecha, pequeña) al frente (abajo a la
            // izquierda, grande). `t` va de 0 a 1 a lo largo de la cascada.
            const t = i / (all.length - 1)
            const size = 26 + t * 16 // % del contenedor
            return (
              <Plate
                key={s.slug}
                className="absolute rounded-2xl"
                style={{
                  width: `${size}%`,
                  height: `${size}%`,
                  left: `${70 - t * 62}%`,
                  top: `${6 + t * 54}%`,
                  transform: `rotateX(14deg) rotateY(${-22 + t * 14}deg) rotateZ(${-8 + t * 5}deg)`,
                  zIndex: i,
                  opacity: 0.68 + t * 0.32,
                }}
              >
                <ServiceGlyph
                  service={{ slug: s.slug }}
                  className="h-1/2 w-1/2"
                />
              </Plate>
            )
          })}
        </div>
      </div>
    </Panel>
  )
}

/**
 * Resto de páginas — hoy solo contacto. No tiene un objeto propio que mostrar,
 * así que el panel se sostiene con la atmósfera y las fichas llevan los datos
 * que sí importan de esa página.
 */
function GenericHeroArt({ page, facts }) {
  return (
    <Panel className="aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/5]">
      {/* Anillos concéntricos: el objeto es la propia atmósfera. */}
      <div aria-hidden className="absolute inset-0 grid place-items-center">
        <span className="h-[62%] w-[62%] animate-spin-slower rounded-full border border-santi/50" />
        <span className="absolute h-[42%] w-[42%] animate-spin-slow rounded-full border border-dashed border-santi/60" />
        <span className="absolute h-[30%] w-[30%] rounded-full bg-santi/60 blur-2xl" />
        <span className="absolute h-[14%] w-[14%] rounded-full bg-santi/80 blur-md" />
      </div>

      {facts.map((f, i) => (
        <Chip
          key={f}
          className={
            [
              'left-4 top-5 sm:left-[10%] sm:top-[20%]',
              'right-4 top-5 sm:right-[11%] sm:top-[26%]',
              'bottom-5 left-1/2 -translate-x-1/2 sm:bottom-[18%] sm:left-[18%] sm:translate-x-0',
            ][i]
          }
          tilt={[-3, 3, 2][i]}
          delay={['0s', '-2.4s', '-4.2s'][i]}
        >
          {f}
        </Chip>
      ))}
    </Panel>
  )
}

const GENERIC_FACTS = {
  '/perfil/': ['+6 años', '24+ marcas', 'Bogotá, CO'],
  '/contacto/': ['Mismo día hábil', 'WhatsApp · Correo', 'Remote-ready'],
  '/trabajo/': ['8 casos', '+278% en ventas', '2019 — 2026'],
  '/servicios/': ['6 servicios', 'Estrategia a deploy', 'Medible'],
}

/**
 * @param {{ page: object }} props
 *
 * Devuelve `null` para una ruta sin arte definido, así que agregar una página
 * nueva nunca rompe la plantilla: simplemente queda sin portada hasta que se
 * le asigne una.
 */
export function PageArt({ page }) {
  if (!page) return null

  let art = null
  if (page.caseMeta) art = <CaseHeroArt page={page} />
  else if (SERVICE_BY_PATH[page.path]) art = <ServiceHeroArt page={page} />
  else if (page.path === '/perfil/') art = <PortraitHeroArt facts={GENERIC_FACTS[page.path]} />
  else if (page.path === '/trabajo/') art = <WorkHubArt />
  else if (page.path === '/servicios/') art = <ServicesHubArt />
  else if (GENERIC_FACTS[page.path]) art = <GenericHeroArt page={page} facts={GENERIC_FACTS[page.path]} />

  if (!art) return null

  return art
}

/**
 * ¿Esta ruta tiene portada? Lo consulta ContentPage para decidir si la cabecera
 * va a una o a dos columnas, sin tener que renderizar el arte para averiguarlo.
 */
export function hasPageArt(page) {
  if (!page) return false
  return Boolean(page.caseMeta || SERVICE_BY_PATH[page.path] || GENERIC_FACTS[page.path])
}
