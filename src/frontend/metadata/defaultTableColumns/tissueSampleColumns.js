import createColumnProperties from '../../helpers/table/createColumnProps'

const columnNames = ['TissueSampleID', 'Origin', 'AnatomicalLocation', 'Age', 'Weight', 'BiologicalSex', 'Disease', 'Laterality', 'Species', 'Strain', 'TissueSampleAttribute', 'TissueSampleType', 'AdditionalRemarks', 'IsPartOf', 'DescendedFromSubjectID']

const columnType = ['input', 'input', 'dropdown', 'input', 'input', 'dropdown', 'dropdown', 'dropdown', 'dropdown', 'dropdown', 'dropdown', 'dropdown', 'input', 'dropdown', 'dropdown']

const columnProps = createColumnProperties(columnNames, columnType)

export default columnProps

// Create a dictionary of the maximum length of each column
const maxColumnWidths = {}
const tsPropertyNames = columnProps.map((column) => column.key)
tsPropertyNames.forEach(name => { maxColumnWidths[name] = 0 })

export const maxLenTs = maxColumnWidths
