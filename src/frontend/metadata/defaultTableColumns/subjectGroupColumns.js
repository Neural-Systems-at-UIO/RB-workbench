//import {columnStringSorter, columnNumberSorter} from '../../helpers/table/tableColumnSorter';
import createColumnProperties from '../../helpers/table/createColumnProps';

const columnNames = ["SubjectGroupID", "Quantity", "Age", "Weight", "AgeCategory", "BiologicalSex", "Disease", "Handedness", "Species", "Strain", "SubjectAttribute", "AdditionalRemarks"];
//const columnDataType = ["string", "number", "number", "number", "string", "string", "string", "string", "string", "string", "string", "string"];
const columnType = ["input", "input", "input", "input", "dropdown", "dropdown", "dropdown", "dropdown", "dropdown", "dropdown", "dropdown", "input"];

const columnProps = createColumnProperties( columnNames, columnType );

export default columnProps

// Create a dictionary of the maximum length of each column
var max_column_widths = {};
columnNames.forEach( name => {max_column_widths[name] = 0} )

// Todo: should to this in place where tables are imported instead of here
export const max_len_sg = max_column_widths;
