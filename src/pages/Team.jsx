// Team members. Add a real photo later by dropping a file in /public
// and setting `photo: '/img/team/jane.jpg'` (path must include the base).
import Photo from '../components/Photo.jsx'

const TEAM = [
  {
    name: 'Jane Lee',
    role: 'Founder · CEO',
    photo: '/img/team/jane.jpg',
    bio: [
      'Jane is an active performer, educator, and administrator in New York City. She is a graduate from the University of Michigan where she earned her Master of Music degree in Violin Performance and studied with Professor David Halen, a concertmaster of the St. Louis Symphony Orchestra.',
      'As a professional violinist, Jane performs with professional orchestras across the country and in small ensembles for weddings and private events across New York, New Jersey, and Connecticut. She performed in numerous worldwide venues including Carnegie Hall, Madison Square Garden, Lincoln Center, Metropolitan Club, The Lotos Club, and The Plaza Hotel in New York City.',
    ],
    website: 'https://www.janeleeviolin.com',
  },
  {
    name: 'Jaehun Lee',
    role: 'Engineer · Web Designer',
    photo: '/img/team/jaehun.png',
    cutout: true,
    bio: [
      "Jaehun is the engineer and web designer behind New York Chamber Collective's online presence, building and maintaining the ensemble's website. A computer science student who has interned at Seoul National University, he pairs a developer's discipline with a genuine musician's ear — he began on piano and went on to play six instruments, from violin and electric guitar to the harp, and once earned an award performing with his band, Bohemian.",
      "That rare mix of technical skill and musical sensibility shapes how the Collective looks and feels online — considered, elegant, and true to the music. He looks after the ensemble's website and digital presence so its musicians can focus on the stage.",
    ],
  },
  {
    name: 'Hunter Young',
    role: 'COO · General Manager',
    photo: null,
    bio: [
      'Hunter oversees the day-to-day operations of New York Chamber Collective — from client bookings and scheduling to coordinating the right musicians for every event. With an eye for detail and a focus on clear communication, he makes sure each performance runs seamlessly from the first inquiry to the final encore.',
    ],
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
              <div className={`person-media${m.cutout ? ' is-cutout' : ''}`}>
                <Photo src={m.photo} alt={m.name} />
              </div>
              <div>
                <h3>{m.name}</h3>
                <p className="role">{m.role}</p>
                {m.bio.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
                {m.website && (
                  <p>
                    Her full bio can be found on:{' '}
                    <a
                      href={m.website}
                      target="_blank"
                      rel="noreferrer"
                      style={{ borderBottom: '1px solid currentColor' }}
                    >
                      {m.website.replace(/^https?:\/\//, '')}
                    </a>
                  </p>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}
