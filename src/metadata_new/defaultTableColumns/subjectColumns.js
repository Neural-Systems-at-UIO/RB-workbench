var controlledTermsVersion = "v1";
//var sandsVersion = "v3";

// Todo: What to do when options can derive from multiple controlled terms?

// New def:
let columnProps = [
    { key: 'SubjectID',     type: 'input' }, 
    { key: 'Age',           type: 'input' },
    { key: 'AgeUnit',       type: 'input', options: `controlledTerms/${controlledTermsVersion}/unitOfMeasurement`, filter: 'AgeUnit' },
    { key: 'Weight',        type: 'input' }, 
    { key: 'WeightUnit',    type: 'input', options: `controlledTerms/${controlledTermsVersion}/unitOfMeasurement`, filter: 'WeightUnit'}, 
    { key: 'AgeCategory',   type: 'string', options: `controlledTerms/${controlledTermsVersion}/ageCategory`},
    { key: 'BiologicalSex', type: 'string', options: `controlledTerms/${controlledTermsVersion}/biologicalSex`},
    { key: 'Pathology',     type: 'string', options: [`controlledTerms/${controlledTermsVersion}/disease`, `controlledTerms/${controlledTermsVersion}/diseaseModel`]},
    { key: 'Handedness',    type: 'string', options: `controlledTerms/${controlledTermsVersion}/handedness`},
    { key: 'Species',       type: 'string', options: `controlledTerms/${controlledTermsVersion}/species`},
    { key: 'Strain',        type: 'string', options: `controlledTerms/${controlledTermsVersion}/strain`}, // Todo: dependent on species selection
    { key: 'SubjectAttribute',  type: 'string', options: `controlledTerms/${controlledTermsVersion}/subjectAttribute`},
    { key: 'AdditionalRemarks', type: 'string' },
    { key: 'IsPartOf',          type: 'string' }
]

//export default columnProps
module.exports = columnProps
// Can I import this in Register.js?