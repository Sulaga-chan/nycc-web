// Instagram reels, embedded straight from the account. The /embed/ URL needs no
// API key or login for a public account — only the shortcode from the reel's URL.
//
// To add one: open the reel on Instagram, copy the code out of
// instagram.com/reel/<CODE>/, and add it below with the piece performed.
const REELS = [
  { code: 'DefukekM_Po', title: 'Best Part' },
  { code: 'Deft2ijMsVJ', title: 'Thinking Out Loud' },
  { code: 'DeM92oFJ3PB', title: 'Can You Feel The Love Tonight' },
  { code: 'DeF7AqqM58e', title: 'Super Mario Theme' },
  { code: 'DeF5SKhMgAQ', title: 'Twinkle Twinkle Little Star' },
  { code: 'Dd2VRPqRccn', title: 'So Easy (To Fall In Love)' },
  { code: 'Ddh4eZnM0_B', title: "Can't Help Falling In Love" },
  { code: 'Ddh3nnks662', title: 'Until I Find You' },
  { code: 'Dcw1H87RTM5', title: 'What A Wonderful World' },
  { code: 'DcoIgxyx9cq', title: "Can't Take My Eyes Off You" },
  { code: 'DcjPug7RwQt', title: 'Stand By Me' },
]

// Clips hosted on the site itself — landscape footage, so they get their own
// 16:9 section rather than sharing the reels' 4:5 grid.
const CLIPS = [
  { src: '/video/clip-01.mp4' },
  { src: '/video/clip-02.mp4' },
]

const INSTAGRAM = 'https://www.instagram.com/newyorkchambercollective/'

export default function Video() {
  return (
    <section className="section">
      <div className="container">
        <p className="eyebrow">Video</p>
        <h1 className="lead" style={{ maxWidth: '22ch' }}>
          Hear us play, from the ceremony to the last encore.
        </h1>

        {CLIPS.length > 0 && (
          <div className="clip-grid">
            {CLIPS.map((c) => (
              <video
                key={c.src}
                className="clip"
                src={c.src}
                controls
                preload="metadata"
                playsInline
              />
            ))}
          </div>
        )}

        <p className="eyebrow video-subhead">From Instagram</p>

        <div className="video-grid">
          {REELS.map(({ code, title }) => (
            <figure className="video-figure" key={code}>
              <div className="video-embed">
                <iframe
                  src={`https://www.instagram.com/reel/${code}/embed/`}
                  title={`New York Chamber Collective performing ${title}`}
                  loading="lazy"
                  allow="encrypted-media; picture-in-picture; web-share"
                  allowFullScreen
                  scrolling="no"
                />
              </div>
              <figcaption>{title}</figcaption>
            </figure>
          ))}
        </div>

        <p className="video-note">
          More performances on{' '}
          <a href={INSTAGRAM} target="_blank" rel="noreferrer">
            @newyorkchambercollective
          </a>
          .
        </p>
      </div>
    </section>
  )
}
