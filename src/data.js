// Contenido del portafolio — todo viene del perfil de Iván Santiago Duarte.
// Editá libremente aquí: el sitio se actualiza solo.

export const profile = {
  name: 'Iván Santiago Duarte',
  short: 'Santiago Duarte',
  role: 'Especialista en Marketing Digital',
  location: 'Bogotá, Colombia',
  email: 'ivansantiagoduarte@outlook.com',
  whatsapp: '+57 316 537 1483',
  whatsappLink: 'https://wa.me/573165371483',
  linkedin: 'https://www.linkedin.com/in/santiagoduartec',
  behance: 'https://www.behance.net/santiagoduartec',
}

export const stats = [
  { value: '+278%', metric: 'en ventas', client: 'Bio Laboratorios', note: 'Rediseño de marca · e-commerce · SEO/SEM', slug: 'bio-laboratorios' },
  { value: '+120%', metric: 'en ventas', client: 'Nona Gastrobar', note: 'Apertura · +30 piezas · contenido', slug: 'nona-gastro-bar' },
  { value: '24+', metric: 'marcas posicionadas', client: null, note: 'Nacionales e internacionales' },
  { value: '+6', metric: 'años en el oficio', client: null, note: 'De diseñador a producto con IA' },
]

// Palabras para el marquee
export const ticker = [
  'Google Ads', 'Meta Ads', 'SEO / SEM', 'E-commerce', 'Branding',
  'GA4', 'Looker Studio', 'WooCommerce', 'Shopify', 'Diseño',
  'Producto con IA', 'Automatización', 'Funnels',
]

export const services = [
  {
    n: '01',
    title: 'Estrategia de marketing digital',
    slug: null,
    desc: 'Planeo el camino completo: posicionamiento, embudos de conversión y un plan que conecta cada peso invertido con un resultado de negocio.',
    tags: ['Estrategia', 'Funnels', 'Branding'],
  },
  {
    n: '02',
    title: 'Publicidad que rinde — Google & Meta Ads',
    slug: 'google-ads',
    desc: 'Campañas PPC optimizadas a métricas reales (CTR, CPA, ROI). Menos gasto desperdiciado, más ventas medibles.',
    tags: ['Google Ads', 'Meta Ads', 'Remarketing'],
  },
  {
    n: '03',
    title: 'SEO / SEM',
    slug: 'seo-sem',
    desc: 'Que te encuentren cuando importa. Posicionamiento orgánico y de pago para ganar visibilidad sostenible.',
    tags: ['SEO', 'SEM', 'Contenido'],
  },
  {
    n: '04',
    title: 'E-commerce',
    slug: 'ecommerce',
    desc: 'Tiendas online que venden, en WooCommerce y Shopify. Desde el lanzamiento hasta la optimización continua.',
    tags: ['WooCommerce', 'Shopify', 'CRO'],
  },
  {
    n: '05',
    title: 'Branding & Diseño',
    slug: 'branding',
    desc: 'Identidad visual con criterio: +6 años como diseñador gráfico aplicados a marcas que se recuerdan.',
    tags: ['Identidad', 'Piezas', 'Adobe Suite'],
  },
  {
    n: '06',
    title: 'Producto digital con IA',
    slug: 'producto-ia',
    desc: 'Construyo productos reales con inteligencia artificial — del concepto al deploy. No solo lo imagino: lo llevo a producción.',
    tags: ['IA', 'React', 'Producto'],
  },
]

