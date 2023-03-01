import React, { useContext, useEffect, useRef, useState } from 'react';
import { Button, Form, Input, Select, Divider, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { EditableContext } from './MetaDataPage';


export function EditableCell({
  title, editable, children, dataIndex, record, select, handleSave, statefulmetadata, statefulmetadataDefinitions, setstatefulmetadata, setstatefulmetadataDefinitions, tables, ...restProps
}) {
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
      [dataIndex]: record[dataIndex]
    });
  };

  const save = async (event) => {
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

  const optionsAntd = [];
  const [name, setName] = useState('');

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
          <Input ref={inputRef} onBlur={save} onPressEnter={save} />
        </Form.Item>
      )
      : (
        <div
          className="editable-cell-value-wrap"
          style={{
            paddingRight: 24
          }}
          onClick={toggleEdit}
        >
          {children}
        </div>
      );
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
