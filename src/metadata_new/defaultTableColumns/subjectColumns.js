var controlledTermsVersion = "v1";
//var sandsVersion = "v3";

// Todo: What to do when options can derive from multiple controlled terms?

// New def:
let columnProps = [
    { key: 'SubjectID',     type: 'input', isMandatory: 'yes'}, 
    { key: 'Age',           type: 'inputNumber', isMandatory: 'no'},
    { key: 'AgeUnit',       type: 'dropdown', options: `controlledTerms/${controlledTermsVersion}/unitOfMeasurement`, filter: 'AgeUnit', isMandatory: 'no'},
    { key: 'Weight',        type: 'inputNumber', isMandatory: 'no'}, 
    { key: 'WeightUnit',    type: 'dropdown', options: `controlledTerms/${controlledTermsVersion}/unitOfMeasurement`, filter: 'WeightUnit', isMandatory: 'no'}, 
    { key: 'AgeCategory',   type: 'dropdown', options: `controlledTerms/${controlledTermsVersion}/ageCategory`, isMandatory: 'yes'},
    { key: 'BiologicalSex', type: 'dropdown', options: `controlledTerms/${controlledTermsVersion}/biologicalSex`, isMandatory: 'no'},
    { key: 'Pathology',     type: 'dropdown', options: [`controlledTerms/${controlledTermsVersion}/disease`, `controlledTerms/${controlledTermsVersion}/diseaseModel`], isMandatory: 'no'},
    { key: 'Handedness',    type: 'dropdown', options: `controlledTerms/${controlledTermsVersion}/handedness`, isMandatory: 'no'},
    { key: 'Species',       type: 'dropdown', options: `controlledTerms/${controlledTermsVersion}/species`, isMandatory: 'yes'},
    { key: 'Strain',        type: 'dropdown', options: `controlledTerms/${controlledTermsVersion}/strain`, isMandatory: 'no'}, // Todo: dependent on species selection
    { key: 'SubjectAttribute',  type: 'dropdown', options: `controlledTerms/${controlledTermsVersion}/subjectAttribute`, isMandatory: 'no'},
    { key: 'AdditionalRemarks', type: 'input', isMandatory: 'no'},
    { key: 'IsPartOf',          type: 'dropdown', isMandatory: 'no'}
]

//export default columnProps
module.exports = columnProps
// Can I import this in Register.js?