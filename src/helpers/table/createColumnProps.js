import { createColumnTitles } from './stringUtility'
import { widthCalc } from '../widthCalc'

export default function createColumnProperties (columnNames, columnType) {
  const columnTitles = createColumnTitles(columnNames)
  const allColumnProps = []

  for (let iCol = 0; iCol < columnNames.length; iCol++) {
    const isColumnFixed = (iCol === 0)
    const isColumnEditable = (columnType[iCol] === 'input' || columnType[iCol] === 'inputNumber')
    const isColumnSelectable = (columnType[iCol] === 'dropdown')

    const thisColumnProp = {
      title: columnTitles[iCol],
      dataIndex: columnNames[iCol],
      key: columnNames[iCol],
      fixed: isColumnFixed,
      width: widthCalc(columnTitles[iCol]), // set the width of the column based on the title
      maxWidth: 0, 
      editable: isColumnEditable,
      select: isColumnSelectable
    }

    allColumnProps.push(thisColumnProp)
  }
  return allColumnProps
}
