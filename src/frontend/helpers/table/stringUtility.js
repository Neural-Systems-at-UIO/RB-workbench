export function createColumnTitles (columnNames) {
  const columnTitles = columnNames.map(name => {
    return name.replace(/([A-Z][a-z]+)|([A-Z][A-Z]+)/g, (match, p1, p2) => {
      if (p1) {
        return ' ' + p1
      } else {
        return ' ' + p2
      }
    })
  })

  return columnTitles
}
