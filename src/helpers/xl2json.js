const xlsx = require('xlsx');
var fs = require('fs');
const file = xlsx.readFile('./subjectmetadata.xlsx'); /////This needs to be modified to adapt the code in the backend

const sheetNames=['Subject','SubjectGroup','TissueSample','TissueSampleCollection'] /// This might have to change if the excel sheet names are changed in the json_to_excel code
const totalSheets = sheetNames.length;

// Variable to store our data
let parsedData = [];
// Loop through sheets
for (let i = 0; i < totalSheets; i++) {
    let sheet = file.Sheets[sheetNames[i]]
    // Convert to json using xlsx
    const tempData = xlsx.utils.sheet_to_json(sheet,{defval:null});
    for (let row=0; row <tempData.length; row++){
        tempData[row].key = (row+1).toString()
    }
    // Add the sheet's json to our data array
    parsedData.push(tempData)
}
// call a function to save the data in a json file
generateJSONFile(parsedData);

function generateJSONFile(data) {
    try {
    fs.writeFileSync('data.json', JSON.stringify(data))
    } catch (err) {
    console.error(err)
    }
 }

