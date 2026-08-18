const ENSEMBLES = [
  'String Quartet',
  'String Trio',
  'Piano Trio',
  'Violin Solo (Acoustic, or Amplified with backing track)',
  'Piano Solo',
  'Violin & Piano Duo',
  'Mixed Chamber Ensemble',
  'Wind Ensemble',
  'Brass Ensemble',
  'Chamber Orchestra',
]

const STYLES = [
  'Classical',
  'Pop',
  'Contemporary',
  'Jazz',
  'Broadway',
  'Movie soundtracks',
  'Disney',
  'Hymns / Sacred music',
  'Holiday music',
  'Cultural / Traditional music',
  'and more',
]

const EVENTS = [
  'Wedding',
  'Corporate event',
  'Cocktail party',
  'Private party',
  'Birthday celebration',
  'Anniversary',
  'Fundraiser / Gala',
  'Proposal',
  'Holiday event',
  'Church / Religious service',
  'Memorial service',
  'School / Educational event',
]

function Group({ title, items }) {
  return (
    <div className="svc-group">
      <h2>{title}</h2>
      <ul className="svc-list">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  )
}

export default function Services() {
  return (
    <>
      <section className="section">
        <div className="container">
          <p className="eyebrow">Services</p>
          <h1 className="page-title">Live music, tailored to your occasion.</h1>
          <p className="lead" style={{ marginTop: '1.5rem' }}>
            From an intimate violin solo to a full chamber orchestra, we design the
            right sound for your moment — in the style and setting that suits you.
          </p>
        </div>
      </section>

      <section className="section section-soft">
        <div className="container">
          <Group title="Ensembles" items={ENSEMBLES} />
          <Group title="Preferred Music Style" items={STYLES} />
          <Group title="Event Type" items={EVENTS} />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid grid-2">
            <div>
              <p className="eyebrow">Private Lessons</p>
              <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)' }}>
                Study with Jane Lee.
              </h2>
            </div>
            <div>
              <p>
                Private lessons are offered by our founder, Jane Lee, on violin and
                piano, subject to her availability.
              </p>
              <p style={{ marginTop: '1rem' }}>
                For inquiries, please contact{' '}
                <a
                  href="mailto:info@nychambercollective.org"
                  style={{ borderBottom: '1px solid currentColor' }}
                >
                  info@nychambercollective.org
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
