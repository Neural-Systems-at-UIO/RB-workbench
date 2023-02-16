import React, { useContext, useEffect, useRef, useState } from 'react'
import { Table, Button, Form, Input, Select, Divider, Layout, Space } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

import useUndo from 'use-undo'

// Import custom components

import SidePanelLeft from './sidebar/SidePanelLeft'
import ConfigProvider from './ConfigProvider'
// import EditableRow from "./table/EditableRow";    // Todo move to separate file??
// import EditableCell from "./table/EditableCell";  // Todo move to separate file??

import '../styles/options-bar.css'
import metadata from '../metadata/metadata'
import metadataDefinitions from '../metadata/metadata-definitions'

import { widthCalc, widthCalcDropdown } from '../helpers/widthCalc'
import { convertTableToCSV } from '../helpers/csvAdapter'

import subjectTableColumns from '../metadata/defaultTableColumns/subjectColumns'
import tissueTableColumns from '../metadata/defaultTableColumns/tissueSampleColumns'
import subjectGroupTableColumns from '../metadata/defaultTableColumns/subjectGroupColumns'
import tscTableColumns from '../metadata/defaultTableColumns/tissueSampleCollectionColumns'



import '../styles/Register.css'



// Create a table context to pass to the table components
// Todo: move to separate file for managing tables.
// Todo: Add special properties to keep track of ids/column variables 
//       that are used across tables.
const tables = {
  Subject: {
    columnProps: subjectTableColumns,
    variableNames: subjectTableColumns.map((column) => column.key), // key or dataIndex?
    data: null,
    dependentVariables: {IsPartOf: {SubjectGroup: 'SubjectGroupID'}}
  },
  SubjectGroup: {
    columnProps: subjectGroupTableColumns,
    variableNames: subjectGroupTableColumns.map((column) => column.key), // key or dataIndex?
    data: null,
    dependentVariables: {}
  },
  TissueSample: {
    columnProps: tissueTableColumns,
    variableNames: tissueTableColumns.map((column) => column.key), // key or dataIndex?
    data: null,
    dependentVariables: {IsPartOf: {TissueSampleCollection: 'TissueSampleCollectionID'}, DescendedFromSubjectID: {Subject: 'SubjectID'}}
  },
  TissueSampleCollection: {
    columnProps: tscTableColumns,
    variableNames: tscTableColumns.map((column) => column.key), // key or dataIndex?
    data: null,
    dependentVariables: {DescendedFromSubjectID: {Subject: 'SubjectID'}}
  },
  ActiveTableName: 'Subject'
} // Use context???

const { Content } = Layout
// const EditableContext = React.createContext(null);
const { Option } = Select

let history = []
let selRows = []

