import { useEffect, useState } from 'react'
import { BEHOLD_FEED_ID, feedUrl } from '../data/instagram.js'

// Fetches the account's recent posts as JSON. Returns `null` posts when no feed
// is configured or the request fails, so callers can fall back to their own list
// rather than render an empty page.
export default function useInstagramFeed({ type } = {}) {
  const [posts, setPosts] = useState(null)

  useEffect(() => {
    if (!BEHOLD_FEED_ID) return
    let cancelled = false

    fetch(feedUrl(BEHOLD_FEED_ID))
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(r.status))))
      .then((data) => {
        if (cancelled) return
        // Behold returns either an array or { posts: [...] } depending on plan.
        const all = Array.isArray(data) ? data : data.posts || []
        const filtered = type ? all.filter((p) => p.mediaType === type) : all
        setPosts(filtered)
      })
      .catch(() => {
        // Leave posts as null; the page falls back to its built-in list.
      })

    return () => {
      cancelled = true
    }
  }, [type])

  return posts
}
