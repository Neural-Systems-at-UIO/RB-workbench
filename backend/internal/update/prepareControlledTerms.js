// This module will prefill all the controlled instances into the options for the tables

const path = require('path');
const fs = require('fs');

// Get path to the downloaded openMINDS controlled terms instances
const controlledTermsPath = path.join(__dirname, '..', '..', 'data', 'openMINDS-v3', 'instances');

// Get path to the table / column definitions
const tableDefsPath = path.join(__dirname, '..', '..', '..', 'src', 'metadata_new', 'defaultTableColumns');

// List the files in the table definitions folder
const tableDefs = fs.readdirSync(tableDefsPath);
//console.log(tableDefs)

// Load all the table definitions
const tableDefsData = tableDefs.map((tableDef) => {
    return require(path.join(tableDefsPath, tableDef));
});

console.log('aa', tableDefsData)


// Make a list of all the options for each column
const columnOptions = tableDefsData.map((tableDef) => {
    return tableDef.map((columnDef) => {
        return columnDef.options;
    });
});

// Flatten list of lists
const columnOptionsFlat = columnOptions.flat().flat();
const uniqueColumnOptions = [...new Set(columnOptionsFlat)];

//console.log('bb', tableDefsData)
console.log('cc', uniqueColumnOptions)


// Initialize array for controlled terms
let metadata = {};
let metadataDefinitions = {};

// loop through all the unique column options
uniqueColumnOptions.forEach( (termName) => {
    if (termName === undefined) {
        return;
    }
    if (termName === "controlledTerms/v1/strain") {
        return;
    }
    // Get the path to the instance
    const instancePath = path.join(controlledTermsPath, termName);

    // Get name of all files in folder instancePath
    const instanceFiles = fs.readdirSync(instancePath);

    const instanceNames = [];
    const instanceDescriptions = [];

    instanceFiles.forEach( (fileName) => {
        // Get the path to the file
        const filePath = path.join(instancePath, fileName);
        // Read the file
        let data = fs.readFileSync(filePath, 'utf8');

        // Parse the file
        //console.log(filePath)
        const fileData = JSON.parse(data);
        // Get the name of the instance
        instanceNames.push( fileData['name']);
        instanceDescriptions.push(fileData['definition']);
    });
        // Get the name of the instance
        //console.log(instanceName)

    // get the last part of the instance name
    const termNameParts = termName.split('/');
    const termNameLastPart = termNameParts[termNameParts.length - 1];

    // console.log(termNameParts)
    // Make first letter of the last part of the instance name uppercase
    const termNameLastPartUppercase = termNameLastPart.charAt(0).toUpperCase() + termNameLastPart.slice(1);

    metadata[termNameLastPartUppercase] = instanceNames;
    metadataDefinitions[termNameLastPartUppercase] = instanceDescriptions;
});

// // Get the path to the metadata folder

// console.log(metadata)

// Write the metadata to a file
const metadataFilePath = path.join(__dirname, '..', '..', '..', 'src', 'metadata', 'controlledInstances.json')
fs.writeFile(metadataFilePath, JSON.stringify(metadata, null, 2), (err) => { 
    if (err) {
        console.log(err);
    }
});
const metadataDescriptionsFilePath = path.join(__dirname, '..', '..', '..', 'src', 'metadata', 'controlledInstancesDefinitions.json')
fs.writeFile(metadataDescriptionsFilePath, JSON.stringify(metadataDefinitions, null, 2), (err) => { 
    if (err) {
        console.log(err);
    }
});