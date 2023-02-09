import { width_calc } from '../../helpers/width_calc';

// Define the table columns for the Subject table
const tissueSampleColumns = [
  {
    title: 'Tissue Sample',
    dataIndex: 'TissueSample',
    key: 'TissueSample',
    sorter: (a, b) => {
      if (a.TissueSample == null) {
        return 1;
      }
      if (b.TissueSample == null) {
        return -1;
      }
      return a.TissueSample.localeCompare(b.TissueSample);
    },
    sortDirections: ['descend', 'ascend', 'descend'],
    fixed: true,
    // set the width of the column based on the title
    width: width_calc('TissueSample'),
    // fixed: 'left',
    editable: true,
    filters: [
      {
        text: '71717640',
        value: '71717640'
      }
    ]
  },

  {
    title: 'Anatomical Location',
    dataIndex: 'AnatomicalLocation',
    key: 'AnatomicalLocation',

    sorter: (a, b) => {
      if (a.AnatomicalLocation == null) {
        return 1;
      }
      if (b.AnatomicalLocation == null) {
        return -1;
      }
      return a.AnatomicalLocation.localeCompare(b.AnatomicalLocation);
    },

    sortDirections: ['descend', 'ascend', 'descend'],
    width: width_calc('AnatomicalLocation'),
    select: true
  },
  {
    title: 'Sex',
    dataIndex: 'BiologicalSex',
    key: 'BiologicalSex',

    sorter: (a, b) => {
      if (a.BiologicalSex == null) {
        return 1;
      }
      if (b.BiologicalSex == null) {
        return -1;
      }
      return a.BiologicalSex.localeCompare(b.BiologicalSex);
    },

    sortDirections: ['descend'],
    width: width_calc('Sex'),
    select: true
  },

  {
    title: 'Species',
    dataIndex: 'Species',
    key: 'Species',
    sorter: (a, b) => {
      if (a.Species == null) {
        return 1;
      }
      if (b.Species == null) {
        return -1;
      }
      return a.Species.localeCompare(b.Species);
    },
    sortDirections: ['descend', 'ascend', 'descend'],

    width: width_calc('Species'),
    editable: true,
    select: true
  },
  {
    title: 'Age',
    dataIndex: 'Age',
    key: 'Age',
    sorter: (a, b) => {
      if (a.Age == null) {
        return 1;
      }
      if (b.Age == null) {
        return -1;
      }
      return a.Age - b.Age;
    },
    sortDirections: ['descend', 'ascend', 'descend'],
    width: width_calc('Age'),
    editable: true
  },
  {
    title: 'Weight',
    dataIndex: 'Weight',
    key: 'Weight',
    sorter: (a, b) => {
      if (a.Weight == null) {
        return 1;
      }
      if (b.Weight == null) {
        return -1;
      }
      return a.Weight - b.Weight;
    },
    sortDirections: ['descend', 'ascend', 'descend'],
    width: width_calc('Weight'),
    editable: true
  },
  {
    title: 'Strain',
    dataIndex: 'Strain',
    key: 'Strain',
    sorter: (a, b) => {
      if (a.Strain == null) {
        return 1;
      }
      if (b.Strain == null) {
        return -1;
      }
      return a.Strain.localeCompare(b.Strain);
    },
    sortDirections: ['descend', 'ascend', 'descend'],
    width: width_calc('Strain'),
    editable: true,
    select: true
  },
  {
    title: 'Pathology',
    dataIndex: 'Pathology',
    key: 'Pathology',
    sorter: (a, b) => {
      if (a.Pathology == null) {
        return 1;
      }
      if (b.Pathology == null) {
        return -1;
      }
      return a.Pathology.localeCompare(b.Pathology);
    },
    sortDirections: ['descend', 'ascend', 'descend'],
    width: width_calc('Pathology'),
    editable: true
  },
  {
    title: 'Phenotype',
    dataIndex: 'Phenotype',
    key: 'Phenotype',
    sorter: (a, b) => {
      if (a.Phenotype == null) {
        return 1;
      }
      if (b.Phenotype == null) {
        return -1;
      }
      return a.Phenotype.localeCompare(b.Phenotype);
    },
    sortDirections: ['descend', 'ascend', 'descend'],
    width: width_calc('Phenotype'),
    editable: true,
    select: true
  },
  {
    title: 'Handedness',
    dataIndex: 'Handedness',
    key: 'Handedness',
    sorter: (a, b) => {
      if (a.Handedness == null) {
        return 1;
      }
      if (b.Handedness == null) {
        return -1;
      }
      return a.Handedness.localeCompare(b.Handedness);
    },
    sortDirections: ['descend', 'ascend', 'descend'],
    width: width_calc('Handedness'),
    editable: true,
    select: true
  },
  {
    title: 'Laterality',
    dataIndex: 'Laterality',
    key: 'Laterality',
    sorter: (a, b) => {
      if (a.Laterality == null) {
        return 1;
      }
      if (b.Laterality == null) {
        return -1;
      }
      return a.Laterality.localeCompare(b.Laterality);
    },
    sortDirections: ['descend', 'ascend', 'descend'],
    width: width_calc('Laterality'),
    editable: true,
    select: true
  },
  {
    title: 'Origin',
    dataIndex: 'Origin',
    key: 'Origin',
    sorter: (a, b) => {
      if (a.Origin == null) {
        return 1;
      }
      if (b.Origin == null) {
        return -1;
      }
      return a.Origin.localeCompare(b.Origin);
    },
    sortDirections: ['descend', 'ascend', 'descend'],
    width: width_calc('Origin'),
    editable: true
  },
  {
    title: 'Sampletype',
    dataIndex: 'Sampletype',
    key: 'Sampletype',
    sorter: (a, b) => {
      if (a.Sampletype == null) {
        return 1;
      }
      if (b.Sampletype == null) {
        return -1;
      }
      return a.Sampletype.localeCompare(b.Sampletype);
    },
    sortDirections: ['descend', 'ascend', 'none', 'descend'],
    width: width_calc('Sampletype'),
    editable: true
  }
];

// Create a dictionary of the maximum length of each column
var max_column_widths = {};
const tsPropertyNames = tissueSampleColumns.map( (column) => column.key );
tsPropertyNames.forEach( name => {max_column_widths[name] = 0} )
  
export default tissueSampleColumns
export const max_len_ts = max_column_widths;


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
