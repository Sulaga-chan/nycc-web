// Instagram reels, embedded straight from the account. The /embed/ URL needs no
// API key or login for a public account — only the shortcode from the reel's URL.
//
// To add one: open the reel on Instagram, copy the code out of
// instagram.com/reel/<CODE>/, and add it below.
const REELS = [
  'Dd2VRPqRccn',
  'Ddh4eZnM0_B',
  'Ddh3nnks662',
  'Dcw1H87RTM5',
  'DcoIgxyx9cq',
  'DcjPug7RwQt',
]

const INSTAGRAM = 'https://www.instagram.com/newyorkchambercollective/'

export default function Video() {
  return (
    <section className="section">
      <div className="container">
        <p className="eyebrow">Video</p>
        <h1 className="page-title">Performance highlights.</h1>
        <p className="lead" style={{ marginTop: '1.5rem', color: 'var(--muted)' }}>
          A selection of recent performances, straight from our Instagram.
        </p>

        <div className="video-grid">
          {REELS.map((code) => (
            <div className="video-embed" key={code}>
              <iframe
                src={`https://www.instagram.com/reel/${code}/embed/`}
                title={`New York Chamber Collective performance reel ${code}`}
                loading="lazy"
                allow="encrypted-media; picture-in-picture; web-share"
                allowFullScreen
                scrolling="no"
              />
            </div>
          ))}
        </div>

        <p className="video-note">
          More on{' '}
          <a href={INSTAGRAM} target="_blank" rel="noreferrer">
            @newyorkchambercollective
          </a>
          .
        </p>
      </div>
    </section>
  )
}
