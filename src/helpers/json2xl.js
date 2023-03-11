const jsonObject = require('./labbook_metadata_table-4.json');/////This needs to be modified to adapt the code
const fs = require('fs');
const ExcelJS = require('exceljs');
const workbook = new ExcelJS.Workbook();
// get all the controlled terms
var controlledterms = fs.readdirSync('C:/Users/archanag/WORK/OPENMINDS_code/controlledTerms');/////This needs to be modified to adapt the code

// loop through each element in the JSON object to make individual worksheet
for (let i = 0; i < jsonObject.length-1; i++){
    getexcelbook(jsonObject[i],workbook,controlledterms)
}

// function that creates a worksheet in the workbook and populates it with data for a given JSON object
function getexcelbook(outputjson,excelworkbook,allcontrolledterms){
    // create a new worksheet with a name derived from the ID column in the JSON object
    const sheet = excelworkbook.addWorksheet(Object.keys(outputjson[0])[1].replace('ID',''));
    // loop through each row of data in the JSON object
    for (let i = 0; i < outputjson.length; i++){
        const results=outputjson[i];
        var cellletter='A';
        // loop through each column of data in the current row
        for (let j = 1; j < Object.keys(results).length; j++){
            title_cellindex=cellletter+'1';
            // populate the cell with the column header and make it bold
            sheet.getCell(title_cellindex).value=Object.keys(results)[j];
            sheet.getCell(title_cellindex).font={bold: true};
            // set the cell index for the current row and column
            result_cellindex=cellletter+(((Number(results.key))+1).toString());
            
            cellletter=String.fromCharCode(cellletter.charCodeAt(0) + 1);

            // derive the name of the JSON file containing the controlled terms for the current column
            var fieldkeys=Object.keys(results)[j].replace(Object.keys(results)[j][0],Object.keys(results)[j][0].toLowerCase())+'.json';

            // find the index of the JSON file in the list of all controlled term files
            controltermindex=allcontrolledterms.indexOf(fieldkeys);

            // if the current column has controlled terms, create a dropdown list for the cell
            if (controltermindex!=-1){
                const controlltermsjsonObject =  require('C:/Users/archanag/WORK/OPENMINDS_code/controlledTerms/'+allcontrolledterms[controltermindex])
                var dropdownlist=[];

                // loop through each controlled term and add its name to the dropdown list
                for(l in controlltermsjsonObject){
                    dropdownlist.push(controlltermsjsonObject[l].name);
                }

                // convert the dropdown list to a string and add quotes around it
                var listconterms='"'+Object.values(dropdownlist)+'"';

                // if the length of the dropdown list string is less than 255 characters, add a data validation rule to the cell with the dropdown list
                if (listconterms.length<255){
                    sheet.getCell(result_cellindex).dataValidation = {
                        type: 'list',
                        value: 6,
                        allowBlank: true,
                        formulae: [listconterms]
                    };             
                } else {

                    // if the length of the dropdown list string is greater than 255 characters, create a new hidden worksheet for the controlled terms and add the dropdown list to it
                    // set worksheetname
                    sheetname=Object.keys(results)[j].replace(Object.keys(results)[j][0],Object.keys(results)[j][0].toLowerCase()) 
                    const worksheet = excelworkbook.getWorksheet(sheetname);
                    //make the worksheet hidden
                    if(worksheet==undefined){
                        const sheet2 = excelworkbook.addWorksheet(sheetname);
                        sheet2.state = 'hidden'
                        var cellnumber2=1
                        //add the list of columns to the worksheet
                        for (const k in dropdownlist){
                            var cellindex2= 'A'+cellnumber2.toString()
                          sheet2.getCell(cellindex2).value=dropdownlist[k]
                          cellnumber2=cellnumber2+1 
                        }
                        //add a data validation rule to the cell with the dropdown list of terms from the new sheet
                        var cellrange=(sheetname)+'!$A$1:$A$'+cellnumber2.toString()
                        sheet.getCell(result_cellindex).dataValidation = {
                            type: 'list',
                            allowBlank: true,
                            formulae: [cellrange]
                        };  
                    }
                    // if the worksheet already exists, get the controlled terms list from the existing sheet
                    else{
                        const worksheet = excelworkbook.getWorksheet(sheetname);
                        var cellrange=(sheetname)+'!$A$1:$A$'+(worksheet.actualRowCount).toString()
                        sheet.getCell(result_cellindex).dataValidation = {
                            type: 'list',
                            allowBlank: true,
                            formulae: [cellrange]
                        }; 
                    }
                }               
            }
            // add the values from the json to the excelsheet. These values will be placed over the drop down list
            sheet.getCell(result_cellindex).value=Object.values(results)[j]
            // set column width based on the text length
            sheet.columns.forEach(column => {
                const lengths = column.values.map(v => v.toString().length);
                const maxLength = Math.max(...lengths.filter(v => typeof v === 'number'));
                column.width = maxLength+1;
                });             
        }      
    }
    //save the excel file
    workbook.xlsx.writeFile('Subjectmetadata.xlsx')
}
