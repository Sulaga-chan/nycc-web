// Behold (behold.so) mirrors the Instagram account through Instagram's official
// API and exposes it as plain JSON. Paste the feed id from the Behold dashboard
// here and the Video page switches from the hand-maintained list below to the
// live feed; leave it empty and the manual list keeps working.
//
// Only the id goes here — it is a public, read-only endpoint, not a secret.
export const BEHOLD_FEED_ID = ''

export const feedUrl = (id) => `https://feeds.behold.so/${id}`
