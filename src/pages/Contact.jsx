import { useState } from 'react'

// No backend on GitHub Pages, so the form composes an email via the visitor's
// mail client. To collect submissions server-side instead, swap this for a
// Formspree/Getform endpoint (set method="post" action="https://formspree.io/f/xxxx").
const CONTACT_EMAIL = 'hello@newyorkchambercollective.com'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const onSubmit = (e) => {
    e.preventDefault()
    const subject = encodeURIComponent(`Inquiry from ${form.name || 'website'}`)
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`
    )
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`
  }

  return (
    <section className="section">
      <div className="container">
        <p className="eyebrow">Get in Touch</p>
        <h1 className="page-title">Let's create something unforgettable.</h1>

        <div className="contact-grid" style={{ marginTop: '2.5rem' }}>
          <form onSubmit={onSubmit}>
            <div className="field">
              <label htmlFor="name">Name</label>
              <input id="name" name="name" value={form.name} onChange={update} required />
            </div>
            <div className="field">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={update}
                required
              />
            </div>
            <div className="field">
              <label htmlFor="message">Tell us about your event</label>
              <textarea
                id="message"
                name="message"
                value={form.message}
                onChange={update}
                required
              />
            </div>
            <button type="submit" className="btn">
              Send Message
            </button>
          </form>

          <div className="contact-info">
            <h3 style={{ fontSize: '1.4rem' }}>Booking &amp; Inquiries</h3>
            <p>
              Email:{' '}
              <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
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
