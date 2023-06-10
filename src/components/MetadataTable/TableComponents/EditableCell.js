import React, { useContext, useEffect, useRef, useState } from 'react';
import { Button, Form, Input, Select, Divider, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { EditableContext } from './EditableRow.js';

// Todo: 
//    [ ] isEditable and isSelectable could be combined into one prop
//    [ ] Dropdowns for dependent variables should not have the grouping of options
//    [ ] Dependent variables (dropdown options) should not be updated here.
//    [ ] The dropdown options should be updated in the parent component (MetadataTable.js)
//    [ ] Create more subcomponents

// Questions:
//    - What is the purpose of EditableContext? How does it work?
//    - Should user be allowed to add new dependent variables from a cell dropdown?
//    - Should user be allowed to add new independent variables from a cell dropdown?
//    - Can we combine finishEditCell and saveDropDown?
//    - Why does the select component seem to be inversed with regards to the isEditing state?
//        i.e when isEditing is true, the custom renderer with add item is not needed
  

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
 * @param {Object} props.metadataOptionMap - A map of metadata option groups for each table column.
 * @param {Object} props.customOptionList - The custom option list.
 * @param {Object} props.setCustomOptionList - The function to set the custom option list.
 * @param {Object} props.tables - The tables associated with the cell.
 * @param {...*} props.restProps - Additional props to be spread on the underlying HTML element.
 * @returns {JSX.Element} The rendered component.
 */
export function EditableCell({
  rowRecord, columnName, columnTitle, isEditable, isSelectable, children, handleSave, metadataOptionMap, customOptionList, setCustomOptionList, tables, ...restProps
}) {
  // This component allows cell editing in the MetadataTable component
  // It has an internal state that keeps track of whether the cell is being edited or not
  // If mode is edit, it returns a form item with an input field, otherwise it returns the cell value

  const form = useContext(EditableContext);

  const [isEditing, setIsEditing] = useState(false);
  const [customOptionName, setCustomOptionName] = useState('');

  // inputRef is passed as the ref property to the input field components. 
  // It used to set focus on the selected input field when editing.
  const inputRef = useRef(null);

  useEffect(() => {
    if (isEditing) {
      // Set focus on the input field whenever edit mode is entered
      inputRef.current?.focus();
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
    // Callback that handles adding a custom (user defined) metadata option
    e.preventDefault();

    if (!customOptionName) {return;}

    // Retrieve the current items and definitions based on the columnName
    const items = customOptionList[columnName] || [];

    // Add the new item and definition at the beginning of their respective arrays
    const updatedItems = [customOptionName, ...items];

    // Update the stateful metadata arrays with the new items and definitions
    customOptionList[columnName] = updatedItems;

    // Set the updated stateful metadata arrays
    setCustomOptionList(customOptionList);

    // Reset the input field for a custom dropdown option
    setCustomOptionName('');

    // Set focus back to the input field with a slight delay
    setTimeout(() => {
      inputRef.current?.focus();  // ? is used to prevent an error if inputRef.current is null
    }, 0);
  };

  let childNode = children;

  if (isEditable) {
    childNode = isEditing ? CellInputField(columnName, columnTitle, inputRef, finishEditCell) : CellValueDisplay(children, toggleIsEditing)
  }

  if (isSelectable) {

    //[statefulmetadata, statefulmetadataDefinitions] = updateMetadataOptions(statefulmetadata, statefulmetadataDefinitions, tables, columnName)
    const dropdownOptions = getColumnDropdownOptions(columnName, metadataOptionMap, customOptionList)

    childNode = isEditing ?
      (
        // Allow the user to add new options to a select if missing
        <FormItem name={columnName} title={columnTitle} isRequired={false}>
          <Select
            showSearch
            options={dropdownOptions}
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
          </Select>
          {/* <Input ref={inputRef} onPressEnter={save} onBlur={save} /> */}
        </FormItem>
      ) : (
        <Select
          showSearch
          options={dropdownOptions}
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
              <CustomOptionInput 
                inputRef={inputRef} 
                value={customOptionName} 
                onChange={handleCustomOptionNameChanged}
                onAddItemClick={handleAddNewMetadataOption} 
              />
            </>
          )}
        >
        </Select>
      );
  }

  return <td {...restProps}>{childNode}</td>;
}

// SUBCOMPONENTS

const FormItem = ({children, name, title, isRequired}) => {
  // FormItem is a wrapper component for a form item that is used for cell input field componenets
  const formItemStyle = { margin: 0 };
  const formItemRules = [
    {
      required: isRequired,
      message: `${title} is required.`
    }
  ];

  return (
    <Form.Item name={name} style={formItemStyle} rules={formItemRules}>
      {children}
    </Form.Item>
  )
}


/**
 * CellInputField component for rendering an input field within a table cell.
 *
 * @param {string} columnName - The data index of the cell (This is the same as title)..
 * @param {string} columnTitle - The title of the column.
 * @param {React.Ref} inputRef - The ref object for accessing the input field.
 * @param {Function} handleFinishEditCell - The function to handle finishing the cell editing.
 * @returns {JSX.Element} The rendered component.
 */
const CellInputField = (columnName, columnTitle, inputRef, handleFinishEditCell) => {
  /// This function returns the (editable) input field for a cell
  return (
    <FormItem name={columnName} title={columnTitle} isRequired={false}>
      <Input ref={inputRef} onBlur={handleFinishEditCell} onPressEnter={handleFinishEditCell} />
    </FormItem>
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

const CustomOptionInput = ({inputRef, value, onChange, onAddItemClick}) => {
  // Component where user can add a new option to a dropdown

  return (
    <Space
    style={{
      padding: '0 8px 4px'
    }}
    >
    <Input
      placeholder="Please enter item"
      ref={inputRef}
      value={value}
      onChange={onChange} />
    <Button type="text" icon={<PlusOutlined />} onClick={onAddItemClick}>
      Add item
    </Button>
    </Space>
  )
}


// UTILITY FUNCTIONS

const getColumnDropdownOptions = (columnName, metadataOptionMap, customOptionList) => {
  // This function combines the metadata options with the user defined options
  // for a column and returns the combined list in the format required by the
  // Ant Design Select component for grouping options

  let userDefinedOptions = {}

  if (customOptionList[columnName]) {
    userDefinedOptions = {
      label: 'User defined',
      options: customOptionList[columnName].map((item) => ({
        value: item,
        label: item,
        title: 'A custom option added by the user',
      }))
    }
  }

  let options = []
  if (Object.keys(userDefinedOptions).length !== 0) {
    options.push(userDefinedOptions)
  } 

  if (metadataOptionMap[columnName]) {
    if (metadataOptionMap[columnName].length > 0) {
      options.push(...metadataOptionMap[columnName])
    }
  }

  return options;
}


function updateMetadataOptions(statefulmetadata, statefulmetadataDefinitions, tables, columnName) {

  // This function updates the dropdown options for a column with dependent variables,
  // i.e. isPartOf or DescendedFrom
  // It also makes sure that missing/undefined columns are set to empty arrays

  // Todo: Ask Harry: This seems to be updated at a high rate, maybe we can do this only once or when needed
  // From Harry: 

  const currentTableName = tables.ActiveTableName;

  // Update dropdown options for dependent columns, i.e isPartOf or DescendedFrom
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

  return [statefulmetadata, statefulmetadataDefinitions]
}