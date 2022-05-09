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
    WebAligned: 'true',
    WebWarped: 'false',
    Segmented: 'true',
    Nutiled: 'true'
  },
  {
    key: '2',
    BrainID: '71717641',
    Group: 'Control',
    WebAligned: 'true',
    WebWarped: 'true',
    Segmented: 'true',
    Nutiled: 'true'
  },
  {
    key: '3',
    BrainID: '71717642',
    Group: 'Control',
    WebAligned: 'true',
    WebWarped: 'true',
    Segmented: 'false',
    Nutiled: 'true'
  },
  {
    key: '4',
    BrainID: '71717643',
    Group: 'Treatment',
    WebAligned: 'true',
    WebWarped: 'false',
    Segmented: 'true',
    Nutiled: 'false'
  },
  {
    key: '5',
    BrainID: '71717644',
    Group: 'Treatment',
    WebAligned: 'false',
    WebWarped: 'false',
    Segmented: 'true',
    Nutiled: 'true'
  },
  {
    key: '6',
    BrainID: '71717645',
    Group: 'Treatment',
    WebAligned: 'false',
    WebWarped: 'true',
    Segmented: 'true',
    Nutiled: 'true'
  },
  {
    key: '7',
    BrainID: '71717646',
    Group: 'Treatment',
    WebAligned: 'false',
    WebWarped: 'true',
    Segmented: 'false',
    Nutiled: 'true'
  },
  {
    key: '8',
    BrainID: '71717647',
    Group: 'Treatment',
    WebAligned: 'false',
    WebWarped: 'true',
    Segmented: 'false',
    Nutiled: 'false'
  },
  {
    key: '9',
    BrainID: '71717648',
    Group: 'Treatment',
    WebAligned: 'false',
    WebWarped: 'false',
    Segmented: 'true',
    Nutiled: 'false'
  },
  {
    key: '10',
    BrainID: '71717649',
    Group: 'Treatment',
    WebAligned: 'false',
    WebWarped: 'false',
    Segmented: 'false',
    Nutiled: 'true'
  },
  {
    key: '11',
    BrainID: '71717650',
    Group: 'Treatment',
    WebAligned: 'false',
    WebWarped: 'false',
    Segmented: 'false',
    Nutiled: 'false'
  },
  {
    key: '12',
    BrainID: '71717651',
    Group: 'Treatment',
    WebAligned: 'false',
    WebWarped: 'false',
    Segmented: 'false',
    Nutiled: 'false'
  },
  {
    key: '13',
    BrainID: '71717652',
    Group: 'Treatment',
    WebAligned: 'false',
    WebWarped: 'false',
    Segmented: 'false',
    Nutiled: 'false'
  },
  {
    key: '14',
    BrainID: '71717653',
    Group: 'Treatment',
    WebAligned: 'false',
    WebWarped: 'false',
    Segmented: 'false',
    Nutiled: 'false'
  },
  {
    key: '15',
    BrainID: '71717654',
    Group: 'Treatment',
    WebAligned: 'false',
    WebWarped: 'false',
    Segmented: 'false',
    Nutiled: 'false'
  },
  {
    key: '16',
    BrainID: '71717655',
    Group: 'Treatment',
    WebAligned: 'false',
    WebWarped: 'false',
    Segmented: 'false',
    Nutiled: 'false'
  },
  {
    key: '17',
    BrainID: '71717656',
    Group: 'Treatment',
    WebAligned: 'false',
    WebWarped: 'false',
    Segmented: 'false',
    Nutiled: 'false'
  },
  {
    key: '18',
    BrainID: '71717657',
    Group: 'Treatment',
    WebAligned: 'false',
    WebWarped: 'false',
    Segmented: 'false',
    Nutiled: 'false'
  }
]
console.log('success')
console.log(datasource)
export default datasource
