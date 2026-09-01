// ─────────────────────────────────────────────────────────────────────────────
// Escena WebGL del hero — three.js puro, sin React.
//
// Se aísla del árbol de componentes a propósito: así se puede cargar en
// diferido (import() dinámico) y no entra ni un byte de three.js en el bundle
// inicial ni en el render de servidor.
//
// Dos pasadas en el mismo canvas:
//   1. Cámara ortográfica + quad a pantalla completa → la "aurora": ruido
//      simplex con domain warping que fluye en el azul de la marca.
//   2. Cámara en perspectiva + nube de puntos → la profundidad real. Los
//      puntos tienen z distinta, así que el paralaje del mouse los separa.
//
// Todo el estado vive en cierres; `createAuroraScene` devuelve el control
// remoto (tema, scroll, destruir) que usa el componente de React.
// ─────────────────────────────────────────────────────────────────────────────

import {
  WebGLRenderer, Scene, OrthographicCamera, PerspectiveCamera, PlaneGeometry,
  TorusKnotGeometry, BufferGeometry, BufferAttribute, ShaderMaterial, Mesh, Points,
  Vector2, Vector3, Color, AdditiveBlending, NormalBlending, DoubleSide,
  WebGLRenderTarget, LinearFilter,
} from 'three'

// ── Aurora: quad a pantalla completa ────────────────────────────────────────

const auroraVert = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`

// Simplex 2D de Ashima Arts (dominio público / MIT) — la base del campo de
// ruido. Se usa dentro de un fbm de 4 octavas y con doble domain warping, que
// es lo que da el movimiento orgánico en vez de un degradado que "respira".
const auroraFrag = /* glsl */ `
  precision highp float;

  varying vec2 vUv;

  uniform float uTime;
  uniform vec2  uRes;
  uniform vec2  uMouse;      // -1..1, ya suavizado
  uniform float uScroll;     // 0..1 progreso del hero
  uniform vec3  uBg;
  uniform vec3  uInk;        // azul firma
  uniform vec3  uGlow;       // azul claro
  uniform float uIntensity;  // baja en modo claro
  uniform float uGrain;

  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }

  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                       -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
                          + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy),
                            dot(x12.zw, x12.zw)), 0.0);
    m = m * m; m = m * m;
    vec3 x  = 2.0 * fract(p * C.www) - 1.0;
    vec3 h  = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 3; i++) {
      v += a * snoise(p);
      p *= 2.02;
      a *= 0.5;
    }
    return v;
  }

  // Ruido de grano barato, para que el degradado no muestre banding.
  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  void main() {
    // Coordenadas corregidas por aspecto: el campo no se estira en pantallas
    // anchas.
    vec2 uv = vUv;
    vec2 pv = (uv - 0.5) * vec2(uRes.x / uRes.y, 1.0);   // para la viñeta

    // El muestreo se hace en un dominio más ancho que la pantalla. Sobre el
    // rango ±0.5 del quad el fbm apenas varía y el resultado es un fondo casi
    // liso; con este factor entran varias crestas en cuadro.
    vec2 p = pv * 1.15;

    float t = uTime * 0.055;

    // Domain warping: se deforma el espacio con ruido antes de volver a
    // muestrearlo. Es lo que convierte un fbm plano en algo que parece fluido.
    //
    // Una sola pasada de warp, no dos. La segunda costaba dos fbm más por píxel
    // (5 en total × 3 octavas = 15 evaluaciones de ruido por píxel y por frame)
    // y a esta escala de forma su aporte visual no se distingue.
    vec2 q = vec2(fbm(p + vec2(0.0, t)),
                  fbm(p + vec2(5.2, 1.3) - t));

    float f = fbm(p + 1.35 * q);

    // El fbm devuelve aprox. ±0.6 en la práctica, no ±1. Normalizar con ese
    // rango real es lo que hace que los smoothstep de abajo lleguen a activarse;
    // con 0.5/0.5 el campo se quedaba comprimido en la zona muerta.
    f = clamp(f * 0.85 + 0.5, 0.0, 1.0);

    // El mouse abre un claro de luz: se acerca la mancha al cursor.
    float d = length(pv - uMouse * vec2(uRes.x / uRes.y, 1.0) * 0.45);
    float halo = smoothstep(0.75, 0.0, d);

    // Al bajar, el campo se apaga y cede el paso al contenido.
    float fade = 1.0 - smoothstep(0.0, 0.9, uScroll);

    // El centro se mantiene limpio: ahí va el H1. La niebla solo gana cuerpo
    // hacia los bordes, que es lo que da atmósfera sin pelear con el texto.
    float radial = length(pv);
    float clear = smoothstep(0.06, 0.88, radial);

    // Bandas anchas y pesos bajos: se busca una nebulosa, no un mármol. Con
    // rangos estrechos el campo se separa en vetas de borde duro.
    vec3 col = uBg;
    col = mix(col, uInk,  smoothstep(0.30, 0.95, f) * 0.34 * clear);
    col = mix(col, uGlow, smoothstep(0.62, 1.05, f) * 0.13 * clear);
    col = mix(col, uGlow, halo * 0.06);

    // Viñeta exterior para que el borde no corte en seco.
    float vig = smoothstep(1.30, 0.35, radial);
    col = mix(uBg, col, vig);

    // La intensidad final baja mucho en modo claro (uIntensity) y con scroll.
    col = mix(uBg, col, uIntensity * fade);

    col += (hash(uv * uRes + fract(uTime)) - 0.5) * uGrain;

    gl_FragColor = vec4(col, 1.0);
  }
