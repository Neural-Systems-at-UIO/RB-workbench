import React, { useContext, useEffect, useRef, useState } from "react";
import { Table, Button, Form, Input, Select, Divider, Layout, Space } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import useUndo from "use-undo";

// Import custom components

import SidePanelLeft from "./sidebar/SidePanelLeft" 
import ConfigProvider from './ConfigProvider';
//import EditableRow from "./table/EditableRow";    // Todo move to separate file??
//import EditableCell from "./table/EditableCell";  // Todo move to separate file??

import datasource from "../metadata/datasource.js";
import "../styles/Register.css";
import "../styles/options-bar.css";
import metadata from "../metadata/metadata";
import metadataDefinitions from "../metadata/metadata-definitions";

import { width_calc, width_calc_dropdown } from "../helpers/width_calc";
import { convertTableToCSV, convertCSVToTable } from "../helpers/csvAdapter";

import subjectTableColumns, { max_len_sub } from "../metadata/defaultTableColumns/subjectColumns";
import tissueTableColumns, { max_len_ts } from "../metadata/defaultTableColumns/tissueSampleColumns";
import subjectGroupTableColumns, { max_len_sg } from "../metadata/defaultTableColumns/subjectGroupColumns";
import tscTableColumns, { max_len_tsc } from "../metadata/defaultTableColumns/tissueSampleCollectionColumns";

// Create a table context to pass to the table components
var tables = {
  Subject: {
    columnProps: subjectTableColumns,
    variableNames: subjectTableColumns.map( (column) => column.key ),  // key or dataIndex?
    maxColumnLength: max_len_sub,
    data: null
  },
  SubjectGroup : {
    columnProps: subjectGroupTableColumns,
    variableNames: subjectGroupTableColumns.map( (column) => column.key ),  // key or dataIndex?
    maxColumnLength: max_len_sg,
    data: null
  },
  TissueSample: {
    columnProps: tissueTableColumns,
    variableNames: tissueTableColumns.map( (column) => column.key ),  // key or dataIndex?
    maxColumnLength: max_len_ts,
    data: null
  }, 
  TissueSampleCollection: {
    columnProps: tscTableColumns,
    variableNames: tissueTableColumns.map( (column) => column.key ),  // key or dataIndex?
    maxColumnLength: max_len_tsc,
    data: null
  }, 

}; // Use context???


const { Header, Content, Footer, Sider } = Layout;
// const EditableContext = React.createContext(null);
const { Option } = Select;

var max_len = null;
let history = [];
let sel_rows = [];


