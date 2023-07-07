var controlledTermsVersion = "v1";
// var sandsVersion = "v3";

// New def:
let columnProps = [
    { key: 'TissueSampleID',            type: 'input', dataType: 'string', isMandatory: 'yes'}, 
    { key: 'Origin',                    type: 'dropdown', options: [`controlledTerms/${controlledTermsVersion}/cellType`, `controlledTerms/${controlledTermsVersion}/organ`], dataType: 'string', isMandatory: 'yes'}, 
    //{ key: 'AnatomicalLocation',        type: 'input', options: [`controlledTerms/${controlledTermsVersion}/UBERONParcellation`, `SANDS/${sandsVersion}/atlas/parcellationEntity`, `SANDS/${sandsVersion}/atlas/parcellationEntityVersion`]},
    { key: 'AnatomicalLocation',        type: 'dropdown',  options: `controlledTerms/${controlledTermsVersion}/UBERONParcellation`, dataType: 'string', isMandatory: 'no'}, // Todo: add organ to this list
    { key: 'Age',                       type: 'input', dataType: 'numerical', isMandatory: 'no'},
    { key: 'AgeUnit',                   type: 'dropdown', options: `controlledTerms/${controlledTermsVersion}/unitOfMeasurement`, filter: 'AgeUnit', dataType: 'string', isMandatory: 'no'},
    { key: 'Weight',                    type: 'input', dataType: 'numerical', isMandatory: 'no'}, 
    { key: 'WeightUnit',                type: 'dropdown', options: `controlledTerms/${controlledTermsVersion}/unitOfMeasurement`, filter: 'WeightUnit', dataType: 'string', isMandatory: 'no'},
    { key: 'BiologicalSex',             type: 'dropdown', options: `controlledTerms/${controlledTermsVersion}/biologicalSex`, dataType: 'string', isMandatory: 'no'},
    { key: 'Pathology',                 type: 'dropdown', options: `controlledTerms/${controlledTermsVersion}/disease`, dataType: 'string', isMandatory: 'no'},
    { key: 'Laterality',                type: 'dropdown', options: `controlledTerms/${controlledTermsVersion}/laterality`, dataType: 'string', isMandatory: 'no'},
    { key: 'Species',                   type: 'dropdown', options: `controlledTerms/${controlledTermsVersion}/species`, dataType: 'string', isMandatory: 'yes'},
    { key: 'Strain',                    type: 'dropdown', options: `controlledTerms/${controlledTermsVersion}/strain`, dataType: 'string', isMandatory: 'no'}, // Todo: dependent on species selection
    { key: 'TissueSampleAttribute',     type: 'dropdown', options: `controlledTerms/${controlledTermsVersion}/tissueSampleAttribute`, dataType: 'string', isMandatory: 'no'},
    { key: 'TissueSampleType',          type: 'dropdown', options: `controlledTerms/${controlledTermsVersion}/tissueSampleType`, dataType: 'string', isMandatory: 'yes'},
    { key: 'AdditionalRemarks',         type: 'input', dataType: 'string', isMandatory: 'no'},
    { key: 'IsPartOf',                  type: 'dropdown', dataType: 'string', isMandatory: 'no'},
    { key: 'DescendedFromSubjectID',    type: 'dropdown', dataType: 'string', isMandatory: 'no'}
]

//export default columnProps
module.exports = columnProps