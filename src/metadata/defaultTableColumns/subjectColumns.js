// import {columnStringSorter, columnNumberSorter} from '../../helpers/table/tableColumnSorter';
import createColumnProperties from '../../helpers/table/createColumnProps'

// TODO:
// const columnType = ['dropdown', 'dropdown', 'dropdown', '', '', 'dropdown', '', '', '', 'dropdown', 'dropdown', 'dropdown']


const columnNames = ['SubjectID', 'Age', 'Weight', 'AgeCategory', 'BiologicalSex', 'Disease', 'Handedness', 'Species', 'Strain', 'SubjectAttribute', 'AdditionalRemarks', 'IsPartOf']
// const columnDataType = ["string", "number", "number", "number", "string", "string", "string", "string", "string", "string", "string", "string"];
const columnType = ['input', 'input', 'input', 'dropdown', 'dropdown', 'dropdown', 'dropdown', 'dropdown', 'dropdown', 'dropdown', 'input', 'dropdown']

const columnProps = createColumnProperties(columnNames, columnType)

export default columnProps