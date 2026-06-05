// Contenido del portafolio — todo viene del perfil de Iván Santiago Duarte.
// Editá libremente aquí: el sitio se actualiza solo.

export const profile = {
  name: 'Iván Santiago Duarte',
  short: 'Santiago Duarte',
  role: 'Especialista en Marketing Digital',
  location: 'Bogotá, Colombia',
  email: 'igivansd@gmail.com',
  whatsapp: '+57 316 537 1483',
  whatsappLink: 'https://wa.me/573165371483',
  linkedin: 'https://www.linkedin.com/in/santiagoduartec',
  behance: 'https://www.behance.net/santiagoduartec',
}

export const stats = [
  { value: '+278%', label: 'en ventas — Bio Laboratorios' },
  { value: '+120%', label: 'en ventas — Nona Gastrobar' },
  { value: '24+', label: 'marcas posicionadas' },
  { value: '+6', label: 'años de experiencia' },
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
    link: '#',
  },
  {
    title: 'Bio Laboratorios Estelar',
    kind: 'Marketing · E-commerce',
    year: '2019–2022',
    desc: 'Rediseño de marca y estrategia integral. E-commerce en WooCommerce, SEO/SEM y automatización.',
    metric: '+278% en ventas · 24+ marcas',
    link: null,
  },
  {
    title: 'Nona Gastrobar',
    kind: 'Marketing · Operaciones',
    year: '2024–2025',
    desc: 'Apertura del restaurante liderando un equipo de 5. +30 piezas gráficas y contenido digital.',
    metric: '+120% en ventas',
    link: null,
  },
  {
    title: 'Limonada Pink',
    kind: 'E-commerce · Ads',
    year: '2025',
    desc: 'Creación de tienda online y campañas en Meta Ads y Google Ads de punta a punta.',
    metric: 'Tienda + campañas',
    link: null,
  },
  {
    title: 'BLU Products / RAEN',
    kind: 'E-commerce · Analítica',
    year: '2025',
    desc: 'Apertura de tienda online, gestión de redes y reporting avanzado en GA4 y Looker Studio.',
    metric: 'Reporting avanzado',
    link: null,
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
    { k: 'Educación', v: 'Maestría en Marketing (USTA) · Tec. Diseño Gráfico' },
    { k: 'Stack', v: 'Google Ads · Meta · GA4 · Looker · WooCommerce · React · IA' },
    { k: 'Base', v: 'Bogotá, Colombia · Remote-ready' },
  ],
}
