import { useCallback, useEffect, useRef, useState } from 'react'

// To add images, drop files in /public/img/gallery and list them here. Videos can
// use an <iframe> (YouTube/Vimeo) or a <video> tag.
const PHOTOS = [
  {
    src: '/img/gallery/gala.jpg',
    alt: 'Live performance at the Metropolitan Club, New York',
    caption: 'Metropolitan Club, New York',
  },
  {
    src: '/img/gallery/central-park-02.jpg',
    alt: 'The quartet with the Manhattan skyline behind them in Central Park',
    caption: 'Central Park, New York',
  },
  {
    src: '/img/gallery/central-park-01.jpg',
    alt: 'String quartet performing at a pavilion in Central Park',
    caption: 'Central Park, New York',
  },
  {
    src: '/img/gallery/central-park-03.jpg',
    alt: 'The quartet between pieces at a Central Park pavilion',
    caption: 'Central Park, New York',
  },
  {
    src: '/img/gallery/central-park-04.jpg',
    alt: 'Cellist playing beside the lake in Central Park',
    caption: 'Central Park, New York',
  },
  {
    src: '/img/gallery/central-park-05.jpg',
    alt: 'Violinist performing beside the lake in Central Park',
    caption: 'Central Park, New York',
  },
  {
    src: '/img/gallery/central-park-06.jpg',
    alt: 'Two violinists mid-performance in Central Park',
    caption: 'Central Park, New York',
  },
  {
    src: '/img/gallery/central-park-07.jpg',
    alt: 'Violist with her instrument in Central Park',
    caption: 'Central Park, New York',
  },
  {
    src: '/img/gallery/central-park-08.jpg',
    alt: 'Violinist with her instrument in Central Park',
    caption: 'Central Park, New York',
  },
  {
    src: '/img/gallery/hempstead-house-01.jpg',
    alt: 'Violinist on the lawn in front of Hempstead House',
    caption: 'Hempstead House, New York',
  },
  {
    src: '/img/gallery/hempstead-house-02.jpg',
    alt: 'Violinist before a performance at Hempstead House',
    caption: 'Hempstead House, New York',
  },
]
const VIDEOS = []

export default function Gallery() {
  const [open, setOpen] = useState(null)
  const touchStartX = useRef(null)

  const close = useCallback(() => setOpen(null), [])
  const step = useCallback((delta) => {
    setOpen((i) => (i === null ? i : (i + delta + PHOTOS.length) % PHOTOS.length))
  }, [])

  // Escape closes, arrow keys page through, and the page behind stays put.
  useEffect(() => {
    if (open === null) return
    const onKey = (e) => {
      if (e.key === 'Escape') close()
      else if (e.key === 'ArrowRight') step(1)
      else if (e.key === 'ArrowLeft') step(-1)
    }
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previous
      window.removeEventListener('keydown', onKey)
    }
  }, [open, close, step])

  const photo = open === null ? null : PHOTOS[open]

  // Swipe left/right on touch devices, where the arrows are easy to miss.
  const onTouchStart = (e) => {
    touchStartX.current = e.changedTouches[0].clientX
  }
  const onTouchEnd = (e) => {
    if (touchStartX.current === null) return
    const dx = e.changedTouches[0].clientX - touchStartX.current
    touchStartX.current = null
    if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1)
  }

  return (
    <section className="section">
      <div className="container">
        <h1 className="lead" style={{ maxWidth: '20ch' }}>
          Take a look at a selection of our recent performances.
        </h1>

        {PHOTOS.length > 0 ? (
          <div className="gallery-grid" style={{ marginTop: '3rem' }}>
            {PHOTOS.map((p, i) => (
              <figure key={p.src}>
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
          onClick={close}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <button type="button" className="lightbox-close" aria-label="Close">
            &times;
          </button>

          {PHOTOS.length > 1 && (
            <>
              <button
                type="button"
                className="lightbox-nav lightbox-prev"
                aria-label="Previous photo"
                onClick={(e) => {
                  e.stopPropagation()
                  step(-1)
                }}
              >
                &#8249;
              </button>
              <button
                type="button"
                className="lightbox-nav lightbox-next"
                aria-label="Next photo"
                onClick={(e) => {
                  e.stopPropagation()
                  step(1)
                }}
              >
                &#8250;
              </button>
            </>
          )}

          <figure>
            <img src={photo.src} alt={photo.alt} />
            {photo.caption && (
              <figcaption>
                {photo.caption}
                <span className="lightbox-count">
                  {open + 1} / {PHOTOS.length}
                </span>
              </figcaption>
            )}
          </figure>
        </div>
      )}
    </section>
  )
}
