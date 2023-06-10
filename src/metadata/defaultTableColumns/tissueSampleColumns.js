import createColumnProperties from '../../helpers/table/createColumnProps'

const columnNames = ['TissueSampleID', 'Origin', 'AnatomicalLocation', 'Age', 'AgeUnit', 'Weight', 'WeightUnit', 'BiologicalSex', 'Pathology', 'Laterality', 'Species', 'Strain', 'TissueSampleAttribute', 'TissueSampleType', 'AdditionalRemarks', 'IsPartOf', 'DescendedFromSubjectID']

const columnType = ['input', 'dropdown', 'dropdown', 'input', 'dropdown', 'input', 'dropdown', 'dropdown', 'dropdown', 'dropdown', 'dropdown', 'dropdown', 'dropdown', 'dropdown', 'input', 'dropdown', 'dropdown']

const columnProps = createColumnProperties(columnNames, columnType)

export default columnProps

