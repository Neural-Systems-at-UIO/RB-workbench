import createColumnProperties from '../../helpers/table/createColumnProps'

const columnNames = ['TissueSampleID', 'Origin', 'AnatomicalLocation', 'Age', 'Weight', 'BiologicalSex', 'Disease', 'Laterality', 'Species', 'Strain', 'TissueSampleAttribute', 'TissueSampleType', 'AdditionalRemarks', 'IsPartOf', 'DescendedFromSubjectID']

const columnType = ['input', 'input', 'dropdown', 'input', 'input', 'dropdown', 'dropdown', 'dropdown', 'dropdown', 'dropdown', 'dropdown', 'dropdown', 'input', 'dropdown', 'dropdown']

const columnProps = createColumnProperties(columnNames, columnType)

export default columnProps

