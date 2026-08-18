// Regenerates the favicon set from public/logo/mark.png.
// Run manually after the logo changes:  node scripts/make-favicon.mjs
//
// Design notes:
// - The logo is a thin outline drawing of a violin beside a column of piano keys.
//   At 16px both the keys and the hairline strokes turn to mush, so the favicon
//   uses the violin alone, as a solid silhouette.
// - The violin is very tall and narrow. Rotated 45° it sits on the square's
//   diagonal, which makes it read roughly three times larger than upright.
// - Google Search masks favicons into a circle, so the artwork is a dark tile
//   with a white violin: it survives the mask and stays visible in dark mode,
//   where a black-on-transparent mark would disappear.
import { Jimp } from 'jimp'
import fs from 'node:fs'

const OUT = 'public/logo'
const INK = 0x111111ff // near-black tile, matching the site's dark surfaces

const src = await Jimp.read('public/logo/mark.png')
const inkAt = (img, x, y) => img.bitmap.data[(y * img.bitmap.width + x) * 4 + 3] > 100

// Violin only — the piano-key column starts at x≈460.
const X0 = 290,
  X1 = 456,
  Y0 = 288,
  Y1 = 1240
const w = X1 - X0
const h = Y1 - Y0

// Solid silhouette: fill each row between its outermost ink pixels. Safer than a
// flood fill, which leaks through any gap in the outline.
const silo = new Jimp({ width: w, height: h, color: 0x00000000 })
for (let y = 0; y < h; y++) {
  let left = -1,
    right = -1
  for (let x = 0; x < w; x++) {
    if (inkAt(src, X0 + x, Y0 + y)) {
      if (left < 0) left = x
      right = x
    }
  }
  for (let x = left; x >= 0 && x <= right; x++) {
    const i = (y * w + x) * 4
    silo.bitmap.data[i] = silo.bitmap.data[i + 1] = silo.bitmap.data[i + 2] = 255
    silo.bitmap.data[i + 3] = 255
  }
}

const SIZE = 512
const violin = silo.clone()
violin.resize({ h: Math.round(SIZE * 0.95) })
violin.rotate(-45)
// Close any pinholes the rotation leaves behind, so the shape stays solid.
fillHoles(violin)
// Keep the whole violin inside the circle Google masks to.
const fit = (SIZE * 0.74) / Math.max(violin.bitmap.width, violin.bitmap.height)
violin.resize({
  w: Math.round(violin.bitmap.width * fit),
  h: Math.round(violin.bitmap.height * fit),
})

const tile = new Jimp({ width: SIZE, height: SIZE, color: INK })
tile.composite(
  violin,
  Math.round((SIZE - violin.bitmap.width) / 2),
  Math.round((SIZE - violin.bitmap.height) / 2)
)

// Google asks for a favicon that is a multiple of 48px; ship a range of sizes.
for (const size of [48, 96, 192, 512]) {
  const out = tile.clone()
  out.resize({ w: size, h: size })
  await out.write(`${OUT}/icon-${size}.png`)
}
const apple = tile.clone()
apple.resize({ w: 180, h: 180 })
await apple.write(`${OUT}/apple-touch-icon.png`)

// favicon.ico — a 64px PNG wrapped in an ICO container (supported since Vista).
const icoPng = tile.clone()
icoPng.resize({ w: 64, h: 64 })
const png = await icoPng.getBuffer('image/png')
const header = Buffer.alloc(22)
header.writeUInt16LE(0, 0) // reserved
header.writeUInt16LE(1, 2) // type: icon
header.writeUInt16LE(1, 4) // one image
header.writeUInt8(64, 6) // width
header.writeUInt8(64, 7) // height
header.writeUInt8(0, 8) // palette
header.writeUInt8(0, 9) // reserved
header.writeUInt16LE(1, 10) // colour planes
header.writeUInt16LE(32, 12) // bits per pixel
header.writeUInt32LE(png.length, 14)
header.writeUInt32LE(22, 18) // offset of the image data
fs.writeFileSync('public/favicon.ico', Buffer.concat([header, png]))

console.log('favicon set written (48/96/192/512, apple-touch, favicon.ico)')

function fillHoles(img) {
  const { width, height, data } = img.bitmap
  const opaque = (i) => data[i * 4 + 3] > 40
  const outside = new Uint8Array(width * height)
  const stack = []
  for (let x = 0; x < width; x++) {
    stack.push(x, (height - 1) * width + x)
  }
  for (let y = 0; y < height; y++) {
    stack.push(y * width, y * width + width - 1)
  }
  while (stack.length) {
    const i = stack.pop()
    if (outside[i] || opaque(i)) continue
    outside[i] = 1
    const x = i % width
    const y = (i / width) | 0
    if (x > 0) stack.push(i - 1)
    if (x < width - 1) stack.push(i + 1)
    if (y > 0) stack.push(i - width)
    if (y < height - 1) stack.push(i + width)
  }
  for (let i = 0; i < width * height; i++) {
    if (!outside[i] && !opaque(i)) {
      data[i * 4] = data[i * 4 + 1] = data[i * 4 + 2] = 255
      data[i * 4 + 3] = 255
    }
  }
}
