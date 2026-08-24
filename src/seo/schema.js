// ─────────────────────────────────────────────────────────────────────────────
// Constructores de JSON-LD. Devuelven objetos planos; quien los renderiza los
// serializa dentro de <script type="application/ld+json">.
//
// Punto 19 → FAQPage · Punto 22 → LocalBusiness (+ ProfessionalService)
// Soporte → Person, WebSite, BreadcrumbList, Service, CreativeWork, WebPage
// ─────────────────────────────────────────────────────────────────────────────

import { SITE_URL, SITE_NAME, BUSINESS, absUrl, DEFAULT_OG } from './site.js'
import { breadcrumbFor } from '../content/index.js'

const ID = {
  business: `${SITE_URL}/#business`,
  person: `${SITE_URL}/#person`,
  website: `${SITE_URL}/#website`,
}

/** Quita claves nulas/vacías para que el JSON-LD salga limpio. */
function prune(obj) {
  if (Array.isArray(obj)) return obj.map(prune).filter((v) => v !== undefined)
  if (obj && typeof obj === 'object') {
    const out = {}
    for (const [k, v] of Object.entries(obj)) {
      const pv = prune(v)
      if (pv === null || pv === undefined) continue
      if (Array.isArray(pv) && pv.length === 0) continue
      out[k] = pv
    }
    return out
  }
  return obj
}

// ── Punto 22: negocio local ─────────────────────────────────────────────────
export function localBusinessSchema() {
  return prune({
    '@type': ['ProfessionalService', 'LocalBusiness'],
    '@id': ID.business,
    name: BUSINESS.name,
    legalName: BUSINESS.legalName,
    description: BUSINESS.description,
    url: `${SITE_URL}/`,
    image: absUrl(DEFAULT_OG).replace(/\/$/, ''),
    logo: `${SITE_URL}/favicon.svg`,
    email: BUSINESS.email,
    telephone: BUSINESS.telephone,
    priceRange: BUSINESS.priceRange,
    foundingDate: BUSINESS.foundingDate,
    currenciesAccepted: 'COP, USD',
    paymentAccepted: 'Transferencia bancaria, PSE',
    knowsLanguage: ['es', 'en'],
    address: {
      '@type': 'PostalAddress',
      streetAddress: BUSINESS.streetAddress,
      addressLocality: BUSINESS.addressLocality,
      addressRegion: BUSINESS.addressRegion,
      postalCode: BUSINESS.postalCode,
      addressCountry: BUSINESS.addressCountry,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: BUSINESS.latitude,
      longitude: BUSINESS.longitude,
    },
    areaServed: BUSINESS.areaServed.map((a) => ({ '@type': 'AdministrativeArea', name: a })),
    openingHoursSpecification: BUSINESS.openingHours.map((h) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: h.days,
      opens: h.opens,
      closes: h.closes,
    })),
    sameAs: BUSINESS.sameAs,
    founder: { '@id': ID.person },
    provider: { '@id': ID.person },
  })
}

export function personSchema(services = []) {
  return prune({
    '@type': 'Person',
    '@id': ID.person,
    name: SITE_NAME,
    alternateName: 'Santiago Duarte',
    url: `${SITE_URL}/`,
    image: absUrl('/img/ivan-santiago-duarte-especialista-marketing-digital-bogota.png').replace(/\/$/, ''),
    jobTitle: 'Especialista en Marketing Digital',
    email: BUSINESS.email,
    telephone: BUSINESS.telephone,
    description: BUSINESS.description,
    address: {
      '@type': 'PostalAddress',
      addressLocality: BUSINESS.addressLocality,
      addressRegion: BUSINESS.addressRegion,
      addressCountry: BUSINESS.addressCountry,
    },
    nationality: { '@type': 'Country', name: 'Colombia' },
    knowsLanguage: [
      { '@type': 'Language', name: 'Español', alternateName: 'es' },
      { '@type': 'Language', name: 'Inglés', alternateName: 'en' },
      { '@type': 'Language', name: 'Italiano', alternateName: 'it' },
    ],
    knowsAbout: [
      'Marketing digital', 'Google Ads', 'Meta Ads', 'SEO', 'SEM',
      'E-commerce', 'Branding', 'Google Analytics 4', 'Looker Studio',
      'WooCommerce', 'Shopify', 'Producto digital con inteligencia artificial',
    ],
    worksFor: { '@id': ID.business },
    sameAs: BUSINESS.sameAs,
    makesOffer: services.map((s) => ({
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name: s.navLabel, url: absUrl(s.path) },
    })),
  })
}

