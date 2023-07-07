var controlledTermsVersion = "v1";
// var sandsVersion = "v3";

// New def:
let columnProps = [
    { key: 'TissueSampleID',            type: 'input', dataType: 'string', isMandatory: 'yes'}, 
    { key: 'Origin',                    type: 'input', options: [`controlledTerms/${controlledTermsVersion}/cellType`, `controlledTerms/${controlledTermsVersion}/organ`], dataType: 'string', isMandatory: 'yes'}, 
    //{ key: 'AnatomicalLocation',        type: 'input', options: [`controlledTerms/${controlledTermsVersion}/UBERONParcellation`, `SANDS/${sandsVersion}/atlas/parcellationEntity`, `SANDS/${sandsVersion}/atlas/parcellationEntityVersion`]},
    { key: 'AnatomicalLocation',        type: 'input',  options: `controlledTerms/${controlledTermsVersion}/UBERONParcellation`, dataType: 'string', isMandatory: 'no'}, // Todo: add organ to this list
    { key: 'Age',                       type: 'input', dataType: 'numerical', isMandatory: 'no'},
    { key: 'AgeUnit',                   type: 'input', options: `controlledTerms/${controlledTermsVersion}/unitOfMeasurement`, filter: 'AgeUnit', dataType: 'string', isMandatory: 'no'},
    { key: 'Weight',                    type: 'input', dataType: 'numerical', isMandatory: 'no'}, 
    { key: 'WeightUnit',                type: 'input', options: `controlledTerms/${controlledTermsVersion}/unitOfMeasurement`, filter: 'WeightUnit', dataType: 'string', isMandatory: 'no'},
    { key: 'BiologicalSex',             type: 'string', options: `controlledTerms/${controlledTermsVersion}/biologicalSex`, dataType: 'string', isMandatory: 'no'},
    { key: 'Pathology',                 type: 'string', options: `controlledTerms/${controlledTermsVersion}/disease`, dataType: 'string', isMandatory: 'no'},
    { key: 'Laterality',                type: 'string', options: `controlledTerms/${controlledTermsVersion}/laterality`, dataType: 'string', isMandatory: 'no'},
    { key: 'Species',                   type: 'string', options: `controlledTerms/${controlledTermsVersion}/species`, dataType: 'string', isMandatory: 'yes'},
    { key: 'Strain',                    type: 'string', options: `controlledTerms/${controlledTermsVersion}/strain`, dataType: 'string', isMandatory: 'no'}, // Todo: dependent on species selection
    { key: 'TissueSampleAttribute',     type: 'string', options: `controlledTerms/${controlledTermsVersion}/tissueSampleAttribute`, dataType: 'string', isMandatory: 'no'},
    { key: 'TissueSampleType',          type: 'string', options: `controlledTerms/${controlledTermsVersion}/tissueSampleType`, dataType: 'string', isMandatory: 'yes'},
    { key: 'AdditionalRemarks',         type: 'string', dataType: 'string', isMandatory: 'no'},
    { key: 'IsPartOf',                  type: 'string', dataType: 'string', isMandatory: 'no'},
    { key: 'DescendedFromSubjectID',    type: 'string', dataType: 'string', isMandatory: 'no'}
]

//export default columnProps
module.exports = columnProps