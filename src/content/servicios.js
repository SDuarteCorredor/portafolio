// Páginas de servicio del sitio. Contrato de datos en SCHEMA.md.
// Todos los datos duros vienen del perfil real (src/data.js). Nada inventado.

export const servicios = [
  // ─────────────────────────────────────────────────────────────────────────
  // 1. Google Ads
  // ─────────────────────────────────────────────────────────────────────────
  {
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
        subsections: [
          {
            h3: 'Search y Performance Max no compiten en igualdad',
            body: [
              'Performance Max se lleva con facilidad el crédito de conversiones que Search ya iba a traer, sobre todo en búsquedas de marca. Cuando una cuenta tiene las dos corriendo sin reglas, el reporte se ve espectacular y las ventas totales no se mueven.',
              'Lo que hago es separar la marca en una campaña de Search propia, excluirla de Performance Max donde la plataforma lo permite, y comparar contra ventas totales del negocio, no contra el reporte de cada campaña por separado.',
            ],
          },
          {
            h3: 'Cuándo conviene no pautar todavía',
            body: [
              'Si la landing no carga en móvil, si no hay forma de recibir el contacto o si el margen no aguanta el CPA de la categoría, la campaña solo va a acelerar el problema. En esos casos lo digo y primero arreglamos eso: sale más barato que aprenderlo gastando.',
            ],
          },
        ],
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
        a: 'Con las dos, y la mayoría de las veces es una cuenta que ya existe. En cuentas heredadas el primer mes suele ser de limpieza más que de crecimiento, porque conviene arreglar la medición y cortar el desperdicio antes de escalar algo que no se entiende. Si la cuenta arranca desde cero, el avance es más rápido, pero el primer paso es igual: montar la medición antes de gastar el primer peso.',
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
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 2. Meta Ads
  // ─────────────────────────────────────────────────────────────────────────
  {
    path: '/servicios/meta-ads/',
    cluster: 'servicios',
    parent: '/servicios/',
    navLabel: 'Meta Ads',

    metaTitle: 'Meta Ads en Bogotá | Facebook e Instagram que venden',
    metaDescription:
      'Pauta en Facebook e Instagram con creatividad probada, públicos que sí escalan y Pixel más CAPI bien montados. Mido ventas reales, no likes. Hablemos hoy.',
    h1: 'En Meta el creativo es la segmentación de verdad',
    keywords: ['meta ads bogotá', 'publicidad en facebook e instagram', 'facebook ads colombia', 'pauta instagram', 'remarketing meta'],

    intent: {
      type: 'comercial',
      query: 'cuánto cuesta pautar en facebook e instagram en colombia',
      audience:
        'Marcas de consumo, restaurantes y tiendas online que venden por Instagram y quieren dejar de improvisar la pauta.',
      problem:
        'Anuncios que se apagan y se prenden sin criterio, públicos hipersegmentados que nunca salen de aprendizaje y un Pixel que reporta ventas que la tienda no ve.',
      outcome:
        'Un sistema de creativos con ciclos definidos, una estructura de cuenta simple y una forma de saber cuánto vendió la pauta de verdad.',
    },

    tldr: [
      'Con públicos amplios y Advantage+, el algoritmo ya decide a quién le muestra. Lo único que sigue bajo tu control es qué le muestra: por eso el trabajo pesado está en el creativo.',
      'Sin Conversions API el Pixel pierde eventos por bloqueadores y restricciones de cookies. Monto Pixel y CAPI juntos, deduplicados por event_id.',
      'Meta crea demanda y Google la captura. Si mides Meta con el mismo CPA de última interacción que Search, siempre va a parecer peor de lo que es.',
      'Trabajo en ciclos de creativo cada dos semanas: entran piezas nuevas, salen las que ya cansaron a la audiencia.',
      'Con Nona Gastro Bar hice identidad, más de 30 piezas gráficas y el contenido de la apertura: +120% en ventas.',
    ],

    lead:
      'En Meta nadie está buscando lo que vendes. Estás interrumpiendo a alguien que entró a ver qué había, y eso cambia todas las reglas: el anuncio tiene que ganarse los primeros dos segundos, la oferta tiene que entenderse sin contexto y la medición tiene que aguantar que alguien vea hoy y compre el jueves. Cuando una cuenta no funciona, casi nunca es la segmentación. Es que el anuncio no dice nada.',
    ctaInline: { label: 'Muéstrame tus anuncios y te digo qué cambiaría', href: 'whatsapp' },

    sections: [
      {
        h2: 'Cómo trabajo una cuenta de Meta Ads',
        body: [
          'Meta castiga la dispersión. Veinte conjuntos de anuncios con presupuestos chicos reparten los eventos entre todos y ninguno junta suficiente información para optimizar, así que la cuenta se queda en fase de aprendizaje para siempre. Mi criterio es al revés: pocas campañas, presupuesto concentrado y mucha rotación de creativo.',
        ],
        list: {
          variant: 'ol',
          title: 'El orden en que lo hago',
          items: [
            'Medición primero: Pixel con eventos bien nombrados, Conversions API por servidor y deduplicación para que una compra no se cuente dos veces.',
            'Oferta y ángulos: escribo entre tres y cinco ángulos distintos del mismo producto (dolor, precio, prueba social, uso, objeción) antes de diseñar una sola pieza.',
            'Estructura simple: campañas por objetivo real, no por producto, con el presupuesto concentrado donde hay eventos suficientes.',
            'Ciclo de creativo: cada dos semanas entran piezas nuevas y salen las gastadas, con frecuencia y CPA como criterio de corte.',
            'Escalado: subo presupuesto por tramos y no toco todo a la vez, para poder saber qué fue lo que movió el resultado.',
          ],
        },
        subsections: [
          {
            h3: 'Por qué el creativo pesa más que el público',
            body: [
              'Desde que Meta empujó los públicos amplios, segmentar por intereses dejó de ser la palanca principal. El algoritmo encuentra al comprador si el anuncio le da señales claras de a quién le habla. Por eso produzco variantes: no una pieza bonita, sino cinco versiones que dicen cosas distintas, para descubrir cuál conecta con plata real.',
            ],
            list: {
              variant: 'check',
              items: [
                'Un gancho que se entienda sin sonido en los primeros dos segundos.',
                'La oferta escrita dentro de la pieza, no solo en el copy: mucha gente no lee el texto.',
                'Formato vertical nativo, no un banner de escritorio recortado a la fuerza.',
                'Una versión con cara y voz y otra sin: rinden distinto según la categoría.',
                'Variantes de la misma idea antes que ideas nuevas cada semana, que es la única forma de aprender algo.',
              ],
            },
          },
          {
            h3: 'Qué necesito de tu lado',
            body: [
              'Acceso al Business Manager (nunca a tu perfil personal), el catálogo o la lista de productos con precios y márgenes, y material crudo: fotos, video de producto, video del equipo, testimonios reales si los tienes. Si no hay material, lo diseño yo o lo producimos, pero eso cambia los tiempos y el alcance del proyecto.',
            ],
          },
        ],
      },
      {
        h2: 'Públicos: qué controlo yo y qué le dejo al algoritmo',
        body: [
          'La pregunta no es qué público es mejor, sino qué le estás pidiendo a cada uno. Un público frío tiene que explicar el producto desde cero; uno de remarketing tiene que resolver una objeción puntual. Usar el mismo anuncio para los dos es la forma más común de quemar presupuesto.',
        ],
        table: {
          caption: 'Tipos de público en Meta y qué creativo le pide cada uno',
          head: ['Público', 'Para qué sirve', 'Qué creativo pide'],
          rows: [
            ['Amplio / Advantage+', 'Encontrar demanda nueva cuando hay volumen de eventos', 'Piezas que expliquen el producto desde cero'],
            ['Intereses acotados', 'Nichos donde el amplio se dispersa demasiado', 'Mensaje específico del nicho, nada genérico'],
            ['Lookalike de compradores', 'Escalar sobre gente parecida a quien ya compró', 'Prueba social y producto en uso real'],
            ['Remarketing de visitas', 'Volver por quien vio y no compró', 'La objeción concreta: envío, garantía, precio'],
            ['Base propia de clientes', 'Recompra y venta cruzada a costo bajo', 'Novedad, beneficio de cliente, urgencia que sea cierta'],
          ],
        },
        subsections: [
          {
            h3: 'Remarketing sin quemar a la audiencia',
            body: [
              'El remarketing es el público más rentable y el más fácil de arruinar. Si le muestras el mismo anuncio treinta veces a la misma persona, dejas de recordarle el producto y empiezas a molestarla.',
              'Trabajo con ventanas separadas (visitas de los últimos 7, 14 y 30 días), excluyo a quien ya compró y vigilo la frecuencia por conjunto. Cuando la frecuencia sube y el CPA se mueve con ella, es señal de rotar creativo, no de subir la puja.',
            ],
          },
          {
            h3: 'Crear demanda no es lo mismo que capturarla',
            body: [
              'Meta te pone delante de gente que no te estaba buscando: ahí se crea demanda. Google recoge a quien ya decidió que necesita algo: ahí se captura. Son dos trabajos distintos y no se pueden juzgar con la misma regla.',
              'En la práctica, esto significa mirar el efecto de Meta sobre las ventas totales y sobre el volumen de búsquedas de marca, no solo el ROAS que reporta la plataforma. Muchas cuentas apagan Meta porque "no convierte" y después ven caer las conversiones de Search sin entender por qué.',
            ],
          },
        ],
      },
      {
        h2: 'Pixel, CAPI y por qué los números nunca cuadran',
        body: [
          'Meta, GA4 y tu tienda siempre van a reportar cifras distintas, y eso no es un error: cada uno atribuye con reglas diferentes. Meta cuenta clics y visualizaciones dentro de su ventana, GA4 usa el último canal no directo y la tienda solo cuenta la plata que entró. El objetivo no es que cuadren al peso, es saber cuál usas para decidir.',
        ],
        list: {
          variant: 'ul',
          items: [
            'Pixel en el navegador más Conversions API por servidor, enviando el mismo evento con el mismo identificador para deduplicar.',
            'Eventos que corresponden a dinero: compra con valor y moneda, no un evento genérico de "lead" que no distingue nada.',
            'Comparación contra la fuente de verdad del negocio, que es el back de la tienda o el CRM, nunca el reporte de la plataforma.',
            'Un tablero en Looker Studio con inversión, compras reportadas y ventas reales lado a lado, para ver la brecha en vez de discutirla.',
          ],
        },
        subsections: [
          {
            h3: 'Qué hago cuando Meta reporta más ventas que la tienda',
            body: [
              'Primero verifico que no haya doble conteo entre Pixel y CAPI, que es la causa más frecuente. Después miro la ventana de atribución: si está contando visualizaciones, parte de esas ventas iban a pasar igual.',
              'Cuando la brecha persiste, dejo de pelear con la atribución y miro la inversión total contra la venta total del mes. Si la pauta sube y la venta no, la pauta no está funcionando, sin importar lo que diga el panel.',
            ],
          },
        ],
      },
    ],

    faq: [
      {
        q: '¿Cuál es el presupuesto mínimo para pautar en Facebook e Instagram?',
        a: 'No hay un mínimo oficial, pero sí un mínimo práctico: un conjunto de anuncios necesita del orden de cincuenta eventos de optimización por semana para salir de aprendizaje. Si tu compra vale mucho y no llegas a ese volumen, optimizo por un evento más frecuente, como iniciar el checkout o el contacto por WhatsApp, y concentro el presupuesto en un solo conjunto. Repartir poca plata entre muchos conjuntos es la forma más segura de no aprender nada.',
      },
      {
        q: '¿En cuánto tiempo se ven resultados en Meta Ads?',
        a: 'Las primeras señales útiles aparecen entre siete y catorce días, que es lo que tarda la fase de aprendizaje con volumen decente. Lo que sí es inmediato es saber si el creativo funciona: si un anuncio no levanta CTR ni retención en tres días con entrega normal, el problema es el mensaje y lo cambio. Para hablar de resultados sostenidos, con creativos rotando y públicos maduros, cuenta entre sesenta y noventa días.',
      },
      {
        q: '¿Qué necesito tener listo antes de empezar?',
        a: 'Business Manager con la cuenta publicitaria y la página a tu nombre, el Pixel instalado o acceso al sitio para instalarlo, y material visual crudo. También necesito saber cuánto te deja de margen cada venta, porque sin eso el CPA objetivo es un número inventado. Si el catálogo está en una tienda online, pido acceso para conectar el feed al catálogo de Meta.',
      },
      {
        q: '¿Qué pasa si los anuncios no funcionan?',
        a: 'Se corta rápido y se cambia el ángulo, no se espera a fin de mes. Mi regla es simple: si tres ángulos distintos, con medición sana y creativo decente, no mueven la aguja, el problema dejó de ser la pauta. Suele ser el precio, la oferta o la página de destino, y prefiero decírtelo a seguir cobrando por gestionar una campaña que no tiene cómo funcionar.',
      },
      {
        q: '¿Sirve Meta Ads si vendo servicios o tickets altos?',
        a: 'Sirve, pero con otro objetivo. En ticket alto no vas a cerrar la venta dentro de Instagram: vas a conseguir una conversación. Ahí optimizo por mensajes o por formulario, cuido mucho la calidad del lead con preguntas de filtro y mido el costo por lead calificado, no por lead bruto. El ciclo es más largo y el reporte tiene que incluir lo que pasa después del clic, en tu CRM o en tu WhatsApp.',
      },
      {
        q: '¿Cómo sé cuánto vendió realmente la pauta?',
        a: 'Miro tres cosas juntas: lo que reporta Meta, lo que reporta GA4 y lo que entró en la tienda o el CRM. Con esas tres calculo la relación entre inversión total y venta total del periodo, que es la métrica más honesta cuando la atribución está peleada. Cuando hay dudas grandes, propongo una prueba de apagado controlado: bajar la inversión unos días y ver cuánto cae la venta.',
      },
    ],

    related: [
      { path: '/servicios/branding/', label: 'Branding y diseño', note: 'El creativo es el 80% del resultado en Meta, y sale de un sistema de marca, no de improvisar piezas.' },
      { path: '/servicios/google-ads/', label: 'Google Ads', note: 'Meta crea la demanda; Search la captura cuando esa persona por fin busca tu categoría.' },
      { path: '/servicios/ecommerce/', label: 'E-commerce', note: 'El anuncio manda gente a la ficha de producto: si esa página no convierte, la pauta solo acelera la fuga.' },
      { path: '/trabajo/limonada-pink/', label: 'Caso Limonada Pink', note: 'Brand book, tienda y campañas en Meta y Google funcionando como una sola pieza.' },
    ],

    image: {
      src: '/og/meta-ads-facebook-instagram-bogota.png',
      alt: 'Set de anuncios verticales para Instagram y Facebook con distintos ángulos de mensaje, diseñados por Iván Santiago Duarte',
      width: 1200,
      height: 630,
    },

    schemaType: 'Service',
    updated: '2026-08-24',
    priority: 0.8,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 3. SEO y SEM
  // ─────────────────────────────────────────────────────────────────────────
  {
    path: '/servicios/seo-sem/',
    cluster: 'servicios',
    parent: '/servicios/',
    navLabel: 'SEO y SEM',

    metaTitle: 'SEO y SEM en Bogotá | Orgánico y pago que suman',
    metaDescription:
      'Posicionamiento por intención de búsqueda: SEO técnico, clusters de contenido y campañas Search que se alimentan entre sí. Medición en GA4 y Search Console.',
    h1: 'Aparecer justo cuando alguien está buscando lo que vendes',
    keywords: ['seo bogotá', 'consultor seo colombia', 'sem posicionamiento', 'seo técnico', 'contenido por intención de búsqueda'],

    intent: {
      type: 'comercial',
      query: 'consultor seo en bogotá',
      audience:
        'Negocios que dependen de la pauta para existir en Google y quieren un canal que no se apague cuando se acaba el presupuesto.',
      problem:
        'Sitios con mucho contenido y ninguna estructura, páginas peleando entre ellas por la misma búsqueda y cero visibilidad de qué se busca de verdad.',
      outcome:
        'Un mapa de qué página responde qué búsqueda, un plan de contenido priorizado por facilidad y un tablero para ver el avance mes a mes.',
    },

    tldr: [
      'El SEO no es publicar más: es decidir por qué búsqueda vale la pena pelear y hacer que una sola página la responda mejor que nadie.',
      'Priorizo búsquedas donde ya apareces entre la posición cinco y la quince: mover eso rinde mucho más rápido que empezar de cero.',
      'Las keywords que ya te convierten pagando en Google Ads son la mejor lista de contenido orgánico que existe, y casi nadie la usa.',
      'No prometo primeros lugares. Prometo un plan auditable, con avance visible en Search Console cada mes.',
      'Con Bio Laboratorios la combinación de marca, e-commerce y SEO/SEM acompañó un +278% en ventas.',
    ],

    lead:
      'La mayoría de los sitios que reviso tienen el problema al revés de lo que creen: no les falta contenido, les sobra desorden. Tres páginas peleando por la misma búsqueda, títulos duplicados y un blog escrito para nadie. Eso no se arregla publicando otro artículo. Se arregla decidiendo qué página responde qué búsqueda, arreglando lo técnico y quitando de en medio lo que estorba. Después, y solo después, se escribe.',
    ctaInline: { label: 'Pídeme el diagnóstico de tu sitio', href: 'whatsapp' },

    sections: [
      {
        h2: 'Lo técnico primero: si Google no puede leerte, nada más importa',
        body: [
          'Antes de hablar de contenido reviso si el sitio se puede rastrear, indexar y entender. Es la parte menos vistosa del trabajo y es donde suelen estar los arreglos que dan resultado en semanas en vez de meses.',
          'Este diagnóstico se entrega por escrito, con la lista de hallazgos ordenada por impacto y esfuerzo, para que tu desarrollador pueda ejecutar sin traducirlo.',
        ],
        list: {
          variant: 'check',
          title: 'Lo que reviso en el diagnóstico técnico',
          items: [
            'Indexación real: qué páginas están indexadas en Search Console contra cuáles deberían estarlo.',
            'Canibalización: dos o tres URLs compitiendo por la misma búsqueda, donde ninguna termina ganando.',
            'Títulos y descripciones únicos por página, con largos que no se corten en el resultado.',
            'Jerarquía de encabezados sin saltos: un H1 por página y nunca un H3 antes de su H2.',
            'Velocidad y experiencia en móvil, que es por donde entra la mayoría del tráfico en Colombia.',
            'Datos estructurados donde aplican: producto, preguntas frecuentes, migas de pan y negocio local.',
            'URLs limpias, en minúscula, sin parámetros de campaña quedando indexados.',
            'Enlazado interno: si una página importante solo se alcanza en cuatro clics, para Google no es importante.',
          ],
        },
        subsections: [
          {
            h3: 'Arquitectura: página pilar y clusters',
            body: [
              'Un cluster es una página pilar que cubre el tema grande y varias páginas satélite que resuelven las preguntas específicas, todas enlazadas entre sí. Esa estructura le dice a Google cuál es la página principal del tema y concentra la autoridad en vez de repartirla.',
              'Este sitio está armado así a propósito: la página de servicios es el pilar, cada servicio es un cluster y los casos de trabajo son la prueba. Si quieres ver el criterio aplicado, estás parado encima de él.',
            ],
          },
          {
            h3: 'Qué se borra o se une',
            body: [
              'Casi siempre hay contenido que resta: notas de 2019 sin tráfico, categorías vacías indexadas, dos artículos que dicen lo mismo. Consolido esos casos en una sola página fuerte con redirección, en vez de mantener vivo un archivo que solo diluye.',
            ],
          },
        ],
      },
      {
        h2: 'Contenido por intención de búsqueda, no por keyword',
        body: [
          'Dos búsquedas con el mismo volumen pueden valer cosas completamente distintas. "Qué es un CRM" y "precio CRM para pymes" no se responden con la misma página ni se miden con la misma métrica, aunque las herramientas las muestren juntas.',
          'Por eso el plan no es una lista de palabras: es un mapa de qué tipo de página construir para cada momento de la decisión.',
        ],
        table: {
          caption: 'Tipo de intención, qué página le sirve y con qué se mide',
          head: ['Intención', 'Qué quiere la persona', 'Qué página le sirve', 'Métrica que manda'],
          rows: [
            ['Informacional', 'Entender un problema o un cómo', 'Guía con la respuesta directa arriba', 'Impresiones y posición media'],
            ['Comercial', 'Comparar opciones antes de decidir', 'Comparativa con tabla de criterios y casos', 'CTR y clics al CTA'],
            ['Transaccional', 'Contratar o comprar ahora', 'Página de servicio o ficha de producto', 'Conversiones desde orgánico'],
            ['Navegacional', 'Llegar a una marca puntual', 'Home o página de la marca', 'Clics de búsquedas de marca'],
            ['Local', 'Un proveedor cerca, en Bogotá', 'Página con ciudad y perfil de negocio', 'Llamadas y solicitudes de ruta'],
          ],
        },
        subsections: [
          {
            h3: 'Cómo decido qué se escribe primero',
            body: [
              'El orden lo define la relación entre facilidad y valor comercial, no el volumen de búsqueda. Empezar por el término más buscado de la categoría es la forma más rápida de trabajar seis meses sin ver nada.',
            ],
            list: {
              variant: 'ol',
              items: [
                'Búsquedas donde ya apareces entre la posición cinco y la quince: ahí un buen empujón se nota en semanas.',
                'Búsquedas por las que ya pagas y convierten: si convierte pagando, convierte gratis.',
                'Preguntas que te hacen los clientes por WhatsApp o por teléfono, que casi nunca aparecen en las herramientas.',
                'Búsquedas de comparación y de competencia, que traen gente en modo decisión.',
                'Términos genéricos de volumen alto al final, no al principio: son los más caros y los más lentos.',
              ],
            },
          },
          {
            h3: 'Contenido que no escribo',
            body: [
              'No produzco cincuenta artículos genéricos generados en serie para llenar el blog. Eso funcionaba hace unos años; hoy compite con millones de páginas iguales y arrastra la calidad promedio del sitio hacia abajo.',
              'Uso IA para acelerar investigación, estructura y borradores, pero el criterio, los ejemplos y la postura los pongo yo. Un texto sin postura no se diferencia de nada, y lo que no se diferencia no se posiciona ni se recuerda.',
            ],
          },
        ],
      },
      {
        h2: 'SEO y SEM: qué le toca a cada uno',
        body: [
          'La pelea entre orgánico y pago es falsa. El pago compra tiempo mientras el orgánico madura, y el orgánico libera presupuesto cuando ya se sostiene solo. Lo interesante es que cada uno le da datos al otro.',
        ],
        list: {
          variant: 'ul',
          items: [
            'Search Ads cubre las búsquedas que importan desde el día uno, mientras el contenido orgánico toma meses en asentarse.',
            'Search Console te muestra qué se busca de verdad, y de ahí salen keywords para la campaña que ninguna herramienta de pago sugiere.',
            'Los términos que convierten pagando definen qué páginas orgánicas hay que construir primero.',
            'En búsquedas de marca conviene tener las dos: si no pujas por tu nombre, se lo dejas servido a la competencia.',
            'Cuando una página orgánica se asienta en el top tres, ahí sí tiene sentido bajar la puja de ese término y mover ese presupuesto a otra parte.',
          ],
        },
      },
      {
        h2: 'Cómo se mide y cada cuánto lo revisamos',
        body: [
          'El SEO se mide con paciencia y con datos comparables, no con capturas de pantalla del celular buscando tu propia marca. Trabajo con Search Console para lo que pasa antes del clic y con GA4 para lo que pasa después, y lo junto todo en un tablero de Looker Studio que puedes abrir cuando quieras.',
          'La revisión de fondo es mensual porque el ciclo del canal es lento: mirar posiciones todos los días solo produce ansiedad y decisiones malas. Lo que sí vigilo semana a semana son los errores de indexación y las caídas bruscas, que son las que hay que atender rápido.',
        ],
      },
    ],

    faq: [
      {
        q: '¿En cuánto tiempo se ven resultados de SEO?',
        a: 'Los arreglos técnicos pueden mostrar movimiento en semanas, sobre todo si había páginas importantes sin indexar. El contenido nuevo tarda entre tres y seis meses en asentarse, y en categorías competidas más. Es un canal de acumulación: el trabajo del mes uno sigue trayendo tráfico en el mes doce, que es exactamente lo contrario de la pauta. Si necesitas ventas este mes, empezamos por Search Ads y montamos el SEO en paralelo.',
      },
      {
        q: '¿Me garantizas el primer lugar en Google?',
        a: 'No, y desconfía de quien te lo garantice. Nadie controla el algoritmo y los resultados cambian según quién busca, desde dónde y en qué momento. Lo que sí garantizo es un plan auditable: qué se arregla, qué se escribe, en qué orden y con qué métrica se evalúa. El avance se ve en Search Console, que es un dato que puedes revisar tú mismo sin depender de mi reporte.',
      },
      {
        q: '¿Cuánto cuesta un proyecto de SEO?',
        a: 'Depende del tamaño del sitio y de si incluye producción de contenido o solo estrategia y técnica. No doy un precio de lista sin ver el sitio, porque un catálogo de dos mil productos y una web de cinco páginas no son el mismo trabajo. Lo que sí hago siempre es pasar el alcance cerrado por escrito antes de empezar: qué incluye, qué no, y qué te toca a ti.',
      },
      {
        q: '¿Sirve el SEO si ya invierto en Google Ads?',
        a: 'Sirve más, porque ya tienes el dato más valioso: sabes qué búsquedas te generan ventas. Esa lista es el mejor plan de contenido posible y sale de tu propia cuenta. Además, aparecer en el resultado pagado y en el orgánico a la vez aumenta la probabilidad de clic en esa búsqueda. Y a medida que el orgánico agarra posición, puedes redistribuir presupuesto de pauta hacia términos nuevos.',
      },
      {
        q: '¿Qué necesitas de mi lado para empezar?',
        a: 'Acceso a Search Console, a GA4 y al gestor de contenidos del sitio, más contacto con quien pueda tocar el código si hay arreglos técnicos. Y algo que no es técnico pero pesa igual: media hora con alguien que conozca al cliente de verdad, para saber cómo llama la gente a lo que vendes. El vocabulario interno de una empresa casi nunca coincide con lo que la gente teclea en Google.',
      },
      {
        q: '¿Qué pasa si el sitio está hecho en una plataforma cerrada?',
        a: 'Se trabaja igual, con límites. En plataformas como Shopify o constructores visuales hay cosas que no puedes controlar, como la estructura de ciertas URLs, y lo asumimos en el plan en vez de pelearnos con ello. Antes de empezar te digo qué se puede tocar y qué no, para que sepas de entrada dónde está el techo de ese sitio.',
      },
    ],

    related: [
      { path: '/servicios/google-ads/', label: 'Google Ads', note: 'La pauta cubre la búsqueda mientras el orgánico madura, y te dice qué términos sí convierten.' },
      { path: '/servicios/ecommerce/', label: 'E-commerce', note: 'En tiendas online el SEO se juega en las fichas de producto y en las categorías, no en el blog.' },
      { path: '/trabajo/bio-laboratorios/', label: 'Caso Bio Laboratorios', note: 'Marca, tienda y SEO/SEM empujando en la misma dirección: +278% en ventas.' },
      { path: '/trabajo/blu-smartphones/', label: 'Caso BLU Smartphones', note: 'Un proyecto donde contenido, e-commerce y analítica se armaron de punta a punta.' },
    ],

    image: {
      src: '/og/seo-sem-bogota-posicionamiento-buscadores.png',
      alt: 'Pantalla de Search Console con la evolución de posiciones y clics de un sitio trabajado por Iván Santiago Duarte',
      width: 1200,
      height: 630,
    },

    schemaType: 'Service',
    updated: '2026-08-24',
    priority: 0.8,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 4. E-commerce
  // ─────────────────────────────────────────────────────────────────────────
  {
    path: '/servicios/ecommerce/',
    cluster: 'servicios',
    parent: '/servicios/',
    navLabel: 'E-commerce',

    metaTitle: 'Tiendas online que venden | WooCommerce y Shopify',
    metaDescription:
      'Monto y optimizo tiendas en WooCommerce y Shopify: ficha de producto, checkout, feed y analítica. Con Bio Laboratorios el trabajo acompañó un +278% en ventas.',
    h1: 'Una tienda no vende por existir: vende por cómo está armada',
    keywords: ['ecommerce bogotá', 'tienda online woocommerce', 'shopify colombia', 'cro ecommerce', 'feed de producto'],

    intent: {
      type: 'transaccional',
      query: 'crear tienda online woocommerce o shopify colombia',
      audience:
        'Marcas que venden por WhatsApp o Instagram y quieren una tienda que funcione sola, y tiendas que ya reciben tráfico pero no cierran ventas.',
      problem:
        'Fichas de producto que no responden las dudas, checkouts con costos sorpresa y analítica que no permite ver en qué paso se cae la gente.',
      outcome:
        'Una tienda con el recorrido de compra revisado paso a paso, el feed conectado a las campañas y eventos de e-commerce midiendo de verdad.',
    },

    tldr: [
      'Montar la tienda es la parte fácil. Lo difícil es descubrir en cuál de los seis pasos entre el anuncio y el pago se está cayendo la gente.',
      'Elijo plataforma por el negocio, no por moda: WooCommerce cuando necesitas control y contenido, Shopify cuando necesitas salir rápido y no mantener nada.',
      'La ficha de producto es la página que más vende y la que menos se trabaja: precio, envío, garantía y objeción resueltos ahí mismo.',
      'Un feed de producto mal escrito arruina Shopping, Performance Max y el catálogo de Meta al mismo tiempo, porque los tres beben de él.',
      'Con Bio Laboratorios el trabajo de marca, e-commerce y SEO/SEM acompañó un crecimiento de +278% en ventas.',
    ],

    lead:
      'Montar la tienda es la parte fácil: hoy cualquiera publica un catálogo en una semana. La parte difícil empieza cuando entra tráfico y no compra, y toca averiguar en cuál de los seis pasos entre el anuncio y el pago se está yendo la gente. Ahí no sirve cambiar el tema ni agregar plugins: sirve mirar los datos, arreglar la fricción y volver a medir. Eso es lo que hago.',
    ctaInline: { label: 'Revisemos dónde se te cae la venta', href: 'whatsapp' },

    sections: [
      {
        h2: 'WooCommerce o Shopify: cómo lo decido',
        body: [
          'No tengo plataforma favorita, tengo criterios. La pregunta real no es cuál es mejor, sino quién va a mantener la tienda dentro de un año y cuánta libertad necesitas sobre el código y el contenido.',
        ],
        table: {
          caption: 'WooCommerce contra Shopify según lo que necesita el negocio',
          head: ['Criterio', 'WooCommerce', 'Shopify'],
          rows: [
            ['Costo mensual', 'Hosting y plugins; más barato si hay quien lo mantenga', 'Suscripción fija con todo incluido'],
            ['Control del código', 'Total: es tu WordPress y tu base de datos', 'Limitado a lo que permiten tema y apps'],
            ['Tiempo de salida', 'Más lento: hay que armar y probar el stack', 'Rápido: en semanas está vendiendo'],
            ['Mantenimiento', 'Tuyo: actualizaciones, backups y seguridad', 'De la plataforma, no te ocupas'],
            ['Contenido y SEO', 'Fuerte: blog y estructura de WordPress', 'Suficiente, con menos control de URLs'],
            ['Catálogo grande y variantes', 'Aguanta, pero pide optimización', 'Aguanta sin que tengas que pensarlo'],
          ],
        },
        subsections: [
          {
            h3: 'Cuándo recomiendo WooCommerce',
            body: [
              'Cuando el contenido es parte de la venta y el sitio ya vive en WordPress, cuando necesitas integraciones a medida con facturación o inventario propio, o cuando el margen es apretado y hay alguien que puede mantener el hosting. Es la opción con más libertad y también la que más disciplina exige.',
            ],
          },
          {
            h3: 'Cuándo recomiendo Shopify',
            body: [
              'Cuando la prioridad es salir a vender rápido, cuando no hay equipo técnico que responda si algo se cae un domingo, o cuando el catálogo tiene muchas variantes y no quieres pelear con la base de datos. Pagas más al mes y ganas tranquilidad operativa. En equipos chicos esa tranquilidad suele valer más que la libertad.',
            ],
          },
        ],
      },
      {
        h2: 'Dónde se cae la venta: los seis pasos que reviso',
        body: [
          'Una tienda es una cadena, y la cadena se rompe siempre en el eslabón más débil. Reviso el recorrido completo con datos, no con opiniones: en GA4 se ve cuánta gente pasa de un paso al siguiente, y ahí aparece el hueco.',
        ],
        list: {
          variant: 'ol',
          title: 'El recorrido completo, paso por paso',
          items: [
            'Anuncio o resultado de búsqueda: si la promesa no coincide con la página que abre, el rebote ya está pagado.',
            'Llegada: qué ve la persona en los primeros tres segundos y si entiende dónde está y qué se vende.',
            'Ficha de producto: precio, fotos, envío, garantía y la objeción concreta resuelta ahí mismo.',
            'Carrito: costos sorpresa al final, que es la razón de abandono más frecuente que me encuentro.',
            'Checkout: campos de más, registro obligatorio y pasarelas que no dan confianza.',
            'Posventa: confirmación, seguimiento del envío y el correo que trae la segunda compra, que es la más rentable.',
          ],
        },
        subsections: [
          {
            h3: 'Ficha de producto: lo que sí mueve la aguja',
            body: [
              'La ficha es donde se decide la compra y suele ser la página más descuidada de la tienda. Copiar la descripción del proveedor es garantía de dos cosas: no diferenciarte y no posicionar.',
            ],
            list: {
              variant: 'check',
              items: [
                'Precio y costo de envío visibles arriba, sin obligar a llegar al carrito para saber cuánto vale.',
                'Fotos reales del producto en uso y en escala, no solo el render del catálogo del proveedor.',
                'Las tres objeciones más frecuentes respondidas en la ficha: talla, compatibilidad, garantía, tiempo de entrega.',
                'Descripción escrita con las palabras del cliente, que son las que después busca en Google.',
                'Disponibilidad y tiempo de entrega claros, porque una promesa que no se cumple mata la recompra.',
                'Botón de compra que no dependa de hacer scroll en móvil.',
              ],
            },
          },
          {
            h3: 'Checkout: menos pasos y ninguna sorpresa',
            body: [
              'Cada campo del formulario cuesta ventas. Quito lo que no es indispensable para despachar, habilito compra como invitado y muestro el costo total desde el principio, incluido el envío.',
              'También reviso los medios de pago disponibles: en Colombia dejar por fuera PSE o el pago contra entrega cuando la categoría lo exige es dejar plata en la mesa, por mucho que la tarjeta sea más cómoda de conciliar.',
            ],
          },
        ],
      },
      {
        h2: 'Feed de producto: la pieza que alimenta todas las campañas',
        body: [
          'Shopping, Performance Max y el catálogo de Meta beben del mismo feed. Si el feed está mal escrito o desactualizado, esas tres campañas fallan al tiempo y el problema parece de pauta cuando en realidad es de datos.',
        ],
        list: {
          variant: 'ul',
          items: [
            'Títulos escritos como se busca el producto, no como lo llama internamente la empresa.',
            'Precio, disponibilidad y envío sincronizados: un feed desactualizado hace que se rechacen productos.',
            'Imagen principal limpia, sin textos ni marcas de agua encima, que son causa común de desaprobación.',
            'Segmentación del feed por margen: no todos los productos merecen la misma puja ni el mismo esfuerzo.',
            'Merchant Center y catálogo de Meta alimentados del mismo origen, para no mantener dos verdades distintas.',
          ],
        },
      },
      {
        h2: 'Analítica de e-commerce: medir para no adivinar',
        body: [
          'Configuro los eventos de e-commerce de GA4 completos, no solo la compra: ver producto, agregar al carrito, iniciar checkout y compra con valor y moneda. Con esa cadena puedes ver el porcentaje que sobrevive a cada paso y saber dónde invertir el próximo esfuerzo.',
          'Después lo cruzo con lo que dice el back de la tienda, porque ninguna analítica es perfecta y el número que manda es la plata que entró. Todo termina en un tablero de Looker Studio que puedes abrir cualquier día: inversión, sesiones, tasa de conversión y ventas reales en la misma pantalla.',
        ],
      },
    ],

    faq: [
      {
        q: '¿Cuánto cuesta montar una tienda online?',
        a: 'Depende de tres cosas: la plataforma, el tamaño del catálogo y si hay que producir fotos y textos o ya existen. No doy un precio de lista sin ver eso, porque una tienda de veinte productos con material listo y una de dos mil referencias con integración de inventario no se parecen en nada. Lo que sí hago siempre es cotizar por alcance cerrado y por escrito, con lo que incluye y lo que no.',
      },
      {
        q: '¿Cuánto se demora en estar vendiendo?',
        a: 'En Shopify, con catálogo pequeño y material listo, es cuestión de semanas. En WooCommerce con integraciones o catálogos grandes toma más, porque hay que armar y probar el stack completo. Lo que no acelero es el material: si no hay fotos ni descripciones, ese es el cuello de botella real. Prefiero salir con veinte productos bien hechos que con doscientos a medias.',
      },
      {
        q: '¿Sirve optimizar mi tienda actual o toca rehacerla desde cero?',
        a: 'Casi nunca. En la mayoría de los casos el tráfico llega y se cae en un punto concreto que se puede identificar en GA4 en un par de días. Rehacer la tienda es la respuesta cara y suele ser innecesaria: primero medimos, arreglamos la fricción del paso que está fallando y volvemos a mirar. Si después de eso el problema es la plataforma, ahí sí hablamos de migrar.',
      },
      {
        q: '¿Qué necesito tener listo antes de empezar?',
        a: 'Catálogo con precios y márgenes, fotos de producto, política de envíos con costos y tiempos reales, y los medios de pago que vas a aceptar decididos. También quién va a responder los pedidos, porque una tienda sin operación detrás genera reclamos, no ventas. Si falta material visual, lo podemos producir, pero eso entra en el alcance y en los tiempos.',
      },
      {
        q: '¿Qué tasa de conversión debería tener mi tienda?',
        a: 'No trabajo con benchmarks genéricos de industria, porque comparan negocios que no se parecen: una tienda de accesorios de veinte mil pesos y una de electrodomésticos no pueden aspirar a lo mismo. La referencia útil es tu propio histórico. Establecemos la línea base del mes uno y desde ahí medimos si cada cambio la mueve o no.',
      },
      {
        q: '¿Te encargas también de las campañas de la tienda?',
        a: 'Sí, y de hecho es la combinación que mejor funciona, porque la campaña y la tienda se arreglan mirando el mismo dato. Cuando una persona lleva la pauta y otra la tienda, el clásico es que se echen la culpa: la pauta dice que el tráfico es bueno y la tienda dice que llega mal calificado. Trabajando las dos juntas, el debate se acaba y se corrige donde toca.',
      },
    ],

    related: [
      { path: '/servicios/google-ads/', label: 'Google Ads', note: 'Shopping y Performance Max se alimentan del feed de tu tienda: si el feed está mal, la campaña también.' },
      { path: '/servicios/seo-sem/', label: 'SEO y SEM', note: 'En e-commerce el orgánico se gana en las fichas y las categorías, y baja el costo de adquisición con el tiempo.' },
      { path: '/servicios/meta-ads/', label: 'Meta Ads', note: 'El catálogo de Meta y el remarketing dinámico salen del mismo feed que ya montamos para la tienda.' },
      { path: '/trabajo/bio-laboratorios/', label: 'Caso Bio Laboratorios', note: 'Rediseño de marca, e-commerce y SEO/SEM trabajando juntos: +278% en ventas.' },
    ],

    image: {
      src: '/og/ecommerce-woocommerce-shopify-bogota.png',
      alt: 'Ficha de producto y paso de checkout de una tienda online optimizada, con costos de envío visibles desde el inicio',
      width: 1200,
      height: 630,
    },

    schemaType: 'Service',
    updated: '2026-08-24',
    priority: 0.8,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 5. Branding y diseño
  // ─────────────────────────────────────────────────────────────────────────
  {
    path: '/servicios/branding/',
    cluster: 'servicios',
    parent: '/servicios/',
    navLabel: 'Branding y diseño',

    metaTitle: 'Branding y diseño de marca con criterio comercial',
    metaDescription:
      'Identidad visual, brand book y sistema de piezas para marcas que tienen que vender. Seis años como diseñador gráfico aplicados con cabeza de negocio.',
    h1: 'Una marca no es un logo: es un sistema que tu equipo puede usar',
    keywords: ['branding bogotá', 'identidad visual', 'brand book', 'diseño gráfico marcas', 'sistema de piezas'],

    intent: {
      type: 'comercial',
      query: 'diseñador para identidad de marca en bogotá',
      audience:
        'Marcas que van a lanzar o relanzar y equipos donde cada pieza la hace una persona distinta, así que ya nada parece de la misma empresa.',
      problem:
        'Identidades que existen como archivo pero no como sistema: sin reglas, sin plantillas y sin nadie que sepa aplicarlas sin preguntar.',
      outcome:
        'Un sistema de marca entregado con brand book, plantillas editables y archivos abiertos, listo para que el equipo produzca sin depender de mí.',
    },

    tldr: [
      'Diseño desde 2016, y lo que entrego no es un logo: son reglas para que las cincuenta piezas del año se vean de la misma marca.',
      'Muestro dos o tres rutas visuales distintas, no diez variaciones de la misma idea. Diez propuestas es indecisión disfrazada de generosidad.',
      'El brand book es un manual de uso con casos correctos e incorrectos, no un catálogo bonito que nadie abre.',
      'Todos los archivos abiertos quedan en tu poder desde la entrega: nada se queda encerrado en mi computador.',
      'Con Nona Gastro Bar hice identidad y más de 30 piezas para la apertura, junto a contenido y operación: +120% en ventas.',
    ],

    lead:
      'Una identidad no se juzga por si el logo gusta en la reunión: se juzga por si el equipo puede usarla sin llamarte. Diseño desde 2016 y la mayoría de las marcas que llegan no necesitan otro logo, necesitan reglas. Cuando cada pieza la arma alguien distinto sin criterio común, la marca se diluye y el cliente deja de reconocerla. Lo que construyo es el sistema que evita eso.',
    ctaInline: { label: 'Cuéntame en qué momento está tu marca', href: 'whatsapp' },

    sections: [
      {
        h2: 'Qué entrego en un proyecto de identidad',
        body: [
          'La entrega es concreta y se lista desde la cotización, para que sepas exactamente qué recibes. Nada de "entregables por definir": si algo no está en esta lista, no está incluido, y eso lo conversamos antes y no después.',
        ],
        list: {
          variant: 'check',
          title: 'Lo que queda en tus manos al cerrar',
          items: [
            'Logo principal con sus variantes: horizontal, vertical, isotipo suelto y versión de una sola tinta.',
            'Paleta con códigos para pantalla e impresión, con reglas de contraste para que el texto siempre se lea.',
            'Sistema tipográfico con jerarquías definidas: título, subtítulo, cuerpo y dato destacado.',
            'Retícula y reglas de aire, que es lo que hace que las piezas se vean ordenadas sin que sepas por qué.',
            'Plantillas editables de las piezas que más se usan en el día a día.',
            'Brand book en PDF con los usos correctos y, sobre todo, los incorrectos.',
            'Archivos abiertos y exportados en los formatos que vas a necesitar, vectores incluidos.',
          ],
        },
        subsections: [
          {
            h3: 'El brand book es un manual de uso, no un catálogo',
            body: [
              'La mayoría de los manuales que me pasan los clientes son preciosos e inútiles: veinte páginas de mockups y ninguna instrucción de qué hacer cuando el logo va sobre una foto oscura.',
              'El mío responde las preguntas que sí aparecen en la operación: cuánto aire mínimo lleva el logo, qué pasa en fondo oscuro, cómo se comporta en un ícono de perfil de 40 píxeles, qué combinaciones de color no se pueden usar y cómo se escribe el nombre de la marca. Ahí está el valor real.',
            ],
          },
          {
            h3: 'Archivos y formatos que quedan en tu poder',
            body: [
              'Trabajo con Adobe Suite, así que entrego los originales editables y también versiones exportadas para quien no tenga esas herramientas: vectores para impresión y proveedores, PNG con fondo transparente para digital y SVG para web.',
              'Entrego además las plantillas de redes con las capas ordenadas y nombradas, para que quien produzca contenido cada semana no tenga que reconstruir nada desde cero.',
            ],
          },
        ],
      },
      {
        h2: 'El proceso, en cuatro fases',
        body: [
          'No empiezo abriendo Illustrator. Empiezo preguntando cuánto cuesta lo que vendes, a quién y contra quién compites, porque una marca de precio alto y una de volumen no se diseñan igual aunque el rubro sea el mismo.',
        ],
        list: {
          variant: 'ol',
          title: 'De la primera reunión a la entrega',
          items: [
            'Inmersión: negocio, cliente, precio y competencia. Media hora de preguntas incómodas antes de dibujar nada.',
            'Territorios: dos o tres rutas visuales genuinamente distintas, presentadas aplicadas en piezas reales y no flotando sobre fondo blanco.',
            'Construcción: se elige una ruta y se lleva a sistema completo, con las piezas críticas del negocio ya resueltas.',
            'Entrega y bajada: brand book, plantillas, archivos y una sesión con el equipo para que sepan usarlo.',
          ],
        },
        subsections: [
          {
            h3: 'Por qué muestro pocas rutas',
            body: [
              'Presentar diez logos no es generosidad, es falta de criterio: significa que no me jugué por ninguno. Dos o tres rutas bien argumentadas obligan a una conversación sobre estrategia, que es la conversación que sirve.',
              'Cada ruta llega con su razón: a quién le habla, qué posición ocupa frente a la competencia y qué sacrifica. Elegir marca siempre implica renunciar a algo, y prefiero que esa renuncia sea consciente.',
            ],
          },
          {
            h3: 'Cómo se aprueban las cosas',
            body: [
              'Las rondas de ajuste están definidas desde la cotización: cuántas hay y qué se puede pedir en cada una. Sin eso, un proyecto de marca se vuelve infinito y termina mal para los dos.',
              'También pido una sola persona que decida. Cuando la aprobación pasa por seis opiniones, el resultado no es mejor: es el promedio de todas, y el promedio nunca se recuerda.',
            ],
          },
        ],
      },
      {
        h2: 'La marca vive en las piezas del día a día',
        body: [
          'Nadie ve tu manual de marca. La gente ve un post, una historia, un empaque y un correo de confirmación, casi siempre en ese orden y en pantallas chicas. Por eso el sistema se prueba en las piezas reales antes de darlo por terminado.',
          'Con Nona Gastro Bar eso significó más de 30 piezas gráficas para la apertura, además del contenido digital y la operación con un equipo de cinco personas.',
        ],
        table: {
          caption: 'Piezas de un sistema de marca y qué tiene que lograr cada una',
          head: ['Pieza', 'Dónde vive', 'Qué tiene que lograr'],
          rows: [
            ['Post de feed', 'Instagram y Facebook', 'Que se reconozca la marca sin leer el nombre'],
            ['Historia o reel', 'Vertical, con el sonido apagado', 'Un solo mensaje, legible en dos segundos'],
            ['Pieza de campaña', 'Anuncios pagos', 'Oferta clara y espacio para variantes de prueba'],
            ['Empaque o carta', 'Punto de venta físico', 'Sostener el precio que estás cobrando'],
            ['Ficha web y correo', 'Tienda y posventa', 'Coherencia con lo que la persona vio en el anuncio'],
          ],
        },
      },
      {
        h2: 'Cuándo un rediseño sí vale la pena',
        body: [
          'Rediseñar cuesta plata y cuesta reconocimiento: la gente tarda en volver a identificarte. Vale la pena cuando hay una razón de negocio detrás, no cuando el logo aburrió internamente.',
        ],
        list: {
          variant: 'ul',
          items: [
            'El negocio cambió de precio o de público y la marca sigue hablándole al anterior.',
            'Cada pieza la hace una persona distinta y ya no parecen de la misma empresa.',
            'La marca no funciona en digital: no se lee en un ícono de perfil ni aguanta fondo oscuro.',
            'Vas a abrir un canal nuevo (tienda online, punto físico, empaque) y toca definir reglas de todas formas.',
            'No vale la pena solo porque te cansaste del logo. Ese cambio se paga y no devuelve nada.',
          ],
        },
      },
    ],

    faq: [
      {
        q: '¿Cuánto cuesta una identidad de marca completa?',
        a: 'Depende del alcance: no es lo mismo una identidad base para una marca que arranca que un sistema con empaques, señalética y plantillas para un equipo que produce contenido todas las semanas. Cotizo por proyecto con alcance cerrado y por escrito, con las rondas de ajuste incluidas definidas de entrada. Así ninguno de los dos termina discutiendo a mitad de camino qué estaba incluido.',
      },
      {
        q: '¿Cuánto se demora un proyecto de branding?',
        a: 'Un sistema de identidad completo suele tomar varias semanas, y el reloj real lo marcan tus tiempos de aprobación, no los míos. Las fases de inmersión y territorios son rápidas; lo que se alarga es esperar decisiones cuando hay varias personas opinando. Por eso pido un único responsable de aprobar desde el principio.',
      },
      {
        q: '¿Cuántas propuestas de logo me vas a mostrar?',
        a: 'Dos o tres rutas distintas, cada una con su argumento de por qué existe y a quién le habla. No presento diez opciones porque eso solo traslada la decisión al cliente sin darle criterio para tomarla. Si ninguna de las rutas conecta, hay una ronda de exploración adicional contemplada, pero en ese punto casi siempre el problema estuvo en el brief y volvemos ahí.',
      },
      {
        q: '¿Qué necesito darte para empezar?',
        a: 'Claridad sobre a quién le vendes, a qué precio y contra quién compites, más lo que ya exista de la marca: logos viejos, fotos, materiales impresos. Si tienes referencias visuales que te gustan, sirven mucho, sobre todo las que no son de tu industria. Y una persona con poder de decidir, que es el requisito que más impacto tiene en los tiempos.',
      },
      {
        q: '¿Un rediseño de marca aumenta las ventas?',
        a: 'Por sí solo, no. Una marca sostiene el precio, hace que te recuerden y baja la fricción para confiar en ti, pero no reemplaza tener demanda ni una oferta que valga la pena. Donde sí se nota es cuando trabaja junto al resto: con Nona Gastro Bar la identidad, las más de 30 piezas y el contenido acompañaron un +120% en ventas, pero eso fue marca más operación más contenido, no un logo nuevo solo.',
      },
      {
        q: '¿Haces solo el logo si es lo único que necesito?',
        a: 'Lo hago, pero te digo de frente que suele ser mala inversión. Un logo sin paleta, tipografías ni reglas de uso termina aplicado de cinco maneras distintas en tres meses y el problema vuelve. El paquete mínimo que recomiendo es logo con variantes, colores, tipografías y reglas básicas: es lo que hace que el diseño sobreviva al uso diario.',
      },
    ],

    related: [
      { path: '/servicios/meta-ads/', label: 'Meta Ads', note: 'En Meta el creativo decide el resultado, y un buen creativo sale de un sistema de marca, no de improvisar.' },
      { path: '/servicios/ecommerce/', label: 'E-commerce', note: 'La marca tiene que sostenerse en la ficha de producto y en el checkout, que es donde se decide la compra.' },
      { path: '/trabajo/nona-gastro-bar/', label: 'Caso Nona Gastro Bar', note: 'Identidad, +30 piezas y apertura: cómo se ve un sistema de marca puesto a operar.' },
      { path: '/trabajo/limonada-pink/', label: 'Caso Limonada Pink', note: 'Un brand book completo aterrizado en tienda online y campañas reales.' },
    ],

    image: {
      src: '/og/branding-identidad-visual-bogota.png',
      alt: 'Páginas de un brand book con paleta de color, jerarquía tipográfica y variantes de logo diseñadas por Iván Santiago Duarte',
      width: 1200,
      height: 630,
    },

    schemaType: 'Service',
    updated: '2026-08-24',
    priority: 0.75,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 6. Producto con IA
  // ─────────────────────────────────────────────────────────────────────────
  {
    path: '/servicios/producto-ia/',
    cluster: 'servicios',
    parent: '/servicios/',
    navLabel: 'Producto con IA',

    metaTitle: 'Producto digital con IA | Del concepto al deploy',
    metaDescription:
      'Construyo productos digitales con IA: React, Supabase y Claude, en producción. Lumi es la prueba y se puede abrir hoy. Cuéntame tu idea y la aterrizamos.',
    h1: 'De la idea a algo que la gente puede abrir y usar hoy',
    keywords: ['producto digital con ia', 'mvp con inteligencia artificial', 'desarrollo react supabase', 'apps con claude', 'prototipo funcional ia'],

    intent: {
      type: 'comercial',
      query: 'cómo hacer un mvp con inteligencia artificial',
      audience:
        'Fundadores y equipos de marketing con una idea de producto que quieren validarla con algo funcionando, no con una presentación.',
      problem:
        'Ideas que se quedan en documentos y en prototipos de Figma porque nadie las lleva a producción, y cotizaciones de desarrollo que no caben en el presupuesto de una validación.',
      outcome:
        'Un producto acotado, desplegado y con analítica desde el primer día, con el código y las cuentas a tu nombre.',
    },

    tldr: [
      'La diferencia entre una idea y un producto es que el producto se abre en el navegador. Lo demás es un documento.',
      'Lumi es la prueba: app de bienestar emocional con chat de IA en tiempo real, detección de crisis y journey gamificado, en React 19, Supabase y Claude.',
      'Trabajo por recorte: definimos la única cosa que la versión uno tiene que hacer bien y todo lo demás se anota para después.',
      'La IA rinde en conversación guiada y clasificación. En "un agente que hace todo solo" casi siempre es humo: sin procesos definidos, automatizas el desorden.',
      'El código, el repositorio y las cuentas quedan a tu nombre desde el primer commit.',
    ],

    lead:
      'Vengo del marketing, no de la ingeniería, y eso define cómo construyo: empiezo por a quién le sirve y cómo se va a medir, no por la arquitectura. Lumi salió de una idea a una app desplegada, con chat de IA en tiempo real, detección de crisis y un journey gamificado, construida en React 19 sobre Supabase con Claude. La construí yo, de punta a punta. Eso es lo que ofrezco: llevar una idea a algo que se pueda usar, no a un documento de sesenta páginas.',
    ctaInline: { label: 'Cuéntame la idea y te digo si es viable', href: 'whatsapp' },

    sections: [
      {
        h2: 'Cómo llevo una idea a producción',
        body: [
          'El error más común no es técnico: es querer lanzar con todo. Un producto que hace ocho cosas a medias no se puede evaluar, porque cuando no funciona no sabes cuál de las ocho falló. Por eso la primera conversación siempre es de recorte.',
        ],
        list: {
          variant: 'ol',
          title: 'Las cinco etapas',
          items: [
            'Recorte: definimos la única cosa que la versión uno debe hacer bien. El resto se anota en una lista y se deja para después, no se discute otra vez.',
            'Flujo y pantallas: diseño las pantallas reales, no wireframes grises, porque el diseño resuelve la mitad de las decisiones de producto antes de escribir código.',
            'Datos y cuentas: modelo de datos, autenticación y permisos resueltos antes de meter una sola llamada al modelo.',
            'Capa de IA: dónde el modelo aporta de verdad, con instrucciones acotadas y un plan explícito para cuando se equivoque.',
            'Deploy y medición: sale a producción con analítica desde el día uno, porque un producto sin datos de uso no se puede mejorar.',
          ],
        },
        subsections: [
          {
            h3: 'El stack con el que trabajo',
            body: [
              'Uso pocas herramientas y las conozco bien. En un MVP la variedad del stack no es virtud: cada pieza extra es algo más que mantener cuando la idea todavía no está validada.',
            ],
            list: {
              variant: 'ul',
              items: [
                'React para la interfaz, porque es donde puedo iterar más rápido sobre el diseño.',
                'Supabase como base de datos, autenticación y tiempo real, sin montar servidores propios.',
                'Claude para la capa de IA, con las instrucciones y los límites definidos por escrito.',
                'Vercel para desplegar, con cada cambio publicable en minutos.',
                'Git y GitHub desde el primer día, con el repositorio a tu nombre.',
              ],
            },
          },
          {
            h3: 'Qué no soy',
            body: [
              'No soy una fábrica de software ni armo equipos de diez personas. No tomo proyectos de seis meses con especificación cerrada, porque en ese formato lo que se entrega ya no es lo que el negocio necesita.',
              'Trabajo en ciclos cortos con una persona decidiendo del otro lado. Si tu proyecto necesita cumplimiento normativo pesado, integraciones bancarias o un equipo de mantenimiento permanente, te conviene una casa de software y te lo digo antes de cotizar.',
            ],
          },
        ],
      },
      {
        h2: 'Lumi: el ejemplo que puedes abrir',
        body: [
          'Lumi es un producto propio, no un encargo, y por eso puedo mostrarlo completo. Es una app de bienestar emocional donde la conversación con IA ocurre en tiempo real, con detección de señales de crisis y un journey gamificado para sostener el hábito, que es el problema real de esta categoría.',
          'Lo importante para este servicio no es la app en sí, sino que existe: está desplegada, se abre en el navegador y se puede usar. Un portafolio de producto donde todo son mockups no prueba que sepas terminar algo.',
        ],
        list: {
          variant: 'check',
          title: 'Qué hay dentro',
          items: [
            'Chat con IA en tiempo real, no un formulario que responde en diferido.',
            'Detección de señales de crisis, con una ruta distinta cuando la conversación lo requiere.',
            'Journey gamificado, porque en bienestar el reto no es la primera sesión sino la décima.',
            'React 19 en el front y Supabase como base de datos, autenticación y capa de tiempo real.',
            'Desplegada y accesible en la web: no es un prototipo clickeable en Figma.',
          ],
        },
        subsections: [
          {
            h3: 'Qué aprendí construyéndola',
            body: [
              'Tres cosas que ahora aplico en cualquier proyecto. La primera: el costo del modelo se diseña, no se descubre en la factura; el largo del contexto y cada cuánto llamas al modelo son decisiones de producto.',
              'La segunda: la latencia percibida importa más que la real, y una respuesta que empieza a aparecer de inmediato se siente mejor que una perfecta que llega tres segundos después. La tercera: cuando el tema es sensible, hay que definir de antemano qué hace el sistema cuando no debe responder, y eso se prueba explícitamente.',
            ],
          },
        ],
      },
      {
        h2: 'Dónde la IA aporta y dónde es humo',
        body: [
          'La IA no es una función que se agrega al final para poder decir que el producto la tiene. O resuelve un problema concreto del usuario, o es peso muerto que además cuesta plata por cada uso.',
        ],
        table: {
          caption: 'Usos de IA en un producto y qué se necesita para que funcionen',
          head: ['Uso', 'Veredicto', 'Condición para que funcione'],
          rows: [
            ['Conversación guiada con el usuario', 'Sí, es donde más rinde', 'Instrucciones acotadas y salida clara hacia un humano'],
            ['Clasificar y etiquetar lo que entra', 'Sí, barato y confiable', 'Categorías definidas por el negocio, no improvisadas'],
            ['Redactar contenido en volumen', 'Con cuidado', 'Alguien que edite: publicar sin revisar sale caro en SEO'],
            ['Recomendar productos', 'Depende del catálogo', 'Datos propios suficientes; con catálogo chico gana una regla simple'],
            ['Un agente que hace todo solo', 'Casi siempre humo', 'Procesos ya definidos; si no, automatizas el desorden'],
          ],
        },
      },
      {
        h2: 'Qué pasa después del deploy',
        body: [
          'Lanzar es el principio. Las primeras dos semanas son las que enseñan de verdad: dónde se atasca la gente, qué función nadie usa y qué pregunta repiten todos. Por eso el producto sale con analítica desde el primer día, con los eventos clave del recorrido definidos antes de publicar.',
          'A partir de ahí decidimos con datos qué entra en la siguiente versión y qué se elimina. Eliminar funciones también es trabajo de producto, y suele ser el que más mejora la experiencia. Si prefieres seguir tú solo desde ese punto, no hay problema: el repositorio y las cuentas ya son tuyas y quedan documentadas.',
        ],
      },
    ],

    faq: [
      {
        q: '¿Cuánto cuesta construir un MVP con IA?',
        a: 'Depende del alcance que definamos en el recorte, y esa conversación es gratis. Un producto con una funcionalidad central bien hecha cuesta una fracción de lo que cuesta uno con ocho pantallas y tres integraciones. Cotizo por proyecto con alcance cerrado por escrito, y aparte quedan los costos de infraestructura y de la API del modelo, que se pagan por consumo y van a tu nombre.',
      },
      {
        q: '¿Cuánto se demora en estar en producción?',
        a: 'Con el alcance bien recortado, semanas y no meses. Lo que estira los tiempos casi nunca es programar: es no tener decidido a quién le sirve el producto ni qué hace exactamente en la versión uno. Por eso invierto la primera parte del proyecto en cerrar eso. Si a mitad de camino cambia el alcance, se recotiza; no lo meto por debajo de la mesa.',
      },
      {
        q: '¿De quién queda el código y las cuentas?',
        a: 'Tuyas, desde el primer commit. El repositorio se crea a tu nombre y las cuentas de infraestructura y de la API se abren con tu correo y tu método de pago. Trabajo con acceso, no con propiedad, igual que en las cuentas publicitarias. Si mañana quieres seguir con otro desarrollador, no tienes que pedirme nada ni esperar a que yo entregue algo.',
      },
      {
        q: '¿Qué necesito de mi lado para empezar?',
        a: 'Claridad sobre el problema que resuelve el producto y para quién, más una persona disponible para decidir rápido durante el proyecto. No necesitas requerimientos escritos ni conocimiento técnico: eso lo armamos juntos en la fase de recorte. Lo que sí necesitas es aguantar que te diga que no a funciones, porque ahí es donde se salva el proyecto.',
      },
      {
        q: '¿Y si la idea no funciona?',
        a: 'Es un resultado válido y es exactamente para lo que sirve un MVP: descubrirlo en semanas y con poca plata, en vez de en un año. Por eso el producto sale con medición desde el día uno, con criterios de éxito acordados antes de lanzar. Si los datos dicen que no, lo digo. Prefiero eso a venderte una segunda fase sobre algo que ya mostró que no tiene demanda.',
      },
      {
        q: '¿Esto reemplaza a un equipo de desarrollo?',
        a: 'No, y no pretende hacerlo. Reemplaza al documento de requerimientos y al prototipo en Figma que nadie puede usar. Sirve para validar rápido, mostrar algo real a un socio o a un cliente y llegar con evidencia a la conversación de inversión. Cuando el producto demuestra tracción y necesita escalar, ahí sí toca un equipo, y en ese momento el código documentado que dejo es el punto de partida.',
      },
    ],

    related: [
      { path: '/trabajo/lumi/', label: 'Caso Lumi', note: 'El producto completo: qué decisiones tomé, qué recorté y cómo llegó a producción.' },
      { path: '/trabajo/asignar/', label: 'Caso Asignar', note: 'Campañas y funnels de performance, que es la otra cara del mismo trabajo: producto que además tiene que vender.' },
      { path: '/servicios/ecommerce/', label: 'E-commerce', note: 'Si lo que quieres vender ya existe, muchas veces conviene una tienda bien armada antes que un producto nuevo.' },
      { path: '/servicios/seo-sem/', label: 'SEO y SEM', note: 'Un producto que nadie encuentra no se valida: hay que resolver también de dónde llega la gente.' },
    ],

    image: {
      src: '/og/producto-digital-con-ia-lumi.png',
      alt: 'Pantalla de la app Lumi con el chat de IA en tiempo real y el journey de seguimiento, construida en React y Supabase',
      width: 1200,
      height: 630,
    },

    schemaType: 'Service',
    updated: '2026-08-24',
    priority: 0.75,
  },
]
