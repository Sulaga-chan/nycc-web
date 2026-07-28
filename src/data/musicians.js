// Musician roster grouped by section. Add real names as the ensemble grows;
// use status: 'Coming soon' for unfilled seats.
export const MUSICIANS = [
  {
    group: 'Strings',
    members: [
      { name: 'Jane Lee', instrument: 'Violin', photo: '/nycc-web/musicians/jane.jpg' },
      { name: 'Emma Northcutt', instrument: 'Violin', photo: '/nycc-web/musicians/emma.jpg' },
      { name: 'Olive Fretts Howard', instrument: 'Viola', photo: '/nycc-web/musicians/olive.jpg' },
    ],
  },
  {
    group: 'Woodwinds',
    members: [
      { name: 'Nicole Martin', instrument: 'Clarinet' },
      { name: 'Kennedy Plains', instrument: 'Bassoon' },
      { name: 'TBD', instrument: 'Flute', status: 'Coming soon' },
    ],
  },
  {
    group: 'Brass',
    members: [
      { name: 'Reese Romero', instrument: 'Horn' },
      { name: 'TBD', instrument: 'Trumpet', status: 'Coming soon' },
      { name: 'TBD', instrument: 'Trombone', status: 'Coming soon' },
    ],
  },
]
