function fetchData (url) {
  const data = fetch(url).then(response => {
    if (response.ok) {
      return response.json()
    }
  })
}

// const datasource = fetchData('http://localhost:80/server.php')
// console.log('success')
// console.log(datasource)

const datasource = [
  {
    key: '1',
    BrainID: '71717640',
    Group: 'Control',
    WebAligned: '✔️',
    WebWarped: '❌',
    Segmented: '✔️',
    Nutiled: '✔️'
  },
  {
    key: '2',
    BrainID: '71717641',
    Group: 'Control',
    WebAligned: '✔️',
    WebWarped: '✔️',
    Segmented: '✔️',
    Nutiled: '✔️'
  },
  {
    key: '3',
    BrainID: '71717642',
    Group: 'Control',
    WebAligned: '✔️',
    WebWarped: '✔️',
    Segmented: '❌',
    Nutiled: '✔️'
  },
  {
    key: '4',
    BrainID: '71717643',
    Group: 'Treatment',
    WebAligned: '✔️',
    WebWarped: '❌',
    Segmented: '✔️',
    Nutiled: '❌'
  },
  {
    key: '5',
    BrainID: '71717644',
    Group: 'Treatment',
    WebAligned: '❌',
    WebWarped: '❌',
    Segmented: '✔️',
    Nutiled: '✔️'
  },
  {
    key: '6',
    BrainID: '71717645',
    Group: 'Treatment',
    WebAligned: '❌',
    WebWarped: '✔️',
    Segmented: '✔️',
    Nutiled: '✔️'
  },
  {
    key: '7',
    BrainID: '71717646',
    Group: 'Treatment',
    WebAligned: '❌',
    WebWarped: '✔️',
    Segmented: '❌',
    Nutiled: '✔️'
  },
  {
    key: '8',
    BrainID: '71717647',
    Group: 'Treatment',
    WebAligned: '❌',
    WebWarped: '✔️',
    Segmented: '❌',
    Nutiled: '❌'
  },
  {
    key: '9',
    BrainID: '71717648',
    Group: 'Treatment',
    WebAligned: '❌',
    WebWarped: '❌',
    Segmented: '✔️',
    Nutiled: '❌'
  },
  {
    key: '10',
    BrainID: '71717649',
    Group: 'Treatment',
    WebAligned: '❌',
    WebWarped: '❌',
    Segmented: '❌',
    Nutiled: '✔️'
  },
  {
    key: '11',
    BrainID: '71717650',
    Group: 'Treatment',
    WebAligned: '❌',
    WebWarped: '❌',
    Segmented: '❌',
    Nutiled: '❌'
  },
  {
    key: '12',
    BrainID: '71717651',
    Group: 'Treatment',
    WebAligned: '❌',
    WebWarped: '❌',
    Segmented: '❌',
    Nutiled: '❌'
  },
  {
    key: '13',
    BrainID: '71717652',
    Group: 'Treatment',
    WebAligned: '❌',
    WebWarped: '❌',
    Segmented: '❌',
    Nutiled: '❌'
  },
  {
    key: '14',
    BrainID: '71717653',
    Group: 'Treatment',
    WebAligned: '❌',
    WebWarped: '❌',
    Segmented: '❌',
    Nutiled: '❌'
  },
  {
    key: '15',
    BrainID: '71717654',
    Group: 'Treatment',
    WebAligned: '❌',
    WebWarped: '❌',
    Segmented: '❌',
    Nutiled: '❌'
  },
  {
    key: '16',
    BrainID: '71717655',
    Group: 'Treatment',
    WebAligned: '❌',
    WebWarped: '❌',
    Segmented: '❌',
    Nutiled: '❌'
  },
  {
    key: '17',
    BrainID: '71717656',
    Group: 'Treatment',
    WebAligned: '❌',
    WebWarped: '❌',
    Segmented: '❌',
    Nutiled: '❌'
  },
  {
    key: '18',
    BrainID: '71717657',
    Group: 'Treatment',
    WebAligned: '❌',
    WebWarped: '❌',
    Segmented: '❌',
    Nutiled: '❌'
  }
]
console.log('success')
console.log(datasource)
export default datasource