// Todo: move to separate file for managing tables.
function MetadataTable (props) {
  var nextTableName = props.nextTableName

  // this is weird, how should it be done?
  const [currentTableName, setCurrentTableName] = useState(nextTableName)

  const currentTable = tables[nextTableName]

  const [statefulColumns, setStatefulColumns] = useState(currentTable.columnProps)
  const [statefulmetadata, setstatefulmetadata] = useState(metadata)
  const [statefulmetadataDefinitions, setstatefulmetadataDefinitions] = useState(metadataDefinitions)

  function createBlankRow (rowNumber) {
    if (rowNumber === undefined) {
      rowNumber = 1
    }
    const newRow = { key: rowNumber.toString() }
    currentTable.variableNames.forEach((name) => { newRow[name] = null })

    return newRow
  }

  if (currentTable.data === null) {
    currentTable.data = [createBlankRow()]
  }

  function updateTableData (newData, useCheckpoint) {

    // Ask Harry: What are checkpoints for?
    if (useCheckpoint === undefined) {
      useCheckpoint = false
    }

    tables[currentTableName].data = newData
    SetDataSource(newData, useCheckpoint)

    currentTable.data = newData
  }

  const [
    DataSource,
    {
      set: SetDataSource,
      reset: resetDataSource,
      undo: undoDataSource,
      redo: redoDataSource
    }
  ] = useUndo(currentTable.data, { useCheckpoints: true })

  if (currentTableName !== nextTableName) {
    // save current (will be previous) state
    tables[currentTableName].columnProps = statefulColumns
    tables.ActiveTableName = nextTableName

    resetDataSource(currentTable.data)

    // save current state??
    setCurrentTableName(nextTableName)
    setStatefulColumns([...currentTable.columnProps])

  }

  const { present: presentDS } = DataSource
  let count = presentDS.length

  // Following are callback functions for the options bar

  function handleUndoDS (e) {
    e.preventDefault()
    undoDataSource()

    DataSource.past = DataSource.past.slice(-15)
  }

  function handleRedoDS (e) {
    e.preventDefault()
    redoDataSource()
  }

  /**
   * Callback for adding a new row to the table.
   */
  const handleAdd = () => {
    // Increment the row counter
    count += 1

    // Generate a new row with unique key
    const newRow = createBlankRow(count)
    const newDS = [...presentDS, newRow]
    const useCheckpoint = true
    updateTableData(newDS, useCheckpoint)
  }

  /**
   * Callback for duplicating a row in the table.
   */
  const handleDuplicate = () => {
    // Increment the row counter
    count += 1

    let newDS = [...presentDS]
    for (let i = 0; i < selRows.length; i++) {
      const newRow = JSON.parse(JSON.stringify(newDS[selRows[i] - 1]))
      newRow.key = count.toString()

      newDS = [...newDS, newRow]
      count += 1
    }

    let useCheckpoint = true
    updateTableData(newDS, useCheckpoint)
  }

  /**
   * Callback for downloading the table as a CSV file.
   */
  const DownloadCSV = () => {
    // todo: should infer the variable names from the table
    const csvString = convertTableToCSV(presentDS)

    const blob = new Blob([csvString], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)

    const a = document.createElement('a')
    a.setAttribute('hidden', '')
    a.setAttribute('href', url)
    a.setAttribute('download', `metadata_${currentTableName.toLowerCase()}_table.csv`)
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  const downLoadAllTablesToJson = () => {

    let filename = 'labbook_metadata_table.json';

    // Loop through all keys in the tables object and create an array of the data from each table
    const allTables = Object.keys(tables).map((key) => {
      return tables[key].data
    })

    const blob = new Blob([JSON.stringify(allTables)], {type: "data:text/json; charset=utf-8"})
    
    const url = URL.createObjectURL(blob)

    const anchorElement = document.createElement('a')
    anchorElement.setAttribute('hidden', '')
    anchorElement.setAttribute('href', url)
    anchorElement.setAttribute('download', filename)
    document.body.appendChild(anchorElement)
    anchorElement.click()
    document.body.removeChild(anchorElement)
  }

  /**
   * Callback for uploading a table from a CSV file.
   */
  const UploadCSV = () => {
    const input = document.createElement('input')
    input.type = 'file'

    input.onclick = function () {
      this.value = null
    }

    input.onchange = (e) => {
      const file = input.files[0]

      const reader = new FileReader()
      reader.readAsText(file, 'UTF-8')

      reader.onload = (readerEvent) => {
        const content = readerEvent.target.result

        // let new_data = convertCSVToTable(content);
        // convert to JSON
        const newData = JSON.parse(content)
        
        updateTableData(newData)
      }
    }
    input.click()
  }

  const handleDelete = () => {
    let temp_ = presentDS
    for (let i = 0; i < selRows.length; i++) {
      temp_ = temp_.filter((item) => item.key !== selRows[i])
    }

    for (let i = 0; i < temp_.length; i++) {
      temp_[i].key = (i + 1).toString()
    }

    selRows = []

    const checkboxes = document.getElementsByClassName('ant-checkbox-input')
    for (let i = 0; i < checkboxes.length; i++) {
      checkboxes[i].checked = false
      checkboxes[i].dispatchEvent(new Event('change', { bubbles: true }))
    }

    updateTableData(temp_)
    setSelected([])
  }

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
  )

  const [selected, setSelected] = useState([]) // selected rows
  const rowSelection = {
    selectedRowKeys: selected,
    onChange: (selectedRowKeys, selectedRows) => {
      setSelected(selectedRows.map((row) => row.key))

      selRows = selectedRowKeys
    },
    getCheckboxProps: (record) => {
      return {}
    }
  }

  /**
   * Callback for saving the changes made in the table to memory.
   * @param {Object} row - The data for the row that was changed.
   * @param {Object} event - The new value which is being set. Should be renamed to newValue. This is only relevant for dropdowns.
   * @param {String} dataIndex - The name of the column that was changed.
   *
   */
  const handleSave = (row, event, dataIndex) => {
    const OldData = [...presentDS]
    const index = OldData.findIndex((item) => row.key === item.key)
    const item = OldData[index]

    const originalData = { ...row }

    const columns = Object.keys(row)
    // regex for newline,  any number of spaces, newline

    for (const key in Object.keys(row)) {
      const id = columns[key]
      if (row[id] !== item[id]) {
        var matchCol = id
        var matchValue = row[id]
        originalData[matchCol] = item[id]
        OldData.splice(index, 1, { ...item, ...row })
      }
    }
    if (typeof event !== 'undefined') {
      matchCol = dataIndex
      matchValue = event
      var tempRow = OldData[index]
      tempRow[matchCol] = matchValue

      OldData.splice(index, 1, { ...tempRow })
    }

    if (selRows.includes(row.key)) {
      for (const i in selRows) {
        tempRow = OldData[selRows[i] - 1]
        tempRow[matchCol] = matchValue

        OldData.splice(selRows[i] - 1, 1, { ...tempRow })
      }
    }
  
    // Adjust width of column if necessary
    let matchColIndex = columns.indexOf(matchCol)
    matchColIndex = matchColIndex - 1 // subtract 1 for the key column

    const matchValueType = typeof matchValue

    let maxColumnWidth = statefulColumns[matchColIndex].maxWidth;

    if (matchValueType === 'number') {
      matchValue = metadata[matchCol][matchValue]

      if (matchValue.length > maxColumnWidth) {
        maxColumnWidth = matchValue.length
        statefulColumns[matchColIndex].width = widthCalcDropdown(
          matchValue,
          '0.82'
        )
      }

    } else {
      if (matchValue.length > maxColumnWidth) {
        maxColumnWidth = matchValue.length
        statefulColumns[matchColIndex].width = widthCalc(
          matchValue,
          '1.25'
        )
      }
    }

    statefulColumns[matchColIndex].maxWidth = maxColumnWidth;

    setStatefulColumns([...statefulColumns])

    SetDataSource([...OldData], false) // Todo: Rename oldData to newData?

    // Ask Harry: What happens here? Related to updating many rows at once?
    DataSource.present = { ...OldData }
    const tempData = [...OldData]
    tempData[index] = { ...originalData }

    const tempDataValues = []
    const tempDataKeys = []
    for (const i in tempData) {
      tempDataValues.push([...Object.values(tempData[i])])
      tempDataKeys.push([...Object.keys(tempData[i])])
    }

    const tempDataObj = []
    for (const i in tempDataValues) {
      const tempObj = {}
      for (const j in tempDataValues[i]) {
        tempObj[tempDataKeys[i][j]] = tempDataValues[i][j]
      }
      tempDataObj.push(tempObj)
    }
    history = [...history, tempDataObj]
    DataSource.past = [...DataSource.past, [...tempDataObj]]

    tables[currentTableName].data = [...OldData]
  }

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell
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
        handleSave,
        statefulmetadata,
        statefulmetadataDefinitions,
        setstatefulmetadata,
        setstatefulmetadataDefinitions
      })
    }
  })

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
          pagination={false}
        />
      </ConfigProvider>
    </div>
  )
}

