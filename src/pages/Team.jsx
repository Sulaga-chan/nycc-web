// Team members. Add a real photo later by dropping a file in /public
// and setting `photo: '/nycc-web/team/jane.jpg'` (path must include the base).
const TEAM = [
  {
    name: 'Jane Lee',
    role: 'Founder / CEO',
    photo: null,
    bio: [
      'Jane is a graduate of the University of Michigan, where she earned her Master of Music degree in Violin Performance and studied with Professor David Halen, concertmaster of the St. Louis Symphony Orchestra.',
      'As a professional violinist, Jane performs in small ensembles for weddings and private events across New York, New Jersey, and Connecticut. Her performances have appeared in venues including Carnegie Hall, Lincoln Center, and The Plaza Hotel in New York City.',
    ],
  },
  {
    name: 'Jaehun Lee',
    role: 'Engineer',
    photo: null,
    bio: ['Bio coming soon.'],
  },
]

export default function Team() {
  return (
    <>
      <section className="section section-soft">
        <div className="container">
          <p className="eyebrow">Our Team</p>
          <h1 className="lead">
            We believe live music transforms meaningful moments into lasting
            memories.
          </h1>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {TEAM.map((m) => (
            <article className="person" key={m.name}>
              <div className="person-media">
                {m.photo ? (
                  <img src={m.photo} alt={m.name} />
                ) : (
                  <div className="ph">Photo coming soon</div>
                )}
              </div>
              <div>
                <h3>{m.name}</h3>
                <p className="role">{m.role}</p>
                {m.bio.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}
