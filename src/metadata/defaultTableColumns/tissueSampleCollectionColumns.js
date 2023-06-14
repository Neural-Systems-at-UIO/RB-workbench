// import {columnStringSorter, columnNumberSorter} from '../../helpers/table/tableColumnSorter';
import createColumnProperties from '../../helpers/table/createColumnProps'

const columnNames = ['TissueSampleCollectionID', 'Quantity', 'Origin', 'AnatomicalLocation', 'Age', 'AgeUnit', 'Weight', 'WeightUnit', 'BiologicalSex', 'Pathology', 'Laterality', 'Species', 'Strain', 'TissueSampleAttribute', 'TissueSampleType', 'AdditionalRemarks', 'DescendedFromSubjectID']

const columnType = ['input', 'input', 'dropdown', 'dropdown', 'input', 'dropdown', 'input', 'dropdown', 'dropdown', 'dropdown', 'dropdown', 'dropdown', 'dropdown', 'dropdown', 'dropdown', 'input', 'dropdown']

const columnProps = createColumnProperties(columnNames, columnType)

export default columnProps
