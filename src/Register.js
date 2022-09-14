import { Table, Button, Form, message, Typography } from 'antd'
import styled from 'styled-components'
import datasource from './datasource'
import './Register.css'
import SidePanel from './SidePanel'
import SidePanelLeft from './Container/SidePanelLeft'
import OptionsBar from './options-bar'
import { render } from '@umijs/deps/compiled/mustache'
import { useState } from 'react'

const { Title } = Typography

const columns = [
  {
    title: 'Brain ID',
    dataIndex: 'BrainID',
    key: 'BrainID',
    sorter: (a, b) => a.key - b.key,
    sortDirections: ['descend', 'ascend', 'descend'],
    width: 150
  },
  {
    title: 'Group',
    dataIndex: 'Group',
    key: 'Group',
    sorter: (a, b) => a.Group.localeCompare(b.Group),
    sortDirections: ['descend', 'ascend', 'descend'],
    width: 150
  },
  {
    title: 'WebAligned',
    dataIndex: 'WebAligned',
    key: 'WebAligned',
    sorter: (a, b) => a.WebAligned.localeCompare(b.WebAligned),
    sortDirections: ['descend', 'ascend', 'descend'],
    width: 240
  },
  {
    title: 'WebWarped',
    dataIndex: 'WebWarped',
    key: 'WebWarped',
    sorter: (a, b) => a.WebWarped.localeCompare(b.WebWarped),
    sortDirections: ['descend', 'ascend', 'descend'],
    width: 240
  },
  {
    title: 'Segmented',
    dataIndex: 'Segmented',
    key: 'Segmented',
    sorter: (a, b) => a.Segmented.localeCompare(b.Segmented),
    sortDirections: ['descend', 'ascend', 'descend'],
    width: 210
  },
  {
    title: 'Nutiled',
    dataIndex: 'Nutiled',
    key: 'Nutiled',
    sorter: (a, b) => a.Nutiled.localeCompare(b.Nutiled),
    sortDirections: ['descend', 'ascend', 'descend'],
    width: 200
  }
]

// const [DataSource, SetDataSource] = useState(datasource)
// rowSelection object indicates the need for row selection

const rowSelection = {
  onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      'selectedRows: ',
      selectedRows
    )
  }
}
const StyledTable = styled(props => <Table {...props} />)`
  && tbody > tr:hover > td {
    background: rgba(238, 245, 248, 1);
  }
`

function handleButtonClick (e) {
  fetch('http://localhost:3000/list_projects.php').then(res => {
    res.json().then(data => {
      console.log(data)
      message.info('done')
    })
  })
}

function fetchData (url) {
  const data = fetch(url).then(response => {
    if (response.ok) {
      return response.json()
    }
  })
}

function handleAdd (DataSource) {
  // const { count, datasource } = this.state
  // const newData = fetchData('http://localhost:80/server.php')
  // this.setState({ dataSource: [...datasource, newData] })
  // const dataSource = fetchData('http://localhost:80/server.php'
  // SetDataSource(fetchData('http://localhost:80/server.php'))
  // console.log(fetchData('http://localhost:80/server.php'))
  // var retrievedData = fetchData('http://localhost:80/server.php')
  // var retrievedData_json = retrievedData.json()
  // DataSource.push(retrievedData_json)
}

// console.log('yay')

function Buildtable () {
  const [DataSource, SetDataSource] = useState('')
  const updateTable = async () => {
    const response = await fetch('http://www.quint-tools.com:3000/server.php')
    const data = await response.json()
    // SetDataSource(datasource)
    // SetDataSource(DataSource => ({ arrayvar: [DataSource, data] }))
  }
  updateTable()

  return (
    <div>
      <StyledTable
        className='table-striped-rows'
        rowSelection={{
          type: 'checkbox',
          ...rowSelection
        }}
        columns={columns}
        dataSource={datasource}
        scroll={{ y: '55vh', x: 'max-content' }}
        pagination={false}
      />
      {/* <Button onClick={updateTable}>Add</Button> */}
    </div>
  )
}

const Register = () => (
  <div className='Register'>
    <div style={{ display: 'flex', width: '100vh', height: '75vh' }}>
      <SidePanelLeft></SidePanelLeft>
      <div
        className='MainPanel'
        style={{
          'background-color': '#f8fafb',
          'border-radius': '0 0 0 0',
          // padding: '2% 1% 1% 1%',
          // margin: '1% 1% 2% 1%'
          margin: '-0.7% 0 0 0',
          'box-shadow': '7px 25px 28px 6px rgba(1, 1, 2, 0.6)',

          'clip-path': 'inset(-250px -250px -250px -250px)'
        }}
      >
        <div
          style={{
            // outline: '5px solid black',
            padding: '2% 0% 2% 0%',
            margin: '1% 1% 2% 1%',
            'border-radius': '15px',
            'box-shadow': '5px 8px 24px 5px rgba(208, 216, 243, 0.6)',
            height: '73.5vh'
          }}
        >
          <OptionsBar />
          <Form>
            <Buildtable></Buildtable>
          </Form>
        </div>
      </div>
      <SidePanel></SidePanel>
    </div>
  </div>
)
export default Register