const EditableContext = React.createContext(null)

const EditableRow = ({index, ...props}) => {
  const [form] = Form.useForm()
  console.log(props)

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
    setEditing(false)
  }

  const optionsAntd = []
  const [name, setName] = useState('')

  const onNameChange = (event) => {
    setName(event.target.value)
  }

  const addItem = (e) => {
    e.preventDefault()
    let items = []
    if (statefulmetadata[dataIndex]) {
      items = statefulmetadata[dataIndex]
    }
    let definitions = []
    if (statefulmetadataDefinitions[dataIndex]) {
      definitions = statefulmetadataDefinitions[dataIndex]
    }
    items = [name, ...items]
    statefulmetadata[dataIndex] = items
    const newdefinition = 'A custom option added by the user'
    definitions = [newdefinition, ...definitions]
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

    // Todo: Ask Harry: This seems to be updated at a high rate, maybe we can do this only once or when needed
    const currentTableName = tables.ActiveTableName

    if ( tables[currentTableName].dependentVariables[dataIndex] ) {
      const dependentTableName = Object.keys( tables[currentTableName].dependentVariables[dataIndex] )[0]
      const dependentVariableName = tables[currentTableName].dependentVariables[dataIndex][dependentTableName];
      if (tables[dependentTableName].data !== null ) {
        let value = tables[dependentTableName].data.map( (row) => row[dependentVariableName] )
        statefulmetadata[dataIndex] = value
      }
    }

    // TODO: Do this somewhere else to make sure it is only done once and wherever it is needed
    if (statefulmetadata[dataIndex] === undefined) {
        statefulmetadata[dataIndex] = []
    }

    if (statefulmetadataDefinitions[dataIndex] === undefined) {
      statefulmetadataDefinitions[dataIndex] = []
    }

    for (let i = 0; i < statefulmetadata[dataIndex].length; i++) {
      const option = (
        <Option
          value={statefulmetadata[dataIndex][i]}
          title={statefulmetadataDefinitions[dataIndex][i]}
        >
          {statefulmetadata[dataIndex][i]}
        </Option>
      )
      optionsAntd.push(option)
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
          filterOption={(input, option) =>
            option.children.toLowerCase().includes(input.toLowerCase())
          }
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
                width="10px"
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
        filterOption={(input, option) =>
          option.children.toLowerCase().includes(input.toLowerCase())
        }
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
                // style={{ fontSize: '2em' }}
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
        )
  }
  return <td {...restProps}>{childNode}</td>
}

const MetadataPage = (props) => {
  const [currentTableName, setCurrentTableName] = useState('Subject')

  const handleSelectTable = (selectedTableName) => {
    setCurrentTableName(selectedTableName)
  }
  return (
    <Layout className = "metadata-page-container" style={{ backgroundColor: '#f8fafb', minHeight: '92.55vh' }}>

      <SidePanelLeft setPage={props.setPage} onButtonClick={handleSelectTable}></SidePanelLeft>
      
      <Layout className="table-container" style={{ backgroundColor: '#f8fafb' }}>

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
                padding: '2% 1% 2% 1%',
                margin: '1% 1% 2% 1%',
                borderRadius: '0.9375rem',
                boxShadow: '0.3125rem 0.5rem 1.5rem 0.3125rem rgba(208, 216, 243, 0.6)',
                height: '90.5vh',
                width: '88vw'
              }}
            >
              {/* <OptionsBar /> */}
              <Form>
                <MetadataTable nextTableName={currentTableName} children={''}></MetadataTable>
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

export default MetadataPage