`

// Copia la textura de la aurora a pantalla. Un solo texture2D por píxel: es lo
// que permite calcular el ruido a media resolución y a mitad de framerate sin
// que se note.
const blitFrag = /* glsl */ `
  precision mediump float;
  varying vec2 vUv;
  uniform sampler2D uMap;
  void main() { gl_FragColor = texture2D(uMap, vUv); }
`

// ── Partículas: la profundidad ──────────────────────────────────────────────

const dustVert = /* glsl */ `
  attribute float aScale;
  attribute float aSeed;

  uniform float uTime;
  uniform float uDpr;
  uniform float uScroll;

  varying float vAlpha;

  void main() {
    vec3 pos = position;

    // Deriva lenta e independiente por partícula (aSeed desfasa cada una).
    pos.y += sin(uTime * 0.18 + aSeed * 6.283) * 0.55;
    pos.x += cos(uTime * 0.13 + aSeed * 6.283) * 0.45;

    // Al hacer scroll la nube sube: refuerza la sensación de descender.
    pos.y += uScroll * 6.0;

    vec4 mv = modelViewMatrix * vec4(pos, 1.0);

    // Las de atrás se ven más tenues → profundidad legible sin niebla.
    vAlpha = smoothstep(-18.0, -2.0, mv.z);

    gl_Position = projectionMatrix * mv;
    gl_PointSize = aScale * uDpr * (38.0 / -mv.z);
  }
`

const dustFrag = /* glsl */ `
  precision mediump float;

  uniform vec3  uColor;
  uniform float uOpacity;

  varying float vAlpha;

  void main() {
    // Punto redondo con borde suave (gl_PointCoord va de 0 a 1 en el sprite).
    float d = length(gl_PointCoord - 0.5);
    float a = smoothstep(0.5, 0.05, d);
    if (a < 0.01) discard;
    gl_FragColor = vec4(uColor, a * vAlpha * uOpacity);
  }
`

// ── Objeto: la pieza 3D real ────────────────────────────────────────────────
//
// Un nudo toroidal de tubo fino, iluminado solo por su propio borde. No lleva
// luces de escena ni mapa de entorno: el volumen sale del término de Fresnel
// (cuánto se aleja la normal de la vista), que es lo que dibuja el contorno
// brillante de los materiales tipo vidrio. Sale barato y no depende de assets.

const knotVert = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vView;
  varying vec3 vPos;

  void main() {
    vPos = position;
    vNormal = normalize(normalMatrix * normal);
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vView = -mv.xyz;                 // del fragmento hacia la cámara
    gl_Position = projectionMatrix * mv;
  }
`

