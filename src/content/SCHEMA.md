# Contrato de contenido de página

Cada página del sitio es un objeto plano con esta forma. El renderizador
(`src/pages/ContentPage.jsx`) y el generador de sitemap/JSON-LD dependen de él,
así que **los nombres de campo no se cambian**.

```js
{
  // ── Identidad y URL ───────────────────────────────────────────────────────
  path: '/servicios/google-ads/',   // SIN números ni conectores (de, y, con, para, en, el, la)
  cluster: 'servicios',             // 'home' | 'servicios' | 'trabajo' | 'perfil' | 'contacto'
  parent: '/servicios/',            // null en la home. Alimenta breadcrumbs.
  navLabel: 'Google Ads',           // texto corto para breadcrumb y enlaces internos

  // ── SEO (puntos 1, 3, 8) ──────────────────────────────────────────────────
  metaTitle: '…',        // 45–60 caracteres. ÚNICO en todo el sitio.
  metaDescription: '…',  // 140–158 caracteres. ÚNICO. Con beneficio + CTA implícito.
  h1: '…',               // DISTINTO del metaTitle (punto 8). Uno solo por página (punto 5).
  keywords: ['…'],       // 3–6 términos objetivo, para llms.txt y referencia interna

  // ── Intención de búsqueda (punto 10) ──────────────────────────────────────
  intent: {
    type: 'transaccional',  // informacional | navegacional | comercial | transaccional
    query: 'agencia google ads bogotá',   // la búsqueda representativa que resuelve
    audience: 'Para quién es…',           // 1 frase
    problem: 'Qué problema resuelve…',    // 1 frase
    outcome: 'Qué se lleva quien lee…',   // 1 frase
  },

  // ── TL;DR / Key takeaways (puntos 12 y 14) ────────────────────────────────
  // Se renderiza JUSTO DESPUÉS del bloque de intención.
  tldr: ['…', '…', '…'],   // 3–5 bullets, cada uno con un dato o promesa concreta

  // ── Apertura + CTA después del primer párrafo (punto 15) ──────────────────
  lead: 'Primer párrafo, 2–4 frases…',
  ctaInline: { label: 'Hablemos por WhatsApp', href: 'whatsapp' },
  // href acepta: 'whatsapp' | 'email' | 'linkedin' | 'behance' | una ruta interna '/contacto/'

  // ── Cuerpo (punto 16: H1 → H2 → H3, sin saltos) ───────────────────────────
  sections: [
    {
      h2: 'Título de sección',
      body: ['párrafo…', 'párrafo…'],       // opcional
      list: {                               // opcional (punto 18)
        variant: 'ul',                      // 'ul' | 'ol' | 'check'
        title: 'Título opcional de la lista',
        items: ['…', '…'],
      },
      table: {                              // opcional (punto 18)
        caption: 'Qué compara la tabla',
        head: ['Columna A', 'Columna B'],
        rows: [['a1', 'b1'], ['a2', 'b2']],
      },
      subsections: [                        // opcional → H3
        { h3: 'Subtítulo', body: ['…'], list: {…}, table: {…} },
      ],
    },
  ],

  // ── FAQ con schema (punto 19) ─────────────────────────────────────────────
  faq: [{ q: 'Pregunta con la que la gente busca…', a: 'Respuesta de 2–4 frases…' }],

  // ── Interlinkeado y clusters (punto 17) ───────────────────────────────────
  related: [
    { path: '/servicios/seo-sem/', label: 'SEO y SEM', note: 'Por qué le sirve al lector' },
  ],

  // ── Imagen (puntos 20 y 21) ───────────────────────────────────────────────
  image: {
    src: '/og/google-ads-bogota-ivan-santiago-duarte.png',  // nombre descriptivo, en kebab-case
    alt: 'Descripción real de lo que se ve, con contexto…', // NUNCA keyword stuffing
    width: 1200, height: 630,
  },

  // ── Metadatos de schema opcionales ────────────────────────────────────────
  schemaType: 'Service',   // 'Service' | 'CreativeWork' | 'AboutPage' | 'ContactPage' | 'CollectionPage' | 'ProfilePage'
  updated: '2026-08-24',   // ISO. Alimenta <lastmod> del sitemap.
  priority: 0.8,           // prioridad en el sitemap
}
```

## Reglas duras (las valida `scripts/audit-seo.mjs`)

1. `metaTitle` único, 45–60 caracteres.
2. `metaDescription` única, 140–158 caracteres.
3. `h1` distinto del `metaTitle`, y exactamente un `<h1>` en el HTML final.
4. Nunca se salta un nivel: `h2` antes de cualquier `h3`.
5. `path` en minúsculas, kebab-case, sin dígitos y sin conectores
   (`de`, `del`, `y`, `e`, `o`, `con`, `sin`, `para`, `por`, `en`, `el`, `la`,
   `los`, `las`, `un`, `una`, `al`).
6. Toda imagen lleva `alt` descriptivo de más de 15 caracteres.
7. `related` apunta solo a rutas que existen en el registro.
8. Mínimo 3 entradas de `faq` y mínimo 3 bullets de `tldr`.
9. Al menos una `table` o una `list` por página (punto 18).

## Tono de la redacción

Español de Colombia, primera persona ("trabajo con…", "monté…"), directo y sin
relleno corporativo. Cifras concretas antes que adjetivos. Nada de "soluciones
integrales 360°" ni promesas que el perfil no respalda. Los datos reales
disponibles están en `src/data.js`.
