import { Table, Button, Form, Input, Select, } from 'antd'
// import styled from 'styled-components'
import datasource from './datasource.js'
import './Register.css'
import useUndo from 'use-undo';
import SidePanel from './SidePanel.js'
// import OptionsBar from './options-bar.js'
import metadata from './metadata'
import metadataDefinitions from './metadata-definitions'
import reformattedMetadata from './formatMetadata.js';
// import { render } from '@umijs/deps/compiled/mustache'
import React, { useContext, useEffect, useRef, useState } from 'react';
// const { Title } = Typography
import { Menu, Dropdown, message, Space } from 'antd'
import { DownOutlined } from '@ant-design/icons'
import './options-bar.css'
import { PlusOutlined } from '@ant-design/icons';

import { Divider } from 'antd';
const EditableContext = React.createContext(null);
const { Option } = Select;
let index = 0;
console.log('reformattedMetadata', reformattedMetadata)
function width_calc(column_name, font) {
  var width = column_name.length

  if (typeof font === 'undefined') {
    font = '1.25'
    if (width < 11) {
      width = 11
      font = '1.25'

    }
  }
  else {
    if (width < 11) {
      width = 11
      font = '1.35'

    }
    if (width > 11) {
      font = '1.35'

    }
  }

  var css_value = "calc(" + font + "em * " + width + ")"
  // console.log('css_value', css_value)
  return css_value
}
function width_calc_dropdown(input, font) {

  // console.log('input', input)
  // console.log('font', font)
  var width = input.length
  // console.log('width', width)

  var css_value = "calc(" + font + "em * " + width + ")"
  // console.log('bool', ((parseFloat(font))))
  if ((parseFloat(width) * parseFloat(font)) < 1.25 * 11) {
    // convert string to int
    var width = 11
    var font = '1.25'
  }
  var css_value = "calc(" + font + "em * " + width + ")"

  return css_value
}

const defaultColumns = [
  {
    title: 'OpenMinds Field',
    dataIndex: 'OpenMindsField',
    key: 'OpenMindsField',
    sorter: (a, b) => {
      if (a.Subject == null) {
        return 1;
      }
      if (b.Subject == null) {
        return -1;
      }
      return a.Subject.localeCompare(b.Subject)

    },
    sortDirections: ['descend', 'ascend', 'descend'],
    fixed: true,
    // set the width of the column based on the title
    width: width_calc('OpenMindsField'),
    // fixed: 'left',
    editable: false,
    filters: [
      {
        text: '71717640',
        value: '71717640',
      }]
  },
  
  {
    title: 'Definition',
    dataIndex: 'definition',
    key: 'definition',
    sorter: (a, b) => {
      if (a.Subject == null) {
        return 1;
      }
      if (b.Subject == null) {
        return -1;
      }
      return a.Subject.localeCompare(b.Subject)

    },
    sortDirections: ['descend', 'ascend', 'descend'],
    fixed: true,
    // set the width of the column based on the title
    width: width_calc('definition'),
    // fixed: 'left',
    editable: false,
    filters: [
      {
        text: '71717640',
        value: '71717640',
      }]
  },
  {
    title: 'Options',
    dataIndex: 'Subject',
    key: 'Subject',
    sorter: (a, b) => {
      if (a.Subject == null) {
        return 1;
      }
      if (b.Subject == null) {
        return -1;
      }
      return a.Subject.localeCompare(b.Subject)

    },
    sortDirections: ['descend', 'ascend', 'descend'],
    fixed: true,
    // set the width of the column based on the title
    width: width_calc('Subject'),
    // fixed: 'left',
    editable: false,
    filters: [
      {
        text: '71717640',
        value: '71717640',
      }]
  }



]

var called_api = false;
// a function to get the data from the api and set the state of statefulmetadata

