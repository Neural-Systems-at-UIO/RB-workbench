
//const fetch = require("node-fetch")
const axios = require('axios');
const fs = require('fs');
const path = require('path');

const getRequestOptions = require('./getRequestOptions')

const OPENMINDS_VOCAB = "https://openminds.ebrains.eu/vocab";

const INSTANCE_OUTPUT_DIRECTORY = path.join(__dirname, '..', '..', 'data', 'kg-instances');

fs.mkdir(INSTANCE_OUTPUT_DIRECTORY, { recursive: true }, (err) => {
    if (err) {
        if (err.code === 'EEXIST') {
            console.log("Directory already exists.");
        } else {
            console.log(err);
        }
    } else {
        console.log("New directory successfully created.");
    }
});

// config instanceSpecification should contain the following properties:
// - openMindsType // Rename to openMindsSchemaType
// - instanceProperties // Rename to openMindsSchemaProperties

// Todo: Support array (list) input for instanceSpecification

let fetchCoreSchemaInstances = async (instanceSpecification) => {

    // Create request header with authorization and options
    const requestOptions = await getRequestOptions();

    return new Promise((resolve, reject) => {

        // Define some api constants
        const API_BASE_URL = "https://core.kg.ebrains.eu/";
        const API_ENDPOINT = "v3/instances";

        const QUERY_PARAMS = ["stage=RELEASED", "space=dataset", "type=https://openminds.ebrains.eu/core/"];
        
        //const CORE_SCHEMAS = ["Person", "URL"]
        const CORE_SCHEMAS = [instanceSpecification.openMindsType];

        // Loop through core schemas terms and fetch their instances
        for (let i = 0; i < CORE_SCHEMAS.length; i++){

            // Assemble Query URL
            let queryUrl = API_BASE_URL + API_ENDPOINT + "?" + QUERY_PARAMS.join("&") + CORE_SCHEMAS[i];
            let instanceName = CORE_SCHEMAS[i];

            // Fetch instances
            fetchInstance(queryUrl, requestOptions, instanceName, instanceSpecification.instanceProperties)
            .then( (data) => resolve(data) )
        }
    });
}

// function to get schema instances from kg api
function fetchInstance(apiQueryUrl, requestOptions, instanceName, propertyNames) {

    return new Promise((resolve, reject) => {
        
        axios.get(apiQueryUrl, requestOptions)
        //fetch(apiQueryUrl, requestOptions)
            .then( response => {
                if (response.status===200) {
                    console.log('Successfully fetched instances for ' + instanceName + '. Status code: ' + response.status);
                    return response.data

                } else {
                    console.log('Error fetching instances for ' + instanceName + '. Status code: ' + response.status);
                    reject()
                }
                }) // Get response promise
                .then( data => parseAndSaveData(data, instanceName, propertyNames).then( (instances) => resolve(instances) ) )
                .catch( error => {reject(error); console.log('error') } )
    });
}

// Parse and save schema instances
function parseAndSaveData(data, instanceName, propertyNameList) {
    return new Promise((resolve, reject) => {

        const schemaInstanceList = [];

        for (let thisInstance of data.data){
            let newInstance = {"identifier": thisInstance["@id"]};

            for (let i in propertyNameList) {
                vocabName = OPENMINDS_VOCAB + "/" + propertyNameList[i];
                if (thisInstance[vocabName] != undefined) {
                    newInstance[propertyNameList[i]] = thisInstance[vocabName];
                }
            }
            schemaInstanceList.push( newInstance );       
        }
        
        // Save results to json file
        const jsonStr = JSON.stringify(schemaInstanceList, null, 2);

        const filename = instanceName + '.json';
        const filePath = path.join(INSTANCE_OUTPUT_DIRECTORY, filename);
        
        fs.writeFile(filePath, jsonStr, (err) => {
            if (err) {
                console.error(err);
                reject(err)
            } else {
                console.log('File with instances for ' + instanceName + ' written successfully');
                resolve()
            }
        });
    });
}

module.exports = fetchCoreSchemaInstances;
