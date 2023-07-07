var controlledTermsVersion = "v1";
//var sandsVersion = "v3";

// Todo: What to do when options can derive from multiple controlled terms?

// New def:
let columnProps = [
    { key: 'SubjectID',     type: 'input', dataType: 'string', isMandatory: 'yes'}, 
    { key: 'Age',           type: 'input', dataType: 'numerical', isMandatory: 'no'},
    { key: 'AgeUnit',       type: 'input', options: `controlledTerms/${controlledTermsVersion}/unitOfMeasurement`, filter: 'AgeUnit', dataType: 'string', isMandatory: 'no'},
    { key: 'Weight',        type: 'input', dataType: 'numerical', isMandatory: 'no'}, 
    { key: 'WeightUnit',    type: 'input', options: `controlledTerms/${controlledTermsVersion}/unitOfMeasurement`, filter: 'WeightUnit', dataType: 'string', isMandatory: 'no'}, 
    { key: 'AgeCategory',   type: 'string', options: `controlledTerms/${controlledTermsVersion}/ageCategory`, dataType: 'string', isMandatory: 'yes'},
    { key: 'BiologicalSex', type: 'string', options: `controlledTerms/${controlledTermsVersion}/biologicalSex`, dataType: 'string', isMandatory: 'no'},
    { key: 'Pathology',     type: 'string', options: [`controlledTerms/${controlledTermsVersion}/disease`, `controlledTerms/${controlledTermsVersion}/diseaseModel`], dataType: 'string', isMandatory: 'no'},
    { key: 'Handedness',    type: 'string', options: `controlledTerms/${controlledTermsVersion}/handedness`, dataType: 'string', isMandatory: 'no'},
    { key: 'Species',       type: 'string', options: `controlledTerms/${controlledTermsVersion}/species`, dataType: 'string', isMandatory: 'yes'},
    { key: 'Strain',        type: 'string', options: `controlledTerms/${controlledTermsVersion}/strain`, dataType: 'string', isMandatory: 'no'}, // Todo: dependent on species selection
    { key: 'SubjectAttribute',  type: 'string', options: `controlledTerms/${controlledTermsVersion}/subjectAttribute`, dataType: 'string', isMandatory: 'no'},
    { key: 'AdditionalRemarks', type: 'string', dataType: 'string', isMandatory: 'no'},
    { key: 'IsPartOf',          type: 'string', dataType: 'string', isMandatory: 'no'}
]

//export default columnProps
module.exports = columnProps
// Can I import this in Register.js?