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
  { value: '+278%', metric: 'en ventas', client: 'Bio Laboratorios', note: 'Rediseño de marca · e-commerce · SEO/SEM' },
  { value: '+120%', metric: 'en ventas', client: 'Nona Gastrobar', note: 'Apertura · +30 piezas · contenido' },
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
    desc: 'Planeo el camino completo: posicionamiento, embudos de conversión y un plan que conecta cada peso invertido con un resultado de negocio.',
    tags: ['Estrategia', 'Funnels', 'Branding'],
  },
  {
    n: '02',
    title: 'Publicidad que rinde — Google & Meta Ads',
    desc: 'Campañas PPC optimizadas a métricas reales (CTR, CPA, ROI). Menos gasto desperdiciado, más ventas medibles.',
    tags: ['Google Ads', 'Meta Ads', 'Remarketing'],
  },
  {
    n: '03',
    title: 'SEO / SEM',
    desc: 'Que te encuentren cuando importa. Posicionamiento orgánico y de pago para ganar visibilidad sostenible.',
    tags: ['SEO', 'SEM', 'Contenido'],
  },
  {
    n: '04',
    title: 'E-commerce',
    desc: 'Tiendas online que venden, en WooCommerce y Shopify. Desde el lanzamiento hasta la optimización continua.',
    tags: ['WooCommerce', 'Shopify', 'CRO'],
  },
  {
    n: '05',
    title: 'Branding & Diseño',
    desc: 'Identidad visual con criterio: +6 años como diseñador gráfico aplicados a marcas que se recuerdan.',
    tags: ['Identidad', 'Piezas', 'Adobe Suite'],
  },
  {
    n: '06',
    title: 'Producto digital con IA',
    desc: 'Construyo productos reales con inteligencia artificial — del concepto al deploy. No solo lo imagino: lo llevo a producción.',
    tags: ['IA', 'React', 'Producto'],
  },
]

export const work = [
  {
    title: 'Lumi',
    kind: 'Producto propio · IA',
    year: '2026',
    desc: 'App de bienestar emocional con chat de IA en tiempo real, detección de crisis y journey gamificado. React 19 + Supabase + Claude.',
    metric: 'De la idea al deploy',
    featured: true,
    accent: 'lumi',
    link: 'https://lumi-mvp-one.vercel.app',
    cta: 'Ver Lumi en vivo',
  },
  {
    title: 'BLU Smartphones',
    kind: 'E-commerce · Branding',
    year: '2025',
    desc: 'Proyecto integral para la marca de smartphones: e-commerce, identidad, contenido y analítica — de punta a punta.',
    metric: 'Proyecto end-to-end',
    link: 'https://www.behance.net/gallery/235221393/Blu-Smartphones-End-to-End-Project',
    cta: 'Ver en Behance',
  },
  {
    title: 'Nona Gastro Bar',
    kind: 'Branding · Marketing',
    year: '2024–2025',
    desc: 'Identidad de marca y apertura del restaurante: +30 piezas gráficas, contenido digital y operación liderando un equipo de 5.',
    metric: '+120% en ventas',
    link: 'https://www.behance.net/gallery/206774939/Nona-Gastro-Bar-Brand-Identity',
    cta: 'Ver en Behance',
  },
  {
    title: 'Limonada Pink',
    kind: 'Branding · E-commerce · Ads',
    year: '2025',
    desc: 'Brand book completo y tienda online, con campañas en Meta y Google Ads de punta a punta.',
    metric: 'Brand book + tienda',
    link: 'https://www.behance.net/gallery/223342905/Limonada-Pink-Brand-Book',
    cta: 'Ver en Behance',
  },
  {
    title: 'AIISO Consulting',
    kind: 'Estrategia · Web · Redes',
    year: '2025',
    desc: 'Junto a GrowthBro: perfil de negocio, redes y sitio web — estrategia digital end-to-end para la consultora.',
    metric: 'Estrategia end-to-end',
    link: 'https://www.behance.net/gallery/244325825/AIISO-Consulting',
    cta: 'Ver en Behance',
  },
  {
    title: 'GrowthBro',
    kind: 'Marketing · Operación',
    year: '2024',
    desc: 'Monté desde cero toda la operación de marketing y la presencia digital de la agencia.',
    metric: 'Operación completa',
    link: 'https://growthbro.co/',
    cta: 'Ver sitio',
  },
  {
    title: 'Asignar',
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
