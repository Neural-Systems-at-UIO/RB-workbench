
export function convertTableToCSV (dataTable) {
  let columnNames = Object.keys(dataTable[0])

  // Remove key column
  columnNames = columnNames.filter((name) => name !== 'key')

  // Join columnNames as semicolon separated string and add to csv
  let csvString = columnNames.join(';') + '\n' // create header row

  for (let iRow = 0; iRow < dataTable.length; iRow++) {
    const row = dataTable[iRow]
    // console.log( row.join(';') )

    for (let jCol = 0; jCol < columnNames.length; jCol++) {
      csvString += row[columnNames[jCol]]
      if (jCol < columnNames.length - 1) {
        csvString += ';' // add semicolon if not last column
      } else {
        csvString += '\n' // add newline if last column
      }
    }
  }

  return csvString
}

export function convertCSVToTable (csvString) {
  const rows = csvString.split('\n')

  // Split rows into columns
  // const columns = rows.map( (row) => row.split(";") );

  // todo: check that we are getting the expected number of columns

  const dataTable = []
  const columnNames = rows[0].split(';')

  for (let iRow = 1; iRow < rows.length; iRow++) {
    const line = rows[iRow]
    const lineData = line.split(';')

    const row = { key: iRow.toString() }
    for (let jCol = 0; jCol < columnNames.length; jCol++) {
      if (lineData[jCol] === 'null' || lineData[jCol] === 'undefined') {
        lineData[jCol] = null
      }
      row[columnNames[jCol]] = lineData[jCol]
    }

    dataTable.push(row)
  }

  return dataTable
}

// const rows = table.querySelectorAll('tr');
// const csv = [];

// for (let i = 0; i < rows.length; i++) {
//   const row = [], cols = rows[i].querySelectorAll('td, th');

//   for (let j = 0; j < cols.length; j++)
//     row.push(cols[j].innerText);

//   csv.push(row.join(';'));
// }

// return csv.join('\n');
