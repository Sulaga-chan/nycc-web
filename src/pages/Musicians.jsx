import { MUSICIANS } from '../data/musicians.js'

export default function Musicians() {
  return (
    <>
      <section className="section section-soft">
        <div className="container">
          <p className="eyebrow">The Ensemble</p>
          <h1 className="page-title">Our Musicians</h1>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {MUSICIANS.map((group) => (
            <div className="mus-group" key={group.group}>
              <h2>{group.group}</h2>
              <div className="mus-grid">
                {group.members.map((m, i) => (
                  <div className="mus-card" key={`${group.group}-${i}`}>
                    <div className="ph ph-wide">Photo coming soon</div>
                    <h4>{m.name}</h4>
                    <p className="role">{m.instrument}</p>
                    {m.status && <p className="status">{m.status}</p>}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
