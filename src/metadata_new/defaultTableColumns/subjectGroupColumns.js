var controlledTermsVersion = "v1";
var sandsVersion = "v3";

// New def:
let columnProps = [
    { key: 'SubjectGroupID',    type: 'input' },
    { key: 'Quantity',          type: 'input' },
    { key: 'Age',               type: 'input' }, 
    { key: 'Weight',            type: 'input' }, 
    { key: 'AgeCategory',       type: 'string', options: `controlledTerms/${controlledTermsVersion}/ageCategory`},
    { key: 'BiologicalSex',     type: 'string', options: `controlledTerms/${controlledTermsVersion}/biologicalSex`},
    { key: 'Pathology',         type: 'string', options: `controlledTerms/${controlledTermsVersion}/disease`},
    { key: 'Handedness',        type: 'string', options: `controlledTerms/${controlledTermsVersion}/handedness`},
    { key: 'Species',           type: 'string', options: `controlledTerms/${controlledTermsVersion}/species`},
    { key: 'Strain',            type: 'string', options: `controlledTerms/${controlledTermsVersion}/strain`}, // Todo: dependent on species selection
    { key: 'SubjectAttribute',  type: 'string', options: `controlledTerms/${controlledTermsVersion}/subjectAttribute`},
    { key: 'AdditionalRemarks', type: 'string' }
]

//export default columnProps
module.exports = columnProps
// Can I import this in Register.js?