// Cada caso puede llevar arte propio. Sin estos campos, CaseCover dibuja una
// escena generativa derivada del slug — nunca queda un hueco vacío.
//
//   hook:     'una línea'              gancho corto para la tarjeta. `desc` sigue
//                                      existiendo y se usa donde hay espacio;
//                                      la tarjeta prefiere `hook` porque ahí
//                                      manda la imagen, no el párrafo.
//   accent:   '#FF6B35'                color propio del caso. Tiñe la escena
//                                      generativa, el borde en hover y las
//                                      etiquetas de la tarjeta. Es lo que hace
//                                      que la grilla se lea como ocho proyectos
//                                      distintos y no como ocho iguales.
//   cover:    '/img/casos/lumi.webp'   imagen de portada (16/10 en las tarjetas
//                                      normales, 4/3 en la destacada)
//   coverAlt: 'texto alternativo'      opcional; si falta se arma con título y tipo
//   video:    '/video/lumi.mp4'        bucle mudo; tiene prioridad sobre cover
//   poster:   '/img/casos/lumi.webp'   primer fotograma mientras carga el video
//
// Los archivos van en public/ y se referencian con ruta absoluta. Conviene
// pasar las imágenes por `npm run images` para generar webp/avif.
export const work = [
  {
    title: 'Lumi',
    slug: 'lumi',
    hook: 'Chat de IA en tiempo real, detección de crisis y journey gamificado.',
    kind: 'Producto propio · IA',
    year: '2026',
    desc: 'App de bienestar emocional con chat de IA en tiempo real, detección de crisis y journey gamificado. React 19 + Supabase + Claude.',
    metric: 'De la idea al deploy',
    featured: true,
    accent: '#FF6B35',
    link: 'https://lumi-mvp-one.vercel.app',
    cta: 'Ver Lumi en vivo',
  },
  {
    title: 'BLU Smartphones',
    slug: 'blu-smartphones',
    hook: 'Marca, tienda y medición armadas juntas, de punta a punta.',
    accent: '#00C2FF',
    kind: 'E-commerce · Branding',
    year: '2025',
    desc: 'Proyecto integral para la marca de smartphones: e-commerce, identidad, contenido y analítica — de punta a punta.',
    metric: 'Proyecto end-to-end',
    link: 'https://www.behance.net/gallery/235221393/Blu-Smartphones-End-to-End-Project',
    cta: 'Ver en Behance',
  },
  {
    title: 'Nona Gastro Bar',
    slug: 'nona-gastro-bar',
    hook: 'Identidad y apertura, con +30 piezas y un equipo de 5.',
    accent: '#FF2D55',
    kind: 'Branding · Marketing',
    year: '2024–2025',
    desc: 'Identidad de marca y apertura del restaurante: +30 piezas gráficas, contenido digital y operación liderando un equipo de 5.',
    metric: '+120% en ventas',
    link: 'https://www.behance.net/gallery/206774939/Nona-Gastro-Bar-Brand-Identity',
    cta: 'Ver en Behance',
  },
  {
    title: 'Limonada Pink',
    slug: 'limonada-pink',
    hook: 'Brand book completo, tienda online y campañas en Meta y Google.',
    accent: '#FF3D8B',
    kind: 'Branding · E-commerce · Ads',
    year: '2025',
    desc: 'Brand book completo y tienda online, con campañas en Meta y Google Ads de punta a punta.',
    metric: 'Brand book + tienda',
    link: 'https://www.behance.net/gallery/223342905/Limonada-Pink-Brand-Book',
    cta: 'Ver en Behance',
  },
  {
    title: 'AIISO Consulting',
    slug: 'aiiso-consulting',
    hook: 'Perfil de negocio, redes y sitio para la consultora.',
    accent: '#6B4CFF',
    kind: 'Estrategia · Web · Redes',
    year: '2025',
    desc: 'Junto a GrowthBro: perfil de negocio, redes y sitio web — estrategia digital end-to-end para la consultora.',
    metric: 'Estrategia end-to-end',
    link: 'https://www.behance.net/gallery/244325825/AIISO-Consulting',
    cta: 'Ver en Behance',
  },
  {
    title: 'GrowthBro',
    slug: 'growthbro',
    hook: 'La operación de marketing de la agencia, montada desde cero.',
    accent: '#A3FF3D',
    kind: 'Marketing · Operación',
    year: '2024',
    desc: 'Monté desde cero toda la operación de marketing y la presencia digital de la agencia.',
    metric: 'Operación completa',
    link: 'https://growthbro.co/',
    cta: 'Ver sitio',
  },
  {
    title: 'Asignar',
    slug: 'asignar',
    hook: 'Estrategia de campañas y funnels. Caso abierto.',
    accent: '#00D4FF',
    kind: 'Campañas · Funnels',
    year: '2026',
    desc: 'Estrategia de campañas y funnels de performance — optimización interna mientras renovamos el diseño.',
    metric: 'Campañas + funnels',
    link: null,
    cta: 'Próximamente',
  },
]

export const about = {
  lead: 'Soy un híbrido raro: marketero que diseña y ahora construye productos con IA.',
  body: [
    'Empecé como diseñador gráfico en 2016 y crecí hasta liderar estrategias de marketing que mueven números reales. En el camino aprendí algo poco común: a unir la creatividad con el análisis, el diseño con las métricas.',
    'Hoy combino estrategia, diseño y código. Manejo Google & Meta Ads, SEO/SEM, e-commerce y analítica (GA4, Looker Studio) — y construyo productos digitales con inteligencia artificial, como Lumi.',
    'Mi propósito es simple: aportar valor y generar resultados comerciales tangibles para las marcas con las que trabajo.',
  ],
  facts: [
    { k: 'Idiomas', v: 'Español nativo · Inglés C1 · Italiano básico' },
    { k: 'Stack', v: 'Google Ads · Meta · GA4 · Looker · WooCommerce · React · IA' },
    { k: 'Base', v: 'Bogotá, Colombia · Remote-ready' },
  ],
}

export const education = [
  { title: 'Diplomatura en Marketing Digital', school: 'Coderhouse', period: '2024 — 2026' },
  { title: 'Maestría en Marketing', school: 'Universidad Santo Tomás', period: '2019 — 2024' },
  { title: 'Tec. en Diseño Gráfico', school: 'Universidad Central', period: '2017 — 2019' },
]

export const certifications = [
  { name: 'SEO y Content Marketing', issuer: 'Santander', year: '2026' },
  { name: 'Display de Google Ads', issuer: 'Google Skillshop', year: '2026' },
  { name: 'Búsqueda de Google Ads', issuer: 'Google Skillshop', year: '2026' },
  { name: 'Search Ads 360', issuer: 'Google Skillshop', year: '2025' },
  { name: 'Google Analytics (GA4)', issuer: 'Google Skillshop', year: '2025' },
  { name: 'Google Ads — Medición', issuer: 'Google Skillshop', year: '2025' },
  { name: 'Git & GitHub', issuer: 'Daxus Latam', year: '2026' },
  { name: 'Community Manager y Publicidad', issuer: 'Coderhouse', year: '2021' },
  { name: 'E-commerce', issuer: 'Coderhouse', year: '2021' },
  { name: 'Fundamentos de Power BI', issuer: 'Daxus Latam', year: '2025' },
  { name: 'Primeros pasos en IA', issuer: 'Daxus Latam', year: '2026' },
  { name: 'Aplicaciones con IA', issuer: 'Daxus Latam', year: '2026' },
]
