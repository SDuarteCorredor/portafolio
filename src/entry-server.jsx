import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import App from './App.jsx'

/**
 * Renderiza una ruta a HTML. Lo consume `scripts/prerender.mjs` durante el
 * build para dejar cada URL como un archivo estático con su contenido completo,
 * sin depender de que el crawler ejecute JavaScript.
 */
export function render(url) {
  return renderToString(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>,
  )
}

// El prerender consume estos módulos a través del bundle de SSR (y no por
// import directo) para que Vite ya haya resuelto import.meta.env dentro de
// ellos — ahí viven el ID de GA4 y el token de verificación de Search Console.
export { buildHead, renderHeadToHtml } from './seo/head.js'
export { pages, getPage } from './content/index.js'
export { SITE_URL, SITE_NAME, BUSINESS, absUrl, isPaginated } from './seo/site.js'