export function websiteSchema() {
  return prune({
    '@type': 'WebSite',
    '@id': ID.website,
    url: `${SITE_URL}/`,
    name: SITE_NAME,
    inLanguage: 'es-CO',
    publisher: { '@id': ID.person },
  })
}

// ── Punto 19: FAQ ───────────────────────────────────────────────────────────
export function faqSchema(faq = [], pageUrl) {
  if (!faq.length) return null
  return prune({
    '@type': 'FAQPage',
    '@id': `${pageUrl}#faq`,
    mainEntity: faq.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  })
}

export function breadcrumbSchema(path) {
  const chain = breadcrumbFor(path)
  if (chain.length < 2) return null
  return prune({
    '@type': 'BreadcrumbList',
    '@id': `${absUrl(path)}#breadcrumb`,
    itemListElement: chain.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.label,
      item: absUrl(c.path),
    })),
  })
}

function serviceSchema(page) {
  return prune({
    '@type': 'Service',
    '@id': `${absUrl(page.path)}#service`,
    name: page.navLabel,
    serviceType: page.navLabel,
    description: page.metaDescription,
    url: absUrl(page.path),
    provider: { '@id': ID.business },
    areaServed: BUSINESS.areaServed.map((a) => ({ '@type': 'AdministrativeArea', name: a })),
    audience: page.intent?.audience
      ? { '@type': 'Audience', audienceType: page.intent.audience }
      : undefined,
  })
}

function creativeWorkSchema(page) {
  const m = page.caseMeta || {}
  return prune({
    '@type': 'CreativeWork',
    '@id': `${absUrl(page.path)}#work`,
    name: m.client || page.navLabel,
    headline: page.h1,
    description: page.metaDescription,
    url: absUrl(page.path),
    creator: { '@id': ID.person },
    author: { '@id': ID.person },
    dateCreated: m.year ? String(m.year).slice(0, 4) : undefined,
    keywords: (page.keywords || []).join(', '),
    about: m.scope?.map((s) => ({ '@type': 'Thing', name: s })),
    sameAs: m.externalUrl ? [m.externalUrl] : undefined,
    image: page.image?.src ? absUrl(page.image.src).replace(/\/$/, '') : undefined,
  })
}

function webPageSchema(page) {
  const url = absUrl(page.path)
  const typeByPage = {
    ProfilePage: 'ProfilePage',
    AboutPage: 'AboutPage',
    ContactPage: 'ContactPage',
    CollectionPage: 'CollectionPage',
  }
  return prune({
    '@type': typeByPage[page.schemaType] || 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name: page.metaTitle,
    headline: page.h1,
    description: page.metaDescription,
    inLanguage: 'es-CO',
    isPartOf: { '@id': ID.website },
    about: { '@id': ID.person },
    datePublished: page.updated,
    dateModified: page.updated,
    primaryImageOfPage: page.image?.src
      ? { '@type': 'ImageObject', url: absUrl(page.image.src).replace(/\/$/, ''), caption: page.image.alt }
      : undefined,
    breadcrumb: breadcrumbFor(page.path).length > 1 ? { '@id': `${url}#breadcrumb` } : undefined,
  })
}

/**
 * Grafo completo de una página. Se emite como un único bloque @graph para que
 * las entidades se referencien entre sí por @id en vez de duplicarse.
 */
export function graphFor(page, allPages = []) {
  const url = absUrl(page.path)
  const services = allPages.filter((p) => p.cluster === 'servicios' && p.parent === '/servicios/')

  const nodes = [
    websiteSchema(),
    personSchema(services),
    localBusinessSchema(),
    webPageSchema(page),
    breadcrumbSchema(page.path),
    faqSchema(page.faq, url),
  ]

  if (page.schemaType === 'Service') nodes.push(serviceSchema(page))
  if (page.schemaType === 'CreativeWork') nodes.push(creativeWorkSchema(page))

  // El hub de trabajo lista sus casos como ItemList — ayuda a que Google
  // entienda el cluster (punto 17).
  if (page.schemaType === 'CollectionPage') {
    const children = allPages.filter((p) => p.parent === page.path)
    if (children.length) {
      nodes.push(
        prune({
          '@type': 'ItemList',
          '@id': `${url}#list`,
          numberOfItems: children.length,
          itemListElement: children.map((c, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: c.navLabel,
            url: absUrl(c.path),
          })),
        }),
      )
    }
  }

  return {
    '@context': 'https://schema.org',
    '@graph': nodes.filter(Boolean),
  }
}
