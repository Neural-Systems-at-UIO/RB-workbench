const downloadOpenMINDS = require('./internal/update/download_openminds.js');
//const fetchCoreSchemaInstances = require('./internal/update/fetchCoreSchemaInstances'); // Todo?
//const fetchControlledTerms = require('./internal/update/fetchControlledTerms'); // Todo?
const resolveSpeciesInStrain = require('./internal/update/resolveSpeciesInStrain'); // Todo?

const getRequestOptions = require('./internal/update/getRequestOptions'); // Todo?

// Ths function should run periodically on the backend. It will fetch the latest version of openMINDS 
// from the github repository (strains are fetched from KG) and save it to the backend.
// The function is not ready yeat, and more work is needed to make functions promise-based

// Download the openMINDS version
//downloadOpenMINDS()

// GET strain and species from KG, as strains are not part of openMINDS
//fetchCoreSchemaInstances({'openMindsType': 'Strain', 'instanceProperties': ['name', 'species', 'description']})
//fetchControlledTerms()


// Todo: prepare controlled terms

// This function will replace the kg uuids for the species with the species name
// resolveSpeciesInStrain


// Populate the table options


