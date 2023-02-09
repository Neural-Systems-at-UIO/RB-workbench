import createColumnProperties from '../../helpers/table/createColumnProps';

const columnNames = ["TissueSampleID", "Origin", "AnatomicalLocation", "Age", "Weight", "BiologicalSex", "Disease", "Laterality", "Species", "Strain", "TissueSampleAttribute", "TissueSampleType", "AdditionalRemarks", "IsPartOf", "DescendedFromSubjectID"];

const columnType = ["input", "input", "input",	"input", "input", "dropdown", "dropdown", "dropdown", "dropdown","dropdown", "dropdown", "dropdown", "input", "dropdown", "dropdown"];

const columnProps = createColumnProperties( columnNames, columnType );

export default columnProps

// Create a dictionary of the maximum length of each column
var max_column_widths = {};
const tsPropertyNames = columnProps.map( (column) => column.key );
tsPropertyNames.forEach( name => {max_column_widths[name] = 0} )
  
export const max_len_ts = max_column_widths;
