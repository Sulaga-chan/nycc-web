import QRCode from 'qrcode'
import sharp from 'sharp'
import fs from 'fs'
import { Jimp } from 'jimp'
import { createRequire } from 'node:module'
const require = createRequire(import.meta.url)
const jsQR = require('jsqr').default || require('jsqr')

const URL = 'https://newyorkchambercollective.org/'
const MARGIN = 4

// 5x5 letters: an odd width puts Y's stem exactly on the centre column, one module
// thick like its arms. At 4 wide the stem had to be two modules, which looked wrong.
const G = {
  N: ['X...X', 'XX..X', 'X.X.X', 'X..XX', 'X...X'],
  Y: ['X...X', '.X.X.', '..X..', '..X..', '..X..'],
  C: ['.XXX.', 'X...X', 'X....', 'X...X', '.XXX.'],
}
const GW = 5, GH = 5, GAP = 1, PAD = 2

async function build(lines, version, name) {
  const qr = QRCode.create(URL, { errorCorrectionLevel: 'H', version })
  const n = qr.modules.size
  const dark = (r, c) => qr.modules.data[r * n + c] === 1

  const cols = Math.max(...lines.map((l) => l.length))
  const blockW = cols * GW + (cols - 1) * GAP + PAD * 2
  const blockH = lines.length * GH + (lines.length - 1) * GAP + PAD * 2
  const bx = Math.round((n - blockW) / 2)
  const by = Math.round((n - blockH) / 2)
  // Row 6 and column 6 carry the timing patterns a decoder uses to locate every
  // module; covering them is far worse than covering data, so the block avoids them.
  if (bx <= 6 || by <= 6) throw new Error(name + ': block would cover a timing pattern')

  const inBlock = (r, c) => r >= by && r < by + blockH && c >= bx && c < bx + blockW
  let out = ''
  for (let r = 0; r < n; r++)
    for (let c = 0; c < n; c++)
      if (dark(r, c) && !inBlock(r, c))
        out += '<rect x="' + (c + MARGIN) + '" y="' + (r + MARGIN) + '" width="1" height="1"/>'

  let letters = ''
  lines.forEach((line, li) => {
    const top = by + PAD + li * (GH + GAP)
    let cx = bx + PAD + Math.round(((cols - line.length) * (GW + GAP)) / 2)
    for (const ch of line) {
      const g = G[ch]
      for (let gy = 0; gy < GH; gy++)
        for (let gx = 0; gx < GW; gx++)
          if (g[gy][gx] === 'X')
            letters += '<rect x="' + (cx + gx + MARGIN) + '" y="' + (top + gy + MARGIN) + '" width="1" height="1"/>'
      cx += GW + GAP
    }
  })

  const S = n + MARGIN * 2
  const svg =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + S + ' ' + S + '" width="' + S * 40 + '" height="' + S * 40 + '" shape-rendering="crispEdges">' +
    '<rect width="100%" height="100%" fill="#ffffff"/>' +
    '<g fill="#111111">' + out + letters + '</g></svg>'

  fs.writeFileSync('qr/' + name + '.svg', svg)
  await sharp(Buffer.from(svg), { density: 300 }).resize(2000, 2000).png().toFile('qr/' + name + '.png')
  await sharp('qr/' + name + '.png').resize(700, 700, { kernel: 'nearest' }).png().toFile('qr/' + name + '-700.png')

  const pct = ((blockW * blockH) / (n * n) * 100).toFixed(1)
  let line = name.padEnd(24) + n + ' modules  block ' + (blockW + 'x' + blockH).padEnd(7) + pct + '%  '
  for (const w of [2000, 700, 300, 220]) {
    const im = await Jimp.read('qr/' + name + '.png')
    if (w !== 2000) im.resize({ w })
    const res = jsQR(new Uint8ClampedArray(im.bitmap.data), im.bitmap.width, im.bitmap.height)
    line += (res ? 'OK' : 'FAIL') + '@' + w + ' '
  }
  console.log(line)
}

await build(['NY', 'CC'], 5, 'nycc-qr-blocks')
await build(['NYCC'], 6, 'nycc-qr-blocks-1line')