// Todo: move to separate file for managing tables.
function MetadataTable( {nextTableName} ) {

  // this is weird,how should it be done?
  const [currentTableName, setCurrentTableName] = useState( nextTableName );
  var currentTable = tables[nextTableName];
  
  const [statefulColumns, setStatefulColumns] = useState(currentTable.columnProps);
  const [statefulmetadata, setstatefulmetadata] = useState(metadata);
  const [statefulmetadataDefinitions, setstatefulmetadataDefinitions] = useState(metadataDefinitions);

  function createBlankRow(rowNumber) {
    if (rowNumber === undefined) {
      rowNumber = 1;
    }
    let newRow = { key: rowNumber.toString() };
    currentTable.variableNames.forEach( (name) => newRow[name] = null );
    return newRow;
  }

  if ( currentTable.data === null ) {
    currentTable.data = [createBlankRow()];
  }

  var [
    DataSource,
    {
      set: SetDataSource,
      reset: resetDataSource,
      undo: undoDataSource,
      redo: redoDataSource,
    },
  ] = useUndo(currentTable.data, { useCheckpoints: true });

  if (currentTableName !== nextTableName) {

    // save current (will be previous) state
    tables[currentTableName].columnProps = statefulColumns;
    tables[currentTableName].maxColumnLength = max_len;

    resetDataSource(currentTable.data);
    
    // save current state??
    setCurrentTableName(nextTableName);
    setStatefulColumns([...currentTable.columnProps]);
  }

  const { present: presentDS } = DataSource;
  var count = presentDS.length;
  max_len = currentTable.maxColumnLength;


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
    let newRow = createBlankRow(count);
    SetDataSource([...presentDS, newRow], true);
  };

  /**
   * Callback for duplicating a row in the table.
   */
  const handleDuplicate = () => {

    // Increment the row counter
    count += 1;

    var newDS = [...presentDS];
    for (let i = 0; i < sel_rows.length; i++) {
      const new_row = JSON.parse(JSON.stringify(newDS[sel_rows[i] - 1]));
      new_row.key = count.toString();

      var newDS = [...newDS, new_row];
      count += 1;
    }
    SetDataSource(newDS, true);
  };

  /**
   * Callback for downloading the table as a CSV file.
   */
  const DownloadCSV = () => {
    console.log('csv')
    // todo: should infer the variable names from the table
    let csvString = convertTableToCSV(presentDS);

    const blob = new Blob([csvString], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement("a");
    a.setAttribute("hidden", "");
    a.setAttribute("href", url);
    a.setAttribute("download", `metadata_${currentTableName.toLowerCase()}_table.csv`);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const DownloadJSon = () => {
    console.log('json')

    const blob = new Blob([JSON.stringify(presentDS)], {type: "data:text/json;charset=utf-8"});
    const url = URL.createObjectURL(blob);
    
    const b = document.createElement("b");
    b.setAttribute("hidden", "");
    b.setAttribute("href", url);
    b.setAttribute("download", `metadata_${currentTableName.toLowerCase()}_table.json`);
    document.body.appendChild(b);
    b.click();
    document.body.removeChild(b);
  };

  const download = () => {
    DownloadJSon()
    DownloadCSV()
  }

    
  /**
   * Callback for uploading a table from a CSV file.
   */
  const UploadCSV = () => {
    
    const input = document.createElement("input");
    input.type = "file";
    
    input.onclick = function () {
      this.value = null;
    };

    console.log('input', input)

    input.onchange = (e) => {
      
      const file = input.files[0];

      const reader = new FileReader();
      reader.readAsText(file, "UTF-8");

      reader.onload = (readerEvent) => {
        const content = readerEvent.target.result;
        console.log('content', content)
        // let new_data = convertCSVToTable(content);
        // convert to JSON
        let new_data = JSON.parse(content);
        SetDataSource(new_data);
      };
    };
    input.click();
  };

  const handleDelete = () => {
    let temp_ = presentDS;
    for (var i = 0; i < sel_rows.length; i++) {
      temp_ = temp_.filter((item) => item.key !== sel_rows[i]);
    }

    for (var i = 0; i < temp_.length; i++) {
      temp_[i].key = (i + 1).toString();
    }

    sel_rows = [];

    const checkboxes = document.getElementsByClassName("ant-checkbox-input");
    for (var i = 0; i < checkboxes.length; i++) {
      checkboxes[i].checked = false;
      checkboxes[i].dispatchEvent(new Event("change", { bubbles: true }));
    }

    SetDataSource(temp_);
    setSelected([]);
  };
  
  const OptionsBar = () => (
    <div>
      <div style={{ padding: "0 ", textAlign: "left" }} className="OptionsBar">
        <Button onClick={handleAdd}>Add</Button>
        <Button onClick={handleUndoDS}>Undo</Button>
        <Button onClick={handleRedoDS}>Redo</Button>
        <Button onClick={handleDuplicate}>Duplicate Selected</Button>
        <Button onClick={DownloadCSV}>Download CSV</Button>
        {/* <Button onClick={DownloadJSon}>Download CSV</Button> */}
        <Button onClick={UploadCSV}>Upload CSV</Button>
        <Button onClick={handleDelete} type="default" danger>Delete</Button>
        {/* {{ add_button }} */}
      </div>
      <hr
        style={{
          backgroundColor: "#bfbfbf",
          border: "none",
          height: "0.15rem",
        }}
      ></hr>
    </div>
  );

  const [selected, setSelected] = useState([]); // selected rows
  const rowSelection = {
    selectedRowKeys: selected,
    onChange: (selectedRowKeys, selectedRows) => {
      setSelected(selectedRows.map((row) => row.key));

      sel_rows = selectedRowKeys;
    },
    getCheckboxProps: (record) => {
      return {};
    },
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

    const original_data = { ...row };
    const columns = Object.keys(row);
    //regex for newline,  any number of spaces, newline

    for (const key in Object.keys(row)) {
      const id = columns[key];
      if (row[id] !== item[id]) {
        var match_col = id;
        var match_value = row[id];
        original_data[match_col] = item[id];
        OldData.splice(index, 1, { ...item, ...row });
      }
    }
    if (typeof event !== "undefined") {
      match_col = dataIndex;
      match_value = event;
      var temp_row = OldData[index];
      temp_row[match_col] = match_value;

      OldData.splice(index, 1, { ...temp_row });
    }

    if (sel_rows.includes(row.key)) {
      for (var i in sel_rows) {
        temp_row = OldData[sel_rows[i] - 1];
        temp_row[match_col] = match_value;

        OldData.splice(sel_rows[i] - 1, 1, { ...temp_row });
      }
    }


    // Adjust width of column if necessary
    let match_col_index = columns.indexOf(match_col);
    match_col_index = match_col_index - 1; // subtract 1 for the key column

    const match_value_type = typeof match_value;

    if (match_value_type == "number") {
      match_value = metadata[match_col][match_value];

      if (match_value.length > max_len[match_col]) {
        max_len[match_col] = match_value.length;
        statefulColumns[match_col_index].width = width_calc_dropdown(
          match_value,
          "0.82"
        );
      }
    } else {
      if (match_value.length > max_len[match_col]) {
        max_len[match_col] = match_value.length;
        statefulColumns[match_col_index].width = width_calc(
          match_value,
          "1.25"
        );
      }
    }

    setStatefulColumns([...statefulColumns]);

    SetDataSource([...OldData], false);

    DataSource.present = { ...OldData };
    const temp_data = [...OldData];
    temp_data[index] = { ...original_data };

    const temp_data_values = [];
    const temp_data_keys = [];
    for (var i in temp_data) {
      temp_data_values.push([...Object.values(temp_data[i])]);
      temp_data_keys.push([...Object.keys(temp_data[i])]);
    }

    const temp_data_obj = [];
    for (var i in temp_data_values) {
      const temp_obj = {};
      for (const j in temp_data_values[i]) {
        temp_obj[temp_data_keys[i][j]] = temp_data_values[i][j];
      }
      temp_data_obj.push(temp_obj);
    }
    history = [...history, temp_data_obj];
    DataSource.past = [...DataSource.past, [...temp_data_obj]];

    tables[currentTableName].data = [...OldData];    
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
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
      }),
    };
  });

  return (
    <div>
      <ConfigProvider>

        <OptionsBar />
        <Table
          className="table-striped-rows"
          name="table"
          rowSelection={{
            type: "checkbox",
            ...rowSelection,
          }}
          components={components}
          columns={columns}
          dataSource={presentDS}
          scroll={{ x: "30vh", y: "76vh" }}
          pagination={false}
        />
      </ConfigProvider>
    </div>
  );
}

