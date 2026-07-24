// Team members. Add a real photo later by dropping a file in /public
// and setting `photo: '/nycc-web/team/jane.jpg'` (path must include the base).
import Photo from '../components/Photo.jsx'

const TEAM = [
  {
    name: 'Jane Lee',
    role: 'Founder · CEO',
    photo: '/nycc-web/team/jane.jpg',
    bio: [
      'Jane is a graduate of the University of Michigan, where she earned her Master of Music degree in Violin Performance and studied with Professor David Halen, concertmaster of the St. Louis Symphony Orchestra.',
      'As a professional violinist, Jane performs in small ensembles for weddings and private events across New York, New Jersey, and Connecticut. Her performances have appeared in venues including Carnegie Hall, Lincoln Center, and The Plaza Hotel in New York City.',
    ],
  },
  {
    name: 'Jaehun Lee',
    role: 'Engineer · Web Designer',
    photo: '/nycc-web/team/jaehun.png',
    bio: [
      "Jaehun is the engineer and web designer behind New York Chamber Collective's online presence, building and maintaining the ensemble's website. A computer science student who describes himself as an explorer and connector, he pairs a developer's discipline with a genuine musician's ear — he began on piano and plays six instruments, including violin and electric guitar, and once earned an award performing with his band, Bohemian.",
      "Fluent in Korean, English, and Japanese (JLPT N2), he has interpreted at international events and volunteered on projects from Cambodia to coding education. Having learned across seven countries, he brings that same curiosity and care for people to every detail of the Collective's design.",
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
              <div className="person-media">
                <Photo src={m.photo} alt={m.name} />
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
