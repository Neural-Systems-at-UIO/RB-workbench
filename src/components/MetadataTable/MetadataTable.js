// This component is responsible for displaying the metadata table.
// It has the following functionality (in addition to the table itself):
// - Undo/redo
// - Options bar / toolbar
//    - Add row
//    - Delete row
//    - Save table
//    - Export table
//    - Import table


// Todo: 
//    [ ] If a subject group is removed, the isPartOf property of the subject beloning to that SubjectGroup should be set to null

// Questions:
//    [ ]
  

// IMPORTS
import React, { useEffect, useState } from 'react';
import { Table, Button } from 'antd';
import useUndo from 'use-undo';
import ConfigProvider from '../ConfigProvider';
//import metadata from '../../metadata/metadata';
//import metadataDefinitions from '../../metadata/metadata-definitions';
import metadata from '../../metadata/controlledInstances';
import { widthCalc, widthCalcDropdown } from '../../helpers/widthCalc';
//import { convertTableToCSV } from '../../helpers/csvAdapter';

import { EditableRow } from './TableComponents/EditableRow';
import { EditableCell } from './TableComponents/EditableCell';

import { getMetadataOptions } from '../../helpers/table/getMetadataOptions';
// Todo: import { getMetadataOptions, updateDependentVariableOptions } from '../../helpers/table/getMetadataOptions';

import STRAIN_INSTANCES from '../../metadata/strainInstances'; // Global variable

const TABLE_COMPONENTS = {
  body: {
    row: EditableRow,
    cell: EditableCell
  }
};

var metadataOptionMap = getMetadataOptions();

// Suggestions
// EH: input to this component should be an object with the following properties:
// - project name
// - owner (user name)
// - metadata table 
// - current metatable name

// Current table name can still be a stateful variable. This would allow the undo functionality to work.
// Don't need it for re-render, just to store the previous value.


// Questions
// EH: 
//  - Should column properties be saved to the project? 
//    This is perhaps only relevant for saving user-defined cell dropdown items.
//  - What is the difference between selected, selectedRowKeys, and selRows and selectedRows? - simplify...


// Todo: move to separate file for managing tables.
var selRows = [];

