import React, { useContext, useEffect, useRef, useState } from 'react'
import { Table, Button, Form, Input, Select, Space, Divider } from 'antd'
// import styled from 'styled-components'
import '../frontend/styles/Register.css'
// import OptionsBar from './options-bar.js'
import metadata from '../frontend/metadata/metadata'
import metadataDefinitions from '../frontend/metadata/metadata-definitions'
import reformattedMetadata from '../frontend/metadata/formatMetadata.js'

import { PlusOutlined } from '@ant-design/icons'

const EditableContext = React.createContext(null)
const { Option } = Select

function widthCalc (columnName, font) {
  let width = columnName.length

  if (typeof font === 'undefined') {
    font = '1.25'
    if (width < 11) {
      width = 11
      font = '1.25'
    }
  } else {
    if (width < 11) {
      width = 11
      font = '1.35'
    }
    if (width > 11) {
      font = '1.35'
    }
  }

  const cssValue = 'calc(' + font + 'em * ' + width + ')'
  // console.log('cssValue', cssValue)
  return cssValue
}

const defaultColumns = [
  {
    title: 'OpenMinds Field',
    dataIndex: 'OpenMindsField',
    key: 'OpenMindsField',
    sorter: (a, b) => {
      if (a.Subject === null) {
        return 1
      }
      if (b.Subject === null) {
        return -1
      }
      return a.Subject.localeCompare(b.Subject)
    },
    sortDirections: ['descend', 'ascend', 'descend'],
    fixed: true,
    // set the width of the column based on the title
    width: widthCalc('OpenMindsField'),
    // fixed: 'left',
    editable: false,
    filters: [
      {
        text: '71717640',
        value: '71717640'
      }]
  },

  {
    title: 'Definition',
    dataIndex: 'definition',
    key: 'definition',
    sorter: (a, b) => {
      if (a.Subject === null) {
        return 1
      }
      if (b.Subject === null) {
        return -1
      }
      return a.Subject.localeCompare(b.Subject)
    },
    sortDirections: ['descend', 'ascend', 'descend'],
    fixed: true,
    // set the width of the column based on the title
    width: widthCalc('definition'),
    // fixed: 'left',
    editable: false,
    filters: [
      {
        text: '71717640',
        value: '71717640'
      }]
  },
  {
    title: 'Options',
    dataIndex: 'Subject',
    key: 'Subject',
    sorter: (a, b) => {
      if (a.Subject === null) {
        return 1
      }
      if (b.Subject === null) {
        return -1
      }
      return a.Subject.localeCompare(b.Subject)
    },
    sortDirections: ['descend', 'ascend', 'descend'],
    fixed: true,
    // set the width of the column based on the title
    width: widthCalc('Subject'),
    // fixed: 'left',
    editable: false,
    filters: [
      {
        text: '71717640',
        value: '71717640'
      }]
  }

]

// a function to get the data from the api and set the state of statefulmetadata

// var prev_row = null
// var prev_index = null
function App () {
  const statefulColumns = defaultColumns

  const [statefulmetadata, setstatefulmetadata] = useState(metadata)
  const [statefulmetadataDefinitions, setstatefulmetadataDefinitions] = useState(metadataDefinitions)

  const [selected, setSelected] = useState([])
  let selRows = []

  const rowSelection = {
    // uncheck all checkboxes when the table is re-rendered
    selectedRowKeys: selected,

    onChange: (selectedRowKeys, selectedRows) => {
      setSelected(selectedRows.map((row) => row.key))
      selRows = selectedRowKeys
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
      return col
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
      })
    }
  })

  return (
    <div>
      <Table
        className='table-striped-rows'
        name='table'
        rowSelection={{
          type: 'checkbox',

          ...rowSelection
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
  const [form] = Form.useForm()
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  )
}

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
  const [editing, setEditing] = useState(false)

  const inputRef = useRef(null)
  const form = useContext(EditableContext)
  useEffect(() => {
    if (editing) {
      inputRef.current.focus()
    }
  }, [editing])

  const toggleEdit = () => {
    setEditing(!editing)
    // console.log('dataIndex', dataIndex)
    // console.log('RecorddataIndex', record[dataIndex])
    form.setFieldsValue({
      [dataIndex]: record[dataIndex]
    })
  }

  const save = async (event) => {
    try {
      const values = await form.validateFields()
      toggleEdit()
      handleSave({ ...record, ...values })
    } catch (errInfo) {
      console.log('Save failed:', errInfo)
    }
  }

  const saveDropDown = async (event) => {
    toggleEdit()

    try {
      const values = await form.validateFields()

      handleSave({ ...record, ...values }, event, dataIndex)
    } catch (errInfo) {
      console.log('Save failed:', errInfo)
    }

    const values = await form.validateFields()

    setEditing(false)
    // change column width to match content
  }
  const optionsAntd = []

  const [name, setName] = useState('')

  const onNameChange = (event) => {
    setName(event.target.value)
  }

  const addItem = (e) => {
    e.preventDefault()
    let items = statefulmetadata[dataIndex]

    let definitions = statefulmetadataDefinitions[dataIndex]

    items = ([name, ...items])
    statefulmetadata[dataIndex] = items
    const newdefinition = 'A custom option added by the user'
    definitions = ([newdefinition, ...definitions])
    statefulmetadataDefinitions[dataIndex] = definitions
    setstatefulmetadataDefinitions(statefulmetadataDefinitions)
    setstatefulmetadata(statefulmetadata)
    setName('')
    setTimeout(() => {
      inputRef.current?.focus()
    }, 0)
  }

  let childNode = children
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

        )
  }

  if (select) {
    for (let i = 0; i < statefulmetadata[dataIndex].length; i++) {
      const option = <Option value={statefulmetadata[dataIndex][i]} title={statefulmetadataDefinitions[dataIndex][i]}>{statefulmetadata[dataIndex][i]}</Option>
      optionsAntd.push(option)
    }

    childNode = editing ? (
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
                  margin: '8px 0'
                }}
              />
              <Space
                width='10px'

                style={{
                  padding: '0 8px 4px'

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
          {optionsAntd}

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
          // options={optionsAntd}
          dropdownRender={(menu) => (
            <>
              {menu}
              <Divider
                style={{
                  margin: '8px 0'
                }}
              />
              <Space
                style={{
                  padding: '0 8px 4px'
                }}
              >
                <Input
                  placeholder="Please enter item"
                  ref={inputRef}
                  value={name}
                  onChange={onNameChange}
                  style={{ fontSize: '1em' }}
                />
                <Button type="text" icon={<PlusOutlined />} onClick={addItem}>
                  Add item
                </Button>
              </Space>
            </>
          )}
        >

          {optionsAntd}
        </Select >

        )
  }

  return <td {...restProps}>{childNode}</td>
}

const fieldSelectorTable = () => (

  <div className='Register'>
    <div style={{ display: 'flex', height: '92.55vh' }}>
      <div
        className='MainPanel'
        style={{
          margin: '-0.7% 0 0 0',
          clipPath: 'inset(-15.625rem -15.625rem -15.625rem -15.625rem)'
        }}
      >
        <div
          style={{
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
            <App></App>
            {/* <Buildtable></Buildtable> */}
          </Form>
        </div>
      </div>
      {/* <SidePanel></SidePanel> */}
    </div>
  </div>
)
export default fieldSelectorTable
