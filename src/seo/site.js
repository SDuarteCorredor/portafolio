// ─────────────────────────────────────────────────────────────────────────────
// Configuración global de SEO. Única fuente de verdad para canonicals, sitemap,
// robots, llms.txt y JSON-LD. Si cambia el dominio, se cambia SOLO aquí.
// ─────────────────────────────────────────────────────────────────────────────

export const SITE_URL = 'https://ivansantiagoduarte.com'
export const SITE_NAME = 'Iván Santiago Duarte'
export const LOCALE = 'es_CO'
export const LANG = 'es'

// Imagen social por defecto (1200×630). Nombre descriptivo — punto 20.
export const DEFAULT_OG = '/og/ivan-santiago-duarte-marketing-digital-bogota.png'

// Datos de negocio — alimentan el schema de LocalBusiness (punto 22).
export const BUSINESS = {
  name: 'Iván Santiago Duarte — Marketing Digital',
  legalName: 'Iván Santiago Duarte',
  description:
    'Especialista en marketing digital en Bogotá: Google Ads, Meta Ads, SEO/SEM, ' +
    'e-commerce, branding y productos digitales con inteligencia artificial.',
  email: 'ivansantiagoduarte@outlook.com',
  telephone: '+573165371483',
  whatsapp: 'https://wa.me/573165371483',
  streetAddress: null, // trabajo remoto — sin dirección física pública
  addressLocality: 'Bogotá',
  addressRegion: 'Cundinamarca',
  postalCode: '110111',
  addressCountry: 'CO',
  latitude: 4.710989,
  longitude: -74.072092,
  priceRange: '$$',
  foundingDate: '2016',
  areaServed: ['Colombia', 'México', 'España', 'Estados Unidos', 'LATAM'],
  openingHours: [{ days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '08:00', closes: '18:00' }],
  sameAs: [
    'https://www.linkedin.com/in/santiagoduartec',
    'https://www.behance.net/santiagoduartec',
  ],
}

/**
 * Construye una URL absoluta a partir de una ruta interna.
 * Normaliza a trailing slash para que canonical y sitemap no se desalineen.
 */
export function absUrl(path = '/') {
  if (/^https?:\/\//.test(path)) return path
  const clean = `/${String(path).replace(/^\/+|\/+$/g, '')}`
  return clean === '/' ? `${SITE_URL}/` : `${SITE_URL}${clean}/`
}

/**
 * Detecta rutas paginadas (/page/2/, /blog/page/3/…) — punto 25.
 * Estas se sirven con noindex,follow y quedan fuera del sitemap.
 */
export function isPaginated(path = '/') {
  return /(^|\/)page\/\d+\/?$/.test(String(path))
}
