// import {columnStringSorter, columnNumberSorter} from '../../helpers/table/tableColumnSorter';
import createColumnProperties from '../../helpers/table/createColumnProps'

const columnNames = ['TissueSampleCollectionID', 'Quantity', 'Origin', 'AnatomicalLocation', 'Age', 'Weight', 'BiologicalSex', 'Disease', 'Laterality', 'Species', 'Strain', 'TissueSampleAttribute', 'TissueSampleType', 'AdditionalRemarks', 'DescendedFromSubjectID']

const columnType = ['input', 'input', 'input', 'input', 'input', 'input', 'dropdown', 'dropdown', 'dropdown', 'dropdown', 'dropdown', 'dropdown', 'dropdown', 'input', 'dropdown']

const columnProps = createColumnProperties(columnNames, columnType)

export default columnProps
