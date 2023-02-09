//import {columnStringSorter, columnNumberSorter} from '../../helpers/table/tableColumnSorter';
import createColumnProperties from '../../helpers/table/createColumnProps';


const columnNames = ["TissueSampleCollectionID", "Quantity", "Origin", "AnatomicalLocation", "Age", "Weight", "BiologicalSex", "Disease", "Laterality", "Species", "Strain", "TissueSampleAttribute", "TissueSampleType", "AdditionalRemarks", "DescendedFromSubjectID"];

const columnType = ["input", "input", "input", "input",	"input", "input", "dropdown", "dropdown", "dropdown", "dropdown","dropdown", "dropdown", "dropdown"]

const columnProps = createColumnProperties( columnNames, columnType );

export default columnProps

// Create a dictionary of the maximum length of each column
var max_column_widths = {};
columnNames.forEach( name => {max_column_widths[name] = 0} )

// export default subjectColumns

// Todo: should to this in place where tables are imported instead of here
export const max_len_tsc = max_column_widths;