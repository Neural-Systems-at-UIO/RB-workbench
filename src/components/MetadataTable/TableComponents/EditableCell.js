import React, { useContext, useEffect, useRef, useState } from 'react';
import { Button, Form, Input, InputNumber, Select, Divider, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { EditableContext } from './EditableRow.js';

import STRAIN_INSTANCES from '../../../metadata/strainInstances'; // Global variable


// Todo: 
//    [ ] isEditable and isSelectable could be combined into one prop
//    [ ] Dropdowns for dependent variables should not have the grouping of options
//    [ ] Dependent variables (dropdown options) should not be updated here.
//    [ ] The dropdown options should be updated in the parent component (MetadataTable.js)
//    [ ] Create more subcomponents
//    [ ] Is the isEditing logic needed for the dropdown. It appears not to be.

// Questions:
//    - What is the purpose of EditableContext? How does it work?
//    - Should user be allowed to add new dependent variables from a cell dropdown?
//    - Should user be allowed to add new independent variables from a cell dropdown?
//    - Can we combine finishEditCell and onDropdownValueChanged?
//    - Why does the select component seem to be inversed with regards to the isEditing state?
//        i.e when isEditing is true, the custom renderer with "add item" is not needed
//        Possible answer: When a dropdown is folded, it needs a render method, but when 
//        it is open and waiting to be closed, it does not need a render method.
//    - This seem to happen on all mouse events, but only needs to happen on clicks?
  
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
  rowRecord, columnName, columnTitle, isEditable, isSelectable, type, children, handleSave, metadataOptionMap, customOptionList, setCustomOptionList, tables, ...restProps
}) {
  // This component allows cell editing in the MetadataTable component
  // It has an internal state that keeps track of whether the cell is being edited or not
  // If mode is edit, it returns a form item with an input field, otherwise it returns the cell value
  //console.log(tables)

  //console.log(columnName, '(value)', children)

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
      
      const rowKey = rowRecord.key;
      const newValue = cellRecord[columnName];
      const oldValue = rowRecord[columnName];
      
      if (newValue === oldValue) {return;} // Do nothing if the value has not changed

      handleSave(rowKey, columnName, newValue, oldValue, 'inputfield')
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  const onDropdownValueChanged = async (newValue) => {
    // This function is different from finishEditCell by design.
    // We don't know why, but found through observation that it is needed.
    toggleIsEditing();
    try {
      //const cellRecord = await form.validateFields(); // This is empty, why is it needed?
      
      const rowKey = rowRecord.key;
      const oldValue = rowRecord[columnName];

      // This is a hack to make sure that the value is not an object 
      // with a label and value property unless it is a dependent variable
      if (newValue['value'] === newValue['label']) {
        newValue = newValue['value'];
      } else {
        newValue = {'value': newValue['value'], 'label': newValue['label']};
      }

      handleSave(rowKey, columnName, newValue, oldValue, 'dropdown')
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
    childNode = isEditing ? CellInputField(columnName, columnTitle, type, inputRef, finishEditCell) : CellValueDisplay(children, toggleIsEditing)
  }

  if (isSelectable) {

    // Todo: Update this on table rerender. (It does not have to be done for every row, just once per table)
    metadataOptionMap = updateMetadataOptions(metadataOptionMap, tables, columnName)
    
    const filteredOptionMap = filterMetadataOptions(columnName, metadataOptionMap, rowRecord)

    // Todo: Update this on table rerender.
    const dropdownOptions = getColumnDropdownOptions(columnName, filteredOptionMap, customOptionList)
    //const dropdownValue = children[1] || '' // This did not work for cells with an object, i.e {value: '...', label: '...'}
    const dropdownValue = rowRecord[columnName] || ''
    const selectStyle = {width: '100%', cursor: 'pointer'}

    childNode = isEditing ?
      (
        // Allow the user to add new options to a select if missing
        <FormItem name={columnName} title={columnTitle} isRequired={false}>
          <Select
            labelInValue // This is needed to get both the value and label from the selected option on change
            showSearch
            options={dropdownOptions}
            optionFilterProp="label"
            filterOption={(input, option) => option.label.toLowerCase().includes(input.toLowerCase())}
            placeholder="Select an option..."
            id="selectmain"
            style={selectStyle}
            ref={inputRef}
            onChange={onDropdownValueChanged}
            value={dropdownValue}
            //dropdownMatchSelectWidth={false} // This is causing dropdown with many options to be very slow
            dropdownRender={(menu) => (
              <>
                {menu}
                <Divider style={{margin: '.5rem 0'}} />
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
          {/* <Input ref={inputRef} onPressEnter={save} onBlur={save} /> */}
        </FormItem>
      ) : (
        <Select
          labelInValue // This is needed to get both the value and label from the selected option on change
          showSearch
          options={dropdownOptions}
          optionFilterProp="label"
          filterOption={(input, option) => option.label.toLowerCase().includes(input.toLowerCase())}
          placeholder="Select an option..."
          id="select"
          onChange={onDropdownValueChanged}
          value={dropdownValue}
          //dropdownMatchSelectWidth={false} // This is causing dropdown with many options to be very slow
          style={selectStyle}
          dropdownStyle={{width: '31.25rem', minWidth:"31.25rem"}}
          dropdownRender={(menu) => (
            <>
              {menu}
              <Divider style={{margin: '.5rem 0'}} />
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
  //&&&to do:add extra field for isnumeric
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
const CellInputField = (columnName, columnTitle, type, inputRef, handleFinishEditCell) => {
  /// This function returns the (editable) input field for a cell
  if (type=='input'){
    return (
    <FormItem name={columnName} title={columnTitle} isRequired={false}>
      <Input ref={inputRef} onBlur={handleFinishEditCell} onPressEnter={handleFinishEditCell} />
      </FormItem>
      )
    }
  else if (type=='inputNumber'){
    return (
    <FormItem name={columnName} title={columnTitle} isRequired={false}>
      <InputNumber ref={inputRef} onBlur={handleFinishEditCell} onPressEnter={handleFinishEditCell} />
      </FormItem>
      )
    }
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
      padding: '0 .5rem .25rem'
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

function updateMetadataOptions(metadataOptionMap, tables, columnName) {

  // This function updates the dropdown options for a column with dependent variables,
  // i.e. isPartOf or DescendedFrom
  // It also makes sure that missing/undefined columns are set to empty arrays

  const currentTableName = tables.ActiveTableName;

  // Update dropdown options for dependent columns, i.e isPartOf or DescendedFrom
  if (tables[currentTableName].dependentVariables[columnName]) {
    const dependentTableName = Object.keys(tables[currentTableName].dependentVariables[columnName])[0];
    const dependentVariableName = tables[currentTableName].dependentVariables[columnName][dependentTableName];
    if (tables[dependentTableName].data !== null) {
      let value = tables[dependentTableName].data.map((row) => row[dependentVariableName]);
      let uuid = tables[dependentTableName].data.map((row) => row['uuid']);

      metadataOptionMap[columnName] = [
        {
          label: dependentTableName, 
          //use map with index to get the uuid
          options: value.map((item, index) => {
            // if name is an object, get the value property
            return {
              value: uuid[index],
              label: item,
            }
          })
        }
      ];
    } else {
      metadataOptionMap[columnName] = [];
    }
  }
  return metadataOptionMap
}

function filterMetadataOptions(columnName, metadataOptionMap, rowRecord) {
  // This function filters the metadata options for the strain column so that only
  // strains that are compatible with the selected species are shown

  if (columnName === 'Strain') {
    
    // Get the selected species
    const species = rowRecord['Species']
    
    if (species) { // Only update if a species is selected

      // Reduce the strain instance list to only include strains that are compatible with the selected species
      const strainsKeep = STRAIN_INSTANCES.reduce((acc, strain) => {
        if (strain['species'] === species) {
          acc.push(strain)
        }
        return acc
      }, [])

      // Update the strain dropdown options in the ant-design group format
      let filteredOptionMap = {...metadataOptionMap}
      filteredOptionMap['Strain'] = [{
        label: `Strain (${species})`,
        options: strainsKeep.map((strain) => {
          return {
            value: strain['name'],
            label: strain['name'],
            title: strain['definition']
          }
        })
      }] 
      return filteredOptionMap;
    } else {
      return metadataOptionMap;
    }
  } else {
    // If it is not species or strain, just use the metadata options
    return metadataOptionMap;
  }
}