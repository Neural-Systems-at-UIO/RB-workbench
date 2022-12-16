import { width_calc } from './width_calc';

export const defaultColumns = [
  {
    title: 'Subject',
    dataIndex: 'Subject',
    key: 'Subject',
    sorter: (a, b) => {
      if (a.Subject == null) {
        return 1;
      }
      if (b.Subject == null) {
        return -1;
      }
      return a.Subject.localeCompare(b.Subject);
    },
    sortDirections: ['descend', 'ascend', 'descend'],
    fixed: true,
    // set the width of the column based on the title
    width: width_calc('Subject'),
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
    title: 'Age Category',
    dataIndex: 'AgeCategory',
    key: 'AgeCategory',

    sorter: (a, b) => {
      if (a.AgeCategory == null) {
        return 1;
      }
      if (b.AgeCategory == null) {
        return -1;
      }
      return a.AgeCategory.localeCompare(b.AgeCategory);
    },

    sortDirections: ['descend', 'ascend', 'descend'],
    width: width_calc('AgeCategory'),
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

    sortDirections: ['descend', 'ascend', 'descend'],
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
    sortDirections: ['descend', 'ascend', 'descend'],
    width: width_calc('Sampletype'),
    editable: true
  }
];
// a function to get the data from the api and set the state of statefulmetadata
export const max_len = {
  Subject: 0,
  BiologicalSex: 0,
  AgeCategory: 0,
  Species: 0,
  Age: 0,
  Weight: 0,
  Strain: 0,
  Pathology: 0,
  Phenotype: 0,
  Handedness: 0,
  Laterality: 0,
  Origin: 0,
  Sampletype: 0
};
