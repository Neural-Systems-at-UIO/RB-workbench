import React, { useContext, useEffect, useRef, useState } from 'react';
import { Button, Form, Input, Select, Divider, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { EditableContext } from './EditableRow.js';

// Todo: 
//    [ ] isEditable and isSelectable could be combined into one prop
//    [ ] The statefulmetadata and statefulmetadataDefinitions could be combined into one object
//    [ ] Remove setstatefulmetadata and setstatefulmetadataDefinitions

// Questions:
//    [ ] What is the purpose of EditableContext? How does it work?
  

// Terminology:
//    - Record : An object containing row or cell data represented with key-value pairs

/**
 * EditableCell component for rendering an editable cell in a table.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.rowRecord - The data of the row the cell belongs to in the form of an object with key-value pairs.
 * @param {string} props.columnTitle - The title of the column of the cell.
 * @param {string} props.columnName - The data index of the cell (This is the name of the column in the table)  
 * @param {boolean} props.isEditable - Indicates whether the cell is editable or not.
 * @param {boolean} props.isSelectable - Indicates whether the cell is a dropdown or not.
 * @param {*} props.children - The content to be rendered within the cell (List of [undefined, value])
 * @param {Function} props.handleSave - The function to handle saving the cell data.
 * @param {Object} props.statefulmetadata - The stateful metadata associated with the cell.
 * @param {Object} props.statefulmetadataDefinitions - The definitions of stateful metadata.
 * @param {Function} props.setstatefulmetadata - The function to set the stateful metadata.
 * @param {Function} props.setstatefulmetadataDefinitions - The function to set the definitions of stateful metadata.
 * @param {Object} props.tables - The tables associated with the cell.
 * @param {...*} props.restProps - Additional props to be spread on the underlying HTML element.
 * @returns {JSX.Element} The rendered component.
 */
export function EditableCell({
  rowRecord, columnName, columnTitle, isEditable, isSelectable, children, handleSave, statefulmetadata, statefulmetadataDefinitions, setstatefulmetadata, setstatefulmetadataDefinitions, tables, ...restProps
}) {

  const form = useContext(EditableContext);

  const [isEditing, setIsEditing] = useState(false);
  const [customOptionName, setCustomOptionName] = useState('');

  const inputRef = useRef(null); // Harry: What is this?
  
  const optionsAntd = []; // A list of dropdown options in antdesign format

  useEffect(() => {
    if (isEditing) {
      // Set focus on the input field whenever edit mode is entered
      inputRef.current.focus();
    }
  }, [isEditing]);

  // toggleIsEditing is used to flip the state of the isEditing boolean
  const toggleIsEditing = () => {
    setIsEditing(!isEditing);
    const cellRecord = { [columnName]: rowRecord[columnName] }
    form.setFieldsValue(cellRecord);
  };

  // finishEditCell is called when the user presses enter or clicks outside the cell
  const finishEditCell = async (event) => {
    try {
      const cellRecord = await form.validateFields();
      toggleIsEditing(); // Why is this happening after validating fields???
      handleSave({ ...rowRecord, ...cellRecord });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  const saveDropDown = async (event) => {
    toggleIsEditing();
    try {
      const cellRecord = await form.validateFields();
      handleSave({ ...rowRecord, ...cellRecord }, event, columnName);
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
    setIsEditing(false); // Why, it is already happening in toggleIsEditing?
  };

  const handleCustomOptionNameChanged = (event) => {
    setCustomOptionName(event.target.value);
  };

  const handleAddNewMetadataOption = (e) => {
    e.preventDefault();
    let items = [];
    if (statefulmetadata[columnName]) {
      items = statefulmetadata[columnName];
    }
    let definitions = [];
    if (statefulmetadataDefinitions[columnName]) {
      definitions = statefulmetadataDefinitions[columnName];
    }
    items = [customOptionName, ...items];
    statefulmetadata[columnName] = items;
    const newdefinition = 'A custom option added by the user';
    definitions = [newdefinition, ...definitions];
    statefulmetadataDefinitions[columnName] = definitions;
    setstatefulmetadataDefinitions(statefulmetadataDefinitions);
    setstatefulmetadata(statefulmetadata);
    setCustomOptionName('');
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  let childNode = children;

  if (isEditable) {
    childNode = isEditing ? CellInputField(columnName, columnTitle, inputRef, finishEditCell) : CellValueDisplay(children, toggleIsEditing)
  }


  if (isSelectable) {

    // Todo: Ask Harry: This seems to be updated at a high rate, maybe we can do this only once or when needed
    // From Harry: 
    const currentTableName = tables.ActiveTableName;

    if (tables[currentTableName].dependentVariables[columnName]) {
      const dependentTableName = Object.keys(tables[currentTableName].dependentVariables[columnName])[0];
      const dependentVariableName = tables[currentTableName].dependentVariables[columnName][dependentTableName];
      if (tables[dependentTableName].data !== null) {
        let value = tables[dependentTableName].data.map((row) => row[dependentVariableName]);
        statefulmetadata[columnName] = value;
      }
    }

    // TODO: Do this somewhere else to make sure it is only done once and wherever it is needed
    if (statefulmetadata[columnName] === undefined) {
      statefulmetadata[columnName] = [];
    }

    if (statefulmetadataDefinitions[columnName] === undefined) {
      statefulmetadataDefinitions[columnName] = [];
    }

    for (let i = 0; i < statefulmetadata[columnName].length; i++) {
      const option = (
        <Select
          value={statefulmetadata[columnName][i]}
          title={statefulmetadataDefinitions[columnName][i]}
        >
          {statefulmetadata[columnName][i]}
        </Select>
      );
      optionsAntd.push(option);
    }
    childNode = isEditing
      ? (

        <Form.Item
          style={{
            margin: 0
          }}
          name={columnName}
          rules={[
            {
              required: false,
              message: `${columnTitle} is required.`
            }
          ]}
        >
          {/* allow the user to add new options to a select  if missing */}
          <Select
            showSearch
            optionFilterProp="children"
            placeholder="Select a option..."
            id="selectmain"
            style={{
              width: '100%',
              cursor: 'pointer'
            }}
            ref={inputRef}
            onChange={saveDropDown}
            value={children[1]}
            size={'large'}
            filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
            dropdownMatchSelectWidth={false}
            dropdownRender={(menu) => (
              <>
                {menu}
                <Divider
                  style={{
                    margin: '8px 0'
                  }} />
                <Space
                  width="10px"
                  style={{
                    padding: '0 8px 4px'
                  }}
                >
                  <Input
                    placeholder="Please enter item"
                    ref={inputRef}
                    value={customOptionName}
                    onChange={handleCustomOptionNameChanged} />
                  <Button type="text" icon={<PlusOutlined />} onClick={handleAddNewMetadataOption}>
                    Add item
                  </Button>
                </Space>
              </>
            )}
          >
            {optionsAntd}
          </Select>
          {/* <Input ref={inputRef} onPressEnter={save} onBlur={save} /> */}
        </Form.Item>
      ) : (
        <Select
          showSearch
          optionFilterProp="children"
          placeholder="Select an option..."
          id="select"
          onChange={saveDropDown}
          value={children[1]}
          size={'large'}
          dropdownMatchSelectWidth={false}
          style={{
            width: '100%',
            cursor: 'pointer',
          }}
          filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
          dropdownRender={(menu) => (
            <>
              {menu}
              <Divider
                style={{
                  margin: '8px 0'
                }} />
              <Space
                style={{
                  padding: '0 8px 4px'
                }}
              >
                <Input
                  placeholder="Please enter item"
                  ref={inputRef}
                  value={customOptionName}
                  onChange={handleCustomOptionNameChanged} />
                <Button type="text" icon={<PlusOutlined />} onClick={handleAddNewMetadataOption}>
                  Add item
                </Button>
              </Space>
            </>
          )}
        >
          {optionsAntd}
        </Select>
      );
  }

  return <td {...restProps}>{childNode}</td>;
}

/**
 * CellInputField component for rendering an input field within a table cell.
 *
 * @param {string} columnName - The data index of the cell (This is the same as title).. Todo: Why do we need both??
 * @param {string} columnTitle - The title of the column.
 * @param {React.Ref} inputRef - The ref object for accessing the input field. Todo: Where does this come from? What is it?
 * @param {Function} handleFinishEditCell - The function to handle finishing the cell editing.
 * @returns {JSX.Element} The rendered component.
 */
const CellInputField = (columnName, columnTitle, inputRef, handleFinishEditCell) => {
  /// This function returns the (editable) input field for a cell
  return (
    <Form.Item
      style={{ margin: 0 }}
      name={columnName}
      rules={[
        {
          required: false,
          message: `${columnTitle} is required.`
        }
      ]}
    >
      <Input ref={inputRef} onBlur={handleFinishEditCell} onPressEnter={handleFinishEditCell} />
    </Form.Item>
  )
}

const CellValueDisplay = (children, toggleIsEditing) => {
// Component that displays the value of a cell which is not being edited

  const cellStyle = {
    paddingRight: 24,
    display: "flex",
    alignItems: "center",
  }

  return (
    <div
      className="editable-cell-value-wrap"
      style={cellStyle}
      onClick={toggleIsEditing}
    >
      {children}
    </div>
  )
}
