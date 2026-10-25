import { useCallback, useEffect, useState } from 'react'
import useInstagramFeed from '../lib/useInstagramFeed.js'
import { BEHOLD_FEED_ID } from '../data/instagram.js'

// Fallback list, used until a Behold feed id is set in src/data/instagram.js —
// and whenever that request fails, so the page never renders empty.
//
// To add one by hand: open the reel on Instagram, copy the code out of
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

const INSTAGRAM = 'https://www.instagram.com/newyorkchambercollective/'

// The piece performed is the line of the caption that names it; Instagram
// captions here open with a sentence, then the title, then credits and tags.
function titleFromCaption(caption = '') {
  const line = caption
    .split('\n')
    .map((l) => l.trim())
    .find((l) => l && !l.startsWith('#') && !/^(violin|viola|cello|piano)/i.test(l) && l.length < 70)
  return line || ''
}

export default function Video() {
  const feed = useInstagramFeed({ type: 'VIDEO' })
  const [open, setOpen] = useState(null)

  const close = useCallback(() => setOpen(null), [])
  useEffect(() => {
    if (open === null) return
    const onKey = (e) => e.key === 'Escape' && close()
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previous
      window.removeEventListener('keydown', onKey)
    }
  }, [open, close])

  const live = feed && feed.length > 0
  const playing = open === null || !live ? null : feed[open]

  return (
    <section className="section">
      <div className="container">
        <p className="eyebrow">Video</p>
        <h1 className="lead" style={{ maxWidth: '22ch' }}>
          Hear us play, from the ceremony to the last encore.
        </h1>

        {live ? (
          <div className="video-grid">
            {feed.map((post, i) => (
              <figure className="video-figure" key={post.id || post.permalink}>
                <button
                  type="button"
                  className="video-card"
                  onClick={() => setOpen(i)}
                  aria-label={`Play ${titleFromCaption(post.caption) || 'performance clip'}`}
                >
                  <img
                    src={post.thumbnailUrl || post.mediaUrl}
                    alt={titleFromCaption(post.caption) || 'Performance clip'}
                    loading="lazy"
                  />
                  <span className="video-play" aria-hidden="true" />
                </button>
                <figcaption>{titleFromCaption(post.caption)}</figcaption>
              </figure>
            ))}
          </div>
        ) : (
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
        )}

        <p className="video-note">
          More performances on{' '}
          <a href={INSTAGRAM} target="_blank" rel="noreferrer">
            @newyorkchambercollective
          </a>
          {BEHOLD_FEED_ID ? '. This page updates automatically.' : '.'}
        </p>
      </div>

      {playing && (
        <div className="lightbox" role="dialog" aria-modal="true" onClick={close}>
          <button type="button" className="lightbox-close" aria-label="Close">
            &times;
          </button>
          <figure onClick={(e) => e.stopPropagation()}>
            <video
              src={playing.mediaUrl}
              poster={playing.thumbnailUrl}
              controls
              autoPlay
              playsInline
            />
            {titleFromCaption(playing.caption) && (
              <figcaption>{titleFromCaption(playing.caption)}</figcaption>
            )}
          </figure>
        </div>
      )}
    </section>
  )
}
