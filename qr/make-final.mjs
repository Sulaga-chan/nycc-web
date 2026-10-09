import QRCode from 'qrcode'
import sharp from 'sharp'
import fs from 'fs'
import { createRequire } from 'node:module'
const require = createRequire(import.meta.url)
const opentype = require('opentype.js')
const { VIOLIN, BOX } = await import('./violin-shape-lib.mjs')

const URL = 'https://newyorkchambercollective.org/'

// Error correction H leaves 30% of the code recoverable, which is what allows a
// mark over the centre.
const qrSvg = await QRCode.toString(URL, {
  errorCorrectionLevel: 'H', margin: 2, type: 'svg',
  color: { dark: '#111111', light: '#ffffff' },
})

// qrcode emits its paths in MODULE units with its own viewBox, so anything laid on
// top has to be positioned in that same space rather than in output pixels.
const N = Number(qrSvg.match(/viewBox="0 0 (\d+)/)[1])
const inner = qrSvg.replace(/^[\s\S]*?<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '')
const c = N / 2
const R = N * 0.115

const font = opentype.parse(fs.readFileSync('qr/.font/playfair.ttf').buffer)
function wordmark(text, targetW) {
  const b = font.getPath(text, 0, 0, 100).getBoundingBox()
  const scale = (targetW / (b.x2 - b.x1)) * 100
  const bb = font.getPath(text, 0, 0, scale).getBoundingBox()
  return font
    .getPath(text, -bb.x1 - (bb.x2 - bb.x1) / 2, -bb.y1 - (bb.y2 - bb.y1) / 2, scale)
    .toPathData(3)
}

const wrap = (centre) =>
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + N + ' ' + N + '" width="' + N * 40 +
  '" height="' + N * 40 + '" shape-rendering="crispEdges">' + inner +
  '<circle cx="' + c + '" cy="' + c + '" r="' + R + '" fill="#ffffff"/>' +
  '<g shape-rendering="geometricPrecision">' + centre + '</g></svg>'

const svgText = wrap(
  '<g transform="translate(' + c + ' ' + c + ')"><path d="' + wordmark('NYCC', R * 1.45) + '" fill="#111111"/></g>'
)

const s = (R * 1.78) / BOX.h
const svgViolin = wrap(
  '<g transform="translate(' + c + ' ' + c + ') scale(' + s + ') translate(' + (-BOX.w / 2) + ' ' + (-BOX.h / 2) + ')">' +
  VIOLIN('#111111') + '</g>'
)

for (const [name, svg] of [['nycc-qr-nycc', svgText], ['nycc-qr-violin', svgViolin]]) {
  fs.writeFileSync('qr/' + name + '.svg', svg)
  await sharp(Buffer.from(svg), { density: 300 }).resize(2000, 2000).png().toFile('qr/' + name + '.png')
  await sharp('qr/' + name + '.png').resize(600, 600, { kernel: 'nearest' }).png().toFile('qr/' + name + '-600.png')
}
console.log('modules', N, '- built')
