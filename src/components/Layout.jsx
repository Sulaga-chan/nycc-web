import { NavLink, Link, Outlet } from 'react-router-dom'
import { useState } from 'react'

const NAV = [
  { to: '/', label: 'Home', end: true },
  { to: '/about', label: 'About' },
  { to: '/team', label: 'Team' },
  { to: '/musicians', label: 'Musicians' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/video', label: 'Video' },
  { to: '/contact', label: 'Contact' },
]

const INSTAGRAM = 'https://www.instagram.com/newyorkchambercollective/'
const FACEBOOK = 'https://www.facebook.com'

function Socials({ className = '' }) {
  return (
    <div className={`socials ${className}`}>
      <a href={INSTAGRAM} target="_blank" rel="noreferrer" aria-label="Instagram">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
        </svg>
      </a>
      <a href={FACEBOOK} target="_blank" rel="noreferrer" aria-label="Facebook">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M14 9h3l.5-3H14V4.5c0-.8.3-1.5 1.5-1.5H17V.2C16.7.1 15.6 0 14.4 0 11.9 0 10.3 1.5 10.3 4.2V6H7.5v3h2.8v9H14V9z" />
        </svg>
      </a>
    </div>
  )
}

export default function Layout() {
  const [open, setOpen] = useState(false)

  return (
    <div className="site">
      <header className="header">
        <div className="container header-inner">
          <Link to="/" className="brand" onClick={() => setOpen(false)}>
            <img className="brand-mark" src="/nycc-web/logo/symbol.png" alt="" aria-hidden="true" />
            <span>New York Chamber Collective</span>
          </Link>

          <button
            className="nav-toggle"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>

          <nav className={`nav ${open ? 'nav-open' : ''}`}>
            {NAV.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) => (isActive ? 'active' : '')}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </NavLink>
            ))}
            <Socials className="nav-socials" />
          </nav>
        </div>
      </header>

      <main>
        <Outlet />
      </main>

      <footer className="footer">
        <div className="container footer-inner">
          <img
            className="footer-logo"
            src="/nycc-web/logo/full.png"
            alt="New York Chamber Collective"
          />
          <div>
            <Socials />
            <p className="footer-note">Sign up to receive news and updates.</p>
            {/* Static site: wire this form to a service (Formspree, Buttondown, etc.) or replace with a mailto link. */}
            <form
              className="newsletter"
              onSubmit={(e) => {
                e.preventDefault()
                alert('Newsletter signup is a placeholder — connect a form service to enable it.')
              }}
            >
              <input type="email" placeholder="Email Address" aria-label="Email Address" required />
              <button type="submit">Sign Up</button>
            </form>
          </div>
          <p className="copyright">
            © {new Date().getFullYear()} New York Chamber Collective
          </p>
        </div>
      </footer>
    </div>
  )
}
