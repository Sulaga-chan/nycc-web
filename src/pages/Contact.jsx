import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

// GitHub Pages has no backend, so the form posts to FormSubmit, which forwards
// each submission straight to the inbox below. FormSubmit sends a one-time
// confirmation email to that address the first time a form posts to it; until
// someone clicks the link in it, submissions are held rather than delivered.
//
// After submitting, FormSubmit redirects back to /contact?sent=1 so the visitor
// lands on the site rather than on a FormSubmit page.
const CONTACT_EMAIL = 'info@nychambercollective.org'
const ENDPOINT = `https://formsubmit.co/${CONTACT_EMAIL}`
const THANK_YOU = 'https://newyorkchambercollective.org/contact?sent=1'

export default function Contact() {
  const { search } = useLocation()
  const [sent, setSent] = useState(false)

  useEffect(() => {
    if (new URLSearchParams(search).get('sent') === '1') {
      setSent(true)
      // Drop the flag so a refresh does not keep showing the confirmation.
      window.history.replaceState(null, '', '/contact')
    }
  }, [search])

  return (
    <section className="section">
      <div className="container">
        <p className="eyebrow">Get in Touch</p>
        <h1 className="page-title">Let's create something unforgettable.</h1>

        {sent && (
          <p className="form-sent" role="status">
            Thank you — your message is on its way. We'll be in touch shortly.
          </p>
        )}

        <div className="contact-grid" style={{ marginTop: '2.5rem' }}>
          <form action={ENDPOINT} method="POST">
            <input type="hidden" name="_subject" value="New inquiry — NYCC website" />
            <input type="hidden" name="_template" value="table" />
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_next" value={THANK_YOU} />
            {/* Bots fill hidden fields in; real visitors never see this one. */}
            <input type="text" name="_honey" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

            <div className="field">
              <label htmlFor="name">Name</label>
              <input id="name" name="name" required />
            </div>
            <div className="field">
              <label htmlFor="email">Email</label>
              <input id="email" name="email" type="email" required />
            </div>
            <div className="field">
              <label htmlFor="event">Event date &amp; type</label>
              <input id="event" name="event" placeholder="e.g. June 14, 2027 — wedding ceremony" />
            </div>
            <div className="field">
              <label htmlFor="message">Tell us about your event</label>
              <textarea id="message" name="message" required />
            </div>
            <button type="submit" className="btn">
              Send Message
            </button>
          </form>

          <div className="contact-info">
            <h3 style={{ fontSize: '1.4rem' }}>Booking &amp; Inquiries</h3>
            <p>
              Email: <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
            </p>
            <p>Based in New York City · Serving the NY metropolitan area</p>
            <p style={{ marginTop: '1.5rem' }}>
              Follow along on{' '}
              <a
                href="https://www.instagram.com/newyorkchambercollective/"
                target="_blank"
                rel="noreferrer"
              >
                Instagram
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
