import React, { useEffect, useState } from 'react';
import { Table, Button } from 'antd';
import useUndo from 'use-undo';
import ConfigProvider from './ConfigProvider';
import init_tables from '../metadata_new/schemaTables';
import metadata from '../metadata/metadata';
import metadataDefinitions from '../metadata/metadata-definitions';
import { widthCalc, widthCalcDropdown } from '../helpers/widthCalc';
import { convertTableToCSV } from '../helpers/csvAdapter';
import { EditableRow } from './Register';
import { EditableCell } from "./EditableCell";

// Todo: move to separate file for managing tables.
export function MetadataTable(props) {
  var nextTableName = props.nextTableName;
  var selRows = [];
  var history = [];
  // this is weird, how should it be done?
  const [currentTableName, setCurrentTableName] = useState(nextTableName);
  const [tables, setTables] = useState(init_tables);
  const [statefulmetadata, setstatefulmetadata] = useState(metadata);
  const [statefulmetadataDefinitions, setstatefulmetadataDefinitions] = useState(metadataDefinitions);

  useEffect(() => {
    fetch('https://localhost:8080/readTable?project=' + props.project + '&user=' + props.user["http://schema.org/alternateName"])
      .then(response => response.json())
      .then(data => {
        console.log('fetched');
        console.log(data);
        if (data != 'no table') {
          console.log('tables');
          console.log(tables);
          console.log('---------------------');
          console.log('data');
          console.log(data);
          setTables(data);
          setCurrentTableName(data.ActiveTableName);
        }
      });
  }, [props.page]);

  const currentTable = tables[nextTableName];
  const [statefulColumns, setStatefulColumns] = useState(currentTable.columnProps);

  function createBlankRow(rowNumber) {
    if (rowNumber === undefined) {
      rowNumber = 1;
    }
    const newRow = { key: rowNumber.toString() };
    currentTable.variableNames.forEach((name) => { newRow[name] = null; });

    return newRow;
  }

  if (currentTable.data === null) {
    currentTable.data = [createBlankRow()];
  }

  function updateTableData(newData, useCheckpoint) {

    // Ask Harry: What are checkpoints for?
    // If checkpoint is true, the current state is saved in the past array
    if (useCheckpoint === undefined) {
      useCheckpoint = false;
    }

    tables[currentTableName].data = newData;
    SetDataSource(newData, useCheckpoint);

    currentTable.data = newData;
  }

  const [
    DataSource, {
      set: SetDataSource, reset: resetDataSource, undo: undoDataSource, redo: redoDataSource
    }
  ] = useUndo(currentTable.data, { useCheckpoints: true });

  if (currentTableName !== nextTableName) {
    // save current (will be previous) state
    tables[currentTableName].columnProps = statefulColumns;
    tables.ActiveTableName = nextTableName;

    resetDataSource(currentTable.data);

    // save current state??
    setCurrentTableName(nextTableName);
    setStatefulColumns([...currentTable.columnProps]);

  }

  const { present: presentDS } = DataSource;
  let count = presentDS.length;

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
  };

  /**
   * Callback for downloading the table as a CSV file.
   */
  const DownloadCSV = () => {
    // todo: should infer the variable names from the table
    const csvString = convertTableToCSV(presentDS);

    const blob = new Blob([csvString], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', `metadata_${currentTableName.toLowerCase()}_table.csv`);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const postTableData = () => {

    // this will be rewritten as a web socket eventually as its nice to have two way communication
    // also it is insane to post the entire table every time a single value is changed but YOLO
    console.log('reg_project: ', props.project);
    let data = { 'table': tables, 'user': props.user["http://schema.org/alternateName"], 'project': props.project };
    fetch('https://localhost:8080/writeTable', {
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

        console.log('loaded:', newData);

        // Loop through all keys in the tables object and create an array of the data from each table
        Object.keys(tables).forEach((key, index) => {
          console.log('key:', key, 'index:', index);
          if (key !== 'ActiveTableName') {
            tables[key].data = newData[index];
          }
        });

        newData = tables[currentTableName].data;
        updateTableData(newData);
      };
    };
    input.click();
  };

  const handleDelete = () => {
    let temp_ = presentDS;
    for (let i = 0; i < selRows.length; i++) {
      temp_ = temp_.filter((item) => item.key !== selRows[i]);
    }

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
   * @param {Object} row - The data for the row that was changed.
   * @param {Object} event - The new value which is being set. Should be renamed to newValue. This is only relevant for dropdowns.
   * @param {String} dataIndex - The name of the column that was changed.
   *
   */
  const handleSave = (row, event, dataIndex) => {
    const OldData = [...presentDS];
    const index = OldData.findIndex((item) => row.key === item.key);
    const item = OldData[index];

    const originalData = { ...row };

    const columns = Object.keys(row);
    // regex for newline,  any number of spaces, newline
    for (const key in Object.keys(row)) {
      const id = columns[key];
      if (row[id] !== item[id]) {
        var matchCol = id;
        var matchValue = row[id];
        originalData[matchCol] = item[id];
        OldData.splice(index, 1, { ...item, ...row });
      }
    }
    if (typeof event !== 'undefined') {
      matchCol = dataIndex;
      matchValue = event;
      var tempRow = OldData[index];
      tempRow[matchCol] = matchValue;

      OldData.splice(index, 1, { ...tempRow });
    }

    if (selRows.includes(row.key)) {
      for (const i in selRows) {
        tempRow = OldData[selRows[i] - 1];
        tempRow[matchCol] = matchValue;

        OldData.splice(selRows[i] - 1, 1, { ...tempRow });
      }
    }

    // Adjust width of column if necessary
    let matchColIndex = columns.indexOf(matchCol);
    matchColIndex = matchColIndex - 1; // subtract 1 for the key column

    const matchValueType = typeof matchValue;

    let maxColumnWidth = statefulColumns[matchColIndex].maxWidth;

    if (matchValueType === 'number') {
      matchValue = metadata[matchCol][matchValue];

      if (matchValue.length > maxColumnWidth) {
        maxColumnWidth = matchValue.length;
        statefulColumns[matchColIndex].width = widthCalcDropdown(
          matchValue,
          '0.82'
        );
      }

    } else {
      if (matchValue.length > maxColumnWidth) {
        maxColumnWidth = matchValue.length;
        statefulColumns[matchColIndex].width = widthCalc(
          matchValue,
          '1.25'
        );
      }
    }

    statefulColumns[matchColIndex].maxWidth = maxColumnWidth;

    setStatefulColumns([...statefulColumns]);

    SetDataSource([...OldData], false); // Todo: Rename oldData to newData?


    // Ask Harry: What happens here? Related to updating many rows at once?
    DataSource.present = { ...OldData };
    const tempData = [...OldData];
    tempData[index] = { ...originalData };

    const tempDataValues = [];
    const tempDataKeys = [];
    for (const i in tempData) {
      tempDataValues.push([...Object.values(tempData[i])]);
      tempDataKeys.push([...Object.keys(tempData[i])]);
    }

    const tempDataObj = [];
    for (const i in tempDataValues) {
      const tempObj = {};
      for (const j in tempDataValues[i]) {
        tempObj[tempDataKeys[i][j]] = tempDataValues[i][j];
      }
      tempDataObj.push(tempObj);
    }
    history = [...history, tempDataObj];
    DataSource.past = [...DataSource.past, [...tempDataObj]];

    tables[currentTableName].data = [...OldData];
    postTableData();
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell
    }
  };
  const columns = statefulColumns.map((col) => {
    if (!col.editable & !col.select) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        select: col.select,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
        statefulmetadata,
        statefulmetadataDefinitions,
        setstatefulmetadata,
        setstatefulmetadataDefinitions,
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
          components={components}
          columns={columns}
          dataSource={presentDS}
          scroll={{ x: '30vh', y: '76vh' }}
          pagination={false} />
      </ConfigProvider>
    </div>
  );
}
