var controlledTermsVersion = "v1";
// var sandsVersion = "v3";

// New def:
let columnProps = [
    { key: 'TissueSampleID',            type: 'input', isMandatory: 'yes'}, 
    { key: 'Origin',                    type: 'dropdown', options: [`controlledTerms/${controlledTermsVersion}/cellType`, `controlledTerms/${controlledTermsVersion}/organ`], isMandatory: 'yes'}, 
    //{ key: 'AnatomicalLocation',        type: 'input', options: [`controlledTerms/${controlledTermsVersion}/UBERONParcellation`, `SANDS/${sandsVersion}/atlas/parcellationEntity`, `SANDS/${sandsVersion}/atlas/parcellationEntityVersion`]},
    { key: 'AnatomicalLocation',        type: 'dropdown',  options: `controlledTerms/${controlledTermsVersion}/UBERONParcellation`, isMandatory: 'no'}, // Todo: add organ to this list
    { key: 'Age',                       type: 'inputNumber', isMandatory: 'no'},
    { key: 'AgeUnit',                   type: 'dropdown', options: `controlledTerms/${controlledTermsVersion}/unitOfMeasurement`, filter: 'AgeUnit', isMandatory: 'no'},
    { key: 'Weight',                    type: 'inputNumber', isMandatory: 'no'}, 
    { key: 'WeightUnit',                type: 'dropdown', options: `controlledTerms/${controlledTermsVersion}/unitOfMeasurement`, filter: 'WeightUnit', isMandatory: 'no'},
    { key: 'BiologicalSex',             type: 'dropdown', options: `controlledTerms/${controlledTermsVersion}/biologicalSex`, isMandatory: 'no'},
    { key: 'Pathology',                 type: 'dropdown', options: `controlledTerms/${controlledTermsVersion}/disease`, isMandatory: 'no'},
    { key: 'Laterality',                type: 'dropdown', options: `controlledTerms/${controlledTermsVersion}/laterality`, isMandatory: 'no'},
    { key: 'Species',                   type: 'dropdown', options: `controlledTerms/${controlledTermsVersion}/species`, isMandatory: 'yes'},
    { key: 'Strain',                    type: 'dropdown', options: `controlledTerms/${controlledTermsVersion}/strain`, isMandatory: 'no'}, // Todo: dependent on species selection
    { key: 'TissueSampleAttribute',     type: 'dropdown', options: `controlledTerms/${controlledTermsVersion}/tissueSampleAttribute`, isMandatory: 'no'},
    { key: 'TissueSampleType',          type: 'dropdown', options: `controlledTerms/${controlledTermsVersion}/tissueSampleType`, isMandatory: 'yes'},
    { key: 'AdditionalRemarks',         type: 'input', isMandatory: 'no'},
    { key: 'IsPartOf',                  type: 'dropdown', isMandatory: 'no'},
    { key: 'DescendedFromSubjectID',    type: 'dropdown', isMandatory: 'no'}
]

//export default columnProps
module.exports = columnProps