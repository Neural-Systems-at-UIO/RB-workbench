var controlledTermsVersion = "v1";
// var sandsVersion = "v3";

// New def:
let columnProps = [
    { key: 'TissueSampleID',            type: 'input' }, 
    { key: 'Origin',                    type: 'input', options: [`controlledTerms/${controlledTermsVersion}/cellType`, `controlledTerms/${controlledTermsVersion}/organ`]}, 
    //{ key: 'AnatomicalLocation',        type: 'input', options: [`controlledTerms/${controlledTermsVersion}/UBERONParcellation`, `SANDS/${sandsVersion}/atlas/parcellationEntity`, `SANDS/${sandsVersion}/atlas/parcellationEntityVersion`]},
    { key: 'AnatomicalLocation',        type: 'input',  options: `controlledTerms/${controlledTermsVersion}/UBERONParcellation`}, // Todo: add organ to this list
    { key: 'Age',                       type: 'input' }, 
    { key: 'Weight',                    type: 'input' }, 
    { key: 'BiologicalSex',             type: 'string', options: `controlledTerms/${controlledTermsVersion}/biologicalSex`},
    { key: 'Pathology',                 type: 'string', options: `controlledTerms/${controlledTermsVersion}/disease`},
    { key: 'Laterality',                type: 'string', options: `controlledTerms/${controlledTermsVersion}/laterality`},
    { key: 'Species',                   type: 'string', options: `controlledTerms/${controlledTermsVersion}/species`},
    { key: 'Strain',                    type: 'string', options: `controlledTerms/${controlledTermsVersion}/strain`}, // Todo: dependent on species selection
    { key: 'TissueSampleAttribute',     type: 'string', options: `controlledTerms/${controlledTermsVersion}/tissueSampleAttribute`},
    { key: 'TissueSampleType',          type: 'string', options: `controlledTerms/${controlledTermsVersion}/tissueSampleType`},
    { key: 'AdditionalRemarks',         type: 'string' },
    { key: 'IsPartOf',                  type: 'string' },
    { key: 'DescendedFromSubjectID',    type: 'string' }
]

//export default columnProps
module.exports = columnProps