import { NavLink, Link, Outlet } from 'react-router-dom'
import { useState } from 'react'

const NAV = [
  { to: '/', label: 'Home', end: true },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
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
        <svg
          width="19"
          height="19"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
      </a>
      <a href={FACEBOOK} target="_blank" rel="noreferrer" aria-label="Facebook">
        <svg
          width="19"
          height="19"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
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
            <img className="brand-mark" src="/logo/mark.png" alt="" aria-hidden="true" />
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
          <div>
            <Socials />
            <p className="footer-note">Sign up to receive news and updates.</p>
            {/* Connected via FormSubmit (no account needed). Signups are emailed to
                the address below. IMPORTANT: FormSubmit requires a one-time activation —
                the first submission sends a confirmation link to that inbox that must be
                clicked before delivery starts. Change the email in the action to reroute. */}
            <form
              className="newsletter"
              action="https://formsubmit.co/info@nychambercollective.org"
              method="POST"
            >
              <input type="hidden" name="_subject" value="New newsletter signup — NYCC" />
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_template" value="table" />
              <input
                type="hidden"
                name="_next"
                value="https://newyorkchambercollective.org/"
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                aria-label="Email Address"
                required
              />
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
