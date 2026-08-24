# Fuentes para las imágenes Open Graph

`inter-bold.ttf` e `inter-regular.ttf` son **Inter**, de Rasmus Andersson,
bajo [SIL Open Font License 1.1](https://openfontlicense.org/) — que permite
usarla, incrustarla y redistribuirla libremente.

Se descargaron de Google Fonts en formato WOFF y se convirtieron a TTF con
`scripts/woff2ttf.mjs`, porque el rasterizador de `scripts/generate-og.mjs`
solo lee sfnt sin comprimir.

Están versionadas a propósito: sin ellas, regenerar las imágenes sociales
dependería de tener red y de que la URL de Google Fonts siguiera igual.

Inter no es la tipografía del sitio (esa es Geist, que se carga por CDN en el
navegador), pero es la sustituta geométrica más cercana con licencia abierta y
un TTF accesible.