// Todo: Remove?
function fetch_api() {
  let return_data;
  const data = fetch("/print_statement", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
  })
    .then((response) => response.json())
    .then((data) => {
      return_data = data;
    })

    .catch((error) => {
      console.error("Error:", error);
    });
}
const EditableContext = React.createContext(null);

const EditableRow = ({ index, ...props }) => {
    const [form] = Form.useForm();
    return (
      <Form form={form} component={false}>
        <EditableContext.Provider value={form}>
          <tr {...props} />
        </EditableContext.Provider>
      </Form>
    );
};

const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  select,
  handleSave,
  statefulmetadata,
  statefulmetadataDefinitions,
  setstatefulmetadata,
  setstatefulmetadataDefinitions,
  ...restProps
}) => {

  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);

    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };

  const save = async (event) => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log("Save failed:", errInfo);
    }
  };

  const saveDropDown = async (event) => {
    toggleEdit();
    try {
      const values = await form.validateFields();

      handleSave({ ...record, ...values }, event, dataIndex);
    } catch (errInfo) {
      console.log("Save failed:", errInfo);
    }
    setEditing(false);
  };

  const options_antd = [];
  const [name, setName] = useState("");

  const onNameChange = (event) => {
    setName(event.target.value);
  };

  const addItem = (e) => {
    e.preventDefault();
    let items = [];
    if (statefulmetadata[dataIndex]) {
      items = statefulmetadata[dataIndex];
    }
    let definitions = [];
    if (statefulmetadataDefinitions[dataIndex]) {
      definitions = statefulmetadataDefinitions[dataIndex];
    }
    items = [name, ...items];
    statefulmetadata[dataIndex] = items;
    const newdefinition = "A custom option added by the user";
    definitions = [newdefinition, ...definitions];
    statefulmetadataDefinitions[dataIndex] = definitions;
    setstatefulmetadataDefinitions(statefulmetadataDefinitions);
    setstatefulmetadata(statefulmetadata);
    setName("");
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  let childNode = children;
  
  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={[
          {
            required: false,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onBlur={save} onPressEnter={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 24,
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  if (select) {

    // TODO: Do this somewhere else to make sure it is only done once and wherever it is needed
    if (statefulmetadata[dataIndex] === undefined) {
      statefulmetadata[dataIndex] = [];
    }
    if (statefulmetadataDefinitions[dataIndex] === undefined) {
      statefulmetadataDefinitions[dataIndex] = [];
    }

    for (let i = 0; i < statefulmetadata[dataIndex].length; i++) {
      const option = (
        <Option
          value={statefulmetadata[dataIndex][i]}
          title={statefulmetadataDefinitions[dataIndex][i]}
        >
          {statefulmetadata[dataIndex][i]}
        </Option>
      );
      options_antd.push(option);
    }
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={[
          {
            required: false,
            message: `${title} is required.`,
          },
        ]}
      >
        {/* allow the user to add new options to a select  if missing */}
        <Select
          showSearch
          optionFilterProp="children"
          placeholder="Select a option..."
          id="selectmain"
          style={{
            width: "100%",
            cursor: "pointer",
          }}
          ref={inputRef}
          onChange={saveDropDown}
          value={children[1]}
          size={"large"}
          filterOption={(input, option) =>
            option.children.toLowerCase().includes(input.toLowerCase())
          }
          dropdownMatchSelectWidth={false}
          dropdownRender={(menu) => (
            <>
              {menu}
              <Divider
                style={{
                  margin: "8px 0",
                }}
              />
              <Space
                width="10px"
                style={{
                  padding: "0 8px 4px",
                }}
              >
                <Input
                  placeholder="Please enter item"
                  ref={inputRef}
                  value={name}
                  onChange={onNameChange}
                />
                <Button type="text" icon={<PlusOutlined />} onClick={addItem}>
                  Add item
                </Button>
              </Space>
            </>
          )}
        >
          {options_antd}
        </Select>
        {/* <Input ref={inputRef} onPressEnter={save} onBlur={save} /> */}
      </Form.Item>
    ) : (
      <Select
        showSearch
        optionFilterProp="children"
        placeholder="Select a option..."
        id="select"
        onChange={saveDropDown}
        value={children[1]}
        size={"large"}
        dropdownMatchSelectWidth={false}
        style={{
          width: "100%",
          cursor: "pointer",
        }}
        filterOption={(input, option) =>
          option.children.toLowerCase().includes(input.toLowerCase())
        }
        dropdownRender={(menu) => (
          <>
            {menu}
            <Divider
              style={{
                margin: "8px 0",
              }}
            />
            <Space
              style={{
                padding: "0 8px 4px",
              }}
            >
              <Input
                placeholder="Please enter item"
                ref={inputRef}
                value={name}
                onChange={onNameChange}
                style={{ fontSize: "1em" }}
              />
              <Button type="text" icon={<PlusOutlined />} onClick={addItem}>
                Add item
              </Button>
            </Space>
          </>
        )}
      >
        {options_antd}
      </Select>
    );
  }
  return <td {...restProps}>{childNode}</td>;
};

const MetadataPage = () => {
  
  const [currentTableName, setCurrentTableName] = useState("Subject");

  const handleSelectTable = (selectedTableName) => {
    setCurrentTableName(selectedTableName)
  };

  return(
    <Layout className = "metadata-page-container" style={{  'backgroundColor': '#f8fafb', minHeight: '92.55vh'}}>

      <SidePanelLeft onButtonClick={handleSelectTable}></SidePanelLeft>
      <Layout className="table-container" style={{  'backgroundColor': '#f8fafb'}}>
        
        {/* Container holding table */}
        <Content style={{ }}
            // style={{
            //   margin: '0 16px',
            // }}
          >
          <div
            className='MainPanel'
            style={{
              // required
              // borderRadius: '0 0 0 0', // required
              // borderRadius: '1.5625rem 0   0 1.5625rem',

              // padding: '2% 1% 1% 1%',
              // margin: '1% 1% 2% 1%'
              margin: '-0.7% 0 0 0',
              // boxShadow: '0.4375rem 1.5625rem 1.75rem 0.375rem rgba(1, 1, 2, 0.6)',

              clipPath: 'inset(-15.625rem -15.625rem -15.625rem -15.625rem)'
            }}
          >
            <div
              style={{
                // outline: '0.3125rem solid black',
                padding: '2% 0% 2% 0%',
                margin: '1% 1% 2% 1%',
                borderRadius: '0.9375rem',
                boxShadow: '0.3125rem 0.5rem 1.5rem 0.3125rem rgba(208, 216, 243, 0.6)',
                height: '90.5vh',
                width: '98vw'
              }}
            >
              {/* <OptionsBar /> */}
              <Form>
                <MetadataTable nextTableName={currentTableName}></MetadataTable>
                {/* <Buildtable></Buildtable> */}
              </Form>
            </div>
          </div>
          {/* <SidePanel></SidePanel> */}
          </Content>
      </Layout>

  {/* </div> */}
  </Layout>
)
}

export default MetadataPage;