var max_len = {
  Subject: 0,
  BiologicalSex: 0,
  AgeCategory: 0,
  Species: 0,
  Age: 0,
  Weight: 0,
  Strain: 0,
  Pathology: 0,
  Phenotype: 0,
  Handedness: 0,
  Laterality: 0,
  Origin: 0,
  Sampletype: 0

}
var history = []
var sel_rows = []
// var prev_row = null
// var prev_index = null
function App() {
  var count = 0;
  var [statefulColumns, setStatefulColumns] = useState(defaultColumns)

  var [statefulmetadata, setstatefulmetadata] = useState(metadata)
  var [statefulmetadataDefinitions, setstatefulmetadataDefinitions] = useState(metadataDefinitions)



  function handleUndoDS(e) {
    // console.log(prev_row)
    e.preventDefault()

    // undoDataSource()
    // limit size of history
    // DataSource.past = DataSource.past.slice(-15)

  }
  function handleRedoDS(e) {
    e.preventDefault()
    // redoDataSource()

  }


  
  const OptionsBar = () => (
    <div>
      <div style={{ padding: '0 ', textAlign: 'left' }} className='OptionsBar'>


      </div>
      <hr
        style={{
          backgroundColor: '#bfbfbf',
          border: 'none',
          height: '0.15rem'
        }}
      ></hr>
    </div >
  )


  const [selected, setSelected] = useState([]);

  const rowSelection = {
    // uncheck all checkboxes when the table is re-rendered
    selectedRowKeys: selected,


    onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
      setSelected(selectedRows.map((row) => row.key));
      sel_rows = selectedRowKeys

    },
    getCheckboxProps: (record) => {
      // set all checkboxes to true
      return {
        // checked: true
      }

    }

  }
 




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
        statefulmetadata,
        statefulmetadataDefinitions,
        setstatefulmetadata,
        setstatefulmetadataDefinitions
      }),
    };
  });




  return (
    <div>
      <Table
        className='table-striped-rows'
        name='table'
        rowSelection={{
          type: 'checkbox',

          ...rowSelection,
        }}
        // components={components}
        columns={columns}
        // rowClassName={() => 'editable-row'}
        dataSource={reformattedMetadata}
        scroll={{ x: '30vh', y: '76vh' }}
        pagination={false}

      />
    </div >
  )
}



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
    // console.log('dataIndex', dataIndex)
    // console.log('RecorddataIndex', record[dataIndex])
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

    const values = await form.validateFields();

    setEditing(false);
    // change column width to match content


  };
  var options_antd = []


  const [name, setName] = useState('');


  const onNameChange = (event) => {
    setName(event.target.value);
  };


  const addItem = (e) => {
    e.preventDefault();
    var items = statefulmetadata[dataIndex]

    var definitions = statefulmetadataDefinitions[dataIndex]

    items = ([name, ...items]);
    statefulmetadata[dataIndex] = items
    var newdefinition = 'A custom option added by the user'
    definitions = ([newdefinition, ...definitions]);
    statefulmetadataDefinitions[dataIndex] = definitions
    setstatefulmetadataDefinitions(statefulmetadataDefinitions)
    setstatefulmetadata(statefulmetadata)
    setName('');
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


    for (let i = 0; i < statefulmetadata[dataIndex].length; i++) {

      var option = <Option value={statefulmetadata[dataIndex][i]} title={statefulmetadataDefinitions[dataIndex][i]}>{statefulmetadata[dataIndex][i]}</Option>
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
        {/* allow the user to add new options to a select  if missing*/}

        <Select
          showSearch
          optionFilterProp="children"
          placeholder='Select a option...'
          id='selectmain'
          style={{
            width: '100%',
            cursor: 'pointer'
          }}
   

          ref={inputRef} onChange={saveDropDown} value={children[1]} size={'large'}
          filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
          // set select min width based on the longest option
          dropdownMatchSelectWidth={false}
          dropdownRender={(menu) => (
            <>
              {menu}
              <Divider
                style={{
                  margin: '8px 0',
                }}
              />
              <Space
                width='10px'

                style={{
                  padding: '0 8px 4px',

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
      </Form.Item >)
      : (



        <Select showSearch

          optionFilterProp="children"
          placeholder='Select a option...'

          id='select' onChange={saveDropDown} value={children[1]} size={'large'}
          // set select min width based on the longest option
          dropdownMatchSelectWidth={false}
          // set box width 
          style={{
            width: '100%',
            cursor: 'pointer'
          }}
          filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
          // options={options_antd}
          dropdownRender={(menu) => (
            <>
              {menu}
              <Divider
                style={{
                  margin: '8px 0',
                }}
              />
              <Space
                style={{
                  padding: '0 8px 4px',
                }}
              >
                <Input
                  placeholder="Please enter item"
                  ref={inputRef}
                  value={name}
                  onChange={onNameChange}
                  style={{ 'fontSize': '1em' }}
                />
                <Button type="text" icon={<PlusOutlined />} onClick={addItem}>
                  Add item
                </Button>
              </Space>
            </>
          )}
        >

          {options_antd}
        </Select >


      );



  }

  return <td {...restProps}>{childNode}</td>;
};



const FieldSelectorTable = () => (

  <div className='Register'>
    <div style={{ display: 'flex', height: '92.55vh' }}>
      <div
        className='MainPanel'
        style={{
          margin: '-0.7% 0 0 0',
          'clip-path': 'inset(-15.625rem -15.625rem -15.625rem -15.625rem)'
        }}
      >
        <div
          style={{
            padding: '2% 0% 2% 0%',
            margin: '1% 1% 2% 1%',
            'border-radius': '0.9375rem',
            'box-shadow': '0.3125rem 0.5rem 1.5rem 0.3125rem rgba(208, 216, 243, 0.6)',
            height: '90.5vh',
            width: '98vw'
          }}
        >
          {/* <OptionsBar /> */}
          <Form>
            <App></App>
            {/* <Buildtable></Buildtable> */}
          </Form>
        </div>
      </div>
      {/* <SidePanel></SidePanel> */}
    </div>
  </div>
)
export default FieldSelectorTable
