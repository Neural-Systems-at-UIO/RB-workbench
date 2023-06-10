// import {columnStringSorter, columnNumberSorter} from '../../helpers/table/tableColumnSorter';
import createColumnProperties from '../../helpers/table/createColumnProps'

const columnNames = ['SubjectGroupID', 'Quantity', 'Age', 'AgeUnit', 'Weight', 'WeightUnit', 'AgeCategory', 'BiologicalSex', 'Pathology', 'Handedness', 'Species', 'Strain', 'SubjectAttribute', 'AdditionalRemarks']
const columnType = ['input', 'input', 'input', 'dropdown', 'input', 'dropdown', 'dropdown', 'dropdown', 'dropdown', 'dropdown', 'dropdown', 'dropdown', 'dropdown', 'input']

const columnProps = createColumnProperties(columnNames, columnType)

export default columnProps
