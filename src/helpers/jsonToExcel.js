// Todo:
// [ ] Import controlledTerms using import instead of readdir and require
// [ ] Import from the correct path
// [ ] What does controlled terms look like? Is it an array of objects?
// [ ] Create exportable function that take json as input and saves to excel
// [ ] Go the other way around: Create function that takes excel as input and saves to json

// How to create a blob for an excel file?

const jsonObject = require('./labbook_metadata_table-4.json');
const fs = require('fs');
var controlledterms = fs.readdirSync('C:/Users/archanag/WORK/OPENMINDS_code/controlledTerms');

const ExcelJS = require('exceljs');
const workbook = new ExcelJS.Workbook();


for (let i = 0; i < jsonObject.length-1; i++){
    getexcelbook(jsonObject[i],workbook,controlledterms)
}

function getexcelbook(outputjson,excelworkbook,allcontrolledterms){
    const sheet = excelworkbook.addWorksheet(Object.keys(outputjson[0])[1].replace('ID',''));
    for (let i = 0; i < outputjson.length; i++){
        const results=outputjson[i]
        var cellletter='A'
        for (let j = 1; j < Object.keys(results).length; j++){
            title_cellindex=cellletter+'1'
            sheet.getCell(title_cellindex).value=Object.keys(results)[j]
            sheet.getCell(title_cellindex).font={bold: true}
            result_cellindex=cellletter+(((Number(results.key))+1).toString())           
            cellletter=String.fromCharCode(cellletter.charCodeAt(0) + 1)
            var fieldkeys=Object.keys(results)[j].replace(Object.keys(results)[j][0],Object.keys(results)[j][0].toLowerCase())+'.json'
            controltermindex=allcontrolledterms.indexOf(fieldkeys)
            if (controltermindex!=-1){
                const controlltermsjsonObject =  require('C:/Users/archanag/WORK/OPENMINDS_code/controlledTerms/'+allcontrolledterms[controltermindex])
                var dropdownlist=[]             
                for(l in controlltermsjsonObject){
                    dropdownlist.push(controlltermsjsonObject[l].name)
                }
                var listconterms='"'+Object.values(dropdownlist)+'"'
                if (listconterms.length<255){
                    sheet.getCell(result_cellindex).dataValidation = {
                        type: 'list',
                        value: 6,
                        allowBlank: true,
                        formulae: [listconterms]
                    };             
                }else {
                    sheetname=Object.keys(results)[j].replace(Object.keys(results)[j][0],Object.keys(results)[j][0].toLowerCase())
                    const worksheet = excelworkbook.getWorksheet(sheetname);
                    if(worksheet==undefined){
                        const sheet2 = excelworkbook.addWorksheet(sheetname);
                        sheet2.state = 'hidden'
                        var cellnumber2=1
                        for (const k in dropdownlist){
                            var cellindex2= 'A'+cellnumber2.toString()
                          sheet2.getCell(cellindex2).value=dropdownlist[k]
                          cellnumber2=cellnumber2+1 
                        }
                        var cellrange=(sheetname)+'!$A$1:$A$'+cellnumber2.toString()
                        sheet.getCell(result_cellindex).dataValidation = {
                            type: 'list',
                            allowBlank: true,
                            formulae: [cellrange]
                        };  
                    }
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
            sheet.getCell(result_cellindex).value=Object.values(results)[j]
            sheet.columns.forEach(column => {
                const lengths = column.values.map(v => v.toString().length);
                const maxLength = Math.max(...lengths.filter(v => typeof v === 'number'));
                column.width = maxLength+1;
                });             
        }      
    }
    workbook.xlsx.writeFile('Subjectmetadata.xlsx')
}

