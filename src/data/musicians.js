// Musician roster grouped by section. Add real names as the ensemble grows;
// use status: 'Coming soon' for unfilled seats.
export const MUSICIANS = [
  {
    group: 'Strings',
    members: [
      { name: 'Jane Lee', instrument: 'Violin', photo: '/img/musicians/jane.jpg' },
      { name: 'Emma Northcutt', instrument: 'Violin', photo: '/img/musicians/emma.jpg' },
      { name: 'Eugenia Cho', instrument: 'Violin', photo: '/img/musicians/eugenia.jpg' },
      { name: 'Olive Fretts Howard', instrument: 'Viola', photo: '/img/musicians/olive.jpg' },
      { name: 'Juewen Zhang', instrument: 'Cello', photo: '/img/musicians/juewen.jpg' },
    ],
  },
  {
    group: 'Keyboard',
    members: [
      { name: 'Jane Lee', instrument: 'Piano', photo: '/img/musicians/jane-piano.jpg' },
      { name: 'Kimia Rafieian', instrument: 'Piano' },
    ],
  },
  {
    group: 'Woodwinds',
    members: [
      { name: 'Nicole Martin', instrument: 'Clarinet' },
      { name: 'Kennedy Plains', instrument: 'Bassoon', photo: '/img/musicians/kennedy.jpg' },
      { name: 'TBD', instrument: 'Flute', status: 'Coming soon' },
    ],
  },
  {
    group: 'Brass',
    members: [
      { name: 'Reese Romero', instrument: 'Horn', photo: '/img/musicians/reese.jpg' },
      { name: 'TBD', instrument: 'Trumpet', status: 'Coming soon' },
      { name: 'TBD', instrument: 'Trombone', status: 'Coming soon' },
    ],
  },
]
