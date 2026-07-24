import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="container">
          <h1>Timeless music, unforgettable moments.</h1>
          <div className="hero-bottom">
            <p>
              Elegant live music for weddings, galas, and private events across
              New York City.
            </p>
            <Link to="/contact" className="btn btn-light">
              Get in Touch
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container offer">
          <p className="eyebrow">What We Offer</p>
          <p className="lead">
            From romantic string quartets for weddings to sophisticated ensembles
            for corporate galas and intimate private events, every performance is
            tailored to your occasion.
          </p>
        </div>
      </section>

      <section className="section section-soft">
        <div className="container">
          <div className="grid grid-2">
            <div>
              <p className="eyebrow">The Collective</p>
              <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)' }}>
                A premier ensemble of professional musicians.
              </h2>
            </div>
            <div>
              <p>
                Based in New York City, New York Chamber Collective brings
                exceptional live music to life's most memorable moments — weddings,
                corporate events, private parties, galas, and proposals throughout
                the metropolitan area.
              </p>
              <p style={{ marginTop: '1.5rem' }}>
                <Link to="/about" className="btn">
                  About Us
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
