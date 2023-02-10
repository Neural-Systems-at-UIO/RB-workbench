export { columnStringSorter, columnNumberSorter }

function columnStringSorter (a, b, columnName) {
  if (a[columnName] == null) {
    return 1
  }
  if (b[columnName] == null) {
    return -1
  }
  return a[columnName].localeCompare(b[columnName])
}

function columnNumberSorter (a, b, columnName) {
  if (a[columnName] == null) {
    return 1
  }
  if (b[columnName] == null) {
    return -1
  }
  return a[columnName] - b[columnName]
}
