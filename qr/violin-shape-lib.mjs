
// A violin drawn as bezier curves, not traced from an image, so it stays crisp at
// any size. Only the right half is described; the left is that path mirrored about
// the centre line, which guarantees symmetry.
//
// What makes the silhouette read as a violin rather than a guitar: a deep waist,
// the pointed corners where the C-bout meets each bout, and the pegs on the scroll.
// Box is 100 wide x 300 tall, centre line at x = 50.
export const BOX = { w: 100, h: 300 }

const BODY = [
  'M 50 8',
  'C 58 8, 62 13, 61 20',            // scroll head
  'C 60 26, 56.5 28, 56 32',         // into the pegbox
  'L 56 44',                          // pegbox
  'C 55.8 64, 55.5 88, 55 112',      // neck, tapering slightly
  'C 65 114, 76 121, 81 134',        // shoulder into the upper bout
  'C 85 144, 85 152, 83 159',        // upper bout, outer edge
  'L 88 165',                         // upper corner, pointed
  'L 79 169',
  'C 73 176, 71 182, 71 189',        // C-bout in to the waist
  'C 71 196, 73 202, 79 209',        // C-bout back out
  'L 88 213',                         // lower corner, pointed
  'L 83 219',
  'C 89 229, 95 240, 96 254',        // lower bout, outer edge
  'C 97 270, 88 284, 71 290',
  'C 64 292, 56 293, 50 293',        // round into the bottom centre
  'L 50 8 Z',
].join(' ')

// Two pegs on each side of the pegbox — small, but they are what sells the scroll.
const PEGS = [
  'M 56 20 L 68 17 L 69 21 L 56 24 Z',
  'M 56 29 L 68 26 L 69 30 L 56 33 Z',
].join(' ')

export const VIOLIN = (fill) => {
  const f = fill || '#111111'
  const half = '<path d="' + BODY + '"/><path d="' + PEGS + '"/>'
  return (
    '<g fill="' + f + '">' +
    half +
    '<g transform="translate(100 0) scale(-1 1)">' + half + '</g>' +
    '</g>'
  )
}

