// EJEMPLO DE REFERENCIA — no se importa en el sitio. Sirve de modelo exacto de
// profundidad, tono y estructura para el resto de páginas. Ver SCHEMA.md.

export const referencia = {
  path: '/servicios/google-ads/',
  cluster: 'servicios',
  parent: '/servicios/',
  navLabel: 'Google Ads',

  metaTitle: 'Google Ads en Bogotá | Campañas medidas al CPA',
  metaDescription:
    'Gestiono campañas de Google Ads enfocadas en CPA y ROI, no en clics. Estructura, keywords negativas y medición en GA4. Escríbeme y revisamos tu cuenta.',
  h1: 'Campañas de Google Ads que se miden en ventas, no en clics',
  keywords: ['google ads bogotá', 'campañas google ads', 'ppc colombia', 'agencia sem bogotá'],

  intent: {
    type: 'transaccional',
    query: 'agencia google ads bogotá',
    audience:
      'Negocios que ya invierten en Google Ads y no saben cuánto de ese gasto vuelve como venta.',
    problem:
      'Cuentas heredadas con campañas mal estructuradas, sin keywords negativas y con conversiones mal configuradas.',
    outcome:
      'Un diagnóstico claro de dónde se está fugando el presupuesto y una estructura de campaña que puedas auditar tú mismo.',
  },

  tldr: [
    'Reestructuro la cuenta por intención de búsqueda, no por producto: cada grupo de anuncios responde a una búsqueda real.',
    'Antes de tocar pujas, arreglo la medición: sin conversiones bien configuradas en GA4, optimizar es adivinar.',
    'Trabajo con métricas de negocio (CPA, ROAS, ticket promedio), no con métricas de vanidad como impresiones o CTR aislado.',
    'Con Bio Laboratorios esta forma de trabajar acompañó un crecimiento de +278% en ventas.',
  ],

  lead:
    'La mayoría de las cuentas de Google Ads que reviso tienen el mismo problema: gastan bien, pero miden mal. Hay presupuesto corriendo en términos que nunca van a convertir, conversiones duplicadas que inflan el reporte y campañas que compiten entre sí por la misma búsqueda. Antes de subir un peso de inversión, hay que saber qué está pasando.',
  ctaInline: { label: 'Cuéntame qué está pasando con tu cuenta', href: 'whatsapp' },

  sections: [
    {
      h2: 'Cómo trabajo una cuenta de Google Ads',
      body: [
        'El orden importa. Optimizar pujas sobre una medición rota es la forma más cara de perder tiempo, así que el trabajo siempre empieza por el mismo lado: entender qué se está midiendo y si eso que se mide tiene algo que ver con el negocio.',
      ],
      list: {
        variant: 'ol',
        title: 'Las cuatro fases',
        items: [
          'Auditoría de medición: conversiones en GA4, importación a Google Ads, deduplicación y verificación de que cada evento corresponde a algo que genera dinero.',
          'Reestructura por intención: separo búsquedas de marca, genéricas y de competencia, porque no valen lo mismo ni deberían pujar igual.',
          'Limpieza de desperdicio: keywords negativas, ubicaciones, horarios y dispositivos que consumen presupuesto sin devolver nada.',
          'Escalado controlado: subo inversión solo donde el CPA aguanta, y documento qué se cambió para que puedas replicarlo o auditarlo.',
        ],
      },
      subsections: [
        {
          h3: 'Qué reviso en la auditoría inicial',
          body: [
            'La auditoría es concreta y se entrega por escrito. No es un PDF genérico: es la lista de lo que está mal en tu cuenta, con el impacto estimado de cada arreglo.',
          ],
          list: {
            variant: 'check',
            items: [
              'Conversiones activas contra conversiones que realmente importan para el negocio.',
              'Términos de búsqueda de los últimos 90 días y cuánto se fue en búsquedas irrelevantes.',
              'Solapamiento entre campañas y canibalización de marca.',
              'Calidad de los anuncios y correspondencia con la landing page.',
              'Configuración de Performance Max y qué está canibalizando de Search.',
            ],
          },
        },
        {
          h3: 'Qué necesito de tu lado',
          body: [
            'Acceso de lectura a Google Ads y GA4, y una conversación de treinta minutos sobre el negocio: cuánto vale un cliente, cuánto dura, y qué margen deja. Sin ese dato, cualquier objetivo de CPA es un número inventado.',
          ],
        },
      ],
    },
    {
      h2: 'Qué tipo de campaña le sirve a tu negocio',
      body: [
        'No todas las campañas resuelven lo mismo. Esta es la lectura corta de cuándo tiene sentido cada formato, para que no pagues por alcance cuando lo que necesitas son ventas.',
      ],
      table: {
        caption: 'Formatos de Google Ads según el objetivo del negocio',
        head: ['Formato', 'Cuándo tiene sentido', 'Métrica que manda'],
        rows: [
          ['Búsqueda', 'Ya existe demanda: la gente busca lo que vendes', 'CPA y tasa de conversión'],
          ['Performance Max', 'Catálogo amplio de e-commerce con datos de conversión sanos', 'ROAS'],
          ['Display / Remarketing', 'Recuperar carritos y visitas que no cerraron', 'Costo por retorno'],
          ['YouTube', 'Categoría nueva que hay que explicar antes de vender', 'Costo por vista completa'],
          ['Shopping', 'E-commerce con feed de producto bien armado', 'ROAS y margen por producto'],
        ],
      },
    },
    {
      h2: 'Métricas con las que reporto',
      body: [
        'Los reportes salen en Looker Studio y están conectados en vivo: puedes abrirlos cualquier día del mes, no solo cuando yo te los envío. La idea es que no dependas de mí para saber cómo va la inversión.',
      ],
      list: {
        variant: 'ul',
        items: [
          'CPA por campaña y su distancia contra el CPA objetivo que definimos con tu margen.',
          'ROAS cuando hay e-commerce con ingresos trackeados.',
          'Porcentaje de impresiones perdidas por presupuesto, que indica cuánta demanda estás dejando sobre la mesa.',
          'Términos de búsqueda nuevos de la semana, para decidir qué se suma y qué se bloquea.',
        ],
      },
    },
  ],

  faq: [
    {
      q: '¿Cuánto presupuesto necesito para empezar en Google Ads?',
      a: 'Depende del CPA de tu categoría, no de una cifra fija. La regla práctica que uso: necesitas al menos treinta conversiones al mes para que el algoritmo aprenda, así que el piso es treinta veces tu CPA estimado. Si eso no cabe en el presupuesto, conviene empezar por búsquedas de marca y de intención muy alta antes que abrir campañas genéricas.',
    },
    {
      q: '¿En cuánto tiempo se ven resultados?',
      a: 'Las primeras señales aparecen entre dos y tres semanas, que es lo que tarda una campaña en salir de la fase de aprendizaje. Resultados estables y comparables contra el mes anterior, entre sesenta y noventa días. Cualquiera que prometa resultados en la primera semana está optimizando para tu firma, no para tu cuenta.',
    },
    {
      q: '¿Trabajas con cuentas que ya existen o solo desde cero?',
      a: 'Con las dos, y la mayoría de las veces es una cuenta que ya existe. En cuentas heredadas el primer mes suele ser de limpieza más que de crecimiento, porque conviene arreglar la medición y cortar el desperdicio antes de escalar algo que no se entiende.',
    },
    {
      q: '¿Cobras porcentaje de la inversión publicitaria?',
      a: 'No. Cobro un fee fijo mensual porque cobrar un porcentaje crea un incentivo torcido: me convendría que gastaras más, no que gastaras mejor. El fee se define según el número de campañas y la complejidad de la cuenta.',
    },
    {
      q: '¿Qué pasa con la cuenta si dejamos de trabajar juntos?',
      a: 'La cuenta es tuya y queda a tu nombre desde el día uno. Trabajo con acceso, no con propiedad. Al cerrar, entrego la documentación de la estructura y los tableros de Looker Studio quedan funcionando.',
    },
  ],

  related: [
    { path: '/servicios/seo-sem/', label: 'SEO y SEM', note: 'Lo pago trae tráfico ya; lo orgánico lo sostiene sin depender del presupuesto.' },
    { path: '/servicios/meta-ads/', label: 'Meta Ads', note: 'Cuando la demanda todavía no existe y hay que crearla antes de capturarla.' },
    { path: '/servicios/ecommerce/', label: 'E-commerce', note: 'Si la tienda no convierte, mejorar la campaña solo hace más cara la fuga.' },
    { path: '/trabajo/bio-laboratorios/', label: 'Caso Bio Laboratorios', note: 'Cómo se ve este método aplicado a un negocio real.' },
  ],

  image: {
    src: '/og/google-ads-bogota-ivan-santiago-duarte.png',
    alt: 'Tablero de campañas de Google Ads mostrando CPA y ROAS por campaña, gestionado por Iván Santiago Duarte desde Bogotá',
    width: 1200,
    height: 630,
  },

  schemaType: 'Service',
  updated: '2026-08-24',
  priority: 0.8,
}
