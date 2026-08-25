// Convierte WOFF (v1) a TTF. Google Fonts entrega WOFF para agentes antiguos y
// el rasterizador de las imágenes OG solo lee sfnt crudo. El formato WOFF es un
// contenedor: cabecera, directorio de tablas y cada tabla comprimida con zlib.
// Reconstruirlo es determinista, así que no vale la pena traer una dependencia.

import { inflateSync } from 'node:zlib'
import { readFileSync, writeFileSync } from 'node:fs'

export function woffToTtf(buf) {
  if (buf.toString('ascii', 0, 4) !== 'wOFF') throw new Error('No es un archivo WOFF')

  const flavor = buf.readUInt32BE(4)
  const numTables = buf.readUInt16BE(12)

  const entries = []
  for (let i = 0; i < numTables; i++) {
    const o = 44 + i * 20
    entries.push({
      tag: buf.toString('ascii', o, o + 4),
      offset: buf.readUInt32BE(o + 4),
      compLength: buf.readUInt32BE(o + 8),
      origLength: buf.readUInt32BE(o + 12),
      checksum: buf.readUInt32BE(o + 16),
    })
  }
  entries.sort((a, b) => (a.tag < b.tag ? -1 : 1))

  // Cabecera sfnt: los tres campos de búsqueda binaria se derivan de numTables.
  const maxPow2 = Math.floor(Math.log2(numTables))
  const searchRange = 2 ** maxPow2 * 16

  const header = Buffer.alloc(12)
  header.writeUInt32BE(flavor, 0)
  header.writeUInt16BE(numTables, 4)
  header.writeUInt16BE(searchRange, 6)
  header.writeUInt16BE(maxPow2, 8)
  header.writeUInt16BE(numTables * 16 - searchRange, 10)

  const dir = Buffer.alloc(numTables * 16)
  const tables = []
  let offset = 12 + numTables * 16

  entries.forEach((e, i) => {
    const raw = buf.subarray(e.offset, e.offset + e.compLength)
    // compLength === origLength significa que la tabla va sin comprimir.
    const data = e.compLength === e.origLength ? raw : inflateSync(raw)

    const d = i * 16
    dir.write(e.tag, d, 4, 'ascii')
    dir.writeUInt32BE(e.checksum, d + 4)
    dir.writeUInt32BE(offset, d + 8)
    dir.writeUInt32BE(e.origLength, d + 12)

    // Cada tabla arranca en múltiplo de 4.
    const padded = Buffer.alloc(Math.ceil(data.length / 4) * 4)
    data.copy(padded)
    tables.push(padded)
    offset += padded.length
  })

  return Buffer.concat([header, dir, ...tables])
}

if (process.argv[2]) {
  const [, , input, output] = process.argv
  writeFileSync(output, woffToTtf(readFileSync(input)))
  console.log(`  ${input} → ${output}`)
}
