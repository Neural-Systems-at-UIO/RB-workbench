import { createColumnTitles } from './stringUtility';
import { width_calc } from '../../helpers/width_calc';

export default function createColumnProperties( columnNames, columnType ) {
    
    const columnTitles = createColumnTitles( columnNames );
    var allColumnProps = [];
  
    for (let iCol = 0; iCol < columnNames.length; iCol++) {
      const isColumnFixed = (iCol === 0);
      const isColumnEditable = (columnType[iCol] === "input");
      const isColumnSelectable = (columnType[iCol] === "dropdown");
  
      const thisColumnProp = {
        title: columnTitles[iCol], 
        dataIndex: columnNames[iCol],
        key: columnNames[iCol],
        fixed: isColumnFixed,
        width: width_calc( columnTitles[iCol] ), // set the width of the column based on the title
        editable: isColumnEditable,
        select: isColumnSelectable
      }
  
      allColumnProps.push(thisColumnProp)
    }
    return allColumnProps
  }
