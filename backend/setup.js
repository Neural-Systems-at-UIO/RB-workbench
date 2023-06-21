const downloadOpenMINDS = require('./internal/update/download_openminds.js');
//const fetchCoreSchemaInstances = require('./internal/update/fetchCoreSchemaInstances'); // Todo?
//const fetchControlledTerms = require('./internal/update/fetchControlledTerms'); // Todo?
const resolveSpeciesInStrain = require('./internal/update/resolveSpeciesInStrain'); // Todo?

const getRequestOptions = require('./internal/update/getRequestOptions'); // Todo?


resolveSpeciesInStrain
// Download the openMINDS version
//downloadOpenMINDS()

// GET strain and species from KG, as strains are not part of openMINDS
//fetchCoreSchemaInstances({'openMindsType': 'Strain', 'instanceProperties': ['name', 'species', 'description']})
//fetchControlledTerms()


// Todo: prepare controlled terms


// Populate the table options