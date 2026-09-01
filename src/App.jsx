import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { useLenis } from './hooks/useLenis'
import { Nav } from './components/Nav'
import { SiteFooter } from './components/SiteFooter'
import { BackToTop } from './components/BackToTop'
import { MobileCta } from './components/MobileCta'
import { Cursor } from './components/Cursor'
import { ScrollProgress } from './components/motion/ScrollProgress'
import { pages, getPage } from './content/index.js'
import { useHead } from './seo/useHead'
import { initAnalytics, trackPageView, initScrollDepth } from './seo/analytics'
import Home from './pages/Home'
import ClusterHub from './pages/ClusterHub'
import StandardPage from './pages/StandardPage'
import NotFound from './pages/NotFound'

/** Elige la plantilla según el tipo de página del registro de contenido. */
function renderPage(page) {
  if (page.path === '/') return <Home page={page} />
  if (page.schemaType === 'CollectionPage') return <ClusterHub page={page} />
  return <StandardPage page={page} />
}

/** Vuelve arriba al cambiar de ruta (el scroll suave de Lenis no lo hace solo). */
function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) return // deja que el ancla haga su trabajo
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' in window ? 'instant' : 'auto' })
  }, [pathname, hash])

  return null
}

function Shell() {
  const { pathname } = useLocation()
  const page = getPage(pathname)

  // Puntos 1 y 3: título y descripción propios de esta ruta, también al
  // navegar sin recargar.
  useHead(page)

  // Punto 7: GA4 con page_view manual por ruta y profundidad de scroll.
  useEffect(() => { initAnalytics() }, [])
  useEffect(() => {
    if (!page) return
    trackPageView(pathname, page.metaTitle)
    return initScrollDepth(pathname)
  }, [pathname, page])

  return (
    <div className="grain relative">
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-full focus:bg-santi focus:px-5 focus:py-3 focus:font-grotesk focus:text-sm focus:text-white"
      >
        Saltar al contenido
      </a>

      {/* Progreso de lectura: con scroll suave la barra nativa del navegador
          queda oculta en escritorio y se pierde la referencia de cuánto falta. */}
      <ScrollProgress />

      {/* El glow que sigue al mouse. El componente ya existía pero nunca se
          había montado, así que en la práctica era código muerto. */}
      <Cursor />

      <Nav />
      <ScrollToTop />

      <main id="contenido">
        <Routes>
          {pages.map((p) => (
            <Route key={p.path} path={p.path} element={renderPage(p)} />
          ))}
          {/* Punto 25: cualquier subcarpeta /page/N responde con contenido
              existente pero marcada noindex desde el <head>. */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <SiteFooter />
      <BackToTop />
      {/* Punto 4 */}
      <MobileCta page={page} />
    </div>
  )
}

export default function App() {
  useLenis()
  return <Shell />
}
