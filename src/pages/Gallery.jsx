import { useEffect, useState } from 'react'

// To add images, drop files in /public/img/gallery and list them here. Videos can
// use an <iframe> (YouTube/Vimeo) or a <video> tag.
const PHOTOS = [
  {
    src: '/img/gallery/gala.jpg',
    alt: 'Live performance at the Metropolitan Club, New York',
    caption: 'Metropolitan Club, New York',
  },
  {
    src: '/img/gallery/central-park.jpg',
    alt: 'String quartet performing at a pavilion in Central Park, New York',
    caption: 'Central Park, New York',
  },
]
const VIDEOS = []

export default function Gallery() {
  const [open, setOpen] = useState(null)

  // Close on Escape, and stop the page behind the overlay from scrolling.
  useEffect(() => {
    if (open === null) return
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(null)
    }
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previous
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  const photo = open === null ? null : PHOTOS[open]

  return (
    <section className="section">
      <div className="container">
        <h1 className="lead" style={{ maxWidth: '20ch' }}>
          Take a look at a selection of our recent performances.
        </h1>

        {PHOTOS.length > 0 ? (
          <div className="gallery-grid" style={{ marginTop: '3rem' }}>
            {PHOTOS.map((p, i) => (
              <figure key={i}>
                <button
                  type="button"
                  className="gallery-item"
                  onClick={() => setOpen(i)}
                  aria-label={`Enlarge photo: ${p.caption || p.alt}`}
                >
                  <img src={p.src} alt={p.alt} loading="lazy" />
                </button>
                {p.caption && <figcaption>{p.caption}</figcaption>}
              </figure>
            ))}
          </div>
        ) : (
          <p className="gallery-note">Photos coming soon.</p>
        )}

        {VIDEOS.length > 0 && (
          <div className="grid grid-2" style={{ marginTop: '3rem' }}>
            {VIDEOS.map((v, i) => (
              <div key={i} style={{ aspectRatio: '16 / 9' }}>
                <iframe
                  src={v}
                  title={`Video ${i + 1}`}
                  style={{ width: '100%', height: '100%', border: 0 }}
                  allowFullScreen
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {photo && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={photo.caption || photo.alt}
          onClick={() => setOpen(null)}
        >
          <button type="button" className="lightbox-close" aria-label="Close">
            &times;
          </button>
          <figure>
            <img src={photo.src} alt={photo.alt} />
            {photo.caption && <figcaption>{photo.caption}</figcaption>}
          </figure>
        </div>
      )}
    </section>
  )
}
