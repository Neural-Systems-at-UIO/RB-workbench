
// Todo: rename and (slightly change behavior) to expand column properties
// import createColumnProperties from '../../helpers/table/createColumnProps'

// New metadata table columns (todo: implement)
// import subjectTableColumns from './defaultTableColumns/subjectColumns'
// import tissueTableColumns from './defaultTableColumns/tissueSampleColumns'
// import subjectGroupTableColumns from './defaultTableColumns/subjectGroupColumns'
// import tscTableColumns from './defaultTableColumns/tissueSampleCollectionColumns'

// Todo: rename and (slightly change behavior) to expand column properties
//import createColumnProperties from '../helpers/table/createColumnProps'

import expandColumnProperties from '../helpers/table/expandColumnProps'

//import subjectTableColumns from '../metadata/defaultTableColumns/subjectColumns'
import subjectTableColumns from '../metadata_new/defaultTableColumns/subjectColumns'
//import tissueTableColumns from '../metadata/defaultTableColumns/tissueSampleColumns'
import tissueTableColumns from '../metadata_new/defaultTableColumns/tissueSampleColumns'
import subjectGroupTableColumns from '../metadata/defaultTableColumns/subjectGroupColumns'
import tscTableColumns from '../metadata/defaultTableColumns/tissueSampleCollectionColumns'



console.log(subjectTableColumns)

const tables = {

    Subject: {
      columnProps: expandColumnProperties(subjectTableColumns),
      variableNames: subjectTableColumns.map((column) => column.key), // key or dataIndex?
      data: null,
      dependentVariables: {IsPartOf: {SubjectGroup: 'SubjectGroupID'}}
    },
    SubjectGroup: {
      columnProps: subjectGroupTableColumns,
      variableNames: subjectGroupTableColumns.map((column) => column.key), // key or dataIndex?
      data: null,
      dependentVariables: {}
    },
    TissueSample: {
      columnProps: expandColumnProperties(tissueTableColumns),
      variableNames: tissueTableColumns.map((column) => column.key), // key or dataIndex?
      data: null,
      dependentVariables: {IsPartOf: {TissueSampleCollection: 'TissueSampleCollectionID'}, DescendedFromSubjectID: {Subject: 'SubjectID'}}
    },
    TissueSampleCollection: {
      columnProps: tscTableColumns,
      variableNames: tscTableColumns.map((column) => column.key), // key or dataIndex?
      data: null,
      dependentVariables: {DescendedFromSubjectID: {Subject: 'SubjectID'}}
    },
    ActiveTableName: 'Subject'
  } // Use context???



export default tables
