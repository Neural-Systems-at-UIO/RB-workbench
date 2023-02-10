import { width_calc } from '../../helpers/width_calc';
import {columnStringSorter, columnNumberSorter} from '../../helpers/table/tableColumnSorter';

// Define the table columns for the Subject table
const subjectColumns = [
  {
    title: 'Subject',
    dataIndex: 'Subject',
    key: 'Subject',
    sorter: (a, b) => columnStringSorter(a, b, 'Subject'),
    sortDirections: ['descend', 'ascend', 'descend'],
    fixed: true,
    width: width_calc('Subject'), // set the width of the column based on the title
    editable: true,
    filters: [
      {
        text: '71717640',
        value: '71717640'
      }
    ]
  },
  {
    title: 'Age Category',
    dataIndex: 'AgeCategory',
    key: 'AgeCategory',
    sorter: (a, b) => columnStringSorter(a, b, 'AgeCategory'),
    //sortDirections: ['descend', 'ascend', 'descend'],
    width: width_calc('AgeCategory'),
    select: true
  },
  {
    title: 'Sex',
    dataIndex: 'BiologicalSex',
    key: 'BiologicalSex',
    sorter: (a, b) => columnStringSorter(a, b, 'BiologicalSex'),
    //sortDirections: ['descend', 'ascend'],
    width: width_calc('Sex'),
    select: true
  },

  {
    title: 'Species',
    dataIndex: 'Species',
    key: 'Species',
    sorter: (a, b) => columnStringSorter(a, b, 'Species'),
    sortDirections: ['descend', 'ascend', 'descend'],
    width: width_calc('Species'),
    select: true,
  },
  {
    title: 'Age',
    dataIndex: 'Age',
    key: 'Age',
    sorter: (a, b) => columnNumberSorter(a, b, 'Age'),
    sortDirections: ['descend', 'ascend', 'descend'],
    width: width_calc('Age'),
    editable: true
  },
  {
    title: 'Weight',
    dataIndex: 'Weight',
    key: 'Weight',
    sorter: (a, b) => columnNumberSorter(a, b, 'Weight'),
    sortDirections: ['descend', 'ascend', 'descend'],
    width: width_calc('Weight'),
    editable: true
  },
  {
    title: 'Strain',
    dataIndex: 'Strain',
    key: 'Strain',
    sorter: (a, b) => columnStringSorter(a, b, 'Strain'),
    sortDirections: ['descend', 'ascend', 'descend'],
    width: width_calc('Strain'),
    editable: true,
    select: true
  },
  {
    title: 'Pathology',
    dataIndex: 'Pathology',
    key: 'Pathology',
    sorter: (a, b) => columnStringSorter(a, b, 'Pathology'),
    sortDirections: ['descend', 'ascend', 'descend'],
    width: width_calc('Pathology'),
    editable: true
  },
  {
    title: 'Phenotype',
    dataIndex: 'Phenotype',
    key: 'Phenotype',
    sorter: (a, b) => columnStringSorter(a, b, 'Phenotype'),
    sortDirections: ['descend', 'ascend', 'descend'],
    width: width_calc('Phenotype'),
    editable: true,
    select: true
  },
  {
    title: 'Handedness',
    dataIndex: 'Handedness',
    key: 'Handedness',
    sorter: (a, b) => columnStringSorter(a, b, 'Handedness'),
    sortDirections: ['descend', 'ascend', 'descend'],
    width: width_calc('Handedness'),
    editable: true,
    select: true
  },
  {
    title: 'Laterality',
    dataIndex: 'Laterality',
    key: 'Laterality',
    sorter: (a, b) => columnStringSorter(a, b, 'Laterality'),
    sortDirections: ['descend', 'ascend', 'descend'],
    width: width_calc('Laterality'),
    editable: true,
    select: true
  },
  {
    title: 'Origin',
    dataIndex: 'Origin',
    key: 'Origin',
    sorter: (a, b) => columnStringSorter(a, b, 'Origin'),
    sortDirections: ['descend', 'ascend', 'descend'],
    width: width_calc('Origin'),
    editable: true
  },
  {
    title: 'Sampletype',
    dataIndex: 'Sampletype',
    key: 'Sampletype',
    sorter: (a, b) => columnStringSorter(a, b, 'Sampletype'),
    sortDirections: ['descend', 'ascend', 'descend'],
    width: width_calc('Sampletype'),
    editable: true
  }
];

// Create a dictionary of the maximum length of each column
var max_column_widths = {};
const subjectPropertyNames = subjectColumns.map( (column) => column.key );
subjectPropertyNames.forEach( name => {max_column_widths[name] = 0} )
  
export default subjectColumns
export const max_len_sub = max_column_widths;


// const max_len_old = {
//   Subject: 0,
//   BiologicalSex: 0,
//   AgeCategory: 0,
//   Species: 0,
//   Age: 0,
//   Weight: 0,
//   Strain: 0,
//   Pathology: 0,
//   Phenotype: 0,
//   Handedness: 0,
//   Laterality: 0,
//   Origin: 0,
//   Sampletype: 0
// };
