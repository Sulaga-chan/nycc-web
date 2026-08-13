// Musician roster grouped by section. Add real names as the ensemble grows;
// use status: 'Coming soon' for unfilled seats.
export const MUSICIANS = [
  {
    group: 'Strings',
    members: [
      { name: 'Jane Lee', instrument: 'Violin', photo: '/musicians/jane.jpg' },
      { name: 'Emma Northcutt', instrument: 'Violin', photo: '/musicians/emma.jpg' },
      { name: 'Olive Fretts Howard', instrument: 'Viola', photo: '/musicians/olive.jpg' },
      { name: 'TBD', instrument: 'Cello', status: 'Coming soon' },
    ],
  },
  {
    group: 'Keyboard',
    members: [
      { name: 'Kimia Rafieian', instrument: 'Piano' },
    ],
  },
  {
    group: 'Woodwinds',
    members: [
      { name: 'Nicole Martin', instrument: 'Clarinet' },
      { name: 'Kennedy Plains', instrument: 'Bassoon', photo: '/musicians/kennedy.jpg' },
      { name: 'TBD', instrument: 'Flute', status: 'Coming soon' },
    ],
  },
  {
    group: 'Brass',
    members: [
      { name: 'Reese Romero', instrument: 'Horn', photo: '/musicians/reese.jpg' },
      { name: 'TBD', instrument: 'Trumpet', status: 'Coming soon' },
      { name: 'TBD', instrument: 'Trombone', status: 'Coming soon' },
    ],
  },
]
