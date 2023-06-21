import controlledInstanceNames from '../../metadata/controlledInstances';
import controlledInstanceDefinitions from '../../metadata/controlledInstancesDefinitions';
import strainInstances from '../../metadata/strainInstances';

import instanceFilter from '../../metadata/columnDataFilter';

import subjectTableColumns from '../../metadata_new/defaultTableColumns/subjectColumns'
import tissueTableColumns from '../../metadata_new/defaultTableColumns/tissueSampleColumns'
import subjectGroupTableColumns from '../../metadata_new/defaultTableColumns/subjectGroupColumns'
import tscTableColumns from '../../metadata_new/defaultTableColumns/tissueSampleCollectionColumns'


// Questions:
//  - Should instances be sorted by name?

// concatenate all column properties
const allColumnProperties = subjectTableColumns.concat(tissueTableColumns, subjectGroupTableColumns, tscTableColumns)

export function getMetadataOptions() {
    // This function assembles the dropdown options for a columns controlled term instances
    // It also makes sure that missing/undefined columns are set to empty arrays

    // The return value is an object with the column names as keys and the dropdown options as values
    // The dropdown options are arrays of objects with the keys 'label' and 'options' and 
    // the format is compatible with the ant-design Select component with grouped options
  
    // Initialize an empty object to store the column options
    let columnOptions = {};

    // Find unique column properties
    const uniqueObjects = allColumnProperties.reduce((accumulator, currentObject) => {
      const { key } = currentObject;
    
      // Check if the key already exists in the accumulator array
      const existingObject = accumulator.find(obj => obj.key === key);
    
      if (!existingObject) {
        // If the key doesn't exist, add the current object to the accumulator array
        accumulator.push(currentObject);
      }
    
      return accumulator;
    }, []);

    // Loop through all the unique column properties
    for (let i = 0; i < uniqueObjects.length; i++) {
      const thisObject = uniqueObjects[i];

      // Todo: Handle strain independently
      

      // Initialize the column options for the current column
      columnOptions[thisObject['key']] = []

      if ( thisObject['options'] ) {
        // Todo: Handle array of options
        const termNameArray = getControlledTermNames( thisObject['options'] )

        // Loop through controlled term names (most columns have one controlled term, but some have multiple)
        for (let j = 0; j < termNameArray.length; j++) {
          let thisTermName = termNameArray[j];
          
          // Check if the instance name a key of the controlledInstanceNames object
          if ( controlledInstanceNames[thisTermName] ) {
            
            // Get names and defintions
            let instanceNames = controlledInstanceNames[thisTermName]
            let instanceDefinitions = controlledInstanceDefinitions[thisTermName]

            // Apply filter if it exists
            if ( thisObject['filter'] ) {
              const termName = thisObject['filter'];

              if (instanceFilter[termName]) {
                // Filter instance names and definitions based on names in instanceFilter
                const filteredInstanceNames = instanceNames.filter(name => instanceFilter[termName].includes(name))
                const filteredInstanceDefinitions = instanceDefinitions.filter((name, index) => instanceFilter[termName].includes(instanceNames[index]))
    
                instanceNames = filteredInstanceNames;
                instanceDefinitions = filteredInstanceDefinitions;
              }
            }

            // Create options array compatible with ant-design Select component
            const termOptions = instanceNames.map((name, index) => {
              return {
                value: name,
                label: name,
                title: instanceDefinitions[index]
              };
            })

            let options = {
              label: thisTermName,
              options: termOptions
            }

            columnOptions[thisObject['key']].push(options)
          }
        }
      }
    }

    return columnOptions
  }


  export function updateDependentVariableOptions(specimenTables, tableName, columnName, columnOptions) {
    // This function updates the dropdown options for a column with dependent variables,
    // i.e. isPartOf or DescendedFrom

    // Todo: Fix so that these are specific to the table a column is part of.
    // I.e both Subject and TissueSample has the IsPartOf column, but they should have different options

    // Loop through all specimen tables
    for (const key in specimenTables) {
      const dependentVariable = specimenTables[key].dependentVariables;
      if (dependentVariable) {
        for (const propName in dependentVariable) {
          if (tableName in dependentVariable[propName]) {
            // Get dependent variable name
            const dependentVariableName = dependentVariable[propName][tableName];
            if (dependentVariableName === columnName) {
              // Get values from table
              const value = specimenTables[tableName].data.map((row) => row[dependentVariableName]);

              columnOptions[propName] = [
                {
                  label: dependentVariableName, 
                  options: value.map((name) => {
                    return {
                      value: name,
                      label: name,
                    };
                  })
                }
              ];
            }
          }
        }
      }
    }



    // // Update dropdown options for dependent columns, i.e isPartOf or DescendedFrom
    // if (specimenTables[tableName].dependentVariables[columnName]) {
    //     const dependentTableName = Object.keys(specimenTables[tableName].dependentVariables[columnName])[0];
    //     const dependentVariableName = specimenTables[tableName].dependentVariables[columnName][dependentTableName];
    //     if (specimenTables[dependentTableName].data !== null) {
    //       let value = specimenTables[dependentTableName].data.map((row) => row[dependentVariableName]);
    //       columnOptions[columnName] = value;
    //     }
    //   }

    return columnOptions
  }


  function getControlledTermNames(controlledTermPath) {
    // This function returns the controlled term name from a path
    // e.g. controlledTerms/v1/ageCategory => AgeCategory

    let nameArray = [];

    // check if controlledTermPath is an array
    if (Array.isArray(controlledTermPath)) {
      nameArray = controlledTermPath.map(path => path.split('/').pop());
    } else {
      nameArray = [controlledTermPath.split('/').pop()]
    }

    // Capitalize first letter
    nameArray = nameArray.map(name => name.charAt(0).toUpperCase() + name.slice(1))
    return nameArray
  }
