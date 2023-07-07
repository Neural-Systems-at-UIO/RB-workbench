import { createColumnTitles } from './stringUtility'
import { widthCalc } from '../widthCalc'

export default function expandColumnProperties (columnProperties) {
  
  let columnNames = columnProperties.map(item=>item.key)
  let columnType = columnProperties.map(item=>item.type)

  const columnTitles = createColumnTitles(columnNames)
  //const allColumnProps = []
  
  columnProperties.forEach( (item, iCol) => {
    const isColumnFixed = (iCol === 0)
    const isColumnEditable = (columnType[iCol] === 'input')
    const isColumnSelectable = (columnType[iCol] === 'dropdown')
    
    item.title = columnTitles[iCol];
    item.dataIndex = columnNames[iCol];
    //item.key = columnNames[iCol],
    item.fixed = isColumnFixed;
    item.width = widthCalc(columnTitles[iCol]); // set the width of the column based on the title
    item.maxWidth = 0;
    item.editable = isColumnEditable;
    item.select = isColumnSelectable;
  })

  // for (let iCol = 0; iCol < columnNames.length; iCol++) {
  //   const isColumnFixed = (iCol === 0)
  //   const isColumnEditable = (columnType[iCol] === 'input')
  //   const isColumnSelectable = (columnType[iCol] === 'dropdown')

  //   const thisColumnProp = {
  //     title: columnTitles[iCol],
  //     dataIndex: columnNames[iCol],
  //     key: columnNames[iCol],
  //     fixed: isColumnFixed,
  //     width: widthCalc(columnTitles[iCol]), // set the width of the column based on the title
  //     maxWidth: 0, 
  //     editable: isColumnEditable,
  //     select: isColumnSelectable
  //   }

  //   allColumnProps.push(thisColumnProp)
  // }
  return columnProperties
}