export function MetadataTable(props) {

  // Props: 
  //
  // nextTableName: the name of the table to be displayed
  // project: the name of the project
  // user: the user object
  // children

  var nextTableName = props.nextTableName; // rename to newTableName?
  // this is weird, how should it be done?

  const [customOptionList, setCustomOptionList] = useState({})
  const [currentTableName, setCurrentTableName] = useState(nextTableName);
  const [currentProjectName, setCurrentProjectName] = useState(props.project);

  useEffect(() => {
    return () => {
      console.log('Child component is unmounting.');
    };
  }, []);

  const tables = props.projectDataTable;

  // These are used when new metadata instances are added to column dropdowns.
  // Todo: Replace with columnOptions, where columnOptions are updated if new SubjectGroups or TissueSampleCollections are added.
  // const [statefulmetadata, setstatefulmetadata] = useState(metadata);
  
  // remove spaces from table name
  nextTableName = nextTableName.replace(/\s/g, '');
  const currentTable = props.projectDataTable[nextTableName];

  const [statefulColumns, setStatefulColumns] = useState(currentTable.columnProps);

  if (currentTable.data === null) {
    currentTable.data = [createBlankRow()];
  }

  const [
    DataSource, {
      set: SetDataSource, reset: resetDataSource, undo: undoDataSource, redo: redoDataSource
    }
  ] = useUndo(currentTable.data, { useCheckpoints: true });

  const { present: presentDS } = DataSource;
  let count = presentDS.length;

  if (currentTableName !== nextTableName || currentProjectName !== props.project) {
    // save current (will be previous) state
    props.projectDataTable[currentTableName].columnProps = statefulColumns;
    props.projectDataTable.ActiveTableName = nextTableName;

    if (currentTable.data !== null) {
      // For linked columns, update the labels based on the row uuids in the linked table.
      // This update is necessary to ensure consistency if linked values changed or were removed.
      updateLinkedColumnLabels(currentTable, nextTableName);
    }

    resetDataSource(currentTable.data);

    // save current state??
    setCurrentProjectName(props.project)
    setCurrentTableName(nextTableName);
    setStatefulColumns([...currentTable.columnProps]);
  }


  function createBlankRow(rowNumber) {
    if (rowNumber === undefined) {
      rowNumber = 1;
    }
    //const newRow = { key: rowNumber.toString(), 'uuid': crypto.randomUUID() };
    const newRow = { key: rowNumber.toString(), 'uuid': crypto.randomUUID() };
    currentTable.variableNames.forEach((name) => {
      if (currentTable.dependentVariables) {
        if (name in currentTable.dependentVariables) {
          newRow[name] = {'value': null, 'label': ''};
        } else {
          newRow[name] = null;
        }
      } else {
        newRow[name] = null;
      }
    });

    return newRow;
  }

  function updateTableData(newData, useCheckpoint) {

    // Ask Harry: What are checkpoints for?
    // If checkpoint is true, the current state is saved in the past array
    if (useCheckpoint === undefined) {
      useCheckpoint = false;
    }

    props.projectDataTable[currentTableName].data = newData;
    SetDataSource(newData, useCheckpoint);

    currentTable.data = newData;
  }

  // Following are callback functions for the options bar
  function handleUndoDS(e) {
    e.preventDefault();
    undoDataSource();
    DataSource.past = DataSource.past.slice(-15);
  }

  function handleRedoDS(e) {
    e.preventDefault();
    redoDataSource();
  }

  /**
   * Callback for adding a new row to the table.
   */
  const handleAdd = () => {
    // Increment the row counter
    count += 1;

    // Generate a new row with unique key
    const newRow = createBlankRow(count);
    const newDS = [...presentDS, newRow];
    const useCheckpoint = true;
    updateTableData(newDS, useCheckpoint);
    postTableData();

  };

  /**
   * Callback for duplicating a row in the table.
   */
  const handleDuplicate = () => {
    // Increment the row counter
    count += 1;

    let newDS = [...presentDS];
    for (let i = 0; i < selRows.length; i++) {
      const newRow = JSON.parse(JSON.stringify(newDS[selRows[i] - 1]));
      newRow.key = count.toString();

      newDS = [...newDS, newRow];
      count += 1;
    }

    let useCheckpoint = true;
    updateTableData(newDS, useCheckpoint);
    postTableData();
  };

  /**
   * Callback for downloading the table as a CSV file.
   */
  // const DownloadCSV = () => {
  //   // todo: should infer the variable names from the table
  //   const csvString = convertTableToCSV(presentDS);

  //   const blob = new Blob([csvString], { type: 'text/csv' });
  //   const url = URL.createObjectURL(blob);
  //   const a = document.createElement('a');
  //   a.setAttribute('hidden', '');
  //   a.setAttribute('href', url);
  //   a.setAttribute('download', `metadata_${currentTableName.toLowerCase()}_table.csv`);
  //   document.body.appendChild(a);
  //   a.click();
  //   document.body.removeChild(a);
  // };

  const postTableData = () => {

    const SERVER_PATH = 'writeTable';

    // this will be rewritten as a web socket eventually as its nice to have two way communication
    // also it is insane to post the entire table every time a single value is changed but YOLO
    let data = { 'table': tables, 'user': props.user["http://schema.org/alternateName"], 'project': props.project };
    
    let serverUrl = ''
    if (process.env.NODE_ENV === "development") {
      serverUrl = process.env.REACT_APP_OIDC_CLIENT_REDIRECT_URL;
    } else {
      serverUrl = ''
    }

    const serverTarget = `${serverUrl}/${SERVER_PATH}`

    fetch(serverTarget, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
  };

  const downLoadAllTablesToJson = () => {

    let filename = 'labbook_metadata_table.json';

    // Loop through all keys in the tables object and create an array of the data from each table
    const allTables = Object.keys(tables).map((key) => {
      return tables[key].data;
    });

    const blob = new Blob([JSON.stringify(allTables)], { type: "data:text/json; charset=utf-8" });

    const url = URL.createObjectURL(blob);

    const anchorElement = document.createElement('a');
    anchorElement.setAttribute('hidden', '');
    anchorElement.setAttribute('href', url);
    anchorElement.setAttribute('download', filename);
    document.body.appendChild(anchorElement);
    anchorElement.click();
    document.body.removeChild(anchorElement);
  };

  /**
   * Callback for uploading a table from a CSV file.
   */
  const UploadCSV = () => {
    const input = document.createElement('input');
    input.type = 'file';

    input.onclick = function () {
      this.value = null;
    };

    input.onchange = (e) => {
      const file = input.files[0];

      const reader = new FileReader();
      reader.readAsText(file, 'UTF-8');

      reader.onload = (readerEvent) => {
        const content = readerEvent.target.result;

        // let new_data = convertCSVToTable(content);
        // convert to JSON
        let newData = JSON.parse(content);

        // Loop through all keys in the tables object and create an array of the data from each table
        Object.keys(props.projectDataTable).forEach((key, index) => {
          if (key !== 'ActiveTableName') {
            props.projectDataTable[key].data = newData[index];
          }
        });

        newData = props.projectDataTable[currentTableName].data;
        updateTableData(newData);
      };
    };
    input.click();
  };

  const handleDelete = () => {
    let temp_ = presentDS;
    temp_ = temp_.filter((item) => !selRows.includes(item.key));

    for (let i = 0; i < temp_.length; i++) {
      temp_[i].key = (i + 1).toString();
    }

    selRows = [];

    const checkboxes = document.getElementsByClassName('ant-checkbox-input');
    for (let i = 0; i < checkboxes.length; i++) {
      checkboxes[i].checked = false;
      checkboxes[i].dispatchEvent(new Event('change', { bubbles: true }));
    }

    updateTableData(temp_);
    setSelected([]);
    postTableData();
  };

  const makeSubjects = () => {
    // NOTE: Not working yet
    // TODO: newSubject should be an initialized subject row
    // Make subjects for each item in a subject group
    let temp_ = presentDS;
    let newSubjects = [];
    for (let i = 0; i < selRows.length; i++) {
      let newSubject = {};
      newSubjects.push(newSubject);
    }
    temp_ = temp_.concat(newSubjects);
    updateTableData(temp_);
  };


  const OptionsBar = () => (
    <div>
      <div style={{ padding: '0 ', textAlign: 'left' }} className="OptionsBar">
        <Button onClick={handleAdd}>Add</Button>
        <Button onClick={handleUndoDS}>Undo</Button>
        <Button onClick={handleRedoDS}>Redo</Button>
        <Button onClick={handleDuplicate}>Duplicate Selected</Button>
        <Button onClick={downLoadAllTablesToJson}>Download CSV</Button>
        {/* <Button onClick={DownloadJSon}>Download CSV</Button> */}
        <Button onClick={UploadCSV}>Upload CSV</Button>
        <Button onClick={handleDelete} type="default" danger>Delete</Button>
        {currentTableName === "SubjectGroup" ? <Button onClick={makeSubjects}>Make Subjects</Button> : null}
        {/* {{ add_button }} */}
      </div>
      <hr
        style={{
          backgroundColor: '#bfbfbf',
          border: 'none',
          height: '0.15rem'
        }}
      ></hr>
    </div>
  );

  // move to top of component

  // what is the difference between selected, selectedRowKeys, and selRows and selectedRows?

  const [selected, setSelected] = useState([]); // selected rows
  const rowSelection = {

    selectedRowKeys: selected,
    onChange: (selectedRowKeys, selectedRows) => {
      setSelected(selectedRows.map((row) => row.key));

      selRows = selectedRowKeys;
    },
    getCheckboxProps: (record) => {
      return {};
    }
  };

  /**
   * Callback for saving the changes made in the table to memory.
   * @param {Object} rowKey - The key of the row which that was changed. Note: rowKey is 1-indexed.
   * @param {Object} columnName - The name of the column that was changed.
   * @param {Object} newValue - The new value of the cell that was changed.
   * @param {String} oldValue - The old value of the cell that was changed.
   * @param {String} fieldType - The type of the field that was changed.
   */
  const handleSave = (rowKey, columnName, newValue, oldValue, fieldType) => {

    // Initialize the previous and updated version of the table data
    const updatedTableData = [...presentDS];
    const previousTableData = JSON.parse(JSON.stringify(presentDS)); // deep copy

    // Find the index of the row that was changed
    const rowIndex = updatedTableData.findIndex((item) => rowKey === item.key);
    
    // Define the indices of rows to update.
    let rowIndexList = []
    if (selRows && selRows.includes(rowKey)) {
      rowIndexList = selRows.map((rowKey) => rowKey - 1) // Key is 1-indexed, but array is 0-indexed.
    }  else {
      rowIndexList = [rowIndex]
    }

    oldValue = previousTableData[rowIndex][columnName];

    // Update the table data for the rows that should be updated
    for (const iRowIndex of rowIndexList) {
      updatedTableData[iRowIndex][columnName] = newValue;
      if (fieldType === 'dropdown') {
        updateDependentColumnValues(updatedTableData, iRowIndex, columnName, newValue)
      } else if (fieldType === 'inputfield') {
        //updateLinkedColumnValues(columnName, newValue, oldValue)
      }
    }

    // Get values in column to update max column width
    const valuesInColumn = updatedTableData.map((item) => item[columnName]);
    updateMaxColumnWidth(valuesInColumn, columnName, fieldType)
    setStatefulColumns([...statefulColumns]);

    //SetDataSource([...updatedTableData], false);
    // DataSource.present = { ...updatedTableData }; 
    
    // Update the undo history
    DataSource.past = [...DataSource.past, [...previousTableData]];
    
    props.projectDataTable[currentTableName].data = [...updatedTableData];
    
    // Todo: Add this when a good solution is in place to take care of IsPartOf which
    // is a dependent variable of Subject and TissueSample. Right now, each property is 
    // assumed to be the same across all tables, but IsPartOf is not.
    //metadataOptionMap = updateDependentVariableOptions(tables, currentTableName, matchCol, metadataOptionMap)
    
    postTableData();
  };
  // updateTableData(currentTable.data);

  const updateDependentColumnValues = (tableData, rowIndex, columnName, value) => {

    if (columnName === "Strain") {
      const selectedInstance = STRAIN_INSTANCES.filter((item) => item.name === value)
      tableData[rowIndex]['Species'] = selectedInstance[0].species
    
    } else if (columnName === "Species") {
      const currentStrain = tableData[rowIndex]['Strain']
      const selectedInstance = STRAIN_INSTANCES.filter((item) => item.name === currentStrain)
      if (selectedInstance.length > 0) {
        if (selectedInstance[0].species !== value) {
          tableData[rowIndex]['Strain'] = null
        }
      }
    }     
    return tableData;
  }

  function updateLinkedColumnValues (columnName, newValue, oldValue) {
    // This function updates the values in columns that are linked to the column that was changed.
    // For example, if a row in the column "SubjectGroupID" is changed, then all the values in 
    // the column "IsPartOf in the Subject table that matched the old value of "SubjectGroupID"
    // will be changed to the new value of "SubjectGroupID".

    // Deprecated: Replaced by updateDependentColumnLabels

    // Note: Relies on the global variable tables.
    const linkedColumnInfo = getLinkedColumnInfo(tables);

    if (linkedColumnInfo.map((item) => item.columnName).includes(columnName)) {
      const linkedColumns = linkedColumnInfo.filter((item) => item.columnName === columnName);

      linkedColumns.forEach((linkedColumn) => {
        let tableData = tables[linkedColumn.dependentTableName].data
        
        // Skip if linked table is empty
        if (tableData === null) {
          tableData = []
        }
        
        let columnValues = tableData.map(rowRecord => rowRecord[linkedColumn.dependentColumnName])
        columnValues.forEach((columnValue, index) => {
          if (columnValue === oldValue) {
            tableData[index][linkedColumn.dependentColumnName] = newValue
          }
        })
      })
    }
  }


  function updateLinkedColumnLabels (tableObject, tableName) {
    // This function updates the labels of columns that are linked to items in other tables.
    //
    // For example, if a row in the column "SubjectGroupID" is changed, then all the values in
    // the column "IsPartOf in the Subject table that matched the old value of "SubjectGroupID"
    // will be changed to the new value of "SubjectGroupID".
    //
    // Also, if a subject group is deleted, then all the values in the column "IsPartOf" in the
    // Subject table that matched the deleted subject group will be changed to null.
    //
    // Note: Relies on the global variable tables.

    // Check in table definitions if this table has linked columns.
    if (tables[tableName].dependentVariables) {
      
      // Loop through each linked column
      for (let [columnName, linkInfo] of Object.entries(tables[tableName].dependentVariables)) {

        // Get dependent table name and column name
        const dependentTableName = Object.keys(linkInfo)[0];
        const dependentColumnName = linkInfo[dependentTableName];

        if (tables[dependentTableName].data===null) {
          continue
        }

        // Get values of dependent column and uuids for each of the rows.
        const dependentColumnValues = tables[dependentTableName].data.map((rowRecord) => rowRecord[dependentColumnName])
        const dependentColumnUuids = tables[dependentTableName].data.map((rowRecord) => rowRecord['uuid'])

        // Loop through each row in the table and update labels of linked column
        tableObject.data.forEach((rowRecord, rowIndex) => {
          // Get the value of the linked column
          const linkedColumnValue = rowRecord[columnName]
          const linkedColumnUuid = linkedColumnValue['value'];
          // Get the index of the linked column value in the dependent column
          const dependentColumnIndex = dependentColumnUuids.indexOf(linkedColumnUuid)
          
          if (dependentColumnIndex === -1) {
            // Reset the label and value of the linked column
            tableObject.data[rowIndex][columnName]['label'] = ''
            tableObject.data[rowIndex][columnName]['value'] = null
          } else {
            // Update the label of the linked column
            const dependentColumnLabel = dependentColumnValues[dependentColumnIndex]
            tableObject.data[rowIndex][columnName]['label'] = dependentColumnLabel
          }
        })
      }
    }
  }

  const getLinkedColumnInfo = (tables) => {
    // This function returns a list of objects that contain information about columns 
    // that are linked. Each object contains the name of the table, the name of the column
    // that is linked, and the name of the column that is dependent on the linked column.
    //
    // For example, if the column "SubjectGroupID" in the SubjectGroup table is linked to the
    // column "IsPartOf" in the Subject table, then the object would be:
    // {columnName: "SubjectGroupID", dependentTableName: "Subject", dependentColumnName: "IsPartOf"}

    // Todo: this function could be moved to a utiliy/helper file.
    // It also only needs to run on initialization.

    const linkedColumnInfo = [];
    
    for (let [tableName, tableObject] of Object.entries(tables)) {
      if (tableObject.dependentVariables) {
        for (let [propertyName, linkInfo] of Object.entries(tableObject.dependentVariables)) {

          linkedColumnInfo.push(
            {
              columnName: Object.values(linkInfo)[0],
              dependentTableName: tableName, 
              dependentColumnName: propertyName
            }
          )
        }
      }
    }
    return linkedColumnInfo;
  }

  const updateMaxColumnWidth = (dataValue, matchCol, fieldType) => {
    
    const MIN_WIDTH = 150;
    const MAX_WIDTH = 500;

    function getTextWidth(textList) {
      const offscreenElement = document.createElement('span');
      offscreenElement.style.position = 'absolute';
      offscreenElement.style.visibility = 'hidden';
      offscreenElement.style.whiteSpace = 'nowrap';
      const computedStyle = getComputedStyle(document.body);
      offscreenElement.style.font = computedStyle.font;
      document.body.appendChild(offscreenElement);

      // Get the maximum width of the items in textList
      let maxWidth = 0;
      for (const text of textList) {
        offscreenElement.textContent = text;
        const thisWidth = offscreenElement.offsetWidth;
        if (thisWidth > maxWidth) {
          maxWidth = thisWidth;
        }
      }

      document.body.removeChild(offscreenElement);
      
      return maxWidth;
    }

    let width = getTextWidth(dataValue);

    if (width < MIN_WIDTH) {
      width = MIN_WIDTH;
    }

    if (width > MAX_WIDTH) {
      width = MAX_WIDTH;
    }

    let columnName = statefulColumns.findIndex((item) => item.dataIndex === matchCol);
    let maxColumnWidth = statefulColumns[columnName].maxWidth;

    const tableCellPadding = 30;
    const dropdownPadding = 40;
    const textfieldPadding = 20;

    if (fieldType === 'dropdown') {
      maxColumnWidth = width+tableCellPadding+dropdownPadding;
    } else if (fieldType === 'inputfield') {
      maxColumnWidth = width+tableCellPadding+textfieldPadding;
    } else {
      //pass
    }

    statefulColumns[columnName].width = maxColumnWidth;
    statefulColumns[columnName].maxWidth = maxColumnWidth;
    return statefulColumns
  }

  const columns = statefulColumns.map((col) => {

    if (!col.editable & !col.select) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        rowRecord: record,
        columnName: col.dataIndex,
        columnTitle: col.title,
        isEditable: col.editable,
        isSelectable: col.select,
        type: col.type,
        handleSave,
        metadataOptionMap,
        customOptionList, 
        setCustomOptionList,
        tables
      })
    };
  });

  return (
    <div>
      <ConfigProvider
        children={props.children}
      >

        <OptionsBar />
        <Table
          className="table-striped-rows"
          name="table"
          rowSelection={{
            type: 'checkbox',
            ...rowSelection
          }}
          onRow={() => {
            return {
              onMouseEnter: (event) => {
                // No need to rerender row if mouse enters row (?)
                event.stopPropagation();
                event.preventDefault();
              },
              onMouseLeave: (event) => {
                // No need to rerender row if mouse leaves row (?)
                event.stopPropagation();
                event.preventDefault();
              },
            }
          }}
          components={TABLE_COMPONENTS}
          columns={columns}
          dataSource={presentDS}
          scroll={{ x: '30vh', y: '76vh' }}
          pagination={false} />
      </ConfigProvider>
    </div>
  );
}
