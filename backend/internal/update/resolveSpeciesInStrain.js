const strainInstances = require('../../data/kg-instances/strain.json');
const speciesInstances = require('../../data/kg-instances/Species.json');
const fs = require('fs');

// Loop through all the strain instances
strainInstances.forEach((strainInstance) => {

    // Replace the species identifier with the species name
    const species = speciesInstances.find((speciesInstance) => {
        return speciesInstance.identifier === strainInstance.species['@id'];
    }
    );
    strainInstance.species = species.name;

    // remove identifier key from strain instance
    delete strainInstance.identifier;

    // Add empty description if not present
    if (!strainInstance.description) {
        strainInstance.description = "";
    }
    
});


// Write the strain instances to a file
savePath = process.cwd() + "/src" + "/metadata";
fs.writeFileSync(savePath+"/strainInstances.json", JSON.stringify(strainInstances, null, 2));