const knotFrag = /* glsl */ `
  precision highp float;

  varying vec3 vNormal;
  varying vec3 vView;
  varying vec3 vPos;

  uniform float uTime;
  uniform vec3  uBase;
  uniform vec3  uRim;
  uniform float uOpacity;

  void main() {
    vec3 n = normalize(vNormal);
    vec3 v = normalize(vView);

    // Fresnel: 0 de frente, 1 en los bordes. La potencia decide qué tan fino
    // queda el filo de luz.
    float fres = pow(1.0 - abs(dot(n, v)), 2.6);

    // Pulso de luz que recorre el nudo a lo largo. Sin esto la pieza gira pero
    // se ve muerta: es el detalle que la hace parecer material y no maqueta.
    float band = sin(vPos.x * 1.6 + vPos.y * 1.2 - uTime * 0.9) * 0.5 + 0.5;

    vec3 col = uBase;
    col += uRim * fres * 1.5;
    col += uRim * pow(band, 6.0) * 0.55;

    // El cuerpo casi transparente y los bordes sólidos: se lee como vidrio
    // ahumado en vez de plástico.
    float alpha = clamp(fres * 1.35 + pow(band, 8.0) * 0.35, 0.0, 1.0) * uOpacity;

    gl_FragColor = vec4(col, alpha);
  }
`

// Paleta por tema. En claro la aurora casi desaparece: sobre papel cálido el
// mismo azul que funciona en oscuro se ve sucio.
const THEMES = {
  dark:  { bg: '#06070D', ink: '#1B3CFF', glow: '#6B82FF', intensity: 0.62, grain: 0.022, dust: '#A8B6FF', dustOpacity: 0.55, knotBase: '#080C22', knotRim: '#4E6BFF', knotOpacity: 0.42 },
  light: { bg: '#F7F6F2', ink: '#1B3CFF', glow: '#6B82FF', intensity: 0.14, grain: 0.010, dust: '#1B3CFF', dustOpacity: 0.16, knotBase: '#C9D0F5', knotRim: '#1B3CFF', knotOpacity: 0.30 },
}

/**
 * Monta la escena sobre un canvas ya existente.
 *
 * @param {HTMLCanvasElement} canvas
 * @param {{ theme?: 'dark'|'light', density?: number }} opts
 * @returns {{ setTheme(t): void, setScroll(v): void, setPaused(p): void, destroy(): void }}
 */
