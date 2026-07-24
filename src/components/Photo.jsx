import { useState } from 'react'

// Renders an image, but falls back to a styled placeholder if `src` is missing
// or the file fails to load (e.g. photo not uploaded yet). This lets us wire up
// photo paths before the actual files exist — they appear automatically once added.
export default function Photo({ src, alt, imgClass = '', phClass = 'ph', label = 'Photo coming soon' }) {
  const [ok, setOk] = useState(Boolean(src))
  if (!ok) return <div className={phClass}>{label}</div>
  return <img className={imgClass} src={src} alt={alt} onError={() => setOk(false)} loading="lazy" />
}
