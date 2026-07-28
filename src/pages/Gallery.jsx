// Gallery is intentionally empty for now — real photos and videos will be
// added later. To add images, drop files in /public/gallery and map them here:
//
//   const PHOTOS = [
//     { src: '/nycc-web/gallery/01.jpg', alt: 'Wedding ceremony quartet' },
//   ]
//
// and render them inside .gallery-grid. Videos can use an <iframe> (YouTube/Vimeo)
// or a <video> tag.
const PHOTOS = [
  {
    src: '/nycc-web/gallery/gala.jpg',
    alt: 'Live performance at the Metropolitan Club, New York',
    caption: 'Metropolitan Club, New York',
  },
]
const VIDEOS = []

export default function Gallery() {
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
                <img src={p.src} alt={p.alt} loading="lazy" />
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
    </section>
  )
}