export function createAuroraScene(canvas, opts = {}) {
  const renderer = new WebGLRenderer({
    canvas,
    antialias: false,          // el campo es difuso: el MSAA no aporta y cuesta
    alpha: false,
    powerPreference: 'high-performance',
    stencil: false,
    depth: false,
  })

  // Más de 1.5 no se distingue a simple vista y sí se nota en el frame time:
  // el costo del shader crece con el cuadrado de esta cifra.
  const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
  renderer.setPixelRatio(dpr)
  renderer.autoClear = false

  let theme = THEMES[opts.theme === 'light' ? 'light' : 'dark']

  // ── Pasada 1: aurora ──────────────────────────────────────────────────────
  const auroraScene = new Scene()
  const auroraCam = new OrthographicCamera(-1, 1, 1, -1, 0, 1)

  const auroraUniforms = {
    uTime:      { value: 0 },
    uRes:       { value: new Vector2(1, 1) },
    uMouse:     { value: new Vector2(0, 0) },
    uScroll:    { value: 0 },
    uBg:        { value: new Color(theme.bg) },
    uInk:       { value: new Color(theme.ink) },
    uGlow:      { value: new Color(theme.glow) },
    uIntensity: { value: theme.intensity },
    uGrain:     { value: theme.grain },
  }

  // La aurora no se dibuja directo a pantalla: se calcula en un buffer a la
  // mitad de resolución (una cuarta parte de los píxeles) y después se copia
  // estirada. Es un campo difuso y muy lento, así que la pérdida de nitidez no
  // se percibe — y es, de lejos, el mayor ahorro disponible.
  // Nivel de calidad: no decide SI se dibuja la aurora, sino cada cuántos
  // frames se recalcula y a qué resolución. Apagarla dejaría el hero vacío, que
  // es peor que una aurora que se mueve un poco más lento.
  const TIERS = [
    { scale: 0.50, every: 2, dust: 1.00, knot: true  },  // 2 · completo
    { scale: 0.40, every: 3, dust: 0.60, knot: false },  // 1 · sin objeto
    { scale: 0.30, every: 6, dust: 0.35, knot: false },  // 0 · mínimo viable
  ]

  const auroraRT = new WebGLRenderTarget(1, 1, {
    minFilter: LinearFilter,
    magFilter: LinearFilter,
    depthBuffer: false,
    stencilBuffer: false,
  })

  const auroraMesh = new Mesh(
    new PlaneGeometry(2, 2),
    new ShaderMaterial({
      vertexShader: auroraVert,
      fragmentShader: auroraFrag,
      uniforms: auroraUniforms,
      depthTest: false,
      depthWrite: false,
      blending: NormalBlending,
    }),
  )
  auroraMesh.frustumCulled = false
  auroraScene.add(auroraMesh)

  const blitScene = new Scene()
  const blitMesh = new Mesh(
    new PlaneGeometry(2, 2),
    new ShaderMaterial({
      vertexShader: auroraVert,
      fragmentShader: blitFrag,
      uniforms: { uMap: { value: auroraRT.texture } },
      depthTest: false,
      depthWrite: false,
    }),
  )
  blitMesh.frustumCulled = false
  blitScene.add(blitMesh)

  // ── Pasada 2: polvo ───────────────────────────────────────────────────────
  const dustScene = new Scene()
  const dustCam = new PerspectiveCamera(60, 1, 0.1, 60)
  dustCam.position.set(0, 0, 10)

  const COUNT = Math.round((opts.density ?? 1) * 420)
  const positions = new Float32Array(COUNT * 3)
  const scales = new Float32Array(COUNT)
  const seeds = new Float32Array(COUNT)

  for (let i = 0; i < COUNT; i++) {
    positions[i * 3 + 0] = (Math.random() - 0.5) * 30
    positions[i * 3 + 1] = (Math.random() - 0.5) * 22
    positions[i * 3 + 2] = -Math.random() * 17            // siempre detrás
    scales[i] = 0.5 + Math.random() * 2.1
    seeds[i] = Math.random()
  }

  const dustGeo = new BufferGeometry()
  dustGeo.setAttribute('position', new BufferAttribute(positions, 3))
  dustGeo.setAttribute('aScale', new BufferAttribute(scales, 1))
  dustGeo.setAttribute('aSeed', new BufferAttribute(seeds, 1))

  const dustUniforms = {
    uTime:    { value: 0 },
    uDpr:     { value: dpr },
    uScroll:  { value: 0 },
    uColor:   { value: new Color(theme.dust) },
    uOpacity: { value: theme.dustOpacity },
  }

  const dust = new Points(
    dustGeo,
    new ShaderMaterial({
      vertexShader: dustVert,
      fragmentShader: dustFrag,
      uniforms: dustUniforms,
      transparent: true,
      depthWrite: false,
      blending: AdditiveBlending,
    }),
  )
  dust.frustumCulled = false
  dustScene.add(dust)

  // ── Pasada 3: el objeto ───────────────────────────────────────────────────
  //
  // Comparte cámara con el polvo: así el paralaje del mouse lo mueve junto con
  // las partículas y todo se lee como un mismo espacio, no como capas pegadas.
  const knotScene = new Scene()

  const knotUniforms = {
    uTime:    { value: 0 },
    uBase:    { value: new Color(theme.knotBase) },
    uRim:     { value: new Color(theme.knotRim) },
    uOpacity: { value: theme.knotOpacity },
  }

  // Tubo fino (0.21) sobre un nudo 2/3: se lee como una cinta que se pliega,
  // no como una rosquilla. 200 segmentos alcanzan para que el filo de luz no
  // muestre facetas.
  const knotGeo = new TorusKnotGeometry(1, 0.21, 150, 18, 2, 3)

  const knot = new Mesh(
    knotGeo,
    new ShaderMaterial({
      vertexShader: knotVert,
      fragmentShader: knotFrag,
      uniforms: knotUniforms,
      transparent: true,
      depthWrite: false,     // sin esto los tramos traseros recortan a los de adelante
      side: DoubleSide,
      blending: AdditiveBlending,
    }),
  )
  knot.position.set(2.9, 0.9, -3.2)
  knot.scale.setScalar(1.55)
  knotScene.add(knot)

  // ── Entrada: mouse y scroll ───────────────────────────────────────────────
  const mouse = new Vector2(0, 0)        // objetivo
  const smooth = new Vector2(0, 0)       // valor suavizado que llega al shader
  let scroll = 0
  let scrollSmooth = 0
  const camTarget = new Vector3(0, 0, 10)

  const onPointer = (e) => {
    mouse.set(
      (e.clientX / window.innerWidth) * 2 - 1,
      -((e.clientY / window.innerHeight) * 2 - 1),
    )
  }
  window.addEventListener('pointermove', onPointer, { passive: true })

  // ── Tamaño ────────────────────────────────────────────────────────────────
  function resize() {
    const w = canvas.clientWidth || window.innerWidth
    const h = canvas.clientHeight || window.innerHeight
    renderer.setSize(w, h, false)

    const scale = TIERS[2 - quality].scale
    const aw = Math.max(1, Math.round(w * dpr * scale))
    const ah = Math.max(1, Math.round(h * dpr * scale))
    auroraRT.setSize(aw, ah)
    auroraUniforms.uRes.value.set(aw, ah)
    dustCam.aspect = w / h
    dustCam.updateProjectionMatrix()
  }
  resize()

  const ro = new ResizeObserver(resize)
  ro.observe(canvas)

  // ── Bucle ─────────────────────────────────────────────────────────────────
  let raf = 0
  let paused = false
  let last = performance.now()
  let clock = 0
  let auroraFrame = 0

  let quality = 2
  let frameSamples = 0
  let frameAccum = 0

  function frame(now) {
    raf = requestAnimationFrame(frame)
    if (paused) { last = now; return }

    // Delta acotado: al volver de una pestaña en segundo plano, un dt enorme
    // daría un salto brusco en la animación.
    const dt = Math.min((now - last) / 1000, 1 / 30)
    last = now
    clock += dt

    // Suavizado exponencial independiente del framerate.
    const k = 1 - Math.pow(0.001, dt)
    smooth.lerp(mouse, k)
    scrollSmooth += (scroll - scrollSmooth) * k

    auroraUniforms.uTime.value = clock
    auroraUniforms.uMouse.value.copy(smooth)
    auroraUniforms.uScroll.value = scrollSmooth

    dustUniforms.uTime.value = clock
    dustUniforms.uScroll.value = scrollSmooth

    knotUniforms.uTime.value = clock

    // Giro base lento, más un empuje proporcional al scroll: al bajar, la pieza
    // rota de más y se hunde, en vez de quedarse flotando igual todo el rato.
    knot.rotation.x = clock * 0.09 + scrollSmooth * 1.6
    knot.rotation.y = clock * 0.13 + scrollSmooth * 2.1
    knot.position.y = 0.9 - scrollSmooth * 3.2
    knotUniforms.uOpacity.value = theme.knotOpacity * (1 - Math.min(1, scrollSmooth * 1.3))

    // Paralaje: la cámara se desplaza con el mouse, no las partículas. Así el
    // desplazamiento depende de la profundidad de cada punto — que es
    // exactamente lo que el ojo lee como "3D".
    camTarget.set(smooth.x * 1.5, smooth.y * 1.0, 10 - scrollSmooth * 2.5)
    dustCam.position.lerp(camTarget, k)
    dustCam.lookAt(0, 0, -6)

    // La aurora se recalcula un frame sí y otro no. Avanza a uTime * 0.055, o
    // sea lentísimo: a 30 actualizaciones por segundo el movimiento es idéntico
    // a simple vista y el shader caro corre la mitad de las veces.
    const tier = TIERS[2 - quality]

    auroraFrame++
    if (auroraFrame % tier.every === 0) {
      renderer.setRenderTarget(auroraRT)
      renderer.clear()
      renderer.render(auroraScene, auroraCam)
      renderer.setRenderTarget(null)
    }

    renderer.clear()
    renderer.render(blitScene, auroraCam)              // fondo (copia del buffer)
    if (tier.knot) renderer.render(knotScene, dustCam) // el objeto
    renderer.render(dustScene, dustCam)                // polvo al frente

    // ── Degradación adaptativa ──────────────────────────────────────────────
    //
    // No hay forma de saber de antemano si la GPU del visitante aguanta: el
    // número de núcleos no dice nada de los gráficos, y una integrada moderna
    // convive con un procesador rápido. Así que se mide el frame real y se
    // baja un escalón si no llega. Nunca se vuelve a subir: oscilar entre dos
    // niveles se ve peor que quedarse en el bajo.
    // Los dos primeros segundos no cuentan: durante el arranque compiten la
    // hidratación, la decodificación de fuentes y el primer layout, y un pico
    // ahí no dice nada sobre la máquina.
    if (clock > 2) {
      frameSamples++
      frameAccum += dt
      if (frameSamples >= 120) {
        // 33 ms ≈ 30 fps sostenidos. Más exigente que eso haría bajar de nivel
        // a equipos que en realidad iban bien.
        if (frameAccum / frameSamples > 0.033 && quality > 0) {
          quality--
          const next = TIERS[2 - quality]
          dust.geometry.setDrawRange(0, Math.floor(COUNT * next.dust))
          resize()   // reajusta el buffer a la resolución del nuevo nivel
        }
        frameSamples = 0
        frameAccum = 0
      }
    }
  }
  raf = requestAnimationFrame(frame)

  const onVisibility = () => { paused = document.hidden }
  document.addEventListener('visibilitychange', onVisibility)

  return {
    setTheme(name) {
      const t = THEMES[name === 'light' ? 'light' : 'dark']
      auroraUniforms.uBg.value.set(t.bg)
      auroraUniforms.uInk.value.set(t.ink)
      auroraUniforms.uGlow.value.set(t.glow)
      auroraUniforms.uIntensity.value = t.intensity
      auroraUniforms.uGrain.value = t.grain
      dustUniforms.uColor.value.set(t.dust)
      dustUniforms.uOpacity.value = t.dustOpacity
      knotUniforms.uBase.value.set(t.knotBase)
      knotUniforms.uRim.value.set(t.knotRim)
      theme = t
    },
    setScroll(v) { scroll = v },
    setPaused(p) { paused = p; if (!p) last = performance.now() },
    destroy() {
      cancelAnimationFrame(raf)
      ro.disconnect()
      window.removeEventListener('pointermove', onPointer)
      document.removeEventListener('visibilitychange', onVisibility)
      auroraMesh.geometry.dispose()
      auroraMesh.material.dispose()
      blitMesh.geometry.dispose()
      blitMesh.material.dispose()
      auroraRT.dispose()
      dustGeo.dispose()
      dust.material.dispose()
      knotGeo.dispose()
      knot.material.dispose()
      renderer.dispose()
    },
  }
}
