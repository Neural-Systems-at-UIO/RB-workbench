import React, { useContext, useEffect, useRef, useState } from 'react';
import { Button, Form, Input, Select, Divider, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { EditableContext } from './EditableRow.js';


/**
 * EditableCell component for rendering an editable cell in a table.
 *
 * @param {Object} props - The component props.
 * @param {string} props.title - The title of the cell.
 * @param {boolean} props.editable - Indicates whether the cell is editable or not.
 * @param {*} props.children - The content to be rendered within the cell (List of [undefined, value])
 * @param {string} props.dataIndex - The data index of the cell (This is the name of the column in the table)
 * @param {Object} props.record - The data of the row the cell belongs to.
 * @param {boolean} props.select - Indicates whether the cell is a dropdown or not.
 * @param {Function} props.handleSave - The function to handle saving the cell data.
 * @param {*} props.statefulmetadata - The stateful metadata associated with the cell.
 * @param {*} props.statefulmetadataDefinitions - The definitions of stateful metadata.
 * @param {Function} props.setstatefulmetadata - The function to set the stateful metadata.
 * @param {Function} props.setstatefulmetadataDefinitions - The function to set the definitions of stateful metadata.
 * @param {*} props.tables - The tables associated with the cell.
 * @param {...*} props.restProps - Additional props to be spread on the underlying HTML element.
 * @returns {JSX.Element} The rendered component.
 */
export function EditableCell({
  title, editable, children, dataIndex, record, select, handleSave, statefulmetadata, statefulmetadataDefinitions, setstatefulmetadata, setstatefulmetadataDefinitions, tables, ...restProps
}) {
  
  //console.log('children:', children)
  //console.log('restProps:', restProps)

  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null); // Harry: What is this?
  const form = useContext(EditableContext);
  
  const optionsAntd = []; // A list of dropdown options in antdesign format
  const [name, setName] = useState('');

  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);

  // toggleEdit is used to flip the state of the editing boolean
  const toggleEdit = () => {
    setEditing(!editing);

    form.setFieldsValue({
      [dataIndex]: record[dataIndex]
    });
  };

  // finishEditCell is called when the user presses enter or clicks outside the cell
  const finishEditCell = async (event) => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  const saveDropDown = async (event) => {
    toggleEdit();
    try {
      const values = await form.validateFields();

      handleSave({ ...record, ...values }, event, dataIndex);
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
    setEditing(false);
  };

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
    const newdefinition = 'A custom option added by the user';
    definitions = [newdefinition, ...definitions];
    statefulmetadataDefinitions[dataIndex] = definitions;
    setstatefulmetadataDefinitions(statefulmetadataDefinitions);
    setstatefulmetadata(statefulmetadata);
    setName('');
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? CellInputField(dataIndex, title, inputRef, finishEditCell) : CellValueDisplay(children, toggleEdit)
  }


  if (select) {

    // Todo: Ask Harry: This seems to be updated at a high rate, maybe we can do this only once or when needed
    // From Harry: 
    const currentTableName = tables.ActiveTableName;

    if (tables[currentTableName].dependentVariables[dataIndex]) {
      const dependentTableName = Object.keys(tables[currentTableName].dependentVariables[dataIndex])[0];
      const dependentVariableName = tables[currentTableName].dependentVariables[dataIndex][dependentTableName];
      if (tables[dependentTableName].data !== null) {
        let value = tables[dependentTableName].data.map((row) => row[dependentVariableName]);
        statefulmetadata[dataIndex] = value;
      }
    }

    // TODO: Do this somewhere else to make sure it is only done once and wherever it is needed
    if (statefulmetadata[dataIndex] === undefined) {
      statefulmetadata[dataIndex] = [];
    }

    if (statefulmetadataDefinitions[dataIndex] === undefined) {
      statefulmetadataDefinitions[dataIndex] = [];
    }

    for (let i = 0; i < statefulmetadata[dataIndex].length; i++) {
      const option = (
        <Select
          value={statefulmetadata[dataIndex][i]}
          title={statefulmetadataDefinitions[dataIndex][i]}
        >
          {statefulmetadata[dataIndex][i]}
        </Select>
      );
      optionsAntd.push(option);
    }
    childNode = editing
      ? (

        <Form.Item
          style={{
            margin: 0
          }}
          name={dataIndex}
          rules={[
            {
              required: false,
              message: `${title} is required.`
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
                    value={name}
                    onChange={onNameChange} />
                  <Button type="text" icon={<PlusOutlined />} onClick={addItem}>
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
                  value={name}
                  onChange={onNameChange} />
                <Button type="text" icon={<PlusOutlined />} onClick={addItem}>
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
 * @param {string} dataIndex - The data index of the cell (This is the same as title).. Todo: Why do we need both??
 * @param {string} columnTitle - The title of the column.
 * @param {React.Ref} inputRef - The ref object for accessing the input field. Todo: Where does this come from? What is it?
 * @param {Function} handleFinishEditCell - The function to handle finishing the cell editing.
 * @returns {JSX.Element} The rendered component.
 */
const CellInputField = (dataIndex, columnTitle, inputRef, handleFinishEditCell) => {
  /// This function returns the (editable) input field for a cell
  return (
    <Form.Item
      style={{ margin: 0 }}
      name={dataIndex}
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

const CellValueDisplay = (children, toggleEdit) => {
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
      onClick={toggleEdit}
    >
      {children}
    </div>
  )
}